# Ines Merry Del Val — Portfolio

Minimalist photographer/journalist portfolio. Built with [Eleventy](https://www.11ty.dev/).

## Develop

```
npm install
npm start
```

Serves at http://localhost:8080 with live reload.

## Build

```
npm run build
```

Outputs static HTML to `_site/`.

## Deploy

Push this repo to GitHub, then import it in Vercel. `vercel.json` already points
the build at `npm run build` with output directory `_site` — no extra config needed.

## Editing content

All work items live in `src/_data/works.json`. Each entry:

```json
{
  "order": 1,
  "slug": "url-slug",
  "title": "Title",
  "location": "City, Country",
  "publication": "Publication name (leave \"\" for personal photo work)",
  "year": 2024,
  "category": "photography | journalism",
  "image": "/images/work/slug.svg (leave \"\" for a text-only journalism piece)",
  "credit": "© Ines Merry Del Val"
}
```

- Items with an `image` appear in the homepage Grid view and get a full detail
  page with a large photo.
- Every item (image or not) appears in the List view and gets a detail page.
- `order` controls both the grid order and the next/prev arrows on detail pages.
- Replace the placeholder `.svg` files in `src/images/work/` with real photos
  (jpg/png/webp works fine — just update the `image` path in works.json).

Site-wide info (name, role, email) is in `src/_data/site.json`.
