import { useState } from 'react'

import './App.css'

function App() {


// PRIMER 1
console.log(x); // undefined
var x = 5;
----------------------------------------
//PRIMER 2
console.log(y); // ReferenceError - TDZ
let y = 10;
----------------------------------------
console.log(y); // ReferenceError - TDZ
let Z = 10;

const user = { name: 'Milos' };
user.name = 'Petar'; //OK
----------------------------------------
  return (
    <>
      <section className='my-plg'>
        <h1>Lets play!</h1>
       
        {}
      </section>
    </>
  )
}

export default App



/* 

Razlika izmedju var let i const 

var → funkcijski scope, hoistuje se kao undefined => PRIMER 1
let → blok scope, ima TDZ, ne može pre deklaracije => PRIMER 2
const → isto kao let + ne može reassign (ali može mutirati objekat) => PRIMER 3

TDZ (Temporal Dead Zone):
Vreme od hoistovanja do deklaracije — pristup u tom periodu baca grešku

JavaScript je:
- Single-threaded
- Synchronous by default



*/