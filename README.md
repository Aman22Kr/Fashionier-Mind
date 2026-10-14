# fashionierMind — Haute Couture Atelier & Bespoke Bridal

An architectural, multi-page static web application recreating the luxury couture atelier experience of the reference maison (formerly Moi Couture) under the new brand identity **fashionierMind**.

Curated for GitHub user: **Aman22kr**

---

## 🌟 Key Features

1. **Brand Identity & Refined Visuals**
   - High-fashion Parisian aesthetic with Cormorant Garamond display serif and Plus Jakarta Sans geometric typography.
   - Zero-pill metadata discipline, unboxed natural separators (`·`), and high-contrast editorial photography.
   - Curated color palette: Warm Alabaster (`#FAF8F5`), Deep Charcoal (`#121212`), and Champagne Gold (`#C5A880`).

2. **Multi-Page Architecture (All Accessible Routes)**
   - **`/` — Home**: Campaign hero, SS26 Runway highlights, atelier craftsmanship pillars, category portals, and client testimonials.
   - **`/collections` — Haute Couture Collections**: Multi-facet filter by category (Bridal, Evening, Resort, Accessories), silhouette, fabric, sort by price/hours, instant search, and 2-col/3-col layout switch.
   - **`/product/:id` — Product Detail Page (PDP)**: Contiguous purchase module, multi-angle gallery, standard size selector, custom made-to-measure measurement form (Bust, Waist, Hips, Hollow-to-Hem), atelier hours badge, and direct salon fitting booking.
   - **`/runway` — Runway & Showreel**: Season selector ("Nocturne & Pearl" SS26 vs "Golden Hour" FW25), 4K runway stream preview mock, model credits, and lookbook links.
   - **`/atelier` — The Atelier & Savoir-Faire**: Heritage storytelling, the 3 disciplines (Le Moulage, La Broderie, L’Architecture), and Paris / New York flagship salons.
   - **`/bespoke` — Bespoke Services**: 4-step made-to-measure journey and interactive **Custom Gown Cost & Timeline Estimator**.
   - **`/appointments` — Book a Salon Appointment**: Interactive reservation system for Paris Place Vendôme, New York Madison Ave, London Mayfair, or Virtual Video Concierge with live itinerary management.
   - **`/wishlist` — Private Archive**: Saved creations with quick move-to-bag and shareable links.
   - **`/bag` — Shopping Bag & Simulation Checkout**: Itemized order list, complimentary archival gift packaging toggle, VIP promo code (`VIPCOUTURE`), and complete mock checkout modal with order receipt (`FM-2026-XXXX`).
   - **`/contact` — Flagship Salons & Concierge**: Interactive location directories, hours, concierge contact form with auto-saved drafts.
   - **`/faq` — Couture Care & Sizing**: Comprehensive French-to-US sizing conversion table and accordion answers for international white-glove courier and heirloom gown preservation.
   - **Base Ad Section**: Present on every page base above the footer showcasing curated luxury partner features (Place Vendôme High-Jewelry Trunk Shows) with expand/dismiss options.

3. **Browser LocalStorage Persistence**
   - `fashionierMind_cart_v1`: Shopping bag items with sizes and custom measurements.
   - `fashionierMind_wishlist_v1`: Favorite gowns.
   - `fashionierMind_recent_v1`: Recently viewed items across sessions.
   - `fashionierMind_appointments_v1`: Salon bookings itinerary.
   - `fashionierMind_currency_v1`: Currency preference (USD $, EUR €, GBP £).
   - `fashionierMind_ad_dismissed_v1`: Ad banner preferences.
   - `fashionierMind_newsletter_subscribed`: VIP Gazette subscription.

4. **GitHub Pages Static Deployment Compatibility**
   - Configured with `HashRouter` (`/#/collections`, `/#/product/FM-01`) guaranteeing 100% reliable direct links and page refreshes on GitHub Pages without requiring server-side URL rewrite hacks.
   - Vite configured with relative base path (`base: './'`).

---

## 🚀 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local Vite development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Verify build:**
   ```bash
   npm run build
   ```

---

## 📦 Deployment to GitHub Pages (Static Hosting)

### Method A: Direct Command with `gh-pages` (Recommended)

1. Make sure your GitHub repository is created under your account (e.g., `https://github.com/Aman22kr/fashionierMind`).
2. Run the deployment script:
   ```bash
   npm run deploy
   ```
   This automatically runs `npm run build` and publishes the static `dist/` directory to the `gh-pages` branch.
3. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select the `gh-pages` branch and `/ (root)` folder, then click **Save**.
   - Your site will be live at `https://Aman22kr.github.io/fashionierMind/` within 1–2 minutes!

### Method A: Automated GitHub Actions Workflow (Zero Manual Build)

The file `.github/workflows/deploy.yml` is already included in your repository.

#### Crucial Step in GitHub Repository Settings:
1. Open your repository on GitHub: `https://github.com/Aman22kr/fashionierMind`
2. Navigate to **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment** → **Source**, change the dropdown from *"Deploy from a branch"* to **"GitHub Actions"**. *(If this is left on "Deploy from a branch", the action will fail with a 404 status).*
4. Navigate to **Settings** → **Actions** → **General** → scroll down to **Workflow permissions** → ensure **"Read and write permissions"** is selected, and click **Save**.
5. Commit and push:
   ```bash
   git add .
   git commit -m "Update GitHub Actions workflow and dependency config"
   git push origin main
   ```
6. The action will run automatically under the **Actions** tab and publish to:
   **`https://Aman22kr.github.io/fashionierMind/`**

---

### Method B: 1-Command CLI Deployment with `gh-pages` (Instant Fallback)

If you don't want to configure GitHub Actions settings, you can deploy in 1 command directly from your terminal:

1. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, ensure **"Deploy from a branch"** is selected.
   - Choose the branch **`gh-pages`** and folder **`/ (root)`**, then click **Save**.
2. Run in your terminal:
   ```bash
   npm run deploy
   ```
   This builds the site locally and publishes the `dist/` directory directly to the `gh-pages` branch. Your site will be live immediately!

---

## 🔒 Notes & Policies
- **Demonstration Notice**: All checkouts, bookings, and form submissions are simulated purely client-side; no real monetary transactions or server credentials are transmitted.
- **Data Privacy**: All patronage data resides securely in the user's browser `localStorage`.
