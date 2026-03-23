// ===========================================
// POREĐENJE: Callback vs Promise vs async/await
// ===========================================

console.log('=== POREĐENJE SVA TRI PRISTUPA ===\n');

// Simulacija API-ja
const api = {
  getUser: (id) => new Promise(resolve => 
    setTimeout(() => resolve({ id, name: 'Miloš' }), 500)
  ),
  getOrders: (userId) => new Promise(resolve => 
    setTimeout(() => resolve([{ id: 1, product: 'Laptop' }]), 500)
  ),
  getProduct: (orderId) => new Promise(resolve => 
    setTimeout(() => resolve({ id: orderId, name: 'Gaming Laptop', price: 1500 }), 500)
  )
};

// 1. CALLBACK verzija
console.log('\n--- 1. CALLBACK HELL ---\n');

function getDataWithCallback(userId, callback) {
  api.getUser(userId, (user) => {
    api.getOrders(user.id, (orders) => {
      api.getProduct(orders[0].id, (product) => {
        callback(product);
      });
    });
  });
}

getDataWithCallback(1, (product) => {
  console.log('Callback rezultat:', product);
});

// 2. PROMISE verzija
console.log('\n--- 2. PROMISE CHAIN ---\n');

function getDataWithPromise(userId) {
  return api.getUser(userId)
    .then(user => api.getOrders(user.id))
    .then(orders => api.getProduct(orders[0].id));
}

getDataWithPromise(1)
  .then(product => console.log('Promise rezultat:', product))
  .catch(error => console.error('Greška:', error));

// 3. ASYNC/AWAIT verzija
console.log('\n--- 3. ASYNC/AWAIT ---\n');

async function getDataWithAsyncAwait(userId) {
  try {
    const user = await api.getUser(userId);
    const orders = await api.getOrders(user.id);
    const product = await api.getProduct(orders[0].id);
    return product;
  } catch (error) {
    console.error('Greška:', error);
  }
}

getDataWithAsyncAwait(1).then(product => {
  console.log('Async/await rezultat:', product);
});

// POREĐENJE PERFORMANSI
console.log('\n=== POREĐENJE PERFORMANSI ===\n');

async function measurePerformance() {
  // Sekvencijalno (sporo)
  console.time('Sekvencijalno');
  const user = await api.getUser(1);
  const orders = await api.getOrders(user.id);
  const product = await api.getProduct(orders[0].id);
  console.timeEnd('Sekvencijalno');
  
  // Paralelno (brzo)
  console.time('Paralelno');
  const [user2, orders2, product2] = await Promise.all([
    api.getUser(1),
    api.getOrders(1),
    api.getProduct(1)
  ]);
  console.timeEnd('Paralelno');
}

measurePerformance();

// TABELA POREĐENJA
console.log('\n=== TABELA POREĐENJA ===');
console.log(`
┌─────────────────┬──────────────────────────┬──────────────────────────┬──────────────────────────┐
│     Aspekt      │        Callback          │         Promise          │       async/await        │
├─────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Čitljivost      │ ❌ Loša (piramida)       │ 🟡 Srednja (.then)       │ ✅ Odlična (linijski)    │
├─────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Error handling  │ ❌ Svaki nivo posebno    │ ✅ Centralizovan (.catch)│ ✅ try/catch blok        │
├─────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Debugging       │ ❌ Težak                 │ 🟡 Srednje težak         │ ✅ Lak (kao sinhroni)    │
├─────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Paralelno       │ ❌ Komplikovano          │ ✅ Promise.all           │ ✅ Promise.all           │
├─────────────────┼──────────────────────────┼──────────────────────────┼──────────────────────────┤
│ Korišćenje      │ 🟡 I dalje (eventi)     │ ✅ Široko               │ ✅ Standard danas        │
└─────────────────┴──────────────────────────┴──────────────────────────┴──────────────────────────┘
`);

// KADA ŠTA KORISTITI?
console.log('\n=== KADA ŠTA KORISTITI ===\n');

console.log('🔹 CALLBACK:');
console.log('  - Event handleri (onClick, onChange)');
console.log('  - Array metode (map, filter, forEach)');
console.log('  - setTimeout, setInterval');
console.log('  - Kada je jednostavno i nema ugnježdavanja');

console.log('\n🔹 PROMISE:');
console.log('  - Fetch API');
console.log('  - Kada treba da lančaš asinhrone operacije');
console.log('  - Promise.all za paralelno izvršavanje');
console.log('  - Kada treba da podržavaš .then() sintaksu');

console.log('\n🔹 ASYNC/AWAIT:');
console.log('  - Kompleksne asinhrone operacije');
console.log('  - Kada želiš najčitljiviji kod');
console.log('  - U React useEffect-u');
console.log('  - Danas je STANDARD za većinu asinhronog koda');

// KVIZ ZA PROVERU
console.log('\n=== FINAL QUIZ ===');
console.log('1. Koji pristup bi koristio/la za fetch podataka u React useEffect-u?');
console.log('2. Kako bi paralelno učitavao/la 3 različita API-ja?');
console.log('3. Koji pristup je najbolji za čitljivost kod kompleksnih operacija?');

/*
ODGOVORI:
1. async/await sa try/catch i cleanup flag-om
2. Promise.all ili Promise.allSettled
3. async/await - izgleda kao sinhroni kod
*/