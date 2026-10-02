(() => {
  const data = window.SELF_RECORD_DATA;
  const state = { lang: "zh", apple: true, notion: true, calendarSelected: null, musicSelected: null };
  const calendarWidth = 3600;
  const calendarHeight = 650;
  const musicWidth = 3600;
  const musicHeight = 230;
  const calendarMarks = [];
  const musicMarks = [];

  const $ = (id) => document.getElementById(id);
  const pageEyebrow = $("page-eyebrow");
  const pageTitle = $("page-title");
  const pageLede = $("page-lede");
  const calendarTitle = $("calendar-title");
  const calendarCopy = $("calendar-copy");
  const hourAxis = $("hour-axis");
  const calendarCanvas = $("calendar-canvas");
  const calendarDetailLabel = $("calendar-detail-label");
  const calendarDetailTitle = $("calendar-detail-title");
  const calendarDetailSummary = $("calendar-detail-summary");
  const calendarFacts = $("calendar-facts");
  const musicEyebrow = $("music-eyebrow");
  const musicTitle = $("music-title");
  const musicCopy = $("music-copy");
  const musicCount = $("music-count");
  const musicCanvas = $("music-canvas");
  const musicDetailLabel = $("music-detail-label");
  const musicDetailTitle = $("music-detail-title");
  const musicDetailSummary = $("music-detail-summary");
  const musicFacts = $("music-facts");
  const methodNote = $("method-note");

  const copy = {
    zh: {
      eyebrow: "个人记录 / 2023—2026",
      title: "我如何记录自己",
      lede: "我选择安排什么、保存什么；平台决定这些选择以什么字段留下。",
      calendarTitle: "四年个人时间场",
      calendarCopy: "横轴是日期，纵轴是一天中的时间。每条线是一项日历事件，线长是持续时间。",
      calendarEmptyTitle: "选择一项日历事件",
      calendarEmptySummary: "点击时间场中的线查看标题、来源日历和时间。",
      calendarDetailLabel: "由我创建或保存在我的日历中",
      musicEyebrow: "收藏日期未被保存",
      musicTitle: "我喜欢的音乐",
      musicCopy: "每条线是一首歌。横向位置沿导出列表从 2026/10/1 回溯至 2023/8/20；线高代表歌曲时长。两端日期不是单曲的精确收藏日期。",
      musicDetailLabel: "由我选择收藏，由平台保存",
      musicEmptyTitle: "选择一首歌",
      musicEmptySummary: "点击线条查看歌曲、歌手、专辑与时长。",
      method: `Apple Calendar 排除了 ${data.summary.appleRaw - data.summary.appleIncluded} 条公共节日。Notion Calendar 排除了取消、公共节日、无法解析的数据，以及与 Apple Calendar 完全重复的记录。网易云导出没有收藏日期，因此没有被放入四年时间轴。`,
      labels: { source: "来源", calendar: "日历", start: "开始", end: "结束", created: "创建", modified: "修改", location: "地点", order: "当前顺序", artist: "歌手", album: "专辑", duration: "时长", savedDate: "收藏日期" },
      notPreserved: "导出文件中未保存",
    },
    en: {
      eyebrow: "PERSONAL RECORD / 2023—2026",
      title: "How I Record Myself",
      lede: "I chose what to schedule and save; the platforms determined which fields remained.",
      calendarTitle: "Four years of personal time",
      calendarCopy: "The x-axis is date and the y-axis is time of day. Each line is one calendar event; its length is the event duration.",
      calendarEmptyTitle: "Select a calendar event",
      calendarEmptySummary: "Select a line to view its title, source calendar, and time.",
      calendarDetailLabel: "Created by me or kept in my calendar",
      musicEyebrow: "DATE OF SAVING NOT PRESERVED",
      musicTitle: "Music I liked",
      musicCopy: "Each line is one song. The exported list runs backward from 2026/10/1 to 2023/8/20; line height represents duration. The endpoints are not exact save dates for individual songs.",
      musicDetailLabel: "Chosen by me, stored by the platform",
      musicEmptyTitle: "Select a song",
      musicEmptySummary: "Select a line to view its title, artist, album, and duration.",
      method: `Apple Calendar excludes ${data.summary.appleRaw - data.summary.appleIncluded} public-holiday entries. Notion Calendar excludes cancelled, holiday, malformed, and exact Apple Calendar duplicates. The NetEase export contains no saved dates, so songs are not placed on the four-year timeline.`,
      labels: { source: "Source", calendar: "Calendar", start: "Start", end: "End", created: "Created", modified: "Modified", location: "Location", order: "Current order", artist: "Artist", album: "Album", duration: "Duration", savedDate: "Date saved" },
      notPreserved: "Not preserved in the export",
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
    return 22 + ((value.getTime() - start) / (end - start)) * (calendarWidth - 44);
  }

  function yForTime(value) {
    const minutes = value.getHours() * 60 + value.getMinutes();
    return 34 + (minutes / 1440) * (calendarHeight - 70);
  }

  function drawCalendar() {
    const ctx = setupCanvas(calendarCanvas, calendarWidth, calendarHeight);
    const ink = css("--ink");
    const line = css("--line");
    const apple = css("--apple");
    const notion = css("--notion");
    calendarMarks.length = 0;
    ctx.clearRect(0, 0, calendarWidth, calendarHeight);

    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    for (let hour = 0; hour <= 24; hour += 3) {
      const y = 34 + (hour / 24) * (calendarHeight - 70);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(calendarWidth, y);
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

    const sources = [];
    if (state.apple) sources.push(...data.apple);
    if (state.notion) sources.push(...data.notion);

    sources.forEach((event) => {
      const start = dateValue(event.start);
      const end = dateValue(event.end);
      if (!start || !end) return;
      const x = xForDate(start);
      const y1 = event.allDay ? 25 : yForTime(start);
      let y2 = event.allDay ? 31 : yForTime(end);
      if (!event.allDay && (end.toDateString() !== start.toDateString() || y2 <= y1)) y2 = calendarHeight - 38;
      if (y2 - y1 < 3) y2 = y1 + 3;
      const isApple = event.source === "Apple Calendar";
      const selected = state.calendarSelected && state.calendarSelected.id === event.id;
      ctx.save();
      ctx.strokeStyle = isApple ? apple : notion;
      ctx.lineWidth = selected ? 4 : isApple ? 1.35 : 1.5;
      ctx.globalAlpha = selected ? 1 : isApple ? 0.48 : 0.72;
      if (!isApple) ctx.setLineDash([3, 2]);
      ctx.beginPath();
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.stroke();
      ctx.restore();
      calendarMarks.push({ event, x, y1, y2 });
    });
  }

  function drawHourAxis() {
    hourAxis.innerHTML = "";
    for (let hour = 0; hour <= 24; hour += 3) {
      const y = 34 + (hour / 24) * (calendarHeight - 70);
      const label = document.createElement("span");
      label.className = "hour-label";
      label.style.top = `${y}px`;
      label.textContent = `${String(hour).padStart(2, "0")}:00`;
      hourAxis.appendChild(label);
    }
  }

  function drawMusic() {
    const ctx = setupCanvas(musicCanvas, musicWidth, musicHeight);
    const line = css("--line");
    const musicColor = css("--music");
    const ink = css("--ink");
    musicMarks.length = 0;
    ctx.clearRect(0, 0, musicWidth, musicHeight);
    const baseY = musicHeight - 34;
    ctx.strokeStyle = line;
    ctx.beginPath();
    ctx.moveTo(18, baseY);
    ctx.lineTo(musicWidth - 18, baseY);
    ctx.stroke();
    ctx.font = "11px Helvetica Neue, Helvetica, Arial, sans-serif";
    ctx.fillStyle = ink;
    ctx.fillText("2026/10/1", 18, musicHeight - 12);
    ctx.textAlign = "right";
    ctx.fillText("2023/8/20", musicWidth - 18, musicHeight - 12);
    ctx.textAlign = "left";

    const maxDuration = 12 * 60 * 1000;
    data.music.forEach((song, index) => {
      const x = 18 + (index / Math.max(1, data.music.length - 1)) * (musicWidth - 36);
      const height = 14 + Math.min(song.durationMs, maxDuration) / maxDuration * 150;
      const selected = state.musicSelected && state.musicSelected.id === song.id;
      ctx.save();
      ctx.strokeStyle = musicColor;
      ctx.globalAlpha = selected ? 1 : 0.58;
      ctx.lineWidth = selected ? 4 : 1.6;
      ctx.beginPath();
      ctx.moveTo(x, baseY);
      ctx.lineTo(x, baseY - height);
      ctx.stroke();
      ctx.restore();
      musicMarks.push({ song, x, y1: baseY - height, y2: baseY });
    });
  }

  function closestMark(marks, x, y, itemKey) {
    let best = null;
    let bestDistance = 12;
    marks.forEach((mark) => {
      const dy = y < mark.y1 ? mark.y1 - y : y > mark.y2 ? y - mark.y2 : 0;
      const distance = Math.hypot(mark.x - x, dy);
      if (distance < bestDistance) {
        best = mark[itemKey];
        bestDistance = distance;
      }
    });
    return best;
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
  }

  function renderMusicDetail() {
    const text = copy[state.lang];
    const song = state.musicSelected;
    musicDetailLabel.textContent = text.musicDetailLabel;
    if (!song) {
      musicDetailTitle.textContent = text.musicEmptyTitle;
      musicDetailSummary.textContent = text.musicEmptySummary;
      musicFacts.innerHTML = "";
      return;
    }
    musicDetailTitle.textContent = song.title;
    musicDetailSummary.textContent = `${song.artist} / ${song.album}`;
    renderFacts(musicFacts, [
      [text.labels.artist, song.artist],
      [text.labels.album, song.album],
      [text.labels.duration, song.duration],
      [text.labels.order, String(song.order)],
      [text.labels.savedDate, text.notPreserved],
    ]);
  }

  function renderLanguage() {
    const text = copy[state.lang];
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    pageEyebrow.textContent = text.eyebrow;
    pageTitle.textContent = text.title;
    pageLede.textContent = text.lede;
    calendarTitle.textContent = text.calendarTitle;
    calendarCopy.textContent = text.calendarCopy;
    musicEyebrow.textContent = text.musicEyebrow;
    musicTitle.textContent = text.musicTitle;
    musicCopy.textContent = text.musicCopy;
    musicCount.textContent = data.summary.musicIncluded.toLocaleString("en-US");
    methodNote.textContent = text.method;
    $("apple-count").textContent = data.summary.appleIncluded.toLocaleString("en-US");
    $("notion-count").textContent = data.summary.notionIncluded.toLocaleString("en-US");
    document.querySelectorAll(".language-option").forEach((button) => {
      const active = button.dataset.lang === state.lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderCalendarDetail();
    renderMusicDetail();
  }

  calendarCanvas.addEventListener("click", (event) => {
    const selected = closestMark(calendarMarks, event.offsetX, event.offsetY, "event");
    if (!selected) return;
    state.calendarSelected = selected;
    drawCalendar();
    renderCalendarDetail();
    document.querySelector(".calendar-section .detail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  musicCanvas.addEventListener("click", (event) => {
    const selected = closestMark(musicMarks, event.offsetX, event.offsetY, "song");
    if (!selected) return;
    state.musicSelected = selected;
    drawMusic();
    renderMusicDetail();
    document.querySelector(".music-section .detail").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  document.querySelectorAll(".source-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.source;
      state[key] = !state[key];
      button.classList.toggle("is-active", state[key]);
      button.setAttribute("aria-pressed", String(state[key]));
      drawCalendar();
    });
  });

  document.querySelectorAll(".language-option").forEach((button) => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang;
      renderLanguage();
    });
  });

  drawHourAxis();
  drawCalendar();
  drawMusic();
  renderLanguage();
})();
