const TELEGRAM_APP_URL = 'https://t.me/relichuntdev_bot/app';

// Official-style Telegram icon (round blue disc + white paper plane, brand #229ED9)
const TelegramLogoMark = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 240 240" aria-hidden="true">
    <defs>
      <linearGradient id="tg-grad" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0" stopColor="#37BBFE"/>
        <stop offset="1" stopColor="#007DBB"/>
      </linearGradient>
    </defs>
    <circle cx="120" cy="120" r="120" fill="url(#tg-grad)"/>
    <path d="M50 115 L186 52 C194 48 202 55 199 64 L172 193 C170 201 161 204 155 198 L118 164 L100 182 C95 187 87 184 86 177 L80 144 L52 127 C45 124 44 118 50 115 Z" fill="#FFFFFF"/>
    <path d="M118 164 L100 182 C95 187 87 184 86 177 L80 144 Z" fill="#C7E3F2"/>
    <path d="M80 144 L160 85 L118 164 Z" fill="#D9ECF6" opacity="0.85"/>
  </svg>
);

const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { label: 'The World',  target: '01 Hero' },
    { label: 'Telegram',   target: '02 Telegram' },
    { label: 'Relics',     target: '04 Loot' },
  ];
  const [active, setActive] = React.useState(0);

  const scrollToSection = (target) => {
    const el = document.querySelector(`[data-screen-label="${target}"]`);
    if (!el) return;
    const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const y = el.getBoundingClientRect().top + currentY - 90; // offset for fixed nav
    const dy = Math.abs(y - currentY);
    // native smooth first
    try {
      window.scrollTo({ top: y, left: 0, behavior: 'smooth' });
    } catch (_) {
      window.scrollTo(0, y);
    }
    // JS-driven fallback animation in case native smooth scroll is disabled/overridden
    setTimeout(() => {
      const afterY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      if (Math.abs(afterY - currentY) < 4 && dy > 4) {
        // browser didn't animate — do it ourselves
        const startY = currentY;
        const distance = y - startY;
        const duration = Math.min(900, 300 + dy * 0.5);
        const startT = performance.now();
        const easeOut = (p) => 1 - Math.pow(1 - p, 3);
        const step = (now) => {
          const p = Math.min(1, (now - startT) / duration);
          window.scrollTo(0, startY + distance * easeOut(p));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, 40);
  };

  // Scroll-spy: highlight the nav item whose section is currently topmost-visible
  React.useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const probeY = window.scrollY + 120; // just below the fixed nav
      let bestIdx = 0;
      let bestTop = -Infinity;
      items.forEach((it, i) => {
        const el = document.querySelector(`[data-screen-label="${it.target}"]`);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= probeY && top > bestTop) {
          bestTop = top;
          bestIdx = i;
        }
      });
      setActive(bestIdx);
    };
    const onScrollSpy = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScrollSpy, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScrollSpy);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 18, left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, display: 'flex', alignItems: 'center', gap: 8,
      padding: '8px 8px 8px 16px', height: 60,
      background: scrolled ? 'rgba(11,7,22,0.82)' : 'rgba(11,7,22,0.42)',
      backdropFilter: 'blur(18px) saturate(1.3)', WebkitBackdropFilter: 'blur(18px) saturate(1.3)',
      border: '1px solid rgba(232,220,255,0.14)', borderRadius: 999,
      boxShadow: '0 10px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(232,220,255,0.08)',
      transition: 'background 220ms',
      width: 'min(1080px, calc(100vw - 32px))',
    }}>
      {/* Brand — logo + wordmark, tight */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, overflow: 'hidden',
          boxShadow: '0 0 16px rgba(242,90,6,0.5)', flex: 'none',
        }}>
          <img src="assets/logo-gold-helm.webp" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
        </div>
        <div style={{
          fontFamily: "'Cinzel', serif", fontWeight: 900,
          fontSize: 18, letterSpacing: '0.04em', lineHeight: 1, whiteSpace: 'nowrap',
          textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #FFE18A 0%, #FBBF1A 45%, #F25A06 100%)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          filter: 'drop-shadow(0 1px 0 rgba(0,0,0,0.45))',
        }}>Relic Hunt</div>
      </div>

      {/* Nav items — centered */}
      <ul className="nav-items" style={{
        listStyle: 'none', display: 'flex', gap: 2, padding: 0, margin: 0,
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
      }}>
        {items.map((item, i) => (
          <li key={item.label}
            onClick={() => { setActive(i); scrollToSection(item.target); }}
            style={{
              padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'Onest, sans-serif',
              color: active === i ? '#FBF5FF' : '#9F90B8',
              background: active === i ? 'rgba(232,220,255,0.1)' : 'transparent',
              transition: 'background 160ms, color 160ms',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { if (active !== i) e.currentTarget.style.color = '#D7CAE6'; }}
            onMouseLeave={e => { if (active !== i) e.currentTarget.style.color = '#9F90B8'; }}
          >{item.label}</li>
        ))}
      </ul>

      {/* Telegram CTA — official brand blue, official-style mark */}
      <a
        aria-label="Play in Telegram"
        href={TELEGRAM_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: 'Onest, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '0.01em',
          padding: '6px 18px 6px 6px', borderRadius: 999, border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: '#229ED9', color: '#FFFFFF', flex: 'none',
          marginLeft: 'auto', textDecoration: 'none',
          boxShadow: '0 0 22px rgba(34,158,217,0.55), 0 6px 14px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -2px 0 rgba(0,0,0,0.18)',
          transition: 'filter 180ms, transform 180ms',
          height: 36,
        }}
        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.06)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.filter = ''; e.currentTarget.style.transform = ''; }}
      >
        <TelegramLogoMark size={24}/>
        Play in Telegram
      </a>
    </nav>
  );
};

// Lucide-style stroke glyph (used rarely)
const TelegramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
  </svg>
);
const PlayIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
);
const ArrowRightIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7"/>
  </svg>
);

// Button — now supports 'telegram' variant using official brand blue
const Button = ({ variant = 'primary', size = 'md', children, icon, onClick, href, style = {} }) => {
  const base = {
    border: 'none', cursor: 'pointer',
    fontFamily: "'Cinzel', serif", fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12,
    transition: 'transform 180ms cubic-bezier(.34,1.56,.64,1), filter 180ms, box-shadow 180ms',
    whiteSpace: 'nowrap', textDecoration: 'none',
  };
  const sizes = {
    sm: { fontSize: 12, padding: '10px 18px', borderRadius: 10 },
    md: { fontSize: 14, padding: '12px 22px', borderRadius: 12 },
    lg: { fontSize: 15, padding: '14px 14px 14px 24px', borderRadius: 14, minHeight: 56 },
  };
  const variants = {
    telegram: {
      background: 'linear-gradient(180deg, #37BBFE 0%, #229ED9 50%, #007DBB 100%)',
      color: '#FFF',
      boxShadow: '0 0 28px rgba(34,158,217,0.6), 0 6px 18px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.2)',
    },
    primary: {
      background: 'linear-gradient(135deg, #FFD24D 0%, #FF9A4E 28%, #F25A06 62%, #C94405 100%)',
      color: '#FFF',
      boxShadow: '0 0 24px rgba(242,90,6,0.55), 0 0 60px rgba(242,90,6,0.25), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.25)',
    },
    gold: {
      background: 'linear-gradient(180deg, #FFE18A 0%, #FBBF1A 45%, #B07200 100%)',
      color: '#3A1E03',
      boxShadow: '0 0 24px rgba(251,191,26,0.55), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -2px 0 rgba(120,70,0,0.35)',
    },
    ghost: {
      background: 'rgba(232,220,255,0.05)',
      color: '#FBF5FF',
      border: '1px solid rgba(232,220,255,0.16)',
      backdropFilter: 'blur(8px)',
    },
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseEnter={e => { if (variant !== 'ghost') { e.currentTarget.style.filter = 'brightness(1.08)'; e.currentTarget.style.transform = 'translateY(-2px)'; } else { e.currentTarget.style.background = 'rgba(232,220,255,0.12)'; }}}
      onMouseLeave={e => { e.currentTarget.style.filter = ''; e.currentTarget.style.transform = ''; if (variant === 'ghost') e.currentTarget.style.background = 'rgba(232,220,255,0.05)'; }}
    >
      {icon}{children}
    </Tag>
  );
};

Object.assign(window, { Nav, Button, TelegramIcon, PlayIcon, ArrowRightIcon, TelegramLogoMark, TELEGRAM_APP_URL });
