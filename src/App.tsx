import { useState, useEffect } from 'react';
import './App.css';

function App() {

// Ovo već imaš – NE BRIŠEŠ!
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) {
                resolve({ id: 1, name: "Miloš" });
            } else {
                reject("Korisnik nije pronađen");
            }
        }, 1000);
    });
}

// Ovo pišeš sad:
async function getUserAsync(id) {
    try {
        const user = await fetchUser(id);  // 👈 fetchUser vraća Promise
        console.log(user.name);
    } catch (error) {
        console.error(error);
    }
}

// Test:
getUserAsync(1); // "Miloš"
getUserAsync(2); // "Korisnik nije pronađen"



  

  return (
    <div className="App">
      

      <h1>App practice</h1>

      


         

    </div>
  );
}

export default App;