# virtualstate-tech-overview
A brief, high-level technical overview for our platform.

Open `index.html` or serve the repository with a static web server. No build or external dependencies.

- Spanish and English: browser preference on first visit (English fallback); manual choice persists.
- Light and dark: system preference on first visit; manual choice persists.
- Vertical scroll snapping; print the current language and theme as five A4 landscape sheets. Diagrams remain static in print and with reduced-motion preferences.
- Inline vector diagrams in `index.html` share theme tokens in `styles.css`. `app.js` manages preferences and decorative motion. Original SVG files are retained for existing links.
- Architecture proposal, pre-MVP; technical basis: Whitepaper v0.3. Original CEEI context is preserved in an HTML comment.
