import type { Lesson } from "@/lib/types";

const L11: Lesson = {
  id: "L11",
  number: 11,
  title: "Software Quality",
  tagline: "Quality is meeting requirements and expectations.",
  sections: [
    {
      id: "l11-quality",
      title: "Software Quality & Collaborative Quality",
      slides: "Lecture 11 · Slides 2–3",
      blocks: [
        {
          kind: "hook",
          title: "Two calculators",
          text: "One calculator gives the right answer, but it takes 10 seconds and crashes once a day. Another is fast and never crashes, but its buttons are labelled in a language you don't read. Which one is \"high quality\"? **Neither.** Quality means meeting **both** the requirements **and** what users expect.",
        },
        {
          kind: "objectives",
          items: [
            "Define software quality and its three focus areas",
            "Explain collaborative quality and why teams catch more defects",
            "Define software testing and its cost logic",
            "Trace how testing evolved from 1980 to today",
            "Compare black-, white-, and grey-box techniques",
            "Order the testing levels and compare manual vs. automated testing",
          ],
        },
        {
          kind: "concept",
          term: "Software Quality",
          definition: "The degree to which a software product meets specified requirements and user expectations.",
          body: "**Motivation:** creating value for your customers, reducing risk, and fostering long-term success for your business.",
        },
        { kind: "diagram", id: "quality-pillars" },
        {
          kind: "mnemonic",
          title: "Quality's three focus areas: \"Process · People · Product\"",
          text: "**Process** effectiveness (how we build) · **People**, meaning **user satisfaction** (who we build for) · **Product**, meaning **system efficacy** (what we build actually works).",
        },
        {
          kind: "concept",
          term: "Collaborative Quality",
          definition: "Multiple individuals or teams work together to create, maintain, and improve software products.",
          body: "**Motivation:** collaborative development practices can significantly impact the quality of software products.",
        },
        {
          kind: "pillars",
          title: "Collaborative quality keywords",
          items: [
            { k: "Blind spots", v: "Others see the mistakes you can't see in your own work." },
            { k: "Support", v: "Team members help and back each other up." },
            { k: "Teamwork", v: "Shared responsibility for quality." },
          ],
        },
        {
          kind: "connect",
          text: "Remember Lecture 10's checkpoints (pair programming, reviews, walkthroughs, inspections)? They are **collaborative quality in action**.",
        },
        {
          kind: "check",
          q: {
            id: "l11c1",
            topic: "L11",
            type: "mcq",
            q: "Software quality is defined as the degree to which a product…",
            options: ["Has zero bugs", "Meets specified requirements and user expectations", "Uses the latest technology", "Is delivered on time"],
            answer: 1,
            explain: "Quality = degree to which software meets specified requirements AND user expectations.",
          },
        },
      ],
    },
    {
      id: "l11-testing",
      title: "Software Testing & Its History",
      slides: "Lecture 11 · Slides 4–5",
      blocks: [
        {
          kind: "concept",
          term: "Software Testing",
          definition: "Identifying defects, errors, or inconsistencies in the software and verifying that it functions correctly and reliably under various conditions.",
          body: "**Motivation:** improve the quality, reliability, and usability of software products while reducing risks and enhancing user satisfaction.",
        },
        {
          kind: "pillars",
          title: "Testing's cost logic",
          items: [
            { k: "Costs", v: "Testing costs time and money…" },
            { k: "Prevention", v: "…but it prevents defects from reaching users…" },
            { k: "Fix", v: "…and fixing early is far cheaper than fixing in production." },
          ],
        },
        { kind: "diagram", id: "testing-timeline", caption: "Each era of development methodology brought a new style of testing." },
        {
          kind: "table",
          title: "Software Testing Over the Years",
          head: ["Era", "Methodology", "Testing style"],
          rows: [
            ["1980–1990", "Waterfall Methodology", "Manual testing"],
            ["1990–2000", "Experimentation with development approaches", "Bulky automation tools"],
            ["2000–2010", "Agile Methodology", "Robust automation tools + open source"],
            ["2010–2018", "DevOps & Continuous Testing", "More scalable tools & frameworks"],
            ["2019 & beyond", "Collaboration & Smart Testing", "Autonomous testing, machine learning & AI"],
          ],
        },
        {
          kind: "mnemonic",
          title: "Timeline chant",
          text: "\"**Waterfall** was by hand. **Experiments** got bulky. **Agile** went open. **DevOps** went continuous. **Today** it's smart, with AI.\"",
        },
        {
          kind: "check",
          q: {
            id: "l11c2",
            topic: "L11",
            type: "mcq",
            q: "Robust automation tools and open source became prominent during which era?",
            options: ["1980–1990 (Waterfall)", "2000–2010 (Agile)", "2010–2018 (DevOps)", "2019 & beyond"],
            answer: 1,
            explain: "2000–2010 Agile methodology ↔ robust automation tools + open source.",
          },
        },
      ],
    },
    {
      id: "l11-boxes",
      title: "Testing Techniques: Black, White & Grey Box",
      slides: "Lecture 11 · Slides 6–8",
      blocks: [
        { kind: "diagram", id: "box-spectrum", caption: "How much of the inside can the tester see?" },
        {
          kind: "concept",
          term: "Black Box Testing",
          definition: "Testing the functionality and behavior of the software without examining its internal structure, code, or implementation details.",
          points: [
            "Finds differences between how the software should behave and how it actually behaves",
            "Interacts with the software through its interfaces (e.g., user interface, API)",
            "Validates inputs, outputs, and behavior",
          ],
        },
        {
          kind: "concept",
          term: "White Box Testing",
          definition: "Also known as structural or glass box testing. It tests the internal structure, logic, and code of the software.",
          points: [
            "Ensures the code is implemented correctly, all paths and conditions are exercised, and code coverage metrics are met",
            "Uses access to the source code to design test cases",
            "Verifies the correctness of algorithms, data structures, and logic",
          ],
        },
        {
          kind: "concept",
          term: "Grey Box Testing",
          definition: "Testers have limited knowledge of the internal structure and implementation details of the software.",
          points: [
            "Uses both external and internal perspectives to design test cases that check functionality and implementation details",
            "Has access to high-level design documents, APIs, or database schemas",
            "Combines elements of black box and white box testing",
          ],
        },
        {
          kind: "analogy",
          text: "Testing a car. **Black box**: you drive it and check that the brakes stop the car. **White box**: you're the mechanic with the hood open, checking every wire. **Grey box**: you have the owner's manual and the wiring diagram, but you don't take the engine apart.",
        },
        {
          kind: "pitfall",
          text: "\"Glass box\" and \"structural\" are other names for **white** box, not grey. Grey box has **limited** knowledge, such as design docs, APIs, and DB schemas. It does **not** have full source code access.",
        },
        {
          kind: "check",
          q: {
            id: "l11c3",
            topic: "L11",
            type: "mcq",
            q: "A tester designs tests using the database schema and API documentation, without reading the source code. This is…",
            options: ["Black box", "White box", "Grey box", "Glass box"],
            answer: 2,
            explain: "Grey box testers have limited internal knowledge, like high-level design docs, APIs, or DB schemas.",
          },
        },
      ],
    },
    {
      id: "l11-levels",
      title: "Testing Levels & Approaches",
      slides: "Lecture 11 · Slides 9–11",
      blocks: [
        { kind: "diagram", id: "testing-levels", caption: "Each level tests a bigger piece. Regression testing re-runs earlier tests after any change." },
        {
          kind: "table",
          title: "Testing levels",
          head: ["Level", "What it validates", "Notes"],
          rows: [
            ["Unit", "Individual code components for correctness", "Conducted by developers; focuses on inputs, outputs, internal logic"],
            ["Integration", "Interaction between integrated components", "Verifies data exchange and interface compatibility"],
            ["System", "Entire software system against requirements", "Covers functional AND non-functional requirements"],
            ["Acceptance", "Software from the user's perspective", "Ensures alignment with business requirements and user needs"],
            ["Regression", "Previously validated software after changes", "Ensures recent code changes haven't adversely affected existing functionality"],
          ],
        },
        {
          kind: "mnemonic",
          title: "Levels: \"U I S A … then Re-run\"",
          text: "**U**nit → **I**ntegration → **S**ystem → **A**cceptance. Each one is a bigger piece. Then **Regression** = **re**-run old tests after a change.",
        },
        {
          kind: "compare",
          title: "Test approaches: Manual vs. Automated",
          left: {
            label: "MANUAL: without the aid of automation tools",
            items: [
              "Creating test cases, executing tests, and verifying results through direct interaction",
              "Best where human judgment and intuition are required",
              "Offers human judgment, exploratory testing, user-centric evaluation, adaptability, early defect detection, cost-effectiveness",
            ],
          },
          right: {
            label: "AUTOMATED: software tools & scripts execute tests",
            items: [
              "Automate repetitive, time-consuming tasks, complex scenarios, high-risk areas, cross-browser testing, integration points",
              "Improves testing efficiency, accuracy, and coverage",
              "Delivers high-quality software faster and more reliably",
            ],
          },
        },
        {
          kind: "connect",
          text: "Lecture 10 link: **\"No automation\"** is a keyword of **test debt**. Lecture 12 link: **regression** testing is exactly what you run after **refactoring** (Lecture 9) to prove behavior didn't change.",
        },
        {
          kind: "check",
          q: {
            id: "l11c4",
            topic: "L11",
            type: "mcq",
            q: "After refactoring a payment module, the team re-runs all existing tests to make sure nothing broke. This is…",
            options: ["Acceptance testing", "Regression testing", "Integration testing", "Unit testing"],
            answer: 1,
            explain: "Regression testing retests previously validated software to ensure recent changes didn't hurt existing functionality.",
          },
        },
        {
          kind: "check",
          q: {
            id: "l11c5",
            topic: "L11",
            type: "mcq",
            q: "Which level covers BOTH functional and non-functional requirements of the entire system?",
            options: ["Unit", "Integration", "System", "Regression"],
            answer: 2,
            explain: "System testing validates the entire system against requirements, both functional and non-functional.",
          },
        },
        {
          kind: "feynman",
          prompt: "Explain the difference between black, white, and grey box testing, and say when you'd use manual vs. automated testing.",
          model: "Black box tests only what goes in and what comes out, without looking at the code. White box (also called glass box or structural) uses the source code to cover paths and logic. Grey box sits in between, using design documents, APIs, or schemas. Manual testing is best when human judgment or intuition is needed. Automation is best for repetitive, complex, high-risk, cross-browser, or integration tests because it is faster, more accurate, and covers more.",
        },
      ],
    },
  ],
  takeaways: [
    "Quality = meeting **specified requirements and user expectations**. It has three focus areas: process effectiveness, user satisfaction, and system efficacy.",
    "Collaborative quality: working together covers **blind spots** through support and teamwork.",
    "Testing identifies defects and verifies reliable behavior. Its cost logic is costs → prevention → fix.",
    "History: Manual (Waterfall) → Bulky automation → Robust/open-source (Agile) → Scalable (DevOps/CT) → AI/autonomous.",
    "Black (behavior only) · White/glass/structural (code) · Grey (limited: design docs, APIs, schemas).",
    "Levels: Unit → Integration → System → Acceptance, plus Regression after changes. Manual = human judgment. Automated = efficiency, accuracy, coverage.",
  ],
  flashcards: [
    { id: "f11-1", front: "Define software quality", back: "The degree to which a software product meets specified requirements and user expectations." },
    { id: "f11-2", front: "3 focus areas of software quality", back: "Process effectiveness · User satisfaction · System efficacy." },
    { id: "f11-3", front: "Collaborative quality (def + 3 keywords)", back: "Multiple individuals/teams work together to create, maintain, improve software. Blind spots · Support · Teamwork." },
    { id: "f11-4", front: "Define software testing", back: "Identify defects, errors, or inconsistencies, verifying the software functions correctly and reliably under various conditions." },
    { id: "f11-5", front: "Testing timeline (5 eras)", back: "80–90 Waterfall/manual · 90–00 experimentation/bulky automation · 00–10 Agile/robust + open source · 10–18 DevOps & CT/scalable frameworks · 2019+ collaboration & smart testing/AI." },
    { id: "f11-6", front: "Black box testing", back: "Tests functionality/behavior via interfaces (UI, API) without examining internal code; validates inputs, outputs, behavior." },
    { id: "f11-7", front: "White box testing (aka?)", back: "Structural / glass box. Tests internal structure, logic, code; all paths & conditions exercised; coverage metrics; uses source code." },
    { id: "f11-8", front: "Grey box testing", back: "Limited knowledge of internals: high-level design docs, APIs, DB schemas. Combines black and white." },
    { id: "f11-9", front: "Unit vs. Integration testing", back: "Unit: individual components, by developers (inputs, outputs, internal logic). Integration: interaction between components (data exchange, interface compatibility)." },
    { id: "f11-10", front: "System vs. Acceptance testing", back: "System: entire system vs. requirements (functional + non-functional). Acceptance: user's perspective, business requirements and user needs." },
    { id: "f11-11", front: "Regression testing", back: "Retesting previously validated software to ensure recent changes haven't broken existing functionality." },
    { id: "f11-12", front: "Manual vs. Automated testing", back: "Manual: no tools; human judgment, intuition, exploratory. Automated: tools/scripts; repetitive, complex, high-risk, cross-browser, integration; efficiency, accuracy, coverage." },
  ],
};

export default L11;
