# Answers to Abhishek's Questions

## 1. Sequential/Conditional Forms?

**Yes!** Each step changes based on previous answers:

**Step 1: Denial Type**
- If "Medical" → go to Step 2
- If "Technical" → show "Different Path Forward" message (reassurance, not reconsideration)

**Step 2: 60-Day Window**
- If "Yes" → normal flow
- If "No/Not Sure" → inject warning message into Step 3

**Step 3: Age**
- If "Yes, 50+" → show contact form
- If "No, under 50" → show age notice but still offer form

See current HTML for exact JavaScript logic (functions: `chooseDenialType()`, `choose60Day()`, `chooseAge()`)

---

## 2. Qualification Logic?

**Yes, simple filtering:**

| Answer | Outcome |
|--------|---------|
| Technical denial | Offer new application path (not reconsideration) |
| Outside 60-day window | Show warning but still capture |
| Under 50 | Show notice but still capture |
| 50+ with medical denial in 60 days | Prime lead — high priority |

**Goal:** Capture all leads, tag with qualification status for routing.

---

## 3. Where to Post Data?

**Currently:** Phonexa (existing system)

**Fields to send:**
- first_name
- phone  
- state
- denial_type (medical/technical)
- within_60_days (yes/no/not_sure)
- age_50_plus (yes/no)
- source / utm_campaign
- landing_page (LP1 or LP2)

**Next step:** Confirm with Amy/team — is Phonexa still the target, or are we moving to a new CRM?

---

*Let me know if Abhishek needs more detail!*
