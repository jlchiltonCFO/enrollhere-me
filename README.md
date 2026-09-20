# EnrollHere.me

Independent JLC Limited educational landing page and interactive ID.me training tool for older adults.

## Status

- Static HTML/CSS/JS marketing site and five-part practice lesson built locally.
- Lovable project created in the **jlc limited** workspace: https://lovable.dev/projects/58210f85-1ae3-4343-be07-20e3f9600d88
- App preview link: https://id-preview--58210f85-1ae3-4343-be07-20e3f9600d88.lovable.app/training
- Working GitHub repository: https://github.com/jlchiltonCFO/enrollhere-me
- Original backup repository: https://github.com/chiltonbradley/enrollhere-me
- No production site has been published.
- This product is a training tool. It intentionally does not implement ID.me authentication or collect identity data.

Open index.html in a browser, or run `node server.mjs` and visit http://127.0.0.1:4196. No installation is required. `training.html` is the training lesson entry point.

Release checks cover JavaScript syntax, internal links, all five lesson steps, back/restart navigation, larger-text mode, legal pages, HTTP asset responses, keyboard order, mobile reflow, color contrast, reduced motion, forced colors, and blocked access to Git metadata.

See `ACCESSIBILITY-CHECKLIST.md` for the WCAG 2.2 AA review, `BRAND-AND-DOMAIN.md` for launch naming and domain guidance, and `SECURITY.md` for the training-only security boundary.

## Intended architecture

`https://enrollhere.me` go-to-market site → `https://id.enrollhere.me` Lovable training app → official ID.me help or an organization’s real ID.me sign-in link.

The custom subdomain is the intended production address. Keep the local `training.html` route and Lovable preview available for testing until DNS, HTTPS, and every route have been verified on `id.enrollhere.me`.

The site has no authentication backend, credential fields, identity-document uploads, analytics, forms, or data collection. Lesson state is in memory only. The local preview server listens only on the local machine.

## GitHub setup

The private `enrollhere-me` working repository belongs to the EnrollHere GitHub account (`jlchiltonCFO`). The original copy under `chiltonbradley` remains intact as a backup. Keep both repositories private until brand, legal, accessibility, and domain reviews are complete.

## ID.me brand and product boundary

Use only approved ID.me assets and follow ID.me’s logo clear-space, color, and minimum-size requirements. The page must state that EnrollHere.me is independent from ID.me and government agencies. Do not choose a domain that implies official ID.me or government ownership. Do not claim a formal partnership, endorsement, verification, or certification without documentation.

If the product later adds a real ID.me integration, treat that as a new security and privacy release requiring approved developer credentials, server-side authorization-code flow, exact callback registration, security review, and an updated privacy notice and terms.

## Sources checked September 19, 2026

- https://docs.id.me/guides/open-id-connect/integration
- https://help.id.me/hc/en-us/articles/25196264509463-Sign-in-with-ID-me-after-verifying-your-identity
- https://help.id.me/hc/en-us/sections/7298020863511-Sign-in-and-passwords
- https://help.id.me/hc/en-us/articles/202087724-Reset-your-ID-me-password-if-you-can-t-sign-in
- https://docs.id.me/brand-assets/brand-assets/brand-guidelines
- https://www.w3.org/TR/WCAG22/
- https://www.ada.gov/resources/web-guidance/

