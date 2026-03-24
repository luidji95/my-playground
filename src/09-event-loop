// ===========================================
// EVENT LOOP - Kako JavaScript zapravo radi
// ===========================================

console.log('=== EVENT LOOP - JavaScript Asinhronost ===\n');

// ===========================================
// 1. OSNOVNI KONCEPTI
// ===========================================

console.log('--- 1. JavaScript je single-threaded ---\n');

console.log('JavaScript ima JEDNU glavnu nit izvršavanja.');
console.log('Ne može da radi dve stvari istovremeno.');
console.log('Ali asinhroni kod ne blokira izvršavanje zahvaljujući EVENT LOOP-u.\n');

/*
EVENT LOOP komponente:

┌─────────────────────────────────────────────────────────┐
│                    JAVASCRIPT ENGINE                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │                 CALL STACK                       │   │
│  │  (Ono što se IZVRŠAVA SADA)                     │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
│                         ↓                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │              WEB APIS (Browser)                 │   │
│  │  (setTimeout, fetch, DOM events)               │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
│                         ↓                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │            CALLBACK QUEUE (Macrotask)          │   │
│  │  (setTimeout, setInterval, I/O)                │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │           MICROTASK QUEUE (Higher priority)    │   │
│  │  (Promise.then, queueMicrotask)                │   │
│  └─────────────────────────────────────────────────┘   │
│                         │                               │
│                         ↓                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │                EVENT LOOP                       │   │
│  │  (Proverava da li je Call Stack prazan)        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
*/

// ===========================================
// 2. PRIORITETI IZVRŠAVANJA
// ===========================================

console.log('\n--- 2. Prioritet izvršavanja ---\n');
console.log('1️⃣  SAV SINHRONI KOD (Call Stack)');
console.log('2️⃣  SVE MIKROTASKE (Promise.then, queueMicrotask)');
console.log('3️⃣  JEDNA MACROTASKA (setTimeout, setInterval, I/O)');
console.log('4️⃣  Opet sve nove MIKROTASKE');
console.log('5️⃣  Opet jedna MACROTASKA');
console.log('... i tako u krug\n');

// ===========================================
// 3. PRIMER 1 - Osnovni redosled
// ===========================================

console.log('\n--- 3. PRIMER 1: Osnovni redosled ---\n');

console.log('Kod:');
console.log(`
console.log("1. Sinhroni kod");

setTimeout(() => {
    console.log("4. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Microtask (Promise)");
});

console.log("2. Sinhroni kod");
`);

console.log('Output:');
console.log('1. Sinhroni kod');
console.log('2. Sinhroni kod');
console.log('3. Microtask (Promise)');
console.log('4. Macrotask (setTimeout)\n');

// Demonstracija
console.log('=== DEMONSTRACIJA ===');
console.log("1. Sinhroni kod");

setTimeout(() => {
    console.log("4. Macrotask (setTimeout)");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Microtask (Promise)");
});

console.log("2. Sinhroni kod");
console.log('=== KRAJ DEMONSTRACIJE ===\n');

// ===========================================
// 4. PRIMER 2 - Microtask dodaje novu Microtask
// ===========================================

console.log('\n--- 4. PRIMER 2: Microtask dodaje novu Microtask ---\n');

console.log('Kod:');
console.log(`
console.log("1. Start");

Promise.resolve()
    .then(() => {
        console.log("2. Prva microtask");
        Promise.resolve().then(() => {
            console.log("3. Druga microtask (iz prve)");
        });
    })
    .then(() => {
        console.log("4. Treća microtask (lanac)");
    });

setTimeout(() => {
    console.log("5. Macrotask");
}, 0);

console.log("6. Kraj");
`);

console.log('Output:');
console.log('1. Start');
console.log('6. Kraj');
console.log('2. Prva microtask');
console.log('3. Druga microtask (iz prve)');
console.log('4. Treća microtask (lanac)');
console.log('5. Macrotask\n');

// ===========================================
// 5. PRIMER 3 - Promise vs setTimeout unutar drugog
// ===========================================

console.log('\n--- 5. PRIMER 3: Promise vs setTimeout ---\n');

console.log('Kod:');
console.log(`
console.log("1");

setTimeout(() => {
    console.log("2");
    Promise.resolve().then(() => {
        console.log("3");
    });
}, 0);

Promise.resolve().then(() => {
    console.log("4");
    setTimeout(() => {
        console.log("5");
    }, 0);
});

console.log("6");
`);

console.log('Output:');
console.log('1');
console.log('6');
console.log('4');
console.log('2');
console.log('3');
console.log('5\n');

// ===========================================
// 6. PRIMER 4 - Blokirajuća operacija
// ===========================================

console.log('\n--- 6. PRIMER 4: Blokirajuća operacija ---\n');

console.log('Kod:');
console.log(`
console.log("Početak");

setTimeout(() => {
    console.log("Timeout 1");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("Promise 1");
        // Blokirajuća operacija
        for (let i = 0; i < 1000000000; i++) {}
        console.log("Promise 1 završio");
    });

setTimeout(() => {
    console.log("Timeout 2");
}, 0);

console.log("Kraj");
`);

console.log('Output:');
console.log('Početak');
console.log('Kraj');
console.log('Promise 1');
console.log('Promise 1 završio (posle blokade)');
console.log('Timeout 1');
console.log('Timeout 2\n');

// ===========================================
// 7. PRIMER 5 - Complex chain
// ===========================================

console.log('\n--- 7. PRIMER 5: Kompleksni lanac ---\n');

console.log('Kod:');
console.log(`
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("C");
        setTimeout(() => {
            console.log("D");
        }, 0);
    })
    .then(() => {
        console.log("E");
    });

console.log("F");
`);

console.log('Output:');
console.log('A');
console.log('F');
console.log('C');
console.log('E');
console.log('B');
console.log('D\n');

// Demonstracija
console.log('=== DEMONSTRACIJA ===');
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("C");
        setTimeout(() => {
            console.log("D");
        }, 0);
    })
    .then(() => {
        console.log("E");
    });

console.log("F");
console.log('=== KRAJ DEMONSTRACIJE ===\n');

// ===========================================
// 8. TABELA POREĐENJA
// ===========================================

console.log('\n--- 8. POREĐENJE MICROTASK vs MACROTASK ---\n');

console.log(`
┌─────────────────────────────────────────────────────────────────┐
│                    MICROTASK QUEUE                              │
├─────────────────────────────────────────────────────────────────┤
│ • Promise.then()                                                │
│ • Promise.catch()                                               │
│ • Promise.finally()                                             │
│ • queueMicrotask()                                              │
│ • MutationObserver                                              │
├─────────────────────────────────────────────────────────────────┤
│ • VIŠI PRIORITET                                                │
│ • SVE se izvršavaju pre sledeće macrotaske                      │
│ • Izvršavaju se DODATE tokom trenutne microtask faze            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    MACROTASK QUEUE                              │
├─────────────────────────────────────────────────────────────────┤
│ • setTimeout()                                                  │
│ • setInterval()                                                 │
│ • I/O operacije (fetch, file reading)                          │
│ • DOM eventi (click, scroll...)                                │
│ • requestAnimationFrame()                                       │
├─────────────────────────────────────────────────────────────────┤
│ • NIŽI PRIORITET                                                │
│ • SAMO JEDNA po ciklusu                                         │
│ • Nove macrotaske čekaju sledeći ciklus                         │
└─────────────────────────────────────────────────────────────────┘
`);

// ===========================================
// 9. KVIZ ZA PROVERU ZNANJA
// ===========================================

console.log('\n--- 9. KVIZ ZA PROVERU ---\n');

console.log('Pitanje 1: Šta će se ispisati?');
console.log(`
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

Promise.resolve().then(() => {
    console.log("3");
});

console.log("4");
`);

console.log('\nOdgovor: 1, 4, 3, 2\n');

console.log('Pitanje 2: Šta će se ispisati?');
console.log(`
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve()
    .then(() => {
        console.log("C");
        return Promise.resolve();
    })
    .then(() => {
        console.log("D");
    });

console.log("E");
`);

console.log('\nOdgovor: A, E, C, D, B\n');

console.log('Pitanje 3: Zašto Promise.then() ima viši prioritet od setTimeout()?');
console.log('Odgovor: Promise.then() ide u Microtask queue koji se prazni PRE macrotask queue.\n');

// ===========================================
// 10. SAŽETAK
// ===========================================

console.log('\n=== SAŽETAK ===\n');

console.log(`
🎯 EVENT LOOP - KLJUČNE STVARI:

1. JavaScript je SINGLE-THREADED - ima jednu glavnu nit

2. CALL STACK - gde se izvršava sinhroni kod

3. MICROTASK QUEUE - viši prioritet
   • Promise.then()
   • queueMicrotask()
   • SVE se izvršavaju pre sledeće macrotaske

4. MACROTASK QUEUE - niži prioritet
   • setTimeout(), setInterval()
   • I/O operacije
   • SAMO JEDNA po ciklusu

5. EVENT LOOP - stalno proverava:
   • Ako je Call Stack prazan → prvo sve microtask → pa jedna macrotask

6. ZA PAMĆENJE:
   "Sinhroni kod → sve microtask → jedna macrotask → opet microtask → ..."
`);

// ===========================================
// 11. DODATNI RESURSI
// ===========================================

console.log('\n--- DODATNI RESURSI ---\n');
console.log('🔗 MDN - Event Loop: https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop');
console.log('🔗 Jake Archibald - Tasks, microtasks, queues and schedules');
console.log('🔗 Philip Roberts - What the heck is the event loop anyway? (YouTube)\n');

console.log('🎉 KRAJ LEKCIJE! 🎉');