const { records, relations, sources, relationLayout } = window.PRICE_OTHERWISE_DATA;
const svgNS = "http://www.w3.org/2000/svg";
const recordById = Object.fromEntries(records.map((record) => [record.id, record]));
const sourceById = Object.fromEntries(sources.map((source) => [source.id, source]));
const positions = {};
const state = { view: "relation", filter: "all", selected: null, search: "" };
const categoryLabels = { supply: "Supply record", wholesale: "Wholesale observation", retail: "Retail observation", mechanism: "Market mechanism" };
const laneLabels = {
  supply: ["SUPPLY + CAPACITY", "flock losses and productive inventory"],
  wholesale: ["WHOLESALE", "New York benchmark / large eggs"],
  retail: ["RETAIL", "U.S. city average / Grade A large"],
  mechanism: ["MECHANISMS + DELAYS", "documented market and biological context"],
};

const graphStage = document.getElementById("graphStage");
const axisLayer = document.getElementById("axisLayer");
const trajectoryLayer = document.getElementById("trajectoryLayer");
const edgeLayer = document.getElementById("edgeLayer");
const nodeLayer = document.getElementById("nodeLayer");
const hoverCard = document.getElementById("hoverCard");
const recordList = document.getElementById("recordList");
const scrim = document.getElementById("scrim");

function svg(tag, attrs = {}) {
  const element = document.createElementNS(svgNS, tag);
  Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`)).toUpperCase();
}

function degree(id) {
  return relations.filter((relation) => relation.from === id || relation.to === id).length;
}

function relatedTo(id) {
  return relations.filter((relation) => relation.from === id || relation.to === id).map((relation) => ({
    ...relation,
    record: recordById[relation.from === id ? relation.to : relation.from],
  }));
}

function buildTimeLayout() {
  const start = new Date("2025-01-20T12:00:00").getTime();
  const end = new Date("2025-04-30T12:00:00").getTime();
  const lanes = { supply: 285, wholesale: 420, retail: 555, mechanism: 690 };
  return Object.fromEntries(records.map((record) => {
    const ratio = (new Date(`${record.date}T12:00:00`).getTime() - start) / (end - start);
    const valueOffset = record.numericValue ? (6 - record.numericValue) * 18 : 0;
    return [record.id, [300 + ratio * 1140, lanes[record.category] + valueOffset + record.row * 30]];
  }));
}

const chronologicalLayout = buildTimeLayout();

function curve(from, to) {
  const bend = Math.min(120, Math.abs(to[0] - from[0]) * 0.13 + Math.abs(to[1] - from[1]) * 0.08);
  return `M ${from[0]} ${from[1]} Q ${(from[0] + to[0]) / 2} ${(from[1] + to[1]) / 2 - bend} ${to[0]} ${to[1]}`;
}

function renderGraph() {
  relations.forEach((relation, index) => {
    edgeLayer.appendChild(svg("path", { class: `edge ${relation.kind}`, "data-index": index, "data-from": relation.from, "data-to": relation.to }));
  });

  records.forEach((record, index) => {
    const group = svg("g", {
      class: `record-node category-${record.category}`,
      "data-id": record.id,
      role: "button",
      tabindex: "0",
      "aria-label": `${record.dateLabel}, ${record.title}, ${record.value}`,
    });
    const size = 9 + Math.min(degree(record.id), 4) * 1.2;
    group.appendChild(svg("circle", { class: "halo", r: size + 17, filter: "url(#softGlow)" }));
    group.appendChild(svg("circle", { class: "core", r: size }));
    const cell = svg("g", { class: "time-cell" });
    cell.appendChild(svg("rect", { x: -18, y: -14, width: 36, height: 28, rx: 2 }));
    const number = svg("text", { x: 0, y: 1 });
    number.textContent = String(index + 1).padStart(2, "0");
    cell.appendChild(number);
    group.appendChild(cell);
    group.addEventListener("pointerenter", (event) => showHover(record, event));
    group.addEventListener("pointermove", moveHover);
    group.addEventListener("pointerleave", hideHover);
    group.addEventListener("click", () => selectRecord(record.id, true));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectRecord(record.id, true);
      }
    });
    nodeLayer.appendChild(group);
  });
  updateView(false);
}

function renderAxis() {
  axisLayer.innerHTML = "";
  trajectoryLayer.innerHTML = "";
  if (state.view !== "time") return;
  const lanes = { supply: 285, wholesale: 420, retail: 555, mechanism: 690 };
  Object.entries(lanes).forEach(([category, y], index) => {
    axisLayer.appendChild(svg("rect", { class: `axis-band ${index % 2 ? "alt" : ""}`, x: 120, y: y - 52, width: 1360, height: 104 }));
    axisLayer.appendChild(svg("line", { class: "axis-line", x1: 120, x2: 1480, y1: y + 52, y2: y + 52 }));
    const title = svg("text", { class: "axis-category", x: 128, y: y - 14 });
    title.textContent = laneLabels[category][0];
    axisLayer.appendChild(title);
    const subtitle = svg("text", { class: "axis-subtitle", x: 128, y: y + 4 });
    subtitle.textContent = laneLabels[category][1];
    axisLayer.appendChild(subtitle);
  });
  ["2025-02-01", "2025-03-01", "2025-04-01"].forEach((date) => {
    const x = 300 + ((new Date(`${date}T12:00:00`).getTime() - new Date("2025-01-20T12:00:00").getTime()) / (new Date("2025-04-30T12:00:00").getTime() - new Date("2025-01-20T12:00:00").getTime())) * 1140;
    axisLayer.appendChild(svg("line", { class: "axis-tick", x1: x, x2: x, y1: 195, y2: 755 }));
    const label = svg("text", { class: "axis-month", x: x + 7, y: 202 });
    label.textContent = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`)).toUpperCase();
    axisLayer.appendChild(label);
  });
}

function renderTrajectories() {
  trajectoryLayer.innerHTML = "";
  if (state.view !== "time") return;
  ["wholesale", "retail"].forEach((category) => {
    const points = records
      .filter((record) => record.category === category && record.numericValue)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((record) => chronologicalLayout[record.id].join(","))
      .join(" ");
    trajectoryLayer.appendChild(svg("polyline", { class: `price-trajectory ${category}`, points }));
  });
}

function updateView(animate = true) {
  const layout = state.view === "time" ? chronologicalLayout : relationLayout;
  graphStage.classList.toggle("is-time", state.view === "time");
  document.getElementById("modeLabel").textContent = state.view === "time" ? "CHRONOLOGY VIEW" : "RELATION VIEW";
  document.getElementById("modeDescription").textContent = state.view === "time"
    ? "The same evidence is ordered by date and market stage."
    : "Records sit near the events, prices, and mechanisms they document or observe.";
  document.querySelectorAll(".view-button").forEach((button) => button.classList.toggle("is-active", button.dataset.view === state.view));
  renderAxis();
  records.forEach((record) => {
    const group = document.querySelector(`.record-node[data-id="${record.id}"]`);
    const [x, y] = layout[record.id];
    positions[record.id] = [x, y];
    if (!animate) group.style.transition = "none";
    group.style.transform = `translate(${x}px, ${y}px)`;
    if (!animate) requestAnimationFrame(() => { group.style.transition = ""; });
  });
  requestAnimationFrame(() => {
    updateEdges();
    renderTrajectories();
  });
  updateStateClasses();
}

function updateEdges() {
  document.querySelectorAll(".edge").forEach((path) => path.setAttribute("d", curve(positions[path.dataset.from], positions[path.dataset.to])));
}

function updateStateClasses() {
  const neighbors = state.selected ? new Set([state.selected, ...relatedTo(state.selected).map((item) => item.record.id)]) : null;
  records.forEach((record) => {
    const node = document.querySelector(`.record-node[data-id="${record.id}"]`);
    node.classList.toggle("is-selected", record.id === state.selected);
    node.classList.toggle("is-neighbor", Boolean(neighbors?.has(record.id)));
    node.classList.toggle("is-muted", Boolean(neighbors && !neighbors.has(record.id)));
  });
  document.querySelectorAll(".edge").forEach((edge) => {
    const touches = state.selected && (edge.dataset.from === state.selected || edge.dataset.to === state.selected);
    edge.classList.toggle("is-neighbor", Boolean(touches));
    edge.classList.toggle("is-muted", Boolean(state.selected && !touches));
  });
}

function showHover(record, event) {
  const index = records.indexOf(record) + 1;
  hoverCard.innerHTML = `<span>${String(index).padStart(2, "0")} · ${record.category.toUpperCase()} · ${record.type.toUpperCase()}</span><strong>${record.title}</strong><small>${record.dateLabel} · ${record.value} ${record.unit}</small>`;
  hoverCard.hidden = false;
  moveHover(event);
}

function moveHover(event) {
  const left = Math.min(window.innerWidth - 292, event.clientX + 18);
  const top = Math.min(window.innerHeight - 165, event.clientY + 18);
  hoverCard.style.left = `${Math.max(8, left)}px`;
  hoverCard.style.top = `${Math.max(80, top)}px`;
}

function hideHover() {
  hoverCard.hidden = true;
}

function visibleRecords() {
  const query = state.search.trim().toLowerCase();
  return records.filter((record) => {
    const matchesCategory = state.filter === "all" || record.category === state.filter;
    const haystack = `${record.dateLabel} ${record.title} ${record.institution} ${record.category} ${record.type} ${record.value} ${record.keywords}`.toLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });
}

function renderList() {
  recordList.innerHTML = "";
  visibleRecords().forEach((record) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<time>${record.dateLabel}</time><span><strong>${record.title}</strong><small>${record.institution} · ${record.value}</small><span class="record-category ${record.category}">${categoryLabels[record.category]}</span></span>`;
    button.addEventListener("click", () => selectRecord(record.id, true));
    item.appendChild(button);
    recordList.appendChild(item);
  });
}

function selectRecord(id, openPanel = false) {
  state.selected = id;
  const record = recordById[id];
  const related = relatedTo(id);
  const evidence = record.sourceIds.map((sourceId) => sourceById[sourceId]);
  document.getElementById("detailCount").textContent = `RECORD ${String(records.indexOf(record) + 1).padStart(2, "0")} / ${records.length}`;
  document.getElementById("detailContent").innerHTML = `
    <div class="detail-kicker">${record.category} / ${record.type}</div>
    <h2>${record.title}</h2>
    <div class="detail-date">${record.dateLabel} · ${record.institution}</div>
    <div class="detail-value"><strong>${record.value}</strong><span>${record.unit}</span></div>
    <p class="detail-summary">${record.summary}</p>
    <div class="detail-section limitation"><span>WHAT THIS RECORD DOES NOT ESTABLISH</span><p>${record.limit}</p></div>
    <div class="detail-section"><span>RELATIONS + EVIDENCE STATUS</span><div class="relation-list">
      ${related.map((item) => `<button type="button" data-related="${item.record.id}" title="${item.note}"><b>${item.kind} / ${item.verb}</b><span>${item.record.title}</span></button>`).join("") || "No direct relation encoded."}
    </div></div>
    <div class="detail-section"><span>SUPPORTING EVIDENCE</span><div class="source-list">
      ${evidence.map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer"><b>${source.agency}</b><span>${source.title}</span><small>${source.date}</small></a>`).join("")}
    </div></div>`;
  document.querySelectorAll("[data-related]").forEach((button) => button.addEventListener("click", () => selectRecord(button.dataset.related, true)));
  updateStateClasses();
  if (openPanel) openDrawer("detailDrawer");
}

function openDrawer(id) {
  document.querySelectorAll(".drawer").forEach((drawer) => {
    const open = drawer.id === id;
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", String(!open));
  });
  scrim.hidden = false;
}

function closeDrawers(clearSelection = false) {
  document.querySelectorAll(".drawer").forEach((drawer) => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  });
  scrim.hidden = true;
  if (clearSelection) {
    state.selected = null;
    updateStateClasses();
  }
}

function reset() {
  state.view = "relation";
  state.filter = "all";
  state.selected = null;
  state.search = "";
  document.getElementById("recordSearch").value = "";
  document.querySelectorAll(".index-filter").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === "all"));
  closeDrawers();
  renderList();
  updateView();
}

document.querySelectorAll(".view-button").forEach((button) => button.addEventListener("click", () => {
  state.view = button.dataset.view;
  updateView();
}));
document.querySelectorAll(".index-filter").forEach((button) => button.addEventListener("click", () => {
  state.filter = button.dataset.filter;
  document.querySelectorAll(".index-filter").forEach((item) => item.classList.toggle("is-active", item === button));
  renderList();
}));
document.getElementById("recordSearch").addEventListener("input", (event) => { state.search = event.target.value; renderList(); });
document.getElementById("indexButton").addEventListener("click", () => openDrawer("indexDrawer"));
document.getElementById("aboutButton").addEventListener("click", () => openDrawer("aboutDrawer"));
document.getElementById("resetView").addEventListener("click", reset);
document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => closeDrawers()));
scrim.addEventListener("click", () => closeDrawers());
window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDrawers(); });
window.addEventListener("resize", hideHover);

document.getElementById("recordTotal").textContent = records.length;
renderGraph();
renderList();
