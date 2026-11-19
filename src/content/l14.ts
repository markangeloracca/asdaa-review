import type { Lesson } from "@/lib/types";

const L14: Lesson = {
  id: "L14",
  number: 14,
  title: "Architecting for Security",
  tagline: "Design it secure. Don't bolt it on later.",
  sections: [
    {
      id: "l14-cost",
      title: "The Cost of Cybercrime & Architecture Security",
      slides: "Lecture 14 · Slides 2–3",
      blocks: [
        {
          kind: "hook",
          title: "Why this matters",
          text: "A single data breach costs a Canadian organization about **CAD 7.11 million** on average. Most breaches don't happen because the attacker was a genius. They happen because security was never **designed in**.",
        },
        {
          kind: "objectives",
          items: [
            "Recall key cost-of-cybercrime figures and the top threats",
            "Define software architecture security and its three keywords",
            "Explain each part of the CIA triad and its supporting measures",
            "Classify threats: human, environmental, criminal, and new/emerging",
            "Match the four secure architecture practices to their purpose",
          ],
        },
        {
          kind: "table",
          title: "Cost of cybercrime (Slide 2)",
          head: ["Metric", "Figure (source)"],
          rows: [
            ["Global losses", "USD 10.8 trillion projected annual cybercrime damages (Cybersecurity Ventures, 2026)"],
            ["Average cost per breach (global)", "USD 4.99 million (IBM, 2026)"],
            ["Canadian average per breach", "CAD 7.11 million (IBM, 2026)"],
            ["Small businesses", "15% of Canadian small businesses had cybersecurity incidents in 2025 (Statistics Canada, 2026)"],
            ["Top threats", "Ransomware · Phishing & social engineering · Vulnerability exploitation · Supply-chain compromises"],
          ],
        },
        {
          kind: "mnemonic",
          title: "Numbers hook: \"10.8 · 4.99 · 7.11 · 15\"",
          text: "Picture a **10.8**-trillion-dollar pile of cash. A breach costs about **5 million** worldwide (4.99), but **7-Eleven** in Canada (7.11). And **15%** of small shops got hit. Top threats are \"**R**eally **P**ainful **V**ulnerable **S**upply\": **R**ansomware, **P**hishing, **V**ulnerability exploitation, **S**upply-chain.",
        },
        {
          kind: "concept",
          term: "Software Architecture Security",
          definition: "The design principles, patterns, and practices employed to ensure that a software system is resilient against security threats and vulnerabilities.",
          body: "**Motivation:** protect the **confidentiality, integrity, and availability** of sensitive data and resources.",
        },
        {
          kind: "pillars",
          title: "Architecture security keywords",
          items: [
            { k: "Security layers", v: "Several layers of defense." },
            { k: "Error handling", v: "Fail safely without leaking information." },
            { k: "Access control", v: "Only the right people can do the right things." },
          ],
        },
        {
          kind: "check",
          q: {
            id: "l14c1",
            topic: "L14",
            type: "mcq",
            q: "According to the lecture, the average cost of a data breach in Canada is about…",
            options: ["USD 4.99 million", "CAD 7.11 million", "USD 10.8 trillion", "CAD 15 million"],
            answer: 1,
            explain: "CAD 7.11 million (IBM, 2026). USD 4.99M is the global average, and USD 10.8T is total global annual damages.",
          },
        },
      ],
    },
    {
      id: "l14-cia",
      title: "The CIA Triad",
      slides: "Lecture 14 · Slides 4–7",
      blocks: [
        {
          kind: "concept",
          term: "CIA Triangle (CIA Triad)",
          definition: "A widely used model in information security that represents the core objectives of cybersecurity.",
          body: "**Motivation:** these three principles are the foundation for designing and implementing effective security measures to protect information and systems.",
        },
        { kind: "diagram", id: "cia" },
        {
          kind: "table",
          title: "CIA in detail",
          head: ["Principle", "Meaning", "Measures in the text", "Slide keywords"],
          rows: [
            ["Confidentiality", "Information is accessible only to authorized individuals or entities and stays hidden from unauthorized parties.", "Encryption · Access controls · Data classification", "Access control mechanisms · Secure authentication · Encrypt sensitive data"],
            ["Integrity", "Accuracy, completeness, and trustworthiness of data. Protects it from unauthorized modification, deletion, or tampering.", "Checksums · Digital signatures · Access controls", "Data validation · Version control systems · Audit trails"],
            ["Availability", "Information and resources are accessible and usable by authorized users whenever needed. Prevents disruptions, downtime, and DoS.", "Redundancy · Fault tolerance · Disaster recovery planning", "Continuous availability · Disaster recovery plans · Load balancing"],
          ],
        },
        {
          kind: "mnemonic",
          title: "C-I-A in one line each",
          text: "**C**onfidentiality = **Can't see it** (unless authorized). **I**ntegrity = **Isn't changed** (unless authorized). **A**vailability = **Always there** (when authorized users need it).",
        },
        {
          kind: "analogy",
          text: "A bank vault. **Confidentiality**: only key holders can look inside. **Integrity**: nobody can swap the gold for painted lead, and an audit log records every opening. **Availability**: the vault opens during business hours even if one lock breaks, because there is a backup mechanism.",
        },
        {
          kind: "pitfall",
          text: "**Access control** shows up under both confidentiality and integrity. If a question is about *who can read* the data, the answer is confidentiality. If it's about *who can change* it, the answer is integrity. **Load balancing** and **disaster recovery** are always **availability**.",
        },
        {
          kind: "check",
          q: {
            id: "l14c2",
            topic: "L14",
            type: "mcq",
            q: "A hospital uses checksums and audit trails to make sure nobody silently alters patient records. Which CIA principle?",
            options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
            answer: 1,
            explain: "Preventing unauthorized modification or tampering is INTEGRITY. Checksums, digital signatures, audit trails, and version control support it.",
          },
        },
        {
          kind: "check",
          q: {
            id: "l14c3",
            topic: "L14",
            type: "mcq",
            q: "Load balancing and disaster recovery plans mainly protect…",
            options: ["Confidentiality", "Integrity", "Availability", "Fairness"],
            answer: 2,
            explain: "Availability keywords: continuous availability, disaster recovery plans, load balancing.",
          },
        },
      ],
    },
    {
      id: "l14-threats",
      title: "Security Threats",
      slides: "Lecture 14 · Slides 8–13",
      blocks: [
        { kind: "diagram", id: "threats", caption: "Three sources of threats converge on information systems. The weak point is often YOUR CODE." },
        {
          kind: "table",
          title: "Threat categories",
          head: ["Category", "Definition", "Keywords", "Examples"],
          rows: [
            ["Human threats", "Risks from individuals who **intentionally or unintentionally** compromise systems, data, or assets.", "Insider threats · Unintentional errors · Social engineering", "System failure · Poor system design · Insufficient/inaccurate data · Data contamination"],
            ["Environmental threats", "Risks from natural disasters or physical security breaches that disrupt systems or compromise data.", "Natural disasters · Physical security breaches", "Fire · Smoke · Earthquake · Flooding · Blizzard · Strangers"],
            ["Criminal threats", "Malicious activities by cybercriminals, such as malware attacks, cyber espionage, or data breaches, that exploit vulnerabilities and cause harm.", "Malware · Data breaches · Cyberattacks", "Hackers · Employee sloppy conduct"],
          ],
        },
        {
          kind: "mnemonic",
          title: "\"HEC, they're coming for YOUR CODE\"",
          text: "**H**uman · **E**nvironmental · **C**riminal (computer crime). All three point at information systems, and the slide's punchline is that the weakest link is often **your code**.",
        },
        {
          kind: "pitfall",
          text: "**Strangers** (someone walking into the server room) is listed as an **environmental** threat under physical security breaches. **Employee sloppy conduct** is listed under **criminal** threats on the slide. **Poor system design** is a **human** threat example.",
        },
        {
          kind: "table",
          title: "New and emerging threats (Slide 13)",
          head: ["Threat", "What it is"],
          rows: [
            ["Prompt injection", "Malicious inputs that trick a language model into revealing secrets or executing unintended instructions."],
            ["Data poisoning", "Deliberate insertion of bad or misleading training data to bias or break models."],
            ["Deepfakes", "Synthetic audio/video used to impersonate staff or users to bypass human checks or social-auth flows."],
          ],
        },
        {
          kind: "mnemonic",
          title: "Emerging = \"PDD\": Prompt, Data, Deepfake",
          text: "Think about where each one attacks. **Prompt injection** attacks the **input** to the AI. **Data poisoning** attacks its **training**. **Deepfakes** attack the **human** who has to verify someone.",
        },
        {
          kind: "check",
          q: {
            id: "l14c4",
            topic: "L14",
            type: "mcq",
            q: "An attacker uploads thousands of mislabeled images so a fraud-detection model learns the wrong patterns. This is…",
            options: ["Prompt injection", "Data poisoning", "Deepfake", "Social engineering"],
            answer: 1,
            explain: "Deliberately inserting bad or misleading training data to bias or break a model = DATA POISONING.",
          },
        },
        {
          kind: "check",
          q: {
            id: "l14c5",
            topic: "L14",
            type: "mcq",
            q: "A flood knocks out the data centre. Which threat category?",
            options: ["Human", "Environmental", "Criminal", "Emerging"],
            answer: 1,
            explain: "Natural disasters (fire, smoke, earthquake, flooding, blizzard) are ENVIRONMENTAL threats.",
          },
        },
      ],
    },
    {
      id: "l14-practices",
      title: "Secure Architecture Practices",
      slides: "Lecture 14 · Slide 14",
      blocks: [
        {
          kind: "table",
          title: "The four practices",
          head: ["Practice", "Description", "Architectural purpose"],
          rows: [
            ["Zero-Trust Architecture", "\"Never trust, always verify.\" Every request is authenticated and authorized.", "Protects from insider AND external threats by enforcing continuous identity and context checks."],
            ["DevSecOps", "Embeds security checks throughout the CI/CD pipeline.", "Detects vulnerabilities early, automating scans and compliance during build and deployment."],
            ["Defense-in-Depth", "Overlapping layers of controls: network, app, data, and user.", "Limits blast radius. Even if one layer fails, others keep protecting."],
            ["Secure-by-Design", "Builds security principles (least privilege, safe defaults, input validation) into the architecture.", "Prevents common flaws by building security thinking into every design decision."],
          ],
        },
        { kind: "diagram", id: "defense-in-depth", caption: "Defense-in-depth: an attacker has to get through every layer." },
        {
          kind: "mnemonic",
          title: "\"Zebras Don't Drive Safely\"",
          text: "**Z**ero-trust (verify every request) · **D**evSecOps (security in the pipeline) · **D**efense-in-depth (layers) · **S**ecure-by-design (built in from the start).",
        },
        {
          kind: "connect",
          text: "Connect across the course. **DevSecOps** extends the CI/CD pipeline, which is a **system-level refactoring** (L9). **Security testing** (L12) looks for vulnerabilities. **Security enhancements** are also a system-level refactoring. Skipping security creates **technical debt** (L10).",
        },
        {
          kind: "check",
          q: {
            id: "l14c6",
            topic: "L14",
            type: "mcq",
            q: "\"Even if the firewall is bypassed, app-level authorization and data encryption still protect the records.\" This describes…",
            options: ["Zero-Trust", "DevSecOps", "Defense-in-Depth", "Secure-by-Design"],
            answer: 2,
            explain: "Overlapping layers that limit the blast radius when one fails = DEFENSE-IN-DEPTH.",
          },
        },
        {
          kind: "check",
          q: {
            id: "l14c7",
            topic: "L14",
            type: "mcq",
            q: "Which practice is summarized as \"Never trust, always verify\"?",
            options: ["Zero-Trust Architecture", "Defense-in-Depth", "Secure-by-Design", "DevSecOps"],
            answer: 0,
            explain: "Zero-Trust: every request is authenticated and authorized, with continuous identity and context checks.",
          },
        },
        {
          kind: "feynman",
          prompt: "Explain the CIA triad and pick one secure architecture practice that supports it. Give a concrete example.",
          model: "Confidentiality means only authorized people can see the data, using encryption, access control, and authentication. Integrity means the data can't be changed without authorization, using validation, checksums, signatures, audit trails, and version control. Availability means the system is there when it's needed, using redundancy, load balancing, and disaster recovery. Zero-trust supports confidentiality and integrity by authenticating and authorizing every single request. For example, even an internal service must prove who it is before it can read patient records.",
        },
      ],
    },
  ],
  takeaways: [
    "Cybercrime: USD 10.8T per year globally, USD 4.99M per breach globally, CAD 7.11M per breach in Canada, and 15% of Canadian small businesses hit in 2025.",
    "Architecture security = principles, patterns, and practices that make a system resilient. It protects C-I-A. Keywords: security layers, error handling, access control.",
    "**C**onfidentiality (encrypt, access control, auth) · **I**ntegrity (validation, VCS, audit trails, checksums, signatures) · **A**vailability (continuous availability, DR, load balancing).",
    "Threats: Human (insider, errors, social engineering) · Environmental (disasters, physical breaches) · Criminal (malware, breaches, cyberattacks) · Emerging (prompt injection, data poisoning, deepfakes).",
    "Practices: Zero-Trust · DevSecOps · Defense-in-Depth · Secure-by-Design.",
  ],
  flashcards: [
    { id: "f14-1", front: "4 cost-of-cybercrime figures", back: "USD 10.8T global annual damages · USD 4.99M avg breach (global) · CAD 7.11M avg breach (Canada) · 15% of Canadian small businesses had incidents in 2025." },
    { id: "f14-2", front: "Top 4 threats (Slide 2)", back: "Ransomware · Phishing & social engineering · Vulnerability exploitation · Supply-chain compromises." },
    { id: "f14-3", front: "Software architecture security (def + keywords)", back: "Design principles, patterns, practices ensuring resilience against threats/vulnerabilities; protects CIA. Security layers · Error handling · Access control." },
    { id: "f14-4", front: "Confidentiality", back: "Accessible only to authorized parties. Encryption, access controls, data classification. Keywords: access control mechanisms, secure authentication, encrypt sensitive data." },
    { id: "f14-5", front: "Integrity", back: "Accuracy, completeness, trustworthiness; no unauthorized modification. Checksums, digital signatures, access controls. Keywords: data validation, version control systems, audit trails." },
    { id: "f14-6", front: "Availability", back: "Accessible to authorized users whenever needed; prevent downtime/DoS. Redundancy, fault tolerance, DR planning. Keywords: continuous availability, DR plans, load balancing." },
    { id: "f14-7", front: "Human threats", back: "Intentional or unintentional compromise. Insider threats · Unintentional errors · Social engineering. Ex: system failure, poor design, insufficient/inaccurate data, data contamination." },
    { id: "f14-8", front: "Environmental threats", back: "Natural disasters · Physical security breaches. Ex: fire, smoke, earthquake, flooding, blizzard, strangers." },
    { id: "f14-9", front: "Criminal threats", back: "Malicious cybercriminal activity: malware, cyber espionage, data breaches. Keywords: malware, data breaches, cyberattacks. Ex: hackers, employee sloppy conduct." },
    { id: "f14-10", front: "3 new & emerging threats", back: "Prompt injection (trick an LLM) · Data poisoning (bad training data) · Deepfakes (synthetic A/V impersonation)." },
    { id: "f14-11", front: "Zero-Trust vs. DevSecOps", back: "Zero-Trust: never trust, always verify; every request authN/authZ. DevSecOps: security checks throughout CI/CD; early detection, automated scans." },
    { id: "f14-12", front: "Defense-in-Depth vs. Secure-by-Design", back: "DiD: overlapping layers (network, app, data, user) limit blast radius. SbD: least privilege, safe defaults, input validation built into architecture." },
  ],
};

export default L14;
