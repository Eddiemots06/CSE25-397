# ACE Gear — Tennis Website
## Web & Multimedia Development Assignment · BAC · 2026

---

## Project Structure

```
acegear/
├── index.html          ← Home page (Landing page)
├── rackets.html        ← Rackets catalogue with filter & sort
├── compare.html        ← Interactive racket comparison tool
├── guide.html          ← Buying guide with sticky TOC
├── contact.html        ← Contact/Feedback form (HTML5 validated)
├── css/
│   └── style.css       ← External CSS3 design system
├── js/
│   └── main.js         ← JavaScript (nav, filters, compare, form)
└── images/             ← Image assets folder
```

---

## Technologies Used

| Technology    | Version  | Purpose                                   |
|---------------|----------|-------------------------------------------|
| HTML5         | —        | Semantic structure, forms, accessibility  |
| CSS3          | —        | Custom design system, animations, layout  |
| Bootstrap     | 5.3.3    | Responsive grid, utilities, components    |
| JavaScript    | ES6+     | Interactivity, DOM manipulation, validation |
| Google Fonts  | —        | Barlow Condensed + DM Sans typography     |

---

## Pages

| Page            | File            | Description                              |
|-----------------|-----------------|------------------------------------------|
| Home            | index.html      | Hero, featured products, testimonials    |
| Rackets         | rackets.html    | Browse, filter by level/price, sort      |
| Compare         | compare.html    | Side-by-side comparison up to 3 rackets  |
| Guide           | guide.html      | Buying guide with TOC sidebar            |
| Contact         | contact.html    | HTML5 form with full JS validation       |

---

## GitHub Pages Deployment

```bash
# 1. Initialise repository
git init
git add .
git commit -m "Initial commit: ACE Gear website"

# 2. Connect to GitHub
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main

# 3. Enable GitHub Pages
# Go to: Settings → Pages → Source: Deploy from branch (main / root)

# 4. Your site will be live at:
# https://YOUR_USERNAME.github.io/YOUR_REPO/
```

---

## W3C Compliance Checklist

- ✅ Valid HTML5 doctype and semantic tags
- ✅ All images include alt, width, height attributes
- ✅ All form fields have associated labels
- ✅ Required fields marked with required attribute
- ✅ External CSS stylesheet (css/style.css)
- ✅ No inline styles (design system uses CSS variables)
- ✅ Responsive viewport meta tag
- ✅ ARIA labels on icon buttons
- ✅ Bootstrap 5 grid for responsive layout
- ✅ Consistent navigation across all 5 pages
- ✅ No broken links

---

## Browser Compatibility

Tested on: Chrome · Firefox · Edge · Opera · Safari (mobile)

---

## Assignment Details

- **Module:** Web & Multimedia Development — Year 1 Semester 2
- **Programme:** BSC Business Intelligence & Data Analytics / BSC Computer Systems Engineering / BSC Applied Business Computing
- **Institution:** Botswana Accountancy College (BAC)
- **Hand-in Date:** 20 May 2026
