# ENSF 607 Review: 3-Day Reviewer + 6 Mock Exams

A small Next.js 15 + Supabase + Tailwind CSS v4 study app covering **Lectures 9–14**: Refactoring, Technical Debt, Software Quality, Software Testing, Agile, and Architecting for Security. The layout is tuned for the **11″ iPad Pro** in both orientations. Landscape shows a sidebar; portrait shows bottom tabs and a step outline drawer. It also works on phones and laptops.

## What's inside

| | |
|---|---|
| **Days 1–3: Guided review** | 25 short lesson sections, 18 diagrams rebuilt from the slides, 34 quick checks, analogies, memory hooks, exam-trap callouts, Feynman prompts, per-lecture takeaways, a "connect the dots" step, a flashcard round and an exit ticket each day. |
| **Days 4–6: Mock exams** | 6 exams × 24 questions (144 total). Each exam has 4 questions per lecture. Questions are MCQ, True/False and select-all. Difficulty goes up: recall → application → analysis/final simulation. You take 2 exams per day. |
| **Retakes** | Retake any exam as often as you like. Question and option order are reshuffled on every attempt. You can also retake only the questions you missed. Every attempt is kept with its score, time, per-lecture breakdown and a full answer review. |
| **Flashcards** | 80 cards in Leitner boxes (1 → 2 → 4 → 7 day spacing), filterable by lecture. |
| **Learning techniques** | Retrieval practice, spaced repetition, interleaving, pretesting, elaboration, dual coding, concrete examples, mnemonics, the Feynman technique, and chunking. |
| **Sync** | Works offline in local-only mode with no setup. Add Supabase to sync between iPad, laptop and phone using an email magic link or a 6-digit code. Row Level Security keeps your rows private. |

`COVERAGE.md` maps every slide to where it is taught.

---

## Deploy to Vercel (about 10 minutes)

### 1. Supabase (optional but recommended, for cross-device sync)
1. Create a free project at <https://supabase.com>.
2. Go to **SQL Editor → New query**, paste `supabase/schema.sql`, and click **Run**.
3. Go to **Authentication → URL Configuration**:
   - **Site URL**: `https://YOUR-APP.vercel.app` (you can fill this in after step 2 below)
   - **Redirect URLs**: add `https://YOUR-APP.vercel.app/**` (and `http://localhost:3000/**` for local dev)
4. *(Recommended for iPad home-screen use)* Go to **Authentication → Emails → Magic Link** and add `Your code: {{ .Token }}` to the template. That way you can type the 6-digit code instead of opening the link.
5. Go to **Project Settings → API** and copy the **Project URL** and the **anon / publishable key**.

### 2. Vercel
1. Unzip this project and push it to a new GitHub repo:
   ```bash
   cd ensf607-review
   git init && git add . && git commit -m "ENSF 607 review app"
   git branch -M main
   git remote add origin https://github.com/YOU/ensf607-review.git
   git push -u origin main
   ```
2. On <https://vercel.com/new>, import the repo. The framework is auto-detected as Next.js.
3. Add **Environment Variables** (skip these for local-only mode):
   - `NEXT_PUBLIC_SUPABASE_URL` = your Project URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = your publishable (or anon) key
   - Or connect the **Supabase integration** in Vercel, which sets `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. `next.config.mjs` maps either naming to the browser.
4. Click **Deploy**. Copy the URL into Supabase's Site URL and Redirect URLs (step 1.3).

*No GitHub?* Run `npm i -g vercel && vercel` from the project folder instead.

### 3. On your iPad
Open the URL in Safari, then tap **Share → Add to Home Screen**. It opens full-screen like an app. Sign in on **Sync & Settings** with the same email on each device.

> Tip: an app added to the home screen keeps its own storage, separate from Safari. When you sign in from it, type the 6-digit code from the email rather than tapping the link.

---

## Run locally
```bash
npm install
cp .env.example .env.local   # optional: add Supabase keys
npm run dev                  # http://localhost:3000
```

## Project layout
```
src/
  app/            routes: / (plan), /day/[1-3], /exams, /exams/[1-6], /flashcards, /account
  components/     AppShell, DayRunner, ExamRunner, QuizItem, FlashDeck, Blocks, Diagrams
  content/        l9.ts … l14.ts (lessons), days.ts (warm-ups, bridges, exit tickets), exams.ts
  lib/            store.tsx (local + Supabase sync), schedule.ts, types.ts, utils.ts
supabase/schema.sql
```
To edit or add questions, change `src/content/exams.ts`. Each question is one line using the `m()` (multiple choice), `t()` (true/false) or `s()` (select-all) helper.
