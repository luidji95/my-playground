import { useState } from 'react'
import './App.css'

function App() {
  // PRIMER 1 - typeof operator
  console.log(typeof "hello");        // "string"
  console.log(typeof 42);             // "number"  
  console.log(typeof true);            // "boolean"
  console.log(typeof undefined);       // "undefined"
  console.log(typeof null);            // "object" (poznati bag)
  console.log(typeof {});              // "object"
  console.log(typeof []);              // "object"
  console.log(typeof function(){});    // "function"
  ----------------------------------------
  // PRIMER 2 - Falsy vrednosti
  if (false) {}      // false
  if (0) {}          // false
  if (-0) {}         // false
  if ("") {}         // false
  if (null) {}       // false
  if (undefined) {}  // false
  if (NaN) {}        // false
  
  // Truthy primeri
  if ("0") {         // true - string sa nulom
    console.log("'0' je truthy!");
  }
  
  if ([]) {          // true - prazan niz
    console.log("[] je truthy!");
  }
  
  if ({}) {          // true - prazan objekat
    console.log("{} je truthy!");
  }
  
  if (" ") {         // true - prazan string sa space-om
    console.log("razmak je truthy!");
  }
  ----------------------------------------
  // PRIMER 3 - Coercion (== vs ===)
  console.log(0 == false);      // true (tipovi se konvertuju)
  console.log(0 === false);     // false (razliciti tipovi)
  
  console.log("" == false);     // true
  console.log("" === false);    // false
  
  console.log(null == undefined);  // true
  console.log(null === undefined); // false
  
  // Zasto uvek koristiti ===
  let x = "5";
  if (x == 5) {
    console.log("== kaze: jednaki su");   // Ovo ce se ispisati
  }
  
  if (x === 5) {
    console.log("=== kaze: jednaki su");  // Ovo se nece ispisati
  } else {
    console.log("=== kaze: nisu jednaki"); // Ovo ce se ispisati
  }
  ----------------------------------------
  // PRIMER 4 - Prakticni primer sa if-om
  let userInput = "0";
  
  // LOSE - moze dovesti do bagova
  if (userInput == false) {
    console.log("Korisnik nije uneo nista");
  }
  
  // DOBRO - eksplicitna provera
  if (userInput === "0") {
    console.log("Korisnik je uneo 0 kao string");
  }
  
  // Provera da li je uneto nesto
  if (userInput) {  // "0" je truthy, tako da ce uci
    console.log("Korisnik je nesto uneo");
  }

  return (
    <>
      <section className='my-plg'>
        <h1>Tipovi, truthy/falsy i coercion!</h1>
        {/* Otvori konzolu da vidis primere */}
      </section>
    </>
  )
}

export default App

/* 

TYPEOF OPERATOR:
- "string" → za stringove
- "number" → za brojeve
- "boolean" → za true/false
- "undefined" → za undefined
- "object" → za null (bag iz 90ih), objekte, nizove
- "function" → za funkcije

FALSY VREDNOSTI (samo 8):
false, 0, -0, 0n (BigInt), "", null, undefined, NaN

TRUTHY VREDNOSTI:
Sve ostalo! Cak i "0", "false", [], {}, function(){}

COERCION - == vs ===:

LOOSE EQUALITY (==) → radi type coercion
Primer: 0 == false → true (jer 0 → false)
Primer: "" == false → true (jer "" → false)

STRICT EQUALITY (===) → poredi i tip i vrednost
Primer: 0 === false → false (number vs boolean)
Primer: "" === false → false (string vs boolean)


"Uvek koristim === osim kada eksplicitno zelim type coercion.
To sprecava neocekivano ponasanje i cini kod predvidljivijim."



*/