'use client';

/* oxlint-disable react/react-compiler, jsx-a11y/no-noninteractive-element-interactions, next/no-img-element */

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArchiveItem,
  brainstormTitle,
  CollectionType,
  itemMedia,
} from '@/data/archive';
import { storeFile } from '@/lib/archive-store';

interface AddPanelProps {
  open: boolean;
  item?: ArchiveItem | null;
  initialCollection?: CollectionType;
  onClose: () => void;
  onSave: (item: ArchiveItem) => void;
  onDelete?: (item: ArchiveItem) => void;
}

export function AddPanel({
  open,
  item,
  initialCollection,
  onClose,
  onSave,
  onDelete,
}: AddPanelProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDialogElement>(null);
  const [collection, setCollection] = useState<CollectionType | ''>('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [transcription, setTranscription] = useState('');
  const [caption, setCaption] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [creator, setCreator] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [quickUrl, setQuickUrl] = useState('');
  const [orderInput, setOrderInput] = useState('');
  const [brainstormMode, setBrainstormMode] = useState<'replace' | 'new'>(
    'replace',
  );

  const acceptFile = useCallback((nextFile: File) => {
    setFile(nextFile);
    setPreview(URL.createObjectURL(nextFile));
  }, []);

  useEffect(() => {
    if (!open) return;
    setCollection(item?.collection || initialCollection || '');
    setFile(null);
    setPreview(item ? itemMedia(item) : '');
    setTitle(
      item?.collection === 'brainstorm' ? brainstormTitle : item?.title || '',
    );
    setTranscription(item?.transcription || '');
    setCaption(item?.caption || '');
    setSourceUrl(item?.sourceUrl || '');
    setSourceName(item?.sourceName || '');
    setCreator(item?.creator || '');
    setDate(item?.date || '');
    setNote(item?.note || '');
    setQuickUrl('');
    setOrderInput(item ? String(item.order + 1) : '');
    setBrainstormMode('replace');
    requestAnimationFrame(() => closeRef.current?.focus());
  }, [open, item, initialCollection]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const focusable = [
          ...(panelRef.current?.querySelectorAll<HTMLElement>(
            'button:not(:disabled), input:not(:disabled), textarea, [href], [tabindex]:not([tabindex="-1"])',
          ) || []),
        ];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const onPaste = (event: ClipboardEvent) => {
      const pastedFile = [...(event.clipboardData?.files || [])][0];
      if (pastedFile) acceptFile(pastedFile);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('paste', onPaste);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('paste', onPaste);
    };
  }, [open, onClose, acceptFile]);

  if (!open) return null;

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) acceptFile(droppedFile);
    else {
      const droppedUrl =
        event.dataTransfer.getData('text/uri-list') ||
        event.dataTransfer.getData('text/plain');
      if (droppedUrl) {
        setQuickUrl(droppedUrl);
        setPreview(droppedUrl);
      }
    }
  };

  const submit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!collection) return;
    if (!item && !file && !quickUrl && collection !== 'brainstorm') return;
    if (
      collection === 'brainstorm' &&
      brainstormMode === 'replace' &&
      !item &&
      !window.confirm('REPLACE THE CURRENT BRAINSTORM IMAGE?')
    )
      return;

    const idPrefix =
      collection === 'brainstorm' ? 'brainstorm' : collection.slice(0, -1);
    const id = item?.id || `${idPrefix}-${crypto.randomUUID()}`;
    let mediaUrl = item?.mediaUrl || quickUrl;
    if (file) mediaUrl = await storeFile(file, id);
    const type =
      collection === 'questions'
        ? 'question'
        : collection === 'brainstorm'
          ? 'brainstorm'
          : 'image';
    onSave({
      ...item,
      id,
      collection,
      type,
      title:
        collection === 'brainstorm'
          ? brainstormTitle
          : title || (collection === 'questions' ? 'QUESTION' : undefined),
      mediaUrl,
      resolvedUrl: preview && (file || quickUrl) ? preview : item?.resolvedUrl,
      mimeType:
        file?.type || item?.mimeType || (quickUrl ? 'image/url' : undefined),
      transcription: transcription || undefined,
      caption: caption || undefined,
      sourceUrl: sourceUrl || undefined,
      sourceName: sourceName || undefined,
      creator: creator || undefined,
      date: date || undefined,
      note: note || undefined,
      dateAdded: item?.dateAdded || new Date().toISOString().slice(0, 10),
      order:
        item && orderInput
          ? Math.max(0, Number(orderInput) - 1)
          : (item?.order ??
            (collection === 'brainstorm' && brainstormMode === 'replace'
              ? -1
              : Number.MAX_SAFE_INTEGER)),
    });
  };

  return (
    <div className="panel-scrim">
      <dialog
        ref={panelRef}
        open
        className="add-panel"
        aria-modal="true"
        aria-labelledby="add-panel-title"
      >
        <div className="panel-heading">
          <h2 id="add-panel-title">
            {item?.collection === 'images'
              ? 'REPLACE / EDIT IMAGE'
              : item
                ? 'EDIT ARCHIVE ITEM'
                : 'ADD TO LIVING ARCHIVE'}
          </h2>
          <button
            ref={closeRef}
            className="text-button close-button"
            onClick={onClose}
            aria-label="Close add panel"
          >
            ×
          </button>
        </div>

        <form onSubmit={submit}>
          <label
            className={`quick-drop ${file || quickUrl ? 'has-file' : ''}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={onDrop}
          >
            <span>
              {file
                ? file.name
                : quickUrl
                  ? 'URL DETECTED'
                  : item
                    ? 'CHOOSE A NEW FILE TO REPLACE THE CURRENT ONE'
                    : 'DROP OR PASTE ANYTHING HERE'}
            </span>
            <small>
              {item ? 'OPTIONAL · IMAGE / PDF / URL' : 'IMAGE / PDF / URL'}
            </small>
            <input
              type="file"
              accept="image/*,.pdf,application/pdf"
              onChange={(event) =>
                event.target.files?.[0] && acceptFile(event.target.files[0])
              }
            />
          </label>

          {!file && (
            <label className="field">
              <span>PASTE IMAGE URL</span>
              <input
                type="url"
                value={quickUrl}
                onChange={(event) => {
                  setQuickUrl(event.target.value);
                  setPreview(event.target.value);
                }}
                placeholder="https://"
              />
            </label>
          )}

          <fieldset className="collection-choice">
            <legend>WHERE DOES THIS BELONG?</legend>
            {(
              [
                ['brainstorm', 'BRAINSTORM'],
                ['questions', 'QUESTIONS'],
                ['images', '12 IMAGES'],
              ] as const
            ).map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="collection"
                  value={value}
                  checked={collection === value}
                  onChange={() => setCollection(value)}
                />
                <span>{label}</span>
              </label>
            ))}
            <label className="future-option">
              <input type="radio" disabled />
              <span>
                NEW COLLECTION <small>FUTURE</small>
              </span>
            </label>
          </fieldset>

          {collection && (
            <div className="metadata-fields">
              {collection === 'brainstorm' && !item && (
                <fieldset className="inline-choice">
                  <legend>MAP BEHAVIOR</legend>
                  <label>
                    <input
                      type="radio"
                      checked={brainstormMode === 'replace'}
                      onChange={() => setBrainstormMode('replace')}
                    />{' '}
                    REPLACE CURRENT MAP
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={brainstormMode === 'new'}
                      onChange={() => setBrainstormMode('new')}
                    />{' '}
                    ADD AS NEW MAP
                  </label>
                </fieldset>
              )}
              <label className="field">
                <span>
                  TITLE {collection !== 'brainstorm' && <small>OPTIONAL</small>}
                </span>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </label>
              {collection === 'questions' && (
                <label className="field">
                  <span>
                    TRANSCRIPTION <small>REVIEW BEFORE SAVING</small>
                  </span>
                  <textarea
                    rows={5}
                    value={transcription}
                    onChange={(event) => setTranscription(event.target.value)}
                    placeholder="Leave blank when handwriting is uncertain."
                  />
                </label>
              )}
              {collection === 'images' && (
                <>
                  <label className="field">
                    <span>
                      CAPTION <small>OPTIONAL</small>
                    </span>
                    <textarea
                      rows={3}
                      value={caption}
                      onChange={(event) => setCaption(event.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span>
                      SOURCE URL <small>OPTIONAL</small>
                    </span>
                    <input
                      type="url"
                      value={sourceUrl}
                      onChange={(event) => setSourceUrl(event.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span>
                      SOURCE NAME <small>OPTIONAL</small>
                    </span>
                    <input
                      value={sourceName}
                      onChange={(event) => setSourceName(event.target.value)}
                    />
                  </label>
                  <label className="field">
                    <span>
                      CREATOR <small>OPTIONAL</small>
                    </span>
                    <input
                      value={creator}
                      onChange={(event) => setCreator(event.target.value)}
                    />
                  </label>
                </>
              )}
              <label className="field">
                <span>
                  DATE <small>OPTIONAL</small>
                </span>
                <input
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  placeholder="SEP 2026"
                />
              </label>
              {item && collection !== 'brainstorm' && (
                <label className="field">
                  <span>ORDER</span>
                  <input
                    type="number"
                    min="1"
                    value={orderInput}
                    onChange={(event) => setOrderInput(event.target.value)}
                  />
                </label>
              )}
              <label className="field">
                <span>
                  {collection === 'images' ? 'WHY I SAVED THIS' : 'NOTE'}{' '}
                  <small>OPTIONAL</small>
                </span>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
              </label>
            </div>
          )}

          {preview && (
            <div className="upload-preview">
              {file?.type === 'application/pdf' ||
              item?.mimeType === 'application/pdf' ? (
                <object
                  data={preview}
                  type="application/pdf"
                  aria-label="Pending archive PDF preview"
                >
                  PDF preview
                </object>
              ) : (
                <img src={preview} alt="Pending archive upload preview" />
              )}
            </div>
          )}

          <div className="panel-actions">
            {item && onDelete && (
              <button
                type="button"
                className="danger-button"
                onClick={() => onDelete(item)}
              >
                DELETE
              </button>
            )}
            <button
              type="submit"
              className="submit-button"
              disabled={
                !collection ||
                (!item && !file && !quickUrl && collection !== 'brainstorm')
              }
            >
              {item
                ? 'SAVE CHANGES'
                : !collection
                  ? 'CHOOSE COLLECTION'
                  : collection === 'questions'
                    ? 'ADD QUESTION'
                    : collection === 'images'
                      ? 'ADD IMAGE'
                      : 'SAVE MAP'}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
