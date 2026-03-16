const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3338;
const LP_DIR = path.resolve(__dirname, '../../data/lp13');

// Serve static assets (CSS, images, etc.) from the lp13 directory — but NOT index.html
app.use(express.static(LP_DIR, { index: false }));

// Index page — landing page review hub
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CD Landing Page Review — March 2026</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f4f7fb;
      color: #1a1a2e;
      min-height: 100vh;
    }

    header {
      background: #0066CC;
      color: #fff;
      padding: 36px 40px 28px;
      border-bottom: 4px solid #004fa3;
    }

    header h1 {
      font-size: 1.9rem;
      font-weight: 700;
      letter-spacing: -0.3px;
      margin-bottom: 8px;
    }

    header p.subtitle {
      font-size: 0.95rem;
      opacity: 0.88;
      font-family: 'Courier New', monospace;
      background: rgba(0,0,0,0.18);
      display: inline-block;
      padding: 5px 12px;
      border-radius: 4px;
    }

    main {
      max-width: 860px;
      margin: 48px auto;
      padding: 0 24px;
    }

    .section-label {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #0066CC;
      margin-bottom: 16px;
    }

    .cards {
      display: flex;
      flex-direction: column;
      gap: 18px;
      margin-bottom: 40px;
    }

    .card {
      background: #fff;
      border: 1px solid #dce6f0;
      border-radius: 10px;
      padding: 24px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      box-shadow: 0 2px 8px rgba(0,102,204,0.06);
      transition: box-shadow 0.15s;
    }

    .card:hover {
      box-shadow: 0 4px 18px rgba(0,102,204,0.13);
    }

    .card-badge {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      padding: 3px 9px;
      border-radius: 20px;
      margin-bottom: 8px;
      display: inline-block;
    }

    .badge-current  { background: #e8f0fe; color: #0050a0; }
    .badge-new      { background: #e6f9f0; color: #157a4f; }

    .card-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #0c1a30;
      margin-bottom: 5px;
    }

    .card-desc {
      font-size: 0.88rem;
      color: #566680;
      line-height: 1.5;
    }

    .card-action {
      flex-shrink: 0;
    }

    .btn {
      display: inline-block;
      background: #0066CC;
      color: #fff;
      text-decoration: none;
      padding: 11px 22px;
      border-radius: 7px;
      font-size: 0.88rem;
      font-weight: 600;
      white-space: nowrap;
      transition: background 0.15s;
    }

    .btn:hover { background: #004fa3; }

    .btn-outline {
      background: transparent;
      border: 2px solid #0066CC;
      color: #0066CC;
    }

    .btn-outline:hover { background: #e8f0fe; }

    .feedback-note {
      background: #fffbea;
      border: 1px solid #f0d060;
      border-left: 4px solid #e6b800;
      border-radius: 8px;
      padding: 16px 20px;
      font-size: 0.87rem;
      color: #5a4a00;
      line-height: 1.6;
    }

    .feedback-note strong { color: #3d3200; }

    footer {
      text-align: center;
      padding: 32px;
      font-size: 0.78rem;
      color: #9aabbc;
    }
  </style>
</head>
<body>

<header>
  <h1>CD Landing Page Review — March 2026</h1>
  <p class="subtitle">Share this link with Amy for feedback. Access via Tailscale: http://100.112.248.35:3338</p>
</header>

<main>
  <p class="section-label">Pages Under Review</p>

  <div class="cards">

    <div class="card">
      <div class="card-info">
        <span class="card-badge badge-current">Current</span>
        <div class="card-title">LP13 (Current)</div>
        <div class="card-desc">Existing production landing page. Review for compliance issues and baseline.</div>
      </div>
      <div class="card-action">
        <a href="/lp13" class="btn btn-outline" target="_blank">Open LP13</a>
      </div>
    </div>

    <div class="card">
      <div class="card-info">
        <span class="card-badge badge-new">New</span>
        <div class="card-title">LP1: Reconsideration</div>
        <div class="card-desc">New page targeting denied-at-initial applicants.</div>
      </div>
      <div class="card-action">
        <a href="/lp1" class="btn" target="_blank">Open LP1</a>
      </div>
    </div>

    <div class="card">
      <div class="card-info">
        <span class="card-badge badge-new">New</span>
        <div class="card-title">LP2: ALJ Hearing</div>
        <div class="card-desc">New page targeting denied-at-reconsideration applicants.</div>
      </div>
      <div class="card-action">
        <a href="/lp2" class="btn" target="_blank">Open LP2</a>
      </div>
    </div>

  </div>

  <div class="feedback-note">
    <strong>Feedback:</strong> For feedback, use the Replit workflow Abhishek demonstrated — or annotate directly and send notes to Alex.
  </div>
</main>

<footer>Citizens Disability &mdash; Internal Review Only &mdash; Not for public distribution</footer>

</body>
</html>`);
});

// Route helpers — serve specific HTML files from LP_DIR
function serveFile(filename) {
  return (req, res) => {
    const filePath = path.join(LP_DIR, filename);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send(`
        <html><body style="font-family:sans-serif;padding:40px;color:#555">
          <h2 style="color:#cc3300">⚠ File not found: ${filename}</h2>
          <p>This page hasn't been created yet. Check back shortly — it's being built now.</p>
          <p><a href="/" style="color:#0066CC">← Back to review hub</a></p>
        </body></html>
      `);
    }
  };
}

app.get('/lp13', serveFile('index.html'));
app.get('/lp1',  serveFile('lp1-reconsideration.html'));
app.get('/lp2',  serveFile('lp2-hearing.html'));

app.get('/ad-copy-review', (req, res) => {
  res.sendFile(path.join(__dirname, 'ad-copy-review.html'));
});

app.listen(PORT, () => {
  console.log(`✅ LP Review Server running at http://localhost:${PORT}`);
  console.log(`   Tailscale: http://100.112.248.35:${PORT}`);
  console.log(`   Serving files from: ${LP_DIR}`);
});

// Feedback submission endpoint
const feedbackPath = path.join(__dirname, 'feedback.json');
app.use(require('express').json());
app.post('/submit-feedback', (req, res) => {
  const entry = { timestamp: new Date().toISOString(), feedback: req.body };
  let all = [];
  if (fs.existsSync(feedbackPath)) {
    try { all = JSON.parse(fs.readFileSync(feedbackPath)); } catch(e) {}
  }
  all.push(entry);
  fs.writeFileSync(feedbackPath, JSON.stringify(all, null, 2));
  console.log('Feedback received:', JSON.stringify(entry, null, 2));
  res.json({ ok: true });
});

app.get('/feedback', (req, res) => {
  if (fs.existsSync(feedbackPath)) {
    res.sendFile(feedbackPath);
  } else {
    res.json([]);
  }
});
