// ===========================================
// ASYNC/AWAIT - Sintaktički šećer preko Promisa
// ===========================================

console.log('=== ASYNC/AWAIT - NAJČITLJIVIJI NAČIN ===\n');

// async funkcija uvek vraća Promise
async function myAsyncFunction() {
  return "Zdravo!";
}

myAsyncFunction().then(result => {
  console.log('Async funkcija vratila:', result);
});

// Primer 1: Osnovna async/await sintaksa
console.log('\n--- 1. Osnovna sintaksa ---\n');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sayHello() {
  console.log('1. Početak');
  await delay(1000); // Čeka 1 sekundu
  console.log('2. Posle 1 sekunde');
  await delay(2000); // Čeka još 2 sekunde
  console.log('3. Posle još 2 sekunde');
  return 'Gotovo!';
}

sayHello().then(result => {
  console.log('4.', result);
});

// Primer 2: Async/await sa fetch-om (simulacija)
console.log('\n--- 2. Async/await sa fetch-om ---\n');

function fakeFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Podaci sa ${url}` });
    }, 1000);
  });
}

async function fetchUserData() {
  console.log('📡 Fetchujem podatke...');
  
  const user = await fakeFetch('/api/user/1');
  console.log('✅ User:', user);
  
  const orders = await fakeFetch(`/api/orders/${user.data.split(' ').pop()}`);
  console.log('✅ Orders:', orders);
  
  const products = await fakeFetch(`/api/products/${orders.data.split(' ').pop()}`);
  console.log('✅ Products:', products);
  
  return { user, orders, products };
}

fetchUserData().then(result => {
  console.log('\n🎉 Svi podaci učitani:', result);
});

// Primer 3: Poređenje Promise vs async/await
console.log('\n--- 3. Poređenje Promise vs async/await ---\n');

// 🔹 Promise verzija
function getDataWithPromise() {
  return fetch('/api/user')
    .then(res => res.json())
    .then(user => fetch(`/api/orders/${user.id}`))
    .then(res => res.json())
    .then(orders => fetch(`/api/products/${orders[0].id}`))
    .then(res => res.json())
    .catch(err => console.error('Greška:', err));
}

// 🟢 async/await verzija (mnogo čitljivija!)
async function getDataWithAsyncAwait() {
  try {
    const userRes = await fetch('/api/user');
    const user = await userRes.json();
    
    const ordersRes = await fetch(`/api/orders/${user.id}`);
    const orders = await ordersRes.json();
    
    const productsRes = await fetch(`/api/products/${orders[0].id}`);
    const products = await productsRes.json();
    
    return products;
  } catch (error) {
    console.error('Greška:', error);
  }
}

console.log('Promise verzija: .then().then().catch()');
console.log('Async/await verzija: izgleda kao sinhroni kod!');

// Primer 4: Paralelno izvršavanje sa async/await
console.log('\n--- 4. Paralelno izvršavanje ---\n');

async function loadDashboard() {
  console.time('Dashboard load');
  
  // 🔴 SEKVENCIJALNO (sporo) - čeka svaki redom
  // const user = await fetchUser();
  // const orders = await fetchOrders();
  // const products = await fetchProducts();
  
  // 🟢 PARALELNO (brzo) - sve kreće istovremeno
  const [user, orders, products] = await Promise.all([
    fakeFetch('/api/user'),
    fakeFetch('/api/orders'),
    fakeFetch('/api/products')
  ]);
  
  console.timeEnd('Dashboard load');
  return { user, orders, products };
}

loadDashboard().then(dashboard => {
  console.log('Dashboard podaci:', dashboard);
});