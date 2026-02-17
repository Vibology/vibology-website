# Changelog — Vibology Theme v2.0.2

**Release Date:** 2026-02-16

This release is a correctness and polish patch addressing 16 issues found in a Ghost theme audit. No new features are introduced. All changes are backwards-compatible.

---

## Bug Fixes

### FIX 1 — Ghost content rendering: `{{content}}` → `{{{content}}}` (4 files)

Ghost post and page content is raw HTML. Double-brace syntax (`{{content}}`) HTML-escapes the output, causing markup to render as literal text. Corrected to triple-brace syntax (`{{{content}}}`) in all four content templates:

- `post.hbs`
- `page.hbs`
- `custom-full-width.hbs`
- `page-contact.hbs`

### FIX 2 — Remove duplicate scroll-progress bar from `post.hbs`

The reading progress bar (`<div class="scroll-progress">`) was rendered twice on post pages: once by `default.hbs` (which wraps every page) and again at the top of `post.hbs`. The duplicate instance in `post.hbs` has been removed. The single instance in `default.hbs` is the canonical one.

### FIX 3 — Replace pink/magenta colors with iridescent palette

The brand rule is no pink. Replaced all remaining `rgba(255, 3, 165, ...)` and related pink/magenta values across six SCSS files:

- **`assets/scss/_reset.scss`** — `::selection` and `::-moz-selection` background replaced with lavender `rgba(184, 165, 229, 0.3)`
- **`assets/scss/components/_interactive.scss`** — `.back-to-top:hover` box-shadow cyan stop corrected from cyan (`rgba(15, 224, 236, 0.4)`) to brand cyan (`rgba(157, 216, 247, 0.4)`); pink stop replaced with lavender (`rgba(184, 165, 229, 0.5)`)
- **`assets/scss/components/_contact.scss`** — Form input `:focus` box-shadow changed from pink to lavender (`rgba(184, 165, 229, 0.15)`); `.form-submit:focus` box-shadow updated to cyan/lavender palette
- **`assets/scss/components/_series.scss`** — `.series-progress` background changed to lavender `rgba(184, 165, 229, 0.15)`; `.series-progress-bar` gradient changed from purple/magenta to the canonical 3-stop iridescent gradient (`#9DD8F7 → #B8A5E5 → #E8F5FF`); `.series-item-number` background updated to `rgba(184, 165, 229, 0.1)`
- **`assets/scss/_variables.scss`** — `@keyframes iridescent-glow` 50% step's second drop-shadow changed from pink `rgba(247, 196, 216, 0.3)` to pearl `rgba(232, 245, 255, 0.3)`
- **`assets/scss/_utilities.scss`** — `.tag:hover` box-shadow third stop changed from pink `rgba(247, 196, 216, 0.2)` to pearl `rgba(232, 245, 255, 0.2)`

### FIX 4 — Delete dead partial `partials/nav-init.hbs`

`partials/nav-init.hbs` was never included in any template and its output was never read. Deleted to reduce dead code in the theme.

### FIX 5 — Fix nested `.featured-slider-wrapper` div

The `featured-slider-wrapper` div was created in both `home.hbs` (outer) and `partials/featured-slider.hbs` (inner), resulting in a doubled wrapper with conflicting margin. Fixed by:

- Removing the outer wrapper `<div class="featured-slider-wrapper mb-8">` from `home.hbs`; the partial is now included directly
- Adding `mb-8` class to the existing `featured-slider-wrapper` div inside `partials/featured-slider.hbs`, so spacing is preserved

### FIX 6 — Update Ghost engine version in `package.json`

Updated minimum Ghost engine version from `>=5.0.0` to `>=6.0.0` to reflect current Ghost compatibility requirements.

### FIX 7 — Fix raw profile image in `partials/post-card-featured.hbs`

The author avatar in the featured post card was using `{{profile_image}}` (raw unprocessed URL), bypassing Ghost's image resize pipeline. Changed to `{{img_url profile_image size="xs"}}` for proper image optimization and CDN delivery.

### FIX 8 — Fix sidebar tags sort parameter in `partials/sidebar.hbs`

The tags widget was using `order="count DESC"`, which is not valid Ghost API syntax. Corrected to `order="count.posts DESC" include="count.posts"` — the proper Ghost Content API syntax for sorting tags by post count.

### FIX 9 — Remove undefined CSS class from `partials/header.hbs`

The "Book a Reading" button had `class="header-action-link member-signup-btn"`. The class `header-action-link` is not defined anywhere in the SCSS codebase. Removed the undefined class; the button now uses only `class="member-signup-btn"`.

### FIX 10 — Move Prism.js to post-only context in `default.hbs`

Prism.js (syntax highlighting library) was loaded on every page, including the homepage, tag archives, and static pages where it is never needed. Wrapped both the CSS `<link>` tags and the JS `<script>` tags in `{{#is "post"}}...{{/is}}` blocks so Prism only loads on single post pages.

### FIX 11 — Remove 3 unused SCSS variables from `_variables.scss`

Three variables were defined but never referenced anywhere in the SCSS codebase:

- `$breakpoint-2xl: 1536px`
- `$container-sm: 640px`
- `$z-popover: 600`

All three have been removed.

### FIX 12 — Remove dead `.theme-toggle` CSS from `_header.scss`

The `.theme-toggle` and `[data-theme="dark"] .theme-toggle` rule blocks (approximately 24 lines) referenced a UI element that no longer exists in the theme's HTML templates. Removed entirely to reduce CSS output size.

### FIX 13 — Add 3 missing utility classes to `_utilities.scss`

Three utility classes referenced in template markup were missing from the stylesheet:

- `.gap-4` — `gap: $space-4` (16px)
- `.border-t` — `border-top: 1px solid var(--color-border)`
- `.pt-4` — `padding-top: $space-4` (16px)

Added at the end of the spacing utilities section, after `.px-4`.

### FIX 14 — Remove redundant `border-radius` in `.content-card`

The `.content-card` block contained a `@media (min-width: $breakpoint-md)` rule that set `border-radius: $radius-lg` — the same value already set in the base rule. The redundant media query block has been removed.

### FIX 15 — Remove duplicate `:focus-visible` from `_reset.scss`

The `:focus-visible` and `:focus:not(:focus-visible)` rules in `_reset.scss` were duplicated in `_utilities.scss` (with a more specific `*:focus-visible` selector that also adds `border-radius`). The `_utilities.scss` version is the canonical one. The duplicate rules in `_reset.scss` have been removed.

### FIX 16 — Add Cabin weight 300 to font import in `_typography.scss`

The Google Fonts import for Cabin was missing the `300` (light) weight, despite the theme defining `$font-light: 300` and a `.font-light` utility class. Added `0,300` and `1,300` to the import URL so the light weight is actually available:

```
Before: family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700
After:  family=Cabin:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700
```

---

## Version Bump

- `package.json` version: `2.0.1` → `2.0.2`

---

## Files Modified

| File | Changes |
|------|---------|
| `post.hbs` | Fix 1 (triple-brace content), Fix 2 (remove duplicate scroll-progress) |
| `page.hbs` | Fix 1 (triple-brace content) |
| `custom-full-width.hbs` | Fix 1 (triple-brace content) |
| `page-contact.hbs` | Fix 1 (triple-brace content) |
| `home.hbs` | Fix 5 (remove outer slider wrapper) |
| `default.hbs` | Fix 10 (Prism.js post-only) |
| `partials/featured-slider.hbs` | Fix 5 (add mb-8 to inner wrapper) |
| `partials/post-card-featured.hbs` | Fix 7 (img_url for profile image) |
| `partials/sidebar.hbs` | Fix 8 (tags sort parameter) |
| `partials/header.hbs` | Fix 9 (remove undefined CSS class) |
| `partials/nav-init.hbs` | Fix 4 (deleted) |
| `assets/scss/_reset.scss` | Fix 3 (selection colors), Fix 15 (remove duplicate focus-visible) |
| `assets/scss/_variables.scss` | Fix 3 (iridescent-glow keyframe), Fix 11 (remove unused variables) |
| `assets/scss/_utilities.scss` | Fix 3 (tag hover color), Fix 13 (add utility classes), Fix 14 (remove redundant border-radius) |
| `assets/scss/_typography.scss` | Fix 16 (Cabin weight 300) |
| `assets/scss/components/_interactive.scss` | Fix 3 (back-to-top hover colors) |
| `assets/scss/components/_contact.scss` | Fix 3 (form focus colors) |
| `assets/scss/components/_series.scss` | Fix 3 (progress bar colors) |
| `assets/scss/components/_header.scss` | Fix 12 (remove dead theme-toggle CSS) |
| `package.json` | Fix 6 (Ghost engine version), version bump to 2.0.2 |
