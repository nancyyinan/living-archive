'use client';

interface ScheduleDay {
  date: string;
  day: string;
  title: string;
  tasks: string[];
  output: string;
  quiet?: boolean;
}

interface ScheduleWeek {
  number: string;
  dates: string;
  phase: string;
  mode: string;
  goal: string;
  question: string;
  days: ScheduleDay[];
  deliverables: string[];
}

const scheduleWeeks: ScheduleWeek[] = [
  {
    number: '01',
    dates: 'NOV 16—22',
    phase: 'EXPLORE & NARROW',
    mode: 'RESEARCH',
    goal:
      'Move from broad interests—AI, collective memory, and historical change—toward a small number of concrete, researchable subjects.',
    question: 'WHAT IS THE THING I AM ACTUALLY TRYING TO UNDERSTAND?',
    days: [
      {
        date: 'NOV 16',
        day: 'MON',
        title: 'REFRAME THE RESEARCH INTEREST',
        tasks: [
          'Review the November 13 meeting and previous thesis work.',
          'Separate research interest, research subject, and design outcome.',
          'Write what I am trying to understand before considering form.',
        ],
        output: 'WORKING RESEARCH-INTEREST STATEMENT + SELECTION CRITERIA',
      },
      {
        date: 'NOV 17',
        day: 'TUE',
        title: 'GENERATE TANGIBLE SUBJECTS',
        tasks: [
          'List 5–7 possible objects, places, infrastructures, records, or events.',
          'Include at least one subject connected to personal experience.',
          'Reduce the list to three specific, investigable candidates.',
        ],
        output: '3 CANDIDATE SUBJECTS + ONE-SENTENCE RATIONALE FOR EACH',
      },
      {
        date: 'NOV 18',
        day: 'WED',
        title: 'RUN AN EVIDENCE TEST',
        tasks: [
          'Find one object or place and one dated event for each candidate.',
          'Find one quantitative record and one human voice.',
          'Identify one contradiction between perspectives.',
        ],
        output: 'A FIVE-PART EVIDENCE SAMPLE FOR EACH CANDIDATE',
      },
      {
        date: 'NOV 19',
        day: 'THU',
        title: 'COMPARE THE CANDIDATES',
        tasks: [
          'Compare personal connection, relevance, evidence, and accessibility.',
          'Mark where the scope is too broad or information is inaccessible.',
          'Ask what each subject reveals beyond a conventional timeline.',
        ],
        output: 'THREE-SUBJECT COMPARISON MATRIX',
      },
      {
        date: 'NOV 20',
        day: 'FRI',
        title: 'SELECT THE PRIMARY SUBJECT',
        tasks: [
          'Choose one primary subject and one backup.',
          'Define what, where, who, and which time span matters.',
          'Draft 2–3 provisional questions without assuming a conclusion.',
        ],
        output: 'SELECTED SUBJECT + BOUNDED SCOPE + PROVISIONAL QUESTION',
      },
      {
        date: 'NOV 21',
        day: 'SAT',
        title: 'TEST RESEARCH POTENTIAL',
        tasks: [
          'Conduct a focused source search.',
          'Map possible records, datasets, reporting, voices, images, and maps.',
          'Record access limitations and ethical or factual risks.',
        ],
        output: 'PRELIMINARY SOURCE MAP + FEASIBILITY NOTES',
      },
      {
        date: 'NOV 22',
        day: 'SUN',
        title: 'SYNTHESIZE WEEK 1',
        tasks: [
          'Write a one-page research direction statement.',
          'Explain why the subject matters and what larger system it touches.',
          'Review the scope and revise the provisional question.',
        ],
        output: 'ONE-PAGE RESEARCH DIRECTION STATEMENT',
      },
    ],
    deliverables: [
      'ONE-PAGE RESEARCH DIRECTION STATEMENT',
      'COMPARISON OF THREE TANGIBLE SUBJECTS',
      'ONE SELECTED PRIMARY SUBJECT',
      'PROVISIONAL QUESTION + SOURCE MAP',
    ],
  },
  {
    number: '02',
    dates: 'NOV 23—29',
    phase: 'INVESTIGATE & COLLECT',
    mode: 'EVIDENCE',
    goal:
      'Investigate the selected subject like a journalist, gathering different forms of evidence rather than immediately designing the interface.',
    question: 'WHAT RECORDS AND PERSPECTIVES EXIST?',
    days: [
      {
        date: 'NOV 23',
        day: 'MON',
        title: 'BUILD THE INVESTIGATION',
        tasks: [
          'Turn the provisional question into 4–6 research subquestions.',
          'Create quantitative, qualitative, historical, spatial, institutional, and personal categories.',
          'Establish a source log for provenance, reliability, and relevance.',
        ],
        output: 'SUBQUESTIONS + EVIDENCE CATEGORIES + SOURCE-LOG TEMPLATE',
      },
      {
        date: 'NOV 24',
        day: 'TUE',
        title: 'COLLECT QUANTITATIVE + SPATIAL EVIDENCE',
        tasks: [
          'Gather datasets, measurements, maps, permits, budgets, or utility records.',
          'Record units, time ranges, boundaries, missing values, and methods.',
          'Do not treat correlation as causation.',
        ],
        output: 'DOCUMENTED QUANTITATIVE + SPATIAL EVIDENCE SET',
      },
      {
        date: 'NOV 25',
        day: 'WED',
        title: 'COLLECT HISTORICAL + INSTITUTIONAL EVIDENCE',
        tasks: [
          'Build a factual chronology of major decisions and events.',
          'Collect policy, planning, institutional, news, and archival records.',
          'Note who created each record and which perspective is absent.',
        ],
        output: 'SOURCED CHRONOLOGY + INSTITUTIONAL EVIDENCE FOLDER',
      },
      {
        date: 'NOV 26',
        day: 'THU',
        title: 'THANKSGIVING / LIGHT REVIEW',
        tasks: [
          'Keep the day flexible; no major milestone is required.',
          'If time allows, clean filenames, update citations, and note gaps.',
        ],
        output: 'OPTIONAL ARCHIVE CLEANUP + SHORT GAP LIST',
        quiet: true,
      },
      {
        date: 'NOV 27',
        day: 'FRI',
        title: 'COLLECT HUMAN VOICES',
        tasks: [
          'Gather testimony, interviews, meeting records, or first-person accounts.',
          'Distinguish direct testimony from paraphrase and reporting.',
          'Identify whose voices are represented and whose remain missing.',
        ],
        output: 'QUALITATIVE EVIDENCE SET + REPRESENTATION-GAP NOTE',
      },
      {
        date: 'NOV 28',
        day: 'SAT',
        title: 'MAP STAKEHOLDERS + CONTRADICTIONS',
        tasks: [
          'Identify people, communities, institutions, companies, agencies, and resources.',
          'Record what each controls, gains, risks, claims, or contests.',
          'Find 2–3 meaningful relationships supported by evidence.',
        ],
        output: 'STAKEHOLDER OVERVIEW + 2–3 EVIDENCE-BASED RELATIONSHIPS',
      },
      {
        date: 'NOV 29',
        day: 'SUN',
        title: 'AUDIT + ORGANIZE THE ARCHIVE',
        tasks: [
          'Organize evidence by type, source, date, place, and stakeholder.',
          'Label fact, stakeholder claim, official response, or inference.',
          'List unknowns, contradictions, missing voices, and next steps.',
        ],
        output: 'SOURCE-DOCUMENTED ARCHIVE + LIST OF UNKNOWNS',
      },
    ],
    deliverables: [
      'ORGANIZED, SOURCE-DOCUMENTED EVIDENCE ARCHIVE',
      'STAKEHOLDER OVERVIEW',
      '2–3 MEANINGFUL RELATIONSHIPS',
      'LIST OF WHAT REMAINS UNKNOWN',
    ],
  },
  {
    number: '03',
    dates: 'NOV 30—DEC 06',
    phase: 'CONNECT & DEFINE',
    mode: 'SYNTHESIS',
    goal:
      'Establish the thesis proposition and explore how relational visualization can reveal something a conventional timeline cannot.',
    question: 'WHAT BECOMES VISIBLE WHEN THE RECORDS CONNECT?',
    days: [
      {
        date: 'NOV 30',
        day: 'MON',
        title: 'IDENTIFY PATTERNS',
        tasks: [
          'Review the archive without designing the interface yet.',
          'Mark recurring actors, places, resources, decisions, and conflicts.',
          'Write 5–7 observations directly supported by evidence.',
        ],
        output: 'EVIDENCE-BACKED OBSERVATION LIST',
      },
      {
        date: 'DEC 01',
        day: 'TUE',
        title: 'BUILD A RELATIONAL MAP',
        tasks: [
          'Connect people, institutions, places, records, resources, and events.',
          'Annotate important connections with supporting sources.',
          'Separate documented relationships from questions and hypotheses.',
        ],
        output: 'FIRST EVIDENCE-BASED RELATIONAL MAP',
      },
      {
        date: 'DEC 02',
        day: 'WED',
        title: 'DEFINE THE THESIS PROPOSITION',
        tasks: [
          'Review what appears when different evidence types connect.',
          'Refine the question so it is specific, open, and answerable.',
          'Draft the subject, question, evidence, and visualization rationale.',
        ],
        output: 'REFINED QUESTION + DRAFT THESIS PROPOSITION',
      },
      {
        date: 'DEC 03',
        day: 'THU',
        title: 'VISUALIZATION TEST 01',
        tasks: [
          'Choose one meaningful relationship from the map.',
          'Create a low-fidelity path through multiple evidence types.',
          'Test what the structure reveals beyond a linear timeline.',
        ],
        output: 'EXPLORATORY VISUALIZATION TEST 01 + NOTES',
      },
      {
        date: 'DEC 04',
        day: 'FRI',
        title: 'VISUALIZATION TEST 02',
        tasks: [
          'Explore a contrasting entry point using the same evidence.',
          'Compare starting from a person, place, resource, event, or document.',
          'Record what each test clarifies, obscures, or overstates.',
        ],
        output: 'EXPLORATORY TEST 02 + APPROACH COMPARISON',
      },
      {
        date: 'DEC 05',
        day: 'SAT',
        title: 'PREPARE CRITIQUE MATERIALS',
        tasks: [
          'Select the clearest evidence, relationships, and experiments.',
          'Explain the shift from an abstract system to a specific investigation.',
          'Include method, evidence, map, experiments, limitations, and next steps.',
        ],
        output: 'DRAFT CRITIQUE PRESENTATION',
      },
      {
        date: 'DEC 06',
        day: 'SUN',
        title: 'FINAL REVIEW + PACKAGE',
        tasks: [
          'Check every major claim against its source.',
          'Keep facts, claims, responses, and inferences visibly distinct.',
          'Revise the question, map, and presentation; package all materials.',
        ],
        output: 'FINAL RESEARCH PACKAGE',
      },
    ],
    deliverables: [
      'REFINED THESIS QUESTION + PROPOSITION',
      'EVIDENCE-BASED RELATIONAL MAP',
      '1–2 EXPLORATORY VISUALIZATION TESTS',
      'SHORT PRESENTATION FOR CRITIQUE',
    ],
  },
];

const finalPackage = [
  'ONE-PAGE RESEARCH DIRECTION STATEMENT',
  'THREE-SUBJECT COMPARISON + SELECTION RATIONALE',
  'CLEARLY BOUNDED PRIMARY RESEARCH SUBJECT',
  'REFINED THESIS QUESTION + PROPOSITION',
  'MULTI-FORM EVIDENCE ARCHIVE',
  'SOURCE LOG + WORKING CHRONOLOGY',
  'STAKEHOLDER OVERVIEW + REPRESENTATION-GAP NOTE',
  '2–3 EVIDENCE-BASED RELATIONSHIPS',
  'UNKNOWNS, LIMITATIONS + NEXT STEPS',
  'EVIDENCE-BASED RELATIONAL MAP',
  '1–2 EXPLORATORY VISUALIZATION TESTS',
  'SHORT CRITIQUE PRESENTATION',
];

const methods = [
  {
    title: 'WORK LIKE A JOURNALIST FIRST',
    text: 'Begin with a real subject and a question—not a preferred interface. Investigate deeply enough to understand why the records should connect.',
  },
  {
    title: 'ENTER THROUGH SOMETHING TANGIBLE',
    text: 'Use one place, object, record, infrastructure, or bounded event as a manageable entrance into a larger system.',
  },
  {
    title: 'GATHER MULTIPLE FORMS OF EVIDENCE',
    text: 'Combine quantitative records, qualitative accounts, historical documents, spatial evidence, institutional records, and personal perspectives.',
  },
  {
    title: 'SEPARATE EVIDENCE FROM INTERPRETATION',
    text: 'Distinguish verified facts, stakeholder claims, institutional responses, and research inferences. Correlation is not causation.',
  },
  {
    title: 'LET RELATIONSHIPS EMERGE BEFORE FORM',
    text: 'First ask what becomes visible when records connect. Then decide how visualization and interaction can support exploration.',
  },
  {
    title: 'PRESERVE COMPLEXITY—KEEP THE SCOPE',
    text: 'Avoid a simple good-versus-bad conclusion. Hold multiple perspectives inside a clear, bounded research question.',
  },
];

function sentenceCase(value: string) {
  const normalized = value.toLocaleLowerCase('en-US');
  const sentence = normalized.charAt(0).toLocaleUpperCase('en-US') + normalized.slice(1);

  return sentence
    .replace(/\b(ai)\b/gi, 'AI')
    .replace(/\b(nov|dec|mon|tue|wed|thu|fri|sat|sun)\b/g, (word) =>
      word.charAt(0).toUpperCase() + word.slice(1),
    );
}

export function ThesisSchedulePage() {
  return (
    <article className="schedule-page schedule-page-simple">
      <header className="schedule-hero">
        <div className="schedule-hero-meta">
          <span>Week 13 / Research plan</span>
          <span>Nov 16—Dec 06 2026</span>
        </div>
        <div className="schedule-hero-title">
          <p>Three-week thesis research schedule</p>
          <h1>
            Three weeks.
            <br />
            One clear direction.
          </h1>
        </div>
        <div className="schedule-hero-summary">
          <p>
            Move from broad interests to one tangible subject, investigate it
            with real evidence, and define a focused thesis direction.
          </p>
        </div>
        <nav className="schedule-phase-nav" aria-label="Schedule phases">
          {scheduleWeeks.map((week) => (
            <a href={`#schedule-week-${week.number}`} key={week.number}>
              <span>{week.number}</span>
              <strong>{sentenceCase(week.phase)}</strong>
              <small>{sentenceCase(week.dates)}</small>
            </a>
          ))}
        </nav>
      </header>

      {scheduleWeeks.map((week) => (
        <section
          className={`schedule-week schedule-week-${week.number}`}
          id={`schedule-week-${week.number}`}
          key={week.number}
        >
          <header className="schedule-week-header">
            <span className="schedule-week-number">{week.number}</span>
            <div>
              <p>{sentenceCase(week.mode)}</p>
              <h2>{sentenceCase(week.phase)}</h2>
            </div>
            <time>{sentenceCase(week.dates)} 2026</time>
            <p className="schedule-week-goal">{week.goal}</p>
          </header>

          <div className="schedule-day-list">
            {week.days.map((day, dayIndex) => (
              <details
                className={`schedule-day ${day.quiet ? 'is-quiet' : ''}`}
                key={day.date}
              >
                <summary>
                  <span className="schedule-day-index">
                    {String(dayIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="schedule-day-date">
                    <span>{sentenceCase(day.day)}</span>
                    <time>{sentenceCase(day.date)}</time>
                  </span>
                  <h3>{sentenceCase(day.title)}</h3>
                  <span className="schedule-day-output">
                    <small>Output</small>
                    {sentenceCase(day.output)}
                  </span>
                  <span className="schedule-day-toggle" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="schedule-day-details">
                  <span>Focus</span>
                  <ul>
                    {day.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>

          <aside className="schedule-deliverables">
            <span>End of week {week.number} / Deliverables</span>
            <p>{week.deliverables.map(sentenceCase).join(' · ')}</p>
          </aside>
        </section>
      ))}

      <div className="schedule-closing">
        <section className="schedule-final-package">
          <header>
            <span>Dec 06 / Final checkpoint</span>
            <h2>Final package</h2>
            <p>
              A credible, evidence-based direction ready for critique—not a
              finished thesis.
            </p>
          </header>
          <ol>
            {finalPackage.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{sentenceCase(item)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="schedule-methodology">
          <header>
            <span>Methodology</span>
            <h2>Investigate before visualizing.</h2>
          </header>
          <ol>
            {methods.map((method, index) => (
              <li key={method.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{sentenceCase(method.title)}</h3>
                  <p>{method.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
