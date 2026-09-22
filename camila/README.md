# Camila - GitHub Pages gift

## Folder structure

Place this entire `camila` folder inside your `estebangmz666.github.io` repository:

```text
estebangmz666.github.io/
├── index.html
├── styles.css
├── script.js
└── camila/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── images/
```

Then push to GitHub.

Your portfolio stays at:

`https://estebangmz666.github.io/`

The gift will be available at:

`https://estebangmz666.github.io/camila/`

## How to replace the photo placeholders

Copy your photos into the `images` folder, for example:

- `photo-01.jpg`
- `photo-02.jpg`
- `photo-03.jpg`
- `photo-04.jpg`

Then, in `index.html`, replace:

```html
<div class="photo-placeholder">
  <span>foto 01</span>
</div>
```

with:

```html
<div class="photo-placeholder">
  <img src="./images/photo-01.jpg" alt="Camila y Esteban">
</div>
```

Repeat for each photo.

## Quick customization

Search inside `index.html` for:

- `Camila`
- `Esteban`
- `21 · 09 · 2026`
- The four photo captions
- The letter text

Everything runs with plain HTML, CSS and JavaScript. No backend is required.
