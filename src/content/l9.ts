import type { Lesson } from "@/lib/types";

const L9: Lesson = {
  id: "L9",
  number: 9,
  title: "Refactoring",
  tagline: "Change the inside, keep the outside.",
  sections: [
    {
      id: "l9-evolution",
      title: "Software Evolution: why code never stands still",
      slides: "Lecture 9 · Slides 2 & 4",
      blocks: [
        {
          kind: "hook",
          title: "Start with a question",
          text: "Think of an app you use every week. Has it ever had an update? Software is never finished. It keeps changing for as long as people use it. Today is about doing that change **well**.",
        },
        {
          kind: "objectives",
          items: [
            "Define software evolution and explain why it is risky",
            "Contrast software that **evolves** with software that **devolves**",
            "Define refactoring and name its three triggers",
            "Classify refactoring examples by goal: readability, understandability, flexibility",
            "Recognise code smells and name the five refactoring levels with examples",
          ],
        },
        {
          kind: "concept",
          term: "Software Evolution",
          definition: "The process of developing, maintaining, and updating software for various reasons. This process is complex and entails inherent risks.",
          body: "Evolution is an **inherent and continuous** part of the software development lifecycle. It is not a one-time event. Every change is a chance to improve the code, and also a chance to break it.",
        },
        {
          kind: "pillars",
          title: "Three words from the slide",
          items: [
            { k: "Opportunity", v: "Every change is a chance to make the system better." },
            { k: "Quality", v: "The way you change code decides whether quality goes up or down." },
            { k: "Challenging", v: "Changing working software is complex and risky." },
          ],
        },
        { kind: "diagram", id: "evolve-devolve", caption: "The same system can go either way. It depends on how changes are made." },
        {
          kind: "compare",
          title: "Evolves vs. Devolves",
          left: { label: "Software EVOLVES → quality improves", items: ["Bugs are fixed", "Useless code removed", "Bad code improved", "Complexity is reduced"] },
          right: { label: "Software DEVOLVES → quality degrades", items: ["Band-aid fixes", "Short-cuts", "Poorly thought-out design", "Undocumented changes"] },
        },
        {
          kind: "analogy",
          text: "A house gets renovated every year. If the owners fix the plumbing properly and remove junk, the house gets better. If they tape over leaks and add rooms without plans, it slowly falls apart. Both houses got changed. Only one evolved.",
        },
        {
          kind: "check",
          q: {
            id: "l9c1",
            topic: "L9",
            type: "multi",
            q: "Which of these are signs that software is DEVOLVING? (Select all that apply)",
            options: ["Band-aid fixes", "Useless code removed", "Undocumented changes", "Short-cuts", "Complexity is reduced"],
            answer: [0, 2, 3],
            explain: "Devolving: band-aid fixes, short-cuts, poorly thought-out design, undocumented changes. Removing useless code and reducing complexity are signs of evolving.",
          },
        },
      ],
    },
    {
      id: "l9-refactoring",
      title: "What is Refactoring?",
      slides: "Lecture 9 · Slides 3 & 5",
      blocks: [
        {
          kind: "concept",
          term: "Refactoring",
          definition: "The process of restructuring existing code, altering its internal structure WITHOUT changing its external behavior.",
          body: "The motivation is to **improve the overall quality, maintainability, and readability of code**. The user should see no difference. If the behavior changes, it is not refactoring. It is a feature change or a bug fix.",
        },
        {
          kind: "pillars",
          title: "What triggers refactoring?",
          items: [
            { k: "Requirements change", v: "New needs make the old structure awkward." },
            { k: "Implementation changes", v: "A better way to code something becomes available." },
            { k: "Design changes", v: "The design must be reshaped to stay clean." },
          ],
        },
        {
          kind: "mnemonic",
          title: "Refactoring triggers: \"RID\"",
          text: "**R**equirements, **I**mplementation, **D**esign changes. When any of them changes, you may need to *rid* the code of its old structure.",
        },
        {
          kind: "table",
          title: "Refactoring examples grouped by goal (Slide 5)",
          head: ["Goal", "Examples"],
          rows: [
            ["Improving READABILITY", "Removing magic constants · Making variable names more informative · Decomposing overly long methods"],
            ["Improving UNDERSTANDABILITY", "Reorganizing the class hierarchy · Removing dead or unused code · Fixing design"],
            ["Improving FLEXIBILITY", "Improving interfaces · Improving APIs · Changing architecture"],
          ],
        },
        {
          kind: "code",
          title: "Two tiny refactorings from the slide",
          code: `// Before                          // After
if (votes > 2000) { ... }          if (votes > MAX.VALUE) { ... }   // magic constant removed
for (int i = 0; ...)               for (int districtIndex = 0; ...) // informative name`,
          caption: "2000 → MAX.VALUE and i → districtIndex. The program behaves exactly the same, but it is easier to read.",
        },
        {
          kind: "mnemonic",
          title: "Goals: \"R-U-F\"",
          text: "Refactoring smooths code that is **RUF** (rough): **R**eadability (names, constants, long methods), **U**nderstandability (hierarchy, dead code, design), **F**lexibility (interfaces, APIs, architecture).",
        },
        {
          kind: "pitfall",
          text: "Exam trap: \"Refactoring adds new features.\" **False.** Refactoring keeps external behavior unchanged. Also note that *removing dead code* is listed under **understandability**, not readability.",
        },
        {
          kind: "check",
          q: {
            id: "l9c2",
            topic: "L9",
            type: "mcq",
            q: "Renaming variable `i` to `districtIndex` mainly improves which quality?",
            options: ["Flexibility", "Readability", "Availability", "Performance"],
            answer: 1,
            explain: "Making variable names more informative is a READABILITY refactoring (Slide 5).",
          },
        },
      ],
    },
    {
      id: "l9-smells",
      title: "Code Smells: when do we need refactoring?",
      slides: "Lecture 9 · Slides 6–11",
      blocks: [
        {
          kind: "concept",
          term: "Code Smells",
          definition: "Indicators of potential issues or areas of improvement in software code.",
          body: "Code smells suggest areas where refactoring or restructuring could improve maintainability, readability, and overall software quality. Code smells are the answer to the question **\"When do we need refactoring?\"**",
        },
        {
          kind: "pillars",
          title: "Two key facts",
          items: [
            { k: "NOT bugs", v: "Smelly code can still work correctly. A smell is a warning sign, not a failure." },
            { k: "Management issues", v: "Smells pile up because of how work is managed: deadlines, priorities, and ownership." },
          ],
        },
        {
          kind: "analogy",
          text: "A smell in your fridge doesn't mean you're sick yet. It means something is going bad, and you should deal with it before it becomes a real problem.",
        },
        {
          kind: "code",
          title: "Smell #1: Duplicated Code",
          code: `class Order   { double calculateTotal(double price, int qty) { return price * qty * 1.10; } } // 10% tax
class Invoice { double computeInvoiceTotal(double price, int qty) { return price * qty * 1.10; } } // duplicate!

// Refactored: centralise the logic
class TaxCalculator { static double calculateTotal(double price, int qty) { return price * qty * 1.10; } }
class Order   { double getTotal(double p, int q) { return TaxCalculator.calculateTotal(p, q); } }
class Invoice { double getTotal(double p, int q) { return TaxCalculator.calculateTotal(p, q); } }`,
          caption: "If the tax rate changes, you now change it in one place instead of hunting for copies.",
        },
        {
          kind: "code",
          title: "Smell #2: Long Method",
          code: `// Before: one method prints, validates, and processes
void processOrder(Order order) { /* print... if empty... loop items... print total */ }

// After: Extract Method → small, named steps
void processOrder(Order order) {
    printOrderDetails(order);
    validateOrder(order);
    processItems(order);
}`,
          caption: "Each extracted method does one job, and its name explains what that job is.",
        },
        {
          kind: "code",
          title: "Smell #3: Poor Cohesion",
          code: `// Before: one class does unrelated jobs
class UserManager { addUser(); removeUser(); sendEmail(); logActivity(); }

// After: Split Class → each class has ONE responsibility
class UserService    { addUser(); removeUser(); }
class EmailService   { sendEmail(); }
class LoggingService { logActivity(); }`,
          caption: "High cohesion means everything inside a class belongs together.",
        },
        {
          kind: "table",
          title: "Finding Code Smells: the 8 smells marked on the slide-11 code",
          head: ["#", "Smell", "What it looked like"],
          rows: [
            ["1", "Naming", "`int s1;` (meaningless name)"],
            ["2", "Public attribute", "`public String name;` (breaks encapsulation)"],
            ["3", "Magic number", "`length > 10 ? 10 : ...` (unexplained literal)"],
            ["4", "Unused variable", "`int code_id = 42;` (never used)"],
            ["5", "Empty method", "an empty `else { }` / method body"],
            ["6", "Naming", "`int a = age; String addr; double g;`"],
            ["7", "Possible dependence", "`validateStudentDetails()` called inside a setter"],
            ["8", "Empty method", "`private void validateStudentDetails() { }`"],
          ],
        },
        {
          kind: "check",
          q: {
            id: "l9c3",
            topic: "L9",
            type: "tf",
            q: "A code smell means the program currently produces wrong output.",
            answer: false,
            explain: "Code smells are NOT bugs. They point to possible maintainability problems in code that may still work fine.",
          },
        },
      ],
    },
    {
      id: "l9-levels",
      title: "The Five Levels of Refactoring",
      slides: "Lecture 9 · Slides 12–16",
      blocks: [
        { kind: "diagram", id: "refactor-levels", caption: "From the smallest scope (data) to the largest (the whole system)." },
        {
          kind: "mnemonic",
          title: "Smallest → largest: \"Don't Stop Refactoring Code, Silly\"",
          text: "**D**ata → **S**tatement → **R**outine → **C**lass → **S**ystem. Each level zooms out one step: a variable, a line, a method, a class, the whole architecture.",
        },
        {
          kind: "table",
          title: "Level-by-level reference",
          head: ["Level", "Definition", "Examples"],
          rows: [
            ["Data", "Restructuring the way data is organized or represented in the code.", "Rename variables · Encapsulate variables · Initialize variables · Replace Magic Number · Replace Array with Object"],
            ["Statement", "Improving individual statements or expressions within methods.", "Extract command · Remove fragments · Split statements · Decompose expressions"],
            ["Routine", "Restructuring entire methods/routines for readability and maintainability.", "Extract method · Collapse method · Move method · Delete method"],
            ["Class", "Restructuring and improving the organization of code within a class.", "Split class · Combine classes · Extract abstract interface · Restrict access · Change hierarchy · Design patterns"],
            ["System", "Changes to the overall architecture and structure components of software.", "Architecture change · Data migration · Security enhancements · Legacy system migration · CI/CD implementation"],
          ],
        },
        {
          kind: "connect",
          text: "Match the smells to the levels. **Magic number** → Data (Replace Magic Number). **Long method** → Routine (Extract Method). **Poor cohesion** → Class (Split Class). **Public attribute** → Class (Restrict access) or Data (Encapsulate variable).",
        },
        {
          kind: "pitfall",
          text: "Watch the near-twins: **Extract command** is STATEMENT level, but **Extract method** is ROUTINE level. *Security enhancements* and *CI/CD implementation* are SYSTEM-level refactorings.",
        },
        {
          kind: "check",
          q: {
            id: "l9c4",
            topic: "L9",
            type: "mcq",
            q: "\"Replace Array with Object\" belongs to which refactoring level?",
            options: ["Statement", "Routine", "Data", "Class"],
            answer: 2,
            explain: "It changes how data is represented, so it is a DATA-level refactoring.",
          },
        },
        {
          kind: "check",
          q: {
            id: "l9c5",
            topic: "L9",
            type: "mcq",
            q: "Moving a monolith to microservices and setting up a CI/CD pipeline are examples of refactoring at the…",
            options: ["Class level", "System level", "Routine level", "Statement level"],
            answer: 1,
            explain: "Architecture change, legacy migration, and CI/CD implementation are SYSTEM-level refactorings.",
          },
        },
        {
          kind: "feynman",
          prompt: "Explain to a first-year student, in 3–4 sentences, what refactoring is and how you know when to do it.",
          model: "Refactoring means cleaning up how code is built inside without changing what it does for the user. We do it to make code easier to read, understand, and change later. We know it's time when we notice code smells, such as duplicated code, very long methods, or classes that do too many unrelated things. We can refactor at different sizes: a variable, a statement, a method, a class, or the whole system.",
        },
      ],
    },
  ],
  takeaways: [
    "Software evolution is inherent and continuous. It can make software **evolve** (quality up) or **devolve** (quality down).",
    "Refactoring = change **internal structure**, keep **external behavior**. It is triggered by requirement, implementation, or design changes.",
    "Goals: **Readability**, **Understandability**, and **Flexibility** (RUF).",
    "Code smells are indicators, **not bugs**, and are often **management issues**. Common ones: duplicated code, long method, poor cohesion.",
    "Five levels: **Data → Statement → Routine → Class → System**.",
  ],
  flashcards: [
    { id: "f9-1", front: "Define refactoring.", back: "Restructuring existing code, changing its internal structure WITHOUT changing its external behavior, to improve quality, maintainability, and readability." },
    { id: "f9-2", front: "Software evolution: definition + 3 keywords", back: "Developing, maintaining, and updating software for various reasons; complex and risky. Keywords: Opportunity, Quality, Challenging." },
    { id: "f9-3", front: "4 signs software EVOLVES", back: "Bugs fixed · useless code removed · bad code improved · complexity reduced." },
    { id: "f9-4", front: "4 signs software DEVOLVES", back: "Band-aid fixes · short-cuts · poorly thought-out design · undocumented changes." },
    { id: "f9-5", front: "3 triggers of refactoring", back: "Requirements change · Implementation changes · Design changes (RID)." },
    { id: "f9-6", front: "Refactoring goals + examples", back: "Readability: magic constants, names, long methods. Understandability: class hierarchy, dead code, fixing design. Flexibility: interfaces, APIs, architecture." },
    { id: "f9-7", front: "What is a code smell? (2 key facts)", back: "An indicator of potential issues/areas of improvement. NOT bugs; often management issues." },
    { id: "f9-8", front: "3 common code smells from the lecture", back: "Duplicated code · Long method · Poor cohesion." },
    { id: "f9-9", front: "Data-level refactorings", back: "Rename, encapsulate, initialize variables · Replace magic number · Replace array with object." },
    { id: "f9-10", front: "Statement-level refactorings", back: "Extract command · Remove fragments · Split statements · Decompose expressions." },
    { id: "f9-11", front: "Routine-level refactorings", back: "Extract method · Collapse method · Move method · Delete method." },
    { id: "f9-12", front: "Class-level refactorings", back: "Split class · Combine classes · Extract abstract interface · Restrict access · Change hierarchy · Design patterns." },
    { id: "f9-13", front: "System-level refactorings", back: "Architecture change · Data migration · Security enhancements · Legacy system migration · CI/CD implementation." },
    { id: "f9-14", front: "8 smells in the 'Finding code smells' exercise", back: "Naming, public attribute, magic number, unused variable, empty method, naming, possible dependence, empty method." },
  ],
};

export default L9;
