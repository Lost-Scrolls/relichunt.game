// Loot rarity section — relic reveal + rarity tiers
const LootSection = () => {
  const [opened, setOpened] = React.useState(false);
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf; const loop = () => { setT(performance.now() / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const float = Math.sin(t * 0.8) * 8;
  const pulse = 0.6 + Math.sin(t * 1.4) * 0.2;

  const rarities = [
    { name: 'Common',    color: '#9CA3AF', pct: '62%', note: 'Mob drops, crafting scraps' },
    { name: 'Rare',      color: '#3E90E0', pct: '24%', note: 'Dungeon gear, quest rewards' },
    { name: 'Epic',      color: '#A98AFB', pct: '10%', note: 'Named pieces, dungeon bosses' },
    { name: 'Legendary', color: '#FBBF1A', pct: '3.2%', note: 'Raid sets, full set bonuses' },
    { name: 'Mythic',    color: '#F25A06', pct: '0.8%', note: 'World-boss relics, one per server' },
  ];

  return (
    <section data-screen-label="04 Loot" style={{
      position: 'relative', padding: '140px 24px',
      background: 'linear-gradient(180deg, #0B0716 0%, #1A0A3E 50%, #0B0716 100%)',
      overflow: 'hidden',
    }}>
      {/* rotating arcane ring behind relic */}
      <div style={{
        position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%, -50%)',
        width: 1000, height: 1000, pointerEvents: 'none',
        background: 'conic-gradient(from 0deg, transparent 0deg, rgba(251,191,26,0.08) 90deg, transparent 180deg, rgba(242,90,6,0.1) 270deg, transparent 360deg)',
        filter: 'blur(20px)',
        animation: 'slowSpin 40s linear infinite',
      }}/>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{
            fontFamily: 'Onest, sans-serif', fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.24em', color: '#FBBF1A',
          }}>◆ Relics</div>
          <h2 style={{
            fontFamily: "'Cinzel', serif", fontWeight: 800, fontSize: 'clamp(40px, 5.4vw, 80px)',
            letterSpacing: '0.02em', lineHeight: 1.0, margin: '16px auto 0', color: '#FBF5FF', textWrap: 'balance',
            maxWidth: 900,
          }}>
            Hunt the relic,<br/>
            <span style={{ fontStyle: 'italic',
              background: 'linear-gradient(135deg, #FFE18A, #FF9A4E 50%, #F25A06)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              filter: 'drop-shadow(0 2px 0 rgba(0,0,0,0.4))',
            }}>earn the reward.</span>
          </h2>
          <p style={{ fontFamily: 'Onest, sans-serif', fontSize: 17, lineHeight: 1.55,
            color: '#D7CAE6', maxWidth: 600, margin: '22px auto 0', textWrap: 'balance' }}>
            Clear a dungeon, finish a quest, down a world boss — the chest is what you carry out.
            Five rarity tiers, every piece readable on your avatar in 3D.
          </p>
        </div>

        {/* Interactive relic */}
        <div style={{
          position: 'relative', height: 440, display: 'flex',
          alignItems: 'center', justifyContent: 'center', marginBottom: 60,
        }}>
          {/* massive glow behind */}
          <div style={{
            position: 'absolute', width: 520, height: 520, borderRadius: '50%',
            background: opened
              ? 'radial-gradient(circle, rgba(251,191,26,0.55), rgba(242,90,6,0.3) 40%, transparent 70%)'
              : 'radial-gradient(circle, rgba(251,191,26,0.35), transparent 65%)',
            filter: 'blur(40px)', pointerEvents: 'none',
            opacity: opened ? pulse + 0.2 : pulse,
            transition: 'opacity 400ms',
          }}/>

          {/* Light rays when opened */}
          {opened && [...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', width: 4, height: 380,
              background: 'linear-gradient(180deg, transparent, rgba(251,191,26,0.55), transparent)',
              transformOrigin: 'center',
              transform: `rotate(${i * 45 + t * 20}deg)`,
              filter: 'blur(2px)', opacity: 0.7, pointerEvents: 'none',
            }}/>
          ))}

          {/* Lootbox — closed → opens on tap */}
          <div style={{
            position: 'relative', width: 340,
            transform: `translateY(${float}px) ${opened ? 'scale(1.08) rotate(-2deg)' : 'scale(1)'}`,
            transition: 'transform 600ms cubic-bezier(.34,1.56,.64,1)',
            cursor: 'pointer',
          }} onClick={() => setOpened(v => !v)}>
            <img src={opened ? 'assets/lootbox-open.png' : 'assets/lootbox-closed.png'} style={{
              width: '100%',
              filter: `drop-shadow(0 30px 50px rgba(0,0,0,0.7)) drop-shadow(0 0 ${40 + pulse*40}px rgba(251,191,26,${opened ? pulse : pulse*0.7})) drop-shadow(0 0 ${opened ? 80 : 20}px rgba(242,90,6,${opened ? 0.55 : 0.2}))`,
              transition: 'filter 400ms',
            }}/>
          </div>

          {/* rune sparks when opened */}
          {opened && [...Array(12)].map((_, i) => {
            const angle = (t * 0.3 + i * Math.PI / 6);
            const radius = 240 + Math.sin(t + i) * 16;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius * 0.55;
            return (
              <span key={i} style={{
                position: 'absolute', left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`,
                fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: 18,
                color: i % 2 === 0 ? '#FBBF1A' : '#F25A06',
                textShadow: '0 0 10px rgba(251,191,26,0.8), 0 0 20px rgba(242,90,6,0.6)',
                pointerEvents: 'none',
                transform: `translate(-50%,-50%) rotate(${Math.sin(t + i) * 20}deg)`,
              }}>{['✦','◆','◈','❂'][i % 4]}</span>
            );
          })}

          {/* CTA under box */}
          <div style={{
            position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
            fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: opened ? '#FBBF1A' : '#9F90B8',
            background: 'rgba(0,0,0,0.6)', padding: '8px 18px', borderRadius: 999,
            border: `1px solid ${opened ? 'rgba(251,191,26,0.55)' : 'rgba(232,220,255,0.15)'}`,
            backdropFilter: 'blur(8px)', whiteSpace: 'nowrap',
            boxShadow: opened ? '0 0 24px rgba(251,191,26,0.4)' : 'none',
            transition: 'all 300ms',
            cursor: 'pointer',
          }} onClick={() => setOpened(v => !v)}>
            {opened ? '✦ Mythic Drop — Solara Plate, Helm of the Dawn ✦' : 'Tap to open'}
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA section
const CtaSection = () => {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf; const loop = () => { setT(performance.now() / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const pulse = 0.5 + Math.sin(t * 1.2) * 0.2;

  return (
    <section data-screen-label="05 CTA" style={{
      position: 'relative', padding: '160px 24px 180px',
      background: 'radial-gradient(ellipse 90% 70% at 50% 40%, #542275 0%, #3C1B5E 40%, #1A0A3E 100%)',
      overflow: 'hidden', textAlign: 'center',
    }}>
      {/* noise */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.2, mixBlendMode: 'overlay',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")",
      }}/>
      <Stars/>

      {/* Flame helm logo centerpiece */}
      <div style={{
        position: 'relative', width: 140, height: 140, borderRadius: 28, margin: '0 auto',
        overflow: 'hidden',
        boxShadow: `0 20px 48px rgba(0,0,0,0.6), 0 0 ${40 + pulse*30}px rgba(242,90,6,${pulse})`,
        border: '1px solid rgba(251,191,26,0.4)',
      }}>
        <img src="assets/logo-gold-helm.webp" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
      </div>

      <h2 style={{
        fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: 'clamp(48px, 7vw, 104px)',
        letterSpacing: '0.02em', lineHeight: 0.95, margin: '36px auto 0', color: '#FBF5FF',
        textWrap: 'balance', maxWidth: 900, position: 'relative',
      }}>
        Answer the <span style={{ fontStyle: 'italic',
          background: 'linear-gradient(135deg, #FFE18A, #FF9A4E 50%, #F25A06)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          filter: 'drop-shadow(0 2px 0 rgba(0,0,0,0.4))',
        }}>horn.</span>
      </h2>
      <p style={{ fontFamily: 'Onest, sans-serif', fontSize: 19, lineHeight: 1.55,
        color: '#D7CAE6', maxWidth: 520, margin: '22px auto 0', textWrap: 'balance', position: 'relative' }}>
        The realms are open. Your character is waiting at the gate.
        Tap once, and you're in.
      </p>

      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 44,
        flexWrap: 'wrap', position: 'relative' }}>
        <Button variant="telegram" size="lg" href={TELEGRAM_APP_URL} icon={<TelegramLogoMark size={26}/>}>Play in Telegram</Button>
        <Button variant="web" size="lg" href={WEB_APP_URL} icon={<WebPlayMark size={26}/>}>Play in Web</Button>
      </div>

      <div style={{ marginTop: 40, fontFamily: 'Onest, sans-serif', fontSize: 12,
        color: '#6A5C82', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700,
        position: 'relative' }}>
        ✦ Free to play · No install · Your chat, your party ✦
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer style={{
    padding: '40px 24px', background: '#050210',
    borderTop: '1px solid rgba(232,220,255,0.06)',
    fontFamily: 'Onest, sans-serif', fontSize: 12, color: '#6A5C82',
  }}>
    <div style={{
      maxWidth: 1280, margin: '0 auto', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 7, overflow: 'hidden',
          boxShadow: '0 0 10px rgba(242,90,6,0.5)',
        }}>
          <img src="assets/logo-gold-helm.webp" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
        <span>© 2026 Lost Scrolls Studios · <a href="https://lostscrolls.studio" target="_blank" rel="noopener" style={{ color: '#9F90B8', textDecoration: 'none', borderBottom: '1px solid rgba(159,144,184,0.3)' }}>lostscrolls.studio</a></span>
      </div>
    </div>
  </footer>
);

Object.assign(window, { LootSection, CtaSection, Footer });
