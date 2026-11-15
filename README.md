# PHALINX — Information Website 8.0 | Editorial Studio Redesign

## Design update
Full visual rebuild inspired by modern product-studio sites (Ramotion-style): white canvas, oversized tight grotesk headlines (Inter Tight), large rounded photo cards, a scrolling keyword marquee, numbered principle stats, a dark services list with image thumbnails, soft-grey pricing cards with a dark featured tier, hover-flip process cards, and a dark footer with an oversized wordmark. The peach Phalinx monogram is kept as the accent color. Sections fade up on scroll (disabled for reduced-motion users).

## Photography
Section imagery is hotlinked from Unsplash (images.unsplash.com) under the Unsplash License. If any photo fails to load, its frame falls back to a neutral tone. Before launch, confirm each photo suits the brand, or swap in your own and host them in `assets/`.

## Services (proposed launch prices)
- Brand Foundations — from $850
- Website Launch — from $1,850
- Brand + Web Sprint — from $2,500
- A phased-engagement route with proposed $200 phase-two credit (terms and scope subject to confirmation), plus smaller custom-scope inquiries.

## Inquiry interactions
All links to the inquiry experience launch the same modal form, EXCEPT the header “Start a Conversation” link, which scrolls down to the on-page inquiry section. Package buttons preselect their service. The modal keeps user-entered content when closed and reopened, and supports Escape, close button, outside click, and mobile scrolling.

## Payments
The page illustrates paying in full or 50%/25%/25% at project milestones. No payment processor is connected and the site does not offer a loan or subscription. A payment preference field is included in the form.

## Deployment
This is a static site ready to configure and deploy using Netlify Forms. It is **not live** and the inquiry form is **not yet receiving clients**. Before publishing, approve pricing, service scope, phase-two credit, payment terms, privacy and legal policies. Deploy the extracted folder, configure form submission notifications, then run a real end-to-end test.

## Files
`index.html`, `styles.css`, `main.js`, `thank-you.html`, `netlify.toml`, `favicon.png`, `assets/`.
