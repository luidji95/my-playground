import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // ===========================================
  // STATE ZA NAVIGACIJU IZMEĐU LEKCIJA
  // ===========================================
  const [activeLesson, setActiveLesson] = useState('callbacks');
  const [logs, setLogs] = useState<string[]>([]);

  // Funkcija za dodavanje logova (koristićemo je u primerima)
  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  // ===========================================
  // LEKCIJA 1: CALLBACK FUNKCIJE
  // ===========================================
  const runCallbackExamples = () => {
    setLogs([]);
    addLog('=== CALLBACK PRIMERI ===');

    // Primer 1: Sinhroni callback
    function sayHi(name: string) {
      addLog(`Callback: Zdravo, ${name}!`);
    }

    function greet(callback: (name: string) => void) {
      callback('Miloš');
    }

    greet(sayHi);

    // Primer 2: Asinhroni callback
    addLog('SetTimeout start...');
    setTimeout(() => {
      addLog('Asinhroni callback izvršen posle 1 sekunde');
    }, 1000);

    // Primer 3: Array callback
    const brojevi = [1, 2, 3];
    brojevi.forEach(num => {
      addLog(`forEach callback: ${num}`);
    });
  };

  // ===========================================
  // LEKCIJA 2: PROMISE
  // ===========================================
  const runPromiseExamples = () => {
    setLogs([]);
    addLog('=== PROMISE PRIMERI ===');

    // Simulacija fetch-a sa Promise
    function fetchUser(id: number): Promise<{ id: number; name: string }> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (id === 1) {
            resolve({ id: 1, name: 'Miloš' });
          } else {
            reject(new Error('Korisnik nije pronađen'));
          }
        }, 1000);
      });
    }

    addLog('Fetchujem korisnika...');
    fetchUser(1)
      .then(user => {
        addLog(`✅ User pronađen: ${user.name}`);
        return user;
      })
      .catch(error => {
        addLog(`❌ Greška: ${error.message}`);
      });

    // Promise.all primer
    const promise1 = Promise.resolve('Prvi');
    const promise2 = Promise.resolve('Drugi');
    const promise3 = Promise.resolve('Treći');

    Promise.all([promise1, promise2, promise3]).then(results => {
      addLog(`Promise.all rezultati: ${results.join(', ')}`);
    });
  };

  // ===========================================
  // LEKCIJA 3: ASYNC/AWAIT
  // ===========================================
  const runAsyncAwaitExamples = async () => {
    setLogs([]);
    addLog('=== ASYNC/AWAIT PRIMERI ===');

    // Simulacija delay-a
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    async function fetchUserData() {
      try {
        addLog('1. Fetchujem user-a...');
        await delay(1000);
        addLog('2. User pronađen');

        addLog('3. Fetchujem orders...');
        await delay(1000);
        addLog('4. Orders pronađeni');

        addLog('5. Fetchujem products...');
        await delay(1000);
        addLog('6. Products pronađeni');

        return { user: 'Miloš', orders: ['Laptop'], products: ['Gaming Laptop'] };
      } catch (error) {
        addLog(`❌ Greška: ${error}`);
      }
    }

    addLog('Počinjem async operaciju...');
    const data = await fetchUserData();
    if (data) {
      addLog(`✅ Krajnji rezultat: ${JSON.stringify(data)}`);
    }
  };

  // ===========================================
  // LEKCIJA 4: USEEFFECT SA ASYNC/AWAIT (React specifično)
  // ===========================================
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        // Simulacija API poziva
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (isMounted) {
          setData({ message: 'Podaci učitani!', timestamp: new Date().toISOString() });
          addLog('✅ useEffect: Podaci učitani');
        }
      } catch (error) {
        if (isMounted) {
          addLog(`❌ useEffect: Greška - ${error}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
      addLog('🧹 useEffect cleanup');
    };
  }, []);

  // ===========================================
  // RENDER
  // ===========================================
  return (
    <div className="App">
      <header className="app-header">
        <h1>🎓 JavaScript Playground</h1>
        <p>Callback | Promise | async/await | useEffect</p>
      </header>

      <div className="lesson-nav">
        <button onClick={() => setActiveLesson('callbacks')}>📞 Callback</button>
        <button onClick={() => setActiveLesson('promises')}>🤝 Promise</button>
        <button onClick={() => setActiveLesson('async-await')}>⚡ async/await</button>
        <button onClick={() => setActiveLesson('useEffect')}>⚛️ useEffect</button>
        <button onClick={() => setActiveLesson('comparison')}>📊 Poređenje</button>
      </div>

      <div className="lesson-content">
        {activeLesson === 'callbacks' && (
          <div className="lesson">
            <h2>📞 Callback Funkcije</h2>
            <p>Callback je funkcija prosleđena drugoj funkciji kao argument.</p>
            <button onClick={runCallbackExamples}>Pokreni Callback Primere</button>
            
            <div className="example">
              <h3>Primer koda:</h3>
              <pre>{`
function sayHi(name) {
  console.log("Hi, " + name);
}

function greet(callback) {
  callback("Miloš");
}

greet(sayHi); // Hi, Miloš
              `}</pre>
            </div>
          </div>
        )}

        {activeLesson === 'promises' && (
          <div className="lesson">
            <h2>🤝 Promise</h2>
            <p>Promise je objekat koji predstavlja asinhronu operaciju.</p>
            <button onClick={runPromiseExamples}>Pokreni Promise Primere</button>
            
            <div className="example">
              <h3>Primer koda:</h3>
              <pre>{`
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, name: "Miloš" });
      } else {
        reject(new Error("Korisnik nije pronađen"));
      }
    }, 1000);
  });
}

fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));
              `}</pre>
            </div>
          </div>
        )}

        {activeLesson === 'async-await' && (
          <div className="lesson">
            <h2>⚡ async/await</h2>
            <p>Sintaktički šećer preko Promisa - najčitljiviji način.</p>
            <button onClick={runAsyncAwaitExamples}>Pokreni async/await Primere</button>
            
            <div className="example">
              <h3>Primer koda:</h3>
              <pre>{`
async function fetchUserData() {
  try {
    const user = await fetchUser(1);
    const orders = await fetchOrders(user.id);
    const products = await fetchProducts(orders[0].id);
    return products;
  } catch (error) {
    console.error("Greška:", error);
  }
}
              `}</pre>
            </div>
          </div>
        )}

        {activeLesson === 'useEffect' && (
          <div className="lesson">
            <h2>⚛️ useEffect + async/await</h2>
            <p>Kako koristiti async/await unutar useEffect-a.</p>
            
            <div className="demo">
              <h3>Demo:</h3>
              {loading ? (
                <p>⏳ Učitavanje podataka...</p>
              ) : (
                <p>✅ {data?.message} <br /> 
                <small>{data?.timestamp}</small></p>
              )}
            </div>
            
            <div className="example">
              <h3>Primer koda:</h3>
              <pre>{`
useEffect(() => {
  let isMounted = true;
  
  async function fetchData() {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      if (isMounted) setData(data);
    } catch (error) {
      if (isMounted) setError(error);
    }
  }
  
  fetchData();
  
  return () => {
    isMounted = false; // Cleanup
  };
}, []);
              `}</pre>
            </div>
          </div>
        )}

        {activeLesson === 'comparison' && (
          <div className="lesson">
            <h2>📊 Poređenje: Callback vs Promise vs async/await</h2>
            
            <table className="comparison-table">
              <thead>
                <tr><th>Aspekt</th><th>Callback</th><th>Promise</th><th>async/await</th></tr>
              </thead>
              <tbody>
                <tr><td>Čitljivost</td><td>❌ Loša</td><td>🟡 Srednja</td><td>✅ Odlična</td></tr>
                <tr><td>Error handling</td><td>❌ Komplikovan</td><td>✅ .catch()</td><td>✅ try/catch</td></tr>
                <tr><td>Paralelno</td><td>❌ Teško</td><td>✅ Promise.all</td><td>✅ Promise.all</td></tr>
                <tr><td>Kada koristiti</td><td>Event handleri, array metode</td><td>Fetch, lančanje</td><td>Kompleksne operacije</td></tr>
              </tbody>
            </table>
            
            <button onClick={() => {
              setLogs([]);
              addLog('📊 Callback: najstariji način');
              addLog('📊 Promise: rešenje za callback hell');
              addLog('📊 async/await: najmoderniji i najčitljiviji');
            }}>Pokreni poređenje</button>
          </div>
        )}
      </div>

      <div className="console-logs">
        <h3>📝 Konzola (logovi):</h3>
        <button onClick={() => setLogs([])}>🗑️ Obriši logove</button>
        <div className="logs-container">
          {logs.length === 0 ? (
            <p className="empty-logs">Pokreni neki primer da vidiš logove...</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="log-entry">{log}</div>
            ))
          )}
        </div>
      </div>

      <style>{`
        .App {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }
        
        .app-header {
          text-align: center;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        
        .lesson-nav {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        
        .lesson-nav button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background: #f0f0f0;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s;
        }
        
        .lesson-nav button:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }
        
        .lesson-content {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }
        
        .lesson {
          animation: fadeIn 0.3s;
        }
        
        .lesson button {
          background: #667eea;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          margin: 10px 0;
        }
        
        .example {
          background: #2d3748;
          color: #e2e8f0;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
          overflow-x: auto;
        }
        
        .example pre {
          margin: 0;
          font-size: 14px;
        }
        
        .demo {
          background: #e2e8f0;
          padding: 15px;
          border-radius: 8px;
          margin: 15px 0;
          text-align: center;
        }
        
        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        
        .comparison-table th,
        .comparison-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }
        
        .comparison-table th {
          background: #667eea;
          color: white;
        }
        
        .console-logs {
          background: #1e1e1e;
          color: #d4d4d4;
          border-radius: 10px;
          padding: 15px;
        }
        
        .console-logs h3 {
          margin-top: 0;
          color: #4ec9b0;
        }
        
        .console-logs button {
          background: #4ec9b0;
          color: #1e1e1e;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 10px;
        }
        
        .logs-container {
          max-height: 300px;
          overflow-y: auto;
          font-family: 'Courier New', monospace;
          font-size: 12px;
        }
        
        .log-entry {
          padding: 4px 8px;
          border-bottom: 1px solid #333;
          font-family: monospace;
        }
        
        .empty-logs {
          color: #888;
          text-align: center;
          padding: 20px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;