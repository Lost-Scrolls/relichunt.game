// "Inside Telegram" section — reframed as a scrying/portal ritual
const TelegramSection = () => {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf; const loop = () => { setT(performance.now() / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const float = Math.sin(t * 0.6) * 6;

  return (
    <section data-screen-label="02 Telegram" style={{
      position: 'relative', padding: '140px 24px 140px',
      background: 'linear-gradient(180deg, #0B0716 0%, #12082A 55%, #0B0716 100%)',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        width: 1200, height: 600, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(39,167,231,0.18) 0%, transparent 60%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }}/>

      {/* Faint constellation / rune dust */}
      <RuneField t={t}/>

      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 80,
        alignItems: 'center', position: 'relative',
      }} className="tg-grid">
        {/* Left: copy */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '6px 14px', borderRadius: 999,
            background: 'rgba(39,167,231,0.1)', border: '1px solid rgba(39,167,231,0.35)',
            fontFamily: 'Onest, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#7FD1F5',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="m22 2-7 20-4-9-9-4Z"/></svg>
            The Scrying Stone
          </div>
          <h2 style={{
            fontFamily: "'Cinzel', serif", fontWeight: 800, fontSize: 'clamp(40px, 5vw, 72px)',
            letterSpacing: '0.02em', lineHeight: 1.0, margin: '22px 0 0', color: '#FBF5FF', textWrap: 'balance',
          }}>
            Speak the words.<br/>
            <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #7FD1F5 0%, #27A7E7 50%, #0E6FA8 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              filter: 'drop-shadow(0 2px 0 rgba(0,0,0,0.4))' }}>Step through the glass.</span>
          </h2>
          <p style={{ fontFamily: 'Onest, sans-serif', fontSize: 18, lineHeight: 1.55,
            color: '#D7CAE6', maxWidth: 500, margin: '22px 0 0' }}>
            No storefront. No 400MB ritual. No login incantation. The phone in your pocket
            <em style={{ color: '#FBBF1A', fontStyle: 'normal', fontWeight: 600 }}> is </em>
            the portal. Your Telegram handle <em style={{ color: '#FBBF1A', fontStyle: 'normal', fontWeight: 600 }}>is</em> your true name.
            Your group chat <em style={{ color: '#FBBF1A', fontStyle: 'normal', fontWeight: 600 }}>is</em> your warband.
          </p>

          {/* Three "rites" */}
          <ol style={{ listStyle: 'none', padding: 0, margin: '44px 0 0',
            display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              ['Unseal the glass', 'One tap. Web, iOS, Android, desktop — the same soul travels everywhere.', '#27A7E7', 'M12 2 2 7v10l10 5 10-5V7l-10-5Zm0 2.2 7.5 3.8L12 12 4.5 8 12 4.2Z'],
              ['Cross the threshold', 'Real 3D realms rendered inside the chat. No download, no install, no permission slip.', '#FBBF1A', 'M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-5v5l4 2'],
              ['Summon your warband', 'Bring as many companions as you can name. PvE, PvP, world bosses — right in the thread.', '#F25A06', 'M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3 2.5-5 6-5s6 2 6 5M14 20c0-3 2-5 5-5s3 2 3 5'],
            ].map(([title, body, color, icon], i) => (
              <li key={title} style={{
                display: 'grid', gridTemplateColumns: '68px 1fr', gap: 20, alignItems: 'flex-start',
                padding: '22px 0', borderBottom: i < 2 ? '1px solid rgba(232,220,255,0.08)' : 'none',
                position: 'relative',
              }}>
                {/* Seal/rune medallion */}
                <div style={{
                  width: 60, height: 60, position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* Outer engraved ring */}
                  <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: 'absolute', inset: 0 }}>
                    <defs>
                      <radialGradient id={`ring-${i}`} cx="50%" cy="50%">
                        <stop offset="55%" stopColor="transparent"/>
                        <stop offset="100%" stopColor={color} stopOpacity="0.5"/>
                      </radialGradient>
                    </defs>
                    <circle cx="30" cy="30" r="28" fill="none" stroke={color} strokeOpacity="0.55" strokeWidth="1"/>
                    <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3"
                      style={{ transformOrigin: 'center', animation: `tgspin-${i} ${12 + i*2}s linear infinite` }}/>
                    <circle cx="30" cy="30" r="26" fill={`url(#ring-${i})`}/>
                  </svg>
                  <style>{`@keyframes tgspin-${i} { to { transform: rotate(${i % 2 === 0 ? 360 : -360}deg) } }`}</style>
                  {/* Inner disc */}
                  <div style={{
                    position: 'relative', width: 42, height: 42, borderRadius: '50%',
                    background: `radial-gradient(circle at 32% 28%, ${color}ee, ${color}55 70%, ${color}22)`,
                    boxShadow: `0 0 18px ${color}88, inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.4)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBF5FF" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
                      <path d={icon} fill={i === 0 ? "#FBF5FF" : "none"}/>
                    </svg>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
                      color: color, opacity: 0.8, letterSpacing: '0.15em',
                    }}>RITE · 0{i+1}</span>
                  </div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 24,
                    letterSpacing: '0.02em', color: '#FBF5FF', marginBottom: 6, textWrap: 'balance' }}>{title}</div>
                  <div style={{ fontFamily: 'Onest, sans-serif', fontSize: 15, lineHeight: 1.55, color: '#9F90B8', textWrap: 'pretty' }}>{body}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Right: scrying stone */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <ScryingStone float={float} t={t}/>
        </div>
      </div>
    </section>
  );
};

// Faint drifting runes in the background
const RuneField = ({ t }) => {
  const runes = React.useMemo(() => (
    Array.from({ length: 18 }, (_, i) => ({
      x: (i * 137.5) % 100,
      y: (i * 61.8) % 100,
      s: 10 + (i % 4) * 4,
      d: i * 0.35,
      g: ['✦','⟊','⌬','✧','◈','⬡'][i % 6],
    }))
  ), []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.15 }}>
      {runes.map((r, i) => (
        <span key={i} style={{
          position: 'absolute', left: `${r.x}%`, top: `${r.y}%`,
          fontFamily: "'Cinzel', serif", fontSize: r.s, color: '#FBBF1A',
          transform: `translateY(${Math.sin(t * 0.5 + r.d) * 8}px)`,
          opacity: 0.4 + Math.sin(t * 0.9 + r.d) * 0.3,
        }}>{r.g}</span>
      ))}
    </div>
  );
};

const ScryingStone = ({ float, t }) => {
  // Loading bar progress — sweeps 0 → 1 over ~6s, then loops
  const period = 6;
  const phase = (t % period) / period;
  const progress = Math.min(0.98, phase * 1.05);
  // Hint cycler — rotate every ~3s
  const hints = [
    'Tip — your Telegram handle is your true name across every realm.',
    'Tip — invite friends from any chat to form a warband. No cap.',
    'Tip — relics drop from world bosses. The veil thins on full moons.',
    'Tip — heavy plate favours those who hold the front line.',
    'Tip — every piece you equip shows on your avatar in 3D.',
  ];
  const hintIdx = Math.floor(t / 3.5) % hints.length;
  // Spinner
  const spin = (t * 90) % 360;
  // Shimmer for art
  const shimmer = 0.85 + Math.sin(t * 1.4) * 0.15;

  return (
    <div style={{
      position: 'relative', width: 360, height: 720,
      transform: `translateY(${float}px) rotate(-2deg)`,
      transition: 'transform 200ms',
    }}>
      {/* Summoning circle behind the phone */}
      <svg viewBox="0 0 500 500" style={{
        position: 'absolute', inset: '50% 0 0 50%', width: 520, height: 520,
        transform: 'translate(-50%, -50%)', opacity: 0.45, pointerEvents: 'none',
      }}>
        <defs>
          <radialGradient id="sc-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FBBF1A" stopOpacity="0.4"/>
            <stop offset="60%" stopColor="#27A7E7" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#27A7E7" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="250" cy="250" r="240" fill="url(#sc-glow)"/>
        <g stroke="#FBBF1A" fill="none" strokeWidth="0.6" opacity="0.5"
           style={{ transformOrigin: '250px 250px', animation: 'scspin 60s linear infinite' }}>
          <circle cx="250" cy="250" r="230" strokeDasharray="4 8"/>
          <circle cx="250" cy="250" r="210"/>
          <circle cx="250" cy="250" r="190" strokeDasharray="1 5"/>
          <polygon points="250,80 397,335 103,335"/>
          <polygon points="250,420 103,165 397,165"/>
        </g>
        {['✦','⟊','⌬','✧','◈','⬡','✦','⟊','⌬','✧','◈','⬡'].map((g, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = 250 + Math.cos(a) * 222;
          const y = 250 + Math.sin(a) * 222;
          return (
            <text key={i} x={x} y={y} fill="#FBBF1A" fontFamily="Cinzel, serif"
              fontSize="14" opacity="0.7" textAnchor="middle" dominantBaseline="middle"
              transform={`rotate(${(i/12)*360 + 90} ${x} ${y})`}>{g}</text>
          );
        })}
        <style>{`
          @keyframes scspin { to { transform: rotate(360deg) } }
        `}</style>
      </svg>

      {/* Glow behind phone */}
      <div style={{
        position: 'absolute', inset: -40, borderRadius: 60,
        background: 'radial-gradient(ellipse at center, rgba(140,242,150,0.28), rgba(39,167,231,0.2) 50%, transparent 70%)',
        filter: 'blur(30px)',
      }}/>

      {/* Bezel — obsidian slab */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 48,
        background: 'linear-gradient(165deg, #1A1430 0%, #0B0716 100%)',
        border: '1px solid rgba(232,220,255,0.15)',
        boxShadow: '0 40px 80px rgba(0,0,0,0.75), inset 0 2px 0 rgba(255,255,255,0.08), inset 0 -2px 0 rgba(0,0,0,0.4)',
        padding: 10,
      }}>
        {/* Engraved corner runes on the bezel */}
        {['✦','◈','⬡','⟊'].map((g, i) => (
          <span key={i} style={{
            position: 'absolute',
            top: i < 2 ? 18 : 'auto', bottom: i >= 2 ? 18 : 'auto',
            left: i % 2 === 0 ? 18 : 'auto', right: i % 2 === 1 ? 18 : 'auto',
            fontFamily: "'Cinzel', serif", fontSize: 11, color: 'rgba(251,191,26,0.35)',
          }}>{g}</span>
        ))}

        {/* Screen — vertical loading screen */}
        <div style={{
          position: 'relative', width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden',
          background: '#000',
        }}>
          {/* Notch */}
          <div style={{
            position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
            width: 100, height: 26, borderRadius: 14, background: '#000', zIndex: 30,
          }}/>

          {/* Status bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 38, zIndex: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 28px 0 32px',
            fontFamily: 'Onest, sans-serif', fontSize: 13, fontWeight: 700, color: '#FFF',
            textShadow: '0 1px 2px rgba(0,0,0,0.6)',
          }}>
            <span>21:24</span>
            <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="#FFF"><path d="M2 7h2V3H2zM5 7h2V1H5zM8 7h2V5H8zM11 7h2v-3h-2z"/></svg>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5a8 8 0 0 1 12 0M3 7a4 4 0 0 1 8 0" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round"/><circle cx="7" cy="9" r="1" fill="#FFF"/></svg>
              <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                <rect x="0.5" y="0.5" width="18" height="9" rx="2.5" stroke="#FFF" strokeWidth="1"/>
                <rect x="2" y="2" width="14" height="6" rx="1" fill="#FFF"/>
                <rect x="20" y="3.5" width="1.5" height="3" rx="0.5" fill="#FFF"/>
              </svg>
            </span>
          </div>

          {/* Hero art — fills full screen */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(assets/loading-art.png)',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            filter: `saturate(${shimmer + 0.1}) brightness(0.95)`,
          }}/>

          {/* Mystic green vignette overlay (matches art's green portal mood) */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 90% 80% at 50% 35%, rgba(140,242,150,0.18) 0%, transparent 55%), linear-gradient(180deg, rgba(11,7,22,0.55) 0%, rgba(11,7,22,0.15) 35%, rgba(11,7,22,0.85) 78%, rgba(11,7,22,0.98) 100%)',
            pointerEvents: 'none',
          }}/>

          {/* Animated mystic mist particles */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {[...Array(14)].map((_, i) => {
              const seed = i * 73.2;
              const x = (seed % 100);
              const baseY = 50 + (seed * 1.3 % 50);
              const y = baseY - (t * (8 + i % 5)) % 130;
              const size = 2 + (i % 3);
              return (
                <div key={i} style={{
                  position: 'absolute',
                  left: `${x}%`, top: `${y}%`,
                  width: size, height: size, borderRadius: '50%',
                  background: i % 3 === 0 ? '#8CF296' : '#FBBF1A',
                  boxShadow: `0 0 ${size*3}px ${i % 3 === 0 ? '#8CF296' : '#FBBF1A'}`,
                  opacity: 0.5 + Math.sin(t * 2 + i) * 0.3,
                }}/>
              );
            })}
          </div>

          {/* Top-left version + server */}
          <div style={{
            position: 'absolute', top: 52, left: 22, zIndex: 5,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.1em',
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          }}>
            <div>v 0.9.4 · open beta</div>
            <div style={{ marginTop: 3, color: 'rgba(140,242,150,0.85)' }}>● eu-west · 142ms</div>
          </div>

          {/* Top-right rune badge */}
          <div style={{
            position: 'absolute', top: 50, right: 22, zIndex: 5,
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 11px 5px 8px', borderRadius: 999,
            background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(251,191,26,0.45)',
            backdropFilter: 'blur(8px)',
            fontFamily: "'Cinzel', serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#FBBF1A',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FBBF1A', boxShadow: '0 0 6px #FBBF1A' }}/>
            Live
          </div>

          {/* Bottom UI cluster — title, progress, hint */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 26px 38px',
            zIndex: 10,
          }}>
            {/* Decorative top divider */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 22,
              opacity: 0.6,
            }}>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(251,191,26,0.5))' }}/>
              <span style={{ fontFamily: "'Cinzel', serif", color: '#FBBF1A', fontSize: 11 }}>✦</span>
              <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(251,191,26,0.5), transparent)' }}/>
            </div>

            {/* Progress bar */}
            <div style={{ position: 'relative' }}>
              {/* Track */}
              <div style={{
                position: 'relative', height: 6, borderRadius: 3,
                background: 'rgba(0,0,0,0.55)',
                border: '1px solid rgba(251,191,26,0.25)',
                overflow: 'hidden',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)',
              }}>
                {/* Fill */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: `${progress * 100}%`,
                  background: 'linear-gradient(90deg, #B07200 0%, #FBBF1A 50%, #FFE18A 100%)',
                  boxShadow: '0 0 12px rgba(251,191,26,0.7), 0 0 4px rgba(255,225,138,0.9)',
                }}/>
                {/* Animated shimmer head */}
                <div style={{
                  position: 'absolute', top: 0, bottom: 0,
                  left: `calc(${progress * 100}% - 30px)`,
                  width: 30,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7))',
                  filter: 'blur(2px)',
                }}/>
              </div>
              {/* Tick marks */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
                  color: '#FBBF1A', letterSpacing: '0.08em',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                }}>{Math.floor(progress * 100)}%</span>
                <span style={{
                  fontFamily: 'Onest, sans-serif', fontSize: 10,
                  color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                }}>Loading shaders & terrain…</span>
              </div>
            </div>

            {/* Spinner + hint */}
            <div style={{
              marginTop: 22, display: 'flex', alignItems: 'flex-start', gap: 12,
              padding: '12px 14px', borderRadius: 12,
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(251,191,26,0.18)',
              backdropFilter: 'blur(10px)',
            }}>
              {/* Mystic spinner */}
              <svg width="22" height="22" viewBox="0 0 22 22" style={{
                flex: 'none', transform: `rotate(${spin}deg)`,
              }}>
                <circle cx="11" cy="11" r="9" fill="none" stroke="rgba(251,191,26,0.2)" strokeWidth="1.5"/>
                <circle cx="11" cy="11" r="9" fill="none" stroke="#FBBF1A" strokeWidth="1.5"
                  strokeDasharray="14 42" strokeLinecap="round"/>
                <circle cx="11" cy="11" r="2" fill="#FBBF1A"/>
              </svg>
              <div style={{
                fontFamily: 'Onest, sans-serif', fontSize: 11.5, lineHeight: 1.4,
                color: 'rgba(255,255,255,0.85)',
              }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 8.5, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: '#FBBF1A', marginBottom: 3, fontWeight: 700 }}>From the Herald</div>
                {hints[hintIdx]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { TelegramSection });
