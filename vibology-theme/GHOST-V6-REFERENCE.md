# Ghost v6 Theme Development Reference

**Comprehensive documentation for Ghost v6 theme development**
**Last Updated:** 2026-01-25

---

## Table of Contents

1. [Theme Structure](#theme-structure)
2. [Template Hierarchy](#template-hierarchy)
3. [Contexts](#contexts)
4. [Handlebars Helpers](#handlebars-helpers)
5. [Navigation](#navigation)
6. [Pagination](#pagination)
7. [Images & Assets](#images--assets)
8. [Configuration (package.json)](#configuration-packagejson)
9. [Escaping & HTML Output](#escaping--html-output)
10. [Best Practices](#best-practices)
11. [Common Pitfalls](#common-pitfalls)

---

## Theme Structure

### Required Files

Every Ghost theme must include these three files:

- **`index.hbs`** - Renders post lists (required)
- **`post.hbs`** - Renders individual posts (required)
- **`package.json`** - Theme metadata and configuration (required)

### Recommended Structure

```
/your-theme/
├── /assets/
│   ├── /css/
│   ├── /fonts/
│   ├── /images/
│   └── /js/
├── /partials/
│   ├── navigation.hbs
│   └── pagination.hbs
├── /members/ (for membership sites)
│   ├── account.hbs
│   ├── signin.hbs
│   └── signup.hbs
├── /locales/ (for translations)
│   ├── en.json
│   └── es.json
├── default.hbs (base layout)
├── index.hbs (required)
├── post.hbs (required)
├── page.hbs (optional)
├── home.hbs (optional)
├── tag.hbs (optional)
├── author.hbs (optional)
├── error.hbs (optional)
├── error-404.hbs (optional)
├── robots.txt (optional)
└── package.json (required)
```

### Partials

Partials reduce code duplication across templates. Place reusable components in `/partials/` and include them with:

```handlebars
{{> partial-name}}
```

---

## Template Hierarchy

Ghost uses a hierarchical template system. Templates are selected based on context and file availability.

### Template Selection Order

**For Posts:**
1. `post-{slug}.hbs` (specific post)
2. `post.hbs` (required fallback)

**For Pages:**
1. `page-{slug}.hbs` (specific page)
2. `custom-{template-name}.hbs` (selected via admin)
3. `page.hbs` (optional)
4. `post.hbs` (required fallback)

**For Home:**
1. `home.hbs` (optional)
2. `index.hbs` (required)

**For Tags:**
1. `tag-{slug}.hbs` (specific tag)
2. `tag.hbs` (optional)
3. `index.hbs` (required fallback)

**For Authors:**
1. `author-{slug}.hbs` (specific author)
2. `author.hbs` (optional)
3. `index.hbs` (required fallback)

**For Errors:**
1. `error-404.hbs` (for 404 errors)
2. `error-4xx.hbs` (for 400-level errors)
3. `error.hbs` (generic error page)

### Base Layout (default.hbs)

The `default.hbs` template is optional but typically required. It contains the base HTML structure:

```handlebars
<!DOCTYPE html>
<html lang="{{@site.locale}}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{meta_title}}</title>

    {{!-- Required: outputs meta tags, structured data, RSS links --}}
    {{ghost_head}}
</head>
<body class="{{body_class}}">

    {{!-- Navigation --}}
    {{> navigation}}

    {{!-- Main content area --}}
    {{{body}}}

    {{!-- Required: outputs scripts and code injection --}}
    {{ghost_foot}}
</body>
</html>
```

**Required Helpers in default.hbs:**
- `{{ghost_head}}` - Before `</head>` tag (outputs meta tags, structured data, code injection)
- `{{ghost_foot}}` - Before `</body>` tag (outputs scripts, jQuery, code injection)
- `{{{body}}}` - Where template content is rendered (note triple braces)

---

## Contexts

Ghost has 7 main contexts that determine which template is used and what data is available.

### Available Contexts

| Context | Description | Body Class | Default Template |
|---------|-------------|------------|------------------|
| **home** | First page of site (page 1) | `home-template` | `home.hbs` or `index.hbs` |
| **index** | Post list pages | `home-template` or `paged` | `index.hbs` (required) |
| **post** | Single post view | `post-template` | `post.hbs` (required) |
| **page** | Static page view | `page-template` | `page.hbs` or `post.hbs` |
| **tag** | Tag archive | `tag-template` | `tag.hbs` or `index.hbs` |
| **author** | Author archive | `author-template` | `author.hbs` or `index.hbs` |
| **error** | Error pages | `error-template` | `error.hbs` |

### Detecting Context with {{#is}}

Use the `{{#is}}` helper to detect which context you're in:

```handlebars
{{!-- Check for home page --}}
{{#is "home"}}
    <h1>Welcome to my blog!</h1>
{{/is}}

{{!-- Check for post context --}}
{{#is "post"}}
    <article>{{content}}</article>
{{/is}}

{{!-- Check for paged context (page 2+) --}}
{{#is "paged"}}
    <p>Page {{page}} of {{pages}}</p>
{{/is}}

{{!-- Negate with ^ --}}
{{^is "paged"}}
    <p>This is the first page</p>
{{/is}}

{{!-- Multiple contexts --}}
{{#is "post, page"}}
    <p>This is a post or page</p>
{{/is}}
```

### Additional Context Checks

**paged** - Applied to paginated index pages (e.g., /page/2/)

```handlebars
{{#is "paged"}}
    <p>Viewing page {{page}} of {{pages}}</p>
{{/is}}
```

---

## Handlebars Helpers

Ghost provides three categories of helpers: **Data Helpers** (output data), **Functional Helpers** (work with data), and **Utility Helpers** (perform tasks).

### Escaping: Double vs Triple Braces

**Double braces `{{variable}}`** - HTML-escaped output (safe for text)
```handlebars
{{title}} <!-- Outputs: &lt;script&gt; if title contains <script> -->
```

**Triple braces `{{{variable}}}`** - Raw HTML output (use for URLs, HTML content)
```handlebars
{{{url}}} <!-- Outputs: /my-post/ without escaping -->
{{{content}}} <!-- Outputs raw HTML content -->
```

### Core Data Helpers

#### Post Data

```handlebars
{{!-- Within {{#post}} block or post context --}}
{{#post}}
    {{title}}                    {{!-- Post title --}}
    {{slug}}                     {{!-- URL slug --}}
    {{excerpt}}                  {{!-- Auto-generated excerpt --}}
    {{excerpt words="50"}}       {{!-- 50-word excerpt --}}
    {{excerpt characters="140"}} {{!-- 140-character excerpt --}}
    {{{content}}}                {{!-- Full post HTML (triple braces!) --}}
    {{content words="100"}}      {{!-- First 100 words --}}
    {{{url}}}                    {{!-- Post URL (triple braces!) --}}
    {{url absolute="true"}}      {{!-- Absolute URL --}}
    {{feature_image}}            {{!-- Feature image URL --}}
    {{featured}}                 {{!-- Boolean: is featured? --}}
    {{reading_time}}             {{!-- Estimated reading time --}}
    {{visibility}}               {{!-- public, members, paid --}}
    {{meta_title}}               {{!-- SEO title --}}
    {{meta_description}}         {{!-- SEO description --}}
    {{canonical_url}}            {{!-- Canonical URL --}}
    {{published_at}}             {{!-- Publish timestamp --}}
    {{updated_at}}               {{!-- Update timestamp --}}
{{/post}}
```

#### Author Data

```handlebars
{{!-- Within {{#author}} or {{#primary_author}} block --}}
{{#primary_author}}
    {{name}}           {{!-- Author name --}}
    {{slug}}           {{!-- Author slug --}}
    {{bio}}            {{!-- Author bio --}}
    {{location}}       {{!-- Location --}}
    {{website}}        {{!-- Website URL --}}
    {{twitter}}        {{!-- Twitter handle --}}
    {{facebook}}       {{!-- Facebook profile --}}
    {{profile_image}}  {{!-- Avatar image URL --}}
    {{cover_image}}    {{!-- Cover image URL --}}
    {{{url}}}          {{!-- Author archive URL (triple braces!) --}}
{{/primary_author}}

{{!-- List all authors --}}
{{#foreach authors}}
    <a href="{{{url}}}">{{name}}</a>
{{/foreach}}

{{!-- Authors helper with formatting --}}
{{authors separator=", " limit="3"}}
```

#### Tag Data

```handlebars
{{!-- Within {{#tag}} or {{#primary_tag}} block --}}
{{#primary_tag}}
    {{name}}           {{!-- Tag name --}}
    {{slug}}           {{!-- Tag slug --}}
    {{description}}    {{!-- Tag description --}}
    {{{url}}}          {{!-- Tag archive URL (triple braces!) --}}
{{/primary_tag}}

{{!-- List all tags --}}
{{#foreach tags}}
    <a href="{{{url}}}">{{name}}</a>
{{/foreach}}

{{!-- Tags helper with formatting --}}
{{tags separator=", " limit="3" prefix="Tagged: "}}
{{tags separator=" | " autolink="false"}}
```

#### Site Data (Global Variables)

Access site-wide settings anywhere in your theme with `@site`:

```handlebars
{{@site.title}}           {{!-- Site title --}}
{{@site.description}}     {{!-- Site description --}}
{{@site.logo}}            {{!-- Logo URL --}}
{{@site.cover_image}}     {{!-- Cover image URL --}}
{{@site.icon}}            {{!-- Favicon URL --}}
{{@site.url}}             {{!-- Site URL --}}
{{@site.locale}}          {{!-- Language code (e.g., "en") --}}
{{@site.timezone}}        {{!-- Timezone --}}
{{@site.navigation}}      {{!-- Navigation items array --}}
{{@site.secondary_navigation}} {{!-- Secondary nav array --}}
```

#### Config Variables

Access theme configuration from package.json:

```handlebars
{{@config.posts_per_page}}  {{!-- Posts per page (default: 5) --}}
{{@config.image_sizes}}     {{!-- Image size config --}}
{{@config.card_assets}}     {{!-- Card assets config --}}
{{@config.custom}}          {{!-- Custom settings --}}
```

### Functional Helpers

#### {{#foreach}}

Use `{{#foreach}}` instead of standard Handlebars `{{#each}}` for Ghost data.

```handlebars
{{!-- Loop through posts --}}
{{#foreach posts}}
    <article>
        <h2>{{title}}</h2>
        <p>{{excerpt words="30"}}</p>
    </article>
{{/foreach}}

{{!-- With limit --}}
{{#foreach posts limit="5"}}
    {{!-- Only show 5 posts --}}
{{/foreach}}

{{!-- With else block --}}
{{#foreach posts}}
    <p>{{title}}</p>
{{else}}
    <p>No posts found</p>
{{/foreach}}

{{!-- Available variables inside foreach --}}
{{#foreach posts}}
    @index: {{@index}}     {{!-- 0-based index --}}
    @number: {{@number}}   {{!-- 1-based number --}}
    @first: {{@first}}     {{!-- Boolean: first item? --}}
    @last: {{@last}}       {{!-- Boolean: last item? --}}
{{/foreach}}
```

#### {{#get}}

Query the Ghost API to fetch additional data:

```handlebars
{{!-- Get recent posts --}}
{{#get "posts" limit="5"}}
    {{#foreach posts}}
        <h3>{{title}}</h3>
    {{/foreach}}
{{/get}}

{{!-- Get posts with authors included --}}
{{#get "posts" limit="5" include="authors"}}
    {{#foreach posts}}
        <span>Written by: {{authors}}</span>
    {{/foreach}}
{{/get}}

{{!-- Get posts with authors and tags --}}
{{#get "posts" limit="5" include="authors,tags"}}
    {{!-- Multiple includes separated by comma --}}
{{/get}}

{{!-- Filter posts by tag --}}
{{#get "posts" filter="tag:news" limit="10"}}
    {{!-- Posts tagged with "news" --}}
{{/get}}

{{!-- Filter posts by author --}}
{{#get "posts" filter="authors:{{primary_author.slug}}+id:-{{id}}" limit="3"}}
    {{!-- Same author, exclude current post --}}
{{/get}}

{{!-- Get all tags with post count --}}
{{#get "tags" limit="all" include="count.posts"}}
    {{#foreach tags}}
        {{name}} ({{count.posts}} posts)
    {{/foreach}}
{{/get}}

{{!-- Get featured posts --}}
{{#get "posts" filter="featured:true" limit="3"}}
    {{!-- Only featured posts --}}
{{/get}}
```

**Available resources:** `"posts"`, `"tags"`, `"authors"`, `"tiers"`

**Filter operators:**
- `+` = AND (all conditions must match)
- `,` = OR (at least one condition must match)

#### {{#has}}

Conditional helper for checking properties:

```handlebars
{{!-- Check if post has specific tag --}}
{{#has tag="news"}}
    <span class="badge">News</span>
{{/has}}

{{!-- Check if post has any tags --}}
{{#has any="tags"}}
    <p>Tagged: {{tags}}</p>
{{/has}}

{{!-- Check if author has specific property --}}
{{#has author="joe-lewis"}}
    <p class="author-note">Written by site owner</p>
{{/has}}
```

#### {{#match}}

Compare values with operators:

```handlebars
{{!-- Simple comparison --}}
{{#match title "=" "Welcome"}}
    <p>This is the welcome post</p>
{{/match}}

{{!-- With else --}}
{{#match visibility "=" "public"}}
    <p>Public post</p>
{{else}}
    <p>Members-only content</p>
{{/match}}

{{!-- Chain multiple conditions (like switch statement) --}}
{{#match visibility "=" "public"}}
    <p>Free for all</p>
{{else match visibility "=" "members"}}
    <p>For members</p>
{{else match visibility "=" "paid"}}
    <p>Paid subscribers only</p>
{{/match}}

{{!-- Available operators: =, !=, >, <, >=, <= --}}
```

### Utility Helpers

#### {{date}}

Format dates using Moment.js:

```handlebars
{{!-- Default format --}}
{{date published_at}}

{{!-- Custom format (Moment.js tokens) --}}
{{date published_at format="MMMM DD, YYYY"}}        {{!-- January 25, 2026 --}}
{{date published_at format="DD/MM/YYYY"}}           {{!-- 25/01/2026 --}}
{{date published_at format="MMM D, YYYY h:mm A"}}  {{!-- Jan 25, 2026 3:45 PM --}}

{{!-- Timeago (relative time) --}}
{{date published_at timeago="true"}}  {{!-- "5 mins ago" --}}

{{!-- With timezone override --}}
{{date published_at timezone="America/New_York"}}

{{!-- With locale override --}}
{{date published_at locale="es"}}

{{!-- Current date --}}
{{date format="YYYY"}}  {{!-- Current year --}}
```

**CAUTION:** `timeago` on cached sites displays time relative to when the page was cached, not the visitor's current time.

#### {{plural}}

Output different text based on number:

```handlebars
{{!-- Posts count --}}
{{plural pagination.total empty="No posts" singular="% post" plural="% posts"}}
{{!-- % is replaced with the number --}}

{{!-- Comments count --}}
{{plural comment_count empty="No comments" singular="1 comment" plural="% comments"}}

{{!-- Without empty state --}}
{{plural tag.count.posts singular="% post" plural="% posts"}}
```

#### {{encode}}

URL-encode strings for safe use in URLs:

```handlebars
{{!-- Twitter share link --}}
<a href="https://twitter.com/share?text={{encode title}}&url={{encode @site.url}}">
    Share on Twitter
</a>

{{!-- Without encode, spaces and special chars break URLs --}}
```

#### {{t}} (Translate)

Make themes translatable:

```handlebars
{{!-- Basic translation --}}
{{t "Subscribe"}}

{{!-- With placeholders --}}
{{t "Subscribe to {blogtitle}" blogtitle=@site.title}}

{{!-- As subexpression in other helpers --}}
{{tags prefix=(t "Tagged:")}}

{{!-- With plural helper --}}
{{plural @site.posts_count
    empty=(t "No posts")
    singular=(t "One post")
    plural=(t "% posts")}}
```

**Setup:**
1. Create `/locales/en.json`, `/locales/es.json`, etc.
2. Add key-value pairs: `{"Subscribe": "Suscribirse"}`
3. Set language in Ghost Admin > Settings > General
4. Add `<html lang="{{@site.locale}}">` to default.hbs
5. Restart Ghost

#### {{img_url}}

Generate responsive images:

```handlebars
{{!-- Basic usage --}}
<img src="{{img_url feature_image size="m"}}">

{{!-- Format conversion --}}
<img src="{{img_url feature_image size="l" format="webp"}}">

{{!-- Responsive images with srcset --}}
<img
    srcset="{{img_url feature_image size="s"}} 300w,
            {{img_url feature_image size="m"}} 600w,
            {{img_url feature_image size="l"}} 1000w,
            {{img_url feature_image size="xl"}} 2000w"
    sizes="(max-width: 600px) 300px, (max-width: 1000px) 600px, 1000px"
    src="{{img_url feature_image size="l"}}"
    alt="{{title}}">

{{!-- Picture element with format fallback --}}
<picture>
    <source
        srcset="{{img_url feature_image size="s" format="avif"}} 300w,
                {{img_url feature_image size="m" format="avif"}} 600w"
        type="image/avif">
    <source
        srcset="{{img_url feature_image size="s" format="webp"}} 300w,
                {{img_url feature_image size="m" format="webp"}} 600w"
        type="image/webp">
    <img
        srcset="{{img_url feature_image size="s"}} 300w,
                {{img_url feature_image size="m"}} 600w"
        src="{{img_url feature_image size="m"}}"
        alt="{{title}}">
</picture>
```

**Available sizes:** Defined in package.json (see Configuration section)

**Available formats:** `"avif"`, `"webp"` (reduces size ~25% without quality loss)

**NOTE:** Only works for uploaded images, not external URLs (except Unsplash)

#### {{asset}}

Link to theme assets with cache-busting:

```handlebars
{{!-- CSS --}}
<link rel="stylesheet" href="{{asset "css/style.css"}}">

{{!-- JavaScript --}}
<script src="{{asset "js/main.js"}}"></script>

{{!-- Images --}}
<img src="{{asset "images/logo.png"}}" alt="Logo">
```

#### {{body_class}}

Dynamic body classes based on context:

```handlebars
<body class="{{body_class}}">
```

**Output examples:**
- Home page: `home-template`
- Post: `post-template tag-news author-joe-lewis`
- Page: `page-template page-about`
- Featured post: `post-template featured`
- Tag archive: `tag-template tag-news`
- Author archive: `author-template author-joe-lewis`
- Paginated: `paged`
- Members-only: `private-template`

#### {{post_class}}

Classes for post containers:

```handlebars
{{#foreach posts}}
    <article class="{{post_class}}">
        {{!-- post content --}}
    </article>
{{/foreach}}
```

#### {{reading_time}}

Estimated reading time:

```handlebars
{{reading_time}} {{!-- Outputs: "5 min read" --}}
{{reading_time minute="min" minutes="mins"}} {{!-- Custom labels --}}
```

---

## Navigation

### Basic Usage

```handlebars
{{!-- Primary navigation --}}
{{navigation}}

{{!-- Secondary navigation --}}
{{navigation type="secondary"}}
```

### Default Output

Ghost outputs an unordered list by default:

```html
<ul class="nav">
    <li class="nav-home nav-current"><a href="/">Home</a></li>
    <li class="nav-about"><a href="/about/">About</a></li>
    <li class="nav-contact"><a href="/contact/">Contact</a></li>
</ul>
```

**Classes applied:**
- `nav-{slug}` - Based on page slug
- `nav-current` - Active page

**Note:** `{{navigation}}` outputs nothing if no navigation items exist (no need for `{{#if}}` wrapper).

### Custom Navigation Template

Create `/partials/navigation.hbs` to override default markup:

```handlebars
<nav class="site-nav" role="navigation">
    <ul>
        {{#foreach navigation}}
            <li class="nav-item {{#if current}}active{{/if}}">
                <a href="{{{url}}}">{{label}}</a>
            </li>
        {{/foreach}}
    </ul>
</nav>

{{!-- Separate primary and secondary --}}
{{^isSecondary}}
    <nav class="primary-nav">
        {{#foreach navigation}}
            <a href="{{{url}}}" class="{{slug}} {{#if current}}current{{/if}}">
                {{label}}
            </a>
        {{/foreach}}
    </nav>
{{else}}
    <nav class="secondary-nav">
        {{#foreach navigation}}
            <a href="{{{url}}}">{{label}}</a>
        {{/foreach}}
    </nav>
{{/isSecondary}}
```

### Available Properties

Within `{{#foreach navigation}}`:

- `{{label}}` - Display text
- `{{{url}}}` - Link URL (triple braces!)
- `{{current}}` - Boolean: is current page?
- `{{slug}}` - Slugified name for CSS
- `{{isSecondary}}` - Boolean: is secondary nav? (available outside loop)

### Checking Navigation Exists

```handlebars
{{#if @site.navigation}}
    <button class="menu-toggle">Menu</button>
    {{navigation}}
{{/if}}

{{#if @site.secondary_navigation}}
    {{navigation type="secondary"}}
{{/if}}
```

---

## Pagination

### Basic Usage

```handlebars
{{pagination}}
```

### Default Output

```html
<nav class="pagination" role="navigation">
    <a class="newer-posts" href="/page/2/">← Newer Posts</a>
    <span class="page-number">Page 3 of 10</span>
    <a class="older-posts" href="/page/4/">Older Posts →</a>
</nav>
```

### Custom Pagination Template

Create `/partials/pagination.hbs`:

```handlebars
{{#if pagination}}
<nav class="pagination">
    {{!-- Previous page link --}}
    {{#if prev}}
        <a href="{{page_url prev}}" class="prev">
            Previous
        </a>
    {{/if}}

    {{!-- Page indicator --}}
    <span class="page-info">
        Page {{page}} of {{pages}}
    </span>

    {{!-- Next page link --}}
    {{#if next}}
        <a href="{{page_url next}}" class="next">
            Next
        </a>
    {{/if}}
</nav>
{{/if}}
```

### Numbered Pagination

```handlebars
<nav class="pagination">
    {{#if prev}}
        <a href="{{page_url prev}}">‹</a>
    {{/if}}

    {{!-- First page --}}
    <a href="{{page_url 1}}" {{#if @first}}class="active"{{/if}}>1</a>

    {{!-- Page numbers (requires custom helper or JavaScript) --}}

    {{!-- Last page --}}
    <a href="{{page_url pages}}" {{#if @last}}class="active"{{/if}}>{{pages}}</a>

    {{#if next}}
        <a href="{{page_url next}}">›</a>
    {{/if}}
</nav>
```

### {{page_url}} Helper

```handlebars
{{page_url "prev"}}   {{!-- Previous page URL --}}
{{page_url "next"}}   {{!-- Next page URL --}}
{{page_url 1}}        {{!-- Specific page number --}}
{{page_url pages}}    {{!-- Last page --}}
```

### Pagination Object Properties

```handlebars
{{page}}      {{!-- Current page number --}}
{{pages}}     {{!-- Total pages --}}
{{total}}     {{!-- Total posts --}}
{{limit}}     {{!-- Posts per page --}}
{{next}}      {{!-- Next page number (or null) --}}
{{prev}}      {{!-- Previous page number (or null) --}}
```

### Next/Previous Post

Within a post context:

```handlebars
{{#post}}
    <nav class="post-nav">
        {{#prev_post}}
            <a href="{{{url}}}" class="prev">
                ← {{title}}
            </a>
        {{/prev_post}}

        {{#next_post}}
            <a href="{{{url}}}" class="next">
                {{title}} →
            </a>
        {{/next_post}}
    </nav>
{{/post}}

{{!-- Same tag navigation --}}
{{#prev_post in="primary_tag"}}
    <a href="{{{url}}}">Previous in {{primary_tag.name}}</a>
{{/prev_post}}
```

---

## Images & Assets

### Responsive Images

Ghost automatically generates multiple image sizes. Define them in `package.json`:

```json
{
  "config": {
    "image_sizes": {
      "xxs": {"width": 30},
      "xs": {"width": 100},
      "s": {"width": 300},
      "m": {"width": 600},
      "l": {"width": 1000},
      "xl": {"width": 2000}
    }
  }
}
```

**Recommendation:** Use no more than 10 image sizes to manage storage.

### Using img_url

```handlebars
{{!-- Single size --}}
<img src="{{img_url feature_image size="m"}}" alt="{{title}}">

{{!-- Responsive srcset --}}
<img
    srcset="{{img_url feature_image size="s"}} 300w,
            {{img_url feature_image size="m"}} 600w,
            {{img_url feature_image size="l"}} 1000w"
    sizes="(max-width: 600px) 300px, 600px"
    src="{{img_url feature_image size="m"}}"
    alt="{{title}}">
```

### Format Conversion

Convert to modern formats for better performance:

```handlebars
{{!-- WebP format (25% smaller) --}}
<img src="{{img_url feature_image size="l" format="webp"}}">

{{!-- AVIF format (even smaller, limited browser support) --}}
<img src="{{img_url feature_image size="l" format="avif"}}">
```

**Note:** File extensions stay the same (e.g., `.jpg` even for AVIF/WebP).

### Picture Element Pattern

Serve the best format based on browser support:

```handlebars
<picture>
    {{!-- AVIF (smallest, modern browsers) --}}
    <source
        srcset="{{img_url feature_image size="s" format="avif"}} 300w,
                {{img_url feature_image size="m" format="avif"}} 600w,
                {{img_url feature_image size="l" format="avif"}} 1000w"
        type="image/avif">

    {{!-- WebP (smaller, wide support) --}}
    <source
        srcset="{{img_url feature_image size="s" format="webp"}} 300w,
                {{img_url feature_image size="m" format="webp"}} 600w,
                {{img_url feature_image size="l" format="webp"}} 1000w"
        type="image/webp">

    {{!-- Original format (fallback) --}}
    <img
        srcset="{{img_url feature_image size="s"}} 300w,
                {{img_url feature_image size="m"}} 600w,
                {{img_url feature_image size="l"}} 1000w"
        sizes="(max-width: 600px) 300px, 600px"
        src="{{img_url feature_image size="l"}}"
        alt="{{title}}">
</picture>
```

### Asset Helper

Link to theme assets with automatic cache-busting:

```handlebars
{{!-- CSS --}}
<link rel="stylesheet" href="{{asset "css/main.css"}}">
<link rel="stylesheet" href="{{asset "built/screen.css"}}">

{{!-- JavaScript --}}
<script src="{{asset "js/main.js"}}"></script>

{{!-- Images in theme --}}
<img src="{{asset "images/logo.svg"}}" alt="Site Logo">

{{!-- Fonts --}}
<link rel="preload" href="{{asset "fonts/custom.woff2"}}" as="font">
```

---

## Configuration (package.json)

### Basic Structure

```json
{
  "name": "your-theme-name",
  "description": "A brief description of your theme",
  "version": "1.0.0",
  "engines": {
    "ghost": ">=5.0.0"
  },
  "license": "MIT",
  "author": {
    "name": "Your Name",
    "email": "you@example.com",
    "url": "https://example.com"
  },
  "keywords": [
    "ghost-theme",
    "blog"
  ],
  "config": {
    "posts_per_page": 10,
    "image_sizes": {},
    "card_assets": true,
    "custom": {}
  }
}
```

### Posts Per Page

Default: 5

```json
{
  "config": {
    "posts_per_page": 10
  }
}
```

Access in templates:

```handlebars
{{@config.posts_per_page}}
```

### Image Sizes

Define responsive image breakpoints:

```json
{
  "config": {
    "image_sizes": {
      "xxs": {"width": 30},
      "xs": {"width": 100},
      "s": {"width": 300},
      "m": {"width": 600},
      "l": {"width": 1000},
      "xl": {"width": 2000}
    }
  }
}
```

**Max recommendation:** 10 sizes

### Card Assets

Ghost includes CSS/JS for content cards by default.

```json
{
  "config": {
    "card_assets": true
  }
}
```

**To disable (for performance):**

```json
{
  "config": {
    "card_assets": false
  }
}
```

**To exclude specific cards:**

```json
{
  "config": {
    "card_assets": {
      "exclude": ["audio", "video", "gallery"]
    }
  }
}
```

### Custom Settings

For theme customization via Ghost Admin:

```json
{
  "config": {
    "custom": {
      "header_style": {
        "type": "select",
        "options": ["Minimal", "Full Width"],
        "default": "Minimal"
      },
      "show_author_bio": {
        "type": "boolean",
        "default": true
      }
    }
  }
}
```

---

## Escaping & HTML Output

### Double vs Triple Braces

**Double braces `{{  }}`** escape HTML (safe for text):

```handlebars
{{title}}        {{!-- <script> becomes &lt;script&gt; --}}
{{author.name}}  {{!-- Joe & Jane becomes Joe &amp; Jane --}}
```

**Triple braces `{{{  }}}`** output raw HTML (use for URLs, HTML content):

```handlebars
{{{url}}}        {{!-- /my-post/?ref=home (unescaped &) --}}
{{{content}}}    {{!-- Raw HTML content --}}
{{{body}}}       {{!-- In default.hbs --}}
```

### When to Use Triple Braces

**Required for:**
- URLs: `{{{url}}}`, `{{{@site.url}}}`
- HTML content: `{{{content}}}`
- Navigation: `{{{navigation}}}`
- Template body: `{{{body}}}`

**NOT needed for:**
- Text content: `{{title}}`, `{{excerpt}}`
- Numbers: `{{page}}`, `{{pages}}`
- CSS classes: `{{body_class}}`, `{{post_class}}`

### URL Encoding

Use `{{encode}}` for URLs with special characters:

```handlebars
{{!-- Twitter share link --}}
<a href="https://twitter.com/share?text={{encode title}}&url={{url absolute="true"}}">
    Share
</a>

{{!-- Email link --}}
<a href="mailto:?subject={{encode title}}&body={{encode excerpt}}">
    Email this
</a>
```

### Safe Strings in Custom Helpers

When defining custom HTML blocks:

```handlebars
{{!-- This will be escaped (wrong) --}}
{{myCustomBlock}}

{{!-- This outputs raw HTML (correct) --}}
{{{myCustomBlock}}}
```

---

## Best Practices

### 1. FOUC Prevention (Flash of Unstyled Content)

**Hide content until styled:**

```css
/* In your main CSS */
.site-header {
    opacity: 0;
    transition: opacity 0.3s;
}

.site-header.loaded {
    opacity: 1;
}
```

```javascript
// In your JS
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.site-header').classList.add('loaded');
});
```

**Or use inline critical CSS:**

```handlebars
<head>
    <style>
        /* Critical CSS here */
        body { font-family: system-ui; }
        .site-header { /* minimal header styles */ }
    </style>
    {{ghost_head}}
</head>
```

### 2. Class Naming Conventions

Ghost recommends:

**Prefix theme classes:**

```css
/* Prefix with theme abbreviation */
.vb-header { }        /* Vibology theme header */
.vb-post-card { }     /* Vibology post card */
```

**Favor long names over nesting:**

```css
/* Good */
.navigation-link { }

/* Avoid */
.navigation ul li a { }
```

**Use state classes (SMACSS pattern):**

```css
.is-hidden { display: none; }
.is-active { }
.is-disabled { }
```

**Ghost's body_class outputs:**

```css
.home-template { }
.post-template { }
.tag-news { }
.author-joe-lewis { }
```

### 3. Performance Optimization

**Lazy load images:**

```handlebars
<img
    src="{{img_url feature_image size="m"}}"
    loading="lazy"
    alt="{{title}}">
```

**Preload critical assets:**

```handlebars
<head>
    <link rel="preload" href="{{asset "css/main.css"}}" as="style">
    <link rel="preload" href="{{asset "fonts/main.woff2"}}" as="font" crossorigin>
    {{ghost_head}}
</head>
```

**Disable card_assets if not using Ghost cards:**

```json
{
  "config": {
    "card_assets": false
  }
}
```

### 4. Accessibility

**Always include lang attribute:**

```handlebars
<html lang="{{@site.locale}}">
```

**Use semantic HTML:**

```handlebars
<nav role="navigation" aria-label="Main navigation">
    {{navigation}}
</nav>

<main role="main">
    {{{body}}}
</main>
```

**Descriptive alt text:**

```handlebars
<img
    src="{{img_url feature_image size="m"}}"
    alt="{{title}} - {{excerpt words="10"}}">
```

### 5. SEO

**Required meta in default.hbs:**

```handlebars
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{meta_title}}</title>
    {{!-- ghost_head outputs meta_description, structured data, og tags --}}
    {{ghost_head}}
</head>
```

**Canonical URLs:**

```handlebars
{{!-- Automatically included in ghost_head, but can access manually --}}
{{canonical_url}}
```

### 6. Code Injection

Add site-wide or per-post custom code via Ghost Admin > Settings > Code Injection.

**Site-wide injection:**
- **Site Header** → injected in `{{ghost_head}}`
- **Site Footer** → injected in `{{ghost_foot}}`

**Per-post injection:**
- Available in post editor sidebar
- Only applies to that specific post

**Common uses:**
- Analytics (Google Analytics, Plausible)
- Custom fonts
- Meta tags
- Scripts

### 7. Translation Setup

**1. Create locales folder:**

```
/your-theme/
└── /locales/
    ├── en.json
    └── es.json
```

**2. Translation files:**

```json
// en.json
{
  "Back": "Back",
  "Subscribe": "Subscribe",
  "Latest Posts": "Latest Posts"
}
```

```json
// es.json
{
  "Back": "Volver",
  "Subscribe": "Suscribirse",
  "Latest Posts": "Últimas Publicaciones"
}
```

**3. Use in templates:**

```handlebars
<a href="/">{{t "Back"}}</a>
<button>{{t "Subscribe"}}</button>
```

**4. Set language in Ghost Admin:**
Settings > General > Publication Language (e.g., `es`)

**5. Restart Ghost:**

```bash
ghost restart
```

### 8. Testing & Validation

**Use GScan:**

```bash
# Web interface
https://gscan.ghost.org/

# CLI
npm install -g gscan
gscan /path/to/theme
```

**Check for:**
- Required files (index.hbs, post.hbs, package.json)
- Deprecated helpers
- Ghost version compatibility
- Best practice violations

---

## Common Pitfalls

### 1. Forgetting Triple Braces for URLs

**Wrong:**

```handlebars
<a href="{{url}}">{{title}}</a>
{{!-- & becomes &amp; --}}
```

**Correct:**

```handlebars
<a href="{{{url}}}">{{title}}</a>
```

### 2. Using {{#each}} Instead of {{#foreach}}

**Wrong:**

```handlebars
{{#each posts}}
    {{!-- Requires ../ for parent context --}}
    {{../site.title}}
{{/each}}
```

**Correct:**

```handlebars
{{#foreach posts}}
    {{!-- Direct context access --}}
    {{@site.title}}
{{/foreach}}
```

### 3. Not Checking Context Before Using Data

**Wrong:**

```handlebars
{{!-- This fails on pages without tags --}}
{{tags}}
```

**Correct:**

```handlebars
{{#if tags}}
    {{tags}}
{{/if}}

{{!-- Or with has --}}
{{#has tag="news"}}
    <span class="badge">News</span>
{{/has}}
```

### 4. Hardcoding URLs

**Wrong:**

```handlebars
<a href="https://example.com/about/">About</a>
```

**Correct:**

```handlebars
{{!-- Use navigation or site URL --}}
<a href="{{@site.url}}/about/">About</a>
```

### 5. Missing {{ghost_head}} or {{ghost_foot}}

These are required for:
- Meta tags and SEO
- Structured data
- RSS feed discovery
- Code injection
- jQuery and Ghost scripts

**Always include:**

```handlebars
<head>
    {{ghost_head}}
</head>
<body>
    {{{body}}}
    {{ghost_foot}}
</body>
```

### 6. Timeago on Cached Sites

**Problem:**

```handlebars
{{date published_at timeago="true"}}
{{!-- Shows "5 mins ago" relative to cache time, not visitor time --}}
```

**Solution:**
Use JavaScript for dynamic timeago on cached sites, or stick with formatted dates.

### 7. Too Many Image Sizes

**Problem:**
Defining 20+ image sizes bloats storage.

**Solution:**
Use 6-10 strategic sizes:

```json
{
  "image_sizes": {
    "s": {"width": 300},
    "m": {"width": 600},
    "l": {"width": 1000},
    "xl": {"width": 2000}
  }
}
```

### 8. Not Handling Empty States

**Wrong:**

```handlebars
{{#foreach posts}}
    <article>{{title}}</article>
{{/foreach}}
{{!-- Nothing shows when no posts --}}
```

**Correct:**

```handlebars
{{#foreach posts}}
    <article>{{title}}</article>
{{else}}
    <p>No posts yet. Check back soon!</p>
{{/foreach}}
```

### 9. Invalid JSON in package.json

**Common mistakes:**
- Trailing commas
- Single quotes instead of double quotes
- Missing quotes around property names

**Wrong:**

```json
{
  name: 'my-theme',
  config: {
    posts_per_page: 10,
  }
}
```

**Correct:**

```json
{
  "name": "my-theme",
  "config": {
    "posts_per_page": 10
  }
}
```

### 10. Overriding Ghost Classes

**Problem:**
Using Ghost's reserved class names can break functionality.

**Solution:**
Prefix your classes:

```css
/* Good */
.vb-header { }
.vb-nav-item { }

/* Avoid */
.gh-head { }      /* Ghost uses this */
.post { }         /* Too generic */
```

---

## Additional Resources

### Official Documentation

- **Ghost Docs:** https://ghost.org/docs/themes/
- **Ghost Developer Docs:** https://docs.ghost.org/
- **Handlebars Guide:** https://handlebarsjs.com/guide/

### GitHub Resources

- **Casper (Default Theme):** https://github.com/TryGhost/Casper
- **Starter Theme:** https://github.com/TryGhost/Starter

### Tools

- **GScan (Theme Validator):** https://gscan.ghost.org/
- **Ghost CLI:** For local development and testing
- **VS Code Extension:** Ghost theme syntax highlighting

### Community

- **Ghost Forum:** https://forum.ghost.org/
- **Ghost Themes Marketplace:** Browse community themes for examples

---

## Quick Reference Card

### Most Common Helpers

```handlebars
{{!-- Post data --}}
{{title}}
{{{content}}}
{{excerpt words="30"}}
{{{url}}}
{{feature_image}}
{{published_at}}
{{reading_time}}

{{!-- Author --}}
{{#primary_author}}
    {{name}}
    {{profile_image}}
    {{{url}}}
{{/primary_author}}

{{!-- Tags --}}
{{tags separator=", "}}
{{#primary_tag}}
    {{name}}
{{/primary_tag}}

{{!-- Site --}}
{{@site.title}}
{{@site.description}}
{{@site.logo}}

{{!-- Loops --}}
{{#foreach posts}}
    {{title}}
{{/foreach}}

{{!-- Conditionals --}}
{{#is "home"}}...{{/is}}
{{#if featured}}...{{/if}}
{{#has tag="news"}}...{{/has}}

{{!-- Images --}}
{{img_url feature_image size="m"}}

{{!-- Dates --}}
{{date published_at format="MMMM DD, YYYY"}}

{{!-- Navigation --}}
{{navigation}}

{{!-- Pagination --}}
{{pagination}}
```

### Template Checklist

**default.hbs:**
- [ ] `{{ghost_head}}` before `</head>`
- [ ] `{{ghost_foot}}` before `</body>`
- [ ] `{{{body}}}` for content
- [ ] `<html lang="{{@site.locale}}">`

**index.hbs:**
- [ ] `{{#foreach posts}}` loop
- [ ] `{{else}}` for empty state
- [ ] `{{pagination}}`

**post.hbs:**
- [ ] `{{#post}}` wrapper
- [ ] `{{{content}}}`
- [ ] Author and tag display
- [ ] Share buttons
- [ ] Next/prev post navigation

**package.json:**
- [ ] Valid JSON (no trailing commas)
- [ ] `"name"`, `"version"`, `"engines"`
- [ ] `"config.posts_per_page"`
- [ ] `"config.image_sizes"` (if using responsive images)

---

**End of Ghost v6 Reference Documentation**

For updates and corrections, see: https://ghost.org/docs/themes/
