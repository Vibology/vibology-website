# Outstanding Issues

Issues identified during the v2.0.2 audit but deferred for a future pass.

---

## Low Priority

### 1. Dead CSS rule in `_typography.scss`

**File:** `assets/scss/_typography.scss:117–131`

The "button text always white" block includes `.member-signup-btn`:

```scss
button a,
.member-signup-btn,   // ← dead rule
.form-submit,
...
{
  color: white !important;
}
```

But `_header.scss` overrides this with `color: #2D3561 !important` (Deep Indigo), which is correct per brand guidelines. The `white` rule in `_typography.scss` is never applied. It should be removed from the list to avoid confusion.

**Fix:** Remove `.member-signup-btn` from the selector group in `_typography.scss`.

---

## Deferred Audit

### 2. `main.js` not fully line-audited

**File:** `assets/js/main.js` (~7KB source)

The JavaScript was reviewed for structure and feature coverage but not audited line-by-line for dead code, bugs, or edge cases. Features to review:

- Custom slider (auto-advance, dot navigation, touch/swipe)
- Dark mode toggle + system preference detection
- Scroll progress bar
- Mobile menu + dropdown toggle
- Back to top button
- Mobile nav dropdown accordion
- TinyBird analytics (pageview tracking, localStorage opt-out)
- GLightbox initialization

**Suggested approach:** Read through each feature block, check for unused event listeners, confirm localStorage keys don't conflict, and verify the slider handles edge cases (single slide, no slides).

---

*Last updated: 2026-02-16 (post v2.0.2 audit)*
