# Phalinx

Our studio's own site (phalinx.space): brand and web services, pricing and inquiry. Static HTML/CSS/JS.

## Run
- `python3 -m http.server 8000`, then open http://localhost:8000

## Verify
- Run `verify-ui`: both themes, 390/768/1440 px, the inquiry modal (Escape, close button, outside click, mobile scroll), reduced motion.

## Ship
- Netlify deploys `main` to production.

## Gotchas
- Colors are CSS variables: light in `:root`, dark in **both** `[data-theme="dark"]` and the `prefers-color-scheme` block. Change them together.
- The header "Start a Conversation" link scrolls to the inquiry section. Every other inquiry link opens the modal, and package buttons preselect their service.
- Payments are Stripe invoices after a signed proposal. There's no on-site checkout, so don't add one.
- Prices are proposed launch prices. Confirm with the user before changing them.
- Photos are hotlinked from Unsplash, and each frame needs a neutral fallback.
