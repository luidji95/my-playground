import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // ===========================================
  // 1. useEffect BEZ dependency array-a
  // ===========================================
  const [count1, setCount1] = useState(0);
  
  useEffect(() => {
    console.log("1. Efekat se izvršava posle SVAKOG renderovanja!");
    console.log("   Trenutni count1:", count1);
  }); // 👈 NEMA niza
  
  // ===========================================
  // 2. useEffect SA PRAZNIM nizom []
  // ===========================================
  const [data, setData] = useState(null);
  
  useEffect(() => {
    console.log("2. Efekat se izvršava SAMO JEDNOM - na mount!");
    
    // Simulacija fetch-a podataka
    setTimeout(() => {
      setData({ name: "Milos", role: "Developer" });
      console.log("   Podaci su učitani!");
    }, 1000);
  }, []); // 👈 PRAZAN niz
  
  // ===========================================
  // 3. useEffect SA ZAVISNOSTIMA [dependency]
  // ===========================================
  const [count2, setCount2] = useState(0);
  const [step, setStep] = useState(1);
  
  useEffect(() => {
    console.log(`3. Efekat se izvršava - count2 se promenio na: ${count2}`);
    console.log(`   (Ovo se dešava na mount + kad god se count2 promeni)`);
  }, [count2]); // 👈 ZAVISI OD count2
  
  // ===========================================
  // 4. CLEANUP funkcija - ČIŠĆENJE RESURSA
  // ===========================================
  const [seconds, setSeconds] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  
  // Timer komponenta sa cleanup-om
  function Timer() {
    useEffect(() => {
      console.log("4. Timer - startujem interval!");
      const interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
      
      // CLEANUP funkcija
      return () => {
        console.log("4. Timer - čistim interval!");
        clearInterval(interval);
      };
    }, []); // 👈 Prazan niz - samo na mount i unmount
    
    return <div>   Timer: {seconds} sekundi</div>;
  }
  
  // ===========================================
  // 5. FETCH PODATAKA SA LOADING STATE-OM
  // ===========================================
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    console.log(`5. Fetchujem podatke za user ID: ${userId}`);
    
    setLoading(true);
    setError(null);
    
    // Simulacija API poziva
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Neuspešan fetch');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]); // 👈 Fetch na promenu userId
  
  // ===========================================
  // 6. SEARCH SA DEBOUNCE-OM
  // ===========================================
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    
    console.log(`6. Debounce - čekam 500ms za: "${searchTerm}"`);
    
    const timer = setTimeout(() => {
      console.log(`6. Izvršavam pretragu za: "${searchTerm}"`);
      // Simulacija API poziva
      const results = [
        { id: 1, name: `Rezultat za "${searchTerm}" - 1` },
        { id: 2, name: `Rezultat za "${searchTerm}" - 2` },
      ];
      setSearchResults(results);
    }, 500);
    
    // CLEANUP - otkazujemo prethodni timer
    return () => {
      console.log(`6. Otkazujem pretragu za: "${searchTerm}"`);
      clearTimeout(timer);
    };
  }, [searchTerm]); // 👈 Na svaku promenu searchTerm-a

  return (
    <>
      <section className='my-plg'>
        <h1>useEffect - Kompletan vodič</h1>
        <p>📢 Otvori konzolu (F12) i prati logove!</p>
        
        {/* PRIMER 1 - Bez niza */}
        <div className='primer'>
          <h3>1. useEffect BEZ dependency array-a</h3>
          <p>Izvršava se posle SVAKOG renderovanja!</p>
          <button onClick={() => setCount1(c => c + 1)}>
            Klikni (count1: {count1})
          </button>
          <p className='napomena'>⚠️ Log se ispisuje na svaki klik + na mount</p>
        </div>
        
        {/* PRIMER 2 - Prazan niz */}
        <div className='primer'>
          <h3>2. useEffect SA PRAZNIM nizom []</h3>
          <p>Izvršava se SAMO JEDNOM - na mount!</p>
          <p>Podaci: {data ? data.name : "Učitavanje..."}</p>
        </div>
        
        {/* PRIMER 3 - Sa zavisnostima */}
        <div className='primer'>
          <h3>3. useEffect SA ZAVISNOSTIMA [count2]</h3>
          <p>Izvršava se na mount + kad se count2 promeni</p>
          <p>Count2: {count2} | Step: {step}</p>
          <button onClick={() => setCount2(c => c + step)}>
            Promeni count2
          </button>
          <button onClick={() => setStep(s => s + 1)}>
            Promeni step (ne utiče na useEffect!)
          </button>
          <p className='napomena'>💡 Step se menja, ALI useEffect se NE izvršava!</p>
        </div>
        
        {/* PRIMER 4 - Cleanup timer */}
        <div className='primer'>
          <h3>4. CLEANUP funkcija - Timer</h3>
          <button onClick={() => setShowTimer(!showTimer)}>
            {showTimer ? "Ugasi timer" : "Upali timer"}
          </button>
          {showTimer && <Timer />}
          <p className='napomena'>🧹 Cleanup čisti interval kad se timer ugasi</p>
        </div>
        
        {/* PRIMER 5 - Fetch podataka */}
        <div className='primer'>
          <h3>5. Fetch podataka sa loading state-om</h3>
          <p>User ID: {userId}</p>
          <button onClick={() => setUserId(prev => prev + 1)}>
            Sledeći korisnik
          </button>
          {loading && <p>⏳ Učitavanje...</p>}
          {error && <p>❌ Greška: {error}</p>}
          {user && <p>👤 Ime: {user.name}</p>}
          <p className='napomena'>🎯 Fetchuje se na mount + kad se userId promeni</p>
        </div>
        
        {/* PRIMER 6 - Search sa debounce */}
        <div className='primer'>
          <h3>6. Search sa debounce-om</h3>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pretraži..."
          />
          <div>
            {searchResults.map(r => <div key={r.id}>🔍 {r.name}</div>)}
          </div>
          <p className='napomena'>⏱️ Čeka 500ms posle poslednjeg kucanja pre pretrage</p>
        </div>
        
        {/* KVIZ SEKCJA */}
        <div className='kviz'>
          <h3>🎯 Testiraj svoje znanje:</h3>
          <ol>
            <li>useEffect(fn, []) - koliko puta se izvršava?</li>
            <li>useEffect(fn) - koliko puta se izvršava?</li>
            <li>useEffect(fn, [count]) i kliknemo 5 puta - koliko puta ukupno?</li>
            <li>Čemu služi return () =&gt; {} unutar useEffect-a?</li>
          </ol>
          <details>
            <summary>📖 Odgovori:</summary>
            <p>1. Samo jednom - na mount</p>
            <p>2. Na mount + posle SVAKOG renderovanja</p>
            <p>3. 6 puta (1 mount + 5 promena)</p>
            <p>4. Cleanup - čisti resurse pre unmount-a</p>
          </details>
        </div>
      </section>
    </>
  )
}

export default App

/*

===========================================
📚 USEFFECT - KOMPLETAN VODIČ
===========================================

1. ŠTA JE USEEFFECT?
-------------------
useEffect je React Hook koji omogućava izvršavanje SIDE EFEKATA u funkcionalnim komponentama.

SIDE EFEKTI su operacije koje "izlaze" iz React komponente:
• Fetchovanje podataka sa API-ja
• Ručno menjanje DOM-a
• Timer-i (setTimeout, setInterval)
• Event listener-i
• Subscriptions (WebSocket)
• Logovanje
• LocalStorage operacije


2. TRI NAČINA KORIŠĆENJA
-----------------------

🔹 BEZ dependency array-a
useEffect(() => {...});
→ Izvršava se na MOUNT + posle SVAKOG renderovanja
→ Oprez: Može dovesti do beskonačne petlje!

🔹 SA PRAZNIM nizom []
useEffect(() => {...}, []);
→ Izvršava se SAMO JEDNOM - na mount
→ Idealno za: fetch podataka, inicijalizaciju

🔹 SA ZAVISNOSTIMA [x, y]
useEffect(() => {...}, [x, y]);
→ Izvršava se na MOUNT + kad se x ili y promene
→ Idealno za: validaciju forme, fetch na promenu parametra


3. CLEANUP FUNKCIJA
------------------
useEffect(() => {
  // Side effect
  const interval = setInterval(...);
  
  // CLEANUP - čisti resurse
  return () => {
    clearInterval(interval);
  };
}, []);

KADA SE CLEANUP IZVRŠAVA:
• Pre nego što se komponenta UNIŠTI (unmount)
• Pre nego što se efekat PONOVO IZVRŠI (ako se zavisnosti promene)


4. ZLATNA PRAVILA
----------------

✅ DO:
• Uvek navedi SVE zavisnosti koje koristiš u efektu
• Koristi cleanup za sve što zahteva čišćenje
• Koristi više useEffect-ova za različite funkcionalnosti
• Stavi loading state za asinhrone operacije

❌ DON'T:
• Ne zaboravi dependency array - može izazvati beskonačne petlje!
• Ne koristi useEffect za računanje vrednosti koje mogu da se izračunaju tokom renderovanja
• Ne stavljaj u zavisnosti ono što se ne koristi u efektu


5. ČESTE GREŠKE
--------------

GREŠKA 1: Zaboravljen dependency array
❌ useEffect(() => { setCount(count + 1); });
✅ useEffect(() => { setCount(count + 1); }, [count]);

GREŠKA 2: Zaboravljen cleanup
❌ useEffect(() => { setInterval(fn, 1000); }, []);
✅ useEffect(() => { 
     const id = setInterval(fn, 1000); 
     return () => clearInterval(id);
   }, []);

GREŠKA 3: Pogrešne zavisnosti
❌ useEffect(() => { fetchUser(userId); }, []);
✅ useEffect(() => { fetchUser(userId); }, [userId]);


6. TABELA IZVRŠAVANJA
--------------------

| Dependency Array | Kada se izvršava?              | Cleanup se izvršava |
|------------------|--------------------------------|---------------------|
| []               | Samo na mount                  | Na unmount          |
| [x]              | Na mount + kad se x promeni    | Pre svakog novog    |
| Bez niza         | Na mount + posle SVAKOG render | Pre svakog novog    |


7. PRAKTIČNI PRIMERI
-------------------

🔹 FETCH PODATAKA:
useEffect(() => {
  fetch('/api/users')
    .then(res => res.json())
    .then(data => setUsers(data));
}, []);

🔹 TIMER:
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);
  return () => clearInterval(timer);
}, []);

🔹 DEBOUNCE SEARCH:
useEffect(() => {
  const timer = setTimeout(() => {
    searchAPI(searchTerm);
  }, 500);
  return () => clearTimeout(timer);
}, [searchTerm]);

🔹 EVENT LISTENER:
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


8. KONCEPTUALNO RAZUMEVANJE
--------------------------

Zamisli useEffect kao "poseban prostor" gde stavljaš stvari koje:
• Ne mogu da se urade tokom renderovanja
• Komuniciraju sa "spoljnim svetom"
• Zahtevaju sinhronizaciju sa nečim van React-a

React kaže: "Ti se bavi renderovanjem, a ja ću se pobrinuti 
da se tvoji efekti izvrše u pravo vreme i očiste kad više nisu potrebni."

*/