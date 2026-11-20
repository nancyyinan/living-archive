const { months, series, relations, sources } = PRICE_OTHERWISE_DATA;
const svgNS = "http://www.w3.org/2000/svg";
const chart = document.getElementById("priceChart");
const scrubber = document.getElementById("monthScrubber");
const monthOutput = document.getElementById("monthOutput");
const wholesaleOutput = document.getElementById("wholesaleOutput");
const retailOutput = document.getElementById("retailOutput");
const observationOutput = document.getElementById("observationOutput");
const priceReading = document.querySelector(".reading");
const relationReading = document.querySelector(".relation-reading");
const relationOutput = document.getElementById("relationOutput");
const evidenceDialog = document.getElementById("evidenceDialog");
const evidenceContent = document.getElementById("evidenceContent");
const sourceById = Object.fromEntries(sources.map((source) => [source.id, source]));

let selectedIndex = 1;
let activeMode = "prices";
let activeRelation = "observed";
let compact = false;
let frame;
let xPositions;

function svgElement(name, attributes = {}, text = "") {
  const element = document.createElementNS(svgNS, name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  if (text) element.textContent = text;
  return element;
}

function configureGeometry() {
  compact = window.matchMedia("(max-width: 720px)").matches;
  frame = compact
    ? { width: 760, height: 860, left: 84, right: 76, top: 78, bottom: 82 }
    : { width: 1440, height: 700, left: 128, right: 104, top: 52, bottom: 72 };
  const plotWidth = frame.width - frame.left - frame.right;
  xPositions = months.map((_, index) => frame.left + (plotWidth * index) / 2);
  chart.setAttribute("viewBox", `0 0 ${frame.width} ${frame.height}`);
}

const yForPrice = (value) => frame.top + ((9 - value) / 9) * (frame.height - frame.top - frame.bottom);
const formatValue = (key, value) => `$${value.toFixed(key === "retail" ? 3 : 2)}`;
const pointsFor = (key) => months.map((month, index) => `${xPositions[index]},${yForPrice(month[key])}`).join(" ");

function addPricePath(key) {
  const group = svgElement("g", { class: `series-group ${key}` });
  group.append(svgElement("polyline", { class: "series-line echo", points: pointsFor(key), fill: "none", "aria-hidden": "true" }));
  group.append(svgElement("polyline", { class: "series-line", points: pointsFor(key), fill: "none" }));

  months.forEach((month, index) => {
    const point = svgElement("g", {
      class: "data-point",
      "data-index": index,
      "data-series": key,
      transform: `translate(${xPositions[index]} ${yForPrice(month[key])})`,
      role: "button",
      tabindex: "0",
      "aria-label": `${series[key].label}, ${month.label}, ${formatValue(key, month[key])} per dozen`,
    });
    point.append(svgElement("circle", { class: "point-halo", r: compact ? 34 : 28 }));
    if (key === "wholesale") point.append(svgElement("circle", { class: "point-shape", r: compact ? 8 : 6 }));
    else point.append(svgElement("rect", { class: "point-shape", x: compact ? -7 : -5, y: compact ? -7 : -5, width: compact ? 14 : 10, height: compact ? 14 : 10, transform: "rotate(45)" }));
    group.append(point);
  });

  chart.append(group);
}

function relationCurve(from, to, lift = 72) {
  const midX = (from.x + to.x) / 2;
  const controlY = Math.min(from.y, to.y) - lift;
  return `M ${from.x} ${from.y} C ${midX} ${controlY}, ${midX} ${controlY}, ${to.x} ${to.y}`;
}

function addRelationLayer() {
  const layer = svgElement("g", { id: "relationLayer", class: "relation-layer", "aria-hidden": "true" });
  const wholesaleFeb = { x: xPositions[0], y: yForPrice(months[0].wholesale) };
  const retailMar = { x: xPositions[1], y: yForPrice(months[1].retail) };
  const retailApr = { x: xPositions[2], y: yForPrice(months[2].retail) };

  const observed = svgElement("g", { class: "relation-mark observed is-active", "data-relation-mark": "observed" });
  observed.append(svgElement("path", { class: "relation-path", d: relationCurve(wholesaleFeb, retailMar, compact ? 100 : 86), fill: "none" }));
  const observedMidX = (wholesaleFeb.x + retailMar.x) / 2;
  const observedMidY = Math.min(wholesaleFeb.y, retailMar.y) - (compact ? 92 : 78);
  observed.append(svgElement("circle", { class: "relation-anchor", cx: observedMidX, cy: observedMidY, r: compact ? 6 : 4 }));
  observed.append(svgElement("text", { class: "relation-kicker", x: observedMidX, y: observedMidY - (compact ? 22 : 16), "text-anchor": "middle" }, "OBSERVED"));
  observed.append(svgElement("text", { class: "relation-label", x: observedMidX, y: observedMidY + (compact ? 52 : 38), "text-anchor": "middle" }, relations.observed.label));
  layer.append(observed);

  const documented = svgElement("g", { class: "relation-mark documented", "data-relation-mark": "documented" });
  const mechanismX = (xPositions[1] + xPositions[2]) / 2;
  const mechanismY = frame.top - (compact ? 28 : 20);
  documented.append(svgElement("line", { class: "mechanism-stem", x1: mechanismX, x2: retailMar.x, y1: mechanismY, y2: retailMar.y }));
  documented.append(svgElement("line", { class: "mechanism-stem", x1: mechanismX, x2: retailApr.x, y1: mechanismY, y2: retailApr.y }));
  documented.append(svgElement("circle", { class: "mechanism-halo", cx: mechanismX, cy: mechanismY, r: compact ? 34 : 28 }));
  documented.append(svgElement("circle", { class: "relation-anchor", cx: mechanismX, cy: mechanismY, r: compact ? 7 : 5 }));
  documented.append(svgElement("text", { class: "relation-kicker", x: mechanismX, y: mechanismY - (compact ? 24 : 18), "text-anchor": "middle" }, "DOCUMENTED MECHANISM"));
  documented.append(svgElement("text", { class: "relation-label", x: mechanismX, y: mechanismY + (compact ? 52 : 38), "text-anchor": "middle" }, relations.documented.label));
  layer.append(documented);

  const hypothesis = svgElement("g", { class: "relation-mark hypothesis", "data-relation-mark": "hypothesis" });
  hypothesis.append(svgElement("path", { class: "relation-path", d: relationCurve(wholesaleFeb, retailMar, compact ? 116 : 102), fill: "none" }));
  const hypothesisMidX = (wholesaleFeb.x + retailMar.x) / 2;
  const hypothesisMidY = Math.min(wholesaleFeb.y, retailMar.y) - (compact ? 108 : 94);
  hypothesis.append(svgElement("circle", { class: "hypothesis-halo", cx: hypothesisMidX, cy: hypothesisMidY, r: compact ? 28 : 22 }));
  hypothesis.append(svgElement("text", { class: "hypothesis-question", x: hypothesisMidX, y: hypothesisMidY + (compact ? 10 : 7), "text-anchor": "middle" }, "?"));
  hypothesis.append(svgElement("text", { class: "relation-kicker", x: hypothesisMidX, y: hypothesisMidY - (compact ? 38 : 30), "text-anchor": "middle" }, "UNVERIFIED"));
  hypothesis.append(svgElement("text", { class: "relation-label", x: hypothesisMidX, y: hypothesisMidY + (compact ? 74 : 54), "text-anchor": "middle" }, relations.hypothesis.label));
  layer.append(hypothesis);

  chart.append(layer);
}

function buildChart() {
  configureGeometry();
  chart.innerHTML = `<title id="chartTitle">New York wholesale and U.S. urban average retail egg prices</title><desc id="chartDescription">Straight lines connect three reported monthly averages for February, March, and April 2025. Select a month with the scrubber.</desc>`;

  const grid = svgElement("g", { class: "grid", "aria-hidden": "true" });
  [0, 3, 6, 9].forEach((tick) => {
    const y = yForPrice(tick);
    grid.append(svgElement("line", { x1: frame.left, x2: frame.width - frame.right, y1: y, y2: y }));
    grid.append(svgElement("text", { x: frame.left - 24, y: y + 5, "text-anchor": "end" }, `$${tick}`));
  });
  months.forEach((month, index) => {
    grid.append(svgElement("line", { class: "month-guide", "data-guide": index, x1: xPositions[index], x2: xPositions[index], y1: frame.top, y2: frame.height - frame.bottom }));
    grid.append(svgElement("text", { class: "month-label", x: xPositions[index], y: frame.height - 28, "text-anchor": "middle" }, month.short));
  });
  chart.append(grid);

  addPricePath("wholesale");
  addPricePath("retail");
  addRelationLayer();

  const focusGuide = svgElement("line", { id: "focusGuide", class: "focus-guide", y1: frame.top, y2: frame.height - frame.bottom, "aria-hidden": "true" });
  chart.append(focusGuide);

  ["wholesale", "retail"].forEach((key) => {
    const focus = svgElement("g", { id: `${key}Focus`, class: `focus-label ${key}`, "aria-hidden": "true" });
    focus.append(svgElement("line", { class: "focus-rule", x1: 0, x2: 26, y1: 0, y2: 0 }));
    focus.append(svgElement("text", { class: "focus-name", x: 34, y: -12 }, key === "wholesale" ? "NY WHOLESALE" : "U.S. RETAIL"));
    focus.append(svgElement("text", { class: "focus-value", x: 34, y: 24, "data-label-value": key }));
    chart.append(focus);
  });

  bindPoints();
  updateRelationLayer();
  updateSelection(false);
  requestAnimationFrame(() => document.body.classList.add("is-ready"));
}

function updateRelationLayer() {
  document.querySelectorAll("[data-relation-mark]").forEach((mark) => {
    mark.classList.toggle("is-active", mark.dataset.relationMark === activeRelation);
  });
}

function setMode(mode) {
  activeMode = mode;
  document.body.classList.toggle("mode-relations", mode === "relations");
  priceReading.hidden = mode === "relations";
  relationReading.hidden = mode !== "relations";
  document.querySelectorAll("[data-mode]").forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function setRelation(relationKey) {
  activeRelation = relationKey;
  relationOutput.textContent = relations[relationKey].note;
  document.querySelectorAll("[data-relation]").forEach((button) => {
    const active = button.dataset.relation === relationKey;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  updateRelationLayer();
}

function bindPoints() {
  document.querySelectorAll(".data-point").forEach((point) => {
    const activate = () => {
      selectedIndex = Number(point.dataset.index);
      scrubber.value = String(selectedIndex);
      updateSelection();
    };
    point.addEventListener("click", activate);
    point.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate();
      }
    });
  });
}

function positionFocusLabel(key, x, y) {
  const label = document.getElementById(`${key}Focus`);
  const isLast = selectedIndex === months.length - 1;
  const direction = isLast ? -1 : 1;
  const verticalOffset = key === "wholesale" ? 22 : -22;
  label.setAttribute("transform", `translate(${x} ${y + verticalOffset})`);
  label.querySelector(".focus-rule").setAttribute("x2", direction * 26);
  label.querySelectorAll("text").forEach((text) => {
    text.setAttribute("x", direction * 34);
    text.setAttribute("text-anchor", direction === 1 ? "start" : "end");
  });
}

function updateSelection(announce = true) {
  const month = months[selectedIndex];
  const x = xPositions[selectedIndex];
  document.getElementById("focusGuide").setAttribute("x1", x);
  document.getElementById("focusGuide").setAttribute("x2", x);

  ["wholesale", "retail"].forEach((key) => {
    const y = yForPrice(month[key]);
    positionFocusLabel(key, x, y);
    document.querySelector(`[data-label-value="${key}"]`).textContent = formatValue(key, month[key]);
  });

  document.querySelectorAll(".data-point").forEach((point) => {
    point.classList.toggle("is-selected", Number(point.dataset.index) === selectedIndex);
  });
  document.querySelectorAll("[data-guide]").forEach((guide) => {
    guide.classList.toggle("is-selected", Number(guide.dataset.guide) === selectedIndex);
  });

  monthOutput.textContent = month.label;
  wholesaleOutput.textContent = formatValue("wholesale", month.wholesale);
  retailOutput.textContent = formatValue("retail", month.retail);
  observationOutput.textContent = month.observation;
  scrubber.style.setProperty("--scrub-progress", `${selectedIndex * 50}%`);
  if (announce) evidenceDialog.dataset.month = month.id;
}

function sourceLinks(sourceIds) {
  return sourceIds.map((id) => {
    const source = sourceById[id];
    return `<a href="${source.url}" target="_blank" rel="noopener noreferrer"><span>${source.agency}</span><strong>${source.title}</strong></a>`;
  }).join("");
}

function evidenceSection(key) {
  const record = series[key];
  const month = months[selectedIndex];
  return `<section class="evidence-series ${key}">
    <header><span>${record.geography}</span><strong>${formatValue(key, month[key])}</strong></header>
    <h3>${record.label}</h3>
    <p>${record.definition}</p>
    <details><summary>Comparison limits</summary><p>${record.limitation}</p></details>
    <div class="source-links">${sourceLinks(record.sourceIds)}</div>
  </section>`;
}

function openEvidence() {
  document.getElementById("evidenceMonth").textContent = `${months[selectedIndex].short} 2025`;
  const relationEvidence = activeMode === "relations"
    ? `<section class="relationship-evidence ${activeRelation}"><span>${relations[activeRelation].status}</span><h3>${relations[activeRelation].label}</h3><p>${relations[activeRelation].note}</p><p class="caution">${relations[activeRelation].limitation}</p><div class="source-links">${sourceLinks(relations[activeRelation].sourceIds)}</div></section>`
    : "";
  evidenceContent.innerHTML = `${relationEvidence}${evidenceSection("wholesale")}${evidenceSection("retail")}`;
  evidenceDialog.showModal();
}

scrubber.addEventListener("input", (event) => {
  selectedIndex = Number(event.target.value);
  updateSelection();
});
document.getElementById("evidenceButton").addEventListener("click", openEvidence);
document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});
document.querySelectorAll("[data-relation]").forEach((button) => {
  button.addEventListener("click", () => setRelation(button.dataset.relation));
});
evidenceDialog.addEventListener("click", (event) => {
  if (event.target === evidenceDialog) evidenceDialog.close();
});

window.addEventListener("resize", () => {
  const nextCompact = window.matchMedia("(max-width: 720px)").matches;
  if (nextCompact !== compact) {
    document.body.classList.remove("is-ready");
    buildChart();
  }
});

buildChart();
