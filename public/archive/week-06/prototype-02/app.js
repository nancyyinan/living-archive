(() => {
  const archive = window.SELF_RECORD_DATA;
  const narrative = window.PROTOTYPE_02_DATA;
  const english = window.PROTOTYPE_02_EN;
  if (!archive || !narrative || !english) return;

  const $ = (id) => document.getElementById(id);
  const scroll = $("chart-scroll");
  const stage = $("chart-stage");
  const canvas = $("chart-canvas");
  const markerLayer = $("marker-layer");
  const tooltip = $("chart-tooltip");
  const categoryLegend = $("category-legend");
  const detailType = $("detail-type");
  const detailDate = $("detail-date");
  const detailTitleZh = $("detail-title-zh");
  const detailTitleEn = $("detail-title-en");
  const detailBodyZh = $("detail-body-zh");
  const detailBodyEn = $("detail-body-en");
  const detailMeta = $("detail-meta");

  const DAY = 86400000;
  const START = day(narrative.range.start);
  const END = day(narrative.range.end);
  const TOTAL_DAYS = Math.round((END - START) / DAY) + 1;
  const macro = narrative.macro.map((item) => ({ ...item, en: english.macro[item.id] }));
  const diaries = narrative.diary.map((item) => ({ ...item, en: english.diary[item.id] }));

  const CATEGORIES = [
    { id: "school", zh: "学校", en: "School", color: "#6c8cc7" },
    { id: "work", zh: "工作", en: "Work", color: "#f9c0c7" },
    { id: "making", zh: "创作／工具", en: "Making / tools", color: "#8a81af" },
    { id: "life", zh: "生活", en: "Daily life", color: "#a3cf62" },
    { id: "body", zh: "身体／饮食", en: "Body / food", color: "#ffcc4e" },
    { id: "admin", zh: "制度／事务", en: "Admin / systems", color: "#f0f7e8" },
    { id: "rest", zh: "睡眠／休息", en: "Sleep / rest", color: "#56bdda" },
  ];

  const state = {
    language: "zh",
    view: "matrix",
    zoom: "fit",
    width: 0,
    height: 680,
    enabledCategories: new Set(CATEGORIES.map((item) => item.id)),
    layers: new Set(["policy", "ai", "diary"]),
    selected: { type: "diary", item: diaries[0] },
    hitRegions: [],
  };

  const calendar = archive.apple
    .map((item) => {
      const startDate = dateTime(item.start);
      const endDate = dateTime(item.end);
      return { ...item, startDate, endDate, category: classify(item) };
    })
    .filter((item) => item.startDate && item.endDate && item.startDate >= START && item.startDate <= endOfDay(END));

  const categoryCounts = Object.fromEntries(CATEGORIES.map((category) => [category.id, calendar.filter((item) => item.category === category.id).length]));
  const monthBuckets = buildMonthBuckets();
  const weekBuckets = buildWeekBuckets();

  function day(value) {
    const [year, month, date] = String(value).slice(0, 10).split("-").map(Number);
    return new Date(year, (month || 1) - 1, date || 1, 12);
  }

  function dateTime(value) {
    if (!value) return null;
    const parsed = new Date(String(value).replace(" ", "T"));
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function endOfDay(value) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 23, 59, 59, 999);
  }

  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function classify(item) {
    const text = `${item.title || ""} ${item.calendar || ""}`.toLowerCase();
    const includes = (terms) => terms.some((term) => text.includes(term));
    if (includes(["sleep", "wake up", "wakeup", "nap", "睡", "起床", "bed"])) return "rest";
    if (includes(["visa", "i-94", "insurance", "cpt", "opt", "tax", "bank", "chase", "tuition", "advisor", "bill", "rent", "签证", "保险", "银行卡", "学费", "报税"])) return "admin";
    if (includes(["eat", "food", "breakfast", "lunch", "dinner", "shower", "laundry", "gym", "doctor", "hospital", "medicine", "grocery", "target", "cook", "吃", "洗", "饭", "身体", "生病"])) return "body";
    if (includes(["work", "intern", "interview", "newsletter", "meeting", "shift", "job", "1feather", "ocuport", "工作", "采访", "实习"])) return "work";
    if (includes(["design", "code", "figma", "webflow", "illustrator", "blender", "after effect", " ae", "video", "edit", "animation", "motion", "prototype", "poster", "riso", "photo", "storyboard", "mask", "drawing", "art", "剪辑", "设计", "画", "模型"])) return "making";
    if (includes(["class", "school", "homework", "assignment", "critique", "reading", "final", "parsons", "lecture", "thesis", "course", "study", "canvas", "presentation", "课", "作业", "学校", "论文"])) return "school";
    return "life";
  }

  function category(id) { return CATEGORIES.find((item) => item.id === id) || CATEGORIES[3]; }

  function bilingual(zh, en) { return state.language === "en" ? en : zh; }

  function visibleText(zh, en) {
    return state.language === "en" ? en : zh;
  }

  function monthLabel(date) {
    if (state.language === "en") return date.toLocaleString("en-US", { month: "short" });
    return `${date.getMonth() + 1}月`;
  }

  function biMarkup(zh, en) {
    return `<span class="copy-zh">${escapeHtml(zh)}</span><span class="copy-en">${escapeHtml(en)}</span>`;
  }

  function formatDate(value) {
    const parsed = value instanceof Date ? value : day(value);
    return `${parsed.getFullYear()}.${String(parsed.getMonth() + 1).padStart(2, "0")}.${String(parsed.getDate()).padStart(2, "0")}`;
  }

  function formatTime(value) {
    return `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`;
  }

  const CALENDAR_TITLE_TRANSLATIONS = {
    "早饭": "Breakfast",
    "午饭": "Lunch",
    "晚饭": "Dinner",
    "吃饭": "Meal",
    "睡觉": "Sleep",
    "起床": "Wake up",
    "洗澡": "Shower",
    "洗头": "Wash hair",
    "洗衣服": "Laundry",
    "洗衣": "Laundry",
    "回家": "Return home",
    "去学校": "Go to school",
    "买菜": "Grocery shopping",
    "买材料": "Buy materials",
    "看医生": "Doctor appointment",
    "体检": "Medical checkup",
    "开会": "Meeting",
    "上课": "Class",
    "作业": "Coursework",
    "工作": "Work",
    "采访": "Interview",
    "搬家": "Move",
    "收拾行李": "Pack",
    "看房": "Apartment viewing",
    "整理狗屎书集": "Organize the book collection",
    "整理书集": "Organize the book collection",
    "看电影": "Watch a film",
    "看展": "Visit an exhibition",
    "买咖啡": "Buy coffee",
    "买东西": "Shopping",
    "超市": "Grocery store",
    "健身": "Workout",
    "跑步": "Run",
    "预约": "Appointment",
    "上班": "Go to work",
    "下班": "Leave work",
    "画画": "Draw",
    "读书": "Read",
    "写作": "Writing",
  };

  function calendarEnglishTitle(title) {
    const source = String(title || "").trim();
    if (!/[\u3400-\u9fff]/.test(source)) return source || "Untitled calendar event";
    if (CALENDAR_TITLE_TRANSLATIONS[source]) return CALENDAR_TITLE_TRANSLATIONS[source];
    let translated = source;
    Object.entries(CALENDAR_TITLE_TRANSLATIONS).forEach(([zh, en]) => { translated = translated.replaceAll(zh, en); });
    return /[\u3400-\u9fff]/.test(translated) ? "Personal calendar event" : translated;
  }

  function calendarDuration(item) {
    return Math.max(0, Math.round((item.endDate - item.startDate) / 60000));
  }

  function dayIndex(value) {
    const parsed = value instanceof Date ? new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12) : day(value);
    return (parsed - START) / DAY;
  }

  function xForDate(value) {
    const margin = 132;
    return margin + (dayIndex(value) / (TOTAL_DAYS - 1)) * (state.width - margin - 38);
  }

  function chartMetrics() {
    return {
      left: 132,
      right: state.width - 38,
      policyY: 120,
      aiY: 215,
      plotTop: 325,
      plotBottom: state.height - 190,
      diaryY: state.height - 130,
    };
  }

  function buildMonthBuckets() {
    const buckets = [];
    const cursor = new Date(START.getFullYear(), START.getMonth(), 1, 12);
    while (cursor <= END) {
      const next = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1, 12);
      const bucket = { start: new Date(cursor), end: new Date(Math.min(next - DAY, END.getTime())), counts: {}, hours: {} };
      CATEGORIES.forEach((item) => { bucket.counts[item.id] = 0; bucket.hours[item.id] = 0; });
      buckets.push(bucket);
      cursor.setMonth(cursor.getMonth() + 1);
    }
    calendar.forEach((item) => {
      const index = (item.startDate.getFullYear() - START.getFullYear()) * 12 + item.startDate.getMonth() - START.getMonth();
      const bucket = buckets[index];
      if (!bucket) return;
      bucket.counts[item.category] += 1;
      bucket.hours[item.category] += durationHours(item);
    });
    return buckets;
  }

  function buildWeekBuckets() {
    const count = Math.ceil(TOTAL_DAYS / 7);
    const buckets = Array.from({ length: count }, (_, index) => ({
      start: new Date(START.getTime() + index * 7 * DAY),
      counts: Object.fromEntries(CATEGORIES.map((item) => [item.id, 0])),
      hours: Object.fromEntries(CATEGORIES.map((item) => [item.id, 0])),
      hourTotal: Object.fromEntries(CATEGORIES.map((item) => [item.id, 0])),
    }));
    calendar.forEach((item) => {
      const index = clamp(Math.floor(dayIndex(item.startDate) / 7), 0, buckets.length - 1);
      const bucket = buckets[index];
      bucket.counts[item.category] += 1;
      bucket.hours[item.category] += durationHours(item);
      bucket.hourTotal[item.category] += item.startDate.getHours() + item.startDate.getMinutes() / 60;
    });
    return buckets;
  }

  function durationHours(item) {
    const hours = (item.endDate - item.startDate) / 3600000;
    return clamp(Number.isFinite(hours) ? hours : 0, .08, 24);
  }

  function setStageWidth(anchor = START) {
    const oldX = state.width ? xForDate(anchor) : 0;
    const oldRatio = state.width ? oldX / state.width : 0;
    const viewport = Math.max(320, scroll.clientWidth);
    const desired = state.zoom === "fit" ? Math.max(viewport, 1240) : state.zoom === "month" ? TOTAL_DAYS * 5.2 : TOTAL_DAYS * 13.5;
    state.width = Math.ceil(desired);
    state.height = Math.round(stage.getBoundingClientRect().height || 680);
    stage.style.width = `${state.width}px`;
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    const newX = xForDate(anchor);
    const target = Number.isFinite(newX) ? newX : state.width * oldRatio;
    requestAnimationFrame(() => { scroll.scrollLeft = clamp(target - viewport / 2, 0, state.width - viewport); });
  }

  function setupCanvas() {
    const dpr = state.width > 8000 ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.ceil(state.width * dpr);
    canvas.height = Math.ceil(state.height * dpr);
    const context = canvas.getContext("2d");
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, state.width, state.height);
    return context;
  }

  function drawLine(context, x1, y1, x2, y2, color = "#d9d1c3", width = 1, dash = []) {
    context.save();
    context.strokeStyle = color;
    context.lineWidth = width;
    context.setLineDash(dash);
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.restore();
  }

  function drawText(context, text, x, y, options = {}) {
    context.save();
    context.fillStyle = options.color || "#697496";
    context.font = options.font || "12px SFMono-Regular, Consolas, monospace";
    context.textAlign = options.align || "left";
    context.textBaseline = options.baseline || "middle";
    if (options.rotate) {
      context.translate(x, y);
      context.rotate(options.rotate);
      context.fillText(text, 0, 0);
    } else context.fillText(text, x, y);
    context.restore();
  }

  function drawBase(context) {
    const m = chartMetrics();
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, state.width, state.height);
    drawLine(context, m.left, m.policyY, m.right, m.policyY, "#6c8cc7", 1.25);
    drawLine(context, m.left, m.aiY, m.right, m.aiY, "#f9c0c7", 1.25);
    drawLine(context, m.left, m.diaryY, m.right, m.diaryY, "#56bdda", 1.25);
    drawText(context, bilingual("政策", "Policy"), 8, m.policyY, { color: "#6c8cc7", font: "700 12px SFMono-Regular, Consolas, monospace" });
    drawText(context, bilingual("AI／技术", "AI / tech"), 8, m.aiY, { color: "#f9c0c7", font: "700 12px SFMono-Regular, Consolas, monospace" });
    drawText(context, bilingual("个人日记", "Diary"), 8, m.diaryY, { color: "#56bdda", font: "700 12px SFMono-Regular, Consolas, monospace" });
    drawTimeAxis(context, m);
  }

  function drawTimeAxis(context, m) {
    const cursor = new Date(START.getFullYear(), START.getMonth() + 1, 1, 12);
    while (cursor <= END) {
      const x = xForDate(cursor);
      const isYear = cursor.getMonth() === 0;
      if (isYear || state.zoom !== "fit") drawLine(context, x, m.plotTop - 16, x, m.plotBottom, isYear ? "#d7dced" : "#edf0f7", isYear ? 1 : .7);
      if (isYear) drawText(context, String(cursor.getFullYear()), x + 5, m.plotTop - 30, { color: "#3e4664", font: "700 18px Georgia, serif" });
      else if (state.zoom !== "fit" && (state.zoom === "week" || cursor.getMonth() % 3 === 0)) drawText(context, monthLabel(cursor), x + 4, m.plotTop - 25, { font: "12px SFMono-Regular, Consolas, monospace" });
      cursor.setMonth(cursor.getMonth() + 1);
    }
    drawLine(context, xForDate(START), 30, xForDate(START), m.plotBottom, "#3e4664", 1.4);
    drawText(context, "2023.08.19", xForDate(START) + 5, m.plotTop - 30, { color: "#3e4664", font: "700 18px Georgia, serif" });
  }

  function drawAtlas(context) {
    const m = chartMetrics();
    const height = m.plotBottom - m.plotTop;
    for (let hour = 0; hour <= 24; hour += 3) {
      const y = m.plotTop + (hour / 24) * height;
      drawLine(context, m.left, y, m.right, y, hour % 6 === 0 ? "#d7dced" : "#edf0f7", hour % 6 === 0 ? 1 : .65);
      drawText(context, `${String(hour).padStart(2, "0")}:00`, m.left - 8, y, { align: "right" });
    }
    const dayWidth = (m.right - m.left) / (TOTAL_DAYS - 1);
    calendar.forEach((item) => {
      if (!state.enabledCategories.has(item.category)) return;
      const x = xForDate(item.startDate);
      const startMinutes = item.startDate.getHours() * 60 + item.startDate.getMinutes();
      const endMinutes = item.endDate.toDateString() === item.startDate.toDateString()
        ? item.endDate.getHours() * 60 + item.endDate.getMinutes()
        : 1440;
      const y = m.plotTop + (startMinutes / 1440) * height;
      const h = item.allDay ? 4 : Math.max(2, ((Math.max(startMinutes + 5, endMinutes) - startMinutes) / 1440) * height);
      const w = Math.max(state.zoom === "fit" ? 1.25 : 2.2, dayWidth * .72);
      context.globalAlpha = state.zoom === "fit" ? .5 : .68;
      context.fillStyle = category(item.category).color;
      context.fillRect(x - w / 2, y, w, Math.min(h, m.plotBottom - y));
      context.globalAlpha = 1;
      state.hitRegions.push({ x: x - Math.max(3, w), y: y - 2, width: Math.max(6, w * 2), height: Math.max(6, h + 4), type: "calendar", item });
    });
    drawText(context, bilingual("一天中的时间", "Time of day"), 10, (m.plotTop + m.plotBottom) / 2, { rotate: -Math.PI / 2, color: "#3e4664" });
  }

  function drawMatrix(context) {
    const m = chartMetrics();
    const rowHeight = (m.plotBottom - m.plotTop) / CATEGORIES.length;
    const maxima = Object.fromEntries(CATEGORIES.map((item) => [item.id, Math.max(...monthBuckets.map((bucket) => bucket.counts[item.id]), 1)]));
    CATEGORIES.forEach((cat, row) => {
      const y = m.plotTop + row * rowHeight;
      drawLine(context, m.left, y, m.right, y, "#edf0f7", .9);
      drawText(context, bilingual(cat.zh, cat.en), m.left - 10, y + rowHeight / 2, { align: "right", color: state.enabledCategories.has(cat.id) ? cat.color : "#b7cbdb", font: "12px SFMono-Regular, Consolas, monospace" });
      monthBuckets.forEach((bucket) => {
        const x1 = xForDate(bucket.start);
        const x2 = xForDate(new Date(bucket.start.getFullYear(), bucket.start.getMonth() + 1, 1, 12));
        const count = bucket.counts[cat.id];
        const alpha = state.enabledCategories.has(cat.id) ? .08 + (count / maxima[cat.id]) * .9 : .03;
        context.save();
        context.globalAlpha = alpha;
        context.fillStyle = cat.color;
        context.fillRect(x1 + .5, y + 2, Math.max(1, x2 - x1 - 1), rowHeight - 4);
        context.restore();
        if (x2 - x1 > 42 && count > 0) drawText(context, String(count), (x1 + x2) / 2, y + rowHeight / 2, { align: "center", color: alpha > .55 ? "#ffffff" : "#3e4664", font: "12px SFMono-Regular, monospace" });
        state.hitRegions.push({ x: x1, y, width: Math.max(2, x2 - x1), height: rowHeight, type: "month", item: { bucket, category: cat, count } });
      });
    });
    drawLine(context, m.left, m.plotBottom, m.right, m.plotBottom, "#edf0f7", .9);
  }

  function drawBubbles(context) {
    const m = chartMetrics();
    const height = m.plotBottom - m.plotTop;
    for (let hour = 0; hour <= 24; hour += 3) {
      const y = m.plotTop + (hour / 24) * height;
      drawLine(context, m.left, y, m.right, y, hour % 6 === 0 ? "#d7dced" : "#edf0f7", hour % 6 === 0 ? .9 : .6);
      drawText(context, `${String(hour).padStart(2, "0")}:00`, m.left - 8, y, { align: "right" });
    }
    const maxHours = Math.max(...weekBuckets.flatMap((bucket) => CATEGORIES.map((cat) => bucket.hours[cat.id])), 1);
    weekBuckets.forEach((bucket) => {
      CATEGORIES.forEach((cat) => {
        const count = bucket.counts[cat.id];
        if (!count || !state.enabledCategories.has(cat.id)) return;
        const averageHour = bucket.hourTotal[cat.id] / count;
        const x = xForDate(new Date(bucket.start.getTime() + 3.5 * DAY));
        const y = m.plotTop + (averageHour / 24) * height;
        const radius = clamp(2 + Math.sqrt(bucket.hours[cat.id] / maxHours) * 21, 2.5, 23);
        context.save();
        context.globalAlpha = .36;
        context.fillStyle = cat.color;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = .92;
        context.strokeStyle = cat.color;
        context.lineWidth = .8;
        context.stroke();
        context.restore();
        state.hitRegions.push({ x: x - radius, y: y - radius, width: radius * 2, height: radius * 2, type: "week", item: { bucket, category: cat, count, averageHour } });
      });
    });
    drawText(context, bilingual("平均开始时间", "Average start time"), 10, (m.plotTop + m.plotBottom) / 2, { rotate: -Math.PI / 2, color: "#3e4664" });
  }

  function drawPulse(context) {
    const m = chartMetrics();
    const rowHeight = (m.plotBottom - m.plotTop) / CATEGORIES.length;
    CATEGORIES.forEach((cat, index) => {
      const top = m.plotTop + index * rowHeight;
      const baseline = top + rowHeight - 8;
      const max = Math.max(...weekBuckets.map((bucket) => bucket.counts[cat.id]), 1);
      drawLine(context, m.left, baseline, m.right, baseline, "#edf0f7", .8);
      drawText(context, bilingual(cat.zh, cat.en), m.left - 10, top + rowHeight / 2, { align: "right", color: state.enabledCategories.has(cat.id) ? cat.color : "#b7cbdb", font: "12px SFMono-Regular, Consolas, monospace" });
      if (!state.enabledCategories.has(cat.id)) return;
      context.save();
      context.beginPath();
      weekBuckets.forEach((bucket, bucketIndex) => {
        const x = xForDate(new Date(bucket.start.getTime() + 3.5 * DAY));
        const y = baseline - (bucket.counts[cat.id] / max) * (rowHeight - 18);
        if (bucketIndex === 0) context.moveTo(x, y); else context.lineTo(x, y);
      });
      context.lineTo(xForDate(new Date(weekBuckets.at(-1).start.getTime() + 3.5 * DAY)), baseline);
      context.lineTo(xForDate(new Date(weekBuckets[0].start.getTime() + 3.5 * DAY)), baseline);
      context.closePath();
      context.globalAlpha = .14;
      context.fillStyle = cat.color;
      context.fill();
      context.globalAlpha = .9;
      context.strokeStyle = cat.color;
      context.lineWidth = 1.15;
      context.stroke();
      context.restore();
    });
  }

  function renderLegend() {
    categoryLegend.innerHTML = CATEGORIES.map((item) => `
      <button class="category-button${state.enabledCategories.has(item.id) ? " is-active" : ""}" type="button" data-category="${item.id}" aria-pressed="${state.enabledCategories.has(item.id)}">
        <i class="category-swatch" style="background:${item.color}"></i>
        ${biMarkup(item.zh, item.en)}
        <span class="category-count">${categoryCounts[item.id].toLocaleString()}</span>
      </button>`).join("");
    categoryLegend.querySelectorAll("[data-category]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.category;
        if (state.enabledCategories.has(id)) state.enabledCategories.delete(id); else state.enabledCategories.add(id);
        renderLegend();
        render();
      });
    });
  }

  function renderMarkers() {
    const m = chartMetrics();
    const nodes = [];
    const labelLastX = { policy: -Infinity, ai: -Infinity, diary: -Infinity };
    const edgeClass = (x) => x < m.left + 120 ? " edge-start" : x > m.right - 120 ? " edge-end" : "";
    macro.forEach((item) => {
      if (!state.layers.has(item.kind)) return;
      const x = xForDate(item.date);
      const y = item.kind === "policy" ? m.policyY : m.aiY;
      const selected = state.selected?.type === "macro" && state.selected.item.id === item.id;
      nodes.push(`<button class="event-marker ${item.kind}${selected ? " is-selected" : ""}" type="button" data-macro="${escapeHtml(item.id)}" style="left:${x}px;top:${y}px" aria-label="${escapeHtml(`${formatDate(item.date)} ${visibleText(item.title, item.en[0])}`)}"></button>`);
      const minGap = state.zoom === "fit" ? 360 : 260;
      if (x - labelLastX[item.kind] > minGap) {
        labelLastX[item.kind] = x;
        const top = item.kind === "policy" ? m.policyY - 14 : m.aiY + 16;
        nodes.push(`<span class="event-label ${item.kind}${edgeClass(x)}" style="left:${x}px;top:${top}px"><strong>${formatDate(item.date)}</strong>${escapeHtml(visibleText(item.title, item.en[0]))}</span>`);
      }
    });
    let lastDiaryX = -Infinity;
    let diaryClusterIndex = 0;
    const diaryOffsets = [0, -12, 12, -24, 24, -36, 36];
    diaries.forEach((item) => {
      if (!state.layers.has("diary")) return;
      const x = xForDate(item.date);
      diaryClusterIndex = x - lastDiaryX < 15 ? diaryClusterIndex + 1 : 0;
      lastDiaryX = x;
      const y = m.diaryY + diaryOffsets[diaryClusterIndex % diaryOffsets.length];
      const selected = state.selected?.type === "diary" && state.selected.item.id === item.id;
      nodes.push(`<button class="event-marker diary${selected ? " is-selected" : ""}" type="button" data-diary="${escapeHtml(item.id)}" style="left:${x}px;top:${y}px" aria-label="${escapeHtml(`${formatDate(item.date)} ${visibleText(item.title, item.en[0])}`)}"></button>`);
      const minGap = state.zoom === "fit" ? 380 : 280;
      if (x - labelLastX.diary > minGap) {
        labelLastX.diary = x;
        nodes.push(`<span class="event-label diary${edgeClass(x)}" style="left:${x}px;top:${m.diaryY + 18}px"><strong>${formatDate(item.date)}</strong>${escapeHtml(visibleText(item.title, item.en[0]))}</span>`);
      }
    });
    markerLayer.innerHTML = nodes.join("");
    markerLayer.querySelectorAll("[data-macro]").forEach((button) => {
      const item = macro.find((entry) => entry.id === button.dataset.macro);
      bindMarker(button, "macro", item);
    });
    markerLayer.querySelectorAll("[data-diary]").forEach((button) => {
      const item = diaries.find((entry) => entry.id === button.dataset.diary);
      bindMarker(button, "diary", item);
    });
  }

  function bindMarker(button, type, item) {
    button.addEventListener("click", () => select(type, item));
    button.addEventListener("mouseenter", () => showMarkerTooltip(button, type, item));
    button.addEventListener("mouseleave", hideTooltip);
    button.addEventListener("focus", () => showMarkerTooltip(button, type, item));
    button.addEventListener("blur", hideTooltip);
  }

  function showMarkerTooltip(button, type, item) {
    const x = parseFloat(button.style.left);
    const y = parseFloat(button.style.top);
    const title = visibleText(item.title, item.en[0]);
    tooltip.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${formatDate(item.date)}</span>`;
    tooltip.style.left = `${clamp(x + 12, 8, state.width - 250)}px`;
    tooltip.style.top = `${clamp(y + 12, 8, state.height - 100)}px`;
    tooltip.hidden = false;
  }

  function hideTooltip() { tooltip.hidden = true; }

  function render(anchor = null) {
    const remembered = anchor || centerDate();
    setStageWidth(remembered);
    const context = setupCanvas();
    state.hitRegions = [];
    drawBase(context);
    if (state.view === "atlas") drawAtlas(context);
    else if (state.view === "matrix") drawMatrix(context);
    else if (state.view === "bubbles") drawBubbles(context);
    else drawPulse(context);
    renderMarkers();
  }

  function centerDate() {
    if (!state.width) return START;
    const m = chartMetrics();
    const x = scroll.scrollLeft + scroll.clientWidth / 2;
    const ratio = clamp((x - m.left) / Math.max(1, m.right - m.left), 0, 1);
    return new Date(START.getTime() + ratio * (TOTAL_DAYS - 1) * DAY);
  }

  function select(type, item) {
    state.selected = { type, item };
    renderMarkers();
    renderDetail();
  }

  function renderDetail() {
    const selected = state.selected;
    if (!selected) return;
    const { type, item } = selected;
    if (type === "macro") {
      detailType.textContent = item.kind === "policy"
        ? bilingual("公共事件／政策", "Public event / Policy")
        : bilingual("公共事件／AI 与技术", "Public event / AI & technology");
      detailDate.textContent = formatDate(item.date);
      detailDate.dateTime = item.date;
      detailTitleZh.textContent = item.title;
      detailTitleEn.textContent = item.en[0];
      detailBodyZh.textContent = item.summary;
      detailBodyEn.textContent = item.en[1];
      detailMeta.innerHTML = `<span>${escapeHtml(bilingual(item.status, item.en[2]))}</span><span>${escapeHtml(bilingual(item.scope, item.en[3]))}</span><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(bilingual("官方来源", "Official source"))} ↗</a>`;
    } else if (type === "diary") {
      detailType.textContent = bilingual("个人记录／日记", "Private record / Diary");
      detailDate.textContent = item.dateEnd ? `${formatDate(item.date)}—${formatDate(item.dateEnd)}` : formatDate(item.date);
      detailDate.dateTime = item.date;
      detailTitleZh.textContent = item.title;
      detailTitleEn.textContent = item.en[0];
      detailBodyZh.textContent = item.excerpt;
      detailBodyEn.textContent = item.en[1];
      detailMeta.innerHTML = `<span>${escapeHtml(item.precision === "day" ? bilingual("准确到日", "Exact date") : bilingual("日期范围", "Date range"))}</span><span>${escapeHtml(state.language === "en" ? "Selected Notion note" : item.tags.join(" · "))}</span><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHtml(bilingual("Notion 来源", "Notion source"))} ↗</a>`;
    } else if (type === "calendar") {
      const cat = category(item.category);
      const englishTitle = calendarEnglishTitle(item.title);
      const duration = calendarDuration(item);
      detailType.textContent = bilingual("个人记录／Apple 日历", "Private record / Apple Calendar");
      detailDate.textContent = formatDate(item.startDate);
      detailDate.dateTime = formatDate(item.startDate).replaceAll(".", "-");
      detailTitleZh.textContent = item.title || "未命名日历事件";
      detailTitleEn.textContent = englishTitle;
      detailBodyZh.textContent = `这是一项具体的日历记录：${formatTime(item.startDate)} 至 ${formatTime(item.endDate)}，共 ${duration} 分钟。它来自“${item.calendar || "未分类"}”日历，并被归入“${cat.zh}”。`;
      detailBodyEn.textContent = `This specific calendar event runs from ${formatTime(item.startDate)} to ${formatTime(item.endDate)} for ${duration} minutes. It comes from the “${item.calendar || "Uncategorized"}” calendar and is classified as “${cat.en}.”`;
      detailMeta.innerHTML = `<span>${escapeHtml(bilingual("日历", "Calendar"))}: ${escapeHtml(item.calendar || "—")}</span><span>${escapeHtml(bilingual("生活类别", "Life category"))}: ${escapeHtml(bilingual(cat.zh, cat.en))}</span>`;
    } else {
      renderAggregateDetail(type, item);
    }
  }

  function renderAggregateDetail(type, item) {
    const cat = item.category;
    const start = item.bucket.start;
    const periodZh = type === "month" ? `${start.getFullYear()} 年 ${start.getMonth() + 1} 月` : `${formatDate(start)} 开始的一周`;
    const periodEn = type === "month" ? `${start.toLocaleString("en-US", { month: "long" })} ${start.getFullYear()}` : `Week beginning ${formatDate(start)}`;
    detailType.textContent = type === "month"
      ? bilingual("月份 × 生活类别", "Month × life category")
      : bilingual("每周 × 生活类别", "Week × life category");
    detailDate.textContent = formatDate(start);
    detailTitleZh.textContent = `${periodZh} · ${cat.zh}`;
    detailTitleEn.textContent = `${periodEn} · ${cat.en}`;
    const hours = item.bucket.hours[cat.id];
    detailBodyZh.textContent = `这一格包含 ${item.count} 条“${cat.zh}”记录，累计约 ${hours.toFixed(1)} 小时。颜色深浅或气泡大小用于比较数量，不代表事情的重要程度。`;
    detailBodyEn.textContent = `This cell contains ${item.count} “${cat.en}” records totaling about ${hours.toFixed(1)} hours. Shade or bubble size compares volume, not importance.`;
    detailMeta.innerHTML = `<span>${escapeHtml(bilingual("记录数量", "Records"))}: ${item.count}</span><span>${escapeHtml(bilingual("累计时长", "Total duration"))}: ${hours.toFixed(1)}h</span>`;
  }

  function hitAt(x, y) {
    let best = null;
    let area = Infinity;
    for (const region of state.hitRegions) {
      if (x < region.x || x > region.x + region.width || y < region.y || y > region.y + region.height) continue;
      const nextArea = region.width * region.height;
      if (nextArea < area) { best = region; area = nextArea; }
    }
    return best;
  }

  function canvasPoint(event) {
    const bounds = canvas.getBoundingClientRect();
    return { x: ((event.clientX - bounds.left) / bounds.width) * state.width, y: ((event.clientY - bounds.top) / bounds.height) * state.height };
  }

  canvas.addEventListener("click", (event) => {
    const point = canvasPoint(event);
    const region = hitAt(point.x, point.y);
    if (region) select(region.type, region.item);
  });

  canvas.addEventListener("mousemove", (event) => {
    const point = canvasPoint(event);
    const region = hitAt(point.x, point.y);
    if (!region) { hideTooltip(); return; }
    let titleZh;
    let titleEn;
    let meta;
    if (region.type === "calendar") {
      const cat = category(region.item.category);
      titleZh = region.item.title || "未命名日历事件";
      titleEn = calendarEnglishTitle(region.item.title);
      meta = `${formatDate(region.item.startDate)} · ${formatTime(region.item.startDate)} · ${bilingual(cat.zh, cat.en)}`;
    } else {
      const cat = region.item.category;
      titleZh = cat.zh; titleEn = cat.en; meta = `${region.item.count} ${bilingual("条记录", "records")}`;
    }
    tooltip.innerHTML = `<strong>${escapeHtml(visibleText(titleZh, titleEn))}</strong><span>${escapeHtml(meta)}</span>`;
    tooltip.style.left = `${clamp(point.x + 12, 8, state.width - 250)}px`;
    tooltip.style.top = `${clamp(point.y + 12, 8, state.height - 95)}px`;
    tooltip.hidden = false;
  });

  canvas.addEventListener("mouseleave", hideTooltip);

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      document.querySelectorAll("[data-view]").forEach((item) => item.classList.toggle("is-active", item === button));
      render();
    });
  });

  document.querySelectorAll("[data-zoom]").forEach((button) => {
    button.addEventListener("click", () => {
      const anchor = centerDate();
      state.zoom = button.dataset.zoom;
      document.querySelectorAll("[data-zoom]").forEach((item) => item.classList.toggle("is-active", item === button));
      render(anchor);
    });
  });

  document.querySelectorAll("[data-layer]").forEach((button) => {
    button.addEventListener("click", () => {
      const layer = button.dataset.layer;
      if (state.layers.has(layer)) state.layers.delete(layer); else state.layers.add(layer);
      const active = state.layers.has(layer);
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      renderMarkers();
    });
  });

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      state.language = button.dataset.language;
      document.body.dataset.lang = state.language;
      document.documentElement.lang = state.language === "en" ? "en" : "zh-CN";
      document.querySelectorAll("[data-language]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderLegend();
      render();
      renderDetail();
    });
  });

  let dragging = false;
  let dragStart = 0;
  let scrollStart = 0;
  scroll.addEventListener("pointerdown", (event) => { if (event.target.closest("button")) return; dragging = true; dragStart = event.clientX; scrollStart = scroll.scrollLeft; scroll.setPointerCapture(event.pointerId); });
  scroll.addEventListener("pointermove", (event) => { if (dragging) scroll.scrollLeft = scrollStart - (event.clientX - dragStart); });
  scroll.addEventListener("pointerup", () => { dragging = false; });
  scroll.addEventListener("pointercancel", () => { dragging = false; });

  let resizeFrame;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => render(centerDate()));
  });

  renderLegend();
  render(START);
  renderDetail();
  scroll.scrollLeft = 0;
})();
