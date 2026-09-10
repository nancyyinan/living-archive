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

export const studentIdImage = sitePath(
  '/archive/week-02/student-id-redacted.png',
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
