const { experiment, categories, schema, stitches } = STITCH_OTHERWISE_DATA;
const state = { view: "relation", selected: null, panel: null };

const schemaNodes = [
  { id: "thread", category: "material", label: "Thread sample", sub: "thread_id · length", x: 135, y: 185 },
  { id: "fabric", category: "material", label: "Fabric cell", sub: "fabric_id · row,column", x: 175, y: 255 },
  { id: "tool", category: "material", label: "Tool", sub: "needle_id", x: 135, y: 325 },
  { id: "start", category: "time", label: "Timer start", sub: "started_at", x: 940, y: 175 },
  { id: "complete", category: "time", label: "Completion", sub: "completed_at · actual order", x: 995, y: 250 },
  { id: "duration", category: "time", label: "Active duration", sub: "active_duration_ms", x: 940, y: 330 },
  { id: "pause", category: "correction", label: "Interruption", sub: "count · duration", x: 1085, y: 205 },
  { id: "rework", category: "correction", label: "Undo / rework", sub: "count · duration", x: 1110, y: 310 },
];

function relationPosition(stitch) {
  const index = stitch.planned_slot - 1;
  return { x: 360 + (index % 6) * 88, y: 165 + Math.floor(index / 6) * 52 };
}

function chronologyPosition(stitch) {
  return { x: 102 + (stitch.planned_slot - 1) * 46, y: 350 };
}

function timelinePosition(stitch) {
  return { x: 102 + (stitch.planned_slot - 1) * 46, y: 505 };
}

const fieldViewport = document.getElementById("fieldViewport");
const fieldScene = document.getElementById("fieldScene");
const connectionLayer = document.getElementById("connectionLayer");
const schemaLayer = document.getElementById("schemaLayer");
const actionLayer = document.getElementById("actionLayer");
const timelineLayer = document.getElementById("timelineLayer");
const workspace = document.getElementById("workspace");
const inspector = document.getElementById("inspector");
const scrim = document.getElementById("scrim");

function stitchMarkup(stitch, position, layer) {
  const label = layer === "timeline" ? `P${String(stitch.planned_slot).padStart(2, "0")}` : stitch.stitch_id;
  return `<button class="stitch-point ${layer}-point" type="button" data-id="${stitch.stitch_id}" data-layer="${layer}" style="--x:${position.x}px;--y:${position.y}px" aria-label="${stitch.stitch_id}, awaiting observation">
    <span class="stitch-halo" aria-hidden="true"></span><span class="stitch-mark" aria-hidden="true"></span><span class="stitch-label">${label}</span>
  </button>`;
}

function schemaMarkup(node) {
  return `<div class="schema-node category-${node.category}" style="--x:${node.x}px;--y:${node.y}px"><i></i><span><strong>${node.label}</strong><small>${node.sub}</small></span></div>`;
}

function renderField() {
  workspace.dataset.view = state.view;
  const positionForView = state.view === "relation" ? relationPosition : chronologyPosition;
  actionLayer.innerHTML = stitches.map((stitch) => stitchMarkup(stitch, positionForView(stitch), "action")).join("");
  timelineLayer.innerHTML = stitches.map((stitch) => stitchMarkup(stitch, timelinePosition(stitch), "timeline")).join("");
  schemaLayer.innerHTML = state.view === "relation" ? schemaNodes.map(schemaMarkup).join("") : "";
  document.querySelectorAll(".stitch-point").forEach((point) => point.addEventListener("click", () => selectStitch(point.dataset.id, true)));
  updateFieldState();
}

function svgElement(tag, attributes, text = "") {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  if (text) element.textContent = text;
  connectionLayer.appendChild(element);
  return element;
}

function curvedPath(from, to, bend = 0.55) {
  const controlY = from.y + (to.y - from.y) * bend;
  return `M${from.x},${from.y} C${from.x},${controlY} ${to.x},${controlY} ${to.x},${to.y}`;
}

function drawBaseTimeline() {
  svgElement("line", { x1: 70, y1: 430, x2: 1195, y2: 430, class: "timeline-baseline" });
  [[102, "PLANNED 01"], [332, "06"], [608, "12"], [884, "18"], [1160, "24"]].forEach(([x, label]) => {
    svgElement("line", { x1: x, y1: 420, x2: x, y2: 441, class: "timeline-tick" });
    svgElement("text", { x, y: 412, class: "timeline-label" }, label);
  });
  svgElement("text", { x: 70, y: 402, class: "timeline-caption" }, "PLANNED CAPTURE ORDER · ACTUAL SEQUENCE NOT YET OBSERVED");
  stitches.forEach((stitch) => {
    const point = timelinePosition(stitch);
    const selected = stitch.stitch_id === state.selected;
    svgElement("line", { x1: point.x, y1: 430, x2: point.x, y2: point.y, class: `timeline-stem${selected ? " is-selected" : ""}` });
  });
}

function drawRelationView() {
  [[150, "MATERIAL"], [580, "ACTION / 24 X UNITS"], [970, "TIME"], [1115, "CORRECTION"]].forEach(([x, label]) => {
    svgElement("text", { x, y: 125, class: "group-label" }, label);
    svgElement("line", { x1: x - 78, y1: 138, x2: x + 78, y2: 138, class: "group-rule" });
  });

  stitches.forEach((stitch) => {
    const from = relationPosition(stitch);
    const to = timelinePosition(stitch);
    const selected = stitch.stitch_id === state.selected;
    svgElement("path", { d: curvedPath(from, { x: to.x, y: 430 }, 0.64), class: `identity-thread${selected ? " is-selected" : ""}` });
  });

  if (!state.selected) return;
  const stitch = stitches.find((item) => item.stitch_id === state.selected);
  const from = relationPosition(stitch);
  const labelled = new Set();
  schemaNodes.forEach((node) => {
    const middleX = (from.x + node.x) / 2;
    const path = `M${from.x},${from.y} C${middleX},${from.y} ${middleX},${node.y} ${node.x},${node.y}`;
    svgElement("path", { d: path, class: `schema-link category-${node.category}` });
    if (!labelled.has(node.category)) {
      const category = categories.find((item) => item.id === node.category);
      svgElement("text", { x: middleX, y: (from.y + node.y) / 2 - 7, class: "relation-label" }, `${category.label} FIELDS`);
      labelled.add(node.category);
    }
  });
}

function drawChronologyView() {
  const lanes = [
    { y: 175, label: "ACTUAL COMPLETION TIME", note: "AWAITING OBSERVATION" },
    { y: 245, label: "ACTIVE MAKING DURATION", note: "AWAITING OBSERVATION" },
    { y: 295, label: "INTERRUPTION + CORRECTION", note: "MISSING IS NOT ZERO" },
  ];
  lanes.forEach((lane) => {
    svgElement("line", { x1: 180, y1: lane.y, x2: 1160, y2: lane.y, class: "empty-lane" });
    svgElement("text", { x: 70, y: lane.y + 4, class: "lane-label" }, lane.label);
    svgElement("text", { x: 1175, y: lane.y + 4, class: "lane-note" }, lane.note);
  });
  svgElement("text", { x: 70, y: 370, class: "staging-label" }, "UNOBSERVED RECORDS HELD BY PLANNED SLOT");

  stitches.forEach((stitch) => {
    const from = chronologyPosition(stitch);
    const to = timelinePosition(stitch);
    const selected = stitch.stitch_id === state.selected;
    svgElement("path", { d: curvedPath(from, { x: to.x, y: 430 }, 0.5), class: `identity-thread${selected ? " is-selected" : ""}` });
  });
}

function drawField() {
  connectionLayer.setAttribute("viewBox", `0 0 ${fieldScene.scrollWidth} ${fieldScene.scrollHeight}`);
  connectionLayer.innerHTML = "";
  drawBaseTimeline();
  if (state.view === "relation") drawRelationView();
  else drawChronologyView();
}

function updateFieldState() {
  workspace.classList.toggle("has-selection", Boolean(state.selected));
  document.querySelectorAll(".stitch-point").forEach((point) => point.classList.toggle("is-selected", point.dataset.id === state.selected));
  requestAnimationFrame(drawField);
}

function selectStitch(id, center = false) {
  state.selected = id;
  workspace.classList.add("has-detail", "has-selection");
  inspector.classList.remove("is-collapsed");
  inspector.setAttribute("aria-hidden", "false");
  renderInspector();
  updateFieldState();
  if (center) centerStitch(id, true);
}

function centerStitch(id, smooth = true) {
  const preferred = document.querySelector(`[data-layer="action"][data-id="${id}"]`) || document.querySelector(`[data-id="${id}"]`);
  if (!preferred) return;
  const left = Math.max(0, preferred.offsetLeft - fieldViewport.clientWidth * 0.44);
  fieldViewport.scrollTo({ left, top: 0, behavior: smooth ? "smooth" : "auto" });
}

function missingValue(value, suffix = "") {
  return value === null || value === undefined ? '<em class="missing">Not recorded</em>' : `${value}${suffix}`;
}

function renderInspector() {
  if (!state.selected) {
    document.getElementById("detailCount").textContent = "SELECT AN X";
    document.getElementById("detailContent").innerHTML = "";
    workspace.classList.remove("has-detail", "has-selection");
    inspector.classList.add("is-collapsed");
    inspector.setAttribute("aria-hidden", "true");
    return;
  }
  const stitch = stitches.find((item) => item.stitch_id === state.selected);
  document.getElementById("detailCount").textContent = `STITCH ${stitch.stitch_id} / ${stitches.length}`;
  document.getElementById("detailContent").innerHTML = `<div class="inspector-kicker"><span>AWAITING OBSERVATION</span><span>planned slot ${String(stitch.planned_slot).padStart(2, "0")}</span></div>
    <div class="inspector-hero"><div class="hero-x" aria-hidden="true"></div><small>Basic observation unit</small><h2>${experiment.unit}</h2><strong>${stitch.stitch_id}</strong><p>No production result has been entered.</p></div>
    <section><span>ACTION</span><dl><div><dt>Actual sequence</dt><dd>${missingValue(stitch.actual_sequence)}</dd></div><div><dt>Completion status</dt><dd>${stitch.status.replace("-", " ")}</dd></div></dl></section>
    <section><span>TIME</span><dl><div><dt>Started</dt><dd>${missingValue(stitch.started_at)}</dd></div><div><dt>Completed</dt><dd>${missingValue(stitch.completed_at)}</dd></div><div><dt>Active duration</dt><dd>${missingValue(stitch.active_duration_ms)}</dd></div></dl></section>
    <section><span>MATERIAL</span><dl><div><dt>Thread</dt><dd>${missingValue(stitch.thread_id)}</dd></div><div><dt>Fabric / cell</dt><dd>${missingValue(stitch.fabric_cell)}</dd></div><div><dt>Tool</dt><dd>${missingValue(stitch.needle_id)}</dd></div></dl></section>
    <section><span>CORRECTION</span><dl><div><dt>Interruptions</dt><dd>${missingValue(stitch.pause_count)}</dd></div><div><dt>Corrections</dt><dd>${missingValue(stitch.correction_count)}</dd></div><div><dt>Rework duration</dt><dd>${missingValue(stitch.correction_duration_ms)}</dd></div></dl></section>
    <section class="integrity"><span>DATA INTEGRITY</span><p>${experiment.integrity_note}</p></section>`;
}

function renderIndex() {
  document.getElementById("recordList").innerHTML = stitches.map((stitch) => `<button class="index-unit" type="button" data-index-id="${stitch.stitch_id}"><i></i><strong>${stitch.stitch_id}</strong><span>planned ${String(stitch.planned_slot).padStart(2, "0")}</span><small>awaiting observation</small></button>`).join("");
  document.querySelectorAll("[data-index-id]").forEach((button) => button.addEventListener("click", () => { closePanels(); selectStitch(button.dataset.indexId, true); }));
}

function renderSchema() {
  document.getElementById("schemaList").innerHTML = schema.map((field) => `<div class="schema-row category-${field.category}"><i></i><span>${field.category.toUpperCase()}</span><strong>${field.label}</strong><code>${field.key}</code><small>${field.type}</small><b>${field.required ? "required" : "optional"}</b><p>${field.note}</p></div>`).join("");
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
  document.getElementById("modeLabel").textContent = view === "relation" ? "RELATION / DATA TEMPLATE" : "CHRONOLOGY / UNOBSERVED";
  document.getElementById("fieldTitle").textContent = view === "relation" ? experiment.proposition : "The sequence exists before its timing is known.";
  document.getElementById("fieldNote").textContent = view === "relation" ? "24 planned capture slots · 0 observed" : "Completion time, duration, and rework await measurement";
  renderField();
  requestAnimationFrame(() => {
    if (state.selected) centerStitch(state.selected, true);
    else fieldViewport.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  });
}

function reset() {
  state.selected = null;
  closePanels();
  switchView("relation");
  renderInspector();
}

document.querySelectorAll(".view-button").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
document.getElementById("indexButton").addEventListener("click", () => openPanel("indexPanel"));
document.getElementById("schemaButton").addEventListener("click", () => openPanel("schemaPanel"));
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
  if (event.target.closest(".stitch-point")) return;
  drag = { x: event.clientX, left: fieldViewport.scrollLeft };
  fieldViewport.setPointerCapture(event.pointerId);
});
fieldViewport.addEventListener("pointermove", (event) => {
  if (!drag) return;
  fieldViewport.scrollLeft = drag.left - (event.clientX - drag.x);
});
fieldViewport.addEventListener("pointerup", () => { drag = null; });
fieldViewport.addEventListener("pointercancel", () => { drag = null; });

document.getElementById("recordTotal").textContent = stitches.length;
document.getElementById("fieldTotal").textContent = schema.length;
renderField();
renderInspector();
renderIndex();
renderSchema();
