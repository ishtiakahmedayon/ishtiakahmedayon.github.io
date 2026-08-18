# Adding your own images & CV

The site ships with retro placeholder images (dashed amber frames) so it looks
right out of the box. Swap them out whenever you're ready — no code edits
needed, just replace the files below **with the same filenames**.

```
portfolio/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── cv.pdf                          ← your CV (not included — add your own)
    └── images/
        ├── avatar.jpg                  ← your photo, used in Home + Overview
        └── projects/
            ├── java-quiz.jpg           ← Java Quiz App screenshot
            ├── rfid-attendance.jpg     ← RFID Attendance System screenshot
            └── vocabflash.jpg          ← VocabFlash App screenshot
```

## 1. Your photo

Replace `assets/images/avatar.jpg` with your own photo.

- **Recommended size:** roughly square, ~1080×1080px (matches the placeholder).
- **Format:** `.jpg` or `.png` both work — if you use `.png`, either rename it
  to `avatar.jpg` or update the two `src="assets/images/avatar.jpg"`
  references in `index.html` (Home hero and Overview section) to match.
- The image is cropped to fit automatically (`object-fit: cover`), so a
  head-and-shoulders shot centered in the frame works best.

## 2. Project screenshots

Replace each file in `assets/images/projects/` with a real screenshot of that
project (a UI screenshot, a photo of the hardware for the RFID project, or
even a clean code snippet — whatever represents it best).

- **Recommended size:** landscape, around 800×500px (8:5 ratio) so nothing
  gets awkwardly cropped.
- Keep the same filenames and everything just works. Using different
  filenames or formats? Update the matching `src="assets/images/projects/…"`
  in the Projects section of `index.html`.

Want a **4th real project** instead of the "More on GitHub" card? Duplicate
one of the `<article class="project-card">` blocks in `index.html`, add a
matching image to `assets/images/projects/`, and point the `src` at it.

## 3. Your CV

Add your resume as `assets/cv.pdf`. The **View CV** button in the top nav
already links to `assets/cv.pdf` — nothing else to change.

If you'd rather link to a CV hosted elsewhere (Google Drive, LinkedIn, etc.),
open `index.html`, find the `cv-btn` link near the top, and replace the
`href="assets/cv.pdf"` with your URL.

## Notes

- All other icons on the site (nav, skills, hobbies, contact) are hand-drawn
  pixel SVGs baked into `index.html` — no image files needed for those.
- If an image file is missing, the browser will just show a broken-image
  icon in that spot — nothing else will break.
