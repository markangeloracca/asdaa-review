import type { ReactNode } from "react";
import type { DiagramId } from "@/lib/types";

const T = "fill-slate-700";
const S = { fontSize: 13, fontFamily: "inherit" } as const;

function Svg({ vb, children, label }: { vb: string; children: ReactNode; label: string }) {
  return (
    <svg viewBox={vb} role="img" aria-label={label} className="h-auto w-full select-none" style={S}>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" className="fill-slate-500" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

function Box({ x, y, w, h, fill, label, sub, light }: { x: number; y: number; w: number; h: number; fill: string; label: string; sub?: string; light?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} className={fill} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 5)} textAnchor="middle" className={light ? "fill-slate-800 font-semibold" : "fill-white font-semibold"}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fontSize={11} className={light ? "fill-slate-600" : "fill-white/90"}>
          {sub}
        </text>
      )}
    </g>
  );
}

const Arrow = ({ d, dashed }: { d: string; dashed?: boolean }) => (
  <path d={d} fill="none" strokeWidth={2} className="stroke-slate-500" markerEnd="url(#arr)" strokeDasharray={dashed ? "5 5" : undefined} />
);

function Chips({ groups }: { groups: { title: string; tone: string; items: [string, string][] }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {groups.map((g) => (
        <div key={g.title} className={`rounded-xl border p-3 ${g.tone}`}>
          <div className="mb-2 text-xs font-bold uppercase tracking-wide opacity-80">{g.title}</div>
          <div className="flex flex-wrap gap-2">
            {g.items.map(([k, v]) => (
              <span key={k} className="rounded-lg bg-white/80 px-2.5 py-1 text-sm shadow-sm">
                <b>{k}</b> <span className="text-slate-500">· {v}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const DIAGRAMS: Record<DiagramId, () => ReactNode> = {
  "evolve-devolve": () => (
    <Svg vb="0 0 640 220" label="Software evolves or devolves">
      <Box x={10} y={88} w={150} h={44} fill="fill-slate-700" label="Software change" />
      <Arrow d="M160 100 C 200 70, 210 55, 240 50" />
      <Arrow d="M160 120 C 200 150, 210 165, 240 170" />
      <Box x={242} y={25} w={140} h={50} fill="fill-emerald-600" label="EVOLVES" sub="quality improves ↑" />
      <Box x={242} y={145} w={140} h={50} fill="fill-rose-600" label="DEVOLVES" sub="quality degrades ↓" />
      <text x={398} y={42} className={T} fontSize={12.5}>bugs fixed · useless code removed</text>
      <text x={398} y={62} className={T} fontSize={12.5}>bad code improved · complexity ↓</text>
      <text x={398} y={162} className={T} fontSize={12.5}>band-aid fixes · short-cuts</text>
      <text x={398} y={182} className={T} fontSize={12.5}>poor design · undocumented changes</text>
    </Svg>
  ),
  "refactor-levels": () => {
    const lv = [
      ["Data", "rename · encapsulate · magic number", "fill-teal-300"],
      ["Statement", "extract command · split · decompose", "fill-teal-400"],
      ["Routine", "extract / collapse / move / delete method", "fill-teal-500"],
      ["Class", "split · combine · interface · hierarchy", "fill-teal-600"],
      ["System", "architecture · migration · security · CI/CD", "fill-teal-700"],
    ];
    return (
      <Svg vb="0 0 640 250" label="Five refactoring levels">
        {lv.map(([n, ex, c], i) => {
          const w = 200 + i * 100;
          const x = (640 - w) / 2;
          return (
            <g key={n}>
              <rect x={x} y={10 + i * 47} width={w} height={40} rx={8} className={c} />
              <text x={320} y={27 + i * 47} textAnchor="middle" className={i < 2 ? "fill-slate-900 font-bold" : "fill-white font-bold"}>{`${i + 1}. ${n}`}</text>
              <text x={320} y={43 + i * 47} textAnchor="middle" fontSize={11} className={i < 2 ? "fill-slate-800" : "fill-white/90"}>{ex}</text>
            </g>
          );
        })}
      </Svg>
    );
  },
  "debt-curve": () => (
    <Svg vb="0 0 600 300" label="Technical debt curve">
      <Arrow d="M60 270 L60 20" />
      <Arrow d="M60 270 L580 270" />
      <text x={20} y={150} transform="rotate(-90 20 150)" textAnchor="middle" className={T}>Cost / effort</text>
      <text x={570} y={290} textAnchor="end" className={T}>Time →</text>
      <path d="M60 200 C 250 195, 420 150, 560 40" fill="none" strokeWidth={3} className="stroke-rose-500" />
      <text x={100} y={188} className="fill-rose-600 font-semibold">Technical debt</text>
      <path d="M60 225 C 250 222, 420 200, 560 120" fill="none" strokeWidth={3} strokeDasharray="7 5" className="stroke-amber-500" />
      <text x={290} y={206} className="fill-amber-600 font-semibold">Maintenance</text>
      <path d="M60 240 L560 240" fill="none" strokeWidth={2} strokeDasharray="10 6" className="stroke-slate-500" />
      <text x={330} y={258} className="fill-slate-600 italic">Optimal maintenance</text>
      <path d="M520 145 L520 233" strokeWidth={2} className="stroke-slate-700" markerEnd="url(#arr)" markerStart="url(#arr)" />
      <text x={528} y={195} className="fill-slate-800 font-bold">Interest</text>
    </Svg>
  ),
  "review-ladder": () => {
    const st = [
      ["Pair programming", "real-time, 2 devs", "fill-amber-300"],
      ["Informal review", "ad-hoc, no guidelines", "fill-amber-400"],
      ["Code walkthrough", "line-by-line, diverse", "fill-amber-500"],
      ["Technical inspection", "checklist · severity", "fill-amber-600"],
    ];
    return (
      <Svg vb="0 0 640 230" label="Quality checkpoints from informal to formal">
        {st.map(([n, s], i) => (
          <g key={n}>
            <rect x={20 + i * 152} y={170 - i * 45} width={145} height={45 + i * 45} rx={8} className={st[i][2]} />
            <text x={92 + i * 152} y={192 - i * 45} textAnchor="middle" fontSize={12.5} className="fill-slate-900 font-bold">{n}</text>
            <text x={92 + i * 152} y={208 - i * 45} textAnchor="middle" fontSize={11} className="fill-slate-800">{s}</text>
          </g>
        ))}
        <Arrow d="M30 20 L600 20" />
        <text x={320} y={14} textAnchor="middle" className={T}>more formal · more structured · more documented →</text>
      </Svg>
    );
  },
  "quality-pillars": () => (
    <Svg vb="0 0 600 220" label="Software quality pillars">
      <path d="M40 70 L300 15 L560 70 Z" className="fill-sky-600" />
      <text x={300} y={58} textAnchor="middle" className="fill-white font-bold">SOFTWARE QUALITY</text>
      {[
        ["Process", "effectiveness"],
        ["User", "satisfaction"],
        ["System", "efficacy"],
      ].map(([a, b], i) => (
        <g key={a}>
          <rect x={70 + i * 170} y={80} width={120} height={100} rx={6} className="fill-sky-100 stroke-sky-400" />
          <text x={130 + i * 170} y={124} textAnchor="middle" className="fill-sky-900 font-bold">{a}</text>
          <text x={130 + i * 170} y={142} textAnchor="middle" className="fill-sky-800">{b}</text>
        </g>
      ))}
      <rect x={40} y={186} width={520} height={18} rx={4} className="fill-sky-300" />
      <text x={300} y={199} textAnchor="middle" fontSize={11} className="fill-sky-900">meets specified requirements + user expectations</text>
    </Svg>
  ),
  "testing-timeline": () => {
    const e = [
      ["1980–90", "Waterfall", "Manual|testing"],
      ["1990–00", "Experimentation", "Bulky|automation"],
      ["2000–10", "Agile", "Robust tools|+ open source"],
      ["2010–18", "DevOps & CT", "Scalable tools|& frameworks"],
      ["2019+", "Smart testing", "Autonomous|ML & AI"],
    ];
    return (
      <Svg vb="0 0 640 180" label="Software testing over the years">
        <Arrow d="M20 90 L625 90" />
        {e.map(([y, m, t], i) => {
          const x = 70 + i * 125;
          return (
            <g key={y}>
              <circle cx={x} cy={90} r={12} className={["fill-sky-200", "fill-sky-300", "fill-sky-400", "fill-sky-600", "fill-sky-800"][i]} />
              <text x={x} y={44} textAnchor="middle" fontSize={12} className="fill-slate-800 font-semibold">{t.split("|")[0]}</text>
              <text x={x} y={60} textAnchor="middle" fontSize={12} className="fill-slate-800 font-semibold">{t.split("|")[1]}</text>
              <text x={x} y={125} textAnchor="middle" className="fill-sky-800 font-bold">{y}</text>
              <text x={x} y={143} textAnchor="middle" fontSize={12} className={T}>{m}</text>
            </g>
          );
        })}
      </Svg>
    );
  },
  "box-spectrum": () => (
    <Svg vb="0 0 640 200" label="Black, grey and white box testing">
      {[
        ["BLACK BOX", "behavior via UI / API", "no internal knowledge", "fill-slate-900", "fill-white"],
        ["GREY BOX", "design docs · APIs · DB schema", "limited knowledge", "fill-slate-400", "fill-slate-900"],
        ["WHITE BOX", "source code · paths · coverage", "aka structural / glass", "fill-white stroke-slate-400", "fill-slate-900"],
      ].map(([n, a, b, f, tf], i) => (
        <g key={n}>
          <rect x={20 + i * 210} y={20} width={180} height={110} rx={10} className={f} strokeWidth={2} />
          {i > 0 && [0, 1, 2, 3].slice(0, i * 2).map((k) => <rect key={k} x={45 + i * 210} y={45 + k * 14} width={70 + ((k * 23) % 60)} height={6} rx={3} className="fill-emerald-500/70" />)}
          <text x={110 + i * 210} y={i === 0 ? 80 : 120} textAnchor="middle" className={`${tf} font-bold`}>{n}</text>
          <text x={110 + i * 210} y={155} textAnchor="middle" fontSize={12} className="fill-slate-800">{a}</text>
          <text x={110 + i * 210} y={173} textAnchor="middle" fontSize={11} className="fill-slate-500">{b}</text>
        </g>
      ))}
    </Svg>
  ),
  "testing-levels": () => (
    <Svg vb="0 0 700 240" label="Testing levels">
      {[
        ["Acceptance", "user's perspective · business needs", "fill-sky-800"],
        ["System", "whole system · functional + non-functional", "fill-sky-600"],
        ["Integration", "interactions · data exchange · interfaces", "fill-sky-500"],
        ["Unit", "components · by developers", "fill-sky-400"],
      ].map(([n, d, c], i) => {
        const w = 260 + i * 80;
        return (
          <g key={n}>
            <rect x={(520 - w) / 2} y={12 + i * 54} width={w} height={46} rx={8} className={c} />
            <text x={260} y={32 + i * 54} textAnchor="middle" className="fill-white font-bold">{n}</text>
            <text x={260} y={49 + i * 54} textAnchor="middle" fontSize={11} className="fill-white/90">{d}</text>
          </g>
        );
      })}
      <path d="M560 205 C 620 170, 620 60, 560 30" fill="none" strokeWidth={2.5} strokeDasharray="6 5" className="stroke-indigo-500" markerEnd="url(#arr)" />
      <text x={618} y={120} fontSize={12} className="fill-indigo-700 font-bold">Regression</text>
      <text x={618} y={136} fontSize={11} className="fill-indigo-600">re-run after</text>
      <text x={618} y={150} fontSize={11} className="fill-indigo-600">every change</text>
    </Svg>
  ),
  "test-types": () => (
    <Chips
      groups={[
        { title: "Does it work?", tone: "border-indigo-200 bg-indigo-50", items: [["Functional", "specifications"], ["Smoke", "basics"]] },
        { title: "Under pressure?", tone: "border-amber-200 bg-amber-50", items: [["Performance", "speed, stability, reliability, scalability"], ["Load", "multiple users"], ["Stress", "beyond normal"]] },
        { title: "Is it safe?", tone: "border-rose-200 bg-rose-50", items: [["Security", "vulnerabilities & risks"]] },
        { title: "Who is it for?", tone: "border-emerald-200 bg-emerald-50", items: [["Usability", "UI & UX"], ["Accessibility", "disabilities"], ["Localization", "idioms & regions"], ["Fairness", "bias & discrimination"]] },
        { title: "Real-world feedback", tone: "border-sky-200 bg-sky-50 sm:col-span-2", items: [["A/B", "two system versions"], ["Beta", "real users"]] },
      ]}
    />
  ),
  flows: () => (
    <Svg vb="0 0 560 330" label="Basic flow and alternative flows">
      <text x={280} y={22} textAnchor="middle" className="fill-slate-800 font-bold">START TEST</text>
      <path d="M280 32 L280 285" strokeWidth={4} className="stroke-slate-800" markerEnd="url(#arr)" />
      <text x={292} y={60} className="fill-slate-700">Basic flow</text>
      <text x={280} y={312} textAnchor="middle" className="fill-slate-800 font-bold">END TEST</text>
      <path d="M280 140 C 230 120, 225 90, 272 60" fill="none" strokeWidth={3} className="stroke-teal-500" markerEnd="url(#arr)" />
      <text x={222} y={112} textAnchor="end" className="fill-teal-700 font-semibold">Alt 3 → back to start</text>
      <path d="M282 110 C 340 120, 330 170, 290 205" fill="none" strokeWidth={3} className="stroke-orange-400" markerEnd="url(#arr)" />
      <text x={340} y={150} className="fill-orange-600 font-semibold">Alt 1 → rejoins, same end</text>
      <path d="M282 160 C 360 170, 400 200, 410 250" fill="none" strokeWidth={3} className="stroke-orange-600" markerEnd="url(#arr)" />
      <text x={418} y={268} className="fill-orange-700 font-semibold">Alt 2 → END</text>
      <path d="M278 190 C 210 200, 170 220, 160 250" fill="none" strokeWidth={3} className="stroke-blue-600" markerEnd="url(#arr)" />
      <text x={40} y={268} className="fill-blue-700 font-semibold">Alt 4 → END</text>
    </Svg>
  ),
  "adhoc-vs-exploratory": () => (
    <Svg vb="0 0 640 170" label="Ad-hoc, exploratory and scripted spectrum">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#fda4af" />
          <stop offset="0.5" stopColor="#fcd34d" />
          <stop offset="1" stopColor="#86efac" />
        </linearGradient>
      </defs>
      <rect x={20} y={60} width={600} height={18} rx={9} fill="url(#g1)" />
      <text x={20} y={45} className="fill-slate-600">less planning & documentation</text>
      <text x={620} y={45} textAnchor="end" className="fill-slate-600">more planning & documentation</text>
      {[
        [40, "AD-HOC", "spontaneous · informal", "non-reproducible"],
        [320, "EXPLORATORY", "charter + live notes", "traceable · reproducible"],
        [600, "SCRIPTED", "test cases written before", "no deviation"],
      ].map(([x, a, b, c]) => (
        <g key={a as string}>
          <circle cx={x as number} cy={69} r={11} className="fill-white stroke-slate-700" strokeWidth={3} />
          <text x={x as number} y={108} textAnchor={x === 40 ? "start" : x === 600 ? "end" : "middle"} className="fill-slate-900 font-bold">{a}</text>
          <text x={x as number} y={126} textAnchor={x === 40 ? "start" : x === 600 ? "end" : "middle"} fontSize={12} className={T}>{b}</text>
          <text x={x as number} y={143} textAnchor={x === 40 ? "start" : x === 600 ? "end" : "middle"} fontSize={12} className="fill-slate-500">{c}</text>
        </g>
      ))}
    </Svg>
  ),
  sdlc: () => {
    const t = [
      ["Analysis", "requirements", "current processes"],
      ["Design", "functional / technical", "business process"],
      ["Construction", "code · scripts", "database"],
      ["Test", "test cases · plan", "discrepancies"],
      ["Deliver", "migration plan", "data loading · change mgmt"],
    ];
    return (
      <Svg vb="0 0 640 230" label="Software development tasks">
        <Box x={120} y={10} w={90} h={30} fill="fill-slate-200" light label="Architecture" />
        <Box x={220} y={10} w={90} h={30} fill="fill-slate-200" light label="Standards" />
        <Arrow d="M165 40 L170 82" dashed />
        <Arrow d="M265 40 L190 82" dashed />
        <path d="M180 60 L430 60 L430 82" fill="none" strokeWidth={1.5} strokeDasharray="4 4" className="stroke-emerald-600" markerEnd="url(#arr)" />
        <text x={330} y={54} textAnchor="middle" fontSize={11} className="fill-emerald-700 font-semibold">Requirements Traceability Matrix (RTM)</text>
        {t.map(([n, a, b], i) => (
          <g key={n}>
            <Box x={10 + i * 126} y={88} w={108} h={42} fill="fill-emerald-600" label={n} />
            {i < 4 && <Arrow d={`M${118 + i * 126} 109 L${134 + i * 126} 109`} />}
            <text x={64 + i * 126} y={156} textAnchor="middle" fontSize={11} className={T}>{a}</text>
            <text x={64 + i * 126} y={172} textAnchor="middle" fontSize={11} className={T}>{b}</text>
          </g>
        ))}
      </Svg>
    );
  },
  "waterfall-vs-iterative": () => {
    const st = ["Requirements", "Design", "Development", "Testing", "Deployment", "Maintenance"];
    const ft = ["Vehicles", "Routes", "Purchase", "Employees", "Notifications"];
    return (
      <Svg vb="0 0 640 260" label="Waterfall versus iterative and incremental">
        <text x={150} y={18} textAnchor="middle" className="fill-slate-800 font-bold">Sequential (one pass)</text>
        {st.map((s, i) => (
          <g key={s}>
            <rect x={10 + i * 40} y={30 + i * 36} width={110} height={28} rx={6} className="fill-amber-400" />
            <text x={65 + i * 40} y={49 + i * 36} textAnchor="middle" fontSize={12} className="fill-slate-900 font-semibold">{s}</text>
            {i < 5 && <Arrow d={`M${120 + i * 40} ${44 + i * 36} L${130 + i * 40} ${60 + i * 36}`} />}
          </g>
        ))}
        <text x={490} y={18} textAnchor="middle" className="fill-slate-800 font-bold">Iterative & incremental (cycles)</text>
        <circle cx={490} cy={140} r={78} fill="none" strokeWidth={14} className="stroke-emerald-200" />
        <path d="M490 62 A78 78 0 1 1 412 140" fill="none" strokeWidth={4} className="stroke-emerald-600" markerEnd="url(#arr)" />
        <text x={490} y={136} textAnchor="middle" fontSize={12} className="fill-emerald-800 font-semibold">plan → design →</text>
        <text x={490} y={152} textAnchor="middle" fontSize={12} className="fill-emerald-800 font-semibold">build → test → repeat</text>
        {ft.map((f, i) => {
          const a = (i / ft.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <text key={f} x={490 + Math.cos(a) * 108} y={145 + Math.sin(a) * 100} textAnchor="middle" fontSize={11.5} className="fill-slate-700 font-semibold">
              {f}
            </text>
          );
        })}
      </Svg>
    );
  },
  kanban: () => (
    <div className="overflow-hidden rounded-xl bg-teal-700 p-3">
      <div className="mb-2 text-center font-semibold text-white">Kanban Board</div>
      <div className="grid grid-cols-4 gap-2">
        {[
          ["Backlog", "bg-rose-300", 4],
          ["Doing", "bg-amber-300", 2],
          ["Review", "bg-lime-300", 2],
          ["Done", "bg-sky-300", 3],
        ].map(([n, c, k]) => (
          <div key={n as string} className="rounded-lg bg-white p-2">
            <div className={`mb-2 rounded px-2 py-1 text-center text-xs font-bold text-slate-800 ${c}`}>
              {n as string}
              {n === "Doing" && <span className="ml-1 rounded bg-white/70 px-1">WIP ≤ 2</span>}
            </div>
            {Array.from({ length: k as number }).map((_, i) => (
              <div key={i} className="mb-1.5 h-5 rounded bg-slate-200" />
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
  scrum: () => (
    <Svg vb="0 0 640 260" label="Scrum framework">
      <Box x={10} y={95} w={100} h={56} fill="fill-cyan-700" label="Product" sub="Backlog" />
      <text x={60} y={84} textAnchor="middle" fontSize={11} className={T}>Product Goal</text>
      <Arrow d="M110 123 L140 123" />
      <Box x={140} y={100} w={90} h={46} fill="fill-cyan-600" label="Sprint" sub="Planning" />
      <Arrow d="M230 123 L255 123" />
      <Box x={255} y={95} w={90} h={56} fill="fill-cyan-700" label="Sprint" sub="Backlog" />
      <text x={300} y={84} textAnchor="middle" fontSize={11} className={T}>Sprint Goal</text>
      <Arrow d="M345 123 L370 123" />
      <circle cx={420} cy={123} r={48} className="fill-cyan-100 stroke-cyan-600" strokeWidth={3} />
      <text x={420} y={112} textAnchor="middle" fontSize={12} className="fill-cyan-900 font-bold">Scrum Team</text>
      <text x={420} y={128} textAnchor="middle" fontSize={11} className="fill-cyan-900">Dev · SM · PO</text>
      <text x={420} y={143} textAnchor="middle" fontSize={10.5} className="fill-cyan-800">Daily Scrum ↻</text>
      <Arrow d="M468 123 L495 123" />
      <Box x={495} y={95} w={130} h={56} fill="fill-cyan-700" label="Increment" sub="Definition of Done" />
      <Box x={515} y={185} w={110} h={36} fill="fill-cyan-500" label="Sprint Review" />
      <Arrow d="M560 151 L568 185" />
      <Box x={260} y={10} w={140} h={36} fill="fill-cyan-500" label="Sprint Retrospective" />
      <path d="M570 221 L570 245 L60 245 L60 151" fill="none" strokeWidth={2} className="stroke-slate-400" markerEnd="url(#arr)" />
      <path d="M625 123 L635 123 L635 28 L400 28" fill="none" strokeWidth={2} className="stroke-slate-400" markerEnd="url(#arr)" />
      <path d="M260 28 L185 28 L185 100" fill="none" strokeWidth={2} className="stroke-slate-400" markerEnd="url(#arr)" />
      <text x={320} y={240} textAnchor="middle" fontSize={11} className="fill-slate-500">next sprint (fixed-length iteration)</text>
    </Svg>
  ),
  cia: () => (
    <Svg vb="0 0 600 340" label="CIA triad">
      <path d="M300 30 L540 260 L60 260 Z" className="fill-rose-50 stroke-rose-400" strokeWidth={3} />
      <circle cx={300} cy={40} r={30} className="fill-rose-600" />
      <text x={300} y={47} textAnchor="middle" fontSize={20} className="fill-white font-bold">C</text>
      <circle cx={60} cy={255} r={30} className="fill-rose-500" />
      <text x={60} y={262} textAnchor="middle" fontSize={20} className="fill-white font-bold">I</text>
      <circle cx={540} cy={255} r={30} className="fill-rose-700" />
      <text x={540} y={262} textAnchor="middle" fontSize={20} className="fill-white font-bold">A</text>
      <text x={340} y={36} className="fill-rose-800 font-bold">Confidentiality</text>
      <text x={340} y={54} fontSize={11.5} className={T}>access control · authentication · encryption</text>
      <text x={20} y={308} className="fill-rose-800 font-bold">Integrity</text>
      <text x={20} y={326} fontSize={11.5} className={T}>validation · VCS · audit trails</text>
      <text x={585} y={308} textAnchor="end" className="fill-rose-800 font-bold">Availability</text>
      <text x={585} y={326} textAnchor="end" fontSize={11.5} className={T}>continuous · DR plans · load balancing</text>
      <text x={300} y={170} textAnchor="middle" className="fill-rose-900 font-semibold">core objectives of</text>
      <text x={300} y={188} textAnchor="middle" className="fill-rose-900 font-semibold">cybersecurity</text>
    </Svg>
  ),
  threats: () => (
    <Svg vb="0 0 600 250" label="Security threats">
      {[
        ["HUMAN", 100],
        ["ENVIRONMENT", 300],
        ["COMPUTER CRIME", 500],
      ].map(([n, x]) => (
        <g key={n as string}>
          <ellipse cx={x as number} cy={40} rx={85} ry={26} className="fill-slate-300" />
          <text x={x as number} y={45} textAnchor="middle" fontSize={12} className="fill-slate-800 font-bold">{n as string}</text>
          <Arrow d={`M${x} 68 L${300 + ((x as number) - 300) * 0.25} 150`} />
          <text x={(((x as number) + 300 + ((x as number) - 300) * 0.25) / 2) + 6} y={112} fontSize={11} className="fill-slate-500">threats</text>
        </g>
      ))}
      <rect x={190} y={152} width={220} height={48} rx={6} className="fill-slate-200 stroke-slate-500" strokeWidth={2} />
      <text x={300} y={182} textAnchor="middle" className="fill-slate-800 font-bold">INFORMATION SYSTEMS</text>
      <text x={300} y={232} textAnchor="middle" fontSize={18} className="fill-rose-600 font-extrabold">YOUR CODE!</text>
    </Svg>
  ),
  "defense-in-depth": () => (
    <Svg vb="0 0 600 260" label="Defense in depth">
      {[
        ["User", 120, "fill-rose-100"],
        ["Network", 92, "fill-rose-200"],
        ["Application", 64, "fill-rose-300"],
        ["Data", 36, "fill-rose-500"],
      ].map(([n, r, c], i) => (
        <g key={n as string}>
          <circle cx={300} cy={130} r={r as number} className={`${c} stroke-white`} strokeWidth={2} />
          <text x={300} y={130 - (r as number) + (i === 3 ? 42 : 18)} textAnchor="middle" fontSize={12} className={i === 3 ? "fill-white font-bold" : "fill-rose-900 font-semibold"}>
            {n as string}
          </text>
        </g>
      ))}
      <Arrow d="M40 40 L178 108" />
      <text x={20} y={30} fontSize={12} className="fill-slate-600">attacker</text>
      <text x={440} y={70} fontSize={12} className={T}>one layer fails →</text>
      <text x={440} y={88} fontSize={12} className={T}>others still protect</text>
      <text x={440} y={106} fontSize={12} className="fill-rose-700 font-semibold">(limits blast radius)</text>
    </Svg>
  ),
};

export function Diagram({ id, caption }: { id: DiagramId; caption?: string }) {
  const D = DIAGRAMS[id];
  return (
    <figure className="my-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {D ? D() : null}
      {caption && <figcaption className="mt-3 text-center text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
