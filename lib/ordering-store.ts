import {
  getPublishedOrderingLayout,
  OrderingExport,
  OrderingLayout,
  orderingApproaches,
  orderingCanvas,
} from '@/data/orderings';
import { ArchiveItem } from '@/data/archive';

const DRAFT_KEY = 'living-archive:ordering-drafts:v1';

type DraftLayouts = Record<string, OrderingLayout>;

function cloneLayout(layout: OrderingLayout): OrderingLayout {
  return {
    orderingId: layout.orderingId,
    placements: layout.placements.map((placement) => ({ ...placement })),
  };
}

export function loadOrderingDrafts(): DraftLayouts {
  try {
    const saved = window.localStorage.getItem(DRAFT_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function loadOrderingLayout(
  orderingId: string,
  images: ArchiveItem[],
): { layout: OrderingLayout; isDraft: boolean } {
  const draft = loadOrderingDrafts()[orderingId];
  const published = getPublishedOrderingLayout(orderingId, images);
  if (!draft) return { layout: published, isDraft: false };

  const draftByImage = new Map(
    draft.placements.map((placement) => [placement.imageId, placement]),
  );
  return {
    isDraft: true,
    layout: {
      orderingId,
      placements: published.placements.map(
        (placement) => draftByImage.get(placement.imageId) || placement,
      ),
    },
  };
}

export function saveOrderingDraft(layout: OrderingLayout) {
  const drafts = loadOrderingDrafts();
  drafts[layout.orderingId] = cloneLayout(layout);
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
}

export function clearOrderingDraft(orderingId: string) {
  const drafts = loadOrderingDrafts();
  delete drafts[orderingId];
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(drafts));
}

export function exportAllOrderingLayouts(
  images: ArchiveItem[],
  currentLayout?: OrderingLayout,
) {
  const drafts = loadOrderingDrafts();
  if (currentLayout)
    drafts[currentLayout.orderingId] = cloneLayout(currentLayout);

  const layouts = Object.fromEntries(
    orderingApproaches.map((approach) => [
      approach.id,
      drafts[approach.id] || getPublishedOrderingLayout(approach.id, images),
    ]),
  );
  const payload: OrderingExport = {
    version: 1,
    canvas: orderingCanvas,
    exportedAt: new Date().toISOString(),
    layouts,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'published-orderings.json';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
