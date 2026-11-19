import type { Lesson } from "@/lib/types";

const L10: Lesson = {
  id: "L10",
  number: 10,
  title: "Technical Debt",
  tagline: "Shortcuts today, interest tomorrow.",
  sections: [
    {
      id: "l10-what",
      title: "What is Technical Debt?",
      slides: "Lecture 10 · Slides 2–3",
      blocks: [
        {
          kind: "hook",
          title: "The credit-card story",
          text: "You buy a laptop on a credit card so you can have it **today**. That's useful. But if you don't pay it off, interest builds up and you end up paying far more. Software teams do the same thing with shortcuts in code. That is technical debt.",
        },
        {
          kind: "objectives",
          items: [
            "Define technical debt and explain where it comes from (its roots)",
            "Distinguish the four types: design, code, test, infrastructure",
            "Read the technical-debt curve and explain \"interest\"",
            "List the five costs of technical debt",
            "Compare four quality checkpoints: pair programming, informal review, walkthrough, inspection",
          ],
        },
        {
          kind: "concept",
          term: "Technical Debt",
          definition: "The accumulated cost of incomplete or suboptimal architectural and design decisions, coding practices, and implementation choices.",
          body: "**Key characteristic:** technical debt arises when development teams **prioritize rapid delivery over optimal, well-architected solutions.**",
        },
        {
          kind: "pillars",
          title: "How it typically shows up",
          items: [
            { k: "Deferred refactoring", v: "\"We'll clean it up later\", and later never comes." },
            { k: "Unclear prioritization", v: "Nobody decides when quality work gets done." },
            { k: "Quick fixes", v: "Patches that solve today's problem and create tomorrow's." },
          ],
        },
        {
          kind: "concept",
          term: "The \"Debt\" (Technical Debt Roots)",
          definition: "Extra work in the future due to suboptimal technical decisions made during development, which happens when developers take shortcuts or make compromises to achieve short-term goals, often at the expense of long-term quality and maintainability.",
        },
        {
          kind: "pillars",
          title: "Four roots of technical debt",
          items: [
            { k: "Wrong prioritization", v: "Speed is ranked above quality." },
            { k: "Poor design", v: "The structure can't handle future needs." },
            { k: "Lack of expertise", v: "The team doesn't know a better way." },
            { k: "No testing", v: "Problems go unnoticed and pile up." },
          ],
        },
        {
          kind: "mnemonic",
          title: "Roots: \"We Pay Later, Naturally\"",
          text: "**W**rong prioritization · **P**oor design · **L**ack of expertise · **N**o testing.",
        },
        {
          kind: "connect",
          text: "Lecture 9 link: **deferred refactoring** is a direct cause of debt. Code smells you never fix turn into debt that charges interest.",
        },
        {
          kind: "check",
          q: {
            id: "l10c1",
            topic: "L10",
            type: "mcq",
            q: "According to the lecture, the KEY characteristic of technical debt is that it arises when teams…",
            options: ["Use agile instead of waterfall", "Prioritize rapid delivery over optimal, well-architected solutions", "Write too many unit tests", "Refactor too frequently"],
            answer: 1,
            explain: "Technical debt arises when teams prioritize rapid delivery over optimal, well-architected solutions.",
          },
        },
      ],
    },
    {
      id: "l10-types",
      title: "Four Types of Technical Debt",
      slides: "Lecture 10 · Slides 4–7",
      blocks: [
        {
          kind: "table",
          title: "The four types at a glance",
          head: ["Type", "Definition", "Key characteristic", "Keywords"],
          rows: [
            ["Design debt", "The system's architecture is not scalable or adaptable to future requirements, leading to inefficiencies.", "Short-term design choices made without considering long-term scalability.", "Architecture choice · Undocumented decisions · Lack of foresight"],
            ["Code debt", "Messy, poorly written code that sacrifices quality for faster delivery.", "Poor coding practices, e.g., duplication or \"quick fixes\" to meet deadlines.", "Quick fixes · Lack of patterns · Ownership"],
            ["Test debt", "Tests are insufficient, outdated, or missing altogether.", "Skipping testing phases or relying on one type of testing.", "No unit tests · No quality culture · No automation"],
            ["Infrastructure debt", "Underlying systems (servers, databases) become outdated or insufficient to meet system demands.", "Neglecting to update infrastructure components over time.", "Outdated infrastructure · Unpreparedness · Missed upgrades"],
          ],
        },
        {
          kind: "mnemonic",
          title: "Types: \"Debt Collectors Take Interest\"",
          text: "**D**esign · **C**ode · **T**est · **I**nfrastructure. These go from the big picture (architecture), to the code, to the safety net (tests), to the ground underneath (servers and databases).",
        },
        {
          kind: "analogy",
          text: "Think of a restaurant. **Design debt** is a kitchen too small for a growing menu. **Code debt** is messy recipes nobody can follow. **Test debt** is nobody tasting the food before it goes out. **Infrastructure debt** is a 20-year-old oven that keeps breaking.",
        },
        {
          kind: "pitfall",
          text: "\"Relying on only ONE type of testing\" counts as **test debt** even if tests exist. \"Ownership\" problems are listed under **code debt**. \"Undocumented decisions\" are **design debt**.",
        },
        {
          kind: "check",
          q: {
            id: "l10c2",
            topic: "L10",
            type: "mcq",
            q: "A team's database server hasn't been upgraded in 8 years and now can't handle peak traffic. This is…",
            options: ["Code debt", "Test debt", "Infrastructure debt", "Design debt"],
            answer: 2,
            explain: "Outdated or insufficient underlying systems (servers, databases) are INFRASTRUCTURE debt, caused by missed upgrades.",
          },
        },
        {
          kind: "check",
          q: {
            id: "l10c3",
            topic: "L10",
            type: "mcq",
            q: "An architecture chosen without considering future scalability, with the reasons never written down, is mainly…",
            options: ["Design debt", "Code debt", "Infrastructure debt", "Test debt"],
            answer: 0,
            explain: "Design debt keywords: architecture choice, undocumented decisions, lack of foresight.",
          },
        },
      ],
    },
    {
      id: "l10-costs",
      title: "The Debt Curve & Its Costs",
      slides: "Lecture 10 · Slides 8–9",
      blocks: [
        { kind: "diagram", id: "debt-curve", caption: "As debt grows, the cost of maintenance moves further above the optimal level. That gap is the INTEREST." },
        {
          kind: "callout",
          title: "How to read the graph",
          text: "There are three lines. **Optimal maintenance** is the flat cost you'd pay with a clean system. **Maintenance** is what you actually pay, and it creeps upward. **Technical debt** grows even faster. The vertical gap between actual and optimal maintenance is the **interest**. That is the extra effort you pay every time you change debt-laden code.",
        },
        {
          kind: "pillars",
          title: "Five costs of technical debt",
          items: [
            { k: "Increased testing costs", v: "Fragile code needs more testing to change safely." },
            { k: "Delayed releases", v: "Every feature takes longer to ship." },
            { k: "Reduced productivity", v: "Developers spend time working around old problems." },
            { k: "Innovation challenges", v: "There's no room to build new things." },
            { k: "Decreased team morale", v: "Fighting messy code every day wears people down." },
          ],
        },
        {
          kind: "mnemonic",
          title: "Costs: \"Tired Developers Rarely Innovate — Depressing!\"",
          text: "**T**esting costs ↑ · **D**elayed releases · **R**educed productivity · **I**nnovation challenges · **D**ecreased morale.",
        },
        {
          kind: "check",
          q: {
            id: "l10c4",
            topic: "L10",
            type: "mcq",
            q: "On the technical debt graph, \"interest\" is best described as…",
            options: ["The total size of the codebase", "The gap between actual maintenance cost and optimal maintenance cost", "The number of bugs found in testing", "The cost of buying new servers"],
            answer: 1,
            explain: "Interest is the extra maintenance effort above the optimal level, caused by accumulated debt.",
          },
        },
      ],
    },
    {
      id: "l10-address",
      title: "Addressing Technical Debt: Quality Checkpoints",
      slides: "Lecture 10 · Slides 10–15",
      blocks: [
        {
          kind: "callout",
          title: "The big idea (Slide 10)",
          text: "Managing technical debt effectively requires a **balanced approach**. You **can't always eliminate** technical debt, but you **can manage it** and reduce its impact. **Key characteristic:** improving **quality checkpoints** is a strategy to manage technical debt.",
        },
        { kind: "diagram", id: "review-ladder", caption: "Four checkpoints, from least formal to most formal." },
        {
          kind: "concept",
          term: "Pair Programming",
          definition: "Two programmers work together at one workstation. One writes the code while the other reviews the code as it's written.",
          points: [
            "Uses the combined effort of two developers to produce higher-quality code",
            "Gives both people an equal chance to practice skills and share code ownership",
            "Catches bugs as they happen and lets the pair think ahead about the design",
          ],
        },
        {
          kind: "concept",
          term: "Informal Review",
          definition: "Developers review each other's code in a spontaneous, ad-hoc, non-structured process that does not follow specific guidelines.",
          points: [
            "Encourages collaboration, learning, and improvement within teams",
            "Finds defects in layout and style, plus common errors",
            "⚠ The code is **not thoroughly reviewed**. Only some checkpoints are looked at.",
          ],
        },
        {
          kind: "concept",
          term: "Code Walkthrough",
          definition: "Developers, architects, testers, or other stakeholders examine the code line by line or module by module and discuss logic, standards, and architecture.",
          points: [
            "Brings together multiple perspectives and expertise to improve the code",
            "Works best when there are quite a few reviewers with diverse backgrounds",
            "Acts as a demonstration before any integration",
          ],
        },
        {
          kind: "concept",
          term: "Technical Inspection",
          definition: "A systematic examination of software artifacts such as code, design documents, requirements specifications, or architecture.",
          points: [
            "Assesses quality, correctness, and adherence to standards",
            "Produces report records with the **location and severity** of the smells, errors, or defects found",
            "Is guided by **guidelines and a checklist**",
          ],
        },
        {
          kind: "pillars",
          title: "Why inspections work (Slide 15)",
          items: [
            { k: "Consistency in the review", v: "Everyone follows the same checklist." },
            { k: "Focus on several problems", v: "Many issue types are checked deliberately." },
            { k: "Helps less experienced reviewers", v: "The checklist guides newer reviewers." },
            { k: "Location & severity noted", v: "Findings are recorded and can be acted on." },
          ],
        },
        {
          kind: "mnemonic",
          title: "Informal → formal: \"PIWI\"",
          text: "**P**air programming → **I**nformal review → **W**alkthrough → **I**nspection. Formality, structure, and documentation increase from left to right.",
        },
        {
          kind: "table",
          title: "Compare the four checkpoints",
          head: ["Checkpoint", "Who", "Structure", "Signature feature"],
          rows: [
            ["Pair programming", "2 devs, 1 workstation", "Real-time", "Bugs caught as written; shared ownership"],
            ["Informal review", "Peer developers", "Ad-hoc, no guidelines", "Layout/style and common errors; not thorough"],
            ["Code walkthrough", "Devs, architects, testers, stakeholders", "Line by line / module by module", "Diverse perspectives; demo before integration"],
            ["Technical inspection", "Reviewers with checklist", "Systematic, guided by guidelines and checklist", "Records location & severity; any artifact"],
          ],
        },
        {
          kind: "connect",
          text: "Lecture 11 link: these checkpoints are forms of **collaborative quality**, where many people together catch each other's **blind spots**.",
        },
        {
          kind: "check",
          q: {
            id: "l10c5",
            topic: "L10",
            type: "mcq",
            q: "Which checkpoint records the LOCATION and SEVERITY of defects and is guided by a checklist?",
            options: ["Pair programming", "Informal review", "Code walkthrough", "Technical inspection"],
            answer: 3,
            explain: "Technical inspection is systematic, checklist-guided, and records location and severity.",
          },
        },
        {
          kind: "check",
          q: {
            id: "l10c6",
            topic: "L10",
            type: "tf",
            q: "The lecture states that technical debt should always be completely eliminated.",
            answer: false,
            explain: "You can't always eliminate technical debt, but you can MANAGE it and reduce its impact with a balanced approach.",
          },
        },
        {
          kind: "feynman",
          prompt: "Use the credit-card analogy to explain technical debt, its 'interest', and one way to manage it.",
          model: "Taking a shortcut in code is like buying on credit. You get something fast now, but you owe it later. The 'interest' is the extra effort every future change costs because of that messy code. It shows up as more testing, slower releases, and lower productivity and morale. You can't always pay it off completely, but you can manage it with quality checkpoints such as pair programming, reviews, walkthroughs, and inspections.",
        },
      ],
    },
  ],
  takeaways: [
    "Technical debt = accumulated cost of suboptimal decisions. It comes from prioritizing **rapid delivery** over well-architected solutions.",
    "Roots: wrong prioritization, poor design, lack of expertise, no testing.",
    "Four types: **Design, Code, Test, Infrastructure**. Each has its own three keywords.",
    "Interest = the gap between actual and optimal maintenance. Costs: testing ↑, delayed releases, productivity ↓, innovation challenges, morale ↓.",
    "You **manage** debt, not always eliminate it, by improving quality checkpoints: **P**air → **I**nformal → **W**alkthrough → **I**nspection.",
  ],
  flashcards: [
    { id: "f10-1", front: "Define technical debt + key characteristic", back: "The accumulated cost of incomplete/suboptimal architectural and design decisions, coding practices, and implementation choices. Arises when teams prioritize rapid delivery over optimal solutions." },
    { id: "f10-2", front: "3 keywords on the TD definition slide", back: "Deferred refactoring · Unclear prioritization · Quick fixes." },
    { id: "f10-3", front: "4 roots of technical debt", back: "Wrong prioritization · Poor design · Lack of expertise · No testing (We Pay Later, Naturally)." },
    { id: "f10-4", front: "Design debt (def + keywords)", back: "Architecture not scalable/adaptable to future requirements. Architecture choice · undocumented decisions · lack of foresight." },
    { id: "f10-5", front: "Code debt (def + keywords)", back: "Messy, poorly written code sacrificing quality for speed. Quick fixes · lack of patterns · ownership." },
    { id: "f10-6", front: "Test debt (def + keywords)", back: "Tests insufficient, outdated, or missing; skipping phases or relying on one test type. No unit tests · no quality culture · no automation." },
    { id: "f10-7", front: "Infrastructure debt (def + keywords)", back: "Servers/databases outdated or insufficient for demand. Outdated infrastructure · unpreparedness · missed upgrades." },
    { id: "f10-8", front: "5 costs of technical debt", back: "Increased testing costs · Delayed releases · Reduced productivity · Innovation challenges · Decreased team morale." },
    { id: "f10-9", front: "'Interest' on the TD graph", back: "The gap between actual maintenance cost and optimal maintenance cost." },
    { id: "f10-10", front: "Pair programming", back: "Two programmers, one workstation: one writes, one reviews as it's written. Higher quality, shared ownership, bugs caught as they happen." },
    { id: "f10-11", front: "Informal review", back: "Spontaneous, ad-hoc, non-structured peer review with no guidelines. Finds layout/style and common errors; NOT thorough." },
    { id: "f10-12", front: "Code walkthrough", back: "Devs, architects, testers, or stakeholders examine code line by line or module by module, discussing logic, standards, architecture. Diverse reviewers; demo before integration." },
    { id: "f10-13", front: "Technical inspection", back: "Systematic examination of artifacts (code, design docs, requirements, architecture), guided by checklist; records location & severity." },
    { id: "f10-14", front: "4 benefits of technical inspection", back: "Consistency in the review · Focus on several problems · Helps less experienced reviewers · Location and severity noted." },
  ],
};

export default L10;
