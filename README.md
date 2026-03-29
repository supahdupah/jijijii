# My Portfolio Website

A simple, modern portfolio website hosted on GitHub Pages.

## Features

- Clean, responsive design
- Sections for About and jijijii project
- Mobile-friendly navigation
- Modern styling with gradient effects

## Customization

### Edit Your Content

1. **HTML Content** (`index.html`):
   - Update the GitHub username in links
   - Modify section titles and descriptions
   - Add or remove sections as needed
   - Update the jijijii project description

2. **Styling** (`styles.css`):
   - Change colors in the CSS variables and color codes
   - Modify fonts and spacing
   - Adjust hero section background gradient

### Key Areas to Personalize

- **Hero Section**: Update the welcome message
- **About Me**: Write your own bio
- **jijijii Project**: Add details about your project, tech stack, and links
- **Contact**: Add your actual contact information and social links

## GitHub Pages Setup

This site is automatically hosted on GitHub Pages. Follow these steps:

### 1. Ensure You Have a GitHub Repository

Make sure your repository matches your setup.

### 2. Push to GitHub

If you haven't already, initialize git and push this code:

```bash
git init
git add .
git commit -m "Initial portfolio website"
git remote add origin https://github.com/supahdupah/jijijii.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

GitHub will now automatically deploy your site at: `https://supahdupah.github.io/jijijii/`

If you want the site at `https://supahdupah.github.io/`, rename your repository to `supahdupah.github.io`.

### 4. Custom Domain (Optional)

If you have a custom domain, add it in GitHub Pages settings.

## Testing Locally

To preview your website locally before deploying:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if http-server is installed)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## File Structure

```
├── index.html       # Main website file
├── styles.css       # Styling
└── README.md        # This file
```

---

**Created**: March 29, 2026
**Author**: supahdupah