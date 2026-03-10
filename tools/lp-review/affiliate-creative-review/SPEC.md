# Affiliate Creative Review System - Specification

## Project Overview
- **Project Name:** Affiliate Creative Review System
- **Type:** Web Application (MVP)
- **Core Functionality:** Real-time creative submission, AI-powered compliance checking, and auto-generated revised versions for SSDI lead generation affiliates
- **Target Users:** Affiliates submitting ad creatives, Citizens Disability marketing team reviewing submissions

---

## User Stories

### Affiliate User
1. Upload image creative (JPG/PNG) with ad copy text
2. Receive instant compliance feedback (pass/fail with specific issues)
3. See AI-generated revised version (image + rewritten copy)
4. Download or resubmit modified creative

### CD Marketing Team
1. View dashboard of all submissions
2. Filter by status (pending, approved, rejected)
3. Review and approve/reject submissions
4. See AI suggestions for each submission

---

## UI/UX Specification

### Color Palette
- **Primary:** `#1E3A5F` (Deep Navy - trust, professionalism)
- **Secondary:** `#2ECC71` (Emerald Green - approval/success)
- **Accent:** `#E74C3C` (Coral Red - rejection/warning)
- **Background:** `#F8FAFC` (Light Gray)
- **Card Background:** `#FFFFFF` (White)
- **Text Primary:** `#1A1A2E` (Near Black)
- **Text Secondary:** `#64748B` (Slate Gray)

### Typography
- **Font Family:** "DM Sans" (headings), "Inter" (body)
- **Headings:** 28px (h1), 22px (h2), 18px (h3)
- **Body:** 15px
- **Small:** 13px

### Layout Structure
- **Header:** Fixed top nav with logo + role switcher (Affiliate/Admin)
- **Main Content:** Centered container, max-width 1200px
- **Cards:** Rounded corners (12px), subtle shadow, 24px padding
- **Grid:** Responsive, 1 col mobile, 2 col tablet, 3 col desktop

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Functionality Specification

### Core Features

#### 1. Creative Upload (Affiliate)
- Drag-and-drop or click to upload image (JPG, PNG, max 10MB)
- Text input fields: Headline (100 char max), Body Copy (300 char max)
- Optional: Ad type selector (Facebook, Google, Display)
- Submit button triggers compliance check

#### 2. Compliance Engine (Automated)
**Hard Fails (Immediate Rejection):**
- Contains "qualify", "eligible", "approval", "approved" (case insensitive)
- Age mentioned but not 50+
- Fear tactics: "you might lose", "如果不", "deadline", "urgent", "last chance"
- Promise of guaranteed approval/outcome
- Misrepresentation of SSDI program

**Soft Warnings (Flag for Review):**
- Missing CTA
- Image quality concerns (detected via AI)
- Very long or short copy

**Pass Criteria:**
- Age 50+ mentioned correctly (or no age mentioned)
- No forbidden words
- Has clear CTA
- Professional tone

#### 3. AI Feedback System
- Detailed breakdown of each issue found
- Suggestion for each fix
- Confidence score on compliance

#### 4. AI-Generated Revision (Bonus)
- Rewrite copy to fix compliance issues
- Generate modified image prompt (for manual DALL-E use)
- Show "revised version" with fixes applied

#### 5. Admin Dashboard
- Table view of all submissions
- Status badges: Pending (yellow), Approved (green), Rejected (red)
- Filter by date, status, affiliate
- Click to view full details

### Data Model

```json
{
  "id": "uuid",
  "affiliateName": "string",
  "adType": "facebook|google|display",
  "imageData": "base64",
  "headline": "string",
  "bodyCopy": "string",
  "status": "pending|approved|rejected",
  "complianceResult": {
    "passed": boolean,
    "issues": [{ "type": "hard|soft", "message": "string", "suggestion": "string" }],
    "score": 0-100
  },
  "revisedCopy": "string",
  "imagePrompt": "string",
  "createdAt": "timestamp",
  "reviewedBy": "string|null",
  "reviewedAt": "timestamp|null"
}
```

---

## Technical Implementation

### Stack
- **Frontend:** Single HTML file with vanilla JS + Tailwind CSS (CDN)
- **Storage:** LocalStorage (MVP - no backend)
- **AI Integration:** 
  - Compliance: Built-in rule engine
  - Copy rewrite: agency-copywriter skill (Jordan)
  - Image prompts: Visual design expertise

### File Structure
```
~/.openclaw/workspace/tools/affiliate-creative-review/
├── SPEC.md
├── index.html (main application)
├── app.js (frontend logic)
├── compliance.js (rule engine)
└── data.json (localStorage backup)
```

---

## Acceptance Criteria

1. ✅ Affiliate can upload image + copy and see compliance result instantly
2. ✅ Hard fails are clearly identified with specific words found
3. ✅ Revised copy is generated automatically
4. ✅ Admin dashboard shows all submissions with filtering
5. ✅ Data persists in localStorage across page refreshes
6. ✅ Mobile-responsive design works on phone screens
7. ✅ Professional, clean UI matching CD brand standards

---

## CD Brand Guidelines (Compliance Rules)

### Forbidden Terms
- qualify, eligible, approval, approved, guarantee, assured
- Age < 50 (e.g., "age 45", "40 and older" - must be 50+)
- Fear tactics: "you might lose", "最后机会", "urgent", "act now or else"

### Required Elements
- Clear CTA (call now, click here, learn more, get started)
- Professional, empathetic tone
- No misleading claims about SSDI process
