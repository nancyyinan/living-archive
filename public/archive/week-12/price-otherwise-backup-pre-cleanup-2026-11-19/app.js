const { records, relations, sources } = PRICE_OTHERWISE_DATA;
const recordById = Object.fromEntries(records.map((record) => [record.id, record]));
const sourceById = Object.fromEntries(sources.map((source) => [source.id, source]));
const state = { view: "relation", filter: "all", search: "", selected: "retail-mar", panel: null };
const relationPositions = {
  "hpai-wave": [130, 330], "layer-inventory": [380, 465], "replacement-time": [260, 720], "supply-pressure": [650, 590],
  "wholesale-feb": [760, 255], "wholesale-mar": [1020, 430], "wholesale-apr": [900, 705],
  "retail-feb": [1240, 245], "retail-mar": [1490, 425], "retail-apr": [1370, 700], "retail-pricing": [1700, 565],
};
const chronologyPositions = {
  "wholesale-feb": [330, 230], "wholesale-mar": [785, 230], "wholesale-apr": [1240, 230],
  "retail-feb": [330, 360], "retail-mar": [785, 360], "retail-apr": [1240, 360],
  "hpai-wave": [210, 570], "layer-inventory": [480, 570], "supply-pressure": [760, 570], "replacement-time": [1040, 570], "retail-pricing": [1340, 570],
};
const categoryLabels = { supply: "SUPPLY", wholesale: "WHOLESALE", retail: "RETAIL", mechanism: "MECHANISM" };
const fieldViewport = document.getElementById("fieldViewport");
const fieldScene = document.getElementById("fieldScene");
const cardLayer = document.getElementById("cardLayer");
const connectionLayer = document.getElementById("connectionLayer");
const inspector = document.getElementById("inspector");
const scrim = document.getElementById("scrim");

function relatedTo(id) {
  return relations.filter((relation) => relation.from === id || relation.to === id).map((relation) => ({
    ...relation, record: recordById[relation.from === id ? relation.to : relation.from],
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

function priceVisual(record) {
  const categoryRecords = records.filter((item) => item.category === record.category && item.numericValue);
  return `<div class="mini-bars">${categoryRecords.map((item) => `<i class="${item.id === record.id ? "active" : ""}" style="--bar:${Math.round(item.numericValue / 9 * 100)}%"></i>`).join("")}</div>`;
}

function evidenceVisual(record) {
  if (record.numericValue) return priceVisual(record);
  if (record.category === "supply") return `<div class="dot-matrix">${Array.from({ length: 30 }, (_, index) => `<i class="${index > 20 ? "lost" : ""}"></i>`).join("")}</div>`;
  const word = record.id === "replacement-time" ? "RECOVERY" : record.id === "retail-pricing" ? "DELAY" : "PRESSURE";
  return `<div class="word-field"><span>${word}</span><span>${word}</span><span>${word}</span></div>`;
}

function cardMarkup(record) {
  const number = String(records.indexOf(record) + 1).padStart(2, "0");
  return `<button class="evidence-card category-${record.category}" data-id="${record.id}" type="button" aria-label="${record.title}, ${record.value}">
    <span class="card-number">${number}</span><span class="card-category">${categoryLabels[record.category]}</span>
    <div class="card-visual">${evidenceVisual(record)}</div>
    <div class="card-copy"><small>${record.dateLabel}</small><h3>${record.title}</h3><strong>${record.value}</strong><p>${record.unit}</p></div>
    <div class="card-expanded"><span>${record.summary}</span><b>${record.sourceIds.length} SOURCE${record.sourceIds.length > 1 ? "S" : ""}</b></div>
  </button>`;
}

function renderAmbient() {
  const ambient = document.getElementById("ambientField");
  ambient.innerHTML = Array.from({ length: 24 }, (_, index) => {
    const left = 45 + ((index * 283) % 1780); const top = 90 + ((index * 149) % 720); const width = 38 + (index % 4) * 14;
    return `<i style="left:${left}px;top:${top}px;width:${width}px;height:${Math.round(width * (0.7 + (index % 3) * 0.18))}px"></i>`;
  }).join("");
}

function renderField() {
  const positions = state.view === "relation" ? relationPositions : chronologyPositions;
  cardLayer.innerHTML = records.map((record) => {
    const [x, y] = positions[record.id];
    return `<div class="card-position" data-position-id="${record.id}" style="--x:${x}px;--y:${y}px">${cardMarkup(record)}</div>`;
  }).join("");
  cardLayer.querySelectorAll(".evidence-card").forEach((card) => card.addEventListener("click", () => selectRecord(card.dataset.id, true)));
  updateFieldState();
  requestAnimationFrame(drawField);
}

function drawField() {
  connectionLayer.setAttribute("viewBox", `0 0 ${fieldScene.scrollWidth} ${fieldScene.scrollHeight}`);
  connectionLayer.innerHTML = "";
  if (state.view === "time") { drawChronology(); return; }
  relations.forEach((relation) => {
    const from = relationPositions[relation.from]; const to = relationPositions[relation.to];
    const selected = state.selected === relation.from || state.selected === relation.to;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const x1 = from[0] + 90; const y1 = from[1] + 60; const x2 = to[0] + 90; const y2 = to[1] + 60;
    path.setAttribute("d", `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`);
    path.setAttribute("class", `relation-line${selected ? " is-selected" : ""}`); connectionLayer.appendChild(path);
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", (x1 + x2) / 2); label.setAttribute("y", (y1 + y2) / 2 - 9); label.setAttribute("class", `relation-label${selected ? " is-selected" : ""}`); label.textContent = relation.verb.toUpperCase(); connectionLayer.appendChild(label);
  });
}

function drawChronology() {
  const svgNS = "http://www.w3.org/2000/svg";
  const months = [["FEBRUARY 2025", 420], ["MARCH 2025", 875], ["APRIL 2025", 1330]];
  months.forEach(([labelText, x]) => {
    const line = document.createElementNS(svgNS, "line"); line.setAttribute("x1", x); line.setAttribute("x2", x); line.setAttribute("y1", 155); line.setAttribute("y2", 700); line.setAttribute("class", "month-guide"); connectionLayer.appendChild(line);
    const label = document.createElementNS(svgNS, "text"); label.setAttribute("x", x); label.setAttribute("y", 135); label.setAttribute("class", "month-label"); label.textContent = labelText; connectionLayer.appendChild(label);
  });
  [["wholesale", "NEW YORK WHOLESALE", 290], ["retail", "U.S. URBAN RETAIL", 420]].forEach(([category, labelText, y]) => {
    const label = document.createElementNS(svgNS, "text"); label.setAttribute("x", 95); label.setAttribute("y", y); label.setAttribute("class", `row-label ${category}`); label.textContent = labelText; connectionLayer.appendChild(label);
    const priceRecords = records.filter((record) => record.category === category);
    const points = priceRecords.map((record) => `${chronologyPositions[record.id][0] + 90},${chronologyPositions[record.id][1] + 60}`).join(" ");
    const line = document.createElementNS(svgNS, "polyline"); line.setAttribute("points", points); line.setAttribute("class", `series-line ${category}`); connectionLayer.appendChild(line);
  });
  const context = document.createElementNS(svgNS, "text"); context.setAttribute("x", 95); context.setAttribute("y", 545); context.setAttribute("class", "context-label"); context.textContent = "CONTEXT / DELAYS / MECHANISMS"; connectionLayer.appendChild(context);
}

function updateFieldState() {
  const visibleIds = new Set(visibleRecords().map((record) => record.id));
  const neighbors = new Set([state.selected, ...relatedTo(state.selected).map((item) => item.record.id)]);
  document.querySelectorAll(".evidence-card").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.id === state.selected);
    card.classList.toggle("is-related", neighbors.has(card.dataset.id));
    card.classList.toggle("is-filtered", !visibleIds.has(card.dataset.id));
  });
  requestAnimationFrame(drawField);
}

function selectRecord(id, center = false) {
  state.selected = id; inspector.classList.remove("is-collapsed"); renderInspector(); updateFieldState();
  if (center) centerRecord(id, true);
}

function centerRecord(id, smooth = true) {
  const position = document.querySelector(`[data-position-id="${id}"]`);
  if (!position) return;
  const left = Math.max(0, position.offsetLeft - (fieldViewport.clientWidth - position.offsetWidth) / 2);
  fieldViewport.scrollTo({ left, top: 0, behavior: smooth ? "smooth" : "auto" });
}

function renderInspector() {
  const record = recordById[state.selected]; const related = relatedTo(record.id); const index = records.indexOf(record) + 1;
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
  document.getElementById("recordList").innerHTML = visibleRecords().map((record) => `<button class="index-card category-${record.category}" type="button" data-index-id="${record.id}"><span>${String(records.indexOf(record) + 1).padStart(2, "0")} / ${categoryLabels[record.category]}</span><h3>${record.title}</h3><strong>${record.value}</strong><small>${record.dateLabel}</small></button>`).join("") || `<p class="empty-state">No evidence matches this search.</p>`;
  document.querySelectorAll("[data-index-id]").forEach((button) => button.addEventListener("click", () => { closePanels(); selectRecord(button.dataset.indexId, true); }));
}

function renderSources() {
  document.getElementById("sourceList").innerHTML = sources.map((source, index) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer"><span>${String(index + 1).padStart(2, "0")} / ${source.date}</span><h3>${source.title}</h3><b>${source.agency}</b><p>${source.coverage}</p></a>`).join("");
}

function openPanel(id) {
  state.panel = id; document.querySelectorAll(".overlay-panel").forEach((panel) => { const open = panel.id === id; panel.classList.toggle("is-open", open); panel.setAttribute("aria-hidden", String(!open)); }); scrim.hidden = false;
}
function closePanels() { state.panel = null; document.querySelectorAll(".overlay-panel").forEach((panel) => { panel.classList.remove("is-open"); panel.setAttribute("aria-hidden", "true"); }); scrim.hidden = true; }
function switchView(view) {
  state.view = view; document.querySelectorAll(".view-button").forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
  document.getElementById("modeLabel").textContent = view === "relation" ? "RELATION FIELD" : "CHRONOLOGY FIELD";
  document.getElementById("fieldTitle").textContent = view === "relation" ? "One price is a field of evidence." : "Two price series, three months, no simple lag.";
  document.getElementById("modeDescription").textContent = view === "relation" ? "Move through supply, wholesale, retail, and the mechanisms between them." : "Wholesale and retail stay distinct while context remains available below.";
  renderField(); requestAnimationFrame(() => selectRecord(state.selected, true));
}
function reset() {
  state.filter = "all"; state.search = ""; state.selected = "wholesale-feb"; document.getElementById("recordSearch").value = "";
  document.querySelectorAll(".filter-button").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === "all")); closePanels(); switchView("relation"); renderInspector();
}

document.querySelectorAll(".view-button").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => { state.filter = button.dataset.filter; document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("is-active", item === button)); updateFieldState(); renderIndex(); }));
document.getElementById("recordSearch").addEventListener("input", (event) => { state.search = event.target.value; updateFieldState(); renderIndex(); });
document.getElementById("indexButton").addEventListener("click", () => { renderIndex(); openPanel("indexPanel"); });
document.getElementById("sourcesButton").addEventListener("click", () => openPanel("sourcesPanel")); document.getElementById("aboutButton").addEventListener("click", () => openPanel("aboutPanel"));
document.getElementById("resetView").addEventListener("click", reset); document.getElementById("closeInspector").addEventListener("click", () => inspector.classList.add("is-collapsed"));
document.querySelectorAll("[data-close-panel]").forEach((button) => button.addEventListener("click", closePanels)); scrim.addEventListener("click", closePanels); window.addEventListener("keydown", (event) => { if (event.key === "Escape") closePanels(); }); window.addEventListener("resize", () => requestAnimationFrame(drawField));

let drag = null;
fieldViewport.addEventListener("pointerdown", (event) => { if (event.target.closest(".evidence-card")) return; drag = { x: event.clientX, y: event.clientY, left: fieldViewport.scrollLeft, top: fieldViewport.scrollTop }; fieldViewport.setPointerCapture(event.pointerId); });
fieldViewport.addEventListener("pointermove", (event) => { if (!drag) return; fieldViewport.scrollLeft = drag.left - (event.clientX - drag.x); fieldViewport.scrollTop = drag.top - (event.clientY - drag.y); });
fieldViewport.addEventListener("pointerup", () => { drag = null; }); fieldViewport.addEventListener("pointercancel", () => { drag = null; });

document.getElementById("recordTotal").textContent = records.length; document.getElementById("sourceTotal").textContent = sources.length;
renderAmbient(); renderField(); renderInspector(); renderIndex(); renderSources();
requestAnimationFrame(() => centerRecord("wholesale-feb", false));
