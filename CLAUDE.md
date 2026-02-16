# Vibology Website

## Project Overview

The Vibology website is the public-facing digital presence for Vibology — a comprehensive system integrating five symbolic instruments (Astrology, Human Design, Personal Mythos, Tarot, The Astrolabe) for self-knowledge and navigation. The site provides educational content, consultation information, and brand identity expression.

## Technology Stack

| Component | Technology |
|-----------|-----------|
| **CMS** | Ghost (headless CMS) |
| **Theme** | Custom Ghost theme (Handlebars templates) |
| **Styling** | SCSS with PostCSS pipeline |
| **Typography** | Cabin font (primary) |
| **JavaScript** | Minimal vanilla JS (~7KB minified) |
| **External Libraries** | GLightbox, Swiper, Prism.js (CDN-loaded) |
| **Build System** | npm scripts (simple, no complex tooling) |
| **Analytics** | TinyBird integration |

## Brand Identity

### Visual Language

**Iridescent Aesthetic:**
- **Primary Gradient**: Cyan (`#9DD8F7`) → Lavender (`#B8A5E5`) → Pearl (`#E8F5FF`)
- **Logo**: Dodecahedron wireframe + "Vibology" wordmark in iridescent gradient
- **Mood**: Modern, mystical, sophisticated — not garish
- **Aesthetic**: Soap bubble quality, holographic subtlety, restrained luminosity

### Design Principles

1. **Restraint Over Excess**: Iridescence is subtle, never overwhelming
2. **Dark Foundations**: Deep twilight backgrounds (navy to purple) let iridescence glow
3. **Symbolic Clarity**: Single clear subject per featured image, no clutter
4. **Atmospheric Depth**: Haze, fog, shallow depth of field for cinematic quality
5. **Digital Illustration**: Not photorealistic — soft, atmospheric rendering style

### Color Palette

**UI Colors:**
- Cyan: `#9DD8F7` (gradient start)
- Lavender: `#B8A5E5` (gradient middle)
- Pearl: `#E8F5FF` (gradient end)
- Deep Indigo: `#2D3561` (text on gradient backgrounds)

**Featured Image Palette:**
- Background: Deep twilight (navy to soft purple gradient) - 60-70% of image
- Subject/Accent: Iridescent glow (cyan, lavender, pearl tones) - subtle edge lighting
- Secondary: Complementary warm tones (amber, gold) sparingly for depth

See `STYLE-GUIDE.md` for complete visual specifications.

## Theme Structure

### Vibology Theme v1.1.0

**Key Features:**
- Clean, minimal codebase (~77KB CSS, ~7KB JS)
- Comprehensive dark mode with FOUC prevention
- Pure CSS masonry layout (no JavaScript)
- Built-in TinyBird analytics
- Ghost native membership integration
- Responsive, accessible, keyboard-navigable

### File Organization

```
vibology-theme/
├── assets/
│   ├── css/              # Compiled CSS
│   ├── js/               # Source & compiled JS
│   └── scss/             # Source SCSS files
│       ├── _variables.scss
│       ├── _typography.scss
│       ├── _reset.scss
│       ├── _utilities.scss
│       └── components/   # Component styles
├── partials/             # Handlebars partials
│   ├── icons/           # SVG icon components
│   ├── header.hbs
│   ├── footer.hbs
│   ├── navigation.hbs
│   └── dark-mode-init.hbs
├── default.hbs           # Main layout template
├── index.hbs             # Homepage
├── post.hbs              # Single post
├── page.hbs              # Static pages
├── author.hbs            # Author archive
├── tag.hbs               # Tag archive
├── package.json          # Theme config & metadata
└── postcss.config.js     # PostCSS configuration
```

## Development Workflow

### Setup

```bash
cd ~/Vibology/Website/vibology-theme
npm install
```

### Development Commands

```bash
npm run dev        # Watch SCSS files for changes
npm run build      # Build production-ready CSS and JS
npm run zip        # Create distributable theme zip
npm run css:build  # Compile and minify CSS only
npm run js:build   # Minify JavaScript only
```

### Making Changes

1. **Edit SCSS files** in `assets/scss/` directory
2. **Run `npm run dev`** for live compilation during development
3. **Test changes** in local Ghost instance or staging environment
4. **Build production assets** with `npm run build`
5. **Create theme zip** with `npm run zip`
6. **Upload to Ghost** via Settings → Design → Theme

### Theme Deployment

1. Build and zip the theme: `npm run build && npm run zip`
2. Upload `vibology-theme.zip` to Ghost admin
3. Activate the theme in Settings → Design
4. Configure theme settings (logo, dark mode logo, analytics, etc.)

## Content Guidelines

### Featured Images

**Format**: 16:9 wide digital illustration

**Composition Requirements:**
- Deep twilight background (60-70% of image)
- Single symbolic subject with iridescent glow
- Faint constellation lines or geometric patterns in background
- Grounding surface (stone, ledge, platform)
- Atmospheric depth with haze/fog
- Cinematic shallow depth of field
- No text, no people, no photorealism

**Generation Prompt Template:**
```
A wide 16:9 digital illustration in a mystical, atmospheric style. Deep twilight
background (dark navy to soft purple gradient) with restrained iridescent accent
lighting in cyan, lavender, and pearl tones. [COMPOSITION]: [SUBJECT DESCRIPTION].
Faint constellation lines and geometric patterns in the dark background. Subtle
iridescent glow on edges and key elements. Atmospheric depth, cinematic lighting,
shallow depth of field. Modern, clean aesthetic. No text, no people, no photorealism.
```

### Content Tone

- **Authoritative but accessible**: Not academic, not New Age cliché
- **Mystical precision**: Technical accuracy meets symbolic depth
- **"Anima et Algorithm"**: Balance esoteric wisdom with technical rigor
- **Personal but professional**: Authentic voice without oversharing

### Page Types

**Static Pages:**
- About — Origin story, methodology, approach
- Ethics — Professional boundaries, scope of practice
- FAQ — Common questions about consultations and systems
- Services — Astrology, Human Design, Tarot, Portrait readings

**Blog Posts:**
- Educational content on the five instruments
- Synthesis articles connecting multiple systems
- Timing techniques (transits, profections, progressions)
- Case studies (anonymized, with permission)

## Ghost Configuration

### Theme Settings (Admin → Design)

**General:**
- Navigation Style: Sticky Hide
- Dark Mode Logo: Upload alternate logo for dark mode

**Analytics:**
- TinyBird Token: [configured separately]
- TinyBird Host: us-east-aws

**Social:**
- YouTube URL, Bluesky URL (as needed)

**Post Settings:**
- Show TOC: Enabled (for long-form articles)

### Announcement Bar

Custom gradient styling automatically applied:
- Background: Cyan (`#0ce4ef`) to Magenta (`#ff03a5`) vertical gradient
- Typography: 30px bold Cabin (24px mobile)
- Compact design with 8px vertical padding
- Configure in Ghost Admin → Settings → Announcement bar

## Performance Standards

| Metric | Target |
|--------|--------|
| Custom CSS | ~77KB minified |
| Custom JS | ~7KB minified |
| External Libraries | ~45KB (cached from CDN) |
| Build Time | < 5 seconds |
| Lighthouse Score | 90+ (Performance, Accessibility, Best Practices) |

## Design System

### Spacing

4px grid system:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Breakpoints

- sm: 576px
- md: 768px
- lg: 992px
- xl: 1200px

### Typography

- **Primary**: Cabin (clean, modern, readable)
- **Code**: Monospace system font stack

### Dark Mode

- Automatic system preference detection
- FOUC prevention via inline script
- CSS custom properties for theming
- Smooth transitions between modes

## Static Assets

### Image Inventory

Located in `Static Images/`:
- `about.png` - Observatory on rocky summit
- `ethics.png` - Bronze scales on stone ledge
- `faq.png` - Gold compass on stone surface
- `astrology.png` - Zodiac wheel with iridescent glow ✓
- `humandesign.png` - Bodygraph with iridescent constellation ✓
- `tarot.png` - Tarot card + Elder Futhark runestones (legacy)
- `portrait.png` - Open book with converging geometry (legacy)
- `reading.png` - Stacked leather-bound books (legacy)

**Note**: Images marked "legacy" use older teal/amber palette. Regenerate with iridescent aesthetic when updating content.

## Maintenance Tasks

### Regular Updates

- **Theme Updates**: Test Ghost compatibility when updating Ghost version
- **Image Refresh**: Update legacy featured images to iridescent aesthetic
- **Content Review**: Ensure educational accuracy, update citations
- **Performance Audit**: Monitor Lighthouse scores, optimize as needed
- **Analytics Check**: Review TinyBird data, adjust content strategy

### Code Quality

- Keep SCSS modular and organized
- Minimize custom JavaScript (prefer CSS solutions)
- Comment complex CSS (especially grid/flexbox layouts)
- Test dark mode thoroughly
- Validate accessibility (keyboard navigation, ARIA labels)

## Related Repositories

- **the-ephemeris** - Source knowledge vault (informs website content)
- **vibology-app** - Native macOS application (separate product)

## External Resources

- Ghost Documentation: https://ghost.org/docs/
- Handlebars Documentation: https://handlebarsjs.com/
- Ghost Theme API: https://ghost.org/docs/themes/

---

*"Iridescence with restraint — mystical precision meets modern design"*
