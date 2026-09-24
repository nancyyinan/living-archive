# Living Archive

Communication Design thesis archive for Yinan Xue.

## Content

- The home page is a chronological index. Each update is labeled by week, date, title, and contents.
- `WEEK 01` contains the original `12 IMAGES`, thesis brainstorm, and 15 questions from others. The image collection retains its separate `10 ORDERINGS` branch.
- `WEEK 02` contains the everyday-object study: a student ID photograph, 10 unseen actions, and a 200-word reflection connecting the object to the 256 book and thesis.
- `WEEK 03` follows three encounters with the institutional traces produced by a student ID.
- `WEEK 04` presents three possible thesis directions as individual letter-size editorial sheets.
- Source metadata for Week 1 lives in `data/archive.ts`; the weekly index and writing for Weeks 2 and 4 live in `data/weeks.ts`.

## Owner mode

Use `EDIT` in the header to enable `+ ADD`, file replacement, metadata editing, deletion, and drag reordering. The `?edit=true` URL also remains supported. Uploaded files and metadata are stored in the current browser using IndexedDB and localStorage; public visitors do not share that device-local content.

For changes that everyone should see, replace the matching descriptive file in `public/archive/images`, update its metadata in `data/archive.ts`, and push the change to GitHub. Images are presented in landscape 6 × 4 or portrait 4 × 6 frames according to their documented orientation, with the complete source image contained without stretching or cropping.

Each page under `10 ORDERINGS` is an independent freeform canvas. `SAVE DRAFT` keeps that layout on the current device. `EXPORT ALL FOR PUBLISHING` downloads `published-orderings.json`, including all ten saved layouts and the current unsaved canvas. Replace `data/published-orderings.json` with that export and push it to make the arrangements permanent for every visitor. The ordering files store only layout coordinates, sizes, and layer order; they do not change the `12 IMAGES` grid, index, image files, or metadata.

Use `THEME: BLACK` / `THEME: WHITE` in the header to switch between the two display modes. Image cards preserve each source file's natural aspect ratio. The Brainstorm image can be dragged with a mouse or pen and resized through its explicitly labeled image controls; browser wheel, touch, and keyboard zoom remain untouched.

## Development

```sh
pnpm dev
pnpm build
pnpm build:pages
```

Pushes to `main` automatically publish the public site through GitHub Pages.
