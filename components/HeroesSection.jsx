// Heroes showcase — two hero panels that expand on click, with floating armor pieces
const HeroesSection = () => {
  const [active, setActive] = React.useState('sun');
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf; const loop = () => { setT(performance.now() / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const heroes = {
    sun: {
      name: 'Solara Plate',
      cls: 'Ember tier · 4-piece set',
      color: '#FBBF1A',
      bgGrad: 'radial-gradient(ellipse 90% 70% at 50% 60%, #542275 0%, #3C1B5E 45%, #281264 80%, #1A0A3E 100%)',
      bloom: 'rgba(251,191,26,0.45)',
      glow: 'rgba(251,191,26,0.55)',
      render: 'assets/hero-sun.png?v=2',
      rarity: 'Legendary',
      tagline: 'Forged from embers pulled out of the last sun.',
      desc: 'Heavy plate for front-line players. Gear-score 480. Drops piece by piece from the Ember Court raid — complete the set for the 4-piece bonus.',
      stats: [['STR', 94], ['VIT', 88], ['FTH', 76]],
      abilities: [
        { name: 'Ember Oath',       kind: '2-piece', cost: 'set bonus', note: 'Allies within 6m regen 2% HP/s while you hold aggro.' },
        { name: 'Dawn Hammer',      kind: 'Weapon',  cost: '18 FTH',    note: 'Heavy swing. Stuns all in 4m. Breaks ice & armor.' },
        { name: 'Seven-Sun Banner', kind: 'Utility', cost: '30 FTH',    note: 'Plant a banner. 20s. +15% STR to the whole party.' },
        { name: 'The Long Verse',   kind: '4-piece', cost: 'set bonus', note: 'Ultimate: revive one ally mid-fight. Once per raid.' },
      ],
    },
    frost: {
      name: 'Glacial Mail',
      cls: 'Frost tier · 4-piece set',
      color: '#3E90E0',
      bgGrad: 'radial-gradient(ellipse 90% 70% at 50% 60%, #2C3E7A 0%, #1E2A5A 45%, #141B42 80%, #0A0E2E 100%)',
      bloom: 'rgba(62,144,224,0.45)',
      glow: 'rgba(62,144,224,0.55)',
      render: 'assets/hero-frost.png?v=2',
      rarity: 'Epic',
      tagline: 'Mail quarried from a city buried in ice.',
      desc: 'Medium armor for strikers & scouts. Gear-score 440. Pulled from the Citadel dungeon — trades fire resist for crit and silence.',
      stats: [['DEX', 92], ['INT', 87], ['ICE', 81]],
      abilities: [
        { name: 'Frost Silence',    kind: '2-piece', cost: 'set bonus', note: 'First hit on an unaware enemy always crits. No boot sound.' },
        { name: 'Myrren Thrust',    kind: 'Weapon',  cost: '14 ICE',    note: 'Lunge 5m. Pierces armor. Slows target 40% for 3s.' },
        { name: 'Glacial Refrain',  kind: 'Utility', cost: '26 ICE',    note: 'Ring of ice shards. Blocks 2 ranged hits per ally for 10s.' },
        { name: 'The Long Winter',  kind: '4-piece', cost: 'set bonus', note: 'Ultimate: freeze all enemies in 12m for 4s. Then shatter.' },
      ],
    },
  };

  const h = heroes[active];
  const float = Math.sin(t * 0.6) * 10;

  return (
    <section data-screen-label="03 Heroes" style={{
      position: 'relative', padding: '140px 24px',
      background: '#0B0716', overflow: 'hidden',
    }}>
      {/* section header */}
      <div style={{ maxWidth: 1280, margin: '0 auto 72px', display: 'flex',
        alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
        <div>
          <div className="eyebrow" style={{
            fontFamily: 'Onest, sans-serif', fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.24em', color: '#FBBF1A',
          }}>✦ Your Kit</div>
          <h2 style={{
            fontFamily: "'Cinzel', serif", fontWeight: 800, fontSize: 'clamp(40px, 5.4vw, 80px)',
            letterSpacing: '0.02em', lineHeight: 1.0, margin: '12px 0 0', color: '#FBF5FF', textWrap: 'balance',
          }}>
            Every player<br/>
            <span style={{ fontStyle: 'italic',
              background: 'linear-gradient(135deg, #FFE18A, #FF9A4E 50%, #F25A06)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              filter: 'drop-shadow(0 2px 0 rgba(0,0,0,0.4))',
            }}>is the hero.</span>
          </h2>
        </div>
        <p style={{ fontFamily: 'Onest, sans-serif', fontSize: 17, lineHeight: 1.55,
          color: '#D7CAE6', maxWidth: 420, margin: 0 }}>
          No pre-made characters — you level, you loot, you equip. Every piece shows on your avatar in 3D.
          Two of the current full sets, side by side.
        </p>
      </div>

      {/* Hero selector */}
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 12, marginBottom: 32,
        flexWrap: 'wrap' }}>
        {Object.entries(heroes).map(([key, hero]) => (
          <button key={key} onClick={() => setActive(key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '10px 20px 10px 12px', borderRadius: 999,
              background: active === key ? 'rgba(232,220,255,0.08)' : 'transparent',
              border: active === key ? `1px solid ${hero.color}88` : '1px solid rgba(232,220,255,0.14)',
              cursor: 'pointer', transition: 'all 220ms',
              boxShadow: active === key ? `0 0 24px ${hero.color}44` : 'none',
            }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: hero.color, boxShadow: `0 0 10px ${hero.color}`,
            }}/>
            <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 14,
              letterSpacing: '0.1em', color: '#FBF5FF', textTransform: 'uppercase' }}>{hero.name}</span>
            <span style={{ fontFamily: 'Onest, sans-serif', fontSize: 11, color: '#9F90B8',
              letterSpacing: '0.08em', textTransform: 'uppercase' }}>{hero.rarity}</span>
          </button>
        ))}
      </div>

      {/* Main hero panel */}
      <div style={{ maxWidth: 1280, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 32,
      }} className="heroes-grid">
        {/* Left: big portrait */}
        <div style={{
          position: 'relative', aspectRatio: '5/6', borderRadius: 28, overflow: 'hidden',
          background: h.bgGrad,
          border: `1px solid ${h.color}55`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.75), inset 0 0 0 1px ${h.color}22`,
          transition: 'all 420ms cubic-bezier(.16,1,.3,1)',
        }}>
          <div style={{ position: 'absolute', inset: 0,
            background: `radial-gradient(ellipse 80% 55% at 50% 58%, ${h.bloom}, transparent 70%)` }}/>
          {/* starfield inside */}
          <Stars/>
          <img key={active} src={h.render} style={{
            position: 'absolute', bottom: '-4%', left: '50%',
            transform: `translateX(-50%) translateY(${float}px)`,
            width: '90%',
            filter: `drop-shadow(0 40px 60px rgba(0,0,0,0.7)) drop-shadow(0 0 80px ${h.glow})`,
            animation: 'heroReveal 900ms cubic-bezier(.16,1,.3,1)',
          }}/>
          {/* rarity + level chips */}
          <span style={{
            position: 'absolute', top: 20, left: 20,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '6px 12px', borderRadius: 999, color: h.color,
            background: 'rgba(0,0,0,0.55)', border: `1px solid ${h.color}88`,
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: h.color,
              boxShadow: `0 0 6px ${h.color}` }}/>
            ✦ {h.rarity}
          </span>
          <span style={{
            position: 'absolute', top: 20, right: 20,
            fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 12, color: '#FBF5FF',
            padding: '6px 12px', borderRadius: 999, background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(232,220,255,0.2)', backdropFilter: 'blur(8px)',
          }}>Lv 24 / 40</span>

          {/* bottom meta */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0,
            padding: '60px 28px 28px',
            background: 'linear-gradient(180deg, transparent, rgba(5,2,16,0.92))' }}>
            <div style={{ fontFamily: 'Onest, sans-serif', fontSize: 11, color: h.color,
              letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
              {h.tagline}
            </div>
            <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: 'clamp(36px, 4vw, 56px)',
              letterSpacing: '0.02em',
              background: active === 'sun'
                ? 'linear-gradient(180deg, #FFE18A 0%, #FBBF1A 50%, #B07200 100%)'
                : 'linear-gradient(160deg, #E4F4FF 0%, #6AB8F5 50%, #1F66BA 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              filter: 'drop-shadow(0 2px 0 rgba(0,0,0,0.4))', lineHeight: 1,
            }}>{h.name}</div>
            <div style={{ fontFamily: 'Onest, sans-serif', fontSize: 15, color: '#9F90B8',
              marginTop: 6, letterSpacing: '0.02em' }}>{h.cls}</div>
          </div>
        </div>

        {/* Right: stats + loadout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Description card */}
          <div style={{
            padding: 28, borderRadius: 22,
            background: '#1A1030',
            border: '1px solid rgba(232,220,255,0.1)',
            boxShadow: '0 20px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(232,220,255,0.06)',
          }}>
            <div style={{ fontFamily: 'Onest, sans-serif', fontSize: 15, lineHeight: 1.55, color: '#D7CAE6' }}>
              {h.desc}
            </div>
            {/* stat bars */}
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {h.stats.map(([label, val]) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontFamily: 'Onest, sans-serif', fontSize: 11,
                      letterSpacing: '0.24em', textTransform: 'uppercase', color: '#9F90B8', fontWeight: 700 }}>{label}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                      color: h.color, fontWeight: 700 }}>{val}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                    <div style={{
                      width: `${val}%`, height: '100%',
                      background: active === 'sun'
                        ? 'linear-gradient(90deg, #FFE18A, #FBBF1A, #B07200)'
                        : 'linear-gradient(90deg, #E4F4FF, #6AB8F5, #1F66BA)',
                      boxShadow: `0 0 10px ${h.glow}`,
                      transition: 'width 600ms cubic-bezier(.16,1,.3,1)',
                    }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Abilities list */}
          <div style={{
            padding: '8px 4px 4px', borderRadius: 22,
            background: '#1A1030',
            border: '1px solid rgba(232,220,255,0.1)',
            boxShadow: '0 20px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(232,220,255,0.06)',
            overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 20px 10px' }}>
              <span style={{ fontFamily: 'Onest, sans-serif', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.24em', textTransform: 'uppercase', color: '#9F90B8' }}>Set · Weapon · Bonuses</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                color: h.color, fontWeight: 700, letterSpacing: '0.1em' }}>{active === 'sun' ? 'GS 480' : 'GS 440'}</span>
            </div>
            {h.abilities.map((a, i) => (
              <div key={a.name} style={{
                position: 'relative',
                display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) auto', gap: 16,
                alignItems: 'center',
                padding: '14px 20px',
                borderTop: '1px solid rgba(232,220,255,0.06)',
                transition: 'background 220ms',
                cursor: 'default',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = `${h.color}10`; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                {/* slot glyph */}
                <div style={{
                  position: 'relative', width: 44, height: 44, borderRadius: 10,
                  background: `linear-gradient(145deg, ${h.color}22, transparent)`,
                  border: `1px solid ${h.color}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.35), 0 0 12px ${h.color}33`,
                }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 900, fontSize: 16,
                    color: h.color, letterSpacing: 0,
                    textShadow: `0 0 10px ${h.glow}` }}>
                    {['◈','◆','✦','❂'][i]}
                  </span>
                </div>
                {/* name + note */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: 14,
                      letterSpacing: '0.06em', color: '#FBF5FF' }}>{a.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                      color: h.color, fontWeight: 700, letterSpacing: '0.14em',
                      textTransform: 'uppercase' }}>{a.kind}</span>
                  </div>
                  <div style={{ fontFamily: 'Onest, sans-serif', fontSize: 12,
                    color: '#9F90B8', marginTop: 3, lineHeight: 1.45 }}>{a.note}</div>
                </div>
                {/* cost pill */}
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700,
                  color: '#D7CAE6', letterSpacing: '0.06em',
                  padding: '4px 10px', borderRadius: 999,
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(232,220,255,0.12)',
                  whiteSpace: 'nowrap',
                }}>{a.cost}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { HeroesSection });
