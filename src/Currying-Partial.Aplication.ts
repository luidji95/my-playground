// Obicna f-ja
function add(a,b,c){
    return a+b+c;
};

//Curried verzija
function curriedAdd(a){
    return function(b){
        return function(c){
            return a+b+c;
        };
    };
};

//Koriscenje
console.log(curriedAdd(1)(2)(3));

//Ili sa arrow f-jama (krace)
const curriedAdd = a => b => c => a+b+c;

// ZASTO JE CURRYING KORISTAN? 
const add5 = curriedAdd(5); // ovde fiksiramo prvi argument
console.log(add5(10)(20));  // 35 (5 + 10 +20);



const multiply = a => b => a*b;

const double = multiply(2);
const triple = multiply(3);

console.log(double(5));
console.log(triple(5));

//  U REACT-U (često se koristi)
// const handleChange = (field) => (event) => {
//     setForm({ ...form, [field]: event.target.value });
// };
// <input onChange={handleChange('email')} />

// Tvoj kod ovde
const greeting = prefix => name => sufix => console.log(`${prefix}${name}${sufix}`);

// Test:
const zdravoMilos = greeting("Zdravo")("Miloš");
console.log(zdravoMilos("!"));    // "Zdravo Miloš!"
console.log(zdravoMilos("??"));   // "Zdravo Miloš??"

const cao = greeting("Ćao");
console.log(cao("Petar")("!!"));   // "Ćao Petar!!"