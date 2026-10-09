(() => {
  const data = window.SELF_RECORD_DATA;
  const state = { lang: "zh", calendarSelected: null, focusMotif: null, view: "field" };
  const maxSearchResults = 12;
  const timeFieldWidth = 3600;
  const calendarHeight = 650;
  const calendarMarks = [];
  let currentCalendarWidth = timeFieldWidth;
  let calendarHoverTimer = null;

  const $ = (id) => document.getElementById(id);
  const pageEyebrow = $("page-eyebrow");
  const pageTitle = $("page-title");
  const pageLede = $("page-lede");
  const searchLabel = $("search-label");
  const searchInput = $("archive-search-input");
  const searchCount = $("search-count");
  const searchResults = $("search-results");
  const calendarTitle = $("calendar-title");
  const calendarCopy = $("calendar-copy");
  const hourAxis = $("hour-axis");
  const calendarCanvas = $("calendar-canvas");
  const calendarGuide = $("calendar-guide");
  const calendarHover = $("calendar-hover");
  const motifSummary = $("motif-summary");
  const motifOptions = $("motif-options");
  const projectQuestionLabel = $("project-question-label");
  const projectQuestionTitle = $("project-question-title");
  const projectQuestionNote = $("project-question-note");
  const anchorControls = $("anchor-controls");
  const anchorLabel = $("anchor-label");
  const anchorInstruction = $("anchor-instruction");
  const viewOptions = $("view-options");
  const anchorLegend = $("anchor-legend");
  const calendarStage = document.querySelector(".calendar-stage");
  const calendarDetailLabel = $("calendar-detail-label");
  const calendarDetailTitle = $("calendar-detail-title");
  const calendarDetailSummary = $("calendar-detail-summary");
  const calendarFacts = $("calendar-facts");
  const dayContext = $("day-context");
  const dayContextIntro = $("day-context-intro");
  const dayContextList = $("day-context-list");
  const methodNote = $("method-note");

  const copy = {
    zh: {
      eyebrow: "个人记录 / 2023—2026",
      title: "我并不是通过记录解释生活；我是在一次次记录中，与经过的时间建立关系。",
      lede: "四年里留下的每一条线都保留在这里。先看见整体，再靠近其中一天。",
      questionLabel: "正在测试的问题",
      questionTitle: "当相同的记录被放回它前后的生活中，它还是同一件事吗？",
      questionNote: "选择一个反复出现的记录。先看它散落在三年中，再让每一次发生成为同一个时间零点。",
      searchLabel: "搜索个人记录",
      searchPlaceholder: "搜索事件、日历或地点…",
      searchIdle: "APPLE CALENDAR",
      searchFound: (count) => `找到 ${count.toLocaleString("zh-CN")} 条`,
      searchShowing: (shown, count) => `显示 ${shown} / ${count.toLocaleString("zh-CN")}`,
      searchEmpty: "没有找到匹配的记录。",
      searchCalendar: "日历",
      calendarTitle: "四年个人时间场",
      calendarCopy: "横轴是日期，纵轴是一天中的时间。每条线是一项日历事件，线长是持续时间。",
      calendarEmptyTitle: "选择一项日历事件",
      calendarEmptySummary: "点击时间场中的线查看标题、来源日历和时间。",
      calendarDetailLabel: "由我创建或保存在 Apple Calendar 中",
      motifLabel: "反复出现的记录",
      motifAll: "全部记录",
      motifIdle: "选择一个反复出现的词。它会在完整时间场中被看见，其他生活仍留在背景里。",
      motifActive: (title, count, start, end) => `“${title}”从 ${start} 到 ${end} 出现了 ${count} 次。它不是被从生活中抽离出来，而是在完整时间场里一次次重新出现。`,
      anchorLabel: "观看方式",
      fieldView: "散落在三年中",
      anchorView: (title) => `以“${title}”为中心`,
      fieldInstruction: (title, count) => `先观察“${title}”的 ${count} 次出现如何散落在三年中。`,
      anchorInstruction: (title, count) => `这里的每一行都是一次“${title}”。橙色中心是它发生的时刻；黑色痕迹是前后六小时的生活。`,
      anchorLegend: "所选记录 / 时间零点",
      contextLegend: "前后六小时的其他记录",
      dayContext: (date, count) => `${date} 还留下了 ${count} 条记录。点击其中一条，继续阅读这一天。`,
      method: `Apple Calendar 排除了 ${data.summary.appleRaw - data.summary.appleIncluded} 条公共节日。这里呈现其余 ${data.summary.appleIncluded.toLocaleString("zh-CN")} 条个人日历记录。`,
      labels: { source: "来源", calendar: "日历", start: "开始", end: "结束", created: "创建", modified: "修改", location: "地点" },
    },
    en: {
      eyebrow: "PERSONAL RECORD / 2023—2026",
      title: "I do not record to explain my life; through each act of recording, I build a relationship with passing time.",
      lede: "Every line left across four years remains here. See the whole field first, then move closer to one day.",
      questionLabel: "QUESTION UNDER TEST",
      questionTitle: "When the same record is returned to the life around it, is it still the same thing?",
      questionNote: "Choose a recurring record. First see it dispersed across three years, then make each occurrence the same zero point in time.",
      searchLabel: "SEARCH PERSONAL RECORDS",
      searchPlaceholder: "Search events, calendars, or locations…",
      searchIdle: "APPLE CALENDAR",
      searchFound: (count) => `${count.toLocaleString("en-US")} RESULTS`,
      searchShowing: (shown, count) => `${shown} / ${count.toLocaleString("en-US")} SHOWN`,
      searchEmpty: "No matching records.",
      searchCalendar: "CALENDAR",
      calendarTitle: "Four years of personal time",
      calendarCopy: "The x-axis is date and the y-axis is time of day. Each line is one calendar event; its length is the event duration.",
      calendarEmptyTitle: "Select a calendar event",
      calendarEmptySummary: "Select a line to view its title, source calendar, and time.",
      calendarDetailLabel: "Created by me or kept in Apple Calendar",
      motifLabel: "RECURRING RECORDS",
      motifAll: "All records",
      motifIdle: "Choose a recurring phrase. It becomes visible within the whole field while the rest of life remains in the background.",
      motifActive: (title, count, start, end) => `“${title}” appears ${count} times from ${start} to ${end}. It is not removed from life; it returns inside the complete field of time.`,
      anchorLabel: "WAY OF SEEING",
      fieldView: "Dispersed across three years",
      anchorView: (title) => `Center every “${title}”`,
      fieldInstruction: (title, count) => `First notice how the ${count} occurrences of “${title}” remain dispersed across three years.`,
      anchorInstruction: (title) => `Each row is one “${title}”. The orange center is its moment; the black traces are the six hours before and after it.`,
      anchorLegend: "Selected record / time zero",
      contextLegend: "Other records within six hours",
      dayContext: (date, count) => `${date} left ${count} other records. Choose one to continue reading this day.`,
      method: `Apple Calendar excludes ${data.summary.appleRaw - data.summary.appleIncluded} public-holiday entries. The field presents the remaining ${data.summary.appleIncluded.toLocaleString("en-US")} personal calendar records.`,
      labels: { source: "Source", calendar: "Calendar", start: "Start", end: "End", created: "Created", modified: "Modified", location: "Location" },
    },
  };

  function css(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function setupCanvas(canvas, width, height) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }

  function dateValue(value) {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function xForDate(value) {
    const start = new Date(data.range.start).getTime();
    const end = new Date(data.range.end).getTime();
    return 22 + ((value.getTime() - start) / (end - start)) * (timeFieldWidth - 44);
  }

  function yForTime(value) {
    const minutes = value.getHours() * 60 + value.getMinutes();
    return 34 + (minutes / 1440) * (calendarHeight - 70);
  }

  function setCalendarStageWidth(width) {
    currentCalendarWidth = width;
    calendarStage.style.width = `${width}px`;
  }

  function drawTimeField() {
    setCalendarStageWidth(timeFieldWidth);
    const ctx = setupCanvas(calendarCanvas, timeFieldWidth, calendarHeight);
    const ink = css("--ink");
    const line = css("--line");
    const apple = css("--apple");
    calendarMarks.length = 0;
    ctx.clearRect(0, 0, timeFieldWidth, calendarHeight);

    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    for (let hour = 0; hour <= 24; hour += 3) {
      const y = 34 + (hour / 24) * (calendarHeight - 70);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(timeFieldWidth, y);
      ctx.stroke();
    }

    ctx.fillStyle = ink;
    ctx.font = "11px Helvetica Neue, Helvetica, Arial, sans-serif";
    ctx.textBaseline = "top";
    [2024, 2025, 2026].forEach((year) => {
      const date = new Date(year, 0, 1);
      const x = xForDate(date);
      ctx.strokeStyle = line;
      ctx.beginPath();
      ctx.moveTo(x, 12);
      ctx.lineTo(x, calendarHeight - 18);
      ctx.stroke();
      ctx.fillStyle = ink;
      ctx.fillText(String(year), x + 6, 12);
    });

    data.apple.forEach((event) => {
      const start = dateValue(event.start);
      const end = dateValue(event.end);
      if (!start || !end) return;
      const x = xForDate(start);
      const y1 = event.allDay ? 25 : yForTime(start);
      let y2 = event.allDay ? 31 : yForTime(end);
      if (!event.allDay && (end.toDateString() !== start.toDateString() || y2 <= y1)) y2 = calendarHeight - 38;
      if (y2 - y1 < 3) y2 = y1 + 3;
      const selected = state.calendarSelected && state.calendarSelected.id === event.id;
      const motifMatch = !state.focusMotif || normalized(event.title) === state.focusMotif.key;
      ctx.save();
      ctx.strokeStyle = apple;
      ctx.lineWidth = selected ? 4 : state.focusMotif && motifMatch ? 2.25 : 1.35;
      ctx.globalAlpha = selected ? 1 : state.focusMotif ? (motifMatch ? 0.92 : 0.075) : 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.stroke();
      ctx.restore();
      calendarMarks.push({ event, x, x1: x, x2: x, y1, y2 });
    });
  }

  function xForRelativeMinutes(minutes, width) {
    const bounded = Math.max(-360, Math.min(360, minutes));
    return 34 + ((bounded + 360) / 720) * (width - 68);
  }

  function drawAnchorField() {
    if (!state.focusMotif) return;
    const scroll = $("calendar-scroll");
    const width = Math.max(760, Math.floor(scroll.clientWidth || 1040));
    setCalendarStageWidth(width);
    const ctx = setupCanvas(calendarCanvas, width, calendarHeight);
    const ink = css("--ink");
    const line = css("--line");
    const apple = css("--apple");
    const anchors = [...state.focusMotif.events]
      .filter((event) => dateValue(event.start))
      .sort((a, b) => dateValue(a.start) - dateValue(b.start));
    const top = 58;
    const bottom = calendarHeight - 24;
    const rowGap = anchors.length > 1 ? (bottom - top) / (anchors.length - 1) : 0;
    const centerX = xForRelativeMinutes(0, width);
    calendarMarks.length = 0;
    ctx.clearRect(0, 0, width, calendarHeight);

    [-360, -180, 0, 180, 360].forEach((minutes) => {
      const x = xForRelativeMinutes(minutes, width);
      ctx.strokeStyle = minutes === 0 ? apple : line;
      ctx.globalAlpha = minutes === 0 ? 0.8 : 1;
      ctx.lineWidth = minutes === 0 ? 1.5 : 1;
      ctx.beginPath();
      ctx.moveTo(x, 34);
      ctx.lineTo(x, calendarHeight - 12);
      ctx.stroke();
      ctx.fillStyle = minutes === 0 ? apple : ink;
      ctx.globalAlpha = 1;
      ctx.font = "11px Helvetica Neue, Helvetica, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const label = minutes === 0
        ? `${state.focusMotif.title} / 0`
        : `${minutes > 0 ? "+" : "−"}${Math.abs(minutes / 60)}h`;
      ctx.fillText(label, x, 12);
    });

    let previousYear = null;
    anchors.forEach((anchor, index) => {
      const anchorStart = dateValue(anchor.start);
      const year = anchorStart.getFullYear();
      const y = top + index * rowGap;
      if (year !== previousYear) {
        ctx.strokeStyle = line;
        ctx.globalAlpha = 0.7;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
        previousYear = year;
      }

      const windowStart = anchorStart.getTime() - 360 * 60000;
      const windowEnd = anchorStart.getTime() + 360 * 60000;
      data.apple.forEach((event) => {
        if (event.id === anchor.id || event.allDay) return;
        const eventStart = dateValue(event.start);
        const eventEnd = dateValue(event.end);
        if (!eventStart || !eventEnd || eventEnd.getTime() < windowStart || eventStart.getTime() > windowEnd) return;
        const startOffset = (eventStart.getTime() - anchorStart.getTime()) / 60000;
        const endOffset = (eventEnd.getTime() - anchorStart.getTime()) / 60000;
        const x1 = xForRelativeMinutes(startOffset, width);
        let x2 = xForRelativeMinutes(endOffset, width);
        if (Math.abs(x2 - x1) < 2) x2 = x1 + 2;
        const selected = state.calendarSelected && state.calendarSelected.id === event.id;
        ctx.strokeStyle = ink;
        ctx.globalAlpha = selected ? 0.95 : 0.28;
        ctx.lineWidth = selected ? 2.5 : Math.max(0.7, Math.min(1.3, rowGap * 0.7));
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
        calendarMarks.push({ event, x: (x1 + x2) / 2, x1, x2, y1: y - 3, y2: y + 3 });
      });

      const anchorEnd = dateValue(anchor.end);
      const anchorDuration = anchorEnd ? Math.max(3, (anchorEnd.getTime() - anchorStart.getTime()) / 60000) : 3;
      let anchorEndX = xForRelativeMinutes(anchorDuration, width);
      if (anchorEndX - centerX < 3) anchorEndX = centerX + 3;
      const selected = state.calendarSelected && state.calendarSelected.id === anchor.id;
      ctx.strokeStyle = selected ? ink : apple;
      ctx.globalAlpha = 1;
      ctx.lineWidth = selected ? 3.5 : Math.max(1.5, Math.min(2.6, rowGap * 0.9));
      ctx.beginPath();
      ctx.moveTo(centerX, y);
      ctx.lineTo(anchorEndX, y);
      ctx.stroke();
      calendarMarks.push({ event: anchor, x: (centerX + anchorEndX) / 2, x1: centerX, x2: anchorEndX, y1: y - 4, y2: y + 4 });
    });
    ctx.globalAlpha = 1;
  }

  function drawCalendar() {
    if (state.view === "anchor" && state.focusMotif) drawAnchorField();
    else drawTimeField();
    drawHourAxis();
  }

  function drawHourAxis() {
    hourAxis.innerHTML = "";
    if (state.view === "anchor" && state.focusMotif) {
      const anchors = [...state.focusMotif.events]
        .filter((event) => dateValue(event.start))
        .sort((a, b) => dateValue(a.start) - dateValue(b.start));
      const top = 58;
      const bottom = calendarHeight - 24;
      const rowGap = anchors.length > 1 ? (bottom - top) / (anchors.length - 1) : 0;
      const seen = new Set();
      anchors.forEach((event, index) => {
        const year = dateValue(event.start).getFullYear();
        if (seen.has(year)) return;
        seen.add(year);
        const label = document.createElement("span");
        label.className = "hour-label anchor-year";
        label.style.top = `${top + index * rowGap}px`;
        label.textContent = year;
        hourAxis.appendChild(label);
      });
      return;
    }
    for (let hour = 0; hour <= 24; hour += 3) {
      const y = 34 + (hour / 24) * (calendarHeight - 70);
      const label = document.createElement("span");
      label.className = "hour-label";
      label.style.top = `${y}px`;
      label.textContent = `${String(hour).padStart(2, "0")}:00`;
      hourAxis.appendChild(label);
    }
  }

  function dateOnly(value) {
    const date = dateValue(value);
    if (!date) return "—";
    return new Intl.DateTimeFormat(state.lang === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }

  function dateKey(value) {
    const date = dateValue(value);
    if (!date) return "";
    return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  }

  function recurringMotifs() {
    const blocked = new Set(["new event", "新建日程", "yinan xue"]);
    const groups = new Map();
    data.apple.forEach((event) => {
      const key = normalized(event.title).trim();
      if (!key || blocked.has(key) || /^\d+$/.test(key) || key.length > 32) return;
      const group = groups.get(key) || { key, title: event.title.trim(), events: [] };
      group.events.push(event);
      groups.set(key, group);
    });
    return [...groups.values()]
      .filter((group) => group.events.length >= 8)
      .sort((a, b) => b.events.length - a.events.length || a.title.localeCompare(b.title))
      .slice(0, 20);
  }

  function renderMotifLens() {
    const text = copy[state.lang];
    const motifs = recurringMotifs();
    document.getElementById("trace-lens-label").textContent = text.motifLabel;
    motifOptions.setAttribute("aria-label", text.motifLabel);
    motifOptions.innerHTML = [
      `<button class="motif-option${state.focusMotif ? "" : " is-active"}" type="button" data-motif="">${escapeHtml(text.motifAll)} <span>${data.apple.length.toLocaleString(state.lang === "zh" ? "zh-CN" : "en-US")}</span></button>`,
      ...motifs.map((motif) => `<button class="motif-option${state.focusMotif && state.focusMotif.key === motif.key ? " is-active" : ""}" type="button" data-motif="${escapeHtml(motif.key)}">${escapeHtml(motif.title)} <span>${motif.events.length}</span></button>`),
    ].join("");

    if (!state.focusMotif) {
      motifSummary.textContent = text.motifIdle;
      return;
    }
    const current = motifs.find((motif) => motif.key === state.focusMotif.key) || state.focusMotif;
    const ordered = [...current.events].sort((a, b) => new Date(a.start) - new Date(b.start));
    motifSummary.textContent = text.motifActive(current.title, ordered.length, dateOnly(ordered[0]?.start), dateOnly(ordered.at(-1)?.start));
  }

  function renderAnchorControls() {
    const text = copy[state.lang];
    if (!state.focusMotif) {
      anchorControls.hidden = true;
      return;
    }
    anchorControls.hidden = false;
    anchorLabel.textContent = text.anchorLabel;
    anchorInstruction.textContent = state.view === "anchor"
      ? text.anchorInstruction(state.focusMotif.title, state.focusMotif.events.length)
      : text.fieldInstruction(state.focusMotif.title, state.focusMotif.events.length);
    const fieldButton = viewOptions.querySelector('[data-view="field"]');
    const anchorButton = viewOptions.querySelector('[data-view="anchor"]');
    fieldButton.textContent = text.fieldView;
    anchorButton.textContent = text.anchorView(state.focusMotif.title);
    viewOptions.setAttribute("aria-label", text.anchorLabel);
    viewOptions.querySelectorAll(".view-option").forEach((button) => {
      const active = button.dataset.view === state.view;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    anchorLegend.hidden = state.view !== "anchor";
    anchorLegend.querySelector(".legend-anchor").textContent = text.anchorLegend;
    anchorLegend.querySelector(".legend-context").textContent = text.contextLegend;
    calendarCanvas.setAttribute(
      "aria-label",
      state.view === "anchor"
        ? `${state.focusMotif.title}: ${text.anchorInstruction(state.focusMotif.title, state.focusMotif.events.length)}`
        : calendarCopy.textContent,
    );
  }

  function closestMarkRecord(marks, x, y, maxDistance = 12) {
    let best = null;
    let bestDistance = maxDistance;
    marks.forEach((mark) => {
      const x1 = mark.x1 ?? mark.x;
      const x2 = mark.x2 ?? mark.x;
      const dx = x < x1 ? x1 - x : x > x2 ? x - x2 : 0;
      const dy = y < mark.y1 ? mark.y1 - y : y > mark.y2 ? y - mark.y2 : 0;
      const distance = Math.hypot(dx, dy);
      if (distance < bestDistance) {
        best = mark;
        bestDistance = distance;
      }
    });
    return best;
  }

  function closestMark(marks, x, y, itemKey) {
    const mark = closestMarkRecord(marks, x, y);
    return mark ? mark[itemKey] : null;
  }

  function visibleCalendarMarks() {
    if (state.view === "anchor") return calendarMarks;
    if (!state.focusMotif) return calendarMarks;
    return calendarMarks.filter((mark) => normalized(mark.event.title) === state.focusMotif.key);
  }

  function hideCalendarHover() {
    if (calendarHoverTimer) window.clearTimeout(calendarHoverTimer);
    calendarHoverTimer = null;
    calendarGuide.hidden = true;
    calendarHover.hidden = true;
  }

  function showCalendarHover(mark) {
    if (!mark) {
      hideCalendarHover();
      return;
    }
    const y = (mark.y1 + mark.y2) / 2;
    calendarGuide.style.left = `${mark.x}px`;
    calendarHover.style.left = `${Math.min(mark.x + 12, currentCalendarWidth - 292)}px`;
    calendarHover.style.top = `${Math.max(18, Math.min(y - 18, calendarHeight - 78))}px`;
    calendarHover.innerHTML = `<strong>${escapeHtml(mark.event.title)}</strong><span>${escapeHtml(formatDate(mark.event.start))}</span>`;
    calendarGuide.hidden = false;
    calendarHover.hidden = false;
    if (calendarHoverTimer) window.clearTimeout(calendarHoverTimer);
    calendarHoverTimer = window.setTimeout(hideCalendarHover, 1800);
  }

  function formatDate(value) {
    if (!value) return "—";
    const date = dateValue(value);
    if (!date) return value;
    return new Intl.DateTimeFormat(state.lang === "zh" ? "zh-CN" : "en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
  }

  function renderFacts(target, rows) {
    target.innerHTML = rows.filter(([, value]) => value).map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("");
  }

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }

  function renderCalendarDetail() {
    const text = copy[state.lang];
    const event = state.calendarSelected;
    calendarDetailLabel.textContent = text.calendarDetailLabel;
    if (!event) {
      calendarDetailTitle.textContent = text.calendarEmptyTitle;
      calendarDetailSummary.textContent = text.calendarEmptySummary;
      calendarFacts.innerHTML = "";
      dayContext.hidden = true;
      dayContextList.innerHTML = "";
      return;
    }
    calendarDetailTitle.textContent = event.title;
    calendarDetailSummary.textContent = `${event.source} / ${event.calendar}`;
    renderFacts(calendarFacts, [
      [text.labels.source, event.source],
      [text.labels.calendar, event.calendar],
      [text.labels.start, formatDate(event.start)],
      [text.labels.end, formatDate(event.end)],
      [text.labels.created, formatDate(event.created)],
      [text.labels.modified, formatDate(event.modified)],
      [text.labels.location, event.location],
    ]);

    const selectedDay = dateKey(event.start);
    const sameDay = data.apple
      .filter((item) => dateKey(item.start) === selectedDay)
      .sort((a, b) => new Date(a.start) - new Date(b.start));
    dayContext.hidden = false;
    dayContextIntro.textContent = text.dayContext(dateOnly(event.start), Math.max(0, sameDay.length - 1));
    dayContextList.innerHTML = sameDay.map((item) => {
      const start = dateValue(item.start);
      const time = item.allDay || !start
        ? (state.lang === "zh" ? "全天" : "ALL DAY")
        : `${String(start.getHours()).padStart(2, "0")}:${String(start.getMinutes()).padStart(2, "0")}`;
      const active = item.id === event.id ? " is-active" : "";
      return `<button class="day-trace${active}" type="button" data-event-id="${escapeHtml(item.id)}"><span class="day-trace-time">${escapeHtml(time)}</span><span class="day-trace-title">${escapeHtml(item.title)}</span><span class="day-trace-source apple">${escapeHtml(item.calendar)}</span></button>`;
    }).join("");
  }

  function normalized(value) {
    return String(value || "").normalize("NFKC").toLocaleLowerCase();
  }

  function scoreMatch(primary, secondary, query) {
    const main = normalized(primary);
    const supporting = normalized(secondary);
    if (main === query) return 0;
    if (main.startsWith(query)) return 1;
    if (main.includes(query)) return 2;
    if (supporting.includes(query)) return 3;
    return -1;
  }

  function searchArchive(queryValue) {
    const query = normalized(queryValue.trim());
    if (!query) return [];
    const results = [];
    data.apple.forEach((event) => {
      const secondary = [event.calendar, event.location, event.source].join(" ");
      const score = scoreMatch(event.title, secondary, query);
      if (score >= 0) results.push({ item: event, score });
    });
    return results.sort((a, b) => a.score - b.score || normalized(a.item.title).localeCompare(normalized(b.item.title)));
  }

  function renderSearchResults() {
    const text = copy[state.lang];
    const query = searchInput.value.trim();
    if (!query) {
      searchResults.hidden = true;
      searchResults.innerHTML = "";
      searchCount.textContent = text.searchIdle;
      return;
    }
    const matches = searchArchive(query);
    const visible = matches.slice(0, maxSearchResults);
    searchResults.hidden = false;
    searchCount.textContent = matches.length > maxSearchResults
      ? text.searchShowing(visible.length, matches.length)
      : text.searchFound(matches.length);
    if (!visible.length) {
      searchResults.innerHTML = `<p class="search-empty">${escapeHtml(text.searchEmpty)}</p>`;
      return;
    }
    searchResults.innerHTML = visible.map(({ item }) => {
      const meta = `${item.calendar} / ${formatDate(item.start)}`;
      return `<button class="search-result" type="button" data-id="${escapeHtml(item.id)}"><span class="search-kind">${escapeHtml(text.searchCalendar)}</span><span class="search-result-title">${escapeHtml(item.title)}</span><span class="search-result-meta">${escapeHtml(meta)}</span></button>`;
    }).join("");
  }

  function showCalendarResult(item) {
    state.calendarSelected = item;
    drawCalendar();
    renderCalendarDetail();
    renderAnchorControls();
    const start = dateValue(item.start);
    if (start && state.view === "field") {
      const scroll = $("calendar-scroll");
      scroll.scrollTo({ left: Math.max(0, xForDate(start) - scroll.clientWidth / 2), behavior: "smooth" });
    }
    document.querySelector(".calendar-section .detail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function openSearchResult(button) {
    const id = button.dataset.id;
    const item = data.apple.find((event) => event.id === id);
    if (item) showCalendarResult(item);
  }

  function renderLanguage() {
    const text = copy[state.lang];
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    pageEyebrow.textContent = text.eyebrow;
    pageTitle.textContent = text.title;
    pageLede.textContent = text.lede;
    projectQuestionLabel.textContent = text.questionLabel;
    projectQuestionTitle.textContent = text.questionTitle;
    projectQuestionNote.textContent = text.questionNote;
    searchLabel.textContent = text.searchLabel;
    searchInput.placeholder = text.searchPlaceholder;
    calendarTitle.textContent = text.calendarTitle;
    calendarCopy.textContent = text.calendarCopy;
    methodNote.textContent = text.method;
    $("apple-count").textContent = data.summary.appleIncluded.toLocaleString("en-US");
    document.querySelectorAll(".language-option").forEach((button) => {
      const active = button.dataset.lang === state.lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderMotifLens();
    renderAnchorControls();
    renderCalendarDetail();
    renderSearchResults();
  }

  searchInput.addEventListener("input", renderSearchResults);
  searchInput.addEventListener("search", renderSearchResults);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      searchInput.value = "";
      renderSearchResults();
    }
    if (event.key === "Enter") {
      const first = searchResults.querySelector(".search-result");
      if (first) {
        event.preventDefault();
        openSearchResult(first);
      }
    }
  });

  searchResults.addEventListener("click", (event) => {
    const button = event.target.closest(".search-result");
    if (button) openSearchResult(button);
  });

  calendarCanvas.addEventListener("click", (event) => {
    const selected = closestMark(visibleCalendarMarks(), event.offsetX, event.offsetY, "event");
    if (!selected) return;
    hideCalendarHover();
    state.calendarSelected = selected;
    drawCalendar();
    renderCalendarDetail();
    renderAnchorControls();
    document.querySelector(".calendar-section .detail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  calendarCanvas.addEventListener("pointermove", (event) => {
    const mark = closestMarkRecord(visibleCalendarMarks(), event.offsetX, event.offsetY, 16);
    showCalendarHover(mark);
  });

  calendarCanvas.addEventListener("pointerleave", hideCalendarHover);
  calendarCanvas.addEventListener("pointercancel", hideCalendarHover);
  calendarCanvas.addEventListener("pointerdown", hideCalendarHover);
  $("calendar-scroll").addEventListener("scroll", hideCalendarHover, { passive: true });
  window.addEventListener("scroll", hideCalendarHover, { passive: true });

  motifOptions.addEventListener("click", (event) => {
    const button = event.target.closest(".motif-option");
    if (!button) return;
    const key = button.dataset.motif;
    state.focusMotif = key ? recurringMotifs().find((motif) => motif.key === key) || null : null;
    state.calendarSelected = null;
    state.view = "field";
    hideCalendarHover();
    drawCalendar();
    renderMotifLens();
    renderCalendarDetail();
    renderAnchorControls();
  });

  viewOptions.addEventListener("click", (event) => {
    const button = event.target.closest(".view-option");
    if (!button) return;
    state.view = button.dataset.view;
    state.calendarSelected = null;
    hideCalendarHover();
    renderAnchorControls();
    drawCalendar();
    renderCalendarDetail();
    $("calendar-scroll").scrollTo({ left: 0, behavior: "smooth" });
  });

  dayContextList.addEventListener("click", (event) => {
    const button = event.target.closest(".day-trace");
    if (!button) return;
    const selected = data.apple.find((item) => item.id === button.dataset.eventId);
    if (!selected) return;
    state.calendarSelected = selected;
    drawCalendar();
    renderCalendarDetail();
    renderAnchorControls();
  });

  document.querySelectorAll(".language-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang;
      renderLanguage();
    });
  });

  drawCalendar();
  renderLanguage();
  window.addEventListener("resize", () => {
    if (state.view === "anchor") drawCalendar();
  });
})();
