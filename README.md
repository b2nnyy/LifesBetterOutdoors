# LifesBetterOutdoors — Website

A static, GitHub-Pages-ready marketing site for **LifesBetterOutdoors**, a pergola design, sales, and
installation company. The goal of the site is to (1) showcase your work and (2) capture leads via a
quote-request form.

---

## What's in here

```
LifesBetterOutdoors/
├── index.html          # Home page — hero, services preview, gallery preview, value props, CTA
├── gallery.html        # Filterable gallery with lightbox
├── services.html       # Services detail, process, materials
├── contact.html        # Contact info + quote-request form
├── 404.html            # Friendly not-found page
├── css/
│   └── style.css       # Full design system (one file)
├── js/
│   └── main.js         # Header, mobile menu, scroll-fade, gallery filters/lightbox, form
├── .nojekyll           # Tells GitHub Pages to serve files as-is (no Jekyll)
└── README.md           # You're here
```

There are no build tools and no dependencies — just open `index.html` in a browser to preview, or
push to GitHub to publish.

---

## Placeholders to fill in

The site is intentionally content-light. Search the project for these `{{ ... }}` tokens and
replace them with real values. They appear in `index.html`, `gallery.html`, `services.html`, and
`contact.html`.

| Token | What it is | Example value |
|---|---|---|
| `{{ PHONE_DISPLAY }}` | Phone shown on screen | `(555) 123-4567` |
| `{{ PHONE_E164 }}` | Phone for `tel:` links | `+15551234567` |
| `{{ EMAIL }}` | Contact email | `hello@lifesbetteroutdoors.com` |
| `{{ ADDRESS_LINE_1 }}` | Street address | `123 Main Street` |
| `{{ ADDRESS_LINE_2 }}` | City, state, ZIP | `Anytown, ST 00000` |
| `{{ HOURS_WEEKDAY }}` | Mon–Fri hours | `9 AM – 6 PM` |
| `{{ HOURS_SATURDAY }}` | Saturday hours | `10 AM – 4 PM` |
| `{{ HOURS_SUNDAY }}` | Sunday hours | `Closed` |
| `{{ SERVICE_AREA }}` | Where you work | `Greater Metro Area & 60 mi radius` |
| `{{ YEARS }}` | Years in business | `12` |
| `{{ PROJECTS }}` | Pergolas installed | `350` |
| `{{ RATING }}` | Avg. rating | `4.9` |
| `{{ WARRANTY }}` | Warranty length (years) | `5` |
| `{{ INSTALL_DAYS }}` | Typical install time | `3–5` |
| `{{ QUOTE_TURNAROUND }}` | Days to send a quote | `2` |
| `{{ RESPONSE_TIME }}` | Hours to respond to form | `24` |
| `{{ DISCOVERY_DURATION }}` | Discovery call length | `15` |
| `{{ RESIDENTIAL_TIMELINE }}` | Residential project timeline | `2–4 weeks` |
| `{{ RESIDENTIAL_START_PRICE }}` | Residential starting price | `$X,XXX` |
| `{{ RESTAURANT_TIMELINE }}` | Restaurant timeline | `4–6 weeks` |
| `{{ RESTAURANT_START_PRICE }}` | Restaurant starting price | `$X,XXX` |
| `{{ COMMERCIAL_TIMELINE }}` | Commercial timeline | `8–16 weeks` |
| `{{ CUSTOM_TIMELINE }}` | Custom timeline | `Varies` |
| `{{ TESTIMONIAL_QUOTE_PLACEHOLDER }}` | Customer quote | (a 2–3 sentence quote) |
| `{{ CUSTOMER_NAME }}` | Quoted customer's name | `Sarah J.` |
| `{{ CUSTOMER_LOCATION }}` | Quoted customer's city | `Anytown, ST` |
| `{{ LICENSE_INFO_OPTIONAL }}` | Contractor license #, etc. | `Lic. #123456` (or remove) |

> Tip: in VS Code, use **Find in Files** (Cmd/Ctrl + Shift + F), search `{{ `, and replace one by one.

---

## Adding real photos

The gallery and project tiles use elegant **placeholder tiles** so the site looks polished while
you collect photography. To swap in real photos:

1. Save your photos in a new folder, e.g. `images/projects/`.
2. In `gallery.html`, find a tile and replace the inner placeholder:

   ```html
   <!-- BEFORE -->
   <div class="photo">
     <span class="photo-tag">Project 01</span>
     <svg class="photo-mark">...</svg>
   </div>

   <!-- AFTER -->
   <img src="images/projects/backyard-retreat.jpg" alt="Cedar pergola in backyard with seating" />
   ```

3. Recommended image specs:
   - Gallery thumbnails: square (1:1), 1200×1200 JPG, ~200 KB
   - Hero / featured: 1600×2000 (4:5) JPG, ~400 KB
   - Use `loading="lazy"` on all `<img>` tags below the fold.

4. Same swap pattern works for hero, featured projects on home, and service-card thumbnails.

---

## Wiring up the quote form

The form on `contact.html` is set up for **Formspree**, which is the simplest option for a
GitHub-Pages-hosted site (no backend needed, free tier available).

1. Sign up at [formspree.io](https://formspree.io).
2. Create a new form, copy your form ID (looks like `xyzabc123`).
3. Open `contact.html` and replace `YOUR_FORMSPREE_ID` in the form's `action` attribute:

   ```html
   <form ... action="https://formspree.io/f/xyzabc123" method="POST" novalidate>
   ```

Until Formspree is configured, the form will show an in-page success message so you can test it.

The form already includes:
- Client-side validation (name, valid email, phone format, message length)
- A honeypot field (`_gotcha`) for spam protection
- Project type, budget, and timeline fields to qualify leads

---

## Hosting on GitHub Pages

1. Create a new GitHub repository — name it whatever you want (e.g. `lifesbetteroutdoors`).
2. Push the contents of this folder to the `main` branch.
3. In the repo, go to **Settings → Pages**.
4. Under **Source**, choose **Deploy from a branch**, pick **main** and folder **/ (root)**, and **Save**.
5. Wait ~1 minute. GitHub will give you a URL like `https://YOUR-USERNAME.github.io/lifesbetteroutdoors/`.

The included `.nojekyll` file tells GitHub Pages to skip Jekyll processing — important if you
later add folders that start with an underscore.

---

## Connecting your Wix domain

You bought a domain through Wix. To point it at GitHub Pages:

### 1. In your GitHub repo

- Create a file named `CNAME` (no extension) at the root of the project, containing **only your
  apex domain** on a single line, e.g.:
  ```
  lifesbetteroutdoors.com
  ```
- Commit and push.
- Then in **Settings → Pages → Custom domain**, type your domain and click Save.
- Check **"Enforce HTTPS"** once GitHub finishes verifying the certificate (can take up to 24 h).

### 2. In Wix DNS (where you bought the domain)

You'll add records that point your domain at GitHub's servers.

**Apex domain (`lifesbetteroutdoors.com`)** — add four `A` records pointing to GitHub Pages IPs:

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**`www` subdomain** — add a `CNAME` record:

| Type | Host | Value |
|---|---|---|
| CNAME | `www` | `YOUR-USERNAME.github.io` |

> In Wix's domain dashboard, look for **Manage DNS Records** (sometimes under "Advanced" → "DNS Records"). If you have an existing `A` record on `@`, delete it before adding GitHub's.

DNS changes can take 1–24 hours to propagate. Once it's live, both `lifesbetteroutdoors.com` and
`www.lifesbetteroutdoors.com` will load your GitHub Pages site over HTTPS.

---

## Local preview

Just double-clicking `index.html` works for most things, but a couple of features (relative paths,
`fetch`-style requests if you add them later) are happier with a real local server:

```bash
# Python 3 (no install needed on macOS / most Linux)
cd LifesBetterOutdoors
python3 -m http.server 8000

# Then open
http://localhost:8000
```

Or use the **Live Server** extension in VS Code.

---

## Design notes

- **Palette**: warm off-white background, near-black ink, warm wood accent (`#8A6A45`), and a
  light cream accent for highlights. Easy to keep restrained even when photos are added.
- **Type**: Fraunces (display serif, free, Google Fonts) for headings; Inter for everything else.
- **Motion**: subtle `fade-up` reveal on scroll using `IntersectionObserver`. Respects
  `prefers-reduced-motion`.
- **Accessibility**: all interactive elements have visible focus states, the mobile menu is
  keyboard-friendly, and the lightbox supports `Esc` / `←` / `→`.
- **No build step**: a single `style.css` and a single `main.js`. No bundler, no framework — easy
  to maintain and easy to host anywhere.

---

## Future enhancements (when ready)

- Add a **Testimonials** page once you collect 5–10 customer quotes.
- Add a **FAQ** page (materials, install time, pricing, warranty, permits).
- Add **Blog** for SEO (pergola care, design trends).
- Plug in **Google Analytics** or **Plausible** to measure visits.
- Set up **Google Business Profile** and link to it from the contact page.
- Add a **Schema.org LocalBusiness** JSON-LD block for SEO once address/phone are confirmed.
