// ===========================================
// REAL WORLD PRIMERI
// ===========================================

console.log('=== REAL WORLD PRIMERI ===\n');

// Primer 1: Fetch podataka sa loading state-om
console.log('\n--- 1. Fetch sa loading state-om ---\n');

async function fetchProducts() {
  console.log('🔄 Učitavanje proizvoda...');
  
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    console.log(`✅ Učitano ${products.length} proizvoda`);
    return products;
  } catch (error) {
    console.error('❌ Greška pri učitavanju:', error.message);
    return [];
  }
}

// Primer 2: Search sa debounce-om
console.log('\n--- 2. Search sa debounce-om ---\n');

function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

async function searchProducts(query) {
  console.log(`🔍 Pretraga: "${query}"`);
  
  if (!query || query.length < 2) {
    console.log('  Premalo karaktera za pretragu');
    return [];
  }
  
  try {
    const response = await fetch(`https://fakestoreapi.com/products?q=${query}`);
    const results = await response.json();
    console.log(`  Pronađeno ${results.length} rezultata`);
    return results;
  } catch (error) {
    console.error('  Greška pri pretrazi:', error);
    return [];
  }
}

const debouncedSearch = debounce(searchProducts, 500);

// Simulacija kucanja
debouncedSearch('laptop');
debouncedSearch('lapto');
debouncedSearch('laptop');
// Samo poslednji će se izvršiti posle 500ms

// Primer 3: Paralelni zahtevi za dashboard
console.log('\n--- 3. Dashboard sa paralelnim zahtevima ---\n');

async function loadDashboardData() {
  console.time('Dashboard load');
  
  try {
    const [users, products, orders] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
      fetch('https://fakestoreapi.com/products').then(r => r.json()),
      fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json())
    ]);
    
    console.timeEnd('Dashboard load');
    
    return {
      usersCount: users.length,
      productsCount: products.length,
      ordersCount: orders.length,
      stats: {
        avgPrice: products.reduce((sum, p) => sum + p.price, 0) / products.length
      }
    };
  } catch (error) {
    console.error('❌ Greška pri učitavanju dashboard-a:', error);
    return null;
  }
}

// Primer 4: Upload fajla sa progress-om
console.log('\n--- 4. Upload fajla sa progress-om ---\n');

async function uploadFile(file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        onProgress(percent);
      }
    });
    
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error('Upload failed'));
      }
    });
    
    xhr.addEventListener('error', () => reject(new Error('Network error')));
    
    xhr.open('POST', '/upload');
    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
  });
}

// Primer 5: Polling (periodično proveravanje statusa)
console.log('\n--- 5. Polling - provera statusa ---\n');

async function pollStatus(taskId, maxAttempts = 10, interval = 1000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    console.log(`🔍 Provera statusa (${attempt}/${maxAttempts})...`);
    
    try {
      const response = await fetch(`/api/tasks/${taskId}/status`);
      const status = await response.json();
      
      if (status.completed) {
        console.log('✅ Task završen!');
        return status.result;
      }
      
      if (status.error) {
        throw new Error(status.error);
      }
      
      if (attempt === maxAttempts) {
        throw new Error('Task nije završen u vremenskom limitu');
      }
      
      await delay(interval);
    } catch (error) {
      console.error('❌ Greška pri polling-u:', error);
      throw error;
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Primer 6: React useEffect sa async/await
console.log('\n--- 6. React useEffect pattern ---\n');

/*
// Ovo je kako se koristi u React-u:

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error('User not found');
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setUser(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchUser();
    
    return () => {
      isMounted = false;
    };
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{user?.name}</div>;
}
*/

console.log('✅ React useEffect pattern je komentarisan, ali vidi primer iznad!');

// KVIZ ZA PROVERU
console.log('\n=== QUIZ ===');
console.log('1. Kako bi implementirao/la retry mehanizam za failed fetch?');
console.log('2. Šta je debounce i zašto se koristi u search-u?');
console.log('3. Kako bi optimizovao/la dashboard koji učitava 3 različita API-ja?');

/*
ODGOVORI:
1. Sa for petljom i try/catch, čekanje između pokušaja
2. Debounce odlaže izvršavanje dok ne prođe određeno vreme bez novih poziva
3. Koristiti Promise.all za paralelno izvršavanje umesto sekvencijalnog
*/