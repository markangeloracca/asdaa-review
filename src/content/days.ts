import type { Day } from "@/lib/types";

export const DAYS: Day[] = [
  {
    day: 1,
    title: "Keeping Code Healthy",
    theme: "Refactoring & Technical Debt",
    minutes: 75,
    lessons: ["L9", "L10"],
    warmupIntro:
      "**Pre-test: guess before you learn.** You haven't reviewed yet, so getting answers wrong is expected and fine. Research shows that trying to answer *before* studying makes the later lesson stick better (the \"pretesting effect\"). Take a guess.",
    warmup: [
      { id: "d1w1", topic: "L9", type: "tf", q: "Refactoring changes what the software does for the user.", answer: false, explain: "Refactoring changes internal structure while keeping external behavior the same. You'll see this again in a moment." },
      { id: "d1w2", topic: "L10", type: "mcq", q: "Taking a shortcut now that creates extra work later is called…", options: ["Code coverage", "Technical debt", "Regression", "Load testing"], answer: 1, explain: "That's technical debt: extra future work caused by short-term compromises." },
      { id: "d1w3", topic: "L9", type: "mcq", q: "A \"code smell\" is best described as…", options: ["A compiler error", "An indicator of a potential problem", "A security breach", "A failing test"], answer: 1, explain: "Smells are indicators of potential issues. They are not bugs." },
    ],
    bridge: [
      { kind: "callout", title: "Connect the dots: Refactoring ⇄ Technical Debt", text: "These two lectures are **two sides of one coin**. Technical debt is the **problem** (accumulated cost of shortcuts). Refactoring is a main way to **pay it back**. Code smells are the **symptoms** that tell you where the debt is." },
      { kind: "table", title: "Smell → Debt type → Refactoring fix", head: ["You notice…", "Debt type", "Refactoring level / fix"], rows: [
        ["Duplicated tax logic", "Code debt (duplication, quick fixes)", "Class: extract a shared TaxCalculator"],
        ["300-line processOrder()", "Code debt", "Routine: Extract Method"],
        ["Magic number 2000", "Code debt", "Data: Replace Magic Number"],
        ["Monolith can't scale", "Design debt (lack of foresight)", "System: Architecture change"],
        ["No automated tests in pipeline", "Test debt (no automation)", "System: CI/CD implementation"],
        ["10-year-old DB server", "Infrastructure debt (missed upgrades)", "System: Data / legacy migration"],
      ] },
      { kind: "connect", text: "**Elaborate:** Why do code smells count as \"management issues\" (L9), and why is \"wrong prioritization\" a root of debt (L10)? Both say the same thing. **Code gets messy because of decisions about time and priorities, not only because of skill.**" },
    ],
    exitTicket: [
      { id: "d1e1", topic: "L9", type: "mcq", q: "\"Extract abstract interface\" is a refactoring at which level?", options: ["Data", "Routine", "Class", "System"], answer: 2, explain: "Class level: split/combine classes, extract abstract interface, restrict access, change hierarchy, design patterns." },
      { id: "d1e2", topic: "L10", type: "mcq", q: "A team has tests, but ONLY manual UI tests and no unit tests. Which debt?", options: ["Design debt", "Test debt", "Infrastructure debt", "No debt: tests exist"], answer: 1, explain: "Relying on one type of testing and having no unit tests are both test debt." },
      { id: "d1e3", topic: "L10", type: "mcq", q: "Which checkpoint is described as spontaneous, non-structured, and NOT thorough?", options: ["Technical inspection", "Code walkthrough", "Informal review", "Pair programming"], answer: 2, explain: "Informal review: ad-hoc, no guidelines; catches layout/style and common errors; not thorough." },
      { id: "d1e4", topic: "L9", type: "multi", q: "Which are FLEXIBILITY refactorings? (Select all)", options: ["Improving interfaces", "Removing dead code", "Improving APIs", "Changing architecture", "Removing magic constants"], answer: [0, 2, 3], explain: "Flexibility: interfaces, APIs, architecture. Dead code = understandability; magic constants = readability." },
      { id: "d1e5", topic: "L10", type: "tf", q: "Decreased team morale is one of the listed costs of technical debt.", answer: true, explain: "The five costs: increased testing costs, delayed releases, reduced productivity, innovation challenges, decreased team morale." },
    ],
    preview: "Tomorrow: **Software Quality & Testing**. Tonight, before sleep, try to recall the 5 refactoring levels and the 4 debt types without looking. Sleep strengthens what you retrieve.",
  },
  {
    day: 2,
    title: "Proving It Works",
    theme: "Software Quality & Software Testing",
    minutes: 90,
    lessons: ["L11", "L12"],
    warmupIntro:
      "**Spaced retrieval of Day 1.** It's been about a day, which is enough time for some forgetting. That is exactly what makes recalling it now so effective. Answer from memory first.",
    warmup: [
      { id: "d2w1", topic: "L9", type: "mcq", q: "Smallest to largest, the five refactoring levels are…", options: ["Data, Statement, Routine, Class, System", "Statement, Data, Class, Routine, System", "Data, Routine, Statement, Class, System", "Class, Data, Statement, Routine, System"], answer: 0, explain: "Don't Stop Refactoring Code, Silly: Data → Statement → Routine → Class → System." },
      { id: "d2w2", topic: "L10", type: "mcq", q: "\"Lack of patterns\" and \"ownership\" are keywords of…", options: ["Design debt", "Code debt", "Test debt", "Infrastructure debt"], answer: 1, explain: "Code debt: quick fixes, lack of patterns, ownership." },
      { id: "d2w3", topic: "L10", type: "mcq", q: "Which checkpoint involves two programmers at one workstation?", options: ["Walkthrough", "Inspection", "Pair programming", "Informal review"], answer: 2, explain: "Pair programming: one writes, one reviews as it's written." },
      { id: "d2w4", topic: "L9", type: "tf", q: "Removing dead or unused code improves understandability.", answer: true, explain: "Understandability: reorganize class hierarchy, remove dead/unused code, fix design." },
    ],
    bridge: [
      { kind: "callout", title: "Connect the dots: Quality ⇄ Testing", text: "Lecture 11 gives the **map** (what quality is, box techniques, levels, manual vs. automated). Lecture 12 gives the **tools** (test types, unit-case design, system-testing techniques). Testing is how we **gather evidence** about quality." },
      { kind: "table", title: "Two different axes: don't mix them up!", head: ["Axis", "Options", "Question it answers"], rows: [
        ["Knowledge (L11)", "Black · White · Grey box", "How much of the inside can the tester see?"],
        ["Level (L11)", "Unit · Integration · System · Acceptance · Regression", "How big is the piece being tested?"],
        ["Approach (L11)", "Manual · Automated", "Who or what executes it?"],
        ["Type (L12)", "Functional, performance, load, stress, smoke, security, localization, A/B, beta, usability, accessibility, fairness", "What quality attribute is checked?"],
        ["System technique (L12)", "Ad-hoc · Scripted · Exploratory", "How much planning and documentation?"],
      ] },
      { kind: "connect", text: "**Interleave:** A *scripted* (technique), *automated* (approach), *black-box* (knowledge) *regression* (level) *functional* (type) test is a perfectly valid description. Each word answers a different axis. Exam writers love to test whether you can separate them." },
      { kind: "connect", text: "**Back to Day 1:** test **debt** (L10) = no unit tests, no quality culture, no automation. **Regression testing** is the safety net that makes **refactoring** (L9) safe, because it proves external behavior didn't change." },
    ],
    exitTicket: [
      { id: "d2e1", topic: "L11", type: "mcq", q: "Which testing level is conducted by developers and focuses on inputs, outputs, and internal logic?", options: ["Unit", "System", "Acceptance", "Integration"], answer: 0, explain: "Unit testing: individual components, by developers." },
      { id: "d2e2", topic: "L12", type: "mcq", q: "Which test type checks a system for bias and discrimination?", options: ["Accessibility", "Usability", "Fairness", "Localization"], answer: 2, explain: "Fairness = bias and discrimination." },
      { id: "d2e3", topic: "L12", type: "mcq", q: "\"Explore the checkout using expired credit cards to identify error-handling gaps.\" This sentence is a(n)…", options: ["Test case", "Exploratory charter", "Basic flow", "Precondition"], answer: 1, explain: "Charter template: Explore <target> using <resource> to <identify/check/learn>." },
      { id: "d2e4", topic: "L11", type: "mcq", q: "Testing that has access to the source code to make sure all paths and conditions are exercised is…", options: ["Black box", "Grey box", "White box", "Beta"], answer: 2, explain: "White (glass/structural) box: source code, paths, conditions, coverage." },
      { id: "d2e5", topic: "L12", type: "multi", q: "Which are SCRIPTED testing characteristics? (Select all)", options: ["Tests written before", "Tests are steps", "Live documentation", "Tests are repetitive", "Improvised"], answer: [0, 1, 3], explain: "Scripted: written before, steps, repetitive, no deviation." },
    ],
    preview: "Tomorrow: **Agile & Security**. Before bed, try the Feynman prompt again without notes: *Explain black, white, and grey box testing to a friend.*",
  },
  {
    day: 3,
    title: "Building the Right Way",
    theme: "Agile & Architecting for Security",
    minutes: 80,
    lessons: ["L13", "L14"],
    warmupIntro:
      "**Mixed spaced retrieval of Days 1 & 2.** The questions are interleaved on purpose. Mixing topics makes you work out *which* idea applies, and that is exactly the skill exams test.",
    warmup: [
      { id: "d3w1", topic: "L12", type: "mcq", q: "Ad-hoc testing is characterized as…", options: ["Scripted and repeatable", "Informal, cost-effective, improvised, non-reproducible", "Guided by a charter", "Automated"], answer: 1, explain: "Ad-hoc = informal, cost-effective, improvised, non-reproducible." },
      { id: "d3w2", topic: "L10", type: "mcq", q: "\"Unpreparedness\" and \"missed upgrades\" belong to…", options: ["Infrastructure debt", "Code debt", "Design debt", "Test debt"], answer: 0, explain: "Infrastructure debt: outdated infrastructure, unpreparedness, missed upgrades." },
      { id: "d3w3", topic: "L11", type: "mcq", q: "Grey box testers typically have access to…", options: ["Nothing but the UI", "Full source code", "High-level design docs, APIs, or DB schemas", "Only production logs"], answer: 2, explain: "Grey box: limited knowledge, such as design docs, APIs, schemas." },
      { id: "d3w4", topic: "L9", type: "mcq", q: "\"Decompose expressions\" is a refactoring at which level?", options: ["Data", "Statement", "Routine", "System"], answer: 1, explain: "Statement level: extract command, remove fragments, split statements, decompose expressions." },
      { id: "d3w5", topic: "L12", type: "mcq", q: "Testing a login password at the minimum allowed length is a…", options: ["Common case", "Error case", "Boundary case", "Smoke test"], answer: 2, explain: "Minimum allowed length = boundary case." },
    ],
    bridge: [
      { kind: "callout", title: "Connect the dots: the whole course in one story", text: "**Agile** (L13) delivers in small, fast increments. Speed tempts shortcuts, which create **technical debt** (L10). We pay it back with **refactoring** (L9). We prove nothing broke with **testing** (L11–12), and that's how we reach **quality**. All of it must be **secure by design** (L14), with security checks inside the same CI/CD pipeline (**DevSecOps**)." },
      { kind: "table", title: "Cross-lecture links worth memorizing", head: ["Idea", "Appears in…"], rows: [
        ["CI/CD", "L9 system-level refactoring · L11 DevSecOps era (2010–2018) · L14 DevSecOps practice"],
        ["Security", "L9 'security enhancements' (system refactoring) · L12 security testing · L14 entire lecture"],
        ["Collaboration", "L10 pair programming/reviews · L11 collaborative quality · L13 Agile values (individuals & interactions, customer collaboration)"],
        ["Iterative & incremental", "L11 Agile testing era · L13 delivery model · L12 exploratory testing is 'iterative and adaptive'"],
        ["Documentation trade-off", "L13 waterfall 'efficient documentation' vs. Agile 'docs hard to maintain' · L12 scripted vs. exploratory 'live documentation'"],
        ["Poor design", "L10 root of debt · L14 human threat example"],
      ] },
      { kind: "connect", text: "**Elaborate:** Why might Agile's con \"documentation hard to maintain\" create **design debt** (\"undocumented decisions\")? Answering this kind of *why* question links two memories together, so remembering one helps you recall the other." },
    ],
    exitTicket: [
      { id: "d3e1", topic: "L13", type: "mcq", q: "\"Working software over ___\"", options: ["Processes and tools", "Comprehensive documentation", "Following a plan", "Contract negotiation"], answer: 1, explain: "Working software over comprehensive documentation." },
      { id: "d3e2", topic: "L14", type: "mcq", q: "Embedding automated security scans into the CI/CD pipeline is…", options: ["Zero-Trust", "DevSecOps", "Defense-in-Depth", "Secure-by-Design"], answer: 1, explain: "DevSecOps embeds security checks throughout the CI/CD pipeline." },
      { id: "d3e3", topic: "L14", type: "mcq", q: "Least privilege, safe defaults, and input validation are principles of…", options: ["Secure-by-Design", "DevSecOps", "Zero-Trust", "Availability"], answer: 0, explain: "Secure-by-Design builds those principles into the architecture." },
      { id: "d3e4", topic: "L13", type: "mcq", q: "\"Dependency on client availability\" is a con of…", options: ["Waterfall", "Agile", "Kanban only", "Technical inspection"], answer: 1, explain: "Agile cons: lack of predictability, dependency on client availability, documentation hard to maintain." },
      { id: "d3e5", topic: "L14", type: "multi", q: "Which are NEW & EMERGING threats from the lecture? (Select all)", options: ["Prompt injection", "Blizzard", "Data poisoning", "Deepfakes", "Insider threats"], answer: [0, 2, 3], explain: "Emerging: prompt injection, data poisoning, deepfakes." },
    ],
    preview: "Review complete! Starting tomorrow: **2 mock exams per day for 3 days**. The gaps between days are deliberate. That's spaced repetition. Don't cram them all at once.",
  },
];
