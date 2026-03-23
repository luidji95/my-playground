// ===========================================
// CALLBACK HELL - Problem i zašto je nastao
// ===========================================

console.log('=== CALLBACK HELL (Piramida propasti) ===\n');

// Simulacija API poziva sa callback-ovima
function getUser(id, callback) {
  setTimeout(() => {
    console.log(`  Fetchujem user-a ${id}...`);
    callback({ id: id, name: 'Miloš' });
  }, 500);
}

function getOrders(userId, callback) {
  setTimeout(() => {
    console.log(`  Fetchujem orders za user-a ${userId}...`);
    callback([
      { id: 1, product: 'Laptop' },
      { id: 2, product: 'Miš' }
    ]);
  }, 500);
}

function getProductDetails(orderId, callback) {
  setTimeout(() => {
    console.log(`  Fetchujem product details za order ${orderId}...`);
    callback({ id: orderId, name: 'Gaming Laptop', price: 1500 });
  }, 500);
}

function getReviews(productId, callback) {
  setTimeout(() => {
    console.log(`  Fetchujem reviews za product ${productId}...`);
    callback([
      { rating: 5, comment: 'Odličan!' },
      { rating: 4, comment: 'Dobar' }
    ]);
  }, 500);
}

// 🔴 PROBLEM: CALLBACK HELL
console.log('\n--- Callback Hell primer ---\n');

getUser(1, (user) => {
  console.log('User:', user);
  
  getOrders(user.id, (orders) => {
    console.log('Orders:', orders);
    
    getProductDetails(orders[0].id, (product) => {
      console.log('Product:', product);
      
      getReviews(product.id, (reviews) => {
        console.log('Reviews:', reviews);
        
        // 😫 Šta ako treba još jedan nivo?
        // Kod postaje nečitljiv i težak za održavanje!
        // Ovo je poznato kao "Pyramid of Doom"
        
        console.log('\n✅ Svi podaci učitani!');
        console.log(`
          Krajnji rezultat:
          Korisnik: ${user.name}
          Prvi order: ${orders[0].product}
          Proizvod: ${product.name} (${product.price}€)
          Ocena: ${reviews[0].rating}/5
        `);
      });
    });
  });
});

// Problemi sa callback hell-om:
// 1. Teško čitljiv kod (piramida)
// 2. Teško održavanje
// 3. Problem sa error handling-om
// 4. Teško dodavanje nove funkcionalnosti
// 5. Sporo izvršavanje (sekvencijalno)

console.log('\n=== PROBLEMI CALLBACK HELL-A ===');
console.log('❌ Teško čitljiv - piramida zagrada');
console.log('❌ Teško održavanje');
console.log('❌ Problem sa error handling-om');
console.log('❌ Teško dodavanje novih funkcija');
console.log('❌ Sporo - sve se izvršava sekvencijalno');

// Rešenje: Promises (naredna lekcija)