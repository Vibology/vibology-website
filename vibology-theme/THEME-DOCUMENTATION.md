# Vibology Theme - Technical Documentation

**For Claude Code - Comprehensive Development Reference**

Version: 2.0.1
Last Updated: 2026-02-16
Ghost Compatibility: 6.0+

---

## ⚠️ CRITICAL: Always Consult Ghost Documentation

**BEFORE making any theme changes, you MUST:**

1. **Read GHOST-V6-REFERENCE.md** in this directory for Ghost v6 best practices
2. **Verify Handlebars syntax** against official Ghost documentation
3. **Check for proper escaping**: URLs require triple braces `{{{url}}}`, not double `{{url}}`
4. **Review navigation examples** in Ghost docs before modifying navigation code
5. **Test against Ghost's template hierarchy** and helper availability

**Common mistakes to avoid:**
- Using `{{#foreach @site.navigation}}` instead of `{{#foreach navigation}}` inside navigation partials (URLs will be `/` instead of actual URLs!)
- Using `{{url}}` instead of `{{{url}}}` in some contexts (check GHOST-V6-REFERENCE.md)
- Using unsupported helpers like `{{json}}`
- Not following Ghost's navigation data structure
- Implementing FOUC prevention incorrectly

**Reference files in order of priority:**
1. `/GHOST-V6-REFERENCE.md` - Official Ghost v6 documentation
2. `/THEME-DOCUMENTATION.md` - This file (theme-specific implementation)
3. `/THEME-QUICK-REFERENCE.md` - Quick lookup guide

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Ghost Theme Fundamentals](#ghost-theme-fundamentals)
3. [File Structure](#file-structure)
4. [Template Hierarchy](#template-hierarchy)
5. [Handlebars Reference](#handlebars-reference)
6. [Build System](#build-system)
7. [Styling Architecture](#styling-architecture)
8. [JavaScript Components](#javascript-components)
9. [Custom Settings](#custom-settings)
10. [Image Handling](#image-handling)
11. [Best Practices](#best-practices)
12. [Development Workflow](#development-workflow)
13. [Deployment](#deployment)

---

## Architecture Overview

### Technology Stack

- **Templating**: Handlebars.js (Ghost's template engine)
- **CSS**: SCSS with modular component architecture
- **JavaScript**: Vanilla ES6+ (no frameworks)
- **Build Tools**:
  - Sass compiler for CSS
  - PostCSS (Autoprefixer + cssnano) for optimization
  - Terser for JS minification
- **External Libraries** (CDN):
  - GLightbox (~20KB) - image lightbox
  - Prism.js - syntax highlighting

### Design Philosophy

1. **Content-first**: Clean, readable layouts that prioritize written content
2. **Minimal JavaScript**: Only essential interactivity (~7KB custom JS)
3. **Performance-focused**: Optimized assets, lazy loading, efficient selectors
4. **Accessible**: ARIA labels, keyboard navigation, semantic HTML
5. **Dark mode native**: CSS custom properties for theming with FOUC prevention

### Key Features

- Comprehensive dark mode with system preference detection
- Custom announcement bar styling (iridescent gradient)
- TinyBird analytics integration
- Ghost native membership support
- Newsletter popup with scroll trigger
- Featured post slider
- Table of contents generation
- Social sharing buttons
- Reading progress indicator
- Responsive masonry post grid
- Custom page templates (contact, full-width)

---

## Ghost Theme Fundamentals

### How Ghost Themes Work

Ghost uses **Handlebars** as its templating language. Themes are composed of:

1. **Templates** (.hbs files) - Define page structure
2. **Partials** - Reusable template components
3. **Assets** - CSS, JS, images, fonts
4. **package.json** - Theme configuration and metadata

### Template Resolution

Ghost follows a specific hierarchy when selecting templates:

**Posts:**
```
post-{slug}.hbs → post.hbs → index.hbs
```

**Pages:**
```
page-{slug}.hbs → custom-{template}.hbs → page.hbs → index.hbs
```

**Collections:**
```
index.hbs (homepage)
home.hbs (custom homepage, higher priority than index.hbs)
tag.hbs (tag archives)
author.hbs (author archives)
```

**Special:**
```
error.hbs (general errors)
error-404.hbs (not found)
```

### Context Objects

Ghost provides different data contexts to templates:

- `@site` - Site-wide settings (title, logo, navigation, etc.)
- `@member` - Current logged-in member (if any)
- `@custom` - Custom theme settings from package.json
- `post` - Individual post data
- `page` - Individual page data
- `tag` - Tag data
- `author` - Author data

---

## File Structure

```
vibology-theme/
├── assets/
│   ├── css/
│   │   └── screen.css              # Compiled CSS (gitignored)
│   ├── js/
│   │   ├── main.js                 # Source JavaScript
│   │   └── bundle.js               # Minified JS (gitignored)
│   └── scss/
│       ├── screen.scss             # Main SCSS entry point
│       ├── _variables.scss         # Design tokens
│       ├── _reset.scss             # CSS reset
│       ├── _typography.scss        # Font styles
│       ├── _utilities.scss         # Utility classes
│       └── components/             # Component styles
│           ├── _announcement.scss
│           ├── _header.scss
│           ├── _footer.scss
│           ├── _post.scss
│           ├── _post-card.scss
│           ├── _sidebar.scss
│           ├── _slider.scss
│           ├── _pagination.scss
│           ├── _contact.scss
│           ├── _comments.scss
│           ├── _membership.scss
│           ├── _newsletter-popup.scss
│           ├── _reading-progress.scss
│           ├── _series.scss
│           ├── _prism.scss
│           ├── _interactive.scss
│           ├── _archive.scss
│           └── _error.scss
├── partials/
│   ├── dark-mode-init.hbs          # FOUC prevention (inline)
│   ├── header.hbs                  # Site header
│   ├── footer.hbs                  # Site footer
│   ├── sidebar.hbs                 # Sidebar component
│   ├── post-card.hbs               # Post card (vertical)
│   ├── post-card-featured.hbs      # Featured post card
│   ├── featured-slider.hbs         # Homepage slider
│   ├── pagination.hbs              # Pagination component
│   ├── share-buttons.hbs           # Social sharing
│   ├── series-nav.hbs              # Series navigation
│   ├── newsletter-popup.hbs        # Newsletter modal
│   └── icons/                      # SVG icon partials
│       ├── menu.hbs
│       ├── close.hbs
│       ├── search.hbs
│       ├── user.hbs
│       ├── calendar.hbs
│       └── clock.hbs
├── scripts/
│   └── package.js                  # Zip packaging script
├── default.hbs                     # Base layout (wrapper)
├── index.hbs                       # Default homepage
├── home.hbs                        # Custom homepage with slider
├── post.hbs                        # Single post
├── page.hbs                        # Default page
├── page-contact.hbs                # Contact page template
├── custom-full-width.hbs           # Full-width page template
├── tag.hbs                         # Tag archive
├── author.hbs                      # Author archive
├── error.hbs                       # General error
├── error-404.hbs                   # 404 error
├── package.json                    # Theme config + settings
├── postcss.config.js               # PostCSS configuration
└── README.md                       # Theme readme
```

---

## Template Hierarchy

### Core Templates

#### default.hbs
The **base layout** that wraps all pages. Contains:
- `<head>` with meta tags, CSS includes
- Dark mode initialization script (FOUC prevention)
- Site header
- `{{{body}}}` placeholder for page content
- Site footer
- Newsletter popup
- Back to top button
- JavaScript includes (Prism, GLightbox, bundle.js)
- TinyBird analytics

**Key sections:**
```handlebars
{{> "dark-mode-init"}}              # Inline script to prevent flash
{{ghost_head}}                       # Ghost meta tags
{{> "header"}}                       # Site header
{{{body}}}                           # Page content inserted here
{{> "footer"}}                       # Site footer
{{> "newsletter-popup"}}             # Newsletter modal
{{ghost_foot}}                       # Ghost scripts
```

#### index.hbs
Default homepage (used if `home.hbs` doesn't exist). Displays:
- Single featured post in card
- Post feed (vertical cards)
- Pagination

#### home.hbs
**Custom homepage** with enhanced layout:
- Featured slider (if featured posts exist)
- Post feed with vertical cards
- Sidebar
- Pagination

**Usage:** Set as homepage via Ghost Settings → Design → Homepage

#### post.hbs
Single post template. Structure:
```handlebars
{{#post}}                            # Post context
  - Scroll progress bar
  - Feature image (if exists)
  - Post header (title, author, date, reading time)
  - Table of contents (if enabled in settings)
  - Post content
  - Series navigation
  - Share buttons
  - Post footer (tags, author box)
  - Related posts (same primary tag)
  - Prev/next navigation
  - Ghost native comments
{{/post}}
```

#### page.hbs
Default page template. Simpler than post:
```handlebars
{{#page}}
  - Page header (title, excerpt)
  - Page content
  - Sidebar
{{/page}}
```

#### page-contact.hbs
**Custom template** for contact forms. Includes:
- Page header with title and excerpt
- Page content (intro text from editor)
- Formspree integration (uses `@custom.formspree_id`)
- Honeypot spam protection
- Sidebar

**How to use:** In Ghost editor, set page template to "Contact"

#### custom-full-width.hbs
**Custom template** for full-width pages (landing pages, portfolios):
- No sidebar
- No floating card wrapper
- Full-width feature image
- Centered header
- Wide content container

**How to use:** In Ghost editor, set page template to "Full Width"

#### tag.hbs
Tag archive page. Shows:
- Tag header (name, description, feature image)
- Post feed for tagged posts
- Pagination

#### author.hbs
Author archive page. Shows:
- Author header (avatar, name, bio, social links)
- Post feed for author's posts
- Pagination

#### error.hbs
General error page (500, 503, etc.)

#### error-404.hbs
Custom 404 not found page with search

---

## Handlebars Reference

### Ghost-Specific Helpers

#### Context Helpers

```handlebars
{{#post}}...{{/post}}               # Post context
{{#page}}...{{/page}}               # Page context
{{#tag}}...{{/tag}}                 # Tag context
{{#author}}...{{/author}}           # Author context
```

#### Content Helpers

```handlebars
{{title}}                           # Post/page title
{{content}}                         # Rendered HTML content
{{excerpt}}                         # Auto-generated excerpt
{{excerpt words="50"}}              # Custom length excerpt
{{feature_image}}                   # Feature image URL
{{feature_image_alt}}               # Alt text
{{feature_image_caption}}           # Caption
{{primary_tag}}                     # First tag
{{primary_author}}                  # First author
{{tags}}                            # All tags
{{authors}}                         # All authors
```

#### URL Helpers

```handlebars
{{url}}                             # Canonical URL
{{url absolute="true"}}             # Absolute URL
{{@site.url}}                       # Site URL
{{@site.logo}}                      # Site logo
```

#### Image Helpers

```handlebars
{{img_url feature_image size="l"}}  # Responsive image
{{img_url profile_image size="xs"}} # Sized image
```

Sizes from package.json:
- `xs` - 150px
- `s` - 400px
- `m` - 750px
- `l` - 1200px
- `xl` - 2000px

#### Date Helpers

```handlebars
{{date}}                            # Default format
{{date format="MMMM DD, YYYY"}}     # Custom format
{{date format="YYYY-MM-DD"}}        # ISO format
```

#### Loop Helpers

```handlebars
{{#foreach posts}}
  {{title}}                         # Access post properties
  {{@first}}                        # True on first iteration
  {{@last}}                         # True on last iteration
  {{@index}}                        # Current index (0-based)
  {{@number}}                       # Current number (1-based)
{{/foreach}}
```

#### Conditional Helpers

```handlebars
{{#if featured}}...{{/if}}          # Boolean check
{{#unless featured}}...{{/unless}}  # Inverse boolean
{{#has tag="news"}}...{{/has}}      # Tag check
{{#match @custom.setting "value"}}  # Setting match
```

#### Get Helper (Content API)

Fetch content dynamically:

```handlebars
{{#get "posts" filter="featured:true" limit="5"}}
  {{#foreach posts}}
    {{title}}
  {{/foreach}}
{{/get}}
```

Common filters:
- `featured:true` - Featured posts
- `tag:slug` - Posts with tag
- `author:slug` - Posts by author
- `id:-{{id}}` - Exclude current post

#### Navigation Helpers

```handlebars
{{#foreach @site.navigation}}       # Primary nav
  {{label}} {{url}}
{{/foreach}}

{{#foreach @site.secondary_navigation}}  # Secondary nav
  {{label}} {{url}}
{{/foreach}}
```

#### Member Helpers

```handlebars
{{#if @member}}                     # Logged in member
  {{@member.name}}
  {{@member.email}}
{{/if}}

{{#if @site.members_enabled}}       # Membership enabled
  ...member actions
{{/if}}
```

#### Custom Settings

```handlebars
{{@custom.navigation_style}}        # Custom select setting
{{@custom.show_toc}}                # Custom boolean
{{@custom.formspree_id}}            # Custom text
{{@custom.dark_mode_logo}}          # Custom image
```

#### Ghost Output Helpers

```handlebars
{{ghost_head}}                      # Meta tags, structured data
{{ghost_foot}}                      # Ghost admin scripts
{{body_class}}                      # Context-specific classes
{{post_class}}                      # Post-specific classes
```

---

## Build System

### Scripts (package.json)

```bash
npm run dev          # Watch SCSS files for changes (development)
npm run build        # Build production CSS + JS
npm run zip          # Build + create distributable zip
npm run css:build    # Compile and minify CSS only
npm run css:watch    # Watch CSS changes only
npm run js:build     # Minify JavaScript only
npm run package      # Create zip file
```

### CSS Build Pipeline

1. **Sass compilation** (`assets/scss/screen.scss` → `assets/css/screen.css`)
   - Imports all component SCSS
   - Compiles variables and mixins
   - Development: expanded with source maps
   - Production: compressed without source maps

2. **PostCSS processing**
   - **Autoprefixer**: Adds vendor prefixes for browser compatibility
   - **cssnano**: Minifies CSS (removes whitespace, optimizes selectors)

Output: `assets/css/screen.css` (~77KB minified)

### JavaScript Build

**Source:** `assets/js/main.js`
**Output:** `assets/js/bundle.js` (~7KB minified)

Build with Terser:
```bash
terser assets/js/main.js -o assets/js/bundle.js --compress --mangle
```

### Package Script

`scripts/package.js` creates a zip file for Ghost upload:
- Excludes: node_modules, .git, source files, dev configs
- Includes: templates, compiled assets, package.json
- Output: `vibology-theme-{version}.zip` (e.g., `vibology-theme-2.0.1.zip`)

---

## Styling Architecture

### SCSS Organization

**Main file:** `assets/scss/screen.scss`

```scss
@import 'variables';       // Design tokens
@import 'reset';           // CSS reset
@import 'typography';      // Font styles
@import 'utilities';       // Utility classes

// Components
@import 'components/header';
@import 'components/footer';
// ... etc
```

### Design Tokens (_variables.scss)

#### Typography

```scss
$font-sans: 'Cabin', -apple-system, ...;
$font-serif: Georgia, ...;
$font-mono: 'SF Mono', ...;

// Font sizes (modular scale)
$text-xs: 0.875rem;    // 14px
$text-base: 1rem;      // 16px
$text-lg: 1.125rem;    // 18px
$text-2xl: 1.5rem;     // 24px
$text-4xl: 2.25rem;    // 36px
$text-5xl: 3rem;       // 48px

// Font weights
$font-regular: 400;
$font-medium: 500;
$font-semibold: 600;
$font-bold: 700;

// Line heights
$leading-tight: 1.25;
$leading-normal: 1.5;
$leading-relaxed: 1.625;
```

#### Spacing System (4px grid)

```scss
$space-1: 0.25rem;     // 4px
$space-2: 0.5rem;      // 8px
$space-4: 1rem;        // 16px
$space-6: 1.5rem;      // 24px
$space-8: 2rem;        // 32px
$space-12: 3rem;       // 48px
$space-16: 4rem;       // 64px
$space-24: 6rem;       // 96px
```

#### Breakpoints

```scss
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;
```

#### Colors

**Light mode:**
```scss
$light-bg: #F9F9FF;              // Background
$light-bg-secondary: #FFFFFF;    // Cards/surfaces
$light-text: #2D3350;            // Primary text (10.8:1 contrast)
$light-text-secondary: #6B7280;  // Secondary text (5.9:1 contrast)
$light-border: #DADCE5;          // Borders
$light-shadow: rgba(45, 51, 80, 0.1);
```

**Dark mode:**
```scss
$dark-bg: #1A1A1A;               // Background (like Neon theme)
$dark-bg-secondary: #0A0A0A;     // Cards/surfaces (darker on gray)
$dark-text: #EAEAEA;             // Primary text (15.8:1 contrast)
$dark-text-secondary: #B5B5B5;   // Secondary text (8.2:1 contrast)
$dark-border: #2A2A2A;           // Subtle borders
$dark-shadow: rgba(0, 0, 0, 0.8);
```

**Iridescent Gradient (Primary):**
```scss
$iridescent-cyan: #9DD8F7;       // Gradient start (0%)
$iridescent-lavender: #B8A5E5;   // Gradient middle (35%)
$iridescent-pearl: #E8F5FF;      // Gradient end (100%)
// Canonical gradient: linear-gradient(180deg, $iridescent-cyan 0%, $iridescent-lavender 35%, $iridescent-pearl 100%)
// Text on gradient: Deep Indigo #2D3561
```

**Accent:**
```scss
$accent-default: #B8A5E5;        // Lavender (used for links, borders, active states)
```

#### CSS Custom Properties

Used for runtime theming:

```scss
:root {
  --color-bg: #{$light-bg};
  --color-bg-secondary: #{$light-bg-secondary};
  --color-text: #{$light-text};
  --color-text-secondary: #{$light-text-secondary};
  --color-border: #{$light-border};
  --color-accent: #{$iridescent-lavender};  // #B8A5E5

  --font-sans: #{$font-sans};
  --header-height: 80px;
  --container-width: #{$container-xl};
}

[data-theme="dark"] {
  --color-bg: #{$dark-bg};
  --color-bg-secondary: #{$dark-bg-secondary};
  --color-text: #{$dark-text};
  --color-text-secondary: #{$dark-text-secondary};
  --color-border: #{$dark-border};
}
```

### Component Architecture

Each component has its own SCSS file in `assets/scss/components/`:

- **_announcement.scss** - Ghost announcement bar styling (custom gradient)
- **_header.scss** - Site header, navigation, mobile menu
- **_footer.scss** - Site footer
- **_post.scss** - Single post styles
- **_post-card.scss** - Post card variations
- **_sidebar.scss** - Sidebar component
- **_slider.scss** - Featured slider
- **_pagination.scss** - Pagination component
- **_contact.scss** - Contact form
- **_newsletter-popup.scss** - Newsletter modal
- **_reading-progress.scss** - Reading progress bar
- **_membership.scss** - Member UI elements
- **_comments.scss** - Ghost comments
- **_series.scss** - Series navigation
- **_prism.scss** - Code syntax highlighting
- **_interactive.scss** - Interactive elements (buttons, forms)
- **_archive.scss** - Tag/author archives
- **_error.scss** - Error pages

### Utility Classes

```scss
// Text utilities
.text-center { text-align: center; }
.text-sm { font-size: $text-sm; }
.text-secondary { color: var(--color-text-secondary); }

// Spacing utilities
.mt-4 { margin-top: $space-4; }
.mb-8 { margin-bottom: $space-8; }
.py-8 { padding-top: $space-8; padding-bottom: $space-8; }

// Layout utilities
.container { max-width: var(--container-width); margin: 0 auto; }
.content-card { background: var(--color-bg-secondary); border-radius: $radius-lg; }
```

---

## JavaScript Components

### Main Initializations (main.js)

All functions are called in `init()` on DOM ready:

```javascript
function init() {
  initDarkMode();
  initMobileMenu();
  initDropdowns();
  initStickyHeader();
  initShareButtons();
  initScrollProgress();
  initBackToTop();
  initTableOfContents();
  initLightbox();
  initFeaturedSlider();
  initTagColors();
  initNewsletterPopup();
}
```

### Dark Mode (`initDarkMode`)

**Storage:** `localStorage.getItem('theme')`
**Values:** `'light'`, `'dark'`, `'auto'` (cycles through these)

**Logic:**
- Reads stored preference or defaults to 'auto'
- 'auto' respects system preference via `prefers-color-scheme`
- Listens for system preference changes
- Toggle button cycles through modes
- Sets `data-theme="dark"` or `data-theme="light"` on `<html>`

**FOUC Prevention:**
Inline script in `partials/dark-mode-init.hbs` runs before page renders to apply theme instantly.

### Mobile Menu (`initMobileMenu`)

**Trigger:** `.mobile-menu-toggle` button
**Target:** `.mobile-menu` overlay

**Features:**
- Slides in from side
- Locks body scroll when open
- Close on Escape key
- Close on overlay click
- Dropdown support for navigation items with `|` delimiter
- Accessible (aria-expanded, aria-label)

### Navigation & Dropdowns

The theme uses a hybrid approach combining Ghost's `{{navigation}}` helper with JavaScript for dropdown menus.

**CRITICAL: Navigation URL Context**

When customizing navigation, you MUST use the `{{navigation}}` helper which provides proper URL context. Do NOT use `{{#foreach @site.navigation}}` directly - URLs will output as `/` instead of actual URLs.

**Correct approach (in `partials/navigation.hbs`):**
```handlebars
{{#foreach navigation}}
    <li><a href="{{url}}">{{label}}</a></li>
{{/foreach}}
```

**Incorrect approach (URLs will be broken):**
```handlebars
{{#foreach @site.navigation}}
    <li><a href="{{url}}">{{label}}</a></li>
{{/foreach}}
```

**Dropdown Menu Structure:**

Secondary navigation items with `|` delimiter are grouped into dropdowns:
- `"About | What is Vibology?"` → "About" dropdown with "What is Vibology?" item
- `"About | Biography"` → Same "About" dropdown with "Biography" item
- `"Services | Astrology"` → "Services" dropdown with "Astrology" item

**Implementation (in `partials/header.hbs`):**
1. `{{navigation type="secondary"}}` renders hidden items with data attributes
2. Inline JavaScript groups items by dropdown name
3. Dropdown HTML is built and inserted before primary nav items
4. `{{navigation}}` renders primary navigation items after dropdowns

**Arrow Indicators:**
- Default state: Chevron points DOWN (↓) — thin 7px×7px chevron with 2px stroke
- Hover/open state: Chevron rotates to point UP (↑)

**Required Setup in Ghost Admin:**
1. Go to Settings → Navigation
2. **Secondary tab**: Add dropdown items with `|` format (e.g., "About | Biography")
3. **Primary tab**: Add standalone items (e.g., "Contact")
4. **Important**: All items must have URLs set, or they default to `/`

### Sticky Header (`initStickyHeader`)

**Variants** (from `@custom.navigation_style`):
- **Normal:** No sticky behavior
- **Sticky:** Always visible on scroll
- **Sticky Hide:** Hides on scroll down, shows on scroll up

**Classes:**
- `.header-scrolled` - Added after 50px scroll (background/shadow)
- `.header-hidden` - Added when scrolling down (for sticky-hide)

### Share Buttons (`initShareButtons`)

Copy link button with visual feedback:
- Copies URL to clipboard
- Shows "Copied!" message
- Adds `.copied` class for styling
- Resets after 2 seconds

### Scroll Progress (`initScrollProgress`)

Reading progress bar at top of page:
- Calculates scroll percentage
- Updates `.scroll-progress-bar` width
- Shows after 100px scroll

### Back to Top (`initBackToTop`)

Floating button that:
- Shows after 300px scroll
- Smooth scrolls to top
- Accessible (aria-label)

### Table of Contents (`initTableOfContents`)

**Enabled:** When `@custom.show_toc` is true

**Generation:**
- Finds all `h2`, `h3`, `h4` in `.post-content`
- Creates anchor links
- Generates nested list
- Smooth scroll on click

**Active highlighting:**
- Uses Intersection Observer (efficient)
- Highlights current section in view

### Lightbox (`initLightbox`)

Initializes GLightbox for all images in `.post-content`:
- Touch/swipe navigation
- Keyboard controls
- Zoom capability
- Gallery mode

**CDN:** `https://cdn.jsdelivr.net/npm/glightbox@3.2.0/`

### Featured Slider (`initFeaturedSlider`)

Custom slider implementation (no Swiper dependency):

**Features:**
- Auto-play (7 second interval)
- Pause on hover
- Keyboard navigation (arrow keys)
- Pagination dots with gradient colors
- Tag color generation
- Smooth transitions

**Colors:**
- Dots interpolate across the iridescent gradient (cyan #9DD8F7 → lavender #B8A5E5 → pearl #E8F5FF)
- Tags get consistent color from string hash

### Tag Colors (`initTagColors`)

Generates consistent colors for tags:
- Hashes tag name to HSL values
- High saturation (70-95%) for vibrancy
- Good lightness (60-80%) for dark theme
- Sets `--tag-dot-color` CSS variable

### Newsletter Popup (`initNewsletterPopup`)

Modal that appears after scrolling 50% of page:

**Cookie:** `newsletter_popup_dismissed` (30 days)

**Features:**
- Scroll trigger (50% page depth)
- Formspree integration (uses `@custom.formspree_id`)
- Ghost API for newsletter signup
- "Don't show again" checkbox
- Close on Escape, overlay click, or button
- Success/error messages

**Form submission:**
```javascript
POST /members/api/send-magic-link/
{
  "email": "user@example.com",
  "emailType": "subscribe"
}
```

---

## Custom Settings

Defined in `package.json` under `config.custom`:

### Navigation Style

```json
"navigation_style": {
  "type": "select",
  "options": ["Normal", "Sticky", "Sticky Hide"],
  "default": "Sticky",
  "group": "homepage"
}
```

**Usage:** `{{@custom.navigation_style}}`

### Show Table of Contents

```json
"show_toc": {
  "type": "boolean",
  "default": false,
  "group": "post"
}
```

**Usage:** `{{#if @custom.show_toc}}`

### Square Images for Previews

**Using Twitter Card Image for Square Thumbnails**

The theme uses Ghost's built-in `twitter_image` field for square thumbnail displays in:
- Sidebar widgets (Featured Posts, Latest Posts)
- Post navigation (Previous/Next)
- 404 error page suggestions

**Fallback order:**
1. `{{twitter_image}}` - Twitter card image (use this for square thumbnails)
2. `{{og_image}}` - Facebook/Open Graph image
3. `{{feature_image}}` - Main feature image

**How to use:**
In the Ghost post editor, go to Post Settings → X card → upload your square image (1:1 aspect ratio). This keeps your Facebook `og_image` separate for social sharing while providing dedicated square thumbnails for the theme's preview components.

### Dark Mode Logo

```json
"dark_mode_logo": {
  "type": "image",
  "group": "homepage"
}
```

**Usage:** `{{@custom.dark_mode_logo}}`

### Social URLs

```json
"youtube_url": {
  "type": "text",
  "default": "",
  "description": "YouTube URL",
  "group": "homepage"
}
"bluesky_url": {
  "type": "text",
  "default": "",
  "description": "Bluesky URL",
  "group": "homepage"
}
```

**Usage:** `{{@custom.youtube_url}}`

### Formspree ID

```json
"formspree_id": {
  "type": "text",
  "default": "",
  "description": "Formspree ID - Your Formspree form ID (e.g., xpznqwya)",
  "group": "homepage"
}
```

**Usage:** `{{@custom.formspree_id}}` in contact form

### TinyBird Analytics

```json
"tinybird_token": {
  "type": "text",
  "default": "",
  "description": "TinyBird analytics token",
  "group": "homepage"
}
"tinybird_host": {
  "type": "text",
  "default": "https://api.us-east.aws.tinybird.co",
  "group": "homepage"
}
```

**Usage:** Conditional loading in `default.hbs`:
```handlebars
{{#if @custom.tinybird_token}}
  <script>...</script>
{{/if}}
```

**Opt-out:** Set `localStorage.setItem('tinybird_ignore', 'true')`

### Announcement Bar

**Ghost Native Feature with Custom Styling**

The theme provides custom styling for Ghost's built-in announcement bar feature. Ghost automatically injects the announcement bar via JavaScript; the theme only provides CSS styling.

**Configuration:**
1. Go to Ghost Admin → Settings → Announcement bar
2. Add your announcement text (supports **bold**, *italic*, and links)
3. Select visibility (visitors, free members, paid members, or all)
4. Save changes

**Theme Styling:**
- **Background**: Iridescent vertical gradient (cyan #9DD8F7 → lavender #B8A5E5 → pearl #E8F5FF)
- **Typography**: 16px bold Cabin font (14px on mobile)
- **Padding**: 8px vertical for compact appearance
- **Colors**: Deep Indigo (#2D3561) text on gradient background

**CSS Classes Used:**
```scss
#announcement-bar-root        // Main container (Ghost-injected)
.gh-announcement-bar-content  // Content wrapper
.gh-announcement-bar.accent   // Accent variant
```

**Customization:**
To modify the gradient or styling, edit `assets/scss/components/_announcement.scss`:
```scss
#announcement-bar-root {
  background: linear-gradient(180deg, $iridescent-cyan 0%, $iridescent-lavender 35%, $iridescent-pearl 100%) !important;
}
```

**Technical Notes:**
- Ghost handles rendering and dismiss functionality automatically
- The theme forces transparent backgrounds on all inner elements
- Gradient applies to top-level container to avoid nested background conflicts
- Uses `!important` to override Ghost's default styling

---

## Image Handling

### Image Sizes (package.json)

```json
"image_sizes": {
  "xs": { "width": 150 },
  "s": { "width": 400 },
  "m": { "width": 750 },
  "l": { "width": 1200 },
  "xl": { "width": 2000 }
}
```

### Using img_url Helper

```handlebars
{{img_url feature_image size="l"}}
{{img_url profile_image size="xs"}}
```

Ghost automatically:
- Generates responsive variants
- Serves WebP when supported
- Optimizes quality
- Adds srcset for retina displays

### Responsive Images

Use `sizes` attribute for responsive behavior:

```handlebars
<img
  src="{{img_url feature_image size="m"}}"
  srcset="{{img_url feature_image size="s"}} 400w,
          {{img_url feature_image size="m"}} 750w,
          {{img_url feature_image size="l"}} 1200w"
  sizes="(max-width: 768px) 100vw, 750px"
  alt="{{title}}"
>
```

### Lazy Loading

```handlebars
<img src="{{img_url image size="m"}}" loading="lazy" alt="...">
```

Browsers natively lazy-load images below the fold.

---

## Best Practices

### Template Development

1. **Always use partials for reusable components**
   ```handlebars
   {{> "header"}}
   {{> "footer"}}
   ```

2. **Check context before accessing properties**
   ```handlebars
   {{#if feature_image}}
     <img src="{{feature_image}}" alt="{{title}}">
   {{/if}}
   ```

3. **Use semantic HTML and ARIA labels**
   ```handlebars
   <button aria-label="Toggle menu" aria-expanded="false">
   ```

4. **Leverage Ghost helpers for URLs**
   ```handlebars
   <a href="{{url}}">{{title}}</a>
   ```

5. **Use img_url for all images**
   ```handlebars
   {{img_url feature_image size="l"}}
   ```

### Styling Best Practices

1. **Use CSS custom properties for themeable values**
   ```scss
   color: var(--color-text);
   background: var(--color-bg-secondary);
   ```

2. **Follow the spacing system (4px grid)**
   ```scss
   margin-bottom: $space-8;  // Not arbitrary values
   ```

3. **Use modular scale for font sizes**
   ```scss
   font-size: $text-lg;  // Not 19px
   ```

4. **Mobile-first media queries**
   ```scss
   .element {
     // Mobile styles first

     @media (min-width: $breakpoint-md) {
       // Tablet and up
     }
   }
   ```

5. **Component-scoped styles**
   ```scss
   .post-card {
     &__image { ... }
     &__title { ... }
     &__excerpt { ... }
   }
   ```

### JavaScript Best Practices

1. **Check for element existence**
   ```javascript
   const header = document.querySelector('.site-header');
   if (!header) return;
   ```

2. **Use event delegation for dynamic elements**
   ```javascript
   document.addEventListener('click', (e) => {
     if (e.target.matches('.dynamic-element')) { ... }
   });
   ```

3. **Efficient observers over scroll listeners**
   ```javascript
   const observer = new IntersectionObserver(callback, options);
   ```

4. **Accessible interactive elements**
   ```javascript
   button.setAttribute('aria-expanded', 'true');
   ```

5. **Error handling for async operations**
   ```javascript
   try {
     await navigator.clipboard.writeText(url);
   } catch (err) {
     console.error('Failed:', err);
   }
   ```

### Performance

1. **Lazy load images**
   ```handlebars
   <img src="..." loading="lazy">
   ```

2. **Minimize custom JavaScript**
   - Use CSS for animations
   - Leverage native browser features
   - Only load libraries when needed

3. **Optimize build output**
   ```bash
   npm run build  # Minifies CSS and JS
   ```

4. **Use CDN for external libraries**
   - Prism.js, GLightbox from CDN
   - Better caching, lower server load

5. **Efficient selectors**
   ```javascript
   // Good: specific class
   document.querySelector('.site-header');

   // Avoid: complex selectors
   document.querySelector('div.container > header.site-header');
   ```

---

## Development Workflow

### Initial Setup

```bash
cd ~/Vibology/Website/vibology-theme
npm install
```

### Development Mode

```bash
npm run dev
```

This starts Sass in watch mode:
- Watches `assets/scss/**/*.scss` for changes
- Compiles to `assets/css/screen.css` with source maps
- Outputs expanded CSS for debugging

### Making Changes

1. **Edit SCSS files** in `assets/scss/`
2. **Edit JS** in `assets/js/main.js`
3. **Edit templates** (.hbs files)
4. **Test locally** (if using Ghost locally)

### Building for Production

```bash
npm run build
```

This:
- Compiles and minifies CSS (Sass → PostCSS)
- Minifies JavaScript (Terser)
- Outputs to `assets/css/screen.css` and `assets/js/bundle.js`

### Creating Distributable Zip

```bash
npm run zip
```

Creates `vibology-theme-2.0.1.zip` (versioned) ready for Ghost upload.

### Common Tasks

**Add a new component:**
1. Create `assets/scss/components/_newcomponent.scss`
2. Import in `assets/scss/screen.scss`:
   ```scss
   @import 'components/newcomponent';
   ```
3. Create partial `partials/newcomponent.hbs`
4. Include in template:
   ```handlebars
   {{> "newcomponent"}}
   ```

**Add a new custom setting:**
1. Edit `package.json` under `config.custom`:
   ```json
   "my_setting": {
     "type": "text",
     "default": "",
     "description": "My custom setting",
     "group": "homepage"
   }
   ```
2. Use in template:
   ```handlebars
   {{@custom.my_setting}}
   ```

**Add a new page template:**
1. Create `custom-mytemplate.hbs`
2. Wrap content in `{{#page}}...{{/page}}`
3. Upload theme to Ghost
4. Select template in Ghost editor → Settings → Template

---

## Deployment

### To Ghost (Local or PikaPod)

1. **Build and package:**
   ```bash
   npm run zip
   ```

2. **Upload to Ghost:**
   - Go to Ghost Admin → Settings → Design
   - Click "Change theme"
   - Upload `vibology-theme-2.0.1.zip`
   - Activate theme

3. **Configure custom settings:**
   - Settings → Design → Theme settings
   - Set navigation style, logos, API keys, etc.

### Version Control

**Recommended .gitignore:**
```
node_modules/
assets/css/screen.css
assets/css/screen.css.map
assets/js/bundle.js
*.zip
.DS_Store
```

**Commit workflow:**
```bash
git add .
git commit -m "feat: add new component"
git push
```

### Testing Before Deploy

If running Ghost locally:
```bash
ghost restart
```

Or upload to staging environment first.

---

## Troubleshooting

### Common Issues

**CSS not updating:**
- Run `npm run build` to recompile
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
- Check console for 404 errors on CSS file

**JavaScript not working:**
- Check browser console for errors
- Verify `bundle.js` exists in `assets/js/`
- Ensure external libraries (GLightbox, Prism) loaded

**Template changes not showing:**
- Re-upload theme zip to Ghost
- Restart Ghost (if local): `ghost restart`
- Clear browser cache

**Dark mode FOUC (flash):**
- Verify `dark-mode-init.hbs` is included in `<head>`
- Check localStorage permissions in browser
- Inline script must run before CSS loads

**Custom settings not available:**
- Verify `package.json` syntax is valid
- Re-upload theme after changing package.json
- Restart Ghost

---

## Ghost API Reference

### Content API

Used with `{{#get}}` helper:

**Get featured posts:**
```handlebars
{{#get "posts" filter="featured:true" limit="5"}}
  {{#foreach posts}}{{title}}{{/foreach}}
{{/get}}
```

**Get posts by tag:**
```handlebars
{{#get "posts" filter="tag:news" limit="3"}}
  {{#foreach posts}}{{title}}{{/foreach}}
{{/get}}
```

**Exclude current post:**
```handlebars
{{#get "posts" filter="id:-{{id}}" limit="3"}}
  {{#foreach posts}}{{title}}{{/foreach}}
{{/get}}
```

### Members API

**Newsletter signup:**
```javascript
fetch('/members/api/send-magic-link/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    emailType: 'subscribe'
  })
})
```

**Member context:**
```handlebars
{{#if @member}}
  <p>Welcome, {{@member.name}}!</p>
  <a href="/#/portal/account">Account</a>
{{/if}}
```

---

## Further Resources

### Official Documentation

- **Ghost Themes:** https://ghost.org/docs/themes/
- **Handlebars:** https://handlebarsjs.com/
- **Ghost API:** https://ghost.org/docs/content-api/

### External Libraries

- **GLightbox:** https://biati-digital.github.io/glightbox/
- **Prism.js:** https://prismjs.com/
- **Sass:** https://sass-lang.com/

---

## Theme Metadata

**Name:** Vibology Theme
**Version:** 2.0.1
**Author:** Joe Lencioni
**License:** MIT
**Ghost Version:** 6.0+
**Repository:** (Add if public)

---

**End of Technical Documentation**
