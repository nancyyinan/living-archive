import { sitePath } from '@/lib/site-path';

export type CollectionType = 'brainstorm' | 'questions' | 'images';
export type ArchiveItemType = 'image' | 'pdf' | 'question' | 'brainstorm';

export interface ArchiveItem {
  id: string;
  collection: CollectionType;
  type: ArchiveItemType;
  title?: string;
  mediaUrl: string;
  resolvedUrl?: string;
  mimeType?: string;
  transcription?: string;
  caption?: string;
  sourceUrl?: string;
  sourceName?: string;
  creator?: string;
  note?: string;
  date?: string;
  dateAdded: string;
  order: number;
}

export const brainstormTitle = 'HOW DO I RECORD MY LIFE AT WHERE I STAND?';

export const brainstormTranscription = [
  'How do I record my life at where I stand?',
  'thesis? Actually record your life or someones life from birth to death.',
  'record',
  'personality',
  'What is my personality?',
  'changing',
  'keeping up [unclear] / friends',
  'interpersonal relationships',
  'shape',
  'photograph',
  'historical lens',
  'archival records',
  'memory / in existence',
  'geographical lens',
  'maps of places',
  'writing diary',
  'eroding',
  'ins and outs list',
  'our world',
  'the Anthropocene',
  'collecting',
  'interests / hobbies',
  'flux',
  'life as we know as time goes on',
  'irreversible (Gasper Noe)',
  'meandering',
  'writing note',
  'How can you record it? What will make it unique?',
  "Do you have the authority to record your life without other people's opinions or external influence on you?",
];

const questionText = [
  'What about squishy big typefaces do you not like? Would you challenge urself to design with them?',
  'nancy\nyour favorite unusual lamp?',
  'Do you have those furniture at your home?',
  'WHAT ABOUT BUMPY TEXT MAKES IT SOMETHING U DISLIKE?',
  'DO YOU LIKE HAUNTED HOUSES?',
  'Do you have any pieces of Bauhaus furniture?',
  'IN WHAT WAYS ARE LAMP DESIGN AND BOOK DESIGN THE SAME? IN WHAT WAYS ARE THEY DIFFERENT?',
  "Would you consider using lamps as form / direction reference for thesis? I think that'd be cool :)",
  "For the something you don't like (Typo poster?), [crossed out] & what would you do to make it as something you like?",
  "What's your favorite typeface?",
  'I SAW THAT YOU LIKE BAUHAUS AND IKEA FURNITURE, DO YOU LIKE BUILDING IT TOO? I WANNA KNOW',
  'What do you like about foggy weathers, how do they make you feel?',
  'Do you ever want to design lamps.',
  'why do you like gore? what does it make you feel?',
  '[unclear handwritten Chinese text including “build”]',
];

export const initialArchive: ArchiveItem[] = [
  ...Array.from({ length: 12 }, (_, index): ArchiveItem => {
    const n = String(index + 1).padStart(2, '0');
    const extension = index === 5 ? 'png' : 'jpg';
    return {
      id: `image-${n}`,
      collection: 'images',
      type: 'image',
      title: `IMAGE ${n}`,
      mediaUrl: sitePath(`/archive/images/image-${n}.${extension}`),
      mimeType: extension === 'png' ? 'image/png' : 'image/jpeg',
      date: 'SEP 2026',
      dateAdded: '2026-09-02',
      order: index,
    };
  }),
  {
    id: 'brainstorm-01',
    collection: 'brainstorm',
    type: 'brainstorm',
    title: brainstormTitle,
    mediaUrl: sitePath('/archive/brainstorm/map.png'),
    mimeType: 'image/png',
    transcription: brainstormTranscription.join('\n'),
    date: 'SEP 2026',
    dateAdded: '2026-09-02',
    order: 0,
  },
  ...questionText.map((transcription, index): ArchiveItem => {
    const n = String(index + 1).padStart(2, '0');
    return {
      id: `question-${n}`,
      collection: 'questions',
      type: 'question',
      title: `QUESTION ${n}`,
      mediaUrl: sitePath(`/archive/questions/full/question-${n}.jpg`),
      mimeType: 'image/jpeg',
      transcription,
      note: 'Peer response / class activity',
      date: 'SEP 2026',
      dateAdded: '2026-09-02',
      order: index,
    };
  }),
];

export function itemMedia(item: ArchiveItem) {
  return item.resolvedUrl || item.mediaUrl;
}

export function itemNumber(item: ArchiveItem, items: ArchiveItem[]) {
  const siblings = items
    .filter((candidate) => candidate.collection === item.collection)
    .sort((a, b) => a.order - b.order);
  return String(
    siblings.findIndex((candidate) => candidate.id === item.id) + 1,
  ).padStart(2, '0');
}
