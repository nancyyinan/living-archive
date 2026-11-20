const CATEGORIES = {
  origin: { label: 'Origin', descriptor: 'Life and formation', question: 'What happens before an egg is laid?', color: '#9583ad', glyph: '○' },
  production: { label: 'Production', descriptor: 'Hens and farming', question: 'What affects the supply of eggs?', color: '#748a70', glyph: '×' },
  journey: { label: 'Journey', descriptor: 'Grade and cold chain', question: 'What happens between the farm and the shelf?', color: '#6f889a', glyph: '—' },
  economy: { label: 'Economy', descriptor: 'Price and disruption', question: 'Why does the price of an egg change?', color: '#b56b4f', glyph: '◇' },
  nutrition: { label: 'Nutrition', descriptor: 'Energy and protein', question: 'What does an egg actually contain?', color: '#b88f28', glyph: '+' },
  culture: { label: 'Culture', descriptor: 'Symbol and practice', question: 'Why does an egg carry so many meanings?', color: '#ae727d', glyph: '✣' }
};

const SOURCES = {
  'psu-reproduction': { label: 'Penn State Extension · Hen Reproduction', url: 'https://extension.psu.edu/hen-reproduction' },
  'psu-embryo': { label: 'Penn State Extension · Embryo Development', url: 'https://extension.psu.edu/programs/4-h/opportunities/projects/animal-science/poultry/raising-rearing/viii-other-online-resources/embryo-development' },
  'usda-nass-2024': { label: 'USDA NASS · Chickens and Eggs 2024 Summary', url: 'https://www.nass.usda.gov/Publications/Todays_Reports/reports/ckegan25.pdf' },
  'usda-ers-mar-2025': { label: 'USDA ERS · Livestock, Dairy, and Poultry Outlook, March 2025', url: 'https://www.ers.usda.gov/media/10705/ldp-m-369.pdf' },
  'usda-ams-grades': { label: 'USDA AMS · Egg Grading Shields', url: 'https://www.ams.usda.gov/grades-standards/egg/grade-shields' },
  'fda-cold-chain': { label: 'FDA · Food Code 2022', url: 'https://www.fda.gov/media/184685/download' },
  'usda-ers-may-2025': { label: 'USDA ERS · Livestock, Dairy, and Poultry Outlook, May 2025', url: 'https://ers.usda.gov/sites/default/files/_laserfiche/outlooks/112616/LDP-M-371.pdf' },
  'bls-fred-eggs': { label: 'U.S. Bureau of Labor Statistics via FRED · APU0000708111', url: 'https://fred.stlouisfed.org/data/APU0000708111' },
  'usda-ars-sr28': { label: 'USDA ARS · National Nutrient Database SR28', url: 'https://www.ars.usda.gov/ARSUserFiles/80400525/Data/SR/SR28/reports/sr28fg01.pdf' },
  'usda-protein': { label: 'USDA National Agricultural Library · Protein content table', url: 'https://www.nal.usda.gov/sites/default/files/page-files/Protein.pdf' },
  'smithsonian-eggs': { label: 'Smithsonian · Designing Easter Eggs', url: 'https://www.si.edu/stories/designing-easter-eggs' },
  'maff-tamagoyaki': { label: 'Japan MAFF · Our Regional Cuisines: Tamagoyaki', url: 'https://www.maff.go.jp/e/policies/market/k_ryouri/search_menu/3533/index.html' }
};

const RECORDS = [
  { id: 'origin-formation', category: 'origin', title: 'A little more than 24 hours', concise_description: 'A hen usually forms a complete egg in a little more than 24 hours as the yolk moves through the oviduct.', data_type: 'Quantitative process', value: 24, display_value: '>24 hours', unit: 'hours', period: null, source_id: 'psu-reproduction', tags: ['formation', 'process'], related_record_ids: ['origin-embryo'], anchor: { x: 15, y: 4 } },
  { id: 'origin-embryo', category: 'origin', title: 'Development before laying', concise_description: 'In a fertilized egg, development begins before laying; major hatching changes occur between incubation days 18 and 21.', data_type: 'Documented process', value: '18–21', display_value: 'Days 18–21', unit: 'incubation days', period: null, source_id: 'psu-embryo', tags: ['development', 'incubation'], related_record_ids: ['origin-formation'], anchor: { x: 15, y: 7 } },
  { id: 'production-scale', category: 'production', title: '109 billion eggs in 2024', concise_description: 'U.S. egg production totaled 109 billion in 2024, with an annual average of 375 million layers.', data_type: 'Quantitative observation', value: 109, display_value: '109 billion eggs', unit: 'billion eggs', period: '2024', source_id: 'usda-nass-2024', tags: ['production', 'annual'], related_record_ids: ['production-hpai'], anchor: { x: 20.5, y: 7.5 } },
  { id: 'production-hpai', category: 'production', title: '50.7 million laying hens lost', concise_description: 'The October 2024–March 10, 2025 HPAI wave resulted in the loss of 50.7 million laying hens.', data_type: 'Documented event', value: 50.7, display_value: '50.7 million hens', unit: 'million laying hens', period: 'Oct 2024–Mar 10, 2025', source_id: 'usda-ers-mar-2025', tags: ['HPAI', 'supply disruption'], related_record_ids: ['production-scale', 'wholesale-feb-2025'], anchor: { x: 21.5, y: 11.5 } },
  { id: 'journey-grade', category: 'journey', title: 'Quality becomes a grade', concise_description: 'Officially graded shell eggs are categorized as U.S. Grade AA, A, or B under documented quality standards.', data_type: 'Categorical process', value: 'AA · A · B', display_value: 'AA · A · B', unit: null, period: null, source_id: 'usda-ams-grades', tags: ['grading', 'quality'], related_record_ids: ['journey-cold'], anchor: { x: 22, y: 14.5 } },
  { id: 'journey-cold', category: 'journey', title: 'A 45°F cold chain', concise_description: 'Packed shell eggs for consumer use must be stored and transported at an ambient temperature no higher than 45°F.', data_type: 'Quantitative threshold', value: 45, display_value: '≤45°F / 7°C', unit: 'degrees Fahrenheit', period: null, source_id: 'fda-cold-chain', tags: ['transport', 'refrigeration'], related_record_ids: ['journey-grade'], anchor: { x: 19, y: 18.5 } },
  { id: 'wholesale-feb-2025', category: 'economy', title: 'February wholesale price', concise_description: 'USDA ERS reports the February 2025 monthly wholesale price at approximately $8.20 per dozen.', data_type: 'Quantitative observation', value: 8.20, display_value: '≈$8.20 / dozen', unit: 'U.S. dollars per dozen', period: 'February 2025', source_id: 'usda-ers-may-2025', tags: ['wholesale', 'price', 'monthly'], related_record_ids: ['wholesale-mar-2025', 'production-hpai'], anchor: { x: 11, y: 10.5 } },
  { id: 'wholesale-mar-2025', category: 'economy', title: 'March wholesale price', concise_description: 'USDA ERS reports the March 2025 monthly wholesale price at approximately $5.34 per dozen.', data_type: 'Quantitative observation', value: 5.34, display_value: '≈$5.34 / dozen', unit: 'U.S. dollars per dozen', period: 'March 2025', source_id: 'usda-ers-may-2025', tags: ['wholesale', 'price', 'monthly'], related_record_ids: ['wholesale-feb-2025'], anchor: { x: 9, y: 14 } },
  { id: 'retail-feb-2025', category: 'economy', title: 'February retail price', concise_description: 'The U.S. city average price for Grade A large eggs was $5.897 per dozen in February 2025.', data_type: 'Quantitative observation', value: 5.897, display_value: '$5.897 / dozen', unit: 'U.S. dollars per dozen', period: 'February 2025', source_id: 'bls-fred-eggs', tags: ['retail', 'price', 'monthly'], related_record_ids: ['retail-mar-2025'], anchor: { x: 14, y: 14.5 } },
  { id: 'retail-mar-2025', category: 'economy', title: 'March retail price', concise_description: 'The U.S. city average price for Grade A large eggs was $6.227 per dozen in March 2025.', data_type: 'Quantitative observation', value: 6.227, display_value: '$6.227 / dozen', unit: 'U.S. dollars per dozen', period: 'March 2025', source_id: 'bls-fred-eggs', tags: ['retail', 'price', 'monthly'], related_record_ids: ['retail-feb-2025'], anchor: { x: 13, y: 18.5 } },
  { id: 'nutrition-energy', category: 'nutrition', title: '72 kilocalories', concise_description: 'One large raw whole egg, a 50 g edible portion, contains 72 kilocalories in the USDA reference record.', data_type: 'Quantitative observation', value: 72, display_value: '72 kcal / large egg', unit: 'kilocalories', period: null, source_id: 'usda-ars-sr28', tags: ['nutrition', 'large egg'], related_record_ids: ['nutrition-protein'], anchor: { x: 9, y: 18.5 } },
  { id: 'nutrition-protein', category: 'nutrition', title: '6.28 grams of protein', concise_description: 'One large raw whole egg contains 6.28 grams of protein in the USDA reference table.', data_type: 'Quantitative observation', value: 6.28, display_value: '6.28 g / large egg', unit: 'grams of protein', period: null, source_id: 'usda-protein', tags: ['nutrition', 'large egg'], related_record_ids: ['nutrition-energy'], anchor: { x: 6.5, y: 14.5 } },
  { id: 'culture-pysanka', category: 'culture', title: 'A symbol of new life', concise_description: 'Polish pisanka and Ukrainian pysanka are exchanged at Easter and may symbolize new life, fertility, and protection.', data_type: 'Documented cultural context', value: 'New life · fertility · protection', display_value: 'New life · fertility · protection', unit: null, period: null, source_id: 'smithsonian-eggs', tags: ['symbolism', 'decoration'], related_record_ids: [], anchor: { x: 9, y: 7.5 } },
  { id: 'culture-tamagoyaki', category: 'culture', title: 'A regional culinary practice', concise_description: 'Tokyo-style tamagoyaki is thick and sweet; Kansai dashimaki uses dashi and is cooked without browning.', data_type: 'Documented cultural process', value: 'Tokyo · Kansai', display_value: 'Tokyo · Kansai', unit: null, period: null, source_id: 'maff-tamagoyaki', tags: ['culinary practice', 'region'], related_record_ids: [], anchor: { x: 6.5, y: 11.5 } }
];

const RELATIONSHIPS = [
  { id: 'rel-origin-sequence', source_record_id: 'origin-formation', target_record_id: 'origin-embryo', relationship_type: 'Documented process sequence', evidence_status: 'Documented', factual_statement: 'Egg formation precedes the later incubation stages described for a fertilized egg.', comparison_result: null, source_ids: ['psu-reproduction', 'psu-embryo'], limitations: 'The incubation record applies to fertilized eggs. The spatial distance is an interface layout, not elapsed time.', visual: { style: 'process', bend: 1 } },
  { id: 'rel-production-context', source_record_id: 'production-scale', target_record_id: 'production-hpai', relationship_type: 'Shared production context', evidence_status: 'Documented context', factual_statement: 'The annual production scale and the HPAI loss record describe two different measures within the U.S. egg-production system.', comparison_result: null, source_ids: ['usda-nass-2024', 'usda-ers-mar-2025'], limitations: 'This connection does not calculate the share of annual production lost or assign a precise production effect.', visual: { style: 'shared', bend: -1 } },
  { id: 'rel-hpai-wholesale', source_record_id: 'production-hpai', target_record_id: 'wholesale-feb-2025', relationship_type: 'Documented economic mechanism', evidence_status: 'Documented mechanism', factual_statement: 'USDA ERS discusses layer losses and constrained flock inventory alongside elevated wholesale egg prices.', comparison_result: null, source_ids: ['usda-ers-mar-2025', 'usda-ers-may-2025'], limitations: 'The sources do not quantify how much of the February price was caused by HPAI; this path represents a documented mechanism, not a measured causal contribution.', visual: { style: 'mechanism', bend: 3 } },
  { id: 'rel-journey-sequence', source_record_id: 'journey-grade', target_record_id: 'journey-cold', relationship_type: 'Documented process sequence', evidence_status: 'Documented', factual_statement: 'Grading and refrigerated storage are distinct documented controls in the post-lay journey of consumer shell eggs.', comparison_result: null, source_ids: ['usda-ams-grades', 'fda-cold-chain'], limitations: 'The path organizes handling stages; it does not measure transport distance or time.', visual: { style: 'process', bend: -1 } },
  { id: 'rel-wholesale-chronology', source_record_id: 'wholesale-feb-2025', target_record_id: 'wholesale-mar-2025', relationship_type: 'Chronological comparison', evidence_status: 'Observed comparison', factual_statement: 'The monthly wholesale price decreased from approximately $8.20 to $5.34 per dozen.', comparison_result: 'Approximately −$2.86 per dozen (−34.9%)', source_ids: ['usda-ers-may-2025'], limitations: 'Values are approximate monthly wholesale prices read from the USDA ERS chart.', visual: { style: 'chronological', bend: -2, direction: 'down', color: '#a7543d' } },
  { id: 'rel-retail-chronology', source_record_id: 'retail-feb-2025', target_record_id: 'retail-mar-2025', relationship_type: 'Chronological comparison', evidence_status: 'Observed comparison', factual_statement: 'The U.S. city average retail price increased from $5.897 to $6.227 per dozen.', comparison_result: '+$0.330 per dozen (+5.6%)', source_ids: ['bls-fred-eggs'], limitations: 'This is a national urban retail average for Grade A large eggs.', visual: { style: 'chronological', bend: 2, direction: 'up', color: '#c77c5e' } },
  { id: 'rel-nutrition-serving', source_record_id: 'nutrition-energy', target_record_id: 'nutrition-protein', relationship_type: 'Shared context', evidence_status: 'Documented context', factual_statement: 'Energy and protein are separate nutrient observations describing the same large raw whole-egg serving context.', comparison_result: null, source_ids: ['usda-ars-sr28', 'usda-protein'], limitations: 'This connection does not convert or compare unlike nutrient units.', visual: { style: 'shared', bend: 1 } }
];

const COMPOSITE_INSIGHTS = [
  { id: 'insight-opposite-price-trends', required_relationship_ids: ['rel-wholesale-chronology', 'rel-retail-chronology'], title: 'Wholesale fell while retail continued rising.', statement: 'Between February and March 2025, the reported wholesale series decreased by approximately $2.86 per dozen while the BLS retail series increased by $0.330 per dozen.', limitations: 'The two series use different market definitions. Their divergence is not a retail profit margin and does not prove a causal relationship.' }
];

const POSITIONS = [
  ['origin', 50, 8], ['production', 83, 28], ['journey', 83, 72],
  ['economy', 50, 92], ['nutrition', 17, 72], ['culture', 17, 28]
];

const STORAGE_KEY = 'egg-otherwise-v3';
const LEGACY_STORAGE_KEY = 'egg-otherwise-v2';
const DEFAULT_STATE = { atlasOpened: false, selectedCategory: null, revealedCategories: [], explored: [], collected: [], selectedThread: null, pendingRelationship: null, completedRelationships: [], activeDiscovery: null, showGuide: true };
let state = loadState();
let currentView = 'explore';
let canvasMetrics = null;
let toastTimer;
let unavailablePair = null;

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const recordById = id => RECORDS.find(record => record.id === id);
const relationshipById = id => RELATIONSHIPS.find(relationship => relationship.id === id);
const otherRecordId = (relationship, recordId) => relationship.source_record_id === recordId ? relationship.target_record_id : relationship.source_record_id;
const relationshipsForRecord = recordId => RELATIONSHIPS.filter(relationship => relationship.source_record_id === recordId || relationship.target_record_id === recordId);
function unique(values) { return [...new Set(values)]; }

function loadState() {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (current) return sanitizeState(current);
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || 'null');
    if (!legacy) return { ...DEFAULT_STATE };
    const migrate = id => ({ 'economy-feb-2025': 'retail-feb-2025', 'economy-mar-2025': 'retail-mar-2025', 'economy-wholesale': 'retail-feb-2025', 'economy-retail': 'retail-mar-2025' }[id] || id);
    return sanitizeState({
      ...DEFAULT_STATE,
      atlasOpened: Boolean(legacy.explored?.length || legacy.collected?.length),
      selectedCategory: legacy.selectedCategory || null,
      revealedCategories: legacy.selectedCategory ? [legacy.selectedCategory] : [],
      explored: (legacy.explored || []).map(migrate),
      collected: (legacy.collected || []).map(migrate),
      selectedThread: migrate(legacy.selectedThread),
      showGuide: legacy.showGuide !== false
    });
  } catch { return { ...DEFAULT_STATE }; }
}

function sanitizeState(candidate) {
  const recordIds = new Set(RECORDS.map(record => record.id));
  const relationshipIds = new Set(RELATIONSHIPS.map(relationship => relationship.id));
  const categories = new Set(Object.keys(CATEGORIES));
  const clean = { ...DEFAULT_STATE, ...candidate };
  clean.explored = unique((clean.explored || []).filter(id => recordIds.has(id)));
  clean.collected = unique((clean.collected || []).filter(id => recordIds.has(id)));
  clean.completedRelationships = unique((clean.completedRelationships || []).filter(id => relationshipIds.has(id)));
  clean.revealedCategories = unique((clean.revealedCategories || []).filter(key => categories.has(key)));
  clean.selectedCategory = categories.has(clean.selectedCategory) ? clean.selectedCategory : null;
  clean.selectedThread = recordIds.has(clean.selectedThread) && clean.collected.includes(clean.selectedThread) ? clean.selectedThread : clean.collected[0] || null;
  clean.pendingRelationship = relationshipIds.has(clean.pendingRelationship) ? clean.pendingRelationship : null;
  clean.activeDiscovery = relationshipIds.has(clean.activeDiscovery) ? clean.activeDiscovery : null;
  return clean;
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function exploreRecord(id) { if (!state.explored.includes(id)) state.explored.push(id); }
function completedInsights() { return COMPOSITE_INSIGHTS.filter(insight => insight.required_relationship_ids.every(id => state.completedRelationships.includes(id))); }
function sourceForRecord(record) { return SOURCES[record.source_id]; }

function init() {
  renderAll();
  bindEvents();
  new ResizeObserver(() => {
    if (currentView === 'stitch') resizeCanvas();
    if (currentView === 'egg') resizeFinalCanvas();
  }).observe($('#canvas-shell'));
  resizeCanvas();
}

function renderAll() {
  renderExplore();
  $('#thread-count').textContent = state.collected.length;
  $('#thread-sidebar-count').textContent = `${state.collected.length} collected`;
  $('#relationship-total').textContent = `${state.completedRelationships.length} relationship${state.completedRelationships.length === 1 ? '' : 's'}`;
  $('#live-progress').textContent = `${state.explored.length} explored`;
  $('#guide-toggle').checked = state.showGuide;
  $('#empty-canvas-message').hidden = state.collected.length > 0;
  $('#undo-button').disabled = state.completedRelationships.length === 0;
  $('#clear-button').disabled = state.completedRelationships.length === 0;
  $('#stitch-guidance').textContent = `${state.explored.length} record${state.explored.length === 1 ? '' : 's'} explored · ${state.completedRelationships.length} relationship${state.completedRelationships.length === 1 ? '' : 's'} stitched`;
  renderThreadTools();
  renderThreadsDrawer();
  renderInspector();
  updateCanvasStatus();
  drawCanvas();
  if (currentView === 'egg') renderReflection();
}

function renderExplore() {
  const atlas = $('#atlas-wrap');
  atlas.classList.toggle('is-open', state.atlasOpened);
  $('#explore-instruction').textContent = state.atlasOpened ? 'Choose one system to open a layer.' : 'Click the egg to begin.';
  $('#egg-trigger').innerHTML = `<svg viewBox="0 0 150 190" aria-hidden="true"><path d="M75 6C49 6 15 62 15 118c0 38 27 66 60 66s60-28 60-66C135 62 101 6 75 6Z"/></svg><strong>${state.atlasOpened ? 'One egg' : 'Begin here'}</strong><span>${state.atlasOpened ? 'Six systems' : 'Click the egg'}</span>`;
  $('#atlas-categories').innerHTML = POSITIONS.map(([key, x, y], index) => {
    const category = CATEGORIES[key];
    const selected = state.selectedCategory === key;
    const faded = state.selectedCategory && !selected;
    return `<button class="category-node ${selected ? 'is-active' : ''} ${faded ? 'is-muted' : ''}" style="left:${x}%;top:${y}%;color:${category.color};--delay:${index * 65}ms" data-category="${key}" ${state.atlasOpened ? '' : 'tabindex="-1"'}><span>${category.label}</span><small>${category.descriptor}</small></button>`;
  }).join('');

  const panel = $('#category-discovery');
  const recordsPanel = $('#atlas-records');
  if (!state.atlasOpened || !state.selectedCategory) {
    panel.hidden = true;
    recordsPanel.hidden = true;
    return;
  }
  const category = CATEGORIES[state.selectedCategory];
  panel.hidden = false;
  $('#context-symbol').textContent = category.glyph;
  $('#context-symbol').style.background = category.color;
  $('#context-label').textContent = `${category.label} · ${category.descriptor}`;
  $('#context-question').textContent = category.question;
  const revealed = state.revealedCategories.includes(state.selectedCategory);
  $('#reveal-records').textContent = revealed ? 'Records revealed' : 'Open this layer';
  $('#reveal-records').disabled = revealed;
  if (!revealed) {
    recordsPanel.hidden = true;
    return;
  }
  const records = RECORDS.filter(record => record.category === state.selectedCategory);
  recordsPanel.hidden = false;
  recordsPanel.innerHTML = `<div class="records-heading"><h2>${category.label} records</h2><span>${records.length} sourced observation${records.length === 1 ? '' : 's'}</span></div><div class="record-card-grid">${records.map(recordCardHtml).join('')}</div>`;
}

function recordCardHtml(record) {
  const category = CATEGORIES[record.category];
  const source = sourceForRecord(record);
  const collected = state.collected.includes(record.id);
  return `<article class="record-card" style="--record-color:${category.color}">
    <div class="record-card-top"><span class="record-symbol">${category.glyph}</span><span>${record.data_type}</span></div>
    <h3>${record.title}</h3><strong>${record.display_value}</strong><p>${record.concise_description}</p>
    <div class="record-card-actions"><button data-record="${record.id}">${collected ? 'View collected thread' : 'Explore record'}</button><a href="${source.url}" target="_blank" rel="noreferrer">Source</a></div>
  </article>`;
}

function openRecord(id) {
  const record = recordById(id);
  if (!record) return;
  exploreRecord(id);
  saveState();
  const category = CATEGORIES[record.category];
  const source = sourceForRecord(record);
  const collected = state.collected.includes(id);
  const supported = relationshipsForRecord(id).length;
  $('#drawer-content').innerHTML = `
    <p class="drawer-category" style="color:${category.color}">${category.label} · ${record.data_type}</p>
    <div class="drawer-glyph" style="background:${category.color}">${category.glyph}</div>
    <h2 id="drawer-title">${record.title}</h2>
    <span class="data-badge" style="color:${category.color}">${record.display_value}</span>
    <p class="drawer-fact">${record.concise_description}</p>
    <div class="drawer-details">
      <div class="drawer-detail"><span>Data identity</span><p>${record.period ? `${record.period} · ` : ''}${record.data_type}${record.unit ? ` · ${record.unit}` : ''}</p></div>
      <div class="drawer-detail"><span>Connection potential</span><p>${supported ? `${supported} source-backed relationship${supported === 1 ? '' : 's'} in the current dataset.` : 'No established connection in the current dataset. This record can remain an independent branch.'}</p></div>
      <div class="drawer-detail"><span>Source</span><p>${source.label}</p><a class="source-link" href="${source.url}" target="_blank" rel="noreferrer">Inspect original source</a></div>
    </div>
    <button class="collect-button ${collected ? 'is-collected' : ''}" data-action="collect" data-record-id="${id}">${collected ? '✓ Added to My Threads' : 'Add to My Threads'}</button>`;
  openOverlay($('#record-drawer'));
  renderAll();
}

function collectRecord(id) {
  if (!state.collected.includes(id)) {
    state.collected.push(id);
    state.selectedThread = id;
    exploreRecord(id);
    state.atlasOpened = true;
    showToast(`${recordById(id).title} unlocked as a data thread.`);
  }
  saveState();
  closeOverlays();
  renderAll();
}

function renderThreadTools() {
  const container = $('#thread-tools');
  if (!state.collected.length) {
    container.innerHTML = '<p class="drawer-empty">No threads yet. Collect a record to reveal its possible connections.</p>';
    return;
  }
  container.innerHTML = state.collected.map(id => {
    const record = recordById(id);
    const category = CATEGORIES[record.category];
    const available = relationshipsForRecord(id).filter(relationship => state.collected.includes(otherRecordId(relationship, id)) && !state.completedRelationships.includes(relationship.id)).length;
    return `<button class="thread-tool ${state.selectedThread === id ? 'is-active' : ''}" style="color:${category.color}" data-thread="${id}" aria-label="${record.title}${available ? `, ${available} available connection${available === 1 ? '' : 's'}` : ''}"><span class="thread-tool-glyph" style="background:${category.color}">${category.glyph}</span><span><strong>${record.title}</strong><small>${record.display_value}</small></span></button>`;
  }).join('');
}

function renderThreadsDrawer() {
  const list = $('#threads-drawer-list');
  if (!state.collected.length) {
    list.innerHTML = '<p class="drawer-empty">Your collection is empty. Open a sourced record and add its thread.</p>';
    return;
  }
  list.innerHTML = state.collected.map(id => {
    const record = recordById(id);
    const category = CATEGORIES[record.category];
    return `<div class="thread-drawer-row"><i style="background:${category.color}">${category.glyph}</i><span><strong>${record.title}</strong><small>${category.label} · ${record.display_value}</small></span></div>`;
  }).join('');
}

function chooseThread(id) {
  if (!state.collected.includes(id)) return;
  state.selectedThread = id;
  state.pendingRelationship = null;
  state.activeDiscovery = null;
  unavailablePair = null;
  exploreRecord(id);
  saveState();
  renderAll();
}

function findRelationship(firstId, secondId) {
  return RELATIONSHIPS.find(relationship =>
    (relationship.source_record_id === firstId && relationship.target_record_id === secondId) ||
    (relationship.source_record_id === secondId && relationship.target_record_id === firstId)
  );
}

function selectConnection(targetId) {
  const sourceId = state.selectedThread;
  if (!sourceId || sourceId === targetId) return;
  const relationship = findRelationship(sourceId, targetId);
  if (!relationship) {
    state.pendingRelationship = null;
    state.activeDiscovery = null;
    unavailablePair = [sourceId, targetId];
    renderAll();
    return;
  }
  unavailablePair = null;
  if (state.completedRelationships.includes(relationship.id)) {
    state.activeDiscovery = relationship.id;
    state.pendingRelationship = null;
  } else {
    state.pendingRelationship = relationship.id;
    state.activeDiscovery = null;
  }
  saveState();
  renderAll();
}

function completePendingRelationship() {
  const relationship = relationshipById(state.pendingRelationship);
  if (!relationship) return;
  if (![relationship.source_record_id, relationship.target_record_id].every(id => state.collected.includes(id))) return;
  if (!state.completedRelationships.includes(relationship.id)) state.completedRelationships.push(relationship.id);
  exploreRecord(relationship.source_record_id);
  exploreRecord(relationship.target_record_id);
  state.activeDiscovery = relationship.id;
  state.pendingRelationship = null;
  state.selectedThread = relationship.target_record_id;
  saveState();
  renderAll();
  showToast('Relationship stitched. The evidence is now active.');
}

function renderInspector() {
  const container = $('#inspector-content');
  if (unavailablePair) {
    const [firstId, secondId] = unavailablePair;
    const first = recordById(firstId), second = recordById(secondId);
    container.innerHTML = `<div class="unsupported-state"><span>No established connection</span><h3>${first.title} + ${second.title}</h3><p>The current dataset does not support a direct relationship between these records. They can remain separate branches.</p><button class="small-button" data-thread="${second.id}">Use ${second.title} instead</button></div>`;
    return;
  }
  const pending = relationshipById(state.pendingRelationship);
  if (pending) {
    const source = recordById(pending.source_record_id), target = recordById(pending.target_record_id);
    container.innerHTML = `<div class="relationship-state is-pending"><span class="state-label">Ready to stitch</span><h3>${pending.relationship_type}</h3>${connectionPairHtml(source, target)}<p>${pending.factual_statement}</p><div class="evidence-chip">${pending.evidence_status}</div><button class="complete-connection" data-action="complete-relationship">Stitch this connection</button><small>${pending.limitations}</small></div>`;
    return;
  }
  const discovery = relationshipById(state.activeDiscovery);
  if (discovery && state.completedRelationships.includes(discovery.id)) {
    container.innerHTML = discoveryHtml(discovery);
    return;
  }
  const record = recordById(state.selectedThread);
  if (!record) {
    container.innerHTML = '<div class="inspector-placeholder"><p>Select a record to see what it connects to.</p></div>';
    return;
  }
  const category = CATEGORIES[record.category];
  const source = sourceForRecord(record);
  const possibilities = relationshipsForRecord(record.id).map(relationship => ({ relationship, other: recordById(otherRecordId(relationship, record.id)) }));
  const collected = possibilities.filter(item => state.collected.includes(item.other.id));
  const locked = possibilities.filter(item => !state.collected.includes(item.other.id));
  container.innerHTML = `<div class="inspector-identity"><div class="inspector-glyph" style="background:${category.color}">${category.glyph}</div><div><span class="inspector-category">${category.label} · ${record.data_type}</span><h3>${record.title}</h3></div></div>
    <div class="source-value"><span>Source value</span><strong>${record.display_value}</strong></div>
    <p class="inspector-fact">${record.concise_description}</p>
    <span class="inspector-category">Valid next records</span>
    <div class="connection-options">${collected.length ? collected.map(connectionOptionHtml).join('') : '<p class="compact-empty">Collect a related record to activate a connection.</p>'}${locked.map(lockedOptionHtml).join('')}${possibilities.length ? '' : '<p class="compact-empty">No established connection in the current dataset. This record remains an independent branch.</p>'}</div>
    <a class="source-link" href="${source.url}" target="_blank" rel="noreferrer">View source</a>`;
}

function connectionOptionHtml({ relationship, other }) {
  const complete = state.completedRelationships.includes(relationship.id);
  return `<button class="connection-option ${complete ? 'is-complete' : ''}" data-connect-to="${other.id}"><span>${complete ? '✓' : '○'}</span><span><strong>${other.title}</strong><small>${relationship.relationship_type}</small></span></button>`;
}

function lockedOptionHtml({ relationship, other }) {
  return `<button class="connection-option is-locked" data-explore-record="${other.id}"><span>＋</span><span><strong>${other.title}</strong><small>Collect to unlock · ${relationship.relationship_type}</small></span></button>`;
}

function connectionPairHtml(source, target) {
  return `<div class="connection-pair"><div><span>${source.period || CATEGORIES[source.category].label}</span><strong>${source.display_value}</strong><small>${source.title}</small></div><i></i><div><span>${target.period || CATEGORIES[target.category].label}</span><strong>${target.display_value}</strong><small>${target.title}</small></div></div>`;
}

function discoveryHtml(relationship) {
  const source = recordById(relationship.source_record_id), target = recordById(relationship.target_record_id);
  const sources = relationship.source_ids.map(id => SOURCES[id]);
  const composite = completedInsights()[0];
  return `<div class="relationship-state is-complete"><span class="state-label">Relationship stitched</span><h3>${relationship.factual_statement}</h3>${connectionPairHtml(source, target)}${relationship.comparison_result ? `<div class="comparison-result">${relationship.comparison_result}</div>` : ''}<div class="evidence-chip">${relationship.evidence_status} · ${relationship.relationship_type}</div><p class="limitation"><strong>Limit:</strong> ${relationship.limitations}</p>${composite ? `<div class="composite-insight"><span>Cross-series discovery</span><strong>${composite.title}</strong><p>${composite.limitations}</p></div>` : ''}<div class="source-list">${sources.map(sourceItem => `<a href="${sourceItem.url}" target="_blank" rel="noreferrer">${sourceItem.label}</a>`).join('')}</div></div>`;
}

function updateCanvasStatus() {
  const status = $('#canvas-status');
  if (state.pendingRelationship) {
    status.textContent = 'A valid path is ready. Stitch it to activate the evidence.';
    return;
  }
  if (state.activeDiscovery) {
    status.textContent = 'Relationship completed. Select another thread to continue.';
    return;
  }
  const record = recordById(state.selectedThread);
  if (!record) {
    status.textContent = 'Choose a thread to begin.';
    return;
  }
  const valid = relationshipsForRecord(record.id).filter(relationship => state.collected.includes(otherRecordId(relationship, record.id)) && !state.completedRelationships.includes(relationship.id));
  status.textContent = valid.length ? `${valid.length} supported connection${valid.length === 1 ? '' : 's'} available from ${record.title}.` : `No open collected connection from ${record.title}.`;
}

function makeMetrics(width, height, dpr = 1) {
  const cols = 30, rows = 24;
  const cell = Math.min((width - 28) / cols, (height - 28) / rows);
  return { width, height, dpr, cols, rows, cell, ox: (width - cols * cell) / 2, oy: (height - rows * cell) / 2 };
}

function resizeCanvas() {
  const canvas = $('#stitch-canvas');
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  canvasMetrics = makeMetrics(rect.width, rect.height, dpr);
  drawCanvas();
}

function drawCanvas() {
  const canvas = $('#stitch-canvas');
  if (!canvasMetrics || !canvas.width) return;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(canvasMetrics.dpr, 0, 0, canvasMetrics.dpr, 0, 0);
  drawMap(ctx, canvasMetrics, false);
}

function drawMap(ctx, metrics, finalMode) {
  drawFabric(ctx, metrics, state.showGuide || finalMode);
  state.completedRelationships.forEach(id => drawRelationship(ctx, relationshipById(id), metrics, 'complete'));
  if (!finalMode && state.pendingRelationship) drawRelationship(ctx, relationshipById(state.pendingRelationship), metrics, 'pending');
  const validTargets = new Set();
  if (!finalMode && state.selectedThread) {
    relationshipsForRecord(state.selectedThread).forEach(relationship => {
      const other = otherRecordId(relationship, state.selectedThread);
      if (state.collected.includes(other)) validTargets.add(other);
    });
  }
  RECORDS.forEach(record => drawAnchor(ctx, record, metrics, {
    collected: state.collected.includes(record.id),
    selected: !finalMode && state.selectedThread === record.id,
    valid: !finalMode && validTargets.has(record.id),
    finalMode
  }));
}

function drawFabric(ctx, metrics, guide) {
  ctx.clearRect(0, 0, metrics.width, metrics.height);
  ctx.fillStyle = '#e8dfd0';
  ctx.fillRect(0, 0, metrics.width, metrics.height);
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,.2)';
  ctx.lineWidth = 1;
  for (let y = 2; y < metrics.height; y += 4) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(metrics.width, y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(83,70,52,.04)';
  for (let x = 2; x < metrics.width; x += 4) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, metrics.height); ctx.stroke(); }
  ctx.restore();
  ctx.strokeStyle = 'rgba(64,58,49,.08)';
  ctx.lineWidth = .6;
  ctx.beginPath();
  for (let x = 0; x <= metrics.cols; x++) { const px = metrics.ox + x * metrics.cell; ctx.moveTo(px, metrics.oy); ctx.lineTo(px, metrics.oy + metrics.rows * metrics.cell); }
  for (let y = 0; y <= metrics.rows; y++) { const py = metrics.oy + y * metrics.cell; ctx.moveTo(metrics.ox, py); ctx.lineTo(metrics.ox + metrics.cols * metrics.cell, py); }
  ctx.stroke();
  if (guide) {
    ctx.save();
    ctx.strokeStyle = 'rgba(55,50,43,.42)';
    ctx.lineWidth = 1.1;
    ctx.setLineDash([4, 6]);
    drawEggPath(ctx, metrics);
    ctx.stroke();
    ctx.restore();
  }
}

function eggHalfWidth(t) { return 7.7 * Math.pow(Math.max(0, Math.sin(Math.PI * t)), .68) * (.88 + .16 * t); }
function drawEggPath(ctx, metrics) {
  const top = 2.2, bottom = 21.5, center = 15;
  ctx.beginPath();
  for (let i = 0; i <= 48; i++) {
    const t = i / 48, y = top + (bottom - top) * t, x = center - eggHalfWidth(t);
    const px = metrics.ox + x * metrics.cell, py = metrics.oy + y * metrics.cell;
    if (!i) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  for (let i = 48; i >= 0; i--) {
    const t = i / 48, y = top + (bottom - top) * t, x = center + eggHalfWidth(t);
    ctx.lineTo(metrics.ox + x * metrics.cell, metrics.oy + y * metrics.cell);
  }
  ctx.closePath();
}

function anchorPoint(record, metrics) {
  return { x: metrics.ox + (record.anchor.x + .5) * metrics.cell, y: metrics.oy + (record.anchor.y + .5) * metrics.cell };
}

function drawAnchor(ctx, record, metrics, options) {
  const point = anchorPoint(record, metrics);
  const category = CATEGORIES[record.category];
  const visible = options.collected || options.selected || options.valid;
  ctx.save();
  ctx.globalAlpha = visible ? 1 : options.finalMode ? 0 : .15;
  if (options.valid) {
    ctx.fillStyle = `${category.color}22`;
    ctx.beginPath(); ctx.arc(point.x, point.y, metrics.cell * .7, 0, Math.PI * 2); ctx.fill();
  }
  ctx.fillStyle = options.collected ? category.color : '#7f796e';
  ctx.strokeStyle = options.selected ? '#252421' : '#f8f5ed';
  ctx.lineWidth = options.selected ? 3 : 2;
  ctx.beginPath(); ctx.arc(point.x, point.y, options.selected ? metrics.cell * .36 : metrics.cell * .27, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.font = `${Math.max(9, metrics.cell * .34)}px Arial`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(category.glyph, point.x, point.y + .5);
  if (options.collected && !options.finalMode) {
    ctx.fillStyle = '#4e4a43';
    ctx.font = `${Math.max(9, metrics.cell * .28)}px Arial`;
    ctx.textAlign = point.x > metrics.width * .62 ? 'right' : 'left';
    const offset = point.x > metrics.width * .62 ? -metrics.cell * .5 : metrics.cell * .5;
    ctx.fillText(shortTitle(record.title), point.x + offset, point.y - metrics.cell * .52);
  }
  ctx.restore();
}

function shortTitle(title) { return title.length > 24 ? `${title.slice(0, 22)}…` : title; }

function curveForRelationship(relationship, metrics) {
  const source = anchorPoint(recordById(relationship.source_record_id), metrics);
  const target = anchorPoint(recordById(relationship.target_record_id), metrics);
  const dx = target.x - source.x, dy = target.y - source.y, length = Math.hypot(dx, dy) || 1;
  const bend = (relationship.visual.bend || 0) * metrics.cell * .38;
  const control = { x: (source.x + target.x) / 2 - dy / length * bend, y: (source.y + target.y) / 2 + dx / length * bend };
  const point = t => ({ x: (1 - t) ** 2 * source.x + 2 * (1 - t) * t * control.x + t ** 2 * target.x, y: (1 - t) ** 2 * source.y + 2 * (1 - t) * t * control.y + t ** 2 * target.y });
  return { source, target, control, point };
}

function drawRelationship(ctx, relationship, metrics, mode) {
  if (!relationship) return;
  const curve = curveForRelationship(relationship, metrics);
  const color = relationship.visual.color || CATEGORIES[recordById(relationship.source_record_id).category].color;
  ctx.save();
  ctx.strokeStyle = mode === 'pending' ? 'rgba(55,50,43,.5)' : color;
  ctx.lineWidth = mode === 'pending' ? 1.2 : Math.max(1.5, metrics.cell * .08);
  if (mode === 'pending') ctx.setLineDash([4, 5]);
  ctx.beginPath(); ctx.moveTo(curve.source.x, curve.source.y); ctx.quadraticCurveTo(curve.control.x, curve.control.y, curve.target.x, curve.target.y); ctx.stroke();
  if (mode === 'pending') { ctx.restore(); return; }
  ctx.setLineDash([]);
  const count = Math.max(7, Math.round(Math.hypot(curve.target.x - curve.source.x, curve.target.y - curve.source.y) / (metrics.cell * .72)));
  for (let index = 1; index < count; index++) {
    const point = curve.point(index / count);
    const next = curve.point(Math.min(1, index / count + .01));
    const angle = Math.atan2(next.y - point.y, next.x - point.x);
    drawSemanticStitch(ctx, point, angle, metrics.cell, color, relationship.visual.style, index);
  }
  if (relationship.visual.direction) {
    const midpoint = curve.point(.5);
    ctx.fillStyle = '#fffaf2'; ctx.strokeStyle = color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(midpoint.x, midpoint.y, metrics.cell * .32, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = color; ctx.font = `600 ${Math.max(11, metrics.cell * .42)}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(relationship.visual.direction === 'up' ? '↑' : '↓', midpoint.x, midpoint.y);
  }
  ctx.restore();
}

function drawSemanticStitch(ctx, point, angle, cell, color, style, index) {
  const size = cell * .26;
  ctx.save(); ctx.translate(point.x, point.y); ctx.rotate(angle); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineCap = 'round'; ctx.lineWidth = Math.max(1.6, cell * .09); ctx.shadowColor = 'rgba(55,40,28,.18)'; ctx.shadowBlur = 1.2; ctx.shadowOffsetY = .6;
  if (style === 'chronological') {
    ctx.beginPath(); ctx.moveTo(-size, -size); ctx.lineTo(size, size); ctx.moveTo(size, -size); ctx.lineTo(-size, size); ctx.stroke();
  } else if (style === 'process') {
    ctx.beginPath(); ctx.moveTo(-size * 1.25, 0); ctx.lineTo(size * 1.25, 0); ctx.stroke();
  } else if (style === 'mechanism') {
    ctx.beginPath(); ctx.arc(0, 0, size * .75, 0, Math.PI * 2); ctx.stroke();
    if (index % 2 === 0) { ctx.beginPath(); ctx.arc(0, 0, size * .2, 0, Math.PI * 2); ctx.fill(); }
  } else {
    ctx.beginPath(); ctx.moveTo(0, -size); ctx.lineTo(size * .7, 0); ctx.lineTo(0, size); ctx.lineTo(-size * .7, 0); ctx.closePath(); ctx.stroke();
  }
  ctx.restore();
}

function handleCanvasClick(event) {
  if (!canvasMetrics) return;
  const rect = $('#stitch-canvas').getBoundingClientRect();
  const click = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  const candidates = RECORDS.map(record => ({ record, point: anchorPoint(record, canvasMetrics) })).map(item => ({ ...item, distance: Math.hypot(click.x - item.point.x, click.y - item.point.y) })).sort((a, b) => a.distance - b.distance);
  const closest = candidates[0];
  if (!closest || closest.distance > Math.max(18, canvasMetrics.cell * .9)) {
    showToast('Choose a data anchor. Free stitching is intentionally unavailable.');
    return;
  }
  const id = closest.record.id;
  if (!state.collected.includes(id)) {
    openRecord(id);
    return;
  }
  if (!state.selectedThread || state.selectedThread === id) chooseThread(id);
  else selectConnection(id);
}

function renderReflection() {
  resizeFinalCanvas();
  const exploredRecords = state.explored.map(recordById).filter(Boolean);
  const categories = unique(exploredRecords.map(record => record.category));
  const completed = state.completedRelationships.map(relationshipById).filter(Boolean);
  const insights = completedInsights();
  $('#reflection-heading').textContent = completed.length ? 'A visual map of what you discovered.' : 'Your map is waiting for its first connection.';
  $('#reflection-copy').textContent = completed.length ? `You explored ${categories.length} system${categories.length === 1 ? '' : 's'} and stitched ${completed.length} supported relationship${completed.length === 1 ? '' : 's'}.` : 'Collect related records, select an available path, and stitch the evidence into the egg.';
  $('#summary-stats').innerHTML = `<div class="stat"><b>${exploredRecords.length}</b><span>Records explored</span></div><div class="stat"><b>${completed.length}</b><span>Relationships stitched</span></div><div class="stat"><b>${categories.length}</b><span>Systems visited</span></div>`;
  $('#discovery-summary').innerHTML = insights.length ? insights.map(insight => `<div class="summary-discovery"><strong>${insight.title}</strong><p>${insight.statement}</p><small>${insight.limitations}</small></div>`).join('') : completed.length ? completed.filter(relationship => relationship.comparison_result).map(relationship => `<div class="summary-discovery"><strong>${relationship.factual_statement}</strong><p>${relationship.comparison_result}</p></div>`).join('') || '<p>No computed comparison has been stitched yet.</p>' : '<p>Complete a supported relationship to reveal a finding.</p>';
  $('#relationship-summary').innerHTML = completed.length ? completed.map(relationship => `<button class="summary-relationship" data-discovery="${relationship.id}"><span>${relationship.evidence_status}</span><strong>${relationship.relationship_type}</strong><small>${recordById(relationship.source_record_id).title} ↔ ${recordById(relationship.target_record_id).title}</small></button>`).join('') : '<p>No relationships stitched yet.</p>';
  $('#data-represented').innerHTML = exploredRecords.length ? exploredRecords.map(record => { const category = CATEGORIES[record.category]; return `<div class="legend-row"><i style="background:${category.color}">${category.glyph}</i><span>${record.title}</span><small>${record.display_value}</small></div>`; }).join('') : '<p>No records explored yet.</p>';
  const sourceIds = unique(exploredRecords.map(record => record.source_id));
  $('#source-summary').innerHTML = sourceIds.length ? sourceIds.map(id => `<a class="summary-source" href="${SOURCES[id].url}" target="_blank" rel="noreferrer">${SOURCES[id].label}</a>`).join('') : '<p>Sources will appear with explored records.</p>';
}

function resizeFinalCanvas() {
  const canvas = $('#final-canvas');
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr); canvas.height = Math.round(rect.height * dpr);
  const metrics = makeMetrics(rect.width, rect.height, dpr);
  const ctx = canvas.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawMap(ctx, metrics, true);
}

function exportPNG() {
  const canvas = document.createElement('canvas'); canvas.width = 1800; canvas.height = 1260;
  const ctx = canvas.getContext('2d'); ctx.fillStyle = '#f4f0e7'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#252421'; ctx.font = '600 34px Arial'; ctx.fillText('Egg, Otherwise', 70, 72);
  ctx.font = '20px Arial'; ctx.fillStyle = '#716e67'; ctx.fillText(`${state.explored.length} records explored · ${state.completedRelationships.length} relationships stitched`, 70, 108);
  const metrics = makeMetrics(1120, 1030, 1); metrics.ox += 35; metrics.oy += 145;
  drawMap(ctx, metrics, true);
  ctx.fillStyle = '#252421'; ctx.font = '600 20px Arial'; ctx.fillText('Discoveries', 1260, 180);
  const discoveries = completedInsights();
  const lines = discoveries.length ? discoveries.map(insight => insight.title) : state.completedRelationships.map(id => relationshipById(id).factual_statement);
  if (!lines.length) { ctx.fillStyle = '#716e67'; ctx.font = '16px Arial'; ctx.fillText('No relationships stitched yet.', 1260, 222); }
  lines.forEach((line, index) => { ctx.fillStyle = '#252421'; ctx.font = '16px Arial'; wrapText(ctx, line, 1260, 225 + index * 110, 430, 22, 4); });
  ctx.fillStyle = '#716e67'; ctx.font = '13px Arial'; wrapText(ctx, 'Paths represent completed source-backed relationships. Anchor positions organize the interface and are not measured coordinates.', 1260, 1090, 430, 20, 5);
  const link = document.createElement('a'); link.download = 'egg-otherwise-data-map.png'; link.href = canvas.toDataURL('image/png'); link.click();
  showToast('Your relationship embroidery was saved as a PNG.');
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const words = text.split(' '); let line = '', lines = 0;
  for (const word of words) {
    const test = `${line}${word} `;
    if (ctx.measureText(test).width > maxWidth && line) { ctx.fillText(line.trim(), x, y + lines * lineHeight); line = `${word} `; lines++; if (lines >= maxLines) return; }
    else line = test;
  }
  if (lines < maxLines) ctx.fillText(line.trim(), x, y + lines * lineHeight);
}

function switchView(view) {
  currentView = view;
  closeOverlays();
  $$('.view').forEach(element => element.classList.toggle('is-active', element.id === `view-${view}`));
  $$('.nav-link[data-view]').forEach(element => element.classList.toggle('is-active', element.dataset.view === view));
  if (view === 'stitch') requestAnimationFrame(resizeCanvas);
  if (view === 'egg') requestAnimationFrame(renderReflection);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openThreads() { renderThreadsDrawer(); openOverlay($('#threads-drawer')); }
function openOverlay(drawer) { closeOverlays(false); $('#drawer-backdrop').hidden = false; requestAnimationFrame(() => drawer.classList.add('is-open')); drawer.setAttribute('aria-hidden', 'false'); }
function closeOverlays(hideBackdrop = true) { $$('.record-drawer, .threads-drawer').forEach(drawer => { drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); }); if (hideBackdrop) setTimeout(() => { $('#drawer-backdrop').hidden = true; }, 250); }
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('is-visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600); }

function resetAll() {
  if (!confirm('Reset explored records, collected threads, and every completed relationship? This cannot be undone.')) return;
  state = { ...DEFAULT_STATE, revealedCategories: [], explored: [], collected: [], completedRelationships: [] };
  unavailablePair = null;
  saveState(); renderAll(); switchView('explore'); showToast('The journey has been reset.');
}

function bindEvents() {
  document.addEventListener('click', event => {
    const viewButton = event.target.closest('[data-view]');
    if (viewButton) { switchView(viewButton.dataset.view); return; }
    const categoryButton = event.target.closest('[data-category]');
    if (categoryButton) { state.atlasOpened = true; state.selectedCategory = categoryButton.dataset.category; saveState(); renderAll(); return; }
    const recordButton = event.target.closest('[data-record]');
    if (recordButton) { openRecord(recordButton.dataset.record); return; }
    const threadButton = event.target.closest('[data-thread]');
    if (threadButton) { chooseThread(threadButton.dataset.thread); return; }
    const connectionButton = event.target.closest('[data-connect-to]');
    if (connectionButton) { selectConnection(connectionButton.dataset.connectTo); return; }
    const exploreButton = event.target.closest('[data-explore-record]');
    if (exploreButton) { const record = recordById(exploreButton.dataset.exploreRecord); state.atlasOpened = true; state.selectedCategory = record.category; if (!state.revealedCategories.includes(record.category)) state.revealedCategories.push(record.category); saveState(); switchView('explore'); renderAll(); setTimeout(() => openRecord(record.id), 220); return; }
    const discoveryButton = event.target.closest('[data-discovery]');
    if (discoveryButton) { state.activeDiscovery = discoveryButton.dataset.discovery; state.pendingRelationship = null; saveState(); switchView('stitch'); renderAll(); return; }
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton) return;
    const action = actionButton.dataset.action;
    if (action === 'open-atlas') { state.atlasOpened = true; saveState(); renderAll(); }
    if (action === 'reveal-records' && state.selectedCategory && !state.revealedCategories.includes(state.selectedCategory)) { state.revealedCategories.push(state.selectedCategory); saveState(); renderAll(); }
    if (action === 'threads') openThreads();
    if (action === 'close-drawer' || action === 'close-threads') closeOverlays();
    if (action === 'collect') collectRecord(actionButton.dataset.recordId);
    if (action === 'complete-relationship') completePendingRelationship();
    if (action === 'undo' && state.completedRelationships.length) { state.completedRelationships.pop(); state.activeDiscovery = state.completedRelationships.at(-1) || null; state.pendingRelationship = null; saveState(); renderAll(); showToast('Last relationship removed.'); }
    if (action === 'clear' && state.completedRelationships.length && confirm('Reset completed relationships? Your collected records will remain.')) { state.completedRelationships = []; state.activeDiscovery = null; state.pendingRelationship = null; saveState(); renderAll(); showToast('The relationship canvas is clear.'); }
    if (action === 'export') exportPNG();
    if (action === 'reset-all') resetAll();
  });
  $('#drawer-backdrop').addEventListener('click', () => closeOverlays());
  $('#guide-toggle').addEventListener('change', event => { state.showGuide = event.target.checked; saveState(); drawCanvas(); });
  $('#stitch-canvas').addEventListener('pointerdown', handleCanvasClick);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeOverlays();
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z' && state.completedRelationships.length) { event.preventDefault(); state.completedRelationships.pop(); state.activeDiscovery = null; saveState(); renderAll(); }
  });
}

init();
