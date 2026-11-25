(() => {
  'use strict';
  const root = document.documentElement;
  const get = key => {try {return localStorage.getItem(key)} catch {return null}};
  const set = (key, value) => {try {localStorage.setItem(key, value)} catch {}};
  const media = matchMedia('(prefers-color-scheme: light)');
  const language = document.getElementById('language');
  const theme = document.getElementById('theme');
  const print = document.getElementById('print');
  // getAttribute is also supported on SVG text, title and desc.
  const nodes = [...document.querySelectorAll('[data-en]')].map(el => [el, el.textContent, el.getAttribute('data-en')]);
  const preferred = (navigator.languages || [navigator.language]).find(l => /^(es|en)(-|$)/i.test(l || ''));
  const savedLang = get('vs-overview-language'), savedTheme = get('vs-overview-theme');
  let lang = ['es','en'].includes(savedLang) ? savedLang : /^es/i.test(preferred || '') ? 'es' : 'en';
  let mode = ['light','dark'].includes(savedTheme) ? savedTheme : media.matches ? 'light' : 'dark';
  function label(el, text) {el.title=text;el.setAttribute('aria-label',text)}
  function apply() {
    root.lang=lang;root.dataset.theme=mode;
    for (const [el, es, en] of nodes) el.textContent=lang==='es'?es:en;
    document.title=lang==='es'?'VirtualState · Arquitectura técnica':'VirtualState · Technical overview';
    document.querySelector('.controls').setAttribute('aria-label',lang==='es'?'Preferencias':'Preferences');
    language.textContent=lang==='es'?'EN':'ES';
    label(language,lang==='es'?'Read in English':'Leer en español');
    label(theme,lang==='es'?(mode==='dark'?'Activar tema claro':'Activar tema oscuro'):(mode==='dark'?'Use light theme':'Use dark theme'));
    label(print,lang==='es'?'Imprimir o guardar como PDF':'Print or save as PDF');
    document.querySelector('meta[name="theme-color"]').content=mode==='dark'?'#0b0f1a':'#f6f7fb';
  }
  language.addEventListener('click',()=>{lang=lang==='es'?'en':'es';set('vs-overview-language',lang);apply()});
  theme.addEventListener('click',()=>{mode=mode==='dark'?'light':'dark';set('vs-overview-theme',mode);apply()});
  print.addEventListener('click',()=>window.print());
  media.addEventListener?.('change',e=>{if(!get('vs-overview-theme')){mode=e.matches?'light':'dark';apply()}});
  apply();
  // Static arrows and labels convey the entire diagram; decorative motion is finite.
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer=new IntersectionObserver(entries=>{for(const entry of entries) if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}},{threshold:.25});
    document.querySelectorAll('.sheet').forEach(el=>observer.observe(el));
  }
})();
