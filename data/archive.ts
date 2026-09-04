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
  orientation?: 'landscape' | 'portrait';
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
  '我以为你会说build',
];

const imageItems: ArchiveItem[] = [
  {
    id: 'cosmic-view',
    collection: 'images',
    type: 'image',
    title: 'Cosmic View',
    mediaUrl: sitePath('/archive/images/cosmic-view.png'),
    mimeType: 'image/png',
    orientation: 'landscape',
    caption:
      'An illustration of the Milky Way viewed from outside the galaxy. The inset square represents the field of view from the previous scale in Boeke’s tenfold zoom-out sequence.',
    sourceName:
      'Immediate source: The Last Whole Earth Catalog, 1971. “Cosmos,” Whole Systems, p. 5.\n\nOriginal source: Kees Boeke, Cosmic View: The Universe in 40 Jumps. New York: The John Day Company, 1957. Picture 22.',
    creator: 'Kees Boeke',
    dateAdded: '2026-09-03',
    order: 0,
  },
  {
    id: 'cycling-diagram',
    collection: 'images',
    type: 'image',
    title: 'Cycling Diagram',
    mediaUrl: sitePath('/archive/images/cycling-diagram.png'),
    mimeType: 'image/png',
    orientation: 'landscape',
    caption:
      'An instructional diagram showing four positions of the same foot during a pedal stroke, illustrating the cycling technique known as “ankling.”',
    sourceName:
      'Immediate source: The Last Whole Earth Catalog, 1971. “Bicycles,” Nomadics, p. 253.\n\nOriginal source: Eugene A. Sloane, The Complete Book of Bicycling. New York: Trident Press, 1970. Figure 36, p. 105.',
    creator: 'Eugene A. Sloane',
    dateAdded: '2026-09-03',
    order: 1,
  },
  {
    id: 'archibald-wenley-in-china',
    collection: 'images',
    type: 'image',
    title: 'Archibald Wenley in China',
    mediaUrl: sitePath('/archive/images/archibald-wenley-in-china.png'),
    mimeType: 'image/png',
    orientation: 'portrait',
    caption:
      'A black-and-white archival photograph showing Wenley operating a large-format camera during the Freer Gallery’s archaeological research in China. The image documents not only the expedition but also the act of photographic field documentation itself.',
    sourceName:
      'Immediate source: Emily Billett, “A Very Fine and Unusual Statue: Fruits of the Freer Gallery Field Expeditions in China,” The Bigger Picture, Smithsonian Institution Archives, May 5, 2016.\n\nArchival source: Archibald Wenley Papers, 1924–1926, FSA.A1996.05, National Museum of Asian Art Archives, Smithsonian Institution.\n\nSubject: Archibald Gibson Wenley during his work in China.',
    dateAdded: '2026-09-03',
    order: 2,
  },
  {
    id: 'sea-anemone-specimen',
    collection: 'images',
    type: 'image',
    title: 'Sea Anemone Specimen',
    mediaUrl: sitePath('/archive/images/sea-anemone-specimen.png'),
    mimeType: 'image/png',
    orientation: 'portrait',
    caption:
      'A photographic record of a sea anemone specimen made by the United States National Museum Photographic Laboratory. The specimen is isolated within a controlled photographic setup rather than shown in its natural environment.',
    sourceName:
      'Smithsonian Institution Archives.\n\nTitle: Sea Anemone Specimen.\nMedium: Glass negative, 10 × 8 in.\nCollection reference: SIA Acc. 11-007, Box 014, Image No. MNH-3468.\nRights: CC0 / Public Domain.',
    creator: 'United States National Museum Photographic Laboratory',
    date: '1880',
    dateAdded: '2026-09-03',
    order: 3,
  },
  {
    id: 'toklat-river',
    collection: 'images',
    type: 'image',
    title: 'Toklat River',
    mediaUrl: sitePath('/archive/images/toklat-river.jpg'),
    mimeType: 'image/jpeg',
    orientation: 'portrait',
    caption:
      'An aerial photograph showing a braided river repeatedly dividing and reconnecting around sediment bars. Braided rivers form where sediment deposition redirects the flow into multiple shallow, shifting channels, creating a constantly changing pattern across the landscape.',
    sourceName:
      'Immediate source: MailOnline Travel / Daily Mail, “Nature’s masterpiece: Incredible images reveal the stunning beauty of braided rivers that look like inky watercolour paintings,” March 2016.\n\nImage credit: © Paul A. Souders / CORBIS.\nSubject: Braided river channels viewed from above.\nExact location: Toklat River in the Denali National Park and Preserve, Alaska.',
    creator: 'Paul A. Souders',
    dateAdded: '2026-09-03',
    order: 4,
  },
  {
    id: 'assorted-fishing-hooks',
    collection: 'images',
    type: 'image',
    title: 'Assorted Fishing Hooks',
    mediaUrl: sitePath('/archive/images/assorted-fishing-hooks.jpg'),
    mimeType: 'image/jpeg',
    orientation: 'landscape',
    caption:
      'A studio-style photograph showing five fishing hooks of different sizes and forms suspended individually from transparent fishing line against a neutral background.',
    sourceName: 'Pinterest.',
    dateAdded: '2026-09-03',
    order: 5,
  },
  {
    id: 'weathered-pier-pilings',
    collection: 'images',
    type: 'image',
    title: 'Weathered Pier Pilings',
    mediaUrl: sitePath('/archive/images/weathered-pier-pilings.jpg'),
    mimeType: 'image/jpeg',
    orientation: 'landscape',
    caption:
      'A group of weathered wooden pilings standing in the water beside a waterfront building. The remnants of the old structure contrast with the maintained architecture across the water, showing different layers of use, decay, and time within the same site.',
    sourceName: 'Personal photograph by Yinan Xue.',
    creator: 'Yinan Xue',
    date: '12/10/2024',
    dateAdded: '2026-09-03',
    order: 6,
  },
  {
    id: 'steam-in-the-city',
    collection: 'images',
    type: 'image',
    title: 'Steam in the City',
    mediaUrl: sitePath('/archive/images/steam-in-the-city.jpg'),
    mimeType: 'image/jpeg',
    orientation: 'portrait',
    caption:
      'Steam rises from a street vent between dark brick buildings and passing cars. The temporary cloud partially obscures the surrounding architecture, making a familiar urban infrastructure visible through something constantly forming and disappearing.',
    sourceName: 'Personal photograph by Yinan Xue.',
    creator: 'Yinan Xue',
    date: '11/28/2024',
    dateAdded: '2026-09-03',
    order: 7,
  },
  {
    id: 'walking-signal-urban-canyon',
    collection: 'images',
    type: 'image',
    title: 'Walking Signal / Urban Canyon',
    mediaUrl: sitePath('/archive/images/walking-signal.jpg'),
    mimeType: 'image/jpeg',
    orientation: 'portrait',
    caption:
      'A pedestrian walking signal glows in the shadow between tall buildings, while a narrow opening reveals bright sky, glass towers, and construction beyond. The image frames movement through the city through the contrast between darkness and light.',
    sourceName: 'Personal photograph by Yinan Xue.',
    creator: 'Yinan Xue',
    date: '10/25/2024',
    dateAdded: '2026-09-03',
    order: 8,
  },
  {
    id: 'subway-direction-sign',
    collection: 'images',
    type: 'image',
    title: 'Subway Direction Sign',
    mediaUrl: sitePath('/archive/images/subway-direction-sign.jpg'),
    mimeType: 'image/jpeg',
    orientation: 'landscape',
    caption:
      'An illuminated New York City subway sign gives directions for the 4 and 6 trains, including service toward the Bronx. The photograph records a system designed to organize movement through the city through text, symbols, routes, and destinations.',
    sourceName: 'Personal photograph by Yinan Xue.',
    creator: 'Yinan Xue',
    date: '10/20/2024',
    dateAdded: '2026-09-03',
    order: 9,
  },
  {
    id: 'bus-stop-at-fifth-avenue',
    collection: 'images',
    type: 'image',
    title: 'Bus Stop At Fifth Avenue',
    mediaUrl: sitePath('/archive/images/bus-stop-at-fifth-avenue.jpg'),
    mimeType: 'image/jpeg',
    orientation: 'landscape',
    caption:
      'A bus-stop information panel stands beside a digital Cartier advertisement on a busy Manhattan street. Transportation information, commercial imagery, pedestrians, vehicles, and architecture overlap within the same urban field.',
    sourceName: 'Personal photograph by Yinan Xue.',
    creator: 'Yinan Xue',
    date: '9/21/2024',
    dateAdded: '2026-09-03',
    order: 10,
  },
  {
    id: 'pigeons-on-a-ledge',
    collection: 'images',
    type: 'image',
    title: 'Pigeons on a Ledge',
    mediaUrl: sitePath('/archive/images/pigeons-on-a-ledge.png'),
    mimeType: 'image/png',
    orientation: 'landscape',
    caption:
      'A group of pigeons gathers along the narrow ledge of an urban building. Their repeated forms create an almost linear arrangement against the architecture, showing how nonhuman life occupies and adapts to built space.',
    sourceName: 'Personal photograph by Yinan Xue.',
    creator: 'Yinan Xue',
    date: '10/23/2024',
    dateAdded: '2026-09-03',
    order: 11,
  },
];

export const initialArchive: ArchiveItem[] = [
  ...imageItems,
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
      mediaUrl: sitePath(`/archive/questions/full/question-${n}.png`),
      mimeType: 'image/png',
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
