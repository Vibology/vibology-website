# Vibology Theme - Next Steps & Improvements

**Last Updated:** 2026-01-26
**Current Version:** 1.6.4

---

## Recently Completed (v1.6.x)

### Navigation Overhaul
- [x] Fixed navigation URLs (was outputting `/` for all links)
- [x] Implemented proper Ghost `{{navigation}}` helper usage
- [x] Dropdown menus from secondary navigation with `|` delimiter
- [x] Arrow indicators: RIGHT default → DOWN on hover (90° rotation)
- [x] Both desktop and mobile navigation working
- [x] Created `GHOST-V6-REFERENCE.md` comprehensive documentation

### Bug Fixes
- [x] Post card metadata layout (date/reading time on same line)
- [x] Tag page badge styling
- [x] Author page formatting

---

## Known Issues

### Contact Page Padding
- Bottom padding after "Send Message" button may still be excessive
- Multiple CSS fixes attempted without success
- May require further investigation of Ghost's page rendering

---

## Planned Improvements

### Short-term

- [ ] **Service Pages**: Create actual pages for Services dropdown items
  - Astrology
  - Human Design
  - Integrated Readings
  - Tarot & Oracle

- [ ] **About Pages**: Verify/create pages for About dropdown items
  - What is Vibology?
  - Biography
  - Ethics

### Medium-term

- [ ] **Sass Modernization**: Migrate from `@import` to `@use`/`@forward`
  - Current Sass deprecation warnings about `@import`
  - Will be required for Dart Sass 3.0.0

- [ ] **Accessibility Audit**
  - Review ARIA labels
  - Test keyboard navigation
  - Color contrast verification

### Long-term

- [ ] **Performance Optimization**
  - Audit JavaScript bundle size
  - Consider lazy-loading for non-critical JS
  - Review CSS for unused selectors

---

## Technical Debt

### Sass Deprecation Warnings
The build currently shows warnings about `@import` rules:
```
DEPRECATION WARNING: Sass @import rules are deprecated and will be removed in Dart Sass 3.0.0.
```

Migration path:
1. Replace `@import` with `@use` in component files
2. Use `@forward` for exposing variables/mixins
3. Update variable references to use namespaces

### Unused Partials
Review and potentially remove:
- `partials/nav-init.hbs` (no longer used after navigation rewrite)
- `partials/navigation-mobile.hbs` (if consolidated into header.hbs)

---

## Documentation Updates Needed

- [ ] Update README.md with navigation setup instructions
- [ ] Add troubleshooting section for common navigation issues
- [ ] Document the `{{navigation}}` vs `{{#foreach @site.navigation}}` distinction

---

## Notes for Future Development

### Navigation Architecture (v1.6.x)

The navigation system uses a hybrid approach:

1. **Ghost's `{{navigation}}` helper** provides proper URL context
2. **Custom `partials/navigation.hbs`** overrides default output
3. **Inline JavaScript** in `header.hbs` processes secondary nav into dropdowns
4. **`{{navigation type="secondary"}}`** renders dropdown source data

**Critical**: Never use `{{#foreach @site.navigation}}` directly for navigation - URLs will not resolve correctly. Always use the `{{navigation}}` helper which sets up proper context.

### Files Modified in v1.6.x

- `partials/header.hbs` - Navigation rendering with inline JS
- `partials/navigation.hbs` - Custom navigation partial
- `assets/scss/components/_header.scss` - Arrow rotation CSS
- `THEME-DOCUMENTATION.md` - Updated navigation docs
- `THEME-QUICK-REFERENCE.md` - Updated navigation guide
- `GHOST-V6-REFERENCE.md` - New comprehensive Ghost reference
