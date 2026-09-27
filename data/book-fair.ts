import { sitePath } from '@/lib/site-path';

export type BookFairCategoryId = 'book' | 'zine';

export interface BookFairImage {
  id: string;
  src: string;
}

export interface BookFairGroup {
  id: string;
  category: BookFairCategoryId;
  title: string;
  description: string;
  images: BookFairImage[];
}

export interface BookFairCategory {
  id: BookFairCategoryId;
  title: string;
  description: string;
  groups: BookFairGroup[];
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, index) => start + index);

const images = (
  category: BookFairCategoryId,
  group: string,
  numbers: number[],
): BookFairImage[] =>
  numbers.map((number) => ({
    id: `IMG_${number}`,
    src: sitePath(
      `/archive/week-05/book-fair/${category}/${group}/IMG_${number}.jpg`,
    ),
  }));

const bookGroups: BookFairGroup[] = [
  {
    id: '1',
    category: 'book',
    title: 'CYANOTYPE IMPERFECTIONS',
    description:
      'Cyanotype specimens frame clothing waste through the visual authority of a scientific archive.',
    images: images('book', '1', range(9708, 9712)),
  },
  {
    id: '2',
    category: 'book',
    title: 'GLYPHS / VARIABLE READING',
    description:
      'Abstract marks move between cover, section divider, and index, turning a compact book into a system of signs.',
    images: images('book', '2', range(9713, 9715)),
  },
  {
    id: '3',
    category: 'book',
    title: 'TRANSLUCENT BOTANICAL INDEX',
    description:
      'Transparent sheets layer plant illustrations, diagrams, and dense tables so information remains visible across pages.',
    images: images('book', '3', range(9732, 9743)),
  },
  {
    id: '4',
    category: 'book',
    title: 'MODULAR RED ARCHIVE',
    description:
      'Printed cards, diagrams, and inserts organize evidence as a portable archive that can be compared and rearranged.',
    images: images('book', '4', [9753, 9754, 9755, 9758]),
  },
];

const zineGroups: BookFairGroup[] = [
  {
    id: '1',
    category: 'zine',
    title: 'GREEN SHAPES / BODY',
    description:
      'A restricted green palette connects abstract shapes, gestures, and bodily fragments into one visual language.',
    images: images('zine', '1', range(9619, 9620)),
  },
  {
    id: '2',
    category: 'zine',
    title: 'SCULPTURAL STAR FOLD',
    description:
      'Accordion folds and changing paper colors transform a small publication into a spatial object.',
    images: images('zine', '2', range(9621, 9623)),
  },
  {
    id: '3',
    category: 'zine',
    title: 'EXPANDING COLLAGE',
    description:
      'Layered painted fragments extend beyond the page, making sequence visible as one continuous expanding composition.',
    images: images('zine', '3', range(9625, 9630)),
  },
  {
    id: '4',
    category: 'zine',
    title: 'LIKE A STORY / CAT',
    description:
      'Two-color drawing and bilingual text use a familiar character to make a compact narrative direct and portable.',
    images: images('zine', '4', range(9631, 9634)),
  },
  {
    id: '5',
    category: 'zine',
    title: 'STITCHED TRANSLUCENCY',
    description:
      'Visible thread and translucent sheets make binding, layering, and atmospheric color part of the message.',
    images: images('zine', '5', range(9635, 9644)),
  },
  {
    id: '6',
    category: 'zine',
    title: 'TWO-COLOR BOTANICAL NOTES',
    description:
      'Illustration, handwriting, and a limited green palette turn observations of plants into an intimate field guide.',
    images: images('zine', '6', range(9645, 9648)),
  },
  {
    id: '7',
    category: 'zine',
    title: 'THE MOON ONCE PROMISED',
    description:
      'Blue paper, small text, and gatefold-like page movements stage a quiet narrative through reveal and concealment.',
    images: images('zine', '7', range(9651, 9657)),
  },
  {
    id: '8',
    category: 'zine',
    title: 'FESTIVAL CARDS / RING BINDING',
    description:
      'Loose printed cards and a red ring allow the reader to reorder a culturally specific set of images and texts.',
    images: images('zine', '8', range(9658, 9660)),
  },
  {
    id: '9',
    category: 'zine',
    title: 'ORANGE RUBBINGS / PLANT TRACES',
    description:
      'Single-color texture and handwritten text translate touch, pressure, and plant forms into printed evidence.',
    images: images('zine', '9', range(9663, 9670)),
  },
  {
    id: '10',
    category: 'zine',
    title: 'FOLDS / POCKETS / SPECIMENS',
    description:
      'A double structure, pockets, and inserted forms ask the reader to compare printed texture with physical matter.',
    images: images('zine', '10', range(9671, 9679)),
  },
  {
    id: '11',
    category: 'zine',
    title: 'PLANTS / INDUSTRY / POSTCARDS',
    description:
      'A repeated postcard format pairs domestic plants with industrial landscapes to build an ecological comparison.',
    images: images('zine', '11', range(9680, 9685)),
  },
  {
    id: '12',
    category: 'zine',
    title: 'IMAGE INDEX / ATMOSPHERE',
    description:
      'A gridded sheet turns blurred atmospheric images into a labeled visual index.',
    images: images('zine', '12', [9661]),
  },
  {
    id: '13',
    category: 'zine',
    title: 'ACCORDION TEXT STRIP',
    description:
      'A long folded strip converts dense text and diagrams into a continuous, expandable reading path.',
    images: images('zine', '13', range(9686, 9687)),
  },
  {
    id: '14',
    category: 'zine',
    title: 'TRANSPARENT SLEEVES / SIGNS',
    description:
      'Clear sleeves, metallic details, and repeated symbols present the publication as both storage system and object.',
    images: images('zine', '14', range(9697, 9701)),
  },
];

export const bookFairCategories: BookFairCategory[] = [
  {
    id: 'book',
    title: 'BOOK',
    description:
      'Four groups exploring archives, classification, transparency, and modular evidence.',
    groups: bookGroups,
  },
  {
    id: 'zine',
    title: 'ZINE',
    description:
      'Fourteen groups using compact formats, limited-color printing, folds, bindings, and tactile participation.',
    groups: zineGroups,
  },
];

export const bookFairReflection = [
  'Across the books and zines, communication design is used less as a neutral container than as a way of structuring attention. Repeated colors and restricted palettes make each project immediately legible as a system, while shifts in paper, transparency, scale, and binding signal how the reader should move through it. Cyanotypes and botanical diagrams borrow the authority of scientific specimens, but their sequencing reframes classification as a discussion of waste, ecology, and memory. Other publications use folds, pockets, loose cards, accordion structures, visible stitching, and ring bindings to turn reading into handling: information is discovered through opening, layering, rotating, or rearranging rather than only through linear page turns.',
  'Across both books and zines, image and text often work through contrast. Dense indexes sit beside translucent pages; hand-drawn marks interrupt ordered grids; industrial structures are paired with plants; and limited-color printing gives small editions a recognizable public voice. The zines especially use inexpensive reproduction and compact formats to make personal or culturally specific stories portable and shareable. Together, these examples show communication design operating as choreography. Format, material, typography, reproduction, and sequence determine not just what information looks like, but how long readers pause, what relationships they notice, and whether they receive a publication as evidence, narrative, object, or invitation to participate.',
];

export function findBookFairCategory(id: string) {
  return bookFairCategories.find((category) => category.id === id);
}

export function findBookFairGroup(categoryId: string, groupId: string) {
  return findBookFairCategory(categoryId)?.groups.find(
    (group) => group.id === groupId,
  );
}
