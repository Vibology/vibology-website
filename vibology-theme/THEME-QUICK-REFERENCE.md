# Vibology Theme - Quick Reference Guide

**For Content Creation & Design**

Version: 1.7.0
Last Updated: 2026-01-26

---

## Table of Contents

1. [Image Specifications](#image-specifications)
2. [Design Guidelines](#design-guidelines)
3. [Content Best Practices](#content-best-practices)
4. [Using Custom Templates](#using-custom-templates)
5. [Theme Settings](#theme-settings)
6. [Common Tasks](#common-tasks)

---

## Image Specifications

### Optimal Image Sizes

| Location | Recommended Size | Aspect Ratio | Format | Notes |
|----------|-----------------|--------------|--------|-------|
| **Feature Image (Post)** | 1200×675px | 16:9 | JPG/PNG | Main post image, hero |
| **Feature Image (Page)** | 1200×675px | 16:9 | JPG/PNG | Page hero image |
| **Tag Hero Image** | 780×200px | 3.9:1 | JPG/PNG | Tag archive header, rounded corners |
| **Featured Slider** | 1200×675px | 16:9 | JPG/PNG | Homepage slider images |
| **Post Card Thumbnail** | 750×422px | 16:9 | JPG/PNG | Grid/list view |
| **Author Avatar** | 400×400px | 1:1 (square) | JPG/PNG | Profile images |
| **Site Logo** | 200×60px | Variable | PNG/SVG | Header logo |
| **Site Icon (Favicon)** | 512×512px | 1:1 | PNG | Browser tab icon |
| **Social Share (OG Image)** | 1200×630px | 1.91:1 | JPG/PNG | Facebook/Twitter cards |
| **In-Content Images** | 750-1200px wide | Variable | JPG/PNG | Body content |

### Image Guidelines

**File Size:**
- Hero/feature images: < 200KB (aim for 100-150KB)
- Thumbnails: < 100KB
- In-content images: < 150KB
- Use JPG (80-85% quality) for photos, PNG for graphics/logos

**Optimization:**
- Export at 2x resolution for retina displays
- Ghost auto-generates responsive variants (you don't need to)
- Use descriptive filenames: `meditation-practice-sunset.jpg` not `IMG_1234.jpg`

**Alt Text:**
- Always add descriptive alt text in Ghost editor
- Describe what's in the image, not "image of..."
- For decorative images, use empty alt: `alt=""`

---

## Design Guidelines

### Color Palette

#### Light Mode
- **Background:** #F9F9FF (soft lavender-white)
- **Cards/Surfaces:** #FFFFFF (pure white)
- **Primary Text:** #2D3350 (dark blue-gray)
- **Secondary Text:** #6B7280 (medium gray)
- **Borders:** #DADCE5 (light gray)
- **Accent:** #FF03A5 (vibrant magenta)

#### Dark Mode
- **Background:** #1A1A1A (dark gray)
- **Cards/Surfaces:** #0A0A0A (near black)
- **Primary Text:** #EAEAEA (off-white)
- **Secondary Text:** #B5B5B5 (medium gray)
- **Borders:** #2A2A2A (subtle gray)
- **Accent:** #FF03A5 (vibrant magenta)

**Using colors in content:**
When creating HTML content blocks in Ghost, use these CSS variables:
```html
<div style="color: var(--color-text-secondary);">
  Secondary text
</div>

<div style="background: var(--color-accent); color: white; padding: 1rem;">
  Accent callout
</div>
```

### Typography

**Font Family:** Cabin (sans-serif)
- Headings: Cabin, weight 600-700
- Body: Cabin, weight 400
- Code: SF Mono (monospace)

**Font Sizes (use in Ghost editor):**
- **Heading 1:** 48px (3rem) - Page titles
- **Heading 2:** 36px (2.25rem) - Section headings
- **Heading 3:** 30px (1.875rem) - Subsections
- **Heading 4:** 24px (1.5rem) - Minor headings
- **Body Text:** 16px (1rem) - Default
- **Large Text:** 20px (1.25rem) - Intro paragraphs
- **Small Text:** 14px (0.875rem) - Captions, meta

**Line Height:**
- Headings: 1.25 (tight)
- Body text: 1.5 (normal)
- Large paragraphs: 1.625 (relaxed)

**Best Practices:**
- Use Heading 2 for main sections (H1 is auto-generated from title)
- Break up long paragraphs (3-5 sentences max)
- Use lists for scannable content
- Add visual hierarchy with heading levels

### Spacing & Layout

**Content Width:**
- Default post/page: 750px max-width (comfortable reading)
- Full-width template: 1280px max-width (wide layouts)
- Sidebar: 300px width

**Spacing System (4px grid):**
Use these values when adding custom spacing in HTML blocks:
- **4px** (0.25rem) - Tiny gap
- **8px** (0.5rem) - Small gap
- **16px** (1rem) - Standard gap
- **24px** (1.5rem) - Medium gap
- **32px** (2rem) - Large gap
- **48px** (3rem) - Extra large gap

**Example:**
```html
<div style="margin-bottom: 2rem;">
  Content with 32px bottom margin
</div>
```

### Buttons & Links

**Link Style:**
- Default: Accent color (#FF03A5)
- Hover: Slightly brighter
- Underline on hover

**Button Styles:**
```html
<!-- Primary button -->
<a href="/contact" style="display: inline-block; background: var(--color-accent); color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600;">
  Get Started
</a>

<!-- Secondary button -->
<a href="/learn-more" style="display: inline-block; border: 2px solid var(--color-border); color: var(--color-text); padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600;">
  Learn More
</a>
```

---

## Content Best Practices

### Writing for Vibology

**Tone & Voice:**
- Depth over speed (reflect your 4/6 profile)
- Crisis navigation, not crisis avoidance (Gate 36)
- Intimacy through authenticity (Channel 6-59)
- Wisdom when timing is right (Gate 12)

**Structure:**
1. **Hook:** Open with the crisis/question/tension
2. **Depth:** Explore the layers and nuances
3. **Synthesis:** Weave multiple perspectives
4. **Integration:** Practical application or reflection

**Post Length:**
- Short posts: 500-800 words (quick insights)
- Standard posts: 1200-2000 words (depth exploration)
- Long-form: 2500-4000+ words (comprehensive synthesis)

### SEO Basics

**Title:**
- 50-60 characters max (for search results)
- Include primary keyword naturally
- Make it compelling, not just descriptive

**Excerpt:**
- 140-160 characters (meta description)
- Summarize the post's value
- Include target keyword if natural

**Feature Image:**
- Always add one (improves social shares)
- Add descriptive alt text (SEO + accessibility)
- Relevant to content, not just decorative

**Internal Linking:**
- Link to related posts (Ghost shows suggestions)
- Use descriptive anchor text: "read about Human Design gates" not "click here"
- 2-5 internal links per post

**Tags:**
- 2-4 tags per post (not too many)
- Use consistently: "Human Design", "Astrology", "Synthesis"
- Tags create archive pages: vibology.org/tag/human-design

### Embedding Media

**Videos (YouTube):**
1. In Ghost editor, paste YouTube URL on its own line
2. Ghost auto-embeds with responsive wrapper
3. Centered by default

**Images:**
1. Drag & drop into editor
2. Click image → "Image settings" for caption, alt text
3. Choose size: Small, Medium, Large, Full
4. Use "Full" for feature images, "Large" for body images

**Code Blocks:**
1. Use Markdown code blocks: triple backticks
2. Specify language for syntax highlighting:
   ````
   ```javascript
   const example = "code";
   ```
   ````
3. Prism.js handles highlighting automatically

**Callout Boxes:**
Use Ghost's built-in callouts or HTML:
```html
<div style="background: var(--color-bg-secondary); border-left: 4px solid var(--color-accent); padding: 1.5rem; margin: 2rem 0; border-radius: 0.5rem;">
  <strong>Key Insight:</strong> Your callout text here.
</div>
```

---

## Using Custom Templates

### Available Templates

**Default (index.hbs):**
- Automatic for posts and pages
- Standard layout with sidebar
- No configuration needed

**Home Template (home.hbs):**
- Custom homepage with featured slider
- Sidebar with recent posts
- **How to use:** Settings → Design → Homepage → select "Home"

**Contact Page (page-contact.hbs):**
- Includes Formspree contact form
- Page content appears above form
- **How to use:** Create page → Settings → Template → "Contact"

**Full Width (custom-full-width.hbs):**
- No sidebar, wider content area
- Great for landing pages, portfolios
- **How to use:** Create page → Settings → Template → "Full Width"

### Setting a Custom Template

1. Create or edit a page in Ghost
2. Click ⚙️ Settings (top right)
3. Scroll to "Template"
4. Select your desired template
5. Update page

### Feature Image Behavior

- **Posts:** Feature image appears at top of post
- **Pages:** Feature image appears at top of page
- **Contact template:** Feature image optional, appears above header
- **Full-width template:** Feature image spans full width

---

## Theme Settings

**Access:** Ghost Admin → Settings → Design → Customize (gear icon)

### Navigation Style

**Options:**
- **Normal:** Header stays at top, scrolls with page
- **Sticky:** Header fixed at top, always visible
- **Sticky Hide:** Header hides when scrolling down, appears when scrolling up

**Recommendation:** Sticky (best for most cases)

### Dark Mode Logo

Upload a separate logo optimized for dark backgrounds.
- Same dimensions as main logo (200×60px recommended)
- Light-colored or white version
- If not set, uses the regular logo in dark mode

### Social Media URLs

**YouTube URL:**
- Full URL: `https://www.youtube.com/@YourChannel`
- Appears in footer

**Bluesky URL:**
- Full profile URL: `https://bsky.app/profile/vibology.org`
- Appears in footer

### Formspree ID

For contact form functionality:
1. Sign up at formspree.io
2. Create a form
3. Copy form ID (e.g., `xpznqwya`)
4. Paste in theme settings
5. Contact page now sends to this form

### TinyBird Analytics

**TinyBird Token:**
- Get from TinyBird dashboard
- Paste here to enable analytics
- Leave empty to disable

**TinyBird Host:**
- Default: `https://api.us-east.aws.tinybird.co`
- Only change if using different region

**Opt-out:**
Users can disable tracking by running in browser console:
```javascript
localStorage.setItem('tinybird_ignore', 'true');
```

### Show Table of Contents

**Enable:** Toggle ON to show auto-generated TOC on posts
**Disable:** Toggle OFF to hide TOC

TOC appears below post header, lists H2/H3/H4 headings with anchor links.

### Announcement Bar

**Location:** Ghost Admin → Settings → Announcement bar

The theme provides custom styling for Ghost's native announcement bar:

**Styling:**
- Vertical gradient background (cyan to magenta)
- Large, bold 30px Cabin font (24px on mobile)
- Compact 8px vertical padding
- White text

**To Use:**
1. Go to Settings → Announcement bar
2. Enter your announcement text
   - Supports **bold**, *italic*, and [links](url)
3. Select visibility:
   - Visitors only
   - Free members
   - Paid members
   - All (visitors + members)
4. Save changes

**Tips:**
- Keep announcements short (1-2 sentences)
- Use bold for key words
- Include a link for "Learn more" actions
- The bar appears at the very top of your site
- Ghost handles dismiss/close automatically

---

## Common Tasks

### Creating a New Post

1. Ghost Admin → Posts → New Post
2. Add title
3. Write content in editor (Markdown or rich text)
4. Add feature image (⚙️ Settings → Feature image)
5. Add excerpt (⚙️ Settings → Excerpt)
6. Add tags (⚙️ Settings → Tags)
7. **Preview** before publishing
8. Publish

**Checklist:**
- [ ] Title is compelling and SEO-friendly (50-60 chars)
- [ ] Feature image added with alt text
- [ ] Excerpt written (140-160 chars)
- [ ] 2-4 relevant tags added
- [ ] 2-5 internal links included
- [ ] Headings used for structure (H2, H3)
- [ ] Images optimized (< 200KB each)
- [ ] Previewed on desktop and mobile
- [ ] Published or scheduled

### Creating a New Page

1. Ghost Admin → Pages → New Page
2. Add title
3. Write content
4. **Optional:** Set custom template (⚙️ Settings → Template)
5. **Optional:** Add feature image
6. **Optional:** Hide from navigation if needed
7. Publish

**Common Pages:**
- About (default template, sidebar)
- Contact (contact template, includes form)
- Services (full-width template, no sidebar)
- Resources (default template)

### Adding to Navigation

**Primary Navigation (standalone items like "Contact"):**
1. Settings → Navigation → **Primary** tab
2. Add label (e.g., "Contact") and URL (e.g., `/contact/`)
3. Drag to reorder
4. Save

Primary items appear AFTER dropdown menus in the header.

**Secondary Navigation (dropdown menus):**
1. Settings → Navigation → **Secondary** tab
2. Use format: `Dropdown Name | Item Label`
3. Add URL for each item
4. Save

**Example dropdown setup:**
| Label | URL |
|-------|-----|
| `About | What is Vibology?` | `/what-is-vibology/` |
| `About | Biography` | `/biography/` |
| `About | Ethics` | `/ethics/` |
| `Services | Astrology` | `/astrology/` |
| `Services | Human Design` | `/human-design/` |

Creates two dropdowns: "About" (3 items) and "Services" (2 items).

**Important:**
- All items MUST have URLs set (if empty, defaults to `/` which breaks navigation)
- Items without `|` in secondary nav are ignored
- Arrow indicators: Point RIGHT by default, rotate DOWN on hover

### Featuring a Post

**To add to homepage slider:**
1. Edit post
2. Click ⚙️ Settings
3. Toggle "Feature this post" ON
4. Update post

**Notes:**
- Featured posts appear in slider (home.hbs template)
- Max 5 featured posts recommended for slider
- Older featured posts appear in sidebar

### Scheduling a Post

1. Edit post
2. Click ⚙️ Settings
3. Scroll to "Publish"
4. Click "Schedule for later"
5. Choose date and time
6. Schedule

**Timezone:** Set in Settings → General → Publication timezone

### Embedding Content

**YouTube Video:**
```
https://www.youtube.com/watch?v=VIDEO_ID
```
Paste URL on its own line in editor.

**Tweet:**
Paste tweet URL on its own line.

**Spotify:**
Get embed code from Spotify → Share → Embed
Paste in HTML block.

**External Image:**
```html
<img src="https://example.com/image.jpg" alt="Description">
```

**CodePen:**
Get embed code from CodePen → Embed
Paste in HTML block.

### Updating Site Settings

**Site Title & Description:**
Settings → General → Title & Description

**Site Logo:**
Settings → Branding → Site logo (upload)

**Site Icon (Favicon):**
Settings → Branding → Site icon (512×512px PNG)

**Accent Color:**
Settings → Branding → Accent color (overrides theme default)

**Social Accounts:**
Settings → General → Social accounts
- Fill in profile URLs (without @)
- Appears in footer and social meta tags

### Backing Up Content

**Manual Export:**
Settings → Labs → Export your content
- Downloads JSON file with all posts, pages, settings
- Import via Settings → Labs → Import content

**Recommendation:** Export monthly or before major changes

### Testing Changes

**Before publishing:**
1. Use "Preview" button in editor
2. Check on desktop and mobile
3. Verify images load
4. Test links work
5. Check for typos

**After publishing:**
1. View post on live site
2. Test social share preview (Facebook Sharing Debugger, Twitter Card Validator)
3. Check mobile responsiveness
4. Test in dark mode

---

## Design Patterns

### Two-Column Layout

```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;">
  <div>
    <h3>Column 1</h3>
    <p>Content here</p>
  </div>
  <div>
    <h3>Column 2</h3>
    <p>Content here</p>
  </div>
</div>
```

**Mobile:** Automatically stacks on small screens (Ghost CSS handles this)

### Highlighted Quote

```html
<blockquote style="border-left: 4px solid var(--color-accent); padding-left: 1.5rem; margin: 2rem 0; font-size: 1.25rem; font-style: italic; color: var(--color-text-secondary);">
  "Your meaningful quote here."
</blockquote>
```

### Image with Caption

```html
<figure style="margin: 2rem 0;">
  <img src="your-image.jpg" alt="Description" style="width: 100%; border-radius: 0.5rem;">
  <figcaption style="text-align: center; font-size: 0.875rem; color: var(--color-text-secondary); margin-top: 0.5rem;">
    Your caption text
  </figcaption>
</figure>
```

### Centered CTA Button

```html
<div style="text-align: center; margin: 3rem 0;">
  <a href="/contact" style="display: inline-block; background: var(--color-accent); color: white; padding: 1rem 2rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; font-size: 1.125rem;">
    Book a Session
  </a>
</div>
```

### Stats/Numbers Grid

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin: 2rem 0; text-align: center;">
  <div>
    <div style="font-size: 2.25rem; font-weight: 700; color: var(--color-accent);">64</div>
    <div style="font-size: 0.875rem; color: var(--color-text-secondary);">Gates</div>
  </div>
  <div>
    <div style="font-size: 2.25rem; font-weight: 700; color: var(--color-accent);">36</div>
    <div style="font-size: 0.875rem; color: var(--color-text-secondary);">Channels</div>
  </div>
  <div>
    <div style="font-size: 2.25rem; font-weight: 700; color: var(--color-accent);">9</div>
    <div style="font-size: 0.875rem; color: var(--color-text-secondary);">Centers</div>
  </div>
</div>
```

---

## Quick Troubleshooting

**Images not showing:**
- Check file size (< 200KB)
- Verify image uploaded successfully
- Try re-uploading

**Contact form not working:**
- Verify Formspree ID in theme settings
- Check Formspree dashboard for submissions
- Test with different email

**Dark mode not working:**
- Clear browser cache
- Check localStorage (browser dev tools)
- Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

**Navigation dropdown not showing:**
- Verify format: `Dropdown Name|Item Label`
- Check secondary navigation in Settings → Design
- Re-upload theme if needed

**Search not working:**
- Search is Ghost's native feature
- Verify Ghost version is 5.0+
- Check browser console for errors

---

## Design Inspiration

**Vibology Theme Style:**
- **Minimal & Clean:** Not cluttered, plenty of whitespace
- **Content-first:** Text is the star, design supports it
- **Depth over Flash:** Subtle animations, thoughtful interactions
- **Dark-mode Native:** Equally beautiful in light and dark
- **Accessible:** Readable, navigable, inclusive

**When creating content, think:**
- Would this work in both light and dark mode?
- Is the hierarchy clear (headings, spacing)?
- Does it serve the reader, or just look cool?
- Is it readable on mobile?

---

## Keyboard Shortcuts (Ghost Editor)

- **Cmd/Ctrl + B** - Bold
- **Cmd/Ctrl + I** - Italic
- **Cmd/Ctrl + K** - Insert link
- **Cmd/Ctrl + Alt + 1** - Heading 1
- **Cmd/Ctrl + Alt + 2** - Heading 2
- **Cmd/Ctrl + Alt + 3** - Heading 3
- **Cmd/Ctrl + /** - Markdown block
- **Cmd/Ctrl + Shift + P** - Preview
- **Cmd/Ctrl + S** - Save draft
- **Cmd/Ctrl + Enter** - Publish

---

## Resources

**Ghost Documentation:**
- Ghost Editor: https://ghost.org/help/using-the-editor/
- Theme API: https://ghost.org/docs/themes/

**Design Tools:**
- Image optimization: TinyPNG (https://tinypng.com/)
- Color contrast checker: WebAIM (https://webaim.org/resources/contrastchecker/)
- Screenshot tool: CleanShot X, Xnapper

**Content Planning:**
- Use NEXT.md to track content priorities
- Reference Claude.md for brand positioning
- Honor your 4/6 network model (depth over volume)

---

**Quick Reference Version: 1.0.2**
**Last Updated: 2026-01-25**
