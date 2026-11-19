import type { Lesson } from "@/lib/types";

const L13: Lesson = {
  id: "L13",
  number: 13,
  title: "Agile",
  tagline: "From a straight line to a cycle.",
  sections: [
    {
      id: "l13-tasks",
      title: "Organizing Software Development Tasks",
      slides: "Lecture 13 · Slides 2–3",
      blocks: [
        {
          kind: "hook",
          title: "Line or loop?",
          text: "Building software involves the same activities every time: analysis, design, construction, testing, and delivery. The real question is how you **arrange** them. Do you go through them **once, in order**? Or do you **loop** through them many times?",
        },
        {
          kind: "objectives",
          items: [
            "Name the core development tasks and their outputs",
            "Explain sequential (waterfall) delivery, with its pros and cons",
            "Explain iterative & incremental delivery, with its pros and cons",
            "State Agile's focus, pros, cons, and the 4 Agile values",
            "Describe Kanban (board + WIP limits) and Scrum (the framework diagram)",
          ],
        },
        { kind: "diagram", id: "sdlc", caption: "Review: the core tasks and what each one produces. Architecture and Standards guide Design, and an RTM traces requirements through to Test." },
        {
          kind: "table",
          title: "Development tasks and their outputs (Slide 2)",
          head: ["Task", "Outputs"],
          rows: [
            ["Analysis", "Requirements · Current processes"],
            ["Design", "Functional design · Technical design · Business process design"],
            ["Construction", "Code · Scripts · Database"],
            ["Test", "Test cases · Test plan · Discrepancies"],
            ["Deliver", "Migration plan · Data loading · Change management"],
          ],
        },
        {
          kind: "callout",
          title: "Also on the diagram",
          text: "**Architecture** and **Standards** feed into Design. The **Requirements Traceability Matrix (RTM)** links requirements to tests, so you can check that every requirement was tested.",
        },
        {
          kind: "concept",
          term: "Organizing Software Tasks",
          definition: "Activities and associated outcomes that produce a software product.",
          body: "The slide asks two questions: **How about sequential steps?** (Requirements → Design → Development → Testing → Deployment → Maintenance) or **Wouldn't it be better in a cycle?** (Planning → Analysis → Design → Implementation → Testing & Integration → Maintenance → repeat).",
        },
        {
          kind: "check",
          q: {
            id: "l13c1",
            topic: "L13",
            type: "mcq",
            q: "Test cases, a test plan, and discrepancies are outputs of which task?",
            options: ["Analysis", "Construction", "Test", "Deliver"],
            answer: 2,
            explain: "Test → test cases, test plan, discrepancies. Deliver → migration plan, data loading, change management.",
          },
        },
      ],
    },
    {
      id: "l13-models",
      title: "Sequential vs. Iterative & Incremental",
      slides: "Lecture 13 · Slides 4–9",
      blocks: [
        {
          kind: "concept",
          term: "Sequential (Waterfall)",
          definition: "A linear approach to software development in which each activity generally finishes before the next one can begin.",
        },
        {
          kind: "compare",
          title: "Waterfall: Good vs. Bad",
          left: { label: "GOOD", items: ["Clean structure", "Well-defined requirements", "Efficient documentation", "Easy to manage"] },
          right: { label: "BAD", items: ["Inflexible", "Lack of client participation", "Testing late", "All-at-once delivery"] },
        },
        {
          kind: "list",
          title: "Case: Alberta bus-route system, delivered sequentially",
          ordered: true,
          items: [
            "Define requirements for vehicles, employees, route schemes, purchase process, and notification logic",
            "Define architecture, screen models, and navigation scheme",
            "Code ALL the features",
            "Verify there are no bugs and that it satisfies user expectations",
            "Deploy the completed system after validation",
            "Provide support and maintenance",
          ],
        },
        {
          kind: "callout",
          text: "Key line from the slide: **\"Each activity is finished entirely before the next one starts.\"** The client sees nothing until the very end.",
        },
        {
          kind: "concept",
          term: "Iterative and Incremental",
          definition: "Development through repeated cycles (iterative) and in smaller portions of software at a time (incremental).",
        },
        {
          kind: "compare",
          title: "Iterative & Incremental: Good vs. Bad",
          left: { label: "GOOD", items: ["Flexible", "Early deliveries", "Early bug identification", "Client involvement", "Learning and improvement"] },
          right: { label: "BAD", items: ["Frequent changes", "Challenging management", "Potential for incomplete features"] },
        },
        { kind: "diagram", id: "waterfall-vs-iterative", caption: "Same bus system. On the left it's built in one pass. On the right, features enter repeated cycles." },
        {
          kind: "callout",
          title: "Iterative delivery of the bus system (Slide 9)",
          text: "Features (Vehicles, Routes, Purchase, Employees, Notifications) are **broken down and enter the cycle**, moving **forward and backwards as needed** until they are all completed. For example, Vehicles and Routes go first, then Purchase joins, then Employees and Notifications.",
        },
        {
          kind: "mnemonic",
          title: "Iterative vs. Incremental",
          text: "**Iterative = Repeat** (go around the cycle again to refine). **Incremental = Add** (deliver one more slice each time). Think of a painter: iterative means adding layers to the whole picture, and incremental means finishing one panel at a time.",
        },
        {
          kind: "check",
          q: {
            id: "l13c2",
            topic: "L13",
            type: "multi",
            q: "Which are listed DISADVANTAGES of the waterfall model? (Select all)",
            options: ["Inflexible", "Testing late", "Challenging management", "All-at-once delivery", "Lack of client participation"],
            answer: [0, 1, 3, 4],
            explain: "Waterfall's bad points: inflexible, lack of client participation, testing late, all-at-once delivery. 'Challenging management' is a con of iterative & incremental.",
          },
        },
      ],
    },
    {
      id: "l13-agile",
      title: "Agile & Its Four Values",
      slides: "Lecture 13 · Slides 10–11",
      blocks: [
        {
          kind: "concept",
          term: "Agile",
          definition: "Focus on delivering value incrementally, responding to change, and prioritizing collaboration and flexibility.",
        },
        {
          kind: "compare",
          title: "Agile: Good vs. Bad",
          left: { label: "GOOD", items: ["Faster time-to-market", "Team collaboration", "Focus on customer value", "Iterative and incremental"] },
          right: { label: "BAD", items: ["Lack of predictability", "Dependency on client availability", "Documentation hard to maintain"] },
        },
        {
          kind: "table",
          title: "The 4 Agile Values: we value the LEFT more than the RIGHT",
          head: ["We value…", "…over"],
          rows: [
            ["Individuals and interactions", "Processes and tools"],
            ["Working software", "Comprehensive documentation"],
            ["Customer collaboration", "Contract negotiation"],
            ["Responding to change", "Following a plan"],
          ],
        },
        {
          kind: "mnemonic",
          title: "Values: \"I Want Coffee Right-now\"",
          text: "**I**ndividuals & interactions · **W**orking software · **C**ustomer collaboration · **R**esponding to change. Each one beats its partner: processes/tools, documentation, contracts, plans.",
        },
        {
          kind: "pitfall",
          text: "\"Over\" doesn't mean \"instead of\". The items on the right still matter. Agile just values the left side **more**. Also, *documentation hard to maintain* is a listed **con** of Agile.",
        },
        {
          kind: "connect",
          text: "Lecture 11 link: the **2000–2010 Agile era** brought **robust automation tools + open source**. Faster cycles need fast, repeatable tests.",
        },
        {
          kind: "check",
          q: {
            id: "l13c3",
            topic: "L13",
            type: "mcq",
            q: "Complete the Agile value: \"Customer collaboration over ___\"",
            options: ["Following a plan", "Comprehensive documentation", "Contract negotiation", "Processes and tools"],
            answer: 2,
            explain: "Customer collaboration over contract negotiation.",
          },
        },
      ],
    },
    {
      id: "l13-frameworks",
      title: "Kanban & Scrum",
      slides: "Lecture 13 · Slides 12–13",
      blocks: [
        {
          kind: "concept",
          term: "Kanban",
          definition: "A visual workflow management method used in project management and software development to improve efficiency, manage work in progress, and enhance team productivity.",
          body: "**Motivation:** **limiting work in progress** and managing flow helps **reduce multitasking** and improve focus, which leads to higher-quality work.",
        },
        { kind: "diagram", id: "kanban", caption: "Cards move left to right: Backlog → Doing → Review → Done." },
        {
          kind: "concept",
          term: "Scrum",
          definition: "Organizes work into fixed-length iterations to deliver small, usable parts of a project incrementally, emphasizing teamwork, accountability, and iterative progress, with a structured approach to manage complex projects.",
        },
        { kind: "diagram", id: "scrum", caption: "The Scrum framework diagram from the slide." },
        {
          kind: "table",
          title: "Reading the Scrum diagram",
          head: ["Element", "Meaning"],
          rows: [
            ["Product Goal → Product Backlog", "The long-term objective and the ordered list of everything the product needs"],
            ["Product Backlog Refinement", "Continuously clarifying and ordering backlog items"],
            ["Sprint Planning → Sprint Goal + Sprint Backlog", "Choose what to build this sprint and why"],
            ["Scrum Team (Dev, SM, PO)", "Developers, Scrum Master, Product Owner"],
            ["Daily Scrum", "A short daily sync during the sprint"],
            ["Increment + Definition of Done", "The usable output that meets the agreed quality bar"],
            ["Sprint Review", "Inspect the increment with stakeholders"],
            ["Sprint Retrospective", "The team reflects and improves how it works"],
          ],
        },
        {
          kind: "compare",
          title: "Kanban vs. Scrum (in the lecture's terms)",
          left: { label: "KANBAN", items: ["Visual workflow board", "Limit work in progress (WIP)", "Continuous flow", "Reduces multitasking → focus → quality"] },
          right: { label: "SCRUM", items: ["Fixed-length iterations (sprints)", "Small usable increments", "Teamwork & accountability", "Structured approach for complex projects"] },
        },
        {
          kind: "mnemonic",
          title: "Kanban = Flow, Scrum = Sprints",
          text: "**K**anban **K**eeps cards moving (flow + WIP limits). **S**crum **S**prints (fixed-length iterations).",
        },
        {
          kind: "check",
          q: {
            id: "l13c4",
            topic: "L13",
            type: "mcq",
            q: "The main motivation for Kanban's WIP limits is to…",
            options: ["Fix iteration length", "Reduce multitasking and improve focus", "Eliminate documentation", "Assign a Scrum Master"],
            answer: 1,
            explain: "Limiting work in progress and managing flow reduces multitasking and improves focus, leading to higher-quality work.",
          },
        },
        {
          kind: "check",
          q: {
            id: "l13c5",
            topic: "L13",
            type: "mcq",
            q: "Which framework organizes work into FIXED-LENGTH iterations?",
            options: ["Kanban", "Scrum", "Waterfall", "Exploratory"],
            answer: 1,
            explain: "Scrum organizes work into fixed-length iterations (sprints).",
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a client why building their bus-route system iteratively is better than waterfall, and mention one downside to be honest about.",
          model: "Instead of waiting until the end to see everything, you'd get working pieces early, such as vehicles and routes first, then ticket purchase. You can give feedback, we find bugs sooner, and we adapt as your needs change. To be honest about the downside: it needs your regular involvement, and the final timeline and scope are less predictable than with a fixed waterfall plan.",
        },
      ],
    },
  ],
  takeaways: [
    "Core tasks: Analysis → Design → Construction → Test → Deliver, each with defined outputs. Architecture and Standards guide Design, and the RTM traces requirements.",
    "Waterfall: linear, each activity finishes before the next. Good: structure, clear requirements, documentation, easy to manage. Bad: inflexible, low client participation, late testing, all-at-once delivery.",
    "Iterative (repeated cycles) + incremental (smaller portions). Good: flexible, early delivery and bug detection, client involvement, learning. Bad: frequent changes, hard to manage, possibly incomplete features.",
    "Agile delivers value incrementally and responds to change. 4 values: Individuals, Working software, Customer collaboration, Responding to change.",
    "Kanban = visual board + WIP limits. Scrum = fixed-length sprints with PO, SM, Devs, and events from planning to retro.",
  ],
  flashcards: [
    { id: "f13-1", front: "5 development tasks and outputs", back: "Analysis (requirements, current processes) · Design (functional, technical, business-process) · Construction (code, scripts, DB) · Test (cases, plan, discrepancies) · Deliver (migration plan, data loading, change mgmt)." },
    { id: "f13-2", front: "What is the RTM?", back: "Requirements Traceability Matrix: links requirements through design to tests." },
    { id: "f13-3", front: "Waterfall: definition", back: "A linear approach where each activity generally finishes before the next one can begin." },
    { id: "f13-4", front: "Waterfall pros / cons", back: "Pros: clean structure, well-defined requirements, efficient documentation, easy to manage. Cons: inflexible, lack of client participation, testing late, all-at-once delivery." },
    { id: "f13-5", front: "Iterative & incremental: definition", back: "Development through repeated cycles (iterative) and in smaller portions at a time (incremental)." },
    { id: "f13-6", front: "Iterative & incremental pros / cons", back: "Pros: flexible, early deliveries, early bug identification, client involvement, learning & improvement. Cons: frequent changes, challenging management, potential incomplete features." },
    { id: "f13-7", front: "Agile: definition", back: "Focus on delivering value incrementally, responding to change, prioritizing collaboration and flexibility." },
    { id: "f13-8", front: "Agile pros / cons", back: "Pros: faster time-to-market, collaboration, customer value, iterative & incremental. Cons: lack of predictability, dependency on client availability, documentation hard to maintain." },
    { id: "f13-9", front: "4 Agile values", back: "Individuals & interactions > processes & tools · Working software > comprehensive docs · Customer collaboration > contract negotiation · Responding to change > following a plan." },
    { id: "f13-10", front: "Kanban: definition + motivation", back: "Visual workflow management method to improve efficiency, manage WIP, enhance productivity. Limiting WIP reduces multitasking, improves focus and quality." },
    { id: "f13-11", front: "Scrum: definition", back: "Fixed-length iterations delivering small usable parts incrementally; teamwork, accountability, iterative progress; structured approach for complex projects." },
    { id: "f13-12", front: "Scrum diagram elements", back: "Product goal & backlog, refinement, sprint planning, sprint goal & backlog, Scrum team (Dev, SM, PO), daily scrum, increment, definition of done, sprint review, sprint retrospective." },
  ],
};

export default L13;
