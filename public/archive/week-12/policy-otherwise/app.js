const records = [
  {
    id: "stem-opt-rule", date: "2016-03-11", title: "24-month STEM OPT final rule", institution: "DHS",
    area: "work", effect: "expands", type: "Final rule", row: 0,
    summary: "DHS replaces the prior 17-month STEM OPT extension with a 24-month extension and adds training-plan, employer, and oversight requirements.",
    limit: "The rule expands one work pathway; it does not guarantee employment, sponsorship, or later immigration status.",
    source: "https://www.federalregister.gov/documents/2016/03/11/2016-04828/improving-and-expanding-training-opportunities-for-f-1-nonimmigrant-students-with-stem-degrees-and",
    keywords: "OPT STEM employment training cap gap"
  },
  {
    id: "entry-order-13780", date: "2017-03-06", title: "Executive Order 13780", institution: "The White House",
    area: "entry", effect: "restricts", type: "Executive order", row: 0,
    summary: "The order suspends entry for nationals of specified countries and directs heightened visa screening and vetting.",
    limit: "A broad entry order does not affect every international student equally; nationality, visa timing, exceptions, and later litigation matter.",
    source: "https://www.federalregister.gov/documents/2017/03/09/2017-04837/protecting-the-nation-from-foreign-terrorist-entry-into-the-united-states",
    keywords: "travel ban visa screening nationality entry"
  },
  {
    id: "proclamation-10043", date: "2020-05-29", title: "Proclamation 10043", institution: "The White House",
    area: "entry", effect: "restricts", type: "Presidential proclamation", row: 0,
    summary: "The proclamation suspends entry of certain graduate-level students and researchers from China associated with entities supporting the PRC's military-civil fusion strategy.",
    limit: "The proclamation targets defined associations and visa categories; it is not a ban on every Chinese student.",
    source: "https://www.federalregister.gov/documents/2020/06/04/2020-12217/suspension-of-entry-as-nonimmigrants-of-certain-students-and-researchers-from-the-peoples-republic",
    keywords: "China PRC F visa J visa research entry"
  },
  {
    id: "online-study-rule", date: "2020-07-06", title: "Fall 2020 online-study directive", institution: "ICE / SEVP",
    area: "study", effect: "restricts", type: "Agency guidance", row: 0,
    summary: "SEVP announces that F-1 students at schools operating entirely online may not take a full online course load and remain in the United States for fall 2020.",
    limit: "The directive was temporary emergency guidance and was withdrawn eight days later after legal challenges.",
    source: "https://content.govdelivery.com/accounts/USDHSICE/bulletins/29442bc",
    keywords: "online classes pandemic SEVP enrollment status"
  },
  {
    id: "online-rule-withdrawn", date: "2020-07-14", title: "Online-study directive withdrawn", institution: "DHS / U.S. District Court",
    area: "study", effect: "reverses", type: "Policy withdrawal", row: 1,
    summary: "DHS agrees to withdraw the July 6 directive during litigation brought by universities and states.",
    limit: "Withdrawal resolved this directive, not every pandemic-era restriction affecting new or continuing students.",
    source: "https://www.mass.gov/news/ag-healey-statement-on-todays-win-in-student-visa-case",
    keywords: "withdrawn lawsuit Harvard MIT online classes"
  },
  {
    id: "fixed-stay-2020", date: "2020-09-25", title: "First fixed-period proposal", institution: "DHS / ICE",
    area: "status", effect: "restricts", type: "Proposed rule", row: 0,
    summary: "DHS proposes replacing duration of status for F, J, and I classifications with fixed admission periods and extension-of-stay applications.",
    limit: "A proposed rule is not binding law. This version was withdrawn before becoming final.",
    source: "https://www.federalregister.gov/documents/2020/09/25/2020-20845/establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-for-nonimmigrant",
    keywords: "duration of status D/S fixed admission extension stay"
  },
  {
    id: "entry-bans-revoked", date: "2021-01-20", title: "Entry bans revoked", institution: "The White House",
    area: "entry", effect: "reverses", type: "Presidential proclamation", row: 1,
    summary: "Proclamation 10141 revokes Executive Order 13780 and related country-based entry restrictions and directs resumption of visa processing.",
    limit: "The revocation does not revoke Proclamation 10043 or eliminate individualized visa screening.",
    source: "https://www.federalregister.gov/documents/2021/01/25/2021-01749/ending-discriminatory-bans-on-entry-to-the-united-states",
    keywords: "revoke travel ban visa processing entry"
  },
  {
    id: "fixed-stay-withdrawn", date: "2021-07-06", title: "Fixed-period proposal withdrawn", institution: "DHS / ICE",
    area: "status", effect: "reverses", type: "Rule withdrawal", row: 1,
    summary: "DHS formally withdraws the 2020 proposal to replace duration of status for F, J, and certain I nonimmigrants.",
    limit: "Withdrawal preserves the existing framework at that moment; it does not prevent a future administration from proposing a new rule.",
    source: "https://www.federalregister.gov/documents/2021/07/06/2021-13929/establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-for-nonimmigrant",
    keywords: "withdrawal duration status D/S"
  },
  {
    id: "stem-list-2022", date: "2022-01-21", title: "22 fields added to STEM list", institution: "DHS / ICE",
    area: "work", effect: "expands", type: "Federal Register notice", row: 0,
    summary: "DHS adds 22 fields of study to the list used to determine eligibility for the 24-month STEM OPT extension.",
    limit: "A qualifying degree field is only one eligibility condition for a STEM OPT application.",
    source: "https://www.federalregister.gov/documents/2022/01/21/2022-01188/update-to-the-department-of-homeland-security-stem-designated-degree-program-list",
    keywords: "STEM CIP fields OPT degree work"
  },
  {
    id: "opt-premium-2023", date: "2023-03-06", title: "Premium processing for OPT", institution: "USCIS",
    area: "work", effect: "procedural", type: "Processing change", row: 0,
    summary: "USCIS begins phasing in premium processing for certain F-1 students applying for OPT or STEM OPT extensions.",
    limit: "Premium processing accelerates adjudication for a fee; it does not change substantive eligibility or guarantee approval.",
    source: "https://content.govdelivery.com/accounts/USDHSCIS/bulletins/34cf6fc",
    keywords: "premium processing I-765 OPT STEM fee"
  },
  {
    id: "h1b-modernization", date: "2024-12-18", title: "F-1 cap-gap flexibility", institution: "DHS / USCIS",
    area: "work", effect: "expands", type: "Final rule", row: 0,
    summary: "The H-1B modernization rule extends cap-gap protection for eligible F-1 students and changes the transition between F-1 and H-1B status.",
    limit: "Cap-gap protection applies only when filing and eligibility conditions are met; it is not an H-1B approval.",
    source: "https://www.federalregister.gov/documents/2024/12/18/2024-29354/modernizing-h-1b-requirements-providing-flexibility-in-the-f-1-program-and-program-improvements",
    keywords: "H-1B cap gap F-1 work transition"
  },
  {
    id: "visa-suspensions-2025", date: "2025-06-04", title: "Country-based visa suspensions", institution: "The White House / State Department",
    area: "entry", effect: "restricts", type: "Presidential proclamation", row: 0,
    summary: "A proclamation fully or partially suspends entry and visa issuance for nationals of designated countries; partial suspensions include F, M, and J visas.",
    limit: "The proclamation contains scope rules and exceptions; nationality alone does not describe every individual's eligibility.",
    source: "https://travel.state.gov/en/newsroom/visas/2025/suspension-of-visa-issuance-to-foreign-nationals-to-protect-the-united-states-from-foreign-terrorists-and-other-national-security-and-public-safety-threats.html",
    keywords: "visa suspension country F M J entry"
  },
  {
    id: "fixed-stay-2025", date: "2025-08-28", title: "Fixed-period proposal returns", institution: "DHS / ICE",
    area: "status", effect: "restricts", type: "Proposed rule", row: 0,
    summary: "DHS again proposes changing F, J, and I admission from duration of status to fixed periods, generally capped at four years.",
    limit: "This is the proposal stage; its provisions changed before the 2026 final rule.",
    source: "https://www.federalregister.gov/documents/2025/08/28/2025-16554/establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-for-nonimmigrant",
    keywords: "duration status fixed period extension stay proposal"
  },
  {
    id: "social-screening-2025", date: "2025-12-03", title: "Online-presence review confirmed", institution: "U.S. Department of State",
    area: "entry", effect: "procedural", type: "Visa screening policy", row: 1,
    summary: "The State Department states that F, M, and J applicants are subject to online-presence review and instructs covered applicants to make social-media profiles public.",
    limit: "The announcement describes screening procedure, not the decision criteria or outcome in an individual visa case.",
    source: "https://travel.state.gov/content/travel/en/News/visas-news/announcement-of-expanded-screening-and-vetting-for-h-1b-and-dependent-h-4-visa-applicants.html",
    keywords: "social media public online presence vetting visa"
  },
  {
    id: "fixed-stay-final-2026", date: "2026-07-17", title: "Fixed-period final rule", institution: "DHS / ICE",
    area: "status", effect: "restricts", type: "Final rule", row: 0,
    summary: "DHS publishes a final rule replacing duration of status with fixed admission periods for F, J, and I classifications, with a scheduled September 15 effective date.",
    limit: "Publication did not end the policy process: a federal court postponed the rule before its scheduled effective date.",
    source: "https://www.federalregister.gov/documents/2026/07/17/2026-14439/establishing-a-fixed-time-period-of-admission-and-an-extension-of-stay-procedure-for-nonimmigrant",
    keywords: "final rule duration status fixed admission four years"
  },
  {
    id: "fixed-stay-injunction", date: "2026-09-14", title: "Court postpones fixed-period rule", institution: "U.S. District Court, D. Mass.",
    area: "status", effect: "reverses", type: "Preliminary injunction", row: 1,
    summary: "A federal district court postpones the final rule's effective date nationwide while litigation proceeds.",
    limit: "Preliminary relief is not a final judgment and does not permanently vacate the rule.",
    source: "https://www.govinfo.gov/content/pkg/USCOURTS-mad-1_26-cv-13799/pdf/USCOURTS-mad-1_26-cv-13799-0.pdf",
    keywords: "court injunction duration status postponed litigation"
  },
  {
    id: "screening-expansion-2026", date: "2026-09-18", title: "Online review expands again", institution: "U.S. Department of State",
    area: "entry", effect: "procedural", type: "Visa screening policy", row: 2,
    summary: "The State Department expands online-presence review to additional visa categories and lists F, M, and J classifications among those already covered.",
    limit: "The announcement documents category coverage, not how consular officers weigh online information in individual decisions.",
    source: "https://travel.state.gov/en/newsroom/visas/2026/announcement-of-expanded-screening-and-vetting-for-visa-applicants.html",
    keywords: "online presence screening F M J public social media"
  }
];

const relations = [
  ["stem-opt-rule", "stem-list-2022", "expands", "The 2022 notice expands the degree list used by the 2016 rule."],
  ["stem-list-2022", "opt-premium-2023", "implements", "A wider eligibility list is followed by a new paid processing pathway."],
  ["stem-opt-rule", "h1b-modernization", "continues", "Both rules address the F-1-to-work transition and cap-gap protection."],
  ["entry-order-13780", "entry-bans-revoked", "revokes", "Proclamation 10141 expressly revokes EO 13780."],
  ["proclamation-10043", "visa-suspensions-2025", "echoes", "Both use presidential entry authority to restrict defined groups."],
  ["online-study-rule", "online-rule-withdrawn", "withdraws", "DHS withdrew the directive eight days after publication."],
  ["fixed-stay-2020", "fixed-stay-withdrawn", "withdraws", "DHS formally withdrew the 2020 proposed rule."],
  ["fixed-stay-2020", "fixed-stay-2025", "reintroduces", "The 2025 proposal returns to the same fixed-period policy question."],
  ["fixed-stay-2025", "fixed-stay-final-2026", "finalizes", "The 2026 rule finalizes the 2025 proposal with revisions."],
  ["fixed-stay-final-2026", "fixed-stay-injunction", "postpones", "The court order postpones the scheduled effective date."],
  ["h1b-modernization", "fixed-stay-final-2026", "preserves", "The 2026 rule states that eligible cap-gap protection continues."],
  ["visa-suspensions-2025", "social-screening-2025", "layers", "Entry restrictions and online screening operate as separate layers of visa control."],
  ["social-screening-2025", "screening-expansion-2026", "expands", "The later announcement expands online review while confirming student categories remain covered."]
].map(([from, to, verb, note]) => ({ from, to, verb, note }));

const relationLayout = {
  "stem-opt-rule": [230, 245], "stem-list-2022": [350, 350], "opt-premium-2023": [485, 245], "h1b-modernization": [620, 355],
  "entry-order-13780": [270, 650], "entry-bans-revoked": [445, 720], "proclamation-10043": [520, 575],
  "online-study-rule": [745, 260], "online-rule-withdrawn": [885, 205],
  "visa-suspensions-2025": [730, 675], "social-screening-2025": [875, 565], "screening-expansion-2026": [1010, 675],
  "fixed-stay-2020": [1050, 355], "fixed-stay-withdrawn": [1160, 240], "fixed-stay-2025": [1235, 435],
  "fixed-stay-final-2026": [1380, 340], "fixed-stay-injunction": [1450, 545]
};

const areaLabels = {
  entry: ["ENTRY + SCREENING", "visas, nationality, vetting"],
  status: ["STATUS + COMPLIANCE", "admission period, extensions"],
  study: ["MODE OF STUDY", "enrollment and course format"],
  work: ["WORK AFTER STUDY", "OPT and status transition"]
};
const effectLabels = { expands: "expands access", restricts: "restricts access", procedural: "changes procedure", reverses: "reverses / postpones" };
const svgNS = "http://www.w3.org/2000/svg";
const recordById = Object.fromEntries(records.map((record) => [record.id, record]));
const positions = {};
const state = { view: "relation", filter: "all", selected: null, search: "" };
const graphStage = document.getElementById("graphStage");
const axisLayer = document.getElementById("axisLayer");
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
function degree(id) { return relations.filter((relation) => relation.from === id || relation.to === id).length; }
function relatedTo(id) {
  return relations.filter((relation) => relation.from === id || relation.to === id).map((relation) => ({
    ...relation, record: recordById[relation.from === id ? relation.to : relation.from]
  }));
}

function buildTimeLayout() {
  const start = new Date("2016-01-01T12:00:00").getTime();
  const end = new Date("2026-12-31T12:00:00").getTime();
  const lanes = { entry: 290, status: 430, study: 570, work: 710 };
  return Object.fromEntries(records.map((record) => {
    const ratio = (new Date(`${record.date}T12:00:00`).getTime() - start) / (end - start);
    return [record.id, [300 + ratio * 1140, lanes[record.area] + record.row * 30]];
  }));
}
const chronologicalLayout = buildTimeLayout();

function curve(from, to) {
  const bend = Math.min(120, Math.abs(to[0] - from[0]) * .13 + Math.abs(to[1] - from[1]) * .08);
  return `M ${from[0]} ${from[1]} Q ${(from[0] + to[0]) / 2} ${(from[1] + to[1]) / 2 - bend} ${to[0]} ${to[1]}`;
}

function renderGraph() {
  relations.forEach((relation, index) => {
    edgeLayer.appendChild(svg("path", { class: "edge documented", "data-index": index, "data-from": relation.from, "data-to": relation.to }));
  });
  records.forEach((record, index) => {
    const group = svg("g", {
      class: `record-node area-${record.area} effect-${record.effect}`,
      "data-id": record.id, role: "button", tabindex: "0", "aria-label": `${formatDate(record.date)}, ${record.title}`
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
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectRecord(record.id, true); }
    });
    nodeLayer.appendChild(group);
  });
  updateView(false);
}

function renderAxis() {
  axisLayer.innerHTML = "";
  if (state.view !== "time") return;
  const lanes = { entry: 290, status: 430, study: 570, work: 710 };
  Object.entries(lanes).forEach(([area, y], index) => {
    axisLayer.appendChild(svg("rect", { class: `axis-band ${index % 2 ? "alt" : ""}`, x: 120, y: y - 55, width: 1360, height: 110 }));
    axisLayer.appendChild(svg("line", { class: "axis-line", x1: 120, x2: 1480, y1: y + 55, y2: y + 55 }));
    const title = svg("text", { class: "axis-category", x: 128, y: y - 17 });
    title.textContent = areaLabels[area][0]; axisLayer.appendChild(title);
    const subtitle = svg("text", { class: "axis-subtitle", x: 128, y: y + 1 });
    subtitle.textContent = areaLabels[area][1]; axisLayer.appendChild(subtitle);
  });
  for (let year = 2016; year <= 2026; year += 1) {
    const ratio = (new Date(`${year}-01-01T12:00:00`).getTime() - new Date("2016-01-01T12:00:00").getTime()) /
      (new Date("2026-12-31T12:00:00").getTime() - new Date("2016-01-01T12:00:00").getTime());
    const x = 300 + ratio * 1140;
    axisLayer.appendChild(svg("line", { class: "axis-tick", x1: x, x2: x, y1: 195, y2: 765 }));
    const label = svg("text", { class: "axis-year", x: x + 5, y: 202 });
    label.textContent = year; axisLayer.appendChild(label);
  }
}

function updateView(animate = true) {
  const layout = state.view === "time" ? chronologicalLayout : relationLayout;
  graphStage.classList.toggle("is-time", state.view === "time");
  document.getElementById("modeLabel").textContent = state.view === "time" ? "CHRONOLOGY VIEW" : "RELATION VIEW";
  document.getElementById("modeDescription").textContent = state.view === "time"
    ? "Each record occupies one policy row and one date. Connections are removed from this view."
    : "Policies sit near what they amend, restrict, expand, or reverse.";
  document.querySelectorAll(".view-button").forEach((button) => button.classList.toggle("is-active", button.dataset.view === state.view));
  renderAxis();
  records.forEach((record) => {
    const group = document.querySelector(`.record-node[data-id="${record.id}"]`);
    const [x, y] = layout[record.id]; positions[record.id] = [x, y];
    if (!animate) group.style.transition = "none";
    group.style.transform = `translate(${x}px, ${y}px)`;
    if (!animate) requestAnimationFrame(() => { group.style.transition = ""; });
  });
  requestAnimationFrame(updateEdges);
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
  hoverCard.innerHTML = `<span>${String(index).padStart(2, "0")} · ${record.area.toUpperCase()} · ${effectLabels[record.effect].toUpperCase()}</span><strong>${record.title}</strong><small>${formatDate(record.date)} · ${record.institution}</small>`;
  hoverCard.hidden = false; moveHover(event);
}
function moveHover(event) {
  const left = Math.min(window.innerWidth - 272, event.clientX + 18);
  const top = Math.min(window.innerHeight - 145, event.clientY + 18);
  hoverCard.style.left = `${Math.max(8, left)}px`; hoverCard.style.top = `${Math.max(80, top)}px`;
}
function hideHover() { hoverCard.hidden = true; }

function visibleRecords() {
  const query = state.search.trim().toLowerCase();
  return records.filter((record) => {
    const matchesArea = state.filter === "all" || record.area === state.filter;
    const haystack = `${record.date} ${record.title} ${record.institution} ${record.area} ${record.type} ${record.keywords}`.toLowerCase();
    return matchesArea && (!query || haystack.includes(query));
  });
}
function renderList() {
  recordList.innerHTML = "";
  visibleRecords().forEach((record) => {
    const item = document.createElement("li");
    const button = document.createElement("button"); button.type = "button";
    button.innerHTML = `<time>${formatDate(record.date)}</time><span><strong>${record.title}</strong><small>${record.institution} · ${record.area}</small><span class="record-effect ${record.effect}">${effectLabels[record.effect]}</span></span>`;
    button.addEventListener("click", () => selectRecord(record.id, true));
    item.appendChild(button); recordList.appendChild(item);
  });
}

function selectRecord(id, openPanel = false) {
  state.selected = id;
  const record = recordById[id]; const related = relatedTo(id);
  document.getElementById("detailCount").textContent = `RECORD ${String(records.indexOf(record) + 1).padStart(2, "0")} / ${records.length}`;
  document.getElementById("detailContent").innerHTML = `
    <div class="detail-kicker">${record.area} / ${record.type} / ${effectLabels[record.effect]}</div>
    <h2>${record.title}</h2>
    <div class="detail-date">${formatDate(record.date)} · ${record.institution}</div>
    <p class="detail-summary">${record.summary}</p>
    <div class="detail-section"><span>WHAT THIS RECORD DOES NOT ESTABLISH</span><p>${record.limit}</p></div>
    <div class="detail-section"><span>POLICY RELATIONS</span><div class="relation-list">
      ${related.map((item) => `<button type="button" data-related="${item.record.id}" title="${item.note}">${item.verb}: ${item.record.title} ↗</button>`).join("") || "No direct relation encoded."}
    </div></div>
    <a class="source-link" href="${record.source}" target="_blank" rel="noopener noreferrer"><span>OPEN PRIMARY SOURCE</span><span>↗</span></a>`;
  document.querySelectorAll("[data-related]").forEach((button) => button.addEventListener("click", () => selectRecord(button.dataset.related, true)));
  updateStateClasses(); if (openPanel) openDrawer("detailDrawer");
}
function openDrawer(id) {
  document.querySelectorAll(".drawer").forEach((drawer) => {
    const open = drawer.id === id; drawer.classList.toggle("is-open", open); drawer.setAttribute("aria-hidden", String(!open));
  });
  scrim.hidden = false;
}
function closeDrawers(clearSelection = false) {
  document.querySelectorAll(".drawer").forEach((drawer) => { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); });
  scrim.hidden = true;
  if (clearSelection) { state.selected = null; updateStateClasses(); }
}
function reset() {
  state.view = "relation"; state.filter = "all"; state.selected = null; state.search = "";
  document.getElementById("recordSearch").value = "";
  document.querySelectorAll(".index-filter").forEach((button) => button.classList.toggle("is-active", button.dataset.filter === "all"));
  closeDrawers(); renderList(); updateView();
}

document.querySelectorAll(".view-button").forEach((button) => button.addEventListener("click", () => { state.view = button.dataset.view; state.selected = null; closeDrawers(); updateView(); }));
document.querySelectorAll(".index-filter").forEach((button) => button.addEventListener("click", () => {
  state.filter = button.dataset.filter;
  document.querySelectorAll(".index-filter").forEach((item) => item.classList.toggle("is-active", item === button)); renderList();
}));
document.getElementById("recordSearch").addEventListener("input", (event) => { state.search = event.target.value; renderList(); });
document.getElementById("indexButton").addEventListener("click", () => openDrawer("indexDrawer"));
document.getElementById("aboutButton").addEventListener("click", () => openDrawer("aboutDrawer"));
document.getElementById("resetView").addEventListener("click", reset);
document.querySelectorAll("[data-close]").forEach((button) => button.addEventListener("click", () => closeDrawers(true)));
scrim.addEventListener("click", () => closeDrawers(true));
window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDrawers(true); });
window.addEventListener("resize", hideHover);

document.getElementById("recordTotal").textContent = records.length;
renderGraph(); renderList();
