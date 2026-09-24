'use client';

/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */

import { ArchiveItem, brainstormTitle, itemMedia } from '@/data/archive';
import {
  researchDirections,
  reflection,
  studentIdImage,
  unseenActions,
  weekFourArchives,
  weekFourLenses,
  weekThreeArchiveImage,
  weekThreeEmailImage,
} from '@/data/weeks';
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

const aiPrompt = `I am researching my university student ID as both an everyday object and an interface that may produce an institutional record.

A March 1980 issue of Parsonspaper describes a Parsons Photo Lab that kept students' names on file and used paper cards to record which equipment they used and on what day. In 2026, I am asking whether my own Design Lab access records - such as dates, times, or visit counts across four years - can be retrieved from my student ID activity.

Analyze these two moments without inventing facts about The New School's current systems. What assumptions am I making when I treat access data as a personal archive? Discuss who creates the record, who owns or controls it, what the record includes and excludes, and how security, privacy, and institutional memory complicate its meaning.

End with one sharper research question.`;

export function WeekThreePage() {
  return (
    <article className="week-three-page">
      <WeekHeading
        number="03"
        date="SEP 17 2026"
        isoDate="2026-09-17"
        title="ACCESS / RECORD"
        description="Three encounters with the traces produced by a student ID."
      />

      <section className="week-three-opening" aria-labelledby="access-question">
        <p>STUDENT ID / ACCESS / INSTITUTIONAL MEMORY</p>
        <h1 id="access-question">
          WHO REMEMBERS EVERY TIME I ENTERED THE LAB?
        </h1>
        <p>
          My student ID opens doors and verifies that I belong. Each use may
          also create a record - about me, but not necessarily visible to me.
        </p>
      </section>

      <EncounterSection
        number="01"
        kind="A HUMAN BEING"
        title="ASKING FOR THE RECORD"
        description="An email to Henry Portillo, Senior Technician, Print Media."
      >
        <div className="encounter-evidence-grid">
          <figure className="encounter-figure email-evidence">
            <img
              src={weekThreeEmailImage}
              alt="Sent email to Henry Portillo asking about four years of Design Lab access records"
            />
            <figcaption>
              EVIDENCE 01 / SENT EMAIL / SEP 17 2026 / 9:08 PM
            </figcaption>
          </figure>
          <div className="encounter-copy">
            <p className="encounter-label">QUESTION</p>
            <h3>
              Does The New School retain a record of when my student ID was used
              to access the Design Lab?
            </h3>
            <p>
              I asked whether dates, times, or visit counts connected to my own
              ID could be retrieved across four years. I also asked who controls
              the record and whether retention or privacy policies limit access.
            </p>
            <dl className="encounter-facts">
              <div>
                <dt>PERSON</dt>
                <dd>Henry Portillo</dd>
              </div>
              <div>
                <dt>ROLE</dt>
                <dd>Senior Technician, Print Media</dd>
              </div>
              <div>
                <dt>STATUS</dt>
                <dd>Message sent / response pending</dd>
              </div>
            </dl>
          </div>
        </div>
      </EncounterSection>

      <EncounterSection
        number="02"
        kind="AN ARCHIVE"
        title="A PAPER ACCESS SYSTEM"
        description="Parsonspaper shows that lab use was recorded long before digital ID cards."
      >
        <div className="encounter-evidence-grid archive-evidence-grid">
          <figure className="encounter-figure archive-evidence">
            <img
              src={weekThreeArchiveImage}
              alt="Page four of Parsonspaper from March 1980, with three columns about laboratory policy and tuition"
            />
            <figcaption>
              EVIDENCE 02 / PARSONSPAPER / PHOTO LAB 1980 / PAGE 4
            </figcaption>
          </figure>
          <div className="encounter-copy">
            <p className="encounter-label">QUESTION ASKED OF THE ARCHIVE</p>
            <h3>
              How were students’ identities and lab use recorded before digital
              access systems - and why?
            </h3>
            <p>
              The article describes a paper card system that held a student’s
              name, department, and address while a separate sheet recorded
              equipment and dates. The system was created for security, but it
              also made patterns of presence and frequency visible.
            </p>
            <blockquote>
              “Helmond has on file the names of all students who use the
              facilities and equipment.”
            </blockquote>
            <p className="source-note">
              Susan Magnus, “Photo Lab 1980,” <i>Parsonspaper</i>, Vol. 5, No.
              1, March 1980. The New School Archives and Special Collections.
            </p>
            <a
              className="source-link"
              href="https://digital.archives.newschool.edu/index.php/Detail/objects/NS050601_ParsonsPaper_1980_001"
              target="_blank"
              rel="noreferrer"
            >
              VIEW ARCHIVE SOURCE ↗
            </a>
          </div>
        </div>
      </EncounterSection>

      <EncounterSection
        number="03"
        kind="A PROMPT FOR AI"
        title="WHAT THE TIMESTAMP CANNOT SAY"
        description="A prompt tests whether access data can function as personal memory."
      >
        <div className="ai-encounter-grid">
          <div className="prompt-record">
            <p className="encounter-label">EXACT PROMPT</p>
            <pre>{aiPrompt}</pre>
          </div>
          <div className="ai-reading">
            <p className="encounter-label">EVIDENCE 03 / RESPONSE TRACE</p>
            <blockquote>
              An access log may document that a credential was used, but it
              cannot explain what the visit meant.
            </blockquote>
            <p>
              The response exposed four assumptions: that the record exists,
              that it has been retained for four years, that I am allowed to see
              it, and that a timestamp can stand in for a lived visit.
            </p>
            <p>
              AI could interpret the gap between data and memory, but it could
              not verify The New School’s present system. That answer still
              depends on the human encounter.
            </p>
          </div>
        </div>
      </EncounterSection>

      <section
        className="connection-section"
        aria-labelledby="connection-heading"
      >
        <header>
          <p>04 / CONNECT THE THREE ENCOUNTERS</p>
          <h2 id="connection-heading">THREE RECORDS, THREE LIMITS</h2>
        </header>
        <div className="connection-grid">
          <article>
            <span>HUMAN</span>
            <h3>ACCESS TO THE PRESENT</h3>
            <p>
              Henry may confirm whether a current record exists, who controls
              it, and whether I can see my own data.
            </p>
          </article>
          <article>
            <span>ARCHIVE</span>
            <h3>A HISTORICAL PRECEDENT</h3>
            <p>
              The 1980 paper card shows that recording lab use began as a tool
              for security, access, and resource management.
            </p>
          </article>
          <article>
            <span>AI</span>
            <h3>THE MISSING EXPERIENCE</h3>
            <p>
              AI separates an administrative trace from the reasons, duration,
              work, and meaning of an actual visit.
            </p>
          </article>
        </div>
        <div className="encounter-gap">
          <span>GAP</span>
          <p>
            The archive proves that tracking has a history. The email asks what
            is tracked now. Until a reply or access log arrives, the present-day
            record remains absent.
          </p>
        </div>
        <div className="next-question">
          <p>NEXT RESEARCH QUESTION</p>
          <blockquote>
            IF AN INSTITUTION RECORDS MY PRESENCE BUT I CANNOT ACCESS OR
            INTERPRET THAT RECORD, IN WHAT SENSE IS IT PART OF MY PERSONAL
            HISTORY?
          </blockquote>
        </div>
      </section>
    </article>
  );
}

export function WeekFourPage() {
  return (
    <article className="week-four-page">
      <WeekHeading
        number="04"
        date="SEP 24 2026"
        isoDate="2026-09-24"
        title="POSSIBLE THESIS DIRECTIONS"
        description="One project, two complete archives, and three research lenses."
      />

      <section
        className="week-four-opening"
        aria-labelledby="research-field-heading"
      >
        <p>ONE PROJECT / TWO REQUIRED ARCHIVES</p>
        <h1 id="research-field-heading">
          FOUR BOOKS. FOUR YEARS. BOTH MUST REMAIN VISIBLE.
        </h1>
        <div>
          <p>
            My grandfather&apos;s four diary books and my four years in New York
            are the two required archives. Neither is background information,
            and neither can be replaced by a small sample.
          </p>
          <p>
            A prototype may begin with one day, one month, one repeated action,
            or one passage from each book. The final project still commits to
            presenting all four books and all four years.
          </p>
        </div>
      </section>

      <section className="required-archives" aria-label="Two required archives">
        {weekFourArchives.map((archive) => (
          <article className="required-archive" key={archive.marker}>
            <header>
              <span>ARCHIVE {archive.marker}</span>
              <div>
                <p>{archive.owner}</p>
                <h2>{archive.title}</h2>
              </div>
            </header>
            <p className="required-archive-description">
              {archive.description}
            </p>
            <ol>
              {archive.items.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </section>

      <section className="research-lenses" aria-labelledby="lenses-heading">
        <header>
          <p>WHAT CHANGES BETWEEN THE THREE DIRECTIONS?</p>
          <h2 id="lenses-heading">
            THE MATERIAL DOES NOT CHANGE. THE RESEARCH LENS CHANGES.
          </h2>
        </header>
        <div>
          {weekFourLenses.map((lens) => (
            <article key={lens.number}>
              <span>{lens.number}</span>
              <h3>{lens.title}</h3>
              <p>{lens.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="direction-sheets"
        aria-label="Three research directions"
      >
        {researchDirections.map((direction) => (
          <article className="direction-sheet" key={direction.number}>
            <header className="direction-sheet-header">
              <div>
                <span>DIRECTION {direction.number}</span>
                <span>WORKING TITLE</span>
              </div>
              <h2>{direction.title}</h2>
            </header>

            <section className="direction-question">
              <span>WORKING QUESTION</span>
              <div>
                <p>{direction.question}</p>
                <p className="direction-premise">{direction.premise}</p>
              </div>
            </section>

            <ol className="direction-responses">
              {direction.responses.map((response, index) => (
                <li key={response.prompt}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{response.prompt}</h3>
                    <p>{response.answer}</p>
                  </div>
                </li>
              ))}
            </ol>

            <footer className="direction-action">
              <span>FIRST RESEARCH ACTION</span>
              <p>{direction.firstAction}</p>
            </footer>
          </article>
        ))}
      </section>
    </article>
  );
}

function EncounterSection({
  number,
  kind,
  title,
  description,
  children,
}: {
  number: string;
  kind: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="encounter-section"
      aria-labelledby={`encounter-${number}`}
    >
      <header className="encounter-heading">
        <span>{number}</span>
        <div>
          <p>{kind}</p>
          <h2 id={`encounter-${number}`}>{title}</h2>
        </div>
        <p>{description}</p>
      </header>
      {children}
    </section>
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
