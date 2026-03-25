// ===========================================
// THIS, CALL, APPLY, BIND - Kompletan vodič
// ===========================================

console.log('=== THIS, CALL, APPLY, BIND ===\n');

// ===========================================
// 1. ŠTA JE "this"?
// ===========================================

console.log('--- 1. "this" u JavaScriptu ---\n');

/*
"this" je referenca na objekat koji IZVRŠAVA trenutnu funkciju.
Vrednost "this" zavisi od TOGA KAKO se funkcija POZIVA, a ne gde je definisana!
*/

// Primer 1: Globalni this (u browseru je window, u Node.js je global)
console.log('Globalni this:', typeof globalThis);

// ===========================================
// 2. RAZLIČITE VREDNOSTI "this"
// ===========================================

console.log('\n--- 2. Vrednosti "this" u različitim kontekstima ---\n');

// 🔹 U globalnom scope-u
console.log('1. Globalni scope:', this === globalThis); // true (u Node.js)

// 🔹 U običnoj funkciji (non-strict mode)
function obicnaFunkcija() {
    console.log('2. Obična funkcija (non-strict):', this === globalThis);
}
obicnaFunkcija();

// 🔹 U strogoj funkciji ("use strict")
function strogaFunkcija() {
    'use strict';
    console.log('3. Stroga funkcija:', this === undefined);
}
strogaFunkcija();

// 🔹 U metodu objekta
const objekat = {
    ime: 'Miloš',
    pozdrav: function() {
        console.log('4. Metod objekta:', this.ime);
    }
};
objekat.pozdrav(); // this = objekat

// 🔹 U arrow funkciji
const arrow = () => {
    console.log('5. Arrow funkcija:', this === globalThis); // Nasleđuje this iz okruženja
};
arrow();

// ===========================================
// 3. PROBLEM SA "this" – Kada ga izgubimo
// ===========================================

console.log('\n--- 3. Problem sa "this" ---\n');

const osoba = {
    ime: 'Miloš',
    pozdrav: function() {
        console.log(`Zdravo, ja sam ${this.ime}`);
    }
};

osoba.pozdrav(); // ✅ "Zdravo, ja sam Miloš"

// Problem: Čuvamo referencu funkcije
const pozdravFunkcija = osoba.pozdrav;
pozdravFunkcija(); // ❌ "Zdravo, ja sam undefined" (this je globalni objekat)

// Problem: setTimeout
setTimeout(osoba.pozdrav, 1000); // ❌ "Zdravo, ja sam undefined" (this je timeout objekat)

// ===========================================
// 4. REŠENJE 1: call() – Poziva funkciju sa zadatim this
// ===========================================

console.log('\n--- 4. call() ---\n');

/*
call() - poziva funkciju odmah
Sintaksa: funkcija.call(thisArg, arg1, arg2, ...)
*/

function predstaviSe(grad, godina) {
    console.log(`${this.ime} ima ${this.godine} godina, iz ${grad}, ${godina}.`);
}

const osoba1 = { ime: 'Miloš', godine: 30 };
const osoba2 = { ime: 'Petar', godine: 25 };

predstaviSe.call(osoba1, 'Beograd', 2024);
// "Miloš ima 30 godina, iz Beograd, 2024."

predstaviSe.call(osoba2, 'Novi Sad', 2024);
// "Petar ima 25 godina, iz Novi Sad, 2024."

// ===========================================
// 5. REŠENJE 2: apply() – Kao call, ali argumenti su niz
// ===========================================

console.log('\n--- 5. apply() ---\n');

/*
apply() - poziva funkciju odmah
Sintaksa: funkcija.apply(thisArg, [arg1, arg2, ...])
*/

function predstaviSe(grad, godina) {
    console.log(`${this.ime} ima ${this.godine} godina, iz ${grad}, ${godina}.`);
}

const osoba3 = { ime: 'Jelena', godine: 28 };

predstaviSe.apply(osoba3, ['Niš', 2024]);
// "Jelena ima 28 godina, iz Niš, 2024."

// Razlika: call() prima argumente pojedinačno, apply() prima niz
predstaviSe.call(osoba3, 'Niš', 2024);    // pojedinačno
predstaviSe.apply(osoba3, ['Niš', 2024]); // niz

// ===========================================
// 6. REŠENJE 3: bind() – Vraća NOVU funkciju sa trajnim this
// ===========================================

console.log('\n--- 6. bind() ---\n');

/*
bind() - ne poziva funkciju odmah, vraća NOVU funkciju sa vezanim this
Sintaksa: novaFunkcija = funkcija.bind(thisArg, arg1, arg2, ...)
*/

const osoba4 = { ime: 'Miloš', godine: 30 };

function pozdrav() {
    console.log(`Zdravo, ja sam ${this.ime}`);
}

const vezaniPozdrav = pozdrav.bind(osoba4);
vezaniPozdrav(); // "Zdravo, ja sam Miloš"

// Rešavanje setTimeout problema:
setTimeout(pozdrav.bind(osoba4), 1000); // ✅ "Zdravo, ja sam Miloš"

// Bind sa argumentima (currying)
function mnozenje(a, b) {
    return a * b;
}

const duplo = mnozenje.bind(null, 2); // fiksiramo prvi argument na 2
console.log('duplo(5):', duplo(5)); // 10
console.log('duplo(10):', duplo(10)); // 20

const puta3 = mnozenje.bind(null, 3);
console.log('puta3(4):', puta3(4)); // 12

// ===========================================
// 7. PRAKTIČNI PRIMERI
// ===========================================

console.log('\n--- 7. Praktični primeri ---\n');

// Primer 1: Event handler sa bind
console.log('\nPrimer 1: Event handler');

const dugme = {
    tekst: 'Klikni me',
    klik: function() {
        console.log(`Kliknuto na: ${this.tekst}`);
    }
};

// U realnom DOM-u bi bilo:
// document.getElementById('dugme').addEventListener('click', dugme.klik.bind(dugme));

// Simulacija:
setTimeout(dugme.klik.bind(dugme), 100); // "Kliknuto na: Klikni me"

// Primer 2: Kalkulator sa bind
console.log('\nPrimer 2: Kalkulator');

const kalkulator = {
    vrednost: 0,
    dodaj: function(x) {
        this.vrednost += x;
        return this;
    },
    oduzmi: function(x) {
        this.vrednost -= x;
        return this;
    },
    prikazi: function() {
        console.log(`Trenutna vrednost: ${this.vrednost}`);
        return this;
    }
};

// Method chaining sa bind-om
kalkulator.dodaj(5).oduzmi(2).prikazi(); // Trenutna vrednost: 3

// Primer 3: Array metode sa this
console.log('\nPrimer 3: Array metode');

const kolekcija = {
    mnozilac: 2,
    pomnozi: function(brojevi) {
        return brojevi.map(function(broj) {
            return broj * this.mnozilac;
        }.bind(this)); // 👈 bind rešava problem this
    }
};

console.log(kolekcija.pomnozi([1, 2, 3])); // [2, 4, 6]

// Modernije rešenje sa arrow funkcijom
const kolekcija2 = {
    mnozilac: 2,
    pomnozi: function(brojevi) {
        return brojevi.map(broj => broj * this.mnozilac); // arrow nasleđuje this
    }
};

console.log(kolekcija2.pomnozi([1, 2, 3])); // [2, 4, 6]

// ===========================================
// 8. call vs apply vs bind – Poređenje
// ===========================================

console.log('\n--- 8. Poređenje call, apply, bind ---\n');

console.log(`
┌──────────┬─────────────────────────────────────────────────────────────┐
│  Metod   │                     Karakteristike                          │
├──────────┼─────────────────────────────────────────────────────────────┤
│ call()   │ • Poziva funkciju ODMAH                                     │
│          │ • Argumenti se prosleđuju POJEDINAČNO                       │
│          │ • Sintaksa: fn.call(this, arg1, arg2)                       │
├──────────┼─────────────────────────────────────────────────────────────┤
│ apply()  │ • Poziva funkciju ODMAH                                     │
│          │ • Argumenti se prosleđuju kao NIZ                           │
│          │ • Sintaksa: fn.apply(this, [arg1, arg2])                    │
├──────────┼─────────────────────────────────────────────────────────────┤
│ bind()   │ • NE POZIVA funkciju odmah                                  │
│          │ • Vraća NOVU funkciju sa trajnim this                       │
│          │ • Sintaksa: const nova = fn.bind(this, arg1, arg2)          │
└──────────┴─────────────────────────────────────────────────────────────┘
`);

// ===========================================
// 9. KVIZ ZA PROVERU
// ===========================================

console.log('\n--- 9. KVIZ ZA PROVERU ---\n');

console.log('Pitanje 1: Šta će se ispisati?');
console.log(`
const obj = {
    ime: 'Miloš',
    pozdrav: function() {
        console.log(this.ime);
    }
};

const fn = obj.pozdrav;
fn();
`);

console.log('\nOdgovor: undefined (fn se poziva u globalnom kontekstu)\n');

console.log('Pitanje 2: Kako bi popravio/la prethodni primer?');
console.log('Odgovor: fn.bind(obj)() ili fn.call(obj)\n');

console.log('Pitanje 3: Koja je razlika između call() i apply()?');
console.log('Odgovor: call() prima argumente pojedinačno, apply() prima niz argumenata\n');

console.log('Pitanje 4: Kada se koristi bind()?');
console.log('Odgovor: Kada želimo da sačuvamo funkciju sa trajnim this za kasnije pozivanje\n');

// ===========================================
// 10. SAŽETAK
// ===========================================

console.log('\n=== SAŽETAK ===\n');

console.log(`
🎯 THIS – Šta treba da znaš:

1. "this" zavisi od TOGA KAKO se funkcija POZIVA, ne gde je definisana

2. Vrednosti "this":
   • Obična funkcija (non-strict) → globalni objekat
   • Stroga funkcija → undefined
   • Metod objekta → objekat
   • Arrow funkcija → nasleđuje this iz okruženja
   • Konstruktor (new) → novi objekat

3. call() – poziva odmah, argumenti pojedinačno

4. apply() – poziva odmah, argumenti kao niz

5. bind() – vraća novu funkciju sa trajnim this

6. ZA PAMĆENJE:
   "call i apply pozivaju odmah, bind pravi novu funkciju"
`);

// ===========================================
// 11. DODATNI RESURSI
// ===========================================

console.log('\n--- DODATNI RESURSI ---\n');
console.log('🔗 MDN - this: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this');
console.log('🔗 MDN - call: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call');
console.log('🔗 MDN - apply: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply');
console.log('🔗 MDN - bind: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind');

console.log('\n🎉 KRAJ LEKCIJE! 🎉');