# Prototype 02 — Process Log

## Scope

This prototype is only about Nancy's New York years, from 2023-08-19 onward.
The four books by Nancy's grandfather are a separate project and are intentionally
not referenced, interpreted, visualized, or connected to this website.

## Research question

How do large political and technological changes become visible—or remain
invisible—inside the ordinary life of an international student?

The prototype does not assume that two things happening near each other in time
have a causal relationship. It distinguishes:

- **co-occurrence**: a public event and a private record share a period;
- **direct system contact**: the diary itself mentions I-94, insurance, CPT,
  visa procedures, or another institutional mechanism;
- **direct technology use**: the diary itself mentions using an AI tool or
  building an AI-related workflow.

## Changes from the previous version

1. Removed the recurring-word interface and its keyword buttons.
2. Rebuilt the chronology around an explicit start date: **2023-08-19**.
3. Added a visible 2023 segment instead of beginning the year labels at 2024.
4. Added exact dates to all selected diary and public-history markers.
5. Added year, month, and week zoom levels; week view contains a tick for every
   day and a date label for each Monday.
6. Kept all 7,641 Apple Calendar records as a density layer organized by date
   and time of day.
7. Added separate public lanes for international-student policy and AI / tech.
8. Added a selected-note index and a detail panel that shows nearby private
   records within seven days of a selected public event.

## Infographic redesign — October 22, 2026

The first Prototype 02 layout made the visualization secondary to a large hero
and rendered the calendar as nearly monochrome lines. That hierarchy was
rejected. The current revision treats the website as one bilingual infographic:

- the hero, separate arrival section, and long diary index were removed;
- the visualization now begins in the first viewport and occupies most of it;
- all 21 public events and all 25 curated diary excerpts have complete English
  translations alongside the Chinese originals;
- Chinese, English, and side-by-side bilingual display modes are available;
- the 25 edited diary excerpts and 21 public-history records are fully
  translated; raw calendar titles remain source data, are categorized visually,
  and are hidden in English-only detail rather than machine-translated without
  review;
- calendar records are classified into seven visible life categories;
- four views use different encodings instead of restyling the same line chart.

The four encodings adapt principles from the supplied references:

1. **Daily atlas** — date × time of day, with color indicating life category.
2. **Month matrix** — month × category, with shade and printed counts showing
   volume.
3. **Time bubbles** — week × average start time, with area showing total hours.
4. **Life pulse** — seven weekly small-multiple frequency timelines.

The compact navigation and full-width, immediately visible data field were also
informed by the presentation hierarchy of `anamericaneducation.com`. The visual
language and data encodings are original to this archive rather than copies of
that site's content.

## Readability revision — October 22, 2026

Following visual review, the page and canvas backgrounds were changed to pure
white. The palette now uses muted research-chart colors—blue-gray, sage, dusted
rose, ochre, lavender, and soft steel blue—over pale gray gridlines. Forced
uppercase styling was removed, interface and annotation text were enlarged, and
public-event labels were made deliberately sparse at the four-year scale.

English mode was audited to remove visible Chinese text from canvas month
labels, event labels, tooltips, details, and language controls. Every marker
remains selectable for its full detail even when its label is not printed.

## Private archive editing

Four top-level Notion pages—2023, 2024, 2025, and 2026—were reviewed. This
prototype publishes only 25 selected excerpts. Selection criteria:

- the entry has a usable date or honest date range;
- it helps describe arrival, school, making, bureaucracy, technology, or
  changes in the rhythm of life;
- it can be understood outside the original private page;
- names and details that do not need to be public are removed or paraphrased.

The original Notion pages are not copied wholesale. A source label is retained
for each excerpt so it can be checked and re-edited later.

## Calendar-data limit

The website begins on 2023-08-19 because the diary identifies it as the arrival
date. The Apple Calendar export itself begins on 2023-09-29. The earlier blank
space is meaningful missing data and must remain blank; it should not be filled
with invented calendar activity.

## Public-history research

Prototype 02 currently includes 21 public events drawn from first-party sources:

- U.S. Department of State, USCIS, and the Federal Register for policy;
- OpenAI, Anthropic, and DeepSeek for AI / technology product history.

Policy entries describe the public environment and do not imply that each rule
personally applied to Nancy. The website is an artistic and historical research
prototype, not immigration legal advice.

## Data model

- `../data.js`: existing Apple Calendar archive; 7,641 rendered records.
- `timeline-data.js`: curated public events and selected Notion excerpts.
- `app.js`: zoom, filters, canvas density layer, event selection, and proximity
  comparison.
- `styles.css`: editorial visual system and responsive layouts.

## Next iteration questions

- Which diary excerpts should be public verbatim, paraphrased, or kept private?
- Should calendar titles be visible publicly, or should the public version show
  density only?
- Which policy changes were directly felt, and which belong only to the general
  climate around international students?
- Can each year become a chapter with its own short editorial thesis?
- Should the timeline add personal annotations such as "I learned about this
  later" to separate lived time from retrospective knowledge?
- Can Prototype 03 compare clusters—arrival, moving, finals, internships,
  graduation preparation—without returning to a generic word-frequency view?

## Verification checklist

- [x] JavaScript syntax checked with the bundled Node.js runtime.
- [x] Confirmed 7,641 Apple Calendar records load from the existing archive.
- [x] Confirmed chronology range is 2023-08-19 through 2026-10-22.
- [x] Confirmed 21 public events and 25 selected diary entries load.
- [x] Browser interaction and responsive visual QA at 1440 px and 390 px.
- [x] Verified all four infographic views render and switch without console errors.
- [x] Verified Chinese-only, English-only, and bilingual display modes.
- [x] Verified English translations exist for all 21 macro events and 25 diary excerpts.
- [ ] User review of public/private excerpt boundaries.
