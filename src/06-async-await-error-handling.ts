// ===========================================
// ERROR HANDLING SA ASYNC/AWAIT
// ===========================================

console.log('=== ERROR HANDLING U ASYNC/AWAIT ===\n');

// Primer 1: try/catch sa async/await
console.log('\n--- 1. try/catch ---\n');

async function riskyOperation() {
  try {
    console.log('Pokrećem rizičnu operaciju...');
    
    // Simulacija greške
    throw new Error('Nešto je pošlo po zlu!');
    
    // Ova linija se neće izvršiti
    console.log('Ovo se neće ispisati');
  } catch (error) {
    console.log('❌ Uhvaćena greška:', error.message);
  } finally {
    console.log('✅ Ovo se uvek izvršava');
  }
}

riskyOperation();

// Primer 2: Hvatanje grešaka iz fetch-a
console.log('\n--- 2. Fetch error handling ---\n');

async function fetchUserWithErrorHandling(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP greška! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ User pronađen:', data.name);
    return data;
    
  } catch (error) {
    console.log('❌ Greška pri fetch-u:', error.message);
    return null;
  }
}

// Test sa validnim ID-jem
await fetchUserWithErrorHandling(1);

// Test sa nepostojećim ID-jem
await fetchUserWithErrorHandling(999);

// Primer 3: Višestruki try/catch blokovi
console.log('\n--- 3. Višestruki try/catch ---\n');

async function loadUserDashboard(userId) {
  try {
    // Prvi blok - fetch user-a
    let user;
    try {
      const response = await fetch(`/api/users/${userId}`);
      user = await response.json();
      console.log('✅ User učitana');
    } catch (error) {
      console.error('❌ Ne mogu da učitan user-a:', error.message);
      throw new Error('Dashboard ne može da se učita - nedostaje user');
    }
    
    // Drugi blok - fetch orders
    let orders;
    try {
      const response = await fetch(`/api/orders/${user.id}`);
      orders = await response.json();
      console.log('✅ Orders učitani');
    } catch (error) {
      console.error('❌ Ne mogu da učitan orders:', error.message);
      orders = []; // Fallback - prazan niz
    }
    
    return { user, orders };
    
  } catch (error) {
    console.error('❌ Kritična greška:', error.message);
    return null;
  }
}

// Primer 4: Promise.catch() u async funkciji
console.log('\n--- 4. Promise.catch() u async funkciji ---\n');

async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout!');
    }
    throw error;
  }
}

// Primer 5: Global error handling
console.log('\n--- 5. Global error handling ---\n');

// Hvatanje neuhvaćenih Promise grešaka
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Neuhvaćena Promise greška:', reason);
});

// Hvatanje neuhvaćenih grešaka u async funkcijama
process.on('uncaughtException', (error) => {
  console.error('❌ Neuhvaćena greška:', error);
});

// Primer 6: Error handling strategije
console.log('\n--- 6. Strategije error handling-a ---\n');

// Strategija 1: Rani return
async function getUserWithEarlyReturn(id) {
  if (!id) {
    console.log('⚠️ ID nije prosleđen');
    return null;
  }
  
  try {
    const user = await fetchUser(id);
    return user;
  } catch (error) {
    console.error('❌ Greška:', error);
    return null;
  }
}

// Strategija 2: Fallback vrednosti
async function getProductWithFallback(id) {
  try {
    const product = await fetchProduct(id);
    return product;
  } catch (error) {
    console.warn('⚠️ Koristim fallback product');
    return { id: 0, name: 'Default Product', price: 0 };
  }
}

// Strategija 3: Retry mehanizam
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`Pokušaj ${i + 1} nije uspeo, ponavljam...`);
      await delay(1000 * (i + 1)); // Exponential backoff
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// KVIZ ZA PROVERU
console.log('\n=== QUIZ ===');
console.log('1. Kako se hvataju greške u async/await?');
console.log('2. Šta se dešava ako async funkcija baci error bez try/catch?');
console.log('3. Koja je razlika između throw new Error() i return Promise.reject()?');

/*
ODGOVORI:
1. Sa try/catch blokom
2. Promise se reject-uje i mora se uhvatiti sa .catch()
3. throw new Error() radi unutar async funkcije, Promise.reject() radi u Promise-u
*/