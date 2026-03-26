// ===========================================
// DEBOUNCE & THROTTLE - Kontrola učestalosti izvršavanja
// ===========================================

console.log('=== DEBOUNCE & THROTTLE ===\n');

// ===========================================
// 1. PROBLEM – Previše poziva
// ===========================================

console.log('--- 1. Problem: Previše poziva ---\n');

// Zamisli da imaš search input koji na svako kucanje šalje API zahtev
// Korisnik ukuca "laptop" → 6 slova = 6 API poziva!
// Ovo je neefikasno i sporo

// Simulacija:
function searchAPI(query) {
    console.log(`🔍 Pretraga: "${query}"`);
    // U stvarnosti: fetch(`/api/search?q=${query}`)
}

// ❌ Loše: svako slovo šalje zahtev
const input = "laptop";
for (let char of input) {
    searchAPI(char); // L, a, p, t, o, p → 6 poziva!
}
// Output: 6 puta "🔍 Pretraga: ..."

// ===========================================
// 2. DEBOUNCE – Sačekaj da prestane da kuca
// ===========================================

console.log('\n--- 2. DEBOUNCE: Sačekaj da se smiri ---\n');

/*
DEBOUNCE:
- Izvršava funkciju TEK nakon što prođe određeno vreme BEZ novih poziva
- Koristi se za: Search input, resize event, auto-save
- Primer: Korisnik ukuca "laptop" → čekamo 500ms posle poslednjeg slova → 1 API poziv
*/

function debounce(fn, delay) {
    let timerId;
    
    return function(...args) {
        clearTimeout(timerId);  // Brišemo prethodni timer
        timerId = setTimeout(() => {
            fn(...args);        // Pozivamo tek posle delay
        }, delay);
    };
}

// Primer: Search input
const debouncedSearch = debounce((query) => {
    console.log(`✅ DEBOUNCE: Pretraga za "${query}"`);
}, 500);

// Simulacija kucanja "laptop"
console.log('Kucam: l');
debouncedSearch('l');
console.log('Kucam: la');
debouncedSearch('la');
console.log('Kucam: lap');
debouncedSearch('lap');
console.log('Kucam: lapt');
debouncedSearch('lapt');
console.log('Kucam: lapto');
debouncedSearch('lapto');
console.log('Kucam: laptop');
debouncedSearch('laptop');
console.log('Čekam 500ms...');
// Posle 500ms: ✅ DEBOUNCE: Pretraga za "laptop" (SAMO JEDNOM!)

// ===========================================
// 3. THROTTLE – Ograniči učestalost
// ===========================================

console.log('\n--- 3. THROTTLE: Ograniči na svakih X ms ---\n');

/*
THROTTLE:
- Izvršava funkciju NAJVIŠE JEDNOM u određenom vremenskom periodu
- Koristi se za: Scroll event, resize, mouse move, igrice
- Primer: Scroll → pozivamo funkciju svakih 200ms, koliko god da se scrolluje
*/

function throttle(fn, limit) {
    let inThrottle = false;
    
    return function(...args) {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

// Primer: Scroll event
const throttledScroll = throttle(() => {
    console.log(`📜 THROTTLE: Scroll pozicija: ${window.scrollY || 0}`);
}, 1000);

console.log('Simulacija scroll-a:');
throttledScroll(); // 📜 THROTTLE: Scroll pozicija: 0 (odmah)
throttledScroll(); // ignorisano (još nije prošlo 1000ms)
throttledScroll(); // ignorisano
setTimeout(() => throttledScroll(), 1100); // 📜 THROTTLE: (posle 1.1s)

// ===========================================
// 4. DEBOUNCE vs THROTTLE – Poređenje
// ===========================================

console.log('\n--- 4. Poređenje DEBOUNCE vs THROTTLE ---\n');

function debounceTest(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

function throttleTest(fn, limit) {
    let waiting = false;
    return (...args) => {
        if (!waiting) {
            fn(...args);
            waiting = true;
            setTimeout(() => { waiting = false; }, limit);
        }
    };
}

// Simulacija: 10 poziva u 1 sekundi
console.log('DEBOUNCE (delay 500ms):');
const deb = debounceTest((msg) => console.log(`  ${msg}`), 500);
for (let i = 0; i < 10; i++) {
    deb(`poziv ${i+1}`);
}
console.log('  → Samo POSLEDNJI poziv se izvrši (posle 500ms)');

console.log('\nTHROTTLE (limit 200ms):');
const thro = throttleTest((msg) => console.log(`  ${msg}`), 200);
for (let i = 0; i < 10; i++) {
    thro(`poziv ${i+1}`);
}
console.log('  → Prvi poziv odmah, zatim svakih 200ms');

// ===========================================
// 5. PRAKTIČNI PRIMERI
// ===========================================

console.log('\n--- 5. Praktični primeri ---\n');

// Primer 1: Auto-save forme (debounce)
console.log('Primer 1: Auto-save forma');
const autoSave = debounce((data) => {
    console.log(`💾 Auto-save: ${JSON.stringify(data)}`);
}, 1000);

autoSave({ title: 'a' });
autoSave({ title: 'ab' });
autoSave({ title: 'abc' });
setTimeout(() => {
    autoSave({ title: 'abc' });
}, 800);
// Posle 1s od POSLEDNJEG poziva → 1 auto-save

// Primer 2: Infinite scroll (throttle)
console.log('\nPrimer 2: Infinite scroll');
let scrollCount = 0;
const checkScroll = throttle(() => {
    scrollCount++;
    console.log(`📜 Scroll check #${scrollCount} - proveravam da li je kraj stranice`);
}, 500);

// Simulacija brzog scroll-a
for (let i = 0; i < 10; i++) {
    checkScroll();
}
// Output: SAMO 1 put! (prvi poziv)

// Primer 3: Resize event (debounce ili throttle?)
console.log('\nPrimer 3: Resize event');
console.log('  → DEBOUNCE: Sačekaj da korisnik završi sa resize-om');
console.log('  → THROTTLE: Ažuriraj layout tokom resize-a');

const resizeDebounce = debounce(() => {
    console.log('  🖼️ DEBOUNCE: Re-render posle resize-a');
}, 200);

const resizeThrottle = throttle(() => {
    console.log('  🖼️ THROTTLE: Ažuriranje tokom resize-a');
}, 200);

// ===========================================
// 6. REAL WORLD – React primer
// ===========================================

console.log('\n--- 6. React primer ---\n');

/*
// U React komponenti:

function SearchComponent() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    
    // Debounced search
    const debouncedSearch = useMemo(
        () => debounce(async (q) => {
            const res = await fetch(`/api/search?q=${q}`);
            const data = await res.json();
            setResults(data);
        }, 500),
        []
    );
    
    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };
    
    return (
        <input 
            value={query} 
            onChange={handleChange}
            placeholder="Pretraži..."
        />
    );
}
*/

// ===========================================
// 7. KADA ŠTA KORISTITI
// ===========================================

console.log('\n--- 7. KADA ŠTA KORISTITI ---\n');

console.log(`
┌─────────────────────────────────────────────────────────────────┐
│                      DEBOUNCE                                    │
├─────────────────────────────────────────────────────────────────┤
│ • Search input – sačekaj da korisnik prestane da kuca           │
│ • Auto-save – sačekaj da korisnik završi sa pisanjem            │
│ • Resize – sačekaj da korisnik završi sa resize-om              │
│ • Form validation – validiraj posle kucanja                     │
│                                                                  │
│ Pravilo: "Sačekaj da se smiri pa onda uradi"                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      THROTTLE                                    │
├─────────────────────────────────────────────────────────────────┤
│ • Scroll event – ažuriraj poziciju, ali ne svaki piksel         │
│ • Mousemove – pratni pokrete, ali ne svaki piksel               │
│ • Igre – pucanje na svakih X ms (cooldown)                      │
│ • API rate limiting – ograniči broj zahteva                     │
│                                                                  │
│ Pravilo: "Uradi, ali ne prečesto"                               │
└─────────────────────────────────────────────────────────────────┘
`);

// ===========================================
// 8. KVIZ ZA PROVERU
// ===========================================

console.log('\n--- 8. KVIZ ZA PROVERU ---\n');

console.log('Pitanje 1: Koji bi koristio za search input? Zašto?');
console.log('Odgovor: Debounce – sačekamo da korisnik prestane da kuca\n');

console.log('Pitanje 2: Koji bi koristio za scroll event? Zašto?');
console.log('Odgovor: Throttle – želimo da pratimo poziciju, ali ne svaki piksel\n');

console.log('Pitanje 3: Šta je razlika?');
console.log(`Debounce: Izvršava se TEK nakon što prođe vreme BEZ novih poziva
Throttle: Izvršava se NAJVIŠE JEDNOM u vremenskom intervalu\n`);

console.log('Pitanje 4: Kako bi debounce implementirao u React-u?');
console.log('Odgovor: useMemo + debounce funkcija, cleanup u useEffect\n');

// ===========================================
// 9. SAŽETAK
// ===========================================

console.log('\n=== SAŽETAK ===\n');

console.log(`
🎯 DEBOUNCE:
• Čeka da aktivnost prestane
• Poslednji poziv se izvršava
• Primer: search, auto-save

🎯 THROTTLE:
• Ograničava učestalost
• Prvi poziv se izvršava
• Primer: scroll, resize, mousemove

🎯 IMPLEMENTACIJA:
Debounce: clearTimeout + setTimeout
Throttle: flag + setTimeout

🎯 ZA PAMĆENJE:
"Debounce čeka, Throttle ograničava"
`);

console.log('\n🎉 KRAJ LEKCIJE! 🎉');