const { months, series, readings, sources } = KINETIC_ATLAS_DATA;
const sourceById = Object.fromEntries(sources.map((source) => [source.id, source]));
const svgNS = "http://www.w3.org/2000/svg";
const priceChart = document.getElementById("priceChart");
const scrubber = document.getElementById("monthScrubber");
const monthOutput = document.getElementById("monthOutput");
const liveDescription = document.getElementById("liveDescription");
const evidenceDialog = document.getElementById("evidenceDialog");
const evidenceContent = document.getElementById("evidenceContent");

let compactChart = window.matchMedia("(max-width: 760px)").matches;
let frame;
let plotWidth;
let plotHeight;
let xPositions;
function refreshGeometry() {
  compactChart = window.matchMedia("(max-width: 760px)").matches;
  frame = compactChart
    ? { width: 760, height: 820, left: 92, right: 72, top: 60, bottom: 90 }
    : { width: 1200, height: 600, left: 118, right: 84, top: 44, bottom: 72 };
  plotWidth = frame.width - frame.left - frame.right;
  plotHeight = frame.height - frame.top - frame.bottom;
  xPositions = months.map((_, index) => frame.left + (plotWidth * index) / (months.length - 1));
  priceChart.setAttribute("viewBox", `0 0 ${frame.width} ${frame.height}`);
}
const yForPrice = (value) => frame.top + ((9 - value) / 9) * plotHeight;
const pointsFor = (seriesKey) => months.map((month, index) => `${xPositions[index]},${yForPrice(month[seriesKey])}`).join(" ");
const valueFor = (seriesKey, index) => months[index][seriesKey];
const formatValue = (seriesKey, value) => `$${value.toFixed(seriesKey === "retail" ? 3 : 2)}`;
let selectedIndex = 0;

function svgElement(name, attributes = {}, text = "") {
  const element = document.createElementNS(svgNS, name);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  if (text) element.textContent = text;
  return element;
}

function buildChart() {
  refreshGeometry();
  priceChart.innerHTML = `<title id="chartTitle">New York wholesale and U.S. urban retail egg prices</title><desc id="chartDescription">Three observed monthly averages from February, March, and April 2025 on one shared zero-to-nine-dollar price axis. Use the month scrubber to select an observation.</desc>`;

  const grid = svgElement("g", { class: "grid-layer", "aria-hidden": "true" });
  [0, 3, 6, 9].forEach((tick) => {
    const y = yForPrice(tick);
    grid.append(svgElement("line", { x1: frame.left, x2: frame.width - frame.right, y1: y, y2: y }));
    grid.append(svgElement("text", { x: frame.left - 24, y: y + 5, "text-anchor": "end" }, `$${tick}`));
  });
  grid.append(svgElement("text", { x: compactChart ? 8 : frame.left - 24, y: frame.top - 20, "text-anchor": compactChart ? "start" : "end", class: "axis-unit" }, "PER DOZEN"));
  priceChart.append(grid);

  const monthLayer = svgElement("g", { class: "month-layer", "aria-hidden": "true" });
  months.forEach((month, index) => {
    monthLayer.append(svgElement("line", { class: "month-guide", "data-month-guide": index, x1: xPositions[index], x2: xPositions[index], y1: frame.top, y2: frame.height - frame.bottom }));
    monthLayer.append(svgElement("text", { class: "month-label", x: xPositions[index], y: frame.height - 30, "text-anchor": "middle" }, month.short));
  });
  priceChart.append(monthLayer);

  const clip = svgElement("clipPath", { id: "historyClip" });
  clip.append(svgElement("rect", { id: "historyClipRect", x: 0, y: 0, width: xPositions[0], height: frame.height }));
  const defs = svgElement("defs");
  defs.append(clip);
  priceChart.append(defs);

  ["wholesale", "retail"].forEach((seriesKey) => {
    priceChart.append(svgElement("polyline", { class: `series-path context-path ${seriesKey}`, points: pointsFor(seriesKey), fill: "none" }));
    priceChart.append(svgElement("polyline", { class: `series-path history-path ${seriesKey}`, points: pointsFor(seriesKey), fill: "none", "clip-path": "url(#historyClip)" }));
  });

  const pointLayer = svgElement("g", { class: "point-layer" });
  ["wholesale", "retail"].forEach((seriesKey) => {
    months.forEach((month, index) => {
      const group = svgElement("g", {
        class: `observed-point ${seriesKey}`,
        "data-series": seriesKey,
        "data-index": index,
        role: "button",
        tabindex: "0",
        "aria-label": `${series[seriesKey].label}, ${month.label}, ${formatValue(seriesKey, month[seriesKey])} per dozen. Open evidence.`,
        transform: `translate(${xPositions[index]} ${yForPrice(month[seriesKey])})`,
      });
      if (seriesKey === "wholesale") group.append(svgElement("circle", { r: 6 }));
      else group.append(svgElement("rect", { x: -5, y: -5, width: 10, height: 10, transform: "rotate(45)" }));
      pointLayer.append(group);
    });
  });
  priceChart.append(pointLayer);

  priceChart.append(svgElement("line", { id: "focusGuide", class: "focus-guide", x1: xPositions[0], x2: xPositions[0], y1: frame.top, y2: frame.height - frame.bottom, "aria-hidden": "true" }));

  ["wholesale", "retail"].forEach((seriesKey) => {
    const focus = svgElement("g", { id: `${seriesKey}Focus`, class: `focus-mark ${seriesKey}`, "aria-hidden": "true" });
    if (seriesKey === "wholesale") focus.append(svgElement("circle", { class: "focus-shape", r: 10 }));
    else focus.append(svgElement("rect", { class: "focus-shape", x: -8, y: -8, width: 16, height: 16, transform: "rotate(45)" }));
    focus.append(svgElement("line", { class: "label-rule", x1: seriesKey === "wholesale" ? -12 : 12, x2: seriesKey === "wholesale" ? -24 : 24, y1: 0, y2: 0 }));
    focus.append(svgElement("text", { class: "focus-series", x: seriesKey === "wholesale" ? -30 : 30, y: seriesKey === "wholesale" ? 28 : -34, "text-anchor": seriesKey === "wholesale" ? "end" : "start" }, series[seriesKey].label.toUpperCase()));
    focus.append(svgElement("text", { class: "focus-value", "data-focus-value": seriesKey, x: seriesKey === "wholesale" ? -30 : 30, y: seriesKey === "wholesale" ? 58 : -6, "text-anchor": seriesKey === "wholesale" ? "end" : "start" }));
    priceChart.append(focus);
  });

  bindPointInteractions();
  updateChart(false);
  requestAnimationFrame(() => document.body.classList.add("is-ready"));
}

function bindPointInteractions() {
  document.querySelectorAll(".observed-point").forEach((point) => {
    const activate = () => {
      const index = Number(point.dataset.index);
      selectedIndex = index;
      scrubber.value = String(index);
      updateChart(true);
      openEvidence(point.dataset.series, index);
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

function updateChart(announce = true) {
  const month = months[selectedIndex];
  const focusX = xPositions[selectedIndex];
  const wholesaleY = yForPrice(month.wholesale);
  const retailY = yForPrice(month.retail);

  document.getElementById("focusGuide").setAttribute("x1", focusX);
  document.getElementById("focusGuide").setAttribute("x2", focusX);
  document.getElementById("historyClipRect").setAttribute("width", focusX + 2);
  document.getElementById("wholesaleFocus").setAttribute("transform", `translate(${focusX} ${wholesaleY})`);
  document.getElementById("retailFocus").setAttribute("transform", `translate(${focusX} ${retailY})`);
  document.querySelector('[data-focus-value="wholesale"]').textContent = formatValue("wholesale", month.wholesale);
  document.querySelector('[data-focus-value="retail"]').textContent = formatValue("retail", month.retail);
  const labelSides = selectedIndex === 0
    ? { wholesale: "right", retail: "right" }
    : selectedIndex === months.length - 1
      ? { wholesale: "left", retail: "left" }
      : { wholesale: "left", retail: "right" };
  Object.entries(labelSides).forEach(([seriesKey, side]) => {
    const focus = document.getElementById(`${seriesKey}Focus`);
    const direction = side === "left" ? -1 : 1;
    focus.querySelector(".label-rule").setAttribute("x1", direction * 12);
    focus.querySelector(".label-rule").setAttribute("x2", direction * 24);
    focus.querySelectorAll("text").forEach((text) => {
      text.setAttribute("x", direction * 30);
      text.setAttribute("text-anchor", side === "left" ? "end" : "start");
    });
  });

  document.querySelectorAll("[data-month-guide]").forEach((guide) => guide.classList.toggle("is-active", Number(guide.dataset.monthGuide) === selectedIndex));
  document.querySelectorAll(".observed-point").forEach((point) => point.classList.toggle("is-active", Number(point.dataset.index) === selectedIndex));

  monthOutput.textContent = month.label;
  scrubber.style.setProperty("--scrub-progress", `${selectedIndex * 50}%`);
  liveDescription.textContent = `${month.label}. New York wholesale ${formatValue("wholesale", month.wholesale)} per dozen. U.S. urban average retail ${formatValue("retail", month.retail)} per dozen.`;
}

function sourceLinks(sourceIds) {
  return sourceIds.map((id) => {
    const source = sourceById[id];
    return `<a href="${source.url}" target="_blank" rel="noopener noreferrer"><strong>${source.agency}</strong><span>${source.title}</span></a>`;
  }).join("");
}

function seriesEvidence(seriesKey, monthIndex) {
  const record = series[seriesKey];
  const month = months[monthIndex];
  return `<section class="evidence-series ${seriesKey}">
    <div class="evidence-heading"><span>${record.geography}</span><strong>${formatValue(seriesKey, valueFor(seriesKey, monthIndex))}</strong></div>
    <h3>${record.label}</h3>
    <p>${record.definition}</p>
    <p class="reading">${readings[month.id][seriesKey]}</p>
    <details><summary>Limits of comparison</summary><p>${record.limitation}</p></details>
    <div class="source-links">${sourceLinks(record.sourceIds)}</div>
  </section>`;
}

function openEvidence(seriesKey = null, monthIndex = selectedIndex) {
  const month = months[monthIndex];
  evidenceContent.innerHTML = `<header class="dialog-heading"><span>EVIDENCE / ${month.short} 2025</span><h2 id="evidenceTitle">${seriesKey ? series[seriesKey].label : "Definitions and sources"}</h2></header>
    <div class="evidence-body">${seriesKey ? seriesEvidence(seriesKey, monthIndex) : `${seriesEvidence("wholesale", monthIndex)}${seriesEvidence("retail", monthIndex)}`}</div>`;
  evidenceDialog.showModal();
}

scrubber.addEventListener("input", (event) => {
  selectedIndex = Number(event.target.value);
  updateChart(true);
});
document.getElementById("evidenceButton").addEventListener("click", () => openEvidence());
evidenceDialog.addEventListener("click", (event) => {
  if (event.target === evidenceDialog) evidenceDialog.close();
});

window.addEventListener("resize", () => {
  const nextCompact = window.matchMedia("(max-width: 760px)").matches;
  if (nextCompact !== compactChart) {
    document.body.classList.remove("is-ready");
    buildChart();
  }
});

buildChart();
