// ===========================================
// PROMISE CHAINING - Rešenje za Callback Hell
// ===========================================

console.log('=== PROMISE CHAINING - POREĐENJE SA CALLBACK HELL-OM ===\n');

// Simulacija API poziva sa Promise-ima
function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('  Fetchujem user-a...');
      resolve({ id: id, name: 'Miloš' });
    }, 500);
  });
}

function getOrders(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('  Fetchujem orders...');
      resolve([
        { id: 1, product: 'Laptop', userId: user.id },
        { id: 2, product: 'Miš', userId: user.id }
      ]);
    }, 500);
  });
}

function getProductDetails(order) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('  Fetchujem product details...');
      resolve({ 
        id: order.id, 
        name: order.product === 'Laptop' ? 'Gaming Laptop' : 'Wireless Mouse',
        price: order.product === 'Laptop' ? 1500 : 50
      });
    }, 500);
  });
}

function getReviews(product) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('  Fetchujem reviews...');
      resolve([
        { rating: 5, comment: 'Odličan proizvod!' },
        { rating: 4, comment: 'Dobar, ali skup' }
      ]);
    }, 500);
  });
}

// ✅ REŠENJE: Promise Chaining
console.log('\n--- Promise Chaining (čist kod) ---\n');

getUser(1)
  .then(user => {
    console.log('User:', user);
    return getOrders(user);
  })
  .then(orders => {
    console.log('Orders:', orders);
    return getProductDetails(orders[0]);
  })
  .then(product => {
    console.log('Product:', product);
    return getReviews(product);
  })
  .then(reviews => {
    console.log('Reviews:', reviews);
    console.log('\n✅ Svi podaci učitani!');
    console.log(`
      Krajnji rezultat (Promise Chain):
      Korisnik: Miloš
      Proizvod: Gaming Laptop (1500€)
      Ocena: 5/5
    `);
  })
  .catch(error => {
    console.error('Greška:', error);
  });

// Prednosti Promise Chain-a:
console.log('\n=== PREDNOSTI PROMISE CHAIN-A ===');
console.log('✅ Čitljiv kod - nema piramide');
console.log('✅ Lako dodavanje novih koraka');
console.log('✅ Centralizovan error handling');
console.log('✅ Lako paralelno izvršavanje (Promise.all)');
console.log('✅ Lako testiranje');

// Primer sa paralelnim izvršavanjem
console.log('\n--- Paralelno izvršavanje sa Promise.all ---\n');

function fetchUserData() {
  return new Promise(resolve => setTimeout(() => resolve('User data'), 1000));
}

function fetchOrdersData() {
  return new Promise(resolve => setTimeout(() => resolve('Orders data'), 1000));
}

function fetchProductsData() {
  return new Promise(resolve => setTimeout(() => resolve('Products data'), 1000));
}

console.time('Vreme izvršavanja');

Promise.all([
  fetchUserData(),
  fetchOrdersData(),
  fetchProductsData()
]).then(([user, orders, products]) => {
  console.log('Svi podaci stigli:', { user, orders, products });
  console.timeEnd('Vreme izvršavanja'); // Oko 1 sekunda, ne 3!
});

// Promise.race - prvi koji se završi
console.log('\n--- Promise.race ---\n');

const slowPromise = new Promise(resolve => setTimeout(() => resolve('Spor'), 2000));
const fastPromise = new Promise(resolve => setTimeout(() => resolve('Brzi'), 1000));

Promise.race([slowPromise, fastPromise]).then(result => {
  console.log('Pobednik je:', result); // Brzi
});