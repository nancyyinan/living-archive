'use client';

/* oxlint-disable next/no-html-link-for-pages */

import { sitePath } from '@/lib/site-path';

interface HeaderProps {
  editMode: boolean;
  theme: 'dark' | 'light';
  onAdd: () => void;
  onNavigate: (path: string) => void;
  onToggleEdit: () => void;
  onToggleTheme: () => void;
}

export function Header({
  editMode,
  theme,
  onAdd,
  onNavigate,
  onToggleEdit,
  onToggleTheme,
}: HeaderProps) {
  const go = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <header className="site-header">
      <a className="site-title" href={sitePath('/')} onClick={go('/')}>
        LIVING ARCHIVE
      </a>
      <nav aria-label="Archive collections">
        <a href={sitePath('/images')} onClick={go('/images')}>
          01 IMAGES
        </a>
        <a href={sitePath('/brainstorm')} onClick={go('/brainstorm')}>
          02 BRAINSTORM
        </a>
        <a href={sitePath('/questions')} onClick={go('/questions')}>
          03 QUESTIONS
        </a>
      </nav>
      <div className="header-actions">
        <span className="updated">UPDATED SEP 02 2026</span>
        <button
          className="text-button theme-trigger"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'white' : 'black'} mode`}
        >
          THEME: {theme === 'dark' ? 'BLACK' : 'WHITE'}
        </button>
        <button className="text-button mode-trigger" onClick={onToggleEdit}>
          {editMode ? 'DONE' : 'EDIT'}
        </button>
        {editMode && (
          <button className="text-button add-trigger" onClick={onAdd}>
            + ADD
          </button>
        )}
        <details className="mobile-index">
          <summary>{editMode ? '+ / INDEX' : 'INDEX'}</summary>
          <div>
            <a href={sitePath('/images')} onClick={go('/images')}>
              01 IMAGES
            </a>
            <a href={sitePath('/brainstorm')} onClick={go('/brainstorm')}>
              02 BRAINSTORM
            </a>
            <a href={sitePath('/questions')} onClick={go('/questions')}>
              03 QUESTIONS
            </a>
            <button className="text-button" onClick={onToggleTheme}>
              SWITCH TO {theme === 'dark' ? 'WHITE' : 'BLACK'} MODE
            </button>
            <button className="text-button" onClick={onToggleEdit}>
              {editMode ? 'DONE EDITING' : 'EDIT ARCHIVE'}
            </button>
            {editMode && (
              <button className="text-button" onClick={onAdd}>
                + ADD
              </button>
            )}
          </div>
        </details>
      </div>
    </header>
  );
}
