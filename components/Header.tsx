'use client';

/* oxlint-disable next/no-html-link-for-pages */

import { sitePath } from '@/lib/site-path';

interface HeaderProps {
  editMode: boolean;
  scheduleMode?: boolean;
  theme: 'dark' | 'light';
  onAdd: () => void;
  onNavigate: (path: string) => void;
  onToggleEdit: () => void;
  onToggleTheme: () => void;
}

export function Header({
  editMode,
  scheduleMode = false,
  theme,
  onAdd,
  onNavigate,
  onToggleEdit,
  onToggleTheme,
}: HeaderProps) {
  const label = (archiveLabel: string, scheduleLabel: string) =>
    scheduleMode ? scheduleLabel : archiveLabel;

  const go = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <header className="site-header">
      <a className="site-title" href={sitePath('/')} onClick={go('/')}>
        {label('LIVING ARCHIVE', 'Living Archive')}
      </a>
      <nav aria-label="Archive index">
        <a href={sitePath('/')} onClick={go('/')}>
          {label('INDEX', 'Index')}
        </a>
        <a href={sitePath('/week-01')} onClick={go('/week-01')}>
          {label('WEEK 01', 'Week 01')}
        </a>
        <a href={sitePath('/week-02')} onClick={go('/week-02')}>
          {label('WEEK 02', 'Week 02')}
        </a>
        <a href={sitePath('/week-03')} onClick={go('/week-03')}>
          {label('WEEK 03', 'Week 03')}
        </a>
        <a href={sitePath('/week-04')} onClick={go('/week-04')}>
          {label('WEEK 04', 'Week 04')}
        </a>
        <a href={sitePath('/week-05')} onClick={go('/week-05')}>
          {label('WEEK 05', 'Week 05')}
        </a>
        <a href={sitePath('/week-06')} onClick={go('/week-06')}>
          {label('WEEK 06', 'Week 06')}
        </a>
        <a href={sitePath('/week-07')} onClick={go('/week-07')}>
          {label('WEEK 07', 'Week 07')}
        </a>
        <a href={sitePath('/week-09')} onClick={go('/week-09')}>
          {label('WEEK 09', 'Week 09')}
        </a>
        <a href={sitePath('/week-12')} onClick={go('/week-12')}>
          {label('WEEK 12', 'Week 12')}
        </a>
        <a href={sitePath('/week-13')} onClick={go('/week-13')}>
          {label('WEEK 13', 'Week 13')}
        </a>
        <a href={sitePath('/week-14')} onClick={go('/week-14')}>
          {label('WEEK 14', 'Week 14')}
        </a>
      </nav>
      <div className="header-actions">
        <span className="updated">
          {label('UPDATED NOV 20 2026', 'Updated Nov 20 2026')}
        </span>
        <button
          className="text-button theme-trigger"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'white' : 'black'} mode`}
        >
          {label('THEME:', 'Theme:')} {theme === 'dark' ? label('BLACK', 'Black') : label('WHITE', 'White')}
        </button>
        <button className="text-button mode-trigger" onClick={onToggleEdit}>
          {editMode ? label('DONE', 'Done') : label('EDIT', 'Edit')}
        </button>
        {editMode && (
          <button className="text-button add-trigger" onClick={onAdd}>
            {label('+ ADD', '+ Add')}
          </button>
        )}
        <details className="mobile-index">
          <summary>
            {editMode ? label('+ / INDEX', '+ / Index') : label('INDEX', 'Index')}
          </summary>
          <div>
            <a href={sitePath('/')} onClick={go('/')}>
              {label('INDEX', 'Index')}
            </a>
            <a href={sitePath('/week-01')} onClick={go('/week-01')}>
              {label('WEEK 01 / SEP 02 2026', 'Week 01 / Sep 02 2026')}
            </a>
            <a href={sitePath('/week-02')} onClick={go('/week-02')}>
              {label('WEEK 02 / SEP 10 2026', 'Week 02 / Sep 10 2026')}
            </a>
            <a href={sitePath('/week-03')} onClick={go('/week-03')}>
              {label('WEEK 03 / SEP 17 2026', 'Week 03 / Sep 17 2026')}
            </a>
            <a href={sitePath('/week-04')} onClick={go('/week-04')}>
              {label('WEEK 04 / SEP 24 2026', 'Week 04 / Sep 24 2026')}
            </a>
            <a href={sitePath('/week-05')} onClick={go('/week-05')}>
              {label('WEEK 05 / OCT 01 2026', 'Week 05 / Oct 01 2026')}
            </a>
            <a href={sitePath('/week-06')} onClick={go('/week-06')}>
              {label('WEEK 06 / OCT 08 2026', 'Week 06 / Oct 08 2026')}
            </a>
            <a href={sitePath('/week-07')} onClick={go('/week-07')}>
              {label('WEEK 07 / OCT 09 2026', 'Week 07 / Oct 09 2026')}
            </a>
            <a href={sitePath('/week-09')} onClick={go('/week-09')}>
              {label('WEEK 09 / OCT 23 2026', 'Week 09 / Oct 23 2026')}
            </a>
            <a href={sitePath('/week-12')} onClick={go('/week-12')}>
              {label('WEEK 12 / NOV 12 2026', 'Week 12 / Nov 12 2026')}
            </a>
            <a href={sitePath('/week-13')} onClick={go('/week-13')}>
              {label('WEEK 13 / NOV 13 2026', 'Week 13 / Nov 13 2026')}
            </a>
            <a href={sitePath('/week-14')} onClick={go('/week-14')}>
              {label('WEEK 14 / NOV 20 2026', 'Week 14 / Nov 20 2026')}
            </a>
            <button className="text-button" onClick={onToggleTheme}>
              {theme === 'dark'
                ? label('SWITCH TO WHITE MODE', 'Switch to white mode')
                : label('SWITCH TO BLACK MODE', 'Switch to black mode')}
            </button>
            <button className="text-button" onClick={onToggleEdit}>
              {editMode
                ? label('DONE EDITING', 'Done editing')
                : label('EDIT ARCHIVE', 'Edit archive')}
            </button>
            {editMode && (
              <button className="text-button" onClick={onAdd}>
                {label('+ ADD', '+ Add')}
              </button>
            )}
          </div>
        </details>
      </div>
    </header>
  );
}
