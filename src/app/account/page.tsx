"use client";

import { useState } from "react";
import { useStudy } from "@/lib/store";
import { supabaseEnabled } from "@/lib/supabase";
import { cx } from "@/lib/utils";

export default function AccountPage() {
  const { session, sync, syncError, sendMagicLink, verifyCode, signOut, resetAll, attempts, progress } = useStudy();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [armed, setArmed] = useState(false);

  const send = async () => {
    setBusy(true);
    setMsg(null);
    const err = await sendMagicLink(email.trim());
    setBusy(false);
    if (err) setMsg(err);
    else setSent(true);
  };
  const verify = async () => {
    setBusy(true);
    setMsg(null);
    const err = await verifyCode(email.trim(), code);
    setBusy(false);
    if (err) setMsg(err);
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-6 md:px-8 md:py-10">
      <h1 className="font-display text-4xl font-bold">Sync & settings</h1>
      <p className="mt-2 text-lg text-slate-600">Your progress is always saved on this device. Sign in to sync it between your iPad, laptop and phone.</p>

      <div className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        {!supabaseEnabled ? (
          <>
            <div className="font-semibold">Local mode</div>
            <p className="mt-1 text-slate-600">
              Supabase isn't configured for this deployment, so everything is stored in this browser only. To enable sync, add <code className="rounded bg-slate-100 px-1">SUPABASE_URL</code> and{" "}
              <code className="rounded bg-slate-100 px-1">SUPABASE_PUBLISHABLE_KEY</code> in Vercel and redeploy (see README).
            </p>
          </>
        ) : session ? (
          <>
            <div className="text-sm text-slate-500">Signed in as</div>
            <div className="text-xl font-semibold">{session.user.email}</div>
            <div className={cx("mt-2 text-sm font-medium", sync === "error" ? "text-rose-600" : "text-emerald-600")}>
              {sync === "synced" ? "✓ Synced" : sync === "syncing" ? "Syncing…" : sync === "error" ? `Sync error: ${syncError}` : ""}
            </div>
            <button onClick={signOut} className="mt-4 min-h-12 rounded-xl border border-slate-300 px-5 font-semibold">
              Sign out
            </button>
          </>
        ) : (
          <>
            <div className="font-semibold">Sign in with email</div>
            <p className="mt-1 text-sm text-slate-600">No password. We email you a sign-in link (and a 6-digit code if your Supabase email template includes it).</p>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@ucalgary.ca"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-4 min-h-12 w-full rounded-xl border border-slate-300 px-4 text-base outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button onClick={send} disabled={busy || !email.includes("@")} className="mt-3 min-h-12 w-full rounded-xl bg-indigo-600 font-semibold text-white disabled:opacity-40">
              {busy && !sent ? "Sending…" : sent ? "Resend link" : "Email me a sign-in link"}
            </button>
            {sent && (
              <div className="mt-5 rounded-xl bg-indigo-50 p-4">
                <div className="text-sm text-indigo-900">
                  Check your inbox and open the link <b>on this device</b>. Or type the 6-digit code here:
                </div>
                <div className="mt-3 flex gap-2">
                  <input
                    inputMode="numeric"
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="min-h-12 flex-1 rounded-xl border border-slate-300 px-4 font-mono text-lg tracking-widest outline-none"
                  />
                  <button onClick={verify} disabled={busy || code.trim().length < 6} className="min-h-12 rounded-xl bg-ink px-5 font-semibold text-white disabled:opacity-40">
                    Verify
                  </button>
                </div>
              </div>
            )}
            {msg && <div className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{msg}</div>}
          </>
        )}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
        <div className="font-semibold">Your data</div>
        <ul className="mt-2 space-y-1 text-slate-600">
          <li>• {Object.keys(progress.steps).length} lesson steps completed</li>
          <li>• {Object.keys(progress.cards).length} flashcards in your Leitner boxes</li>
          <li>• {attempts.length} mock-exam attempts</li>
        </ul>
        <button
          onClick={async () => {
            if (!armed) return setArmed(true);
            await resetAll();
            setArmed(false);
          }}
          className={cx("mt-4 min-h-12 rounded-xl px-5 font-semibold", armed ? "bg-rose-600 text-white" : "border border-rose-300 text-rose-700")}
        >
          {armed ? "Tap again to erase everything" : "Reset all progress"}
        </button>
        {armed && (
          <button onClick={() => setArmed(false)} className="ml-3 text-sm text-slate-500 underline">
            cancel
          </button>
        )}
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600 ring-1 ring-slate-200">
        <b>iPad tip:</b> in Safari tap <b>Share → Add to Home Screen</b> to open this like an app, full-screen.
      </div>
    </div>
  );
}
