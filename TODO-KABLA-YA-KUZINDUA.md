# Infinity Oil — Pre-Launch Checklist

Everything below is either a placeholder you need to fill in, or a note about
something I changed that's worth knowing before you deploy. Search each file
for `FILL IN` / `JAZA` / `[...]` comments — they mark the exact spot.

## 1. Must fill in before launch

**Trust bar (index.html) + Kuhusu → "Leseni na Usajili" + footer (every page)**
- [ ] EWURA license number
- [ ] TRA TIN
- [ ] BRELA company registration number

**Kuhusu.html → "Safari Yetu" history timeline**
- [ ] Year founded + how the company started
- [ ] Year(s) of expansion to new branches
(Currently placeholder text in brackets, e.g. `[Mwaka]`, `[Eleza...]`)

**index.html → "Wanachosema Wateja Wetu" testimonials**
- [ ] Replace all 3 placeholder quotes with real customer feedback (Google
      Reviews, Instagram comments, or quotes collected in person work well)
- [ ] Replace `[Jina la Mteja]` / `[Tawi / Mji]` with real names and branches
      (or keep last-name-only / first-name-only if customers didn't consent
      to full names being published)

**matawi.html + wasiliana.html → 6 branches still missing real data**
Mafiat, Soweto, Ilembo, Manyoni, Kahama, Buza currently show a dashed
"Taarifa Zinahitajika" (Info needed) card instead of a real address. For each:
- [ ] Real street/area name
- [ ] Real Google Maps place_id — open the location in Google Maps, tap
      Share, copy the link; the place_id is embedded in that URL
- [ ] Direct phone number if the branch has one (otherwise it's fine to
      leave routing through the HQ number, as it does now)

**index.html hero stat**
- [ ] The hero currently says "10 Matawi Tanzania" but matawi.html lists 11
      station cards (5 confirmed + 6 pending info) plus the Dar HQ. Confirm
      the real number of branches that are actually open and update it.

## 2. Bug I fixed — worth knowing about

The 6 branches above (Mafiat, Soweto, Ilembo, Manyoni, Kahama, Buza) were
previously all copy-pasted with **Saza's exact place_id**, so their "Fungua
Ramani" buttons silently sent customers to Saza's location regardless of
which branch they'd clicked. I replaced those with a Maps *search* link
(searches by branch name instead of pointing at a wrong pin) and flagged the
cards visually until you add the real coordinates. Once you have each real
place_id, swap it in following the pattern used for Mbeya/Rungwa/Songwe/etc.
in matawi.html.

## 3. Domain / hosting

- [ ] `assets/css/style.css` head block references `infinityoiltz.co.tz` as
      a placeholder canonical/Open Graph domain in every page's `<head>` —
      find-and-replace this with your real domain once you have it.
- [ ] Same for `og:image` / favicon references — currently point at
      `infinitylogo.png` at the site root, so as long as that file ships
      alongside the HTML files (as it already does on your current site)
      this works with no changes.

## 4. What changed technically

- **One shared stylesheet** (`assets/css/style.css`) instead of the same
  369-line `<style>` block copy-pasted into all 7 pages (was ~2,580 lines of
  duplicated CSS total; now one file the browser caches once).
- **One shared script** (`assets/js/main.js`) for the header, mobile nav,
  and scroll-reveal animation, used on every page. Page-specific features
  (anthem player, gallery lightbox, contact-form success banner, homepage
  intro) live in their own small files so a page that doesn't need them
  doesn't load them.
- **Active nav link is now automatic** — `main.js` detects the current page
  and highlights it, instead of a hand-set `class="active"` on every file
  (one less thing to get wrong if a page ever gets copied/renamed).
- **New sections**: trust bar, licensing/compliance cards, history timeline,
  testimonials, homepage services preview, a closing CTA on Huduma, and a
  branch-overview map on Matawi.
- **New interactions**: WhatsApp click-to-chat button (every page), gallery
  lightbox (Picha), homepage brand intro using `infinity_animation.mp4`
  (plays once per browser session, skips itself if the visitor has reduce-
  motion on, has a visible Skip button).
- **SEO**: added a GasStation schema.org JSON-LD block on the homepage,
  Open Graph/Twitter card tags, and a canonical link on every page.
- `infinity_oil_logo_intro.html` (the old 251KB standalone intro page with
  a base64-embedded video) is superseded by the homepage intro above, which
  uses the real `.mp4` file instead — you can retire that old file.

## 5. File structure

```
index.html, kuhusu.html, huduma.html, matawi.html,
picha.html, wasiliana.html, wimbo.html
assets/
  css/style.css
  js/main.js, intro.js, lightbox.js, anthem-player.js, contact-form.js
  video/infinity_animation.mp4
```

Your existing `infinitylogo.png`, the `images/` folder (gallery photos), and
`infinity-anthem.mp3` aren't included here since they weren't part of this
upload — copy them into the same folder as before (same relative paths, so
nothing needs to change in the HTML).
