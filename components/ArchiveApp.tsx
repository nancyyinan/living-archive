'use client';

/* oxlint-disable react/react-compiler, next/no-img-element, next/no-html-link-for-pages, jsx-a11y/no-noninteractive-element-interactions */

import { useEffect, useMemo, useState } from 'react';
import { AddPanel } from '@/components/AddPanel';
import { BrainstormViewer } from '@/components/BrainstormViewer';
import { Header } from '@/components/Header';
import {
  ArchiveItem,
  brainstormTitle,
  CollectionType,
  initialArchive,
  itemMedia,
  itemNumber,
} from '@/data/archive';
import {
  deleteStoredFile,
  loadArchive,
  saveArchive,
} from '@/lib/archive-store';
import { routeFromLocation, sitePath } from '@/lib/site-path';

type ViewMode = 'grid' | 'index';

export function ArchiveApp() {
  const [items, setItems] = useState<ArchiveItem[]>(initialArchive);
  const [ready, setReady] = useState(false);
  const [path, setPath] = useState('/');
  const [editMode, setEditMode] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelCollection, setPanelCollection] = useState<
    CollectionType | undefined
  >();
  const [editingItem, setEditingItem] = useState<ArchiveItem | null>(null);
  const [toast, setToast] = useState('');
  const [questionView, setQuestionView] = useState<ViewMode>('grid');
  const [imageView, setImageView] = useState<ViewMode>('grid');
  const [draggedId, setDraggedId] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem('living-archive:theme') === 'light'
        ? 'light'
        : 'dark';
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
    setPath(routeFromLocation(window.location.pathname));
    setEditMode(
      new URLSearchParams(window.location.search).get('edit') === 'true',
    );
    loadArchive()
      .then((saved) => {
        setItems(saved);
        setReady(true);
      })
      .catch(() => setReady(true));
    const pop = () => setPath(routeFromLocation(window.location.pathname));
    window.addEventListener('popstate', pop);
    return () => window.removeEventListener('popstate', pop);
  }, []);

  const ordered = (collection: CollectionType) =>
    items
      .filter((item) => item.collection === collection)
      .sort((a, b) => a.order - b.order);
  const brainstorm = ordered('brainstorm')[0];
  const questions = ordered('questions');
  const images = ordered('images');

  const navigate = (nextPath: string) => {
    const query = editMode ? '?edit=true' : '';
    window.history.pushState({}, '', `${sitePath(nextPath)}${query}`);
    setPath(nextPath);
    window.scrollTo(0, 0);
  };

  const toggleEditMode = () => {
    const nextMode = !editMode;
    setEditMode(nextMode);
    window.history.replaceState(
      {},
      '',
      `${sitePath(path)}${nextMode ? '?edit=true' : ''}`,
    );
    if (!nextMode) {
      setPanelOpen(false);
      setEditingItem(null);
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('living-archive:theme', nextTheme);
  };

  const openAdd = (collection?: CollectionType) => {
    setEditingItem(null);
    setPanelCollection(collection);
    setPanelOpen(true);
  };

  const openEdit = (item: ArchiveItem) => {
    setEditingItem(item);
    setPanelCollection(item.collection);
    setPanelOpen(true);
  };

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2000);
  };

  const saveItem = (nextItem: ArchiveItem) => {
    const wasExisting = items.some((item) => item.id === nextItem.id);
    setItems((current) => {
      let next: ArchiveItem[];
      const existing = current.some((item) => item.id === nextItem.id);
      if (
        nextItem.collection === 'brainstorm' &&
        !existing &&
        nextItem.order === -1
      ) {
        next = [
          ...current.filter((item) => item.collection !== 'brainstorm'),
          { ...nextItem, order: 0 },
        ];
      } else if (existing) {
        const previous = current.find((item) => item.id === nextItem.id)!;
        if (
          previous.collection === nextItem.collection &&
          previous.order !== nextItem.order
        ) {
          const siblings = current
            .filter(
              (item) =>
                item.collection === nextItem.collection &&
                item.id !== nextItem.id,
            )
            .sort((a, b) => a.order - b.order);
          siblings.splice(
            Math.min(nextItem.order, siblings.length),
            0,
            nextItem,
          );
          const reordered = siblings.map((item, index) => ({
            ...item,
            order: index,
          }));
          next = [
            ...current.filter(
              (item) => item.collection !== nextItem.collection,
            ),
            ...reordered,
          ];
        } else {
          next = current.map((item) =>
            item.id === nextItem.id ? nextItem : item,
          );
        }
      } else {
        const order = current.filter(
          (item) => item.collection === nextItem.collection,
        ).length;
        next = [...current, { ...nextItem, order }];
      }
      saveArchive(next);
      return next;
    });
    setPanelOpen(false);
    setEditingItem(null);
    notify(
      nextItem.collection === 'questions'
        ? `QUESTION ${wasExisting ? 'UPDATED' : 'ADDED'}`
        : nextItem.collection === 'images'
          ? `${wasExisting ? 'IMAGE UPDATED' : 'ADDED TO 12 IMAGES'}`
          : 'BRAINSTORM UPDATED',
    );
  };

  const deleteItem = async (item: ArchiveItem) => {
    if (!window.confirm(`DELETE ${item.title || 'THIS ITEM'}?`)) return;
    await deleteStoredFile(item.mediaUrl);
    setItems((current) => {
      const next = current.filter((candidate) => candidate.id !== item.id);
      saveArchive(next);
      return next;
    });
    setPanelOpen(false);
    if (path.includes(item.id)) navigate(`/${item.collection}`);
    notify('ITEM DELETED');
  };

  const reorder = (targetId: string, collection: CollectionType) => {
    if (!draggedId || draggedId === targetId) return;
    setItems((current) => {
      const siblings = current
        .filter((item) => item.collection === collection)
        .sort((a, b) => a.order - b.order);
      const sourceIndex = siblings.findIndex((item) => item.id === draggedId);
      const targetIndex = siblings.findIndex((item) => item.id === targetId);
      if (sourceIndex < 0 || targetIndex < 0) return current;
      const [moved] = siblings.splice(sourceIndex, 1);
      siblings.splice(targetIndex, 0, moved);
      const orderMap = new Map(siblings.map((item, index) => [item.id, index]));
      const next = current.map((item) =>
        orderMap.has(item.id)
          ? { ...item, order: orderMap.get(item.id)! }
          : item,
      );
      saveArchive(next);
      return next;
    });
    setDraggedId(null);
  };

  const segments = path.split('/').filter(Boolean);
  const collection = segments[0];
  const detailId = segments[1];
  const detailItem = detailId
    ? items.find((item) => item.id === detailId)
    : undefined;

  let content: React.ReactNode;
  if (collection === 'brainstorm' && brainstorm) {
    content = (
      <BrainstormViewer key={itemMedia(brainstorm)} item={brainstorm} />
    );
  } else if (collection === 'questions' && detailItem) {
    content = (
      <DetailView
        item={detailItem}
        items={questions}
        editMode={editMode}
        onNavigate={navigate}
        onEdit={openEdit}
      />
    );
  } else if (collection === 'questions') {
    content = (
      <QuestionsPage
        items={questions}
        view={questionView}
        setView={setQuestionView}
        editMode={editMode}
        onNavigate={navigate}
        onEdit={openEdit}
        onAdd={() => openAdd('questions')}
        draggedId={draggedId}
        setDraggedId={setDraggedId}
        onDrop={(id) => reorder(id, 'questions')}
      />
    );
  } else if (collection === 'images' && detailItem) {
    content = (
      <DetailView
        item={detailItem}
        items={images}
        editMode={editMode}
        onNavigate={navigate}
        onEdit={openEdit}
      />
    );
  } else if (collection === 'images') {
    content = (
      <ImagesPage
        items={images}
        view={imageView}
        setView={setImageView}
        editMode={editMode}
        onNavigate={navigate}
        onEdit={openEdit}
        onAdd={() => openAdd('images')}
        draggedId={draggedId}
        setDraggedId={setDraggedId}
        onDrop={(id) => reorder(id, 'images')}
      />
    );
  } else {
    content = <Home items={items} onNavigate={navigate} />;
  }

  return (
    <main className={`archive-shell ${ready ? 'is-ready' : ''}`}>
      <Header
        editMode={editMode}
        theme={theme}
        onAdd={() => openAdd()}
        onNavigate={navigate}
        onToggleEdit={toggleEditMode}
        onToggleTheme={toggleTheme}
      />
      {content}
      <AddPanel
        open={panelOpen}
        item={editingItem}
        initialCollection={panelCollection}
        onClose={() => setPanelOpen(false)}
        onSave={saveItem}
        onDelete={deleteItem}
      />
      <output
        className={`archive-toast ${toast ? 'visible' : ''}`}
        aria-live="polite"
      >
        {toast}
      </output>
    </main>
  );
}

function Home({
  items,
  onNavigate,
}: {
  items: ArchiveItem[];
  onNavigate: (path: string) => void;
}) {
  const questions = useMemo(
    () =>
      items
        .filter((item) => item.collection === 'questions')
        .sort((a, b) => a.order - b.order),
    [items],
  );
  const images = useMemo(
    () =>
      items
        .filter((item) => item.collection === 'images')
        .sort((a, b) => a.order - b.order),
    [items],
  );
  const brainstorm = items.find((item) => item.collection === 'brainstorm');
  const go = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="home-view">
      <section className="archive-intro" aria-labelledby="archive-heading">
        <div>
          <h1 id="archive-heading">LIVING ARCHIVE</h1>
          <p>
            YINAN XUE
            <br />
            COMMUNICATION DESIGN THESIS
            <br />
            FALL 2026
          </p>
        </div>
        <p className="archive-description">
          A developing collection of questions, images,
          <br />
          references, and visual thinking.
        </p>
      </section>
      <section
        className="collection-grid"
        aria-label="Three archive collections"
      >
        <a
          className="collection-card"
          href={sitePath('/images')}
          onClick={go('/images')}
        >
          <div
            className={`collection-preview images-preview ${images.length ? 'has-images' : ''}`}
          >
            {images.length ? (
              images
                .slice(0, 4)
                .map((item) => (
                  <img
                    key={item.id}
                    src={itemMedia(item)}
                    alt={item.title || 'Collected archive image'}
                  />
                ))
            ) : (
              <span>
                12 IMAGE FILES
                <br />
                NOT SUPPLIED
              </span>
            )}
          </div>
          <div className="collection-meta">
            <span>01 / 12 IMAGES</span>
            <span>
              {images.length} {images.length === 1 ? 'IMAGE' : 'IMAGES'}
            </span>
            <span className="open-label">OPEN →</span>
          </div>
        </a>
        <a
          className="collection-card"
          href={sitePath('/brainstorm')}
          onClick={go('/brainstorm')}
        >
          <div className="collection-preview brainstorm-preview">
            {brainstorm && (
              <img
                src={itemMedia(brainstorm)}
                alt="Handwritten brainstorm map about recording a life"
              />
            )}
          </div>
          <div className="collection-meta">
            <span>02 / {brainstormTitle}</span>
            <span>{brainstorm ? '1 MAP' : '0 MAPS'}</span>
            <span className="open-label">OPEN →</span>
          </div>
        </a>
        <a
          className="collection-card"
          href={sitePath('/questions')}
          onClick={go('/questions')}
        >
          <div className="collection-preview question-preview">
            {questions.slice(0, 4).map((item) => (
              <img
                key={item.id}
                src={itemMedia(item)}
                alt={item.transcription || item.title}
              />
            ))}
          </div>
          <div className="collection-meta">
            <span>03 / QUESTIONS FROM OTHERS</span>
            <span>{questions.length} QUESTIONS</span>
            <span className="open-label">OPEN →</span>
          </div>
        </a>
      </section>
    </div>
  );
}

interface ListingProps {
  items: ArchiveItem[];
  view: ViewMode;
  setView: (view: ViewMode) => void;
  editMode: boolean;
  onNavigate: (path: string) => void;
  onEdit: (item: ArchiveItem) => void;
  onAdd: () => void;
  draggedId: string | null;
  setDraggedId: (id: string | null) => void;
  onDrop: (id: string) => void;
}

function CollectionHeading({
  number,
  title,
  count,
  view,
  setView,
}: {
  number: string;
  title: string;
  count: number;
  view: ViewMode;
  setView: (view: ViewMode) => void;
}) {
  return (
    <div className="collection-heading">
      <div>
        <span>{number}</span>
        <h1>{title}</h1>
        <p>{count} BLOCKS</p>
      </div>
      <div className="view-controls">
        <button
          className={view === 'grid' ? 'active' : ''}
          onClick={() => setView('grid')}
        >
          GRID
        </button>
        <button
          className={view === 'index' ? 'active' : ''}
          onClick={() => setView('index')}
        >
          INDEX
        </button>
      </div>
    </div>
  );
}

function QuestionsPage(props: ListingProps) {
  return (
    <section className="collection-page">
      <CollectionHeading
        number="03"
        title="QUESTIONS FROM OTHERS"
        count={props.items.length}
        view={props.view}
        setView={props.setView}
      />
      {props.view === 'grid' ? (
        <BlockGrid {...props} collection="questions" />
      ) : (
        <IndexList {...props} />
      )}
      {props.editMode && (
        <button className="inline-add" onClick={props.onAdd}>
          + ADD QUESTION
        </button>
      )}
    </section>
  );
}

function ImagesPage(props: ListingProps) {
  return (
    <section className="collection-page">
      <CollectionHeading
        number="01"
        title="12 IMAGES"
        count={props.items.length}
        view={props.view}
        setView={props.setView}
      />
      {props.items.length === 0 ? (
        <div className="empty-collection">
          <span>NO IMAGE FILES WERE SUPPLIED.</span>
          <p>
            The collection is ready for original images, captions, and sources.
          </p>
          {props.editMode && (
            <button className="text-button" onClick={props.onAdd}>
              + ADD FIRST IMAGE
            </button>
          )}
        </div>
      ) : props.view === 'grid' ? (
        <BlockGrid {...props} collection="images" />
      ) : (
        <IndexList {...props} />
      )}
    </section>
  );
}

function BlockGrid(props: ListingProps & { collection: CollectionType }) {
  return (
    <div
      className={`block-grid ${props.collection === 'images' ? 'image-grid' : 'question-grid'}`}
    >
      {props.items.map((item) => {
        const number = itemNumber(item, props.items);
        return (
          <article
            key={item.id}
            className={`archive-block ${item.collection === 'images' ? `image-${item.orientation || 'landscape'}` : ''} ${props.draggedId === item.id ? 'is-dragged' : ''}`}
            draggable={props.editMode}
            onDragStart={() => props.setDraggedId(item.id)}
            onDragEnd={() => props.setDraggedId(null)}
            onDragOver={(event) => {
              if (props.editMode) event.preventDefault();
            }}
            onDrop={() => props.onDrop(item.id)}
          >
            <a
              href={sitePath(`/${item.collection}/${item.id}`)}
              onClick={(event) => {
                event.preventDefault();
                props.onNavigate(`/${item.collection}/${item.id}`);
              }}
            >
              <div className="block-media">
                {item.mimeType === 'application/pdf' ? (
                  <object
                    data={itemMedia(item)}
                    type="application/pdf"
                    aria-label={item.title}
                  >
                    Archive PDF
                  </object>
                ) : item.collection === 'images' ? (
                  <div className="image-print-frame">
                    <img
                      src={itemMedia(item)}
                      alt={
                        item.transcription ||
                        item.title ||
                        `Archive block ${number}`
                      }
                    />
                  </div>
                ) : (
                  <img
                    src={itemMedia(item)}
                    alt={
                      item.transcription ||
                      item.title ||
                      `Archive block ${number}`
                    }
                  />
                )}
              </div>
              <div className="block-meta">
                {item.collection === 'questions' && (
                  <span>QUESTION {number}</span>
                )}
                {item.title && item.collection === 'images' && (
                  <span>{item.title}</span>
                )}
                {item.collection !== 'images' && (
                  <time>{item.date || item.dateAdded}</time>
                )}
              </div>
            </a>
            {props.editMode && (
              <button className="block-edit" onClick={() => props.onEdit(item)}>
                {item.collection === 'images' ? 'REPLACE / EDIT' : 'EDIT'}
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
}

function IndexList(props: ListingProps) {
  return (
    <div className="index-list">
      {props.items.map((item) => (
        <div
          className={`index-row ${item.collection === 'images' ? 'image-index-row' : ''}`}
          key={item.id}
          draggable={props.editMode}
          onDragStart={() => props.setDraggedId(item.id)}
          onDragOver={(event) => props.editMode && event.preventDefault()}
          onDrop={() => props.onDrop(item.id)}
        >
          <a
            href={sitePath(`/${item.collection}/${item.id}`)}
            onClick={(event) => {
              event.preventDefault();
              props.onNavigate(`/${item.collection}/${item.id}`);
            }}
          >
            {item.collection === 'questions' && (
              <span>{itemNumber(item, props.items)}</span>
            )}
            <p>{item.transcription || item.title || 'UNTITLED'}</p>
            <span>OPEN →</span>
          </a>
          {props.editMode && (
            <button className="text-button" onClick={() => props.onEdit(item)}>
              EDIT
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function DetailView({
  item,
  items,
  editMode,
  onNavigate,
  onEdit,
}: {
  item: ArchiveItem;
  items: ArchiveItem[];
  editMode: boolean;
  onNavigate: (path: string) => void;
  onEdit: (item: ArchiveItem) => void;
}) {
  const index = items.findIndex((candidate) => candidate.id === item.id);
  const previous = items[index - 1];
  const next = items[index + 1];
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && previous)
        onNavigate(`/${previous.collection}/${previous.id}`);
      if (event.key === 'ArrowRight' && next)
        onNavigate(`/${next.collection}/${next.id}`);
      if (event.key === 'Escape') onNavigate(`/${item.collection}`);
    };
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
  }, [item, previous, next, onNavigate]);

  const number = itemNumber(item, items);
  return (
    <article className="detail-view">
      <div className="detail-breadcrumb">
        LIVING ARCHIVE /{' '}
        {item.collection === 'questions' ? 'QUESTIONS' : '12 IMAGES'} /{' '}
        {item.collection === 'questions' ? number : item.title}
      </div>
      <div className="detail-layout">
        <div
          className={`detail-media ${item.collection === 'images' ? `image-${item.orientation || 'landscape'}` : ''}`}
        >
          {item.mimeType === 'application/pdf' ? (
            <object
              data={itemMedia(item)}
              type="application/pdf"
              aria-label={item.title}
            >
              Archive PDF
            </object>
          ) : (
            <img
              src={itemMedia(item)}
              alt={item.transcription || item.title || `Archive item ${number}`}
            />
          )}
        </div>
        <aside className="detail-meta">
          {item.collection === 'questions' && <span>QUESTION {number}</span>}
          {item.title && <h1>{item.title}</h1>}
          {item.transcription && (
            <section>
              <h2>TRANSCRIPTION</h2>
              <p>{item.transcription}</p>
            </section>
          )}
          {item.caption && (
            <section>
              <h2>CAPTION</h2>
              <p>{item.caption}</p>
            </section>
          )}
          {(item.sourceName || item.sourceUrl) && (
            <section>
              <h2>SOURCE</h2>
              {item.sourceUrl ? (
                <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                  {item.sourceName || item.sourceUrl} ↗
                </a>
              ) : (
                <p>{item.sourceName}</p>
              )}
            </section>
          )}
          {item.creator && (
            <section>
              <h2>CREATOR</h2>
              <p>{item.creator}</p>
            </section>
          )}
          {item.note && (
            <section>
              <h2>
                {item.collection === 'images' ? 'WHY I SAVED THIS' : 'SOURCE'}
              </h2>
              <p>{item.note}</p>
            </section>
          )}
          {item.date && (
            <section>
              <h2>DATE</h2>
              <p>{item.date}</p>
            </section>
          )}
          <section>
            <h2>ADDED</h2>
            <p>{item.dateAdded}</p>
          </section>
          {editMode && (
            <button className="detail-edit" onClick={() => onEdit(item)}>
              {item.collection === 'images' ? 'REPLACE / EDIT IMAGE' : 'EDIT'}
            </button>
          )}
        </aside>
      </div>
      <nav className="detail-nav">
        {previous ? (
          <button
            onClick={() => onNavigate(`/${previous.collection}/${previous.id}`)}
          >
            ← PREVIOUS
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button onClick={() => onNavigate(`/${next.collection}/${next.id}`)}>
            NEXT →
          </button>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
