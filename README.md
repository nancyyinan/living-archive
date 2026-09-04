# Living Archive

Communication Design thesis archive for Yinan Xue.

## Content

- `01 12 IMAGES` contains twelve titled source images in `public/archive/images`, with citations and captions defined in `data/archive.ts`.
- `02 BRAINSTORM` uses the original rendered brainstorm scan and a secondary, uncertainty-marked transcription.
- `03 QUESTIONS` uses all 15 pages of the supplied questions PDF as individual archive blocks.

## Owner mode

Use `EDIT` in the header to enable `+ ADD`, file replacement, metadata editing, deletion, and drag reordering. The `?edit=true` URL also remains supported. Uploaded files and metadata are stored in the current browser using IndexedDB and localStorage; public visitors do not share that device-local content.

For changes that everyone should see, replace the matching descriptive file in `public/archive/images`, update its metadata in `data/archive.ts`, and push the change to GitHub. Images are presented in landscape 6 × 4 or portrait 4 × 6 frames according to their documented orientation, with the complete source image contained without stretching or cropping.

Use `THEME: BLACK` / `THEME: WHITE` in the header to switch between the two display modes. Image cards preserve each source file's natural aspect ratio. The Brainstorm image can be dragged with a mouse or pen and resized through its explicitly labeled image controls; browser wheel, touch, and keyboard zoom remain untouched.

## Development

```sh
pnpm dev
pnpm build
pnpm build:pages
```

Pushes to `main` automatically publish the public site through GitHub Pages.
