# Citizens Disability — Landing Pages

## Pages
- `index.html` — LP13 (current production baseline)
- `lp1-reconsideration.html` — LP1: Reconsideration stage ("You Were Denied. That Doesn't Mean It's Over.")
- `lp2-hearing.html` — LP2: ALJ Hearing stage ("Facing an SSDI Hearing? You Don't Have to Go Alone.")

## Assets
All images, fonts, and CSS assets load from `https://lp13.citizensdisability.com/assets/`. No asset hosting required in this repo.

## Backend Integration Required (Abhishek)
Before go-live, the following needs to be wired up in LP1 and LP2:

1. **Phonexa form POST** — replace the stubbed `sendAnswerToBackend()` function with a real POST to Phonexa LMS endpoint. LP1 and LP2 need separate campaign IDs.
2. **Hidden UTM fields** — add `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` as hidden fields populated from URL params on page load.
3. **GA4 tag** — embed GA4 Measurement ID (to be provided by Mike) in `<head>`.
4. **Google Ads conversion tag** — embed after GA4 tag.
5. **Meta Pixel** — embed in `<head>` and add `fbq('track', 'Lead')` on form submit.
6. **Thank-you page** — confirm LP1/LP2 should redirect to existing `thank-you-success.html` or create stage-specific versions.

## Notes
- LP1 and LP2 always start at the intro hero screen (not the quiz questions directly)
- TCPA consent block is in `finalFields` question — copy verbatim, do not modify
- Compliance: no "qualify", "eligible", "see if you qualify" anywhere in copy
