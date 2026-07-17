// Hero section with 3 layout variants
const Hero = ({ layout = 'center' }) => {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf; const loop = () => { setT(performance.now() / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const floatL = Math.sin(t * 0.7) * 10;
  const floatR = Math.sin(t * 0.7 + Math.PI) * 10;
  const emberPulse = 0.55 + Math.sin(t * 1.2) * 0.15;

  // Shared background
  const bg = (
    <>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 90% 70% at 55% 60%, #542275 0%, #3C1B5E 40%, #281264 72%, #1A0A3E 100%)',
      }}/>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.22, mixBlendMode: 'overlay',
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>\")",
        backgroundSize: '180px',
      }}/>
      {/* magenta bloom */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
        width: 1100, height: 1100, borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(177,76,126,0.38) 0%, transparent 60%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }}/>
      {/* subtle starfield */}
      <Stars/>
    </>
  );

  const eyebrow = (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '6px 14px 6px 6px', borderRadius: 999,
      background: 'rgba(232,220,255,0.05)', border: '1px solid rgba(232,220,255,0.16)',
      backdropFilter: 'blur(12px)',
      fontFamily: 'Onest, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
      color: '#FBBF1A',
    }}>
      <span style={{
        background: 'linear-gradient(180deg, #FFE18A, #B07200)', color: '#3A1E03',
        padding: '3px 9px', borderRadius: 999, fontSize: 9.5, letterSpacing: '0.14em', fontWeight: 800,
      }}>The first true 3D MMO in Telegram</span>
      Open Beta · Live Now
    </div>
  );

  const headline = (
    <h1 style={{
      fontFamily: "'Cinzel', serif", fontWeight: 900,
      fontSize: 'clamp(56px, 9vw, 128px)', letterSpacing: '0.01em', lineHeight: 0.95,
      margin: '28px 0 0', color: '#FBF5FF', textWrap: 'balance',
    }}>
      Your relic<br/>is <span style={{
        background: 'linear-gradient(135deg, #FFE18A 0%, #FF9A4E 40%, #F25A06 78%, #C94405 100%)',
        WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        filter: `drop-shadow(0 2px 0 rgba(0,0,0,0.4)) drop-shadow(0 0 ${14 + emberPulse*20}px rgba(242,90,6,${emberPulse*0.5}))`,
        fontStyle: 'italic',
      }}>waiting.</span>
    </h1>
  );

  const sub = (
    <p style={{
      fontFamily: 'Onest, sans-serif', fontSize: 19, lineHeight: 1.55,
      color: '#D7CAE6', maxWidth: 520, margin: '22px 0 0', textWrap: 'pretty',
      fontWeight: 400,
    }}>
      A real 3D MMORPG, playing inside Telegram — not a chat-bot, not a card game.
      Raid bosses, run quests, hunt relics with your group chat. No install, no store.
    </p>
  );

  // ----- CENTER LAYOUT -----
  if (layout === 'center') {
    return (
      <section className="hero" data-screen-label="01 Hero" style={{
        position: 'relative', minHeight: '100vh', overflow: 'hidden', paddingTop: 110,
      }}>
        {bg}

        {/* Paladin left */}
        <div className="hero-char-left" style={{
          position: 'absolute', left: '-2%', bottom: '-4%', width: 'min(560px, 42vw)', pointerEvents: 'none',
          transform: `translateY(${floatL}px)`, zIndex: 1,
        }}>
          <img src="assets/hero-sun.png?v=2" style={{ width: '100%',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(251,191,26,0.4))' }}/>
        </div>
        {/* Frost right */}
        <div className="hero-char-right" style={{
          position: 'absolute', right: '-2%', bottom: '-4%', width: 'min(540px, 40vw)', pointerEvents: 'none',
          transform: `translateY(${floatR}px) scaleX(-1)`, zIndex: 1,
        }}>
          <img src="assets/hero-frost.png?v=2" style={{ width: '100%',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(62,144,224,0.4))' }}/>
        </div>

        <div style={{
          position: 'relative', maxWidth: 920, margin: '0 auto', padding: '40px 24px 140px',
          textAlign: 'center', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          {eyebrow}
          {headline}
          <p style={{
            fontFamily: 'Onest, sans-serif', fontSize: 18, lineHeight: 1.55,
            color: '#D7CAE6', maxWidth: 560, margin: '22px auto 0', textWrap: 'balance',
          }}>
            A real 3D MMORPG, playing inside Telegram — not a chat-bot, not a card game.
            Raid bosses, run quests, hunt relics with your group chat. No install, no store.
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant="telegram" size="lg" href={TELEGRAM_APP_URL} icon={<TelegramLogoMark size={26}/>}>Play in Telegram</Button>
            <Button variant="web" size="lg" href={WEB_APP_URL} icon={<WebPlayMark size={26}/>}>Play in Web</Button>
          </div>
        </div>

        <ScrollCue/>
      </section>
    );
  }

  // ----- LEFT-ALIGNED LAYOUT -----
  if (layout === 'left') {
    return (
      <section className="hero" data-screen-label="01 Hero" style={{
        position: 'relative', minHeight: '100vh', overflow: 'hidden', paddingTop: 110,
      }}>
        {bg}
        {/* Frost character big on right */}
        <div style={{
          position: 'absolute', right: '-6%', bottom: '-6%', width: 'min(780px, 55vw)', pointerEvents: 'none',
          transform: `translateY(${floatR}px)`, zIndex: 1,
        }}>
          <img src="assets/hero-frost.png?v=2" style={{ width: '100%',
            filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.75)) drop-shadow(0 0 80px rgba(62,144,224,0.45))' }}/>
        </div>

        <div style={{
          position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '40px 40px 140px',
          zIndex: 2,
        }}>
          <div style={{ maxWidth: 640 }}>
            {eyebrow}
            {headline}
            {sub}
            <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button variant="telegram" size="lg" href={TELEGRAM_APP_URL} icon={<TelegramLogoMark size={26}/>}>Play in Telegram</Button>
              <Button variant="web" size="lg" href={WEB_APP_URL} icon={<WebPlayMark size={26}/>}>Play in Web</Button>
            </div>
          </div>
        </div>

        <ScrollCue/>
      </section>
    );
  }

  // ----- SPLIT LAYOUT (text L / character R on card) -----
  return (
    <section className="hero" data-screen-label="01 Hero" style={{
      position: 'relative', minHeight: '100vh', overflow: 'hidden', paddingTop: 110,
    }}>
      {bg}
      <div style={{
        position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '40px 40px 100px',
        zIndex: 2, display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0, 0.95fr)',
        gap: 40, alignItems: 'center', minHeight: 'calc(100vh - 110px)',
      }} className="hero-split-grid">
        <div>
          {eyebrow}
          {headline}
          {sub}
          <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button variant="telegram" size="lg" href={TELEGRAM_APP_URL} icon={<TelegramLogoMark size={26}/>}>Play in Telegram</Button>
            <Button variant="web" size="lg" href={WEB_APP_URL} icon={<WebPlayMark size={26}/>}>Play in Web</Button>
          </div>
        </div>
        {/* right: showcase card */}
        <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 28, overflow: 'hidden',
          border: '1px solid rgba(251,191,26,0.35)',
          background: 'radial-gradient(ellipse 90% 70% at 50% 60%, #542275 0%, #3C1B5E 45%, #281264 80%, #1A0A3E 100%)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.75), inset 0 0 0 1px rgba(251,191,26,0.2)',
        }}>
          <div style={{ position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 55% at 50% 60%, rgba(251,191,26,0.35), transparent 70%)' }}/>
          <img src="assets/hero-sun.png?v=2" style={{
            position: 'absolute', bottom: '-6%', left: '50%', transform: `translateX(-50%) translateY(${floatL}px)`,
            width: '94%',
            filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 80px rgba(251,191,26,0.5))',
          }}/>
          {/* rarity chip */}
          <span style={{
            position: 'absolute', top: 16, left: 16,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '6px 12px', borderRadius: 999, color: '#FBBF1A',
            background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(251,191,26,0.6)',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FBBF1A', boxShadow: '0 0 6px #FBBF1A' }}/>
            Your Set · Legendary
          </span>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0,
            padding: 24,
            background: 'linear-gradient(180deg, transparent, rgba(5,2,16,0.9))' }}>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 32, fontWeight: 800, letterSpacing: '0.02em',
              background: 'linear-gradient(180deg, #FFE18A 0%, #FBBF1A 50%, #B07200 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              filter: 'drop-shadow(0 2px 0 rgba(0,0,0,0.4))',
            }}>Solara Plate</div>
            <div style={{ fontFamily: 'Onest, sans-serif', fontSize: 13, color: '#9F90B8', marginTop: 4, letterSpacing: '0.04em' }}>
              Ember tier · 4 / 4 pieces
            </div>
          </div>
        </div>
      </div>
      <ScrollCue/>
    </section>
  );
};

const StatsStrip = ({ align = 'center' }) => {
  const items = [
    ['3D',   'Real MMORPG'],
    ['5s',   'Tap to play'],
    ['1M+',  'Players'],
    ['0',    'Installs'],
  ];
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
      marginTop: 56,
      color: '#9F90B8',
      borderTop: '1px solid rgba(232,220,255,0.1)',
      borderBottom: '1px solid rgba(232,220,255,0.1)',
      padding: '22px 0',
      width: '100%',
      maxWidth: align === 'center' ? 620 : 560,
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0,
    }}>
      {items.map(([n, l], i) => (
        <div key={l} style={{
          textAlign: 'center',
          borderRight: i < items.length - 1 ? '1px solid rgba(232,220,255,0.08)' : 'none',
          padding: '0 8px',
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontWeight: 800,
            fontSize: 32,
            background: 'linear-gradient(180deg, #FFE18A 0%, #FBBF1A 60%, #B07200 100%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            filter: 'drop-shadow(0 1px 0 rgba(0,0,0,0.45))',
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}>{n}</div>
          <div style={{
            fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.26em', marginTop: 8,
            fontFamily: 'Onest, sans-serif', fontWeight: 700, color: '#6A5C82',
          }}>{l}</div>
        </div>
      ))}
    </div>
  );
};

const ScrollCue = () => (
  <div style={{
    position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
    fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase',
    color: '#6A5C82', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
    fontFamily: 'Onest, sans-serif', fontWeight: 700, zIndex: 3,
  }}>
    <span>Scroll</span>
    <div style={{ width: 1, height: 36, background: 'linear-gradient(180deg, #6A5C82, transparent)' }}/>
  </div>
);

const Stars = () => {
  const stars = React.useMemo(() => {
    const out = [];
    for (let i = 0; i < 60; i++) {
      out.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 0.5,
        o: Math.random() * 0.6 + 0.2,
        d: Math.random() * 4 + 2,
      });
    }
    return out;
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
          width: s.s, height: s.s, borderRadius: '50%',
          background: '#FBF5FF', opacity: s.o,
          boxShadow: `0 0 ${s.s * 3}px #FBF5FF`,
          animation: `twinkle ${s.d}s ease-in-out ${i * 0.1}s infinite alternate`,
        }}/>
      ))}
    </div>
  );
};

Object.assign(window, { Hero });
