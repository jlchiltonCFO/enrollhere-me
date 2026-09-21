# EnrollHere.me

Independent EnrollHere educational landing page and interactive ID.me training tool for people 65+.

## Status

- Static HTML/CSS/JS marketing site and seven-step first-time ID.me setup lesson built locally.
- Go-to-market page follows the same EnrollHere design family as EH Books and EH OS Customer Operations: shared wordmark, Inter typography, violet/navy/mint palette, strong product lockup, clear primary action, and a separate application destination.
- Working GitHub repository: https://github.com/jlchiltonCFO/enrollhere-me
- Original backup repository: https://github.com/chiltonbradley/enrollhere-me
- GitHub Pages deployment and the `enrollhere.me` custom-domain file are configured. DNS and HTTPS still require production verification.
- This product is a training tool. It intentionally does not implement ID.me authentication or collect identity data.

Open index.html in a browser, or run `node server.mjs` and visit http://127.0.0.1:4196. No installation is required. `training.html` is the training lesson entry point.

Release checks cover JavaScript syntax, internal links, all seven training steps, final readiness-test validation, back/restart navigation, larger-text mode, legal pages, HTTP asset responses, keyboard order, mobile reflow, color contrast, reduced motion, forced colors, and blocked access to Git metadata.

The EnrollHere wordmark and app icon are shared with the existing EnrollHere properties in `jlchiltonCFO/eh-books-marketing`. The public page uses the wordmark as a quiet signature. The training page uses a restrained blue-and-white sign-in style while remaining clearly labeled as practice.

The repository also contains the approved `idme-logo-navy.svg` and `sign-in-button-white-green-text.svg` assets supplied from ID.me's brand kit. The navy logo appears unmodified at its native 93 × 34 size on a light background with clear space. The sign-in button appears unmodified at 191 × 48 only as a labeled, noninteractive example inside the lesson; it is never used to start authentication. EnrollHere and ID.me marks are not combined into a new logo.

See `ACCESSIBILITY-CHECKLIST.md` for the WCAG 2.2 AA review, `BRAND-AND-DOMAIN.md` for launch naming and domain guidance, and `SECURITY.md` for the training-only security boundary.

## Intended architecture

`https://enrollhere.me` go-to-market site → `https://enrollhere.me/training.html` browser-based training → official ID.me help or an organization’s real ID.me sign-in link.

The marketing page, training lesson, readiness test, legal notices, and accessibility statement are all static files in this repository and deploy together. No separate application, subdomain, database, or application host is required.

The site has no authentication backend, credential fields, identity-document uploads, analytics, forms, or data collection. Lesson state is in memory only. The local preview server listens only on the local machine.

## GitHub setup

The private `enrollhere-me` working repository belongs to the EnrollHere GitHub account (`jlchiltonCFO`). The original copy under `chiltonbradley` remains intact as a backup. Keep both repositories private until brand, legal, accessibility, and domain reviews are complete.

Every push to `main` runs `.github/workflows/pages.yml`, which publishes the repository root to GitHub Pages. The root `CNAME` file sets the intended public hostname to `enrollhere.me`. In GitHub, set **Settings → Pages → Source** to **GitHub Actions**. Do not change DNS until the Pages deployment is successful and the GitHub custom-domain check is ready.

## ID.me brand and product boundary

Use only approved ID.me assets and follow ID.me’s logo clear-space, color, and minimum-size requirements. The page must state that EnrollHere.me is independent from ID.me and government agencies. Do not choose a domain that implies official ID.me or government ownership. Do not claim a formal partnership, endorsement, verification, or certification without documentation.

If the product later adds a real ID.me integration, treat that as a new security and privacy release requiring approved developer credentials, server-side authorization-code flow, exact callback registration, security review, and an updated privacy notice and terms.

## Sources checked September 19, 2026

- https://docs.id.me/guides/open-id-connect/integration
- https://help.id.me/hc/en-us/articles/25196264509463-Sign-in-with-ID-me-after-verifying-your-identity
- https://help.id.me/hc/en-us/articles/202673924-Create-your-ID-me-Wallet
- https://help.id.me/hc/en-us/articles/9198013708439-Verify-your-identity-with-ID-me-Self-Service
- https://help.id.me/hc/en-us/articles/4415460350871-Documents-you-need-to-verify-your-identity-with-ID-me
- https://help.id.me/hc/en-us/articles/360018113053-Multi-factor-authentication-MFA-options-for-ID-me
- https://help.id.me/hc/en-us/sections/7298020863511-Sign-in-and-passwords
- https://help.id.me/hc/en-us/articles/202087724-Reset-your-ID-me-password-if-you-can-t-sign-in
- https://docs.id.me/brand-assets/brand-assets/brand-guidelines
- https://www.w3.org/TR/WCAG22/
- https://www.ada.gov/resources/web-guidance/
