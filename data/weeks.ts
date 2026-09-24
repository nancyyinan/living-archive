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
    description:
      'One project, two complete archives, and three research lenses.',
    contents: '2 ARCHIVES / 3 LENSES / 3 DIRECTIONS',
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
  premise: string;
  responses: {
    prompt: string;
    answer: string;
  }[];
  firstAction: string;
}

export const weekFourArchives = [
  {
    marker: 'A',
    title: 'FOUR DIARY BOOKS',
    owner: 'MY GRANDFATHER / FOUR EDITED BOOKS',
    description:
      'All four books remain primary material. The project will study how he recorded, selected, edited, titled, sequenced, and compiled his life.',
    items: [
      'REMEMBERING MY PARENTS / 《忆双亲》',
      'MY TEN YEARS DURING THE CULTURAL REVOLUTION / 《我的文革十年》',
      'JIACHEN COLLECTION / 《甲辰集萃》',
      'YISI COLLECTION / 《乙巳集萃》',
    ],
  },
  {
    marker: 'B',
    title: 'FOUR NEW YORK YEARS',
    owner: 'MY LIFE / FOUR IDENTIFIABLE YEARS',
    description:
      'All four years remain visible through records dispersed across paper, objects, interfaces, platforms, and available institutional data.',
    items: [
      'PLANNERS / NOTEBOOKS / CALENDARS',
      'PLAYLISTS / PHOTOGRAPHS / OBJECTS',
      'TICKETS / RECEIPTS / MENUS / EXHIBITIONS',
      'INTERFACES / PLATFORM DATA / SCHOOL RECORDS',
    ],
  },
];

export const weekFourLenses = [
  {
    number: '01',
    title: 'INHERITANCE + MEDIA',
    description:
      'How did a recording practice pass between generations, and how did its form change?',
  },
  {
    number: '02',
    title: 'PLACE + TIME + TRANSMISSION',
    description:
      'How do two archives preserve two lived worlds for people who were not there?',
  },
  {
    number: '03',
    title: 'AUTHORSHIP + CONTROL',
    description:
      'Who creates, edits, owns, and withholds the records that become a life archive?',
  },
];

export const researchDirections: ResearchDirection[] = [
  {
    number: '01',
    title: 'ONE HABIT, TWO RECORDING SYSTEMS',
    question:
      "How is a habit of recording everyday life inherited and transformed across my grandfather's four bound diary books and my four years of fragmented New York records?",
    premise:
      'This direction treats the two complete archives as evidence of one family habit continuing through two generations, while changing its material and organizational form.',
    responses: [
      {
        prompt: 'Which resource do I want to interact with?',
        answer:
          "I want to work with all four of my grandfather's diary books and the full range of records from all four of my New York years. I will study the books' covers, tables of contents, handwriting or typography, chapter structures, images, revisions, and signs of selection. I will interview my grandfather about why he recorded his life and how he turned earlier diaries into these four edited books. I will also inventory where each year of my New York life currently exists: planners, notebooks, calendars, playlists, photographs, objects, apps, and data.",
      },
      {
        prompt: 'What do I want to find out?',
        answer:
          'I want to understand what it means to inherit a recording habit when the media are different. Which intentions, routines, and values continue between us? Which ones change when a continuous handwritten practice becomes a mixture of paper records, interfaces, images, music, and automatic timestamps? I want to investigate the tension between the continuity of a family habit and the discontinuity of its forms.',
      },
      {
        prompt: 'How will I document and circulate what I find?',
        answer:
          'I will create a paired intergenerational publication or archive in which the four diary books and the four New York years are both visible as complete structures. Overview pages will establish each book and each year before selected cross-sections connect recurring activities, subjects, or editorial decisions. A digital index could allow readers to move between the two archives by date, theme, medium, or repeated action without forcing them into a false one-to-one chronology.',
      },
      {
        prompt: 'Who could be interested in this?',
        answer:
          'This direction could interest families who preserve personal histories, people who keep diaries, intergenerational or diasporic families, publication and archive designers, and researchers interested in autobiography, memory, vernacular recordkeeping, and changing media.',
      },
    ],
    firstAction:
      'Create two collection-level inventories: one describing the contents and structure of each of the four diary books, and one describing the available material from each of the four New York years. Then choose one repeated action, such as commuting, eating, working, or contacting family, for the first paired prototype.',
  },
  {
    number: '02',
    title: 'FOUR BOOKS, FOUR YEARS: TWO LIVED WORLDS',
    question:
      "How can my grandfather's four diary books and my four years of New York records preserve two different lived worlds for family members who were not there?",
    premise:
      'This direction treats both archives as personal portraits of a place and an era: the China and historical periods my grandfather lived through, and the New York I have experienced as an international student.',
    responses: [
      {
        prompt: 'Which resource do I want to interact with?',
        answer:
          "I want to work with the full content and physical structure of my grandfather's four diary books, paying attention to how they describe everyday places, routines, relationships, objects, and historical conditions. I will place them in dialogue with records from each of my four New York years, including planners, photographs, calendars, playlists, tickets, receipts, menus, exhibition materials, and available school records. Conversations with my grandfather will help identify what each of us assumes, explains, or leaves unstated when describing a world familiar to us but unfamiliar to another generation.",
      },
      {
        prompt: 'What do I want to find out?',
        answer:
          "I want to understand how ordinary personal records gradually become evidence of a place, an era, and a way of life. How do my grandfather's books allow me to imagine periods of China that I did not experience? How might my New York archive allow him, or my future children, to encounter the city I lived in rather than an official or touristic image of it? The central tension is between a record made for the present and the historical meaning it acquires for a later reader.",
      },
      {
        prompt: 'How will I document and circulate what I find?',
        answer:
          'I will create an eight-part intergenerational atlas or time capsule: four sections that introduce and re-present the four diary books, and four sections that construct my four New York years. Connections will be made through shared themes such as home, movement, food, work, separation, family contact, political atmosphere, or ordinary objects, rather than pretending the two lives follow matching timelines. A printed publication can preserve material differences, while a digital map or index can reveal connections across place, period, and generation.',
      },
      {
        prompt: 'Who could be interested in this?',
        answer:
          'This direction could interest families separated by geography or generation, international students and immigrants, future members of my own family, community archivists, and readers interested in everyday histories of China and New York that sit outside official historical narratives.',
      },
    ],
    firstAction:
      'Choose one passage or episode from each of the four diary books and one representative day or object from each of the four New York years. Test how these eight entries can be introduced individually and then connected through one shared theme.',
  },
  {
    number: '03',
    title: 'WHO MAKES A LIFE ARCHIVE?',
    question:
      "How does authorship change between my grandfather's four self-recorded and edited diary books and my four New York years, which have been recorded jointly by me, paper objects, platforms, apps, and institutions?",
    premise:
      'This direction keeps both complete archives at the center but examines the different systems of power, access, editing, and ownership behind them.',
    responses: [
      {
        prompt: 'Which resource do I want to interact with?',
        answer:
          'I want to study all four diary books as deliberately authored and edited archives: what my grandfather included, rewrote, organized, titled, or omitted. I will compare this with material from all four New York years, including my intentional records and data produced by calendars, music platforms, photo metadata, location systems, and The New School. If university or platform data cannot be retrieved, the request process, retention policy, refusal, deletion, or absence will remain part of the research rather than removing that year from the archive.',
      },
      {
        prompt: 'What do I want to find out?',
        answer:
          'I want to investigate who is able to make a life legible as an archive. My grandfather controlled much of the writing and later editing of his books, but my New York record has many co-authors and storage systems. What did each system capture, distort, or leave out? Who decides what is preserved? What does "complete" mean when one archive has already been edited into books and the other is dispersed across private memory, paper objects, corporations, and institutions?',
      },
      {
        prompt: 'How will I document and circulate what I find?',
        answer:
          'I will create a provenance-based publication and digital index that presents all four diary books and all four New York years. Each record or section will identify who produced it, who edited it, where it was stored, whether I can access it, and what context is missing. Rather than treating the books as a neutral past and the data as a neutral present, the design will expose the different decisions and systems that constructed both archives.',
      },
      {
        prompt: 'Who could be interested in this?',
        answer:
          'This direction could interest students whose lives are mediated by campus systems and apps, families building personal archives, university archivists and administrators, designers working with personal data, and researchers concerned with privacy, digital preservation, data ownership, autobiography, and archival power.',
      },
    ],
    firstAction:
      'Select one passage from each of the four diary books and one date from each of the four New York years. For all eight entries, identify the recorder, editor, storage location, access conditions, missing context, and intended reader.',
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
