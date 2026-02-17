# Vibology Theme

A modern, elegant Ghost theme with dark mode, membership features, and flexible layouts.

## Version 2.0.1 - Production Ready

**What makes Vibology Theme special:**
- Clean, minimal codebase with no bloat or overengineering
- Modern build system using simple npm scripts (no complex tooling)
- Lightweight and performant (~77KB CSS, ~7KB JS minified)
- Comprehensive dark mode with FOUC prevention
- Built-in TinyBird analytics integration
- Accessible and keyboard-navigable components
- Pure CSS masonry layout (no JavaScript required)

## Features

### Design
- Clean, content-first layout
- Cabin font for primary typography
- Modular spacing system (4px grid)
- Responsive breakpoints (sm, md, lg, xl)

### Dark Mode
- Automatic detection of system preference
- FOUC (Flash of Unstyled Content) prevention
- CSS custom properties for easy theming
- Smooth transitions between modes
- Configurable dark mode logo

### Performance
- Minimal custom JavaScript (~7KB minified)
- Optimized CSS (~77KB minified)
- External libraries loaded from CDN
- Pure CSS masonry layout (no JS)

### Analytics
- Built-in TinyBird analytics integration
- Configurable via Ghost theme settings
- Respects user opt-out via localStorage

### Membership Features
- Newsletter popup with scroll trigger
- Ghost native membership integration
- Member-only content support

### Components
- Responsive header with sticky options
- Announcement bar with custom gradient styling
- Featured post slider (custom implementation)
- Image lightbox (GLightbox)
- Table of contents (auto-generated)
- Post cards (vertical, horizontal, masonry)
- Social sharing buttons
- Reading progress bar
- Back to top button

## Installation

1. Navigate to the theme directory:
   ```bash
   cd ~/Vibology/Website/vibology-theme
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the theme:
   ```bash
   npm run build
   ```

4. Create a zip file for Ghost:
   ```bash
   npm run zip
   ```

5. Upload the zip to your Ghost site via Settings → Design → Theme

## Development

### Commands

- `npm run dev` - Watch SCSS files for changes (development mode)
- `npm run build` - Build production-ready CSS and JS
- `npm run zip` - Create distributable theme zip file
- `npm run css:build` - Compile and minify CSS only
- `npm run js:build` - Minify JavaScript only

### File Structure

```
vibology-theme/
├── assets/
│   ├── css/          (compiled CSS)
│   ├── js/           (source & compiled JS)
│   └── scss/         (source SCSS)
├── partials/         (Handlebars partials)
│   ├── icons/        (SVG icons)
│   └── dark-mode-init.hbs (FOUC prevention)
├── scripts/          (build scripts)
├── locales/          (translations)
├── default.hbs       (main layout)
├── index.hbs         (homepage)
├── post.hbs          (single post)
├── package.json      (theme config)
└── postcss.config.js (PostCSS configuration)
```

## Theme Settings

Configure these settings in Ghost Admin → Settings → Design → Theme:

### General
- **Navigation Style**: Normal / Sticky / Sticky Hide
- **Dark Mode Logo**: Custom logo for dark mode
- **Formspree ID**: Contact form integration

### Analytics
- **TinyBird Token**: Analytics token (leave empty to disable)
- **TinyBird Host**: API endpoint (default: us-east-aws)

### Social
- **YouTube URL**: Your YouTube channel
- **Bluesky URL**: Your Bluesky profile

### Post Settings
- **Show TOC**: Enable/disable table of contents

### Square Images
The theme uses the Twitter card image (X card in Ghost post settings) for square thumbnail displays in sidebars and navigation. Upload square images to the X card field to keep them separate from your Facebook social images.

### Announcement Bar
The theme provides custom styling for Ghost's native announcement bar feature:

- **Custom gradient background**: Iridescent vertical gradient (cyan #9DD8F7 → lavender #B8A5E5 → pearl #E8F5FF)
- **Text**: 16px bold Cabin font (14px on mobile), Deep Indigo (#2D3561) color
- **Compact design**: Minimal vertical padding for a sleek appearance
- **Automatic rendering**: Ghost handles the display, theme provides the styling

**To configure:**
1. Go to Ghost Admin → Settings → Announcement bar
2. Add your announcement text (supports bold, italic, and links)
3. Select visibility (visitors, free members, paid members, or all)
4. The theme's gradient styling is automatically applied

## External Libraries

The theme uses these lightweight libraries loaded from CDN:

- **GLightbox** (~20KB) - Image lightbox with zoom and gallery
- **Prism.js** - Syntax highlighting for code blocks

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and CSS Columns support required
- JavaScript ES6+ features used

## Performance Metrics

| Metric | Value |
|--------|-------|
| Custom JS | ~7KB minified |
| Custom CSS | ~77KB minified |
| External Libraries | ~45KB (cached) |
| Dependencies | 6 packages |
| node_modules Size | ~35MB |
| Build Time | < 5 seconds |

## License

MIT

## Version

2.0.1 - Production Release (February 2026)

### Changelog

**v2.0.1** (2026-02-16)
- Updated iridescent gradient throughout (cyan → lavender → pearl, no pink)
- Reduced font sizes across headings for better readability
- Flipped featured slider layout (image left, content right)
- Replaced Swiper with custom lightweight slider implementation
- Updated announcement bar to iridescent gradient with Deep Indigo text
- Reduced logo size in header
- Changed nav dropdown arrows to thin chevrons (down/up)
- Removed pink from iridescent gradient

**v1.1.0** (2026-01-25)
- Added custom styling for Ghost's native announcement bar
- Iridescent gradient background
- Compact 8px vertical padding
- Transparent inner elements for clean gradient display
- Full support for links, bold, and italic text in announcements

**v1.0.2** (2026-01-25)
- Initial production release
