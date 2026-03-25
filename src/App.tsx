import { useState, useEffect } from 'react';
import './App.css';

function App() {




  function outer() {
    let counter = 0;

    return function inner(){
      counter++;
      console.log(counter);
    }

    
  }

  const increment = outer();
  increment();
  increment();
  increment();







  

  return (
    <div className="App">
      

      <h1>App practice</h1>

      


         

    </div>
  );
}

export default App;