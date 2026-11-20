const { records, relations, sources } = PRICE_OTHERWISE_DATA;
const recordById = Object.fromEntries(records.map((record) => [record.id, record]));
const sourceById = Object.fromEntries(sources.map((source) => [source.id, source]));

const state = { view: "relation", filter: "all", search: "", selected: null, panel: null };
const categoryLabels = { supply: "SUPPLY", wholesale: "NY WHOLESALE", retail: "U.S. RETAIL", mechanism: "MECHANISM" };
const shortTitles = {
  "hpai-wave": "HPAI depopulation",
  "layer-inventory": "Layer inventory",
  "supply-pressure": "Supply pressure",
  "replacement-time": "Replacement time",
  "wholesale-feb": "February wholesale",
  "wholesale-mar": "March wholesale",
  "wholesale-apr": "April wholesale",
  "retail-feb": "February retail",
  "retail-mar": "March retail",
  "retail-apr": "April retail",
  "retail-pricing": "Retail price transmission",
};

// X positions encode market role from supply to retail; Y positions separate related records.
const relationLayout = {
  "hpai-wave": { x: 130, y: 185, align: "right" },
  "layer-inventory": { x: 270, y: 270, align: "right" },
  "replacement-time": { x: 390, y: 170, align: "left" },
  "supply-pressure": { x: 505, y: 280, align: "right" },
  "retail-pricing": { x: 535, y: 160, align: "right" },
  "wholesale-feb": { x: 690, y: 175, align: "right" },
  "wholesale-mar": { x: 800, y: 255, align: "right" },
  "wholesale-apr": { x: 900, y: 335, align: "right" },
  "retail-feb": { x: 1000, y: 185, align: "right" },
  "retail-mar": { x: 1100, y: 260, align: "right" },
  "retail-apr": { x: 1200, y: 340, align: "left" },
};

// The lower layer uses documented dates/months, with lanes preventing label collisions.
const timelineLayout = {
  "hpai-wave": { x: 110, y: 475, align: "right" },
  "wholesale-feb": { x: 340, y: 455, align: "right" },
  "retail-feb": { x: 420, y: 515, align: "right" },
  "layer-inventory": { x: 500, y: 475, align: "right" },
  "supply-pressure": { x: 585, y: 540, align: "right" },
  "wholesale-mar": { x: 690, y: 455, align: "right" },
  "retail-mar": { x: 770, y: 515, align: "right" },
  "replacement-time": { x: 850, y: 475, align: "right" },
  "retail-pricing": { x: 930, y: 540, align: "right" },
  "wholesale-apr": { x: 1070, y: 455, align: "right" },
  "retail-apr": { x: 1160, y: 515, align: "right" },
};

const priceY = (value) => 380 - (value - 3) * 42;
const chronologyLayout = {
  "wholesale-feb": { x: 390, y: priceY(8.2), align: "right" },
  "wholesale-mar": { x: 720, y: priceY(5.34), align: "right" },
  "wholesale-apr": { x: 1050, y: priceY(3.74), align: "right" },
  "retail-feb": { x: 390, y: priceY(5.897), align: "left" },
  "retail-mar": { x: 720, y: priceY(6.227), align: "left" },
  "retail-apr": { x: 1050, y: priceY(5.122), align: "left" },
};

const fieldViewport = document.getElementById("fieldViewport");
const fieldScene = document.getElementById("fieldScene");
const connectionLayer = document.getElementById("connectionLayer");
const upperLayer = document.getElementById("upperLayer");
const timelineLayer = document.getElementById("timelineLayer");
const workspace = document.getElementById("workspace");
const inspector = document.getElementById("inspector");
const scrim = document.getElementById("scrim");

function relatedTo(id) {
  return relations.filter((relation) => relation.from === id || relation.to === id).map((relation) => ({
    ...relation,
    record: recordById[relation.from === id ? relation.to : relation.from],
  }));
}

function visibleRecords() {
  const query = state.search.trim().toLowerCase();
  return records.filter((record) => {
    const categoryMatch = state.filter === "all" || record.category === state.filter;
    const text = `${record.title} ${record.dateLabel} ${record.value} ${record.type} ${record.geography} ${record.keywords}`.toLowerCase();
    return categoryMatch && (!query || text.includes(query));
  });
}

function pointMarkup(record, position, layer) {
  const value = record.numericValue ? record.value : record.dateLabel;
  const classes = ["atlas-point", `${layer}-point`, `category-${record.category}`, `label-${position.align || "right"}`];
  if (record.numericValue) classes.push("is-price");
  return `<button class="${classes.join(" ")}" type="button" data-id="${record.id}" data-layer="${layer}" style="--x:${position.x}px;--y:${position.y}px" aria-label="${record.title}, ${record.value}">
    <span class="point-halo" aria-hidden="true"></span><span class="point-core" aria-hidden="true"></span>
    <span class="point-label"><strong>${shortTitles[record.id]}</strong><small>${value}</small></span>
  </button>`;
}

function renderField() {
  const upperRecords = state.view === "relation" ? records : records.filter((record) => record.numericValue);
  const upperPositions = state.view === "relation" ? relationLayout : chronologyLayout;
  upperLayer.innerHTML = upperRecords.map((record) => pointMarkup(record, upperPositions[record.id], "upper")).join("");
  timelineLayer.innerHTML = records.map((record) => pointMarkup(record, timelineLayout[record.id], "timeline")).join("");
  document.querySelectorAll(".atlas-point").forEach((point) => point.addEventListener("click", () => selectRecord(point.dataset.id, true)));
  updateFieldState();
}

function svgElement(tag, attributes, text = "") {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  if (text) element.textContent = text;
  connectionLayer.appendChild(element);
  return element;
}

function curvePath(from, to, bend = 0.5) {
  const controlY = from.y + (to.y - from.y) * bend;
  return `M${from.x},${from.y} C${from.x},${controlY} ${to.x},${controlY} ${to.x},${to.y}`;
}

function drawTimelineStructure(visibleIds) {
  svgElement("line", { x1: 60, y1: 415, x2: 1220, y2: 415, class: "timeline-baseline" });
  [[110, "PRECONDITION"], [420, "FEBRUARY 2025"], [770, "MARCH 2025"], [1160, "APRIL 2025"]].forEach(([x, label]) => {
    svgElement("line", { x1: x, y1: 404, x2: x, y2: 426, class: "timeline-month-tick" });
    svgElement("text", { x, y: 395, class: "timeline-month-label" }, label);
  });

  records.forEach((record) => {
    const point = timelineLayout[record.id];
    const classes = ["timeline-stem", `category-${record.category}`];
    if (state.selected === record.id) classes.push("is-selected");
    if (!visibleIds.has(record.id)) classes.push("is-filtered");
    svgElement("line", { x1: point.x, y1: 415, x2: point.x, y2: point.y, class: classes.join(" ") });
  });
}

function drawRelationView(visibleIds) {
  [[205, "SUPPLY"], [520, "MECHANISMS"], [825, "WHOLESALE"], [1100, "RETAIL"]].forEach(([x, label]) => {
    svgElement("text", { x, y: 130, class: "group-label" }, label);
    svgElement("line", { x1: x - 90, y1: 142, x2: x + 90, y2: 142, class: "group-rule" });
  });

  records.forEach((record) => {
    const from = relationLayout[record.id];
    const to = timelineLayout[record.id];
    const classes = ["projection-line", `category-${record.category}`];
    if (state.selected === record.id) classes.push("is-selected");
    if (!visibleIds.has(record.id)) classes.push("is-filtered");
    svgElement("path", { d: curvePath(from, { x: to.x, y: 415 }, 0.63), class: classes.join(" ") });
  });

  relations.forEach((relation) => {
    const from = relationLayout[relation.from];
    const to = relationLayout[relation.to];
    const selected = state.selected === relation.from || state.selected === relation.to;
    const classes = ["relation-line"];
    if (selected) classes.push("is-selected");
    if (!visibleIds.has(relation.from) || !visibleIds.has(relation.to)) classes.push("is-filtered");
    const middleX = (from.x + to.x) / 2;
    const path = `M${from.x},${from.y} C${middleX},${from.y} ${middleX},${to.y} ${to.x},${to.y}`;
    svgElement("path", { d: path, class: classes.join(" ") });
    if (selected) svgElement("text", { x: middleX, y: (from.y + to.y) / 2 - 8, class: "relation-label" }, relation.verb.toUpperCase());
  });
}

function drawChronologyView(visibleIds) {
  [4, 6, 8].forEach((value) => {
    const y = priceY(value);
    svgElement("line", { x1: 200, y1: y, x2: 1120, y2: y, class: "price-guide" });
    svgElement("text", { x: 175, y: y + 4, class: "price-guide-label" }, `$${value}`);
  });
  [[390, "FEBRUARY"], [720, "MARCH"], [1050, "APRIL"]].forEach(([x, month]) => {
    svgElement("line", { x1: x, y1: 145, x2: x, y2: 380, class: "month-guide" });
    svgElement("text", { x, y: 128, class: "month-label" }, `${month} 2025`);
  });

  ["wholesale", "retail"].forEach((category) => {
    const categoryRecords = records.filter((record) => record.category === category);
    const points = categoryRecords.map((record) => `${chronologyLayout[record.id].x},${chronologyLayout[record.id].y}`).join(" ");
    svgElement("polyline", { points, class: `price-series category-${category}` });
  });
  svgElement("text", { x: 1125, y: 160, class: "series-name category-wholesale" }, "NY WHOLESALE");
  svgElement("text", { x: 1125, y: 182, class: "series-name category-retail" }, "U.S. RETAIL");

  records.filter((record) => record.numericValue).forEach((record) => {
    const from = chronologyLayout[record.id];
    const to = timelineLayout[record.id];
    const classes = ["projection-line", `category-${record.category}`];
    if (state.selected === record.id) classes.push("is-selected");
    if (!visibleIds.has(record.id)) classes.push("is-filtered");
    svgElement("path", { d: curvePath(from, { x: to.x, y: 415 }, 0.58), class: classes.join(" ") });
  });
}

function drawField() {
  const visibleIds = new Set(visibleRecords().map((record) => record.id));
  connectionLayer.setAttribute("viewBox", `0 0 ${fieldScene.scrollWidth} ${fieldScene.scrollHeight}`);
  connectionLayer.innerHTML = "";
  drawTimelineStructure(visibleIds);
  if (state.view === "relation") drawRelationView(visibleIds);
  else drawChronologyView(visibleIds);
}

function updateFieldState() {
  const visibleIds = new Set(visibleRecords().map((record) => record.id));
  const neighbors = new Set(state.selected ? [state.selected, ...relatedTo(state.selected).map((item) => item.record.id)] : []);
  workspace.classList.toggle("has-selection", Boolean(state.selected));
  document.querySelectorAll(".atlas-point").forEach((point) => {
    point.classList.toggle("is-selected", point.dataset.id === state.selected);
    point.classList.toggle("is-related", neighbors.has(point.dataset.id));
    point.classList.toggle("is-filtered", !visibleIds.has(point.dataset.id));
  });
  requestAnimationFrame(drawField);
}

function selectRecord(id, center = false) {
  state.selected = id;
  workspace.classList.add("has-detail");
  inspector.classList.remove("is-collapsed");
  inspector.setAttribute("aria-hidden", "false");
  renderInspector();
  updateFieldState();
  if (center) centerRecord(id, true);
}

function centerRecord(id, smooth = true) {
  const preferredLayer = state.view === "time" && !recordById[id].numericValue ? "timeline" : "upper";
  const point = document.querySelector(`[data-layer="${preferredLayer}"][data-id="${id}"]`) || document.querySelector(`[data-id="${id}"]`);
  if (!point) return;
  const left = Math.max(0, point.offsetLeft - fieldViewport.clientWidth * 0.45);
  fieldViewport.scrollTo({ left, top: 0, behavior: smooth ? "smooth" : "auto" });
}

function renderInspector() {
  if (!state.selected) {
    document.getElementById("detailCount").textContent = "SELECT A POINT";
    document.getElementById("detailContent").innerHTML = "";
    workspace.classList.remove("has-detail", "has-selection");
    inspector.classList.add("is-collapsed");
    inspector.setAttribute("aria-hidden", "true");
    return;
  }
  const record = recordById[state.selected];
  const related = relatedTo(record.id);
  const index = records.indexOf(record) + 1;
  document.getElementById("detailCount").textContent = `EVIDENCE ${String(index).padStart(2, "0")} / ${records.length}`;
  document.getElementById("detailContent").innerHTML = `<div class="inspector-kicker ${record.category}"><span>${categoryLabels[record.category]}</span><span>${record.type}</span></div>
    <div class="inspector-hero"><small>${record.dateLabel}</small><h2>${record.title}</h2><strong>${record.value}</strong><p>${record.unit}</p></div>
    <section><span>DEFINITION</span><p>${record.definition}</p></section>
    <section><span>READING</span><p>${record.summary}</p></section>
    <section class="limitation"><span>DOES NOT ESTABLISH</span><p>${record.limitation}</p></section>
    <section><span>RELATIONS</span><div class="relation-links">${related.map((item) => `<button type="button" data-related="${item.record.id}"><b>${item.verb}</b><span>${item.record.title}</span></button>`).join("") || "<p>No direct relation encoded.</p>"}</div></section>
    <section><span>SOURCES</span><div class="source-links">${record.sourceIds.map((id) => { const source = sourceById[id]; return `<a href="${source.url}" target="_blank" rel="noopener noreferrer"><b>${source.agency}</b><span>${source.title}</span></a>`; }).join("")}</div></section>`;
  document.querySelectorAll("[data-related]").forEach((button) => button.addEventListener("click", () => selectRecord(button.dataset.related, true)));
}

function renderIndex() {
  document.getElementById("recordList").innerHTML = visibleRecords().map((record) => `<button class="index-row category-${record.category}" type="button" data-index-id="${record.id}">
    <i></i><span>${record.dateLabel}</span><h3>${record.title}</h3><strong>${record.value}</strong>
  </button>`).join("") || `<p class="empty-state">No evidence matches this search.</p>`;
  document.querySelectorAll("[data-index-id]").forEach((button) => button.addEventListener("click", () => { closePanels(); selectRecord(button.dataset.indexId, true); }));
}

function renderSources() {
  document.getElementById("sourceList").innerHTML = sources.map((source, index) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer"><span>${String(index + 1).padStart(2, "0")} / ${source.date}</span><h3>${source.title}</h3><b>${source.agency}</b><p>${source.coverage}</p></a>`).join("");
}

function openPanel(id) {
  state.panel = id;
  document.querySelectorAll(".overlay-panel").forEach((panel) => {
    const open = panel.id === id;
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", String(!open));
  });
  scrim.hidden = false;
}

function closePanels() {
  state.panel = null;
  document.querySelectorAll(".overlay-panel").forEach((panel) => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
  });
  scrim.hidden = true;
}

function switchView(view) {
  state.view = view;
  document.querySelectorAll(".view-button").forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
  document.getElementById("modeLabel").textContent = view === "relation" ? "RELATION ATLAS" : "CHRONOLOGY ATLAS";
  document.getElementById("fieldTitle").textContent = view === "relation" ? "An everyday price is a field of relations." : "Two price series move at different rhythms.";
  renderField();
  requestAnimationFrame(() => {
    if (state.selected) centerRecord(state.selected, true);
    else fieldViewport.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  });
}

function reset() {
  state.filter = "all";
  state.search = "";
  state.selected = null;
  document.getElementById("recordSearch").value = "";
  document.querySelectorAll(".filter-button").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === "all"));
  closePanels();
  switchView("relation");
  renderInspector();
}

document.querySelectorAll(".view-button").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => {
  state.filter = button.dataset.filter;
  document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("is-active", item === button));
  updateFieldState();
  renderIndex();
}));
document.getElementById("recordSearch").addEventListener("input", (event) => {
  state.search = event.target.value;
  updateFieldState();
  renderIndex();
});
document.getElementById("indexButton").addEventListener("click", () => { renderIndex(); openPanel("indexPanel"); });
document.getElementById("sourcesButton").addEventListener("click", () => openPanel("sourcesPanel"));
document.getElementById("aboutButton").addEventListener("click", () => openPanel("aboutPanel"));
document.getElementById("resetView").addEventListener("click", reset);
document.getElementById("closeInspector").addEventListener("click", () => {
  workspace.classList.remove("has-detail");
  inspector.classList.add("is-collapsed");
  inspector.setAttribute("aria-hidden", "true");
});
document.querySelectorAll("[data-close-panel]").forEach((button) => button.addEventListener("click", closePanels));
scrim.addEventListener("click", closePanels);
window.addEventListener("keydown", (event) => { if (event.key === "Escape") closePanels(); });
window.addEventListener("resize", () => requestAnimationFrame(drawField));

let drag = null;
fieldViewport.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".atlas-point")) return;
  drag = { x: event.clientX, left: fieldViewport.scrollLeft };
  fieldViewport.setPointerCapture(event.pointerId);
});
fieldViewport.addEventListener("pointermove", (event) => {
  if (!drag) return;
  fieldViewport.scrollLeft = drag.left - (event.clientX - drag.x);
});
fieldViewport.addEventListener("pointerup", () => { drag = null; });
fieldViewport.addEventListener("pointercancel", () => { drag = null; });

document.getElementById("recordTotal").textContent = records.length;
document.getElementById("sourceTotal").textContent = sources.length;
renderField();
renderInspector();
renderIndex();
renderSources();
