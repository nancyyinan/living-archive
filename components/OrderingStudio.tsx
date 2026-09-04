'use client';

/* oxlint-disable react/react-compiler, next/no-img-element, next/no-html-link-for-pages */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArchiveItem, itemMedia } from '@/data/archive';
import {
  getPublishedOrderingLayout,
  OrderingApproach,
  OrderingLayout,
  orderingApproaches,
  orderingCanvas,
} from '@/data/orderings';
import {
  clearOrderingDraft,
  exportAllOrderingLayouts,
  loadOrderingDrafts,
  loadOrderingLayout,
  saveOrderingDraft,
} from '@/lib/ordering-store';
import { sitePath } from '@/lib/site-path';

type Tool = 'select' | 'pan';
type SaveState = 'published' | 'saved' | 'dirty';

interface Point {
  x: number;
  y: number;
}

interface Interaction {
  kind: 'move' | 'resize' | 'pan';
  pointerId: number;
  startClient: Point;
  startPan?: Point;
  imageId?: string;
  startPlacement?: { x: number; y: number; width: number };
}

interface OrderingNavigationProps {
  onNavigate: (path: string) => void;
}

interface OrderingStudioProps extends OrderingNavigationProps {
  approach: OrderingApproach;
  images: ArchiveItem[];
  onNotify: (message: string) => void;
}

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

const cloneLayout = (layout: OrderingLayout): OrderingLayout => ({
  orderingId: layout.orderingId,
  placements: layout.placements.map((placement) => ({ ...placement })),
});

const go =
  (path: string, onNavigate: (path: string) => void) =>
  (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(path);
  };

export function ImageSectionNav({
  active,
  onNavigate,
}: OrderingNavigationProps & { active: 'images' | 'orderings' }) {
  return (
    <nav className="image-section-nav" aria-label="Image collection sections">
      <a
        className={active === 'images' ? 'active' : ''}
        href={sitePath('/images')}
        onClick={go('/images', onNavigate)}
      >
        <span>01.1</span>
        12 IMAGES
      </a>
      <a
        className={active === 'orderings' ? 'active' : ''}
        href={sitePath('/images/orderings')}
        onClick={go('/images/orderings', onNavigate)}
      >
        <span>01.2</span>
        10 ORDERINGS
      </a>
    </nav>
  );
}

export function OrderingsIndex({
  images,
  onNavigate,
  onNotify,
}: OrderingNavigationProps & {
  images: ArchiveItem[];
  onNotify: (message: string) => void;
}) {
  const [draftIds, setDraftIds] = useState<string[]>([]);

  useEffect(() => {
    setDraftIds(Object.keys(loadOrderingDrafts()));
  }, []);

  const exportLayouts = () => {
    exportAllOrderingLayouts(images);
    onNotify('ALL 10 ORDERINGS EXPORTED');
  };

  return (
    <section className="orderings-index-page">
      <div className="ordering-breadcrumb">01 IMAGES / 10 ORDERINGS</div>
      <div className="orderings-index-heading">
        <div>
          <span>01.2</span>
          <div>
            <h1>10 ORDERINGS</h1>
            <p>
              TEN INDEPENDENT ARRANGEMENTS OF THE SAME 12 IMAGES. EACH SAVED
              DRAFT STAYS ON THIS DEVICE UNTIL IT IS EXPORTED AND PUBLISHED.
            </p>
          </div>
        </div>
        <button className="ordering-action primary" onClick={exportLayouts}>
          EXPORT ALL FOR PUBLISHING
        </button>
      </div>
      <ImageSectionNav active="orderings" onNavigate={onNavigate} />
      <div className="ordering-approach-list">
        {orderingApproaches.map((approach) => {
          const path = `/images/orderings/${approach.id}`;
          return (
            <a
              key={approach.id}
              href={sitePath(path)}
              onClick={go(path, onNavigate)}
            >
              <span>{approach.number}</span>
              <h2>{approach.title}</h2>
              <div>
                <span>
                  {draftIds.includes(approach.id)
                    ? 'DRAFT SAVED'
                    : 'PUBLISHED LAYOUT'}
                </span>
                <span>OPEN CANVAS →</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function OrderingStudio({
  approach,
  images,
  onNavigate,
  onNotify,
}: OrderingStudioProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<Interaction | null>(null);
  const initialLayout = getPublishedOrderingLayout(approach.id, images);
  const [layout, setLayout] = useState<OrderingLayout>(initialLayout);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tool, setTool] = useState<Tool>('select');
  const [zoom, setZoom] = useState(0.6);
  const [pan, setPan] = useState<Point>({ x: 20, y: 20 });
  const [saveState, setSaveState] = useState<SaveState>('published');

  const fitCanvas = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const bounds = viewport.getBoundingClientRect();
    const nextZoom = clamp(
      Math.min(
        (bounds.width - 32) / orderingCanvas.width,
        (bounds.height - 32) / orderingCanvas.height,
      ),
      0.3,
      1,
    );
    setZoom(nextZoom);
    setPan({
      x: (bounds.width - orderingCanvas.width * nextZoom) / 2,
      y: (bounds.height - orderingCanvas.height * nextZoom) / 2,
    });
  }, []);

  useEffect(() => {
    const loaded = loadOrderingLayout(approach.id, images);
    setLayout(cloneLayout(loaded.layout));
    setSaveState(loaded.isDraft ? 'saved' : 'published');
    setSelectedId(null);
    setTool('select');
    const frame = window.requestAnimationFrame(fitCanvas);
    return () => window.cancelAnimationFrame(frame);
  }, [approach.id, fitCanvas, images]);

  const imageById = new Map(images.map((image) => [image.id, image]));
  const selected = layout.placements.find(
    (placement) => placement.imageId === selectedId,
  );

  const markChanged = () => setSaveState('dirty');

  const beginItemInteraction = (
    event: React.PointerEvent<HTMLElement>,
    imageId: string,
    kind: 'move' | 'resize',
  ) => {
    if (tool === 'pan' || event.button !== 0) return;
    const placement = layout.placements.find(
      (candidate) => candidate.imageId === imageId,
    );
    if (!placement) return;
    event.preventDefault();
    event.stopPropagation();
    viewportRef.current?.setPointerCapture(event.pointerId);
    interactionRef.current = {
      kind,
      pointerId: event.pointerId,
      imageId,
      startClient: { x: event.clientX, y: event.clientY },
      startPlacement: {
        x: placement.x,
        y: placement.y,
        width: placement.width,
      },
    };
    setSelectedId(imageId);
  };

  const beginPan = (event: React.PointerEvent<HTMLDivElement>) => {
    if (tool !== 'pan' && event.button !== 1) {
      if (event.target === event.currentTarget) setSelectedId(null);
      return;
    }
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    interactionRef.current = {
      kind: 'pan',
      pointerId: event.pointerId,
      startClient: { x: event.clientX, y: event.clientY },
      startPan: { ...pan },
    };
  };

  const moveInteraction = (event: React.PointerEvent<HTMLDivElement>) => {
    const interaction = interactionRef.current;
    if (!interaction || interaction.pointerId !== event.pointerId) return;
    const dx = event.clientX - interaction.startClient.x;
    const dy = event.clientY - interaction.startClient.y;

    if (interaction.kind === 'pan' && interaction.startPan) {
      setPan({
        x: interaction.startPan.x + dx,
        y: interaction.startPan.y + dy,
      });
      return;
    }

    const image = interaction.imageId
      ? imageById.get(interaction.imageId)
      : undefined;
    const start = interaction.startPlacement;
    if (!image || !start || !interaction.imageId) return;
    const aspect = image.orientation === 'portrait' ? 2 / 3 : 3 / 2;

    setLayout((current) => ({
      ...current,
      placements: current.placements.map((placement) => {
        if (placement.imageId !== interaction.imageId) return placement;
        if (interaction.kind === 'move') {
          const height = placement.width / aspect;
          return {
            ...placement,
            x: clamp(
              start.x + dx / zoom,
              0,
              orderingCanvas.width - placement.width,
            ),
            y: clamp(start.y + dy / zoom, 0, orderingCanvas.height - height),
          };
        }
        const resizedWidth = clamp(
          start.width + (dx / zoom + (dy / zoom) * aspect) / 2,
          120,
          520,
        );
        return { ...placement, width: resizedWidth };
      }),
    }));
    markChanged();
  };

  const endInteraction = (event: React.PointerEvent<HTMLDivElement>) => {
    if (interactionRef.current?.pointerId !== event.pointerId) return;
    interactionRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const changeLayer = (direction: 'front' | 'back') => {
    if (!selectedId) return;
    setLayout((current) => ({
      ...current,
      placements: (() => {
        const selectedPlacement = current.placements.find(
          (placement) => placement.imageId === selectedId,
        );
        if (!selectedPlacement) return current.placements;
        const remaining = current.placements
          .filter((placement) => placement.imageId !== selectedId)
          .sort((a, b) => a.z - b.z);
        const ordered =
          direction === 'front'
            ? [...remaining, selectedPlacement]
            : [selectedPlacement, ...remaining];
        const zByImage = new Map(
          ordered.map((placement, index) => [placement.imageId, index + 1]),
        );
        return current.placements.map((placement) => ({
          ...placement,
          z: zByImage.get(placement.imageId) || placement.z,
        }));
      })(),
    }));
    markChanged();
  };

  const nudgeSelected = (
    event: React.KeyboardEvent<HTMLElement>,
    imageId: string,
  ) => {
    const movement: Record<string, Point> = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
    };
    const vector = movement[event.key];
    if (!vector) return;
    event.preventDefault();
    const step = event.shiftKey ? 10 : 2;
    const image = imageById.get(imageId);
    setLayout((current) => ({
      ...current,
      placements: current.placements.map((placement) => {
        if (placement.imageId !== imageId || !image) return placement;
        const aspect = image.orientation === 'portrait' ? 2 / 3 : 3 / 2;
        return {
          ...placement,
          x: clamp(
            placement.x + vector.x * step,
            0,
            orderingCanvas.width - placement.width,
          ),
          y: clamp(
            placement.y + vector.y * step,
            0,
            orderingCanvas.height - placement.width / aspect,
          ),
        };
      }),
    }));
    setSelectedId(imageId);
    markChanged();
  };

  const saveDraft = () => {
    saveOrderingDraft(layout);
    setSaveState('saved');
    onNotify(`ORDERING ${approach.number} SAVED ON THIS DEVICE`);
  };

  const exportLayouts = () => {
    exportAllOrderingLayouts(images, layout);
    onNotify('ALL 10 ORDERINGS EXPORTED');
  };

  const resetLayout = () => {
    if (!window.confirm('RESET THIS ORDERING TO ITS PUBLISHED LAYOUT?')) return;
    clearOrderingDraft(approach.id);
    setLayout(getPublishedOrderingLayout(approach.id, images));
    setSelectedId(null);
    setSaveState('published');
    onNotify(`ORDERING ${approach.number} RESET`);
  };

  const changeZoom = (factor: number) =>
    setZoom((current) => clamp(current * factor, 0.3, 1.8));

  return (
    <section className="ordering-studio-page">
      <div className="ordering-breadcrumb">
        <a href={sitePath('/images')} onClick={go('/images', onNavigate)}>
          01 IMAGES
        </a>{' '}
        /{' '}
        <a
          href={sitePath('/images/orderings')}
          onClick={go('/images/orderings', onNavigate)}
        >
          10 ORDERINGS
        </a>{' '}
        / {approach.number}
      </div>
      <header className="ordering-studio-header">
        <div className="ordering-studio-title">
          <span>{approach.number}</span>
          <div>
            <h1>{approach.title}</h1>
            <p>12 IMAGES / INDEPENDENT FREEFORM LAYOUT</p>
          </div>
        </div>
        <div className="ordering-save-state" data-state={saveState}>
          {saveState === 'dirty'
            ? 'UNSAVED CHANGES'
            : saveState === 'saved'
              ? 'DRAFT SAVED ON THIS DEVICE'
              : 'PUBLISHED LAYOUT'}
        </div>
      </header>
      <div className="ordering-toolbar" aria-label="Ordering canvas tools">
        <div className="ordering-tool-group">
          <button
            className={tool === 'select' ? 'active' : ''}
            onClick={() => setTool('select')}
          >
            SELECT / MOVE
          </button>
          <button
            className={tool === 'pan' ? 'active' : ''}
            onClick={() => setTool('pan')}
          >
            PAN CANVAS
          </button>
        </div>
        <div className="ordering-tool-group">
          <button disabled={!selected} onClick={() => changeLayer('front')}>
            BRING TO FRONT
          </button>
          <button disabled={!selected} onClick={() => changeLayer('back')}>
            SEND TO BACK
          </button>
        </div>
        <div className="ordering-tool-group ordering-persistence-tools">
          <button onClick={saveDraft}>SAVE DRAFT</button>
          <button onClick={exportLayouts}>EXPORT ALL</button>
          <button onClick={resetLayout}>RESET</button>
        </div>
      </div>
      <div
        ref={viewportRef}
        className={`ordering-viewport tool-${tool}`}
        onPointerDown={beginPan}
        onPointerMove={moveInteraction}
        onPointerUp={endInteraction}
        onPointerCancel={endInteraction}
        aria-label={`${approach.title} freeform image canvas`}
      >
        <div
          className="ordering-canvas"
          style={{
            width: orderingCanvas.width,
            height: orderingCanvas.height,
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          }}
        >
          <span className="ordering-canvas-label top-left">0 / BEGINNING</span>
          <span className="ordering-canvas-label bottom-right">
            {orderingCanvas.width} × {orderingCanvas.height}
          </span>
          {layout.placements.map((placement) => {
            const image = imageById.get(placement.imageId);
            if (!image) return null;
            const aspect = image.orientation === 'portrait' ? 2 / 3 : 3 / 2;
            return (
              <button
                type="button"
                key={placement.imageId}
                className={`ordering-item image-${image.orientation || 'landscape'} ${selectedId === placement.imageId ? 'selected' : ''}`}
                style={{
                  width: placement.width,
                  height: placement.width / aspect,
                  transform: `translate3d(${placement.x}px, ${placement.y}px, 0)`,
                  zIndex: placement.z,
                }}
                aria-label={`${image.title}. Drag to move; use the corner handle to resize.`}
                onFocus={() => setSelectedId(placement.imageId)}
                onKeyDown={(event) => nudgeSelected(event, placement.imageId)}
                onPointerDown={(event) => {
                  const bounds = event.currentTarget.getBoundingClientRect();
                  const isResizeHandle =
                    bounds.right - event.clientX <= 24 &&
                    bounds.bottom - event.clientY <= 24;
                  beginItemInteraction(
                    event,
                    placement.imageId,
                    isResizeHandle ? 'resize' : 'move',
                  );
                }}
              >
                <img
                  src={itemMedia(image)}
                  alt={image.title || 'Archive image'}
                  draggable={false}
                />
                <span className="ordering-item-label">{image.title}</span>
                <span className="ordering-resize-handle" aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <div className="ordering-instructions">
          DRAG TO MOVE / DRAG CORNER TO RESIZE / OVERLAP IS ALLOWED / ARROW KEYS
          NUDGE
        </div>
        <div className="ordering-zoom-controls">
          <span>CANVAS {Math.round(zoom * 100)}%</span>
          <button aria-label="Zoom out" onClick={() => changeZoom(1 / 1.2)}>
            −
          </button>
          <button aria-label="Zoom in" onClick={() => changeZoom(1.2)}>
            +
          </button>
          <button onClick={fitCanvas}>FIT</button>
          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 20, y: 20 });
            }}
          >
            100%
          </button>
        </div>
      </div>
    </section>
  );
}
