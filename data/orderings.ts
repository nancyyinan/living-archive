import publishedOrderings from '@/data/published-orderings.json';

export interface OrderingApproach {
  id: string;
  number: string;
  title: string;
}

export interface OrderingPlacement {
  imageId: string;
  x: number;
  y: number;
  width: number;
  z: number;
}

export interface OrderingLayout {
  orderingId: string;
  placements: OrderingPlacement[];
}

export interface OrderingExport {
  version: number;
  canvas: {
    width: number;
    height: number;
  };
  exportedAt?: string;
  layouts: Record<string, OrderingLayout>;
}

export const orderingCanvas = {
  width: 1680,
  height: 1100,
};

export const orderingApproaches: OrderingApproach[] = [
  {
    id: 'easiest-to-hardest-to-record',
    number: '01',
    title: 'FROM EASIEST TO HARDEST TO RECORD',
  },
  {
    id: 'trace-survival',
    number: '02',
    title: 'BY HOW LONG EACH TRACE MIGHT SURVIVE',
  },
  {
    id: 'captured-to-free-movement',
    number: '03',
    title: 'FROM CAPTURED MOVEMENT TO FREE MOVEMENT',
  },
  {
    id: 'vertical-section-of-the-world',
    number: '04',
    title: 'AS A VERTICAL SECTION OF THE WORLD',
  },
  {
    id: 'layers-of-mediation',
    number: '05',
    title:
      'BY HOW MANY LAYERS OF MEDIATION SEPARATE ME FROM THE ORIGINAL SUBJECT OR EVENT BEING RECORDED',
  },
  {
    id: 'belonging-to-displacement',
    number: '06',
    title: 'FROM BELONGING TO DISPLACEMENT',
  },
  {
    id: 'repetition-to-irreversibility',
    number: '07',
    title: 'FROM REPETITION TO IRREVERSIBILITY',
  },
  {
    id: 'continuous-path',
    number: '08',
    title: 'AS A CONTINUOUS PATH MOVING FORWARD UNTIL IT ENDS',
  },
  {
    id: 'visible-to-caption-dependent',
    number: '09',
    title:
      'FROM IMAGES WHOSE MEANING IS IMMEDIATELY VISIBLE TO IMAGES WHOSE MEANING CHANGES MOST AFTER READING MY PERSONAL CAPTION',
  },
  {
    id: 'everyday-life-to-larger-systems',
    number: '10',
    title: 'FROM EVERYDAY LIFE TO LARGER SYSTEMS',
  },
];

const published = publishedOrderings as OrderingExport;

const cloneLayout = (layout: OrderingLayout): OrderingLayout => ({
  orderingId: layout.orderingId,
  placements: layout.placements.map((placement) => ({ ...placement })),
});

function neutralPlacement(
  image: { id: string; orientation?: 'landscape' | 'portrait' },
  index: number,
): OrderingPlacement {
  const column = index % 4;
  const row = Math.floor(index / 4);
  const width = image.orientation === 'portrait' ? 200 : 300;
  return {
    imageId: image.id,
    x: 90 + column * 400 + (300 - width) / 2,
    y: 65 + row * 340,
    width,
    z: index + 1,
  };
}

export function getPublishedOrderingLayout(
  orderingId: string,
  images: { id: string; orientation?: 'landscape' | 'portrait' }[],
): OrderingLayout {
  const stored = published.layouts[orderingId];
  const storedByImage = new Map(
    stored?.placements.map((placement) => [placement.imageId, placement]),
  );

  return cloneLayout({
    orderingId,
    placements: images.map(
      (image, index) =>
        storedByImage.get(image.id) || neutralPlacement(image, index),
    ),
  });
}

export function findOrderingApproach(id?: string) {
  return orderingApproaches.find((approach) => approach.id === id);
}
