"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const ResearchScene = dynamic(() => import("@/components/ResearchScene"), { ssr: false });

const ENDPOINT = "https://script.google.com/macros/s/AKfycbyixPd_UBfHC2OYmNReb1W5ECH8tdk5Z2khyLu-BLHeC8zrISKGSG_jOwS7zXqEcuQtEQ/exec";

type Answers = Record<string, string | string[] | null>;
type Step =
  | { type: "intro" }
  | { type: "single"; key: string; q: string; options: string[] }
  | { type: "multi";  key: string; q: string; hint: string; limit: number; options: string[] }
  | { type: "text";   key: string; q: string; placeholder: string; long?: boolean; optional?: boolean }
  | { type: "thanks" };

const STEPS: Step[] = [
  { type: "intro" },
  { type: "single", key: "age_group",    q: "How old are you?",                                        options: ["18–21","22–25","26–30","30+"] },
  { type: "text",   key: "city",         q: "Where do you usually go out?",                            placeholder: "City or area…" },
  { type: "single", key: "frequency",    q: "How often do you go out in a month?",                     options: ["1–2 times","3–5 times","6+ times"] },
  { type: "single", key: "when",         q: "When do you usually go out?",                             options: ["Weekdays","Weekends","Both"] },
  { type: "single", key: "duration",     q: "How long do you typically stay?",                         options: ["1–2 hours","2–3 hours","3+ hours"] },
  { type: "single", key: "company",      q: "Who do you usually go with?",                             options: ["Alone","Partner","2–4 people","5+ people"] },
  { type: "single", key: "reason",       q: "What's your main reason for going out?",                  options: ["Food & drink","Work & chill","Entertainment","Socializing","Celebration"] },
  { type: "single", key: "spend",        q: "What's your typical spend per outing?",                   options: ["Under ₹1,000","₹1,000–₹3,000","₹3,000–₹5,000","₹5,000+"] },
  { type: "multi",  key: "spend_more",   q: "What makes you spend more?",                              hint: "Pick up to 3", limit: 3, options: ["People you're with","Quality of experience","Comfort & environment","Music & entertainment","Offers & pricing","Food quality","Occasion & mood"] },
  { type: "multi",  key: "choose_place", q: "What makes you choose a place?",                          hint: "Pick up to 3", limit: 3, options: ["Location","Ambience & environment","Pricing","Crowd & people","Music & entertainment","Reviews & recommendations","Past experience"] },
  { type: "single", key: "crowd_impact", q: "How much does the crowd affect your decision?",           options: ["A lot","Somewhat","Very little"] },
  { type: "multi",  key: "music_matters",q: "When music is part of the experience, what matters most?",hint: "Pick up to 2", limit: 2, options: ["Familiar songs","Ability to talk comfortably","Background vibe","Energy & atmosphere","Live performance"] },
  { type: "single", key: "energy_pref",  q: "What kind of energy do you prefer?",                     options: ["Mostly calm & comfortable","Balanced","High energy & exciting"] },
  { type: "single", key: "music_stay",   q: "Does music make you stay longer?",                       options: ["Yes","Sometimes","No"] },
  { type: "text",   key: "leave_or_stay",q: "What makes you leave early or stay longer?",             placeholder: "Tell us anything…", long: true, optional: true },
  { type: "text",   key: "frustrations", q: "What frustrates you most when you're out?",              placeholder: "Be honest — we want to know.", long: true, optional: true },
  { type: "thanks" },
];

const KEYED = STEPS.filter(s => s.type !== "intro" && s.type !== "thanks");
const TOTAL = KEYED.length;

function pct(idx: number) {
  if (idx === 0) return 0;
  if (idx >= STEPS.length - 1) return 100;
  const pos = KEYED.indexOf(STEPS[idx]);
  return pos === -1 ? 100 : Math.round(((pos + 1) / TOTAL) * 100);
}
function qlabel(idx: number) {
  const pos = KEYED.indexOf(STEPS[idx]);
  return pos === -1 ? "" : `Q${pos + 1} of ${TOTAL}`;
}

export default function ResearchPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const pulseRef = useRef(0);
  const subId = useRef("sub_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9));
  const wrapRef = useRef<HTMLDivElement>(null);

  const go = useCallback((dir: 1 | -1) => {
    if (transitioning) return;
    setTransitioning(true);
    const el = wrapRef.current;
    if (el) {
      el.style.transition = "opacity 0.18s ease, transform 0.18s ease";
      el.style.opacity = "0";
      el.style.transform = `translateY(${dir > 0 ? -20 : 20}px)`;
    }
    setTimeout(() => {
      setStep(s => s + dir);
      setTransitioning(false);
    }, 190);
  }, [transitioning]);

  // Animate in after step changes
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = "opacity 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }));
  }, [step]);

  const submitForm = useCallback((extra?: Answers) => {
    const fd = new FormData();
    fd.append("data", JSON.stringify({ ...answers, ...extra, submissionId: subId.current }));
    fetch(ENDPOINT, { method: "POST", mode: "no-cors", body: fd }).catch(() => {});
  }, [answers]);

  // Submit when reaching thanks
  useEffect(() => {
    if (STEPS[step].type === "thanks" && !submitted) {
      setSubmitted(true);
      submitForm();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const advance = useCallback(() => go(1), [go]);
  const back = useCallback(() => go(-1), [go]);

  const pick = (key: string, val: string) => {
    pulseRef.current += 1;
    setAnswers(a => ({ ...a, [key]: val }));
    setTimeout(() => advance(), 260);
  };

  const toggleMulti = (key: string, val: string, limit: number) => {
    pulseRef.current += 1;
    setAnswers(a => {
      const cur: string[] = Array.isArray(a[key]) ? (a[key] as string[]) : [];
      const on = cur.includes(val);
      if (on) return { ...a, [key]: cur.filter(v => v !== val) };
      const next = cur.length >= limit ? [...cur.slice(1), val] : [...cur, val];
      return { ...a, [key]: next };
    });
  };

  const s = STEPS[step];
  const showBack = step > 0 && s.type !== "thanks";

  // ── Thankyou state ─────────────────────────────────────────────────────────
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [emailDone, setEmailDone] = useState(false);
  const [declined, setDeclined] = useState(false);

  const handleYes = () => { setShowEmail(true); setDeclined(false); };
  const handleNo  = () => { setDeclined(true); setShowEmail(false); };
  const handleEmailSubmit = () => {
    if (!email.trim()) return;
    submitForm({ email: email.trim() });
    setEmailDone(true);
  };

  return (
    <>
      <style jsx global>{`
        html, body { margin: 0; padding: 0; overflow: hidden; }

        .rp-shell {
          position: fixed; inset: 0;
          background: #0A0A0A;
          display: flex; flex-direction: column;
          font-family: "Clash Display", sans-serif;
        }

        .rp-bar { position: relative; z-index: 20; height: 2px; background: rgba(255,255,255,0.06); flex-shrink: 0; }
        .rp-fill {
          height: 100%;
          background: linear-gradient(90deg, #E6D3A3, #F0DFB8, #E6D3A3);
          background-size: 200% auto;
          animation: rpShimmer 3s linear infinite;
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes rpShimmer { to { background-position: 200% center; } }

        .rp-back {
          position: absolute; z-index: 30; top: 18px; left: 22px;
          width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.3); transition: color 0.18s;
        }
        .rp-back:hover { color: #E6D3A3; }

        .rp-vignette {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(ellipse 65% 55% at 50% 50%, transparent 35%, rgba(10,10,10,0.75) 100%);
        }

        .rp-area {
          flex: 1; position: relative; z-index: 10;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; padding: 48px 32px 72px;
        }

        .rp-wrap {
          width: 100%; max-width: 560px;
          display: flex; flex-direction: column; gap: 0;
        }

        .rp-brand {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; font-weight: 500; color: #F5F5F5;
          margin-bottom: 40px; letter-spacing: -0.01em;
        }

        .rp-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.28);
          margin-bottom: 16px; display: block;
        }

        .rp-q {
          font-size: clamp(26px, 4.5vw, 48px);
          font-weight: 600; line-height: 1.1;
          letter-spacing: -0.02em; color: #F5F5F5;
          margin: 0 0 32px;
        }

        .rp-hint {
          font-size: 12px; color: rgba(255,255,255,0.28);
          letter-spacing: 0.04em; margin: -20px 0 20px;
        }

        .rp-sub {
          font-size: 15px; font-weight: 400;
          color: rgba(255,255,255,0.42); line-height: 1.65;
          margin: -12px 0 32px; max-width: 400px;
        }

        /* ── Options ── */
        .rp-opts { display: flex; flex-direction: column; gap: 8px; }

        .rp-opt {
          display: flex; align-items: center;
          min-height: 52px; padding: 13px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px; cursor: pointer;
          font-family: "Clash Display", sans-serif;
          font-size: 15px; font-weight: 400;
          color: rgba(255,255,255,0.58); text-align: left;
          transition: border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s;
          backdrop-filter: blur(6px);
        }
        .rp-opt:hover {
          border-color: rgba(255,255,255,0.2);
          color: #F5F5F5; background: rgba(255,255,255,0.06);
          transform: translateX(5px);
        }
        .rp-opt.selected {
          border-color: #E6D3A3; color: #E6D3A3;
          background: rgba(230,211,163,0.08); transform: translateX(5px);
        }

        .rp-check {
          width: 18px; height: 18px; flex-shrink: 0;
          border: 1px solid rgba(255,255,255,0.2); border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
          margin-right: 14px; transition: all 0.15s;
        }
        .rp-opt.multi-sel .rp-check { border-color: #E6D3A3; background: #E6D3A3; }
        .rp-opt.multi-sel { border-color: #E6D3A3; color: #E6D3A3; background: rgba(230,211,163,0.08); }
        .rp-check svg { display: none; }
        .rp-opt.multi-sel .rp-check svg { display: block; }

        /* ── Text input ── */
        .rp-text-wrap { width: 100%; }
        .rp-field {
          width: 100%; background: transparent; border: none;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          padding: 12px 0; color: #F5F5F5;
          font-family: "Clash Display", sans-serif; font-size: 20px; font-weight: 400;
          outline: none; resize: none; line-height: 1.45;
          transition: border-color 0.2s;
        }
        .rp-field::placeholder { color: rgba(255,255,255,0.18); }
        .rp-field:focus { border-color: #E6D3A3; }

        /* ── Buttons ── */
        .rp-btns { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; margin-top: 28px; }

        .rp-next {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: "Clash Display", sans-serif; font-size: 14px; font-weight: 600;
          color: #0A0A0A; background: #E6D3A3; border: none; border-radius: 5px;
          padding: 14px 28px; cursor: pointer; min-height: 52px;
          opacity: 0.35; pointer-events: none;
          transition: opacity 0.18s, transform 0.15s;
        }
        .rp-next.on { opacity: 1; pointer-events: all; }
        .rp-next.on:hover { transform: translateX(3px); }

        .rp-skip {
          font-family: "Clash Display", sans-serif; font-size: 13px; font-weight: 400;
          color: rgba(255,255,255,0.28); background: none; border: none;
          border-bottom: 1px solid transparent; cursor: pointer; padding: 4px 0;
          transition: color 0.15s, border-color 0.15s;
        }
        .rp-skip:hover { color: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.28); }

        /* ── Thankyou ── */
        .rp-ty-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 4px; }

        .rp-ty-yes {
          font-family: "Clash Display", sans-serif; font-size: 14px; font-weight: 600;
          padding: 14px 28px; border-radius: 5px; border: none;
          background: #E6D3A3; color: #0A0A0A; cursor: pointer; min-height: 52px;
          transition: opacity 0.18s, transform 0.15s;
        }
        .rp-ty-yes:hover { opacity: 0.88; transform: translateX(2px); }

        .rp-ty-no {
          font-family: "Clash Display", sans-serif; font-size: 14px; font-weight: 400;
          padding: 14px 28px; border-radius: 5px;
          background: transparent; color: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.1); cursor: pointer; min-height: 52px;
          transition: all 0.18s;
        }
        .rp-ty-no:hover { border-color: rgba(255,255,255,0.25); color: #F5F5F5; }

        .rp-email-row {
          display: flex; gap: 10px; margin-top: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 4px; max-width: 460px;
          transition: border-color 0.2s;
        }
        .rp-email-row:focus-within { border-color: #E6D3A3; }
        .rp-email-inp {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: "Clash Display", sans-serif; font-size: 18px; font-weight: 400;
          color: #F5F5F5; min-width: 160px; padding: 10px 0;
        }
        .rp-email-inp::placeholder { color: rgba(255,255,255,0.2); }
        .rp-email-sub {
          font-family: "Clash Display", sans-serif; font-size: 13px; font-weight: 600;
          background: #E6D3A3; color: #0A0A0A; border: none; border-radius: 4px;
          padding: 10px 18px; cursor: pointer; display: flex; align-items: center;
          transition: opacity 0.18s;
        }
        .rp-email-sub:hover { opacity: 0.88; }

        .rp-ty-msg {
          margin-top: 22px; font-size: 14px; font-weight: 400;
          color: rgba(255,255,255,0.4); line-height: 1.65; max-width: 360px;
        }
        .rp-ty-back {
          margin-top: 36px; font-family: "Clash Display", sans-serif;
          font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.28);
          text-decoration: none; border-bottom: 1px solid transparent; padding-bottom: 2px;
          transition: color 0.18s, border-color 0.18s; display: inline-block;
        }
        .rp-ty-back:hover { color: #E6D3A3; border-color: rgba(230,211,163,0.4); }

        @media (max-width: 480px) {
          .rp-area { padding: 40px 20px 60px; }
          .rp-opt { min-height: 46px; font-size: 14px; }
        }
      `}</style>

      <div className="rp-shell">
        <ResearchScene pulseRef={pulseRef} />
        <div className="rp-vignette" />

        <div className="rp-bar">
          <div className="rp-fill" style={{ width: `${pct(step)}%` }} />
        </div>

        {showBack && (
          <button className="rp-back" onClick={back} aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 5 5 12 12 19" />
            </svg>
          </button>
        )}

        <div className="rp-area">
          <div ref={wrapRef} className="rp-wrap">

            {/* ── Intro ─────────────────────────────────────────── */}
            {s.type === "intro" && (
              <>
                <div className="rp-brand">
                  <svg width="18" height="18" viewBox="0 0 64 64"><path d="M32 4 L37 27 L60 32 L37 37 L32 60 L27 37 L4 32 L27 27 Z" fill="#E6D3A3"/></svg>
                  Polynovea Records
                </div>
                <h1 className="rp-q" style={{ fontSize: "clamp(28px,5vw,56px)" }}>Help us build better nights.</h1>
                <p className="rp-sub">This takes about 3 minutes. Your answers shape what we build.</p>
                <div className="rp-btns">
                  <button className="rp-next on" onClick={advance}>Let&apos;s begin →</button>
                </div>
              </>
            )}

            {/* ── Single ────────────────────────────────────────── */}
            {s.type === "single" && (
              <>
                <span className="rp-label">{qlabel(step)}</span>
                <h2 className="rp-q">{s.q}</h2>
                <div className="rp-opts">
                  {s.options.map(opt => (
                    <button key={opt} className={`rp-opt${answers[s.key] === opt ? " selected" : ""}`} onClick={() => pick(s.key, opt)}>
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ── Multi ─────────────────────────────────────────── */}
            {s.type === "multi" && (() => {
              const sel: string[] = Array.isArray(answers[s.key]) ? (answers[s.key] as string[]) : [];
              return (
                <>
                  <span className="rp-label">{qlabel(step)}</span>
                  <h2 className="rp-q">{s.q}</h2>
                  <p className="rp-hint">{s.hint}</p>
                  <div className="rp-opts">
                    {s.options.map(opt => (
                      <button key={opt} className={`rp-opt multi${sel.includes(opt) ? " multi-sel" : ""}`} onClick={() => toggleMulti(s.key, opt, s.limit)}>
                        <span className="rp-check">
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 4.5 7.5 10 1.5"/></svg>
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="rp-btns">
                    <button className={`rp-next${sel.length > 0 ? " on" : ""}`} onClick={advance} disabled={sel.length === 0}>Next →</button>
                  </div>
                </>
              );
            })()}

            {/* ── Text ──────────────────────────────────────────── */}
            {s.type === "text" && (() => {
              const val = (answers[s.key] as string) || "";
              const canGo = !!s.optional || val.trim().length > 0;
              return (
                <>
                  <span className="rp-label">{qlabel(step)}</span>
                  <h2 className="rp-q">{s.q}</h2>
                  <div className="rp-text-wrap">
                    {s.long ? (
                      <textarea className="rp-field" placeholder={s.placeholder} value={val} rows={3}
                        onChange={e => setAnswers(a => ({ ...a, [s.key]: e.target.value }))} />
                    ) : (
                      <input className="rp-field" type="text" placeholder={s.placeholder} value={val} autoComplete="off" autoFocus
                        onChange={e => setAnswers(a => ({ ...a, [s.key]: e.target.value }))}
                        onKeyDown={e => { if (e.key === "Enter" && canGo) { setAnswers(a => ({ ...a, [s.key]: val.trim() || null })); advance(); } }} />
                    )}
                  </div>
                  <div className="rp-btns">
                    <button className={`rp-next${canGo ? " on" : ""}`} onClick={() => { setAnswers(a => ({ ...a, [s.key]: val.trim() || null })); advance(); }} disabled={!canGo}>Next →</button>
                    {s.optional && <button className="rp-skip" onClick={() => { setAnswers(a => ({ ...a, [s.key]: null })); advance(); }}>Skip</button>}
                  </div>
                </>
              );
            })()}

            {/* ── Thanks ────────────────────────────────────────── */}
            {s.type === "thanks" && (
              <>
                <div className="rp-brand">
                  <svg width="18" height="18" viewBox="0 0 64 64"><path d="M32 4 L37 27 L60 32 L37 37 L32 60 L27 37 L4 32 L27 27 Z" fill="#E6D3A3"/></svg>
                  Polynovea Records
                </div>
                <h2 className="rp-q" style={{ fontSize: "clamp(24px,4vw,44px)" }}>Thanks for helping us build better experiences.</h2>
                <p className="rp-sub">Want early access to what we&apos;re building?</p>
                {!emailDone && !declined && (
                  <div className="rp-ty-btns">
                    <button className="rp-ty-yes" onClick={handleYes}>Yes, add me</button>
                    <button className="rp-ty-no" onClick={handleNo}>No thanks</button>
                  </div>
                )}
                {showEmail && !emailDone && (
                  <div className="rp-email-row">
                    <input className="rp-email-inp" type="email" placeholder="your@email.com" value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") handleEmailSubmit(); }}
                      autoFocus />
                    <button className="rp-email-sub" onClick={handleEmailSubmit}>Done →</button>
                  </div>
                )}
                {emailDone && <p className="rp-ty-msg">You&apos;re on the list. We&apos;ll be in touch.</p>}
                {declined && <p className="rp-ty-msg">That&apos;s okay. Glad you shared your thoughts — it matters more than you&apos;d think.</p>}
                <Link href="/" className="rp-ty-back">← Back to Polynovea</Link>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}
