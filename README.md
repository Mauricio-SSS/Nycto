# Nycto website

A custom static landing page and privacy policy for Nycto.

## Files

- `index.html` - landing page
- `privacy.html` - privacy policy
- `styles.css` - custom visual system, layout, and responsive design
- `script.js` - reveal animations, mobile nav, and product tour screen switching
- `assets/` - logo, Open Graph card, and compressed screenshots

## Deploy on GitHub Pages

1. Copy the contents of this folder into the root of the `Mauricio-SSS/Nycto` repository.
2. Commit and push to `main`.
3. In GitHub, open **Settings > Pages**.
4. Set the source to **Deploy from a branch**, choose `main`, then choose `/root`.
5. Save. GitHub will publish the site after the Pages build completes.

## Before publishing

- Replace any launch CTA with the final App Store URL.
- Review `privacy.html` with the actual app implementation, especially if Nycto uses accounts, analytics, crash reporting, payments, HealthKit, calendar sync, location, or cloud sync.
- Replace the contact line in the privacy policy with the final support email or support URL.
