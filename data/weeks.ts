import { sitePath } from '@/lib/site-path';

export interface ArchiveWeek {
  number: string;
  date: string;
  isoDate: string;
  title: string;
  description: string;
  contents: string;
  href: string;
}

export const archiveWeeks: ArchiveWeek[] = [
  {
    number: '04',
    date: 'SEP 24 2026',
    isoDate: '2026-09-24',
    title: 'POSSIBLE THESIS DIRECTIONS',
    description: 'Three ways to read one intergenerational living archive.',
    contents: '3 DIRECTIONS / 12 QUESTIONS / 3 FIRST ACTIONS',
    href: '/week-04',
  },
  {
    number: '03',
    date: 'SEP 17 2026',
    isoDate: '2026-09-17',
    title: 'ACCESS / RECORD',
    description: 'Three encounters with the traces produced by a student ID.',
    contents: '3 ENCOUNTERS / 3 TRACES / 1 QUESTION',
    href: '/week-03',
  },
  {
    number: '02',
    date: 'SEP 10 2026',
    isoDate: '2026-09-10',
    title: 'READING + EVERYDAY OBJECT',
    description: 'Student ID — an incomplete record of four years in New York.',
    contents: '1 OBJECT / 10 ACTIONS / 200 WORDS',
    href: '/week-02',
  },
  {
    number: '01',
    date: 'SEP 02 2026',
    isoDate: '2026-09-02',
    title: 'BEGINNING THE ARCHIVE',
    description: 'Images, a thesis brainstorm, and questions from others.',
    contents: '12 IMAGES / 1 MAP / 15 QUESTIONS',
    href: '/week-01',
  },
];

export interface ResearchDirection {
  number: string;
  title: string;
  question: string;
  responses: {
    prompt: string;
    answer: string;
  }[];
  firstAction: string;
}

export const researchDirections: ResearchDirection[] = [
  {
    number: '01',
    title: 'INHERITING THE HABIT OF RECORDING',
    question:
      'How does a practice of recording everyday life pass between generations, and how is it transformed when the medium changes from handwritten diaries and edited books to scattered paper and digital traces?',
    responses: [
      {
        prompt: 'Which resource do I want to interact with?',
        answer:
          "I want to study my grandfather's four diary books as designed objects and interview him about the process behind them: why he recorded daily life, how he later selected and edited entries, what he omitted, and whom he imagined as his reader. I will compare this process with a small, clearly defined sample from my own New York records, including planners, calendars, playlists, photographs, and objects.",
      },
      {
        prompt: 'What do I want to find out?',
        answer:
          "I want to understand whether the habit of recording can be inherited even when its form changes. What values or gestures continue across generations? What changes when one person's record becomes a bound, linear narrative while another person's life is distributed across platforms and media? I am interested in the tension between continuity of habit and discontinuity of form.",
      },
      {
        prompt: 'How will I document and circulate what I find?',
        answer:
          "I will create a paired publication that places selected pages, structures, and editing decisions from my grandfather's books beside selected records from my New York life. Short interview excerpts and annotations from both of us will reveal how each record was made, edited, and interpreted. A small digital index may connect related dates, subjects, and recurring habits across the two archives.",
      },
      {
        prompt: 'Who could be interested in this?',
        answer:
          'This project could interest families who preserve personal histories, people who keep diaries, intergenerational and diasporic families, designers working with archives and publications, and researchers interested in autobiography, memory, or vernacular recordkeeping.',
      },
    ],
    firstAction:
      'Select one recurring act—such as commuting, meals, work, or calling family—and trace how it appears in both archives.',
  },
  {
    number: '02',
    title: 'THE NEW YORK I LEAVE BEHIND',
    question:
      'How can four years of personal records construct a lived image of New York for people who were not here—my grandfather now and my future children decades from now?',
    responses: [
      {
        prompt: 'Which resource do I want to interact with?',
        answer:
          'I want to work with records from my four years in New York: planners, calendars, photographs, playlists, tickets, receipts, menus, exhibition material, and, if it becomes available, my New School access history. I also want to ask my grandfather how he currently imagines New York and what sources shaped that image, then invite him to respond to a small sample of my archive.',
      },
      {
        prompt: 'What do I want to find out?',
        answer:
          'I want to investigate how an everyday, first-person New York differs from the city represented through news, films, tourism, or institutional narratives. More importantly, I want to understand how ordinary records change over time: something made for the present can later become evidence of a city, an era, and a way of life for someone who was not there. The tension is between immediate use and future historical meaning.',
      },
      {
        prompt: 'How will I document and circulate what I find?',
        answer:
          'I will develop a four-part New York time capsule, with one section for each year. Instead of organizing it around landmarks, I will use recurring routes, rooms, sounds, routines, relationships, and turning points. A printed publication will preserve the material experience of the archive, while a digital map or index will allow readers to enter through a date, place, person, song, or object. Responses from my grandfather can become a second layer.',
      },
      {
        prompt: 'Who could be interested in this?',
        answer:
          'This project could interest international students, families separated by geography or generation, future members of my own family, personal and community archivists, and readers interested in everyday histories of New York that sit outside official city narratives.',
      },
    ],
    firstAction:
      'Build one prototype day from a calendar event, notebook entry, song, photograph or location, object, and a short response from my grandfather.',
  },
  {
    number: '03',
    title: 'WHO RECORDED MY LIFE?',
    question:
      'What changes when a personal archive includes not only records I intentionally made, but also data automatically produced, stored, restricted, or deleted by platforms and institutions?',
    responses: [
      {
        prompt: 'Which resource do I want to interact with?',
        answer:
          "I want to request and examine data connected to my own everyday activities: calendar exports, music listening histories, photo metadata, app records, and any New School student-ID or Design Lab access history that the university is able to share. I will compare these machine-made traces with my intentional records and with my grandfather's handwritten and edited diary books. If data is unavailable, I will document the request process, retention rules, and gaps as part of the research.",
      },
      {
        prompt: 'What do I want to find out?',
        answer:
          'I want to learn who participates in recording a life and who controls what can later be remembered. What do platforms or institutions capture that I do not write down? What do their records misunderstand or leave out? Who can access, interpret, or erase these traces? The central tension is between self-authorship and systems that quietly produce an archive on my behalf.',
      },
      {
        prompt: 'How will I document and circulate what I find?',
        answer:
          'I will create a visual audit of one selected month, layering intentional entries with automatic timestamps, access logs, listening histories, and missing or inaccessible data. The result could circulate as a printed data diary and a searchable digital companion. The design will make provenance visible: each item will show who produced it, where it was stored, whether I could retrieve it, and what context is absent.',
      },
      {
        prompt: 'Who could be interested in this?',
        answer:
          'This project could interest students whose lives are mediated by campus systems and apps, university archivists and administrators, designers working with personal data, and researchers or communities concerned with privacy, digital preservation, data ownership, and platform memory.',
      },
    ],
    firstAction:
      'Choose one month and make an inventory of every intentional record, automatic trace, failed export, and missing piece that can be found.',
  },
];

export const studentIdImage = sitePath(
  '/archive/week-02/student-id-redacted.png',
);

export const weekThreeEmailImage = sitePath(
  '/archive/week-03/email-to-henry.png',
);

export const weekThreeArchiveImage = sitePath(
  '/archive/week-03/parsonspaper-photo-lab-1980.png',
);

export const unseenActions = [
  {
    stage: 'APPLICATION',
    text: 'I applied to the university and submitted documents that translated my previous life into an institutional record.',
  },
  {
    stage: 'EVALUATION',
    text: 'Admissions staff reviewed those records and granted me the status of a student.',
  },
  {
    stage: 'REGISTRATION',
    text: 'The university created a digital profile and assigned me a unique identification number.',
  },
  {
    stage: 'PORTRAIT',
    text: 'A photograph of my face was captured, selected, and formatted according to institutional requirements.',
  },
  {
    stage: 'DESIGN',
    text: 'Designers created a standardized visual system that makes every student recognizable as part of the institution.',
  },
  {
    stage: 'MATERIAL',
    text: 'Raw materials were extracted and processed into the plastic, ink, adhesive, and identification components of the card.',
  },
  {
    stage: 'PRODUCTION',
    text: 'Machines printed, encoded, cut, and laminated my personal information into a durable object.',
  },
  {
    stage: 'ACTIVATION',
    text: 'University workers verified my identity, activated the card, and connected it to campus access systems.',
  },
  {
    stage: 'ACCESS',
    text: 'Each tap, swipe, or presentation of the card allowed systems and people to recognize that I belonged in a particular place.',
  },
  {
    stage: 'USE',
    text: 'Over four years, my hands, movements, stickers, and daily routines transformed a standardized ID into a personal artifact.',
  },
];

export const reflection = [
  'My student ID looks like an ordinary card, but it represents my reason for coming to New York. Before it could exist, I had to apply to the university, submit documents, be accepted, enter its database, receive a student number, and have my image translated into official identification. The card also depends on hidden infrastructures of material production, printing, encoding, campus security, digital records, and maintenance labor. These systems allow the university to identify me and determine where I belong and may enter.',
  'During four years of use, however, the card became more than an institutional object. Its scratches, worn edges, and stickers record how I carried it through classrooms, studios, libraries, and daily life in New York. These marks cannot explain what happened in those places, but they show how a standardized object can slowly become personal.',
  'Making these infrastructures visible could become a method for my 256 book and thesis. My grandfather recorded his life in four books, while my life is also recorded by cards, databases, and access systems. By placing these forms of recording together, I can explore what institutions remember about us, what objects preserve accidentally, and what we must choose to record for ourselves.',
];
