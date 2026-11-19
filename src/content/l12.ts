import type { Lesson } from "@/lib/types";

const L12: Lesson = {
  id: "L12",
  number: 12,
  title: "Software Testing",
  tagline: "Know what to test, how to design it, and how to run it.",
  sections: [
    {
      id: "l12-types",
      title: "Twelve Test Types",
      slides: "Lecture 12 · Slides 2–3",
      blocks: [
        {
          kind: "hook",
          title: "One app, twelve questions",
          text: "Before an online store launches, people ask a lot of questions. Does checkout work? Is it fast? Does it survive Black Friday? What if traffic is 10× normal? Is it hackable? Does it read well in French? Which button design sells more? Can a blind user shop? Is the recommender fair? **Each question is a different test type.**",
        },
        {
          kind: "objectives",
          items: [
            "Name and define all 12 test types",
            "Describe unit tests and design requirement-based cases (error, common, boundary)",
            "Explain system testing and its three techniques: ad-hoc, scripted, exploratory",
            "Model scripted tests using basic and alternative flows and write a test case",
            "Write an exploratory charter and mission, and know when to use exploratory testing",
          ],
        },
        { kind: "diagram", id: "test-types", caption: "Grouped by the question each test answers." },
        {
          kind: "table",
          title: "Test types (exact keywords from the slides)",
          head: ["Type", "Focus"],
          rows: [
            ["Functional", "Specifications: does it do what's specified?"],
            ["Performance", "Speed, stability, reliability, scalability"],
            ["Load", "Multiple users at the same time"],
            ["Stress", "Beyond normal limits"],
            ["Smoke", "The basics: does it start and run at all?"],
            ["Security", "Vulnerabilities and risks"],
            ["Localization", "Idioms and regions"],
            ["A/B", "Comparing two system versions"],
            ["Beta", "Real users"],
            ["Usability", "UI and UX"],
            ["Accessibility", "People with disabilities"],
            ["Fairness", "Bias and discrimination"],
          ],
        },
        {
          kind: "mnemonic",
          title: "Load vs. Stress",
          text: "**Load** = a heavy **load** of normal users (many at once, within normal limits). **Stress** = push it **beyond** normal until it breaks, like stressing a bridge past its rated weight.",
        },
        {
          kind: "pitfall",
          text: "**Smoke** = only the basics (\"turn it on, does smoke come out?\"). **Beta** = real users. **A/B** = two versions compared. **Fairness** = bias and discrimination, which is different from **accessibility** (disabilities).",
        },
        {
          kind: "check",
          q: {
            id: "l12c1",
            topic: "L12",
            type: "mcq",
            q: "Pushing a system with traffic far BEYOND its normal capacity to see how it fails is…",
            options: ["Load testing", "Stress testing", "Smoke testing", "Beta testing"],
            answer: 1,
            explain: "Stress testing goes beyond normal limits. Load testing checks multiple users within expected levels.",
          },
        },
      ],
    },
    {
      id: "l12-unit",
      title: "Unit Tests & Requirement-Based Cases",
      slides: "Lecture 12 · Slides 4–6",
      blocks: [
        {
          kind: "concept",
          term: "Unit Tests",
          definition: "The smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation.",
          body: "**Motivation:** test as **early** as possible to identify bugs before they become costly.",
        },
        {
          kind: "pillars",
          title: "Unit test keywords",
          items: [
            { k: "Isolated", v: "Each unit is tested on its own, independent of the others." },
            { k: "Documentation", v: "Tests show how the unit is supposed to behave." },
            { k: "Programmer", v: "Unit tests are written by developers." },
          ],
        },
        {
          kind: "concept",
          term: "Requirement-Based Unit Tests",
          definition: "Use the specifications (requirements, user stories, use cases) to determine the number of tests.",
          body: "**Motivation:** test small parts of the code **from the perspective of the user.** Each requirement is split into three kinds of cases.",
        },
        {
          kind: "pillars",
          title: "Three categories of cases",
          items: [
            { k: "Error cases", v: "Invalid inputs that should be rejected." },
            { k: "Boundary cases", v: "Edge values right at the limits." },
            { k: "Common cases", v: "Normal, valid, expected usage." },
          ],
        },
        {
          kind: "mnemonic",
          title: "\"ECB\": Every Case Bounded",
          text: "**E**rror · **C**ommon · **B**oundary. Every requirement gets all three.",
        },
        {
          kind: "code",
          title: "Worked example: login(username, password)",
          code: `/** Logs a user in by checking username and password.
 *  Returns "Login successful" if correct, otherwise an error message.
 *  @param password  format ABC123#  */

ERROR CASES
 1. Null username or password
 2. Empty username or password
 3. Incorrect username
 4. Incorrect password
 5. Both username and password incorrect
BOUNDARY CASES
 6. Minimal valid strings that don't match expected values
    (e.g., only-numeric password, minimum allowed length)
COMMON CASES
 7. Valid username and password matching expected values`,
          caption: "Seven tests come from one small requirement. Notice that error cases make up most of the tests.",
        },
        {
          kind: "check",
          q: {
            id: "l12c2",
            topic: "L12",
            type: "mcq",
            q: "In the login example, testing a password at the minimum allowed length that doesn't match the expected value is a(n)…",
            options: ["Error case", "Boundary case", "Common case", "Smoke case"],
            answer: 1,
            explain: "Minimal valid strings or minimum allowed length = BOUNDARY case (case 6).",
          },
        },
      ],
    },
    {
      id: "l12-system",
      title: "System Testing & Its Techniques",
      slides: "Lecture 12 · Slides 7–9",
      blocks: [
        {
          kind: "concept",
          term: "System Testing",
          definition: "Testing the entire system as a whole to confirm it meets the specified requirements and works as expected when all individual modules are combined.",
          body: "**Motivation:** evaluate how well the system functions as a unit, ensuring all components and subsystems are integrated smoothly.",
        },
        {
          kind: "pillars",
          title: "System testing keywords",
          items: [
            { k: "Verify", v: "Did we build it right? (does it match the specification)" },
            { k: "High level", v: "Tests the whole system, not its internals." },
            { k: "Validate", v: "Did we build the right thing? (does it meet needs)" },
          ],
        },
        {
          kind: "concept",
          term: "System Testing Techniques",
          definition: "Software testers execute the test cases and generate test reports, comparing what was planned to what was coded.",
          body: "**Motivation:** validating that requirements are aligned with outcomes. There are three techniques: **Ad-hoc**, **Scripted**, and **Exploratory**.",
        },
        {
          kind: "concept",
          term: "Ad-hoc Testing",
          definition: "Entirely spontaneous and informal testing with no plan and no documentation.",
          body: "**Motivation:** to quickly and intuitively identify software issues that structured testing might miss.",
        },
        {
          kind: "pillars",
          title: "Ad-hoc keywords",
          items: [
            { k: "Informal", v: "No formal process." },
            { k: "Cost-effective", v: "Cheap and quick." },
            { k: "Improvised", v: "Made up as you go." },
            { k: "Non-reproducible", v: "Hard to repeat because nothing is recorded." },
          ],
        },
        {
          kind: "check",
          q: {
            id: "l12c3",
            topic: "L12",
            type: "multi",
            q: "Which are characteristics of AD-HOC testing? (Select all)",
            options: ["Informal", "Tests written before execution", "Non-reproducible", "Cost-effective", "Live documentation"],
            answer: [0, 2, 3],
            explain: "Ad-hoc = informal, cost-effective, improvised, non-reproducible. 'Written before' is scripted. 'Live documentation' is exploratory.",
          },
        },
      ],
    },
    {
      id: "l12-scripted",
      title: "Scripted Testing: Flows & Test Cases",
      slides: "Lecture 12 · Slides 10–12",
      blocks: [
        {
          kind: "concept",
          term: "Scripted Testing",
          definition: "Follow the script, which includes well-documented test cases and test steps. There is NO deviation from the script.",
          body: "**Motivation:** having a guide and a clear report of the testing under execution.",
        },
        {
          kind: "pillars",
          title: "Scripted keywords",
          items: [
            { k: "Tests written before", v: "Designed ahead of execution." },
            { k: "Tests are steps", v: "Step-by-step actions." },
            { k: "Tests are repetitive", v: "Same script, same steps, every run." },
          ],
        },
        { kind: "diagram", id: "flows", caption: "One basic flow from START to END, and alternative flows that branch off it." },
        {
          kind: "concept",
          term: "Basic Flow vs. Alternative Flows",
          definition: "The BASIC FLOW is the main scenario the user can execute when using a feature. ALTERNATIVE FLOWS are all possible scenarios the system can assume if the user deviates from the main flow.",
          points: [
            "An alternative flow can take the user **back to the beginning** of the process",
            "An alternative flow can take the user **to another part of the system but end at the same point**",
            "An alternative flow can take the user **to a different end**",
          ],
        },
        {
          kind: "table",
          title: "Anatomy of a scripted test case (login with image authentication)",
          head: ["Field", "Content"],
          rows: [
            ["Preconditions", "The user must be on the login page"],
            ["Procedure: Action 1", "Inform valid email → Expected: the email is shown in the respective field"],
            ["Procedure: Action 2", "Inform password → Expected: the field displays ••••• on screen"],
            ["Procedure: Action 3", "Click on the login button → Expected: the system displays the authentication by images"],
            ["Procedure: Action 4", "Select image option requested → Expected: the system concludes the authentication"],
            ["Expected Result", "1. User is redirected to the home page · 2. User's name is shown at the top left of the page"],
            ["Postcondition", "N/A"],
          ],
        },
        {
          kind: "mnemonic",
          title: "Test case skeleton: \"PPEP\"",
          text: "**P**reconditions → **P**rocedure (Action + Expected result pairs) → **E**xpected result → **P**ostcondition.",
        },
        {
          kind: "check",
          q: {
            id: "l12c4",
            topic: "L12",
            type: "mcq",
            q: "A user cancels checkout and is returned to the start of the purchase process. In scripted testing this is…",
            options: ["The basic flow", "An alternative flow that returns to the beginning", "An exploratory charter", "A postcondition"],
            answer: 1,
            explain: "Alternative flows can take the user back to the beginning, to another part ending at the same point, or to a different end.",
          },
        },
      ],
    },
    {
      id: "l12-exploratory",
      title: "Exploratory Testing: Charters, Missions & When",
      slides: "Lecture 12 · Slides 13–18",
      blocks: [
        {
          kind: "concept",
          term: "Exploratory Testing",
          definition: "A dynamic, hands-on approach where testers actively engage with the software without predefined test cases, using their skills and intuition to discover issues.",
        },
        {
          kind: "pillars",
          title: "Exploratory keywords",
          items: [
            { k: "Test design AND execution", v: "Both happen at the same time." },
            { k: "Live documentation", v: "Notes are written while testing." },
            { k: "Structured but flexible", v: "There is a charter, but the tester has freedom." },
            { k: "Iterative and adaptive", v: "The next step depends on what was just learned." },
          ],
        },
        { kind: "diagram", id: "adhoc-vs-exploratory" },
        {
          kind: "callout",
          title: "Ad-hoc vs. Exploratory: THE distinction",
          text: "The difference is the **structure and purpose** exploratory testing adds. Ad-hoc is entirely spontaneous and informal. Exploratory adds a layer of **planning and documentation**, which makes it **systematic, traceable, and reproducible**.",
        },
        {
          kind: "concept",
          term: "Exploratory Testing Charter",
          definition: "Explore <target> using <resource/condition> to <identify/check/learn something>.",
          body: "A **charter** is to exploratory testing what a **test case** is to scripted testing. It is the unit that guides the session.",
        },
        {
          kind: "code",
          title: "Charter in action",
          code: `Explore  <the email-sending feature>
using    <attachments of different file types>
to       <analyze how the feature behaves>`,
        },
        {
          kind: "table",
          title: "Exploratory Testing Mission (Slide 17)",
          head: ["Field", "Example"],
          rows: [
            ["GOAL", "EXPLORE the feature of sending email WITH attachments TO analyze how it behaves using different types of file"],
            ["TIME", "Min. 30 min · Max. 60 min"],
            ["SETUP", "Login to email using a valid user"],
            ["FOCUS", "Send with attachment · without attachment · audio files · text files · to several users · to an invalid user · cancel email · archive email"],
            ["OUTPUTS", "Bugs · Notes · Improvements"],
          ],
        },
        {
          kind: "pillars",
          title: "When to use exploratory testing (Slide 18)",
          items: [
            { k: "Lack of specification", v: "There's nothing to write scripts from." },
            { k: "Software never tested", v: "You need a first look to learn the system." },
            { k: "Little time available", v: "There's no time to write full scripts." },
            { k: "Increase variability", v: "You want to try paths the scripts miss." },
          ],
        },
        {
          kind: "mnemonic",
          title: "Charter = \"E-U-T\", like a satellite \"EUTelsat\"",
          text: "**E**xplore <target> **U**sing <resource> **T**o <learn>. Mission fields: **Goal, Time, Setup, Focus** (\"**G**o **T**est **S**ome **F**eatures\"). Outputs: **B**ugs, **N**otes, **I**mprovements (\"**BNI**\").",
        },
        {
          kind: "check",
          q: {
            id: "l12c5",
            topic: "L12",
            type: "mcq",
            q: "What makes exploratory testing different from ad-hoc testing?",
            options: ["Exploratory uses predefined test cases", "Exploratory adds planning and documentation, making it traceable and reproducible", "Ad-hoc testing requires a charter", "There is no difference"],
            answer: 1,
            explain: "Exploratory adds structure and purpose (planning + documentation). It is systematic, traceable, reproducible, but still has no predefined test cases.",
          },
        },
        {
          kind: "check",
          q: {
            id: "l12c6",
            topic: "L12",
            type: "multi",
            q: "When is exploratory testing recommended? (Select all)",
            options: ["Lack of specification", "Software never tested", "Strict regulatory audit requiring identical repeatable scripts", "Little time available", "To increase variability"],
            answer: [0, 1, 3, 4],
            explain: "Slide 18: lack of specification, software never tested, little time available, increase variability.",
          },
        },
        {
          kind: "feynman",
          prompt: "Compare ad-hoc, scripted, and exploratory testing in terms of planning and documentation.",
          model: "Ad-hoc testing has no plan and no documentation. It's informal, cheap, improvised, and impossible to reproduce. Scripted testing is fully planned in advance as step-by-step test cases (basic and alternative flows) and is followed with no deviation. Exploratory testing is in between. A charter gives it a purpose, and the tester designs and runs tests at the same time while keeping live notes. That makes it flexible but still traceable and reproducible.",
        },
      ],
    },
  ],
  takeaways: [
    "12 test types: functional, performance, load, stress, smoke, security, localization, A/B, beta, usability, accessibility, fairness.",
    "Unit tests are isolated, act as documentation, and are written by programmers. Test early. Requirement-based cases are **Error, Common, Boundary**.",
    "System testing (verify · high level · validate) uses three techniques: **Ad-hoc, Scripted, Exploratory**.",
    "Scripted: written before, step-by-step, repetitive. Basic flow plus alternative flows. Test case = Preconditions, Procedure, Expected result, Postcondition.",
    "Exploratory: design + execution at once, live docs, structured but flexible, iterative. Charter = *Explore … using … to …*",
    "Use exploratory when: no spec, never tested, little time, or you want more variability.",
  ],
  flashcards: [
    { id: "f12-1", front: "12 test types", back: "Functional, Performance, Load, Stress, Smoke, Security, Localization, A/B, Beta, Usability, Accessibility, Fairness." },
    { id: "f12-2", front: "Performance vs. Load vs. Stress", back: "Performance: speed, stability, reliability, scalability. Load: multiple users. Stress: beyond normal." },
    { id: "f12-3", front: "Smoke · Localization · A/B · Beta", back: "Smoke: basics. Localization: idioms & regions. A/B: two system versions. Beta: real users." },
    { id: "f12-4", front: "Usability · Accessibility · Fairness", back: "Usability: UI & UX. Accessibility: disabilities. Fairness: bias & discrimination." },
    { id: "f12-5", front: "Unit tests: definition + 3 keywords", back: "Smallest testable parts individually and independently scrutinized. Isolated · Documentation · Programmer. Test early!" },
    { id: "f12-6", front: "Requirement-based unit tests", back: "Use specifications (requirements, user stories, use cases) to determine number of tests; test from the user's perspective. Error · Common · Boundary cases." },
    { id: "f12-7", front: "System testing: def + keywords", back: "Testing the entire system as a whole against requirements when modules are combined. Verify · High level · Validate." },
    { id: "f12-8", front: "3 system testing techniques", back: "Ad-hoc · Scripted · Exploratory." },
    { id: "f12-9", front: "Ad-hoc testing keywords", back: "Informal · Cost-effective · Improvised · Non-reproducible." },
    { id: "f12-10", front: "Scripted testing keywords", back: "Follow the script with no deviation. Tests written before · Tests are steps · Tests are repetitive." },
    { id: "f12-11", front: "Basic flow vs. alternative flow (3 kinds)", back: "Basic = main scenario. Alternative = user deviates: back to beginning; another part but same end; different end." },
    { id: "f12-12", front: "Test case fields", back: "Preconditions · Procedure (Action / Expected result) · Expected Result · Postcondition." },
    { id: "f12-13", front: "Exploratory testing keywords", back: "Test design and execution · Live documentation · Structured but flexible · Iterative and adaptive." },
    { id: "f12-14", front: "Exploratory charter template", back: "Explore <target> using <resource/condition> to <identify/check/learn something>." },
    { id: "f12-15", front: "Exploratory mission fields + outputs", back: "Goal · Time (30–60 min) · Setup · Focus. Outputs: Bugs, Notes, Improvements." },
    { id: "f12-16", front: "When to use exploratory testing", back: "Lack of specification · Software never tested · Little time available · Increase variability." },
  ],
};

export default L12;
