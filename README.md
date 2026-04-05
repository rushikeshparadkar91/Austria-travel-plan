# Europe Family Itinerary

Static itinerary site for a Prague, Vienna, and Salzburg family trip.

## Files That Matter

- `index.html` - entry page
- `app.js` - itinerary data and interactive timeline behavior

## GitHub Pages Setup

1. Create a new GitHub repository.
2. Upload the contents of this folder to the repository root.
3. In GitHub, open `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select your main branch and `/ (root)`.
6. Save.

GitHub Pages should publish the site in a minute or two.

## Local Preview

From this folder, run:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Notes

- This site is fully static. No Node, npm, or build step is required.
- The older `src/` React files are not needed for GitHub Pages deployment.
