'use client';

/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */

import { ArchiveItem, brainstormTitle, itemMedia } from '@/data/archive';
import { reflection, studentIdImage, unseenActions } from '@/data/weeks';
import { sitePath } from '@/lib/site-path';

interface WeekPageProps {
  items: ArchiveItem[];
  onNavigate: (path: string) => void;
}

export function WeekOnePage({ items, onNavigate }: WeekPageProps) {
  const images = items
    .filter((item) => item.collection === 'images')
    .sort((a, b) => a.order - b.order);
  const questions = items
    .filter((item) => item.collection === 'questions')
    .sort((a, b) => a.order - b.order);
  const brainstorm = items.find((item) => item.collection === 'brainstorm');
  const go = (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="week-one-page">
      <WeekHeading
        number="01"
        date="SEP 02 2026"
        isoDate="2026-09-02"
        title="BEGINNING THE ARCHIVE"
        description="Images, a thesis brainstorm, and questions from others."
      />
      <section className="collection-grid" aria-label="Week 1 collections">
        <a
          className="collection-card"
          href={sitePath('/images')}
          onClick={go('/images')}
        >
          <div className="collection-preview images-preview has-images">
            {images.slice(0, 4).map((item) => (
              <img
                key={item.id}
                src={itemMedia(item)}
                alt={item.title || 'Collected archive image'}
              />
            ))}
          </div>
          <div className="collection-meta">
            <span>01 / 12 IMAGES</span>
            <span>{images.length} IMAGES</span>
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

export function WeekTwoPage() {
  return (
    <article className="week-two-page">
      <WeekHeading
        number="02"
        date="SEP 10 2026"
        isoDate="2026-09-10"
        title="READING + EVERYDAY OBJECT"
        description="One student ID, traced through the systems and experiences that made it."
      />
      <section
        className="week-two-opening"
        aria-labelledby="student-id-heading"
      >
        <figure className="student-id-figure">
          <img
            src={studentIdImage}
            alt="A worn red student ID covered with personal stickers"
          />
          <figcaption>
            OBJECT 01 / STUDENT ID / PERSONAL PHOTOGRAPH / ID NUMBER REDACTED
          </figcaption>
        </figure>
        <div className="student-id-intro">
          <p>EVERYDAY OBJECT</p>
          <h1 id="student-id-heading">
            A STUDENT ID IS AN INCOMPLETE RECORD OF WHERE I HAVE BEEN.
          </h1>
          <p className="object-deck">
            It identifies me to an institution. Its wear begins to record who I
            became.
          </p>
        </div>
      </section>
      <section
        className="study-section unseen-section"
        aria-labelledby="unseen-actions-heading"
      >
        <StudySectionHeading
          number="02"
          eyebrow="HIDDEN INFRASTRUCTURE"
          title="10 UNSEEN ACTIONS"
          description="The card is formed through material, institutional, technological, and personal processes."
          id="unseen-actions-heading"
        />
        <ol className="actions-list">
          {unseenActions.map((action, index) => (
            <li key={action.stage}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{action.stage}</span>
              <p>{action.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section
        className="study-section reflection-section"
        aria-labelledby="reflection-heading"
      >
        <StudySectionHeading
          number="03"
          eyebrow="256 BOOK + THESIS"
          title="REFLECTION"
          description="From institutional identification to an intergenerational practice of recording."
          id="reflection-heading"
        />
        <div className="reflection-layout">
          <blockquote>
            MY STUDENT ID PROVES THAT I STUDIED IN NEW YORK, BUT CAN IT RECORD
            WHO I BECAME HERE?
          </blockquote>
          <div className="reflection-copy">
            {reflection.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <span>200 WORDS / WRITTEN SEP 10 2026</span>
          </div>
        </div>
      </section>
    </article>
  );
}

function StudySectionHeading({
  number,
  eyebrow,
  title,
  description,
  id,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <header className="study-section-heading">
      <span>{number}</span>
      <div>
        <p>{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <p>{description}</p>
    </header>
  );
}

function WeekHeading({
  number,
  date,
  isoDate,
  title,
  description,
}: {
  number: string;
  date: string;
  isoDate: string;
  title: string;
  description: string;
}) {
  return (
    <header className="week-heading">
      <span>WEEK {number}</span>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <time dateTime={isoDate}>{date}</time>
    </header>
  );
}
