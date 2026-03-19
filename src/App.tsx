import { useState } from 'react'
import './App.css'

function App() {
  // ===========================================
  // 1. FUNKCIJE - TRI OBLIKA
  // ===========================================
  
  // 🔹 Funkcija deklaracija - hoistuje se
  greet1(); // ✅ RADI - hoisting
  function greet1() {
    console.log("1. Funkcija deklaracija - moze se pozvati pre definicije");
  }
  
  // 🔹 Funkcija izraz (function expression) - NE hoistuje se
  // greet2(); // ❌ ERROR - ne moze pre definicije
  const greet2 = function() {
    console.log("2. Function expression - ne moze pre definicije");
  };
  
  // 🔹 Arrow funkcija - NE hoistuje se, nema svoj this
  // greet3(); // ❌ ERROR - ne moze pre definicije
  const greet3 = () => {
    console.log("3. Arrow funkcija - kratka sintaksa, nema svoj this");
  };
  
  // Pozovi ih posle definicije
  greet1();
  greet2(); 
  greet3();
  
  // ===========================================
  // 2. SCOPE (domet promenljivih)
  // ===========================================
  
  // 🔹 Global scope
  var globalVar = "Ja sam globalna (var)";
  let globalLet = "Ja sam globalna (let)";
  
  function scopeExample() {
    // 🔹 Funkcijski scope
    var funkcijskaVar = "Samo u funkciji (var)";
    let funkcijskaLet = "Samo u funkciji (let)";
    
    if (true) {
      // 🔹 Blok scope
      var varUBloku = "Var - izlazi iz bloka!"; // Var IGNORISE blok scope
      let letUBloku = "Let - ostaje u bloku";   // Let postuje blok scope
      console.log(letUBloku); // ✅ radi unutar bloka
    }
    
    console.log(varUBloku); // ✅ radi - var ignorise blok
    // console.log(letUBloku); // ❌ ERROR - van bloka
  }
  
  scopeExample();
  console.log(globalVar); // ✅ radi
  console.log(globalLet); // ✅ radi
  // console.log(funkcijskaVar); // ❌ ERROR - van funkcije
  
  // ===========================================
  // 3. HOISTING i TDZ (Temporal Dead Zone)
  // ===========================================
  
  // 🔹 Var hoisting
  console.log("Var pre deklaracije:", varHoist); // undefined (hoistovano)
  var varHoist = "Var je hoistovan kao undefined";
  
  // 🔹 Let/Const hoisting - TDZ
  // console.log(letHoist); // ❌ ERROR - u TDZ
  let letHoist = "Let je hoistovan ali u TDZ";
  
  // 🔹 Function hoisting
  hoistMe(); // ✅ RADI - cela funkcija se hoistuje
  function hoistMe() {
    console.log("Funkcija deklaracija - cela se hoistuje");
  }
  
  // ===========================================
  // 4. CLOSURE (zatvorenje)
  // ===========================================
  
  function counter() {
    let count = 0; // "Zatvorena" varijabla
    
    return function() {
      count++; // I dalje ima pristup count
      console.log("Trenutni broj:", count);
      return count;
    };
  }
  
  const mojBrojac = counter(); // Pravimo instancu brojaca
  mojBrojac(); // 1
  mojBrojac(); // 2
  mojBrojac(); // 3 - "zapamti" stanje
  
  // Jos jedan closure primer
  function napraviPozdrav(ime) {
    return function() {
      console.log(`Zdravo, ${ime}!`); // Ime je "zarobljeno"
    };
  }
  
  const pozdravMilos = napraviPozdrav("Milos");
  const pozdravPetar = napraviPozdrav("Petar");
  
  pozdravMilos(); // Zdravo, Milos!
  pozdravPetar(); // Zdravo, Petar!

  return (
    <>
      <section className='my-plg'>
        <h1>Funkcije, Scope, Hoisting, Closure</h1>
        <p> Otvori konzolu (F12) da vidiš primere!</p>
        
        <div className='lekcija'>
          <h3> Ključne razlike:</h3>
          <ul>
            <li><strong>Funkcija deklaracija:</strong> Hoistuje se - može pre definicije</li>
            <li><strong>Function expression:</strong> Ne hoistuje se - mora posle definicije</li>
            <li><strong>Arrow funkcija:</strong> Nema svoj this, idealna za callback</li>
            <li><strong>var:</strong> Funkcijski scope, hoistuje se kao undefined</li>
            <li><strong>let/const:</strong> Blok scope, hoistuju se ali u TDZ</li>
            <li><strong>Closure:</strong> Funkcija "pamti" scope u kome je kreirana</li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default App

/*

===========================================
📚 SAŽETAK - FUNKCIJE, SCOPE, HOISTING, CLOSURE
===========================================

1. FUNKCIJE - TRI OBLIKA:
------------------------
🔹 DEKLARACIJA: function ime() {}
   - Hoistuje se (moze pre definicije)
   - Ima svoj this i arguments

🔹 IZRAZ: const ime = function() {}
   - Ne hoistuje se
   - Ime nije dostupno pre definicije

🔹 ARROW: const ime = () => {}
   - Ne hoistuje se
   - Nema svoj this (nasledjuje od okruzenja)
   - Idealna za callback funkcije


2. SCOPE (Domet):
----------------
🌍 GLOBALNI: Van svih funkcija i blokova
   - Dostupan svuda

🏢 FUNKCIJSKI: Unutar function() {}
   - var ima ovaj scope
   - Dostupan samo unutar funkcije

📦 BLOK SCOPE: Unutar {} (if, for, while)
   - let i const imaju ovaj scope
   - var IGNORISE blok scope!


3. HOISTING:
-----------
📈 function deklaracija: CELA se hoistuje
📈 var: Hoistuje se kao undefined
📈 let/const: Hoistuju se ali su u TDZ
   - TDZ = vreme od hoistovanja do deklaracije
   - Pristup u TDZ baca ReferenceError


4. CLOSURE:
----------
🔒 Funkcija "pamti" scope u kome je kreirana
🔒 Omogucava privatne varijable
🔒 Svaki poziv funkcije ima svoj "privatni" scope

Primer: brojac koji pamti stanje
Primer: funkcija koja "zarobi" parametar


🟢 PRAKTICNA PRAVILA:
---------------------
✅ UVIEK koristi let/const umesto var
✅ Arrow funkcije za kratke callback-e
✅ Closure koristi za privatne podatke
✅ let za promenljive koje se menjaju
✅ const za promenljive koje se NE menjaju

*/