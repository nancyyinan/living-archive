'use client';

/* oxlint-disable next/no-img-element */

import { useRef, useState } from 'react';
import {
  ArchiveItem,
  brainstormTitle,
  brainstormTranscription,
  itemMedia,
} from '@/data/archive';

interface Transform {
  x: number;
  y: number;
  scale: number;
}

const initialTransform: Transform = { x: 0, y: 0, scale: 1 };
const clampScale = (scale: number) => Math.min(3, Math.max(0.5, scale));

export function BrainstormViewer({ item }: { item: ArchiveItem }) {
  const dragStart = useRef<{
    pointerId: number;
    x: number;
    y: number;
    tx: number;
    ty: number;
  } | null>(null);
  const [mode, setMode] = useState<'map' | 'text'>('map');
  const [transform, setTransform] = useState<Transform>(initialTransform);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || event.pointerType === 'touch') return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStart.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      tx: transform.x,
      ty: transform.y,
    };
    setDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStart.current;
    if (!start || start.pointerId !== event.pointerId) return;
    setTransform((current) => ({
      ...current,
      x: start.tx + event.clientX - start.x,
      y: start.ty + event.clientY - start.y,
    }));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current?.pointerId !== event.pointerId) return;
    dragStart.current = null;
    setDragging(false);
  };

  const changeScale = (factor: number) => {
    setTransform((current) => ({
      ...current,
      scale: clampScale(current.scale * factor),
    }));
  };

  return (
    <section className="brainstorm-page">
      <div className="subheader">
        <div>
          <span>02</span>
          <h1>{brainstormTitle}</h1>
        </div>
        <div className="view-controls" aria-label="Brainstorm view">
          <span>VIEW:</span>
          <button
            className={mode === 'map' ? 'active' : ''}
            onClick={() => setMode('map')}
          >
            MAP
          </button>
          <button
            className={mode === 'text' ? 'active' : ''}
            onClick={() => setMode('text')}
          >
            TEXT
          </button>
        </div>
      </div>

      {mode === 'map' ? (
        <div
          className={`map-canvas ${dragging ? 'is-dragging' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          aria-label="Brainstorm image. Drag with a mouse or pen to reposition it."
        >
          <div
            className="map-media"
            style={{
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
            }}
          >
            {item.mimeType === 'application/pdf' ? (
              <object
                data={itemMedia(item)}
                type="application/pdf"
                aria-label={brainstormTitle}
              >
                Brainstorm PDF
              </object>
            ) : (
              <img
                src={itemMedia(item)}
                alt={brainstormTitle}
                draggable={false}
              />
            )}
          </div>
          <div
            className="image-controls"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <span>IMAGE {Math.round(transform.scale * 100)}%</span>
            <button
              className="image-scale-button"
              aria-label="Make Brainstorm image smaller"
              onClick={() => changeScale(1 / 1.2)}
            >
              −
            </button>
            <button
              className="image-scale-button"
              aria-label="Make Brainstorm image larger"
              onClick={() => changeScale(1.2)}
            >
              +
            </button>
            <button onClick={() => setTransform(initialTransform)}>
              RESET
            </button>
          </div>
        </div>
      ) : (
        <div className="transcription-view">
          <p>SECONDARY TRANSCRIPTION / UNCERTAIN FRAGMENTS ARE MARKED</p>
          <ol>
            {brainstormTranscription.map((phrase, index) => (
              <li key={index}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {phrase}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
