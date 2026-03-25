// ===========================================
// IIFE + MODULE PATTERN - Immediately Invoked Function Expression
// ===========================================

console.log('=== IIFE + MODULE PATTERN ===\n');

// ===========================================
// 1. ŠTA JE IIFE?
// ===========================================

console.log('--- 1. IIFE (Immediately Invoked Function Expression) ---\n');

/*
IIFE je funkcija koja se izvršava ČIM se definiše.
Sintaksa: (function() { ... })();
*/

// Osnovni IIFE
(function() {
    console.log('1. Ovo se izvršava odmah!');
})();

// IIFE sa arrow funkcijom
(() => {
    console.log('2. Arrow funkcija IIFE');
})();

// IIFE sa parametrima
(function(ime, godina) {
    console.log(`3. Zdravo ${ime}, godina je ${godina}`);
})('Miloš', 2024);

// ===========================================
// 2. ZAŠTO IIFE? – Problem sa globalnim scope-om
// ===========================================

console.log('\n--- 2. Problem sa globalnim scope-om ---\n');

// ❌ BEZ IIFE – varijable cure u globalni scope
var globalnaVar = "Ovo je globalno";
let globalnaLet = "Takođe globalno";

function nekaFunkcija() {
    console.log("Globalna funkcija");
}

console.log('globalnaVar:', globalnaVar);
console.log('globalnaLet:', globalnaLet);

// ✅ SA IIFE – varijable su ZAŠTIĆENE
(function() {
    var privatnaVar = "Ovo je privatno!";
    let privatnaLet = "Takođe privatno!";
    
    function privatnaFunkcija() {
        console.log("Privatna funkcija");
    }
    
    console.log('Unutar IIFE:', privatnaVar);
    // console.log(privatnaVar); // Van IIFE nije dostupno
})();

// console.log(privatnaVar); // ❌ ReferenceError – zaštićeno!

// ===========================================
// 3. MODULE PATTERN – Kreiranje privatnih i javnih API-ja
// ===========================================

console.log('\n--- 3. Module Pattern ---\n');

/*
Module Pattern koristi IIFE + Closure da kreira:
- PRIVATNE varijable i funkcije (unutar IIFE)
- JAVNE metode (koje se vraćaju)
*/

// Primer 1: Jednostavan modul
const kalkulator = (function() {
    // PRIVATNO – niko spolja ne može direktno da pristupi
    let rezultat = 0;
    
    function proveriBroj(broj) {
        if (typeof broj !== 'number') {
            throw new Error('Mora biti broj!');
        }
    }
    
    // JAVNO – ono što vraćamo
    return {
        dodaj: function(x) {
            proveriBroj(x);
            rezultat += x;
            return this;
        },
        oduzmi: function(x) {
            proveriBroj(x);
            rezultat -= x;
            return this;
        },
        pomnozi: function(x) {
            proveriBroj(x);
            rezultat *= x;
            return this;
        },
        podeli: function(x) {
            proveriBroj(x);
            if (x === 0) throw new Error('Deljenje nulom!');
            rezultat /= x;
            return this;
        },
        prikazi: function() {
            console.log(`Rezultat: ${rezultat}`);
            return this;
        },
        reset: function() {
            rezultat = 0;
            return this;
        }
    };
})();

// Korišćenje modula
kalkulator
    .dodaj(10)
    .oduzmi(3)
    .pomnozi(2)
    .prikazi(); // Rezultat: 14

kalkulator.reset().dodaj(5).prikazi(); // Rezultat: 5

// ===========================================
// 4. REVEALING MODULE PATTERN
// ===========================================

console.log('\n--- 4. Revealing Module Pattern ---\n');

/*
Revealing Module Pattern – sve funkcije su privatne,
pa se na kraju "otkriju" (reveal) samo one koje želimo.
*/

const korisnikModul = (function() {
    // PRIVATNE varijable
    let ime = '';
    let godine = 0;
    let email = '';
    
    // PRIVATNE funkcije (validacija)
    function validirajIme(ime) {
        if (!ime || ime.length < 2) {
            throw new Error('Ime mora imati bar 2 karaktera');
        }
        return true;
    }
    
    function validirajGodine(godine) {
        if (typeof godine !== 'number' || godine < 0 || godine > 150) {
            throw new Error('Neispravne godine');
        }
        return true;
    }
    
    function validirajEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            throw new Error('Neispravan email');
        }
        return true;
    }
    
    // JAVNE metode (biće otkrivene)
    function setIme(novoIme) {
        validirajIme(novoIme);
        ime = novoIme;
        return this;
    }
    
    function setGodine(noveGodine) {
        validirajGodine(noveGodine);
        godine = noveGodine;
        return this;
    }
    
    function setEmail(noviEmail) {
        validirajEmail(noviEmail);
        email = noviEmail;
        return this;
    }
    
    function getInfo() {
        return {
            ime: ime,
            godine: godine,
            email: email
        };
    }
    
    function prikazi() {
        console.log(`👤 ${ime}, ${godine} god., 📧 ${email}`);
        return this;
    }
    
    // REVEAL – otkrivamo samo JAVNE metode
    return {
        setIme: setIme,
        setGodine: setGodine,
        setEmail: setEmail,
        getInfo: getInfo,
        prikazi: prikazi
    };
})();

// Korišćenje
korisnikModul
    .setIme('Miloš')
    .setGodine(30)
    .setEmail('milos@example.com')
    .prikazi(); // 👤 Miloš, 30 god., 📧 milos@example.com

console.log('Info:', korisnikModul.getInfo());

// ===========================================
// 5. MODUL SA SINGLETON PATTERN-OM
// ===========================================

console.log('\n--- 5. Singleton Module (jedna instanca) ---\n');

const konfiguracija = (function() {
    // PRIVATNE varijable – samo jedna instanca
    let instance = null;
    let podešavanja = {
        tema: 'dark',
        jezik: 'sr',
        notifikacije: true
    };
    
    function init() {
        return {
            get: (key) => podešavanja[key],
            set: (key, value) => {
                podešavanja[key] = value;
                console.log(`Postavljeno: ${key} = ${value}`);
                return this;
            },
            getAll: () => ({ ...podešavanja }),
            reset: () => {
                podešavanja = {
                    tema: 'dark',
                    jezik: 'sr',
                    notifikacije: true
                };
                return this;
            }
        };
    }
    
    return {
        getInstance: function() {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

// Korišćenje singletona
const config1 = konfiguracija.getInstance();
const config2 = konfiguracija.getInstance();

config1.set('tema', 'light');
console.log('config1 tema:', config1.get('tema')); // light
console.log('config2 tema:', config2.get('tema')); // light (ista instanca!)

console.log('Da li su iste instance?', config1 === config2); // true

// ===========================================
// 6. MODULE PATTERN U PRAKSI – Counter
// ===========================================

console.log('\n--- 6. Praktični primer – Counter modul ---\n');

const counter = (function() {
    // PRIVATNO
    let count = 0;
    let history = [];
    
    function logAkciju(akcija, vrednost) {
        history.push({
            timestamp: new Date().toISOString(),
            akcija: akcija,
            vrednost: vrednost,
            novoStanje: count
        });
    }
    
    // JAVNO
    return {
        increment: function() {
            count++;
            logAkciju('INCREMENT', 1);
            return this;
        },
        decrement: function() {
            count--;
            logAkciju('DECREMENT', 1);
            return this;
        },
        add: function(x) {
            count += x;
            logAkciju('ADD', x);
            return this;
        },
        getValue: function() {
            return count;
        },
        getHistory: function() {
            return [...history]; // vraćamo kopiju, ne original
        },
        reset: function() {
            count = 0;
            history = [];
            logAkciju('RESET', 0);
            return this;
        }
    };
})();

// Test
counter
    .add(5)
    .increment()
    .add(3)
    .decrement()
    .increment();

console.log('Trenutna vrednost:', counter.getValue());
console.log('Istorija:', counter.getHistory());

// ===========================================
// 7. MODULI U ES6 (MODERNA ALTERNATIVA)
// ===========================================

console.log('\n--- 7. ES6 Moduli (moderan pristup) ---\n');

/*
// ES6 moduli – danas standard

// math.js
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// default export
export default function greet(name) {
    return `Hello ${name}`;
}

// app.js
import greet, { PI, add, multiply } from './math.js';

console.log(greet('Miloš'));
console.log(add(5, 3));
*/

console.log('ES6 moduli su moderni standard!');
console.log('IIFE + Module Pattern su bili pre ES6, ali i dalje se koriste za:');
console.log('  • Privatne varijable (pre # privatnih polja)');
console.log('  • Singleton pattern');
console.log('  • Legacy codebase-ovi');
console.log('  • Razumevanje closure-a');

// ===========================================
// 8. KVIZ ZA PROVERU
// ===========================================

console.log('\n--- 8. KVIZ ZA PROVERU ---\n');

console.log('Pitanje 1: Šta je IIFE i zašto se koristi?');
console.log('Odgovor: IIFE se izvršava odmah. Koristi se za izolaciju scope-a i kreiranje privatnih varijabli.\n');

console.log('Pitanje 2: Kako Module Pattern štiti privatne varijable?');
console.log('Odgovor: Koristi IIFE + Closure – varijable unutar IIFE su privatne, a vraćamo samo javne metode.\n');

console.log('Pitanje 3: Šta je Revealing Module Pattern?');
console.log('Odgovor: Sve funkcije su privatne, na kraju otkrivamo samo one koje želimo da budu javne.\n');

console.log('Pitanje 4: Koja je razlika između Module Pattern i ES6 modula?');
console.log('Odgovor: ES6 moduli su standard danas, ali Module Pattern koristi closure za pravljenje privatnih varijabli.\n');

// ===========================================
// 9. SAŽETAK
// ===========================================

console.log('\n=== SAŽETAK ===\n');

console.log(`
🎯 IIFE (Immediately Invoked Function Expression):

1. SINTARKSA: (function() { ... })();

2. ZAŠTO: Izolacija scope-a, sprečava curenje u globalni prostor

3. KORISTI SE ZA:
   • Module Pattern
   • Singleton Pattern
   • Privatne varijable pre ES6


🎯 MODULE PATTERN:

1. KREIRA: Privatne varijable + javne metode

2. RADI: IIFE vraća objekat sa javnim metodama

3. PREDNOSTI:
   • Enkapsulacija (privatno/javno)
   • Sprečava globalno zagađenje
   • Organizuje kod

4. MANE:
   • Memorija (svaka instanca ima svoj closure)
   • Teže testiranje privatnih delova


🎯 REVEALING MODULE PATTERN:

• Sve funkcije su privatne
• Na kraju se "otkriju" samo željene
• Čistija sintaksa


🎯 ES6 MODULI (danas standard):

export / import – modernija alternativa
`);

// ===========================================
// 10. DODATNI RESURSI
// ===========================================

console.log('\n--- DODATNI RESURSI ---\n');
console.log('🔗 MDN - IIFE: https://developer.mozilla.org/en-US/docs/Glossary/IIFE');
console.log('🔗 Module Pattern: https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript');

console.log('\n🎉 KRAJ LEKCIJE! 🎉');