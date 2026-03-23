// ===========================================
// PROMISES - Osnove
// ===========================================

console.log('=== PROMISES - REŠENJE ZA CALLBACK HELL ===\n');

// Promise ima 3 stanja:
// 1. Pending - čeka se
// 2. Fulfilled - uspešno izvršeno (resolve)
// 3. Rejected - greška (reject)

// Primer 1: Kreiranje Promise-a
console.log('\n--- 1. Kreiranje Promise-a ---\n');

const myPromise = new Promise((resolve, reject) => {
  // Asinhrona operacija
  const success = true;
  
  setTimeout(() => {
    if (success) {
      resolve('Operacija uspešna!'); // Fulfilled
    } else {
      reject('Došlo je do greške!'); // Rejected
    }
  }, 1000);
});

// Korišćenje Promise-a
myPromise
  .then((result) => {
    console.log('✅ Success:', result);
  })
  .catch((error) => {
    console.log('❌ Error:', error);
  });

// Primer 2: Promise sa parametrima
console.log('\n--- 2. Promise sa parametrima ---\n');

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({ id: 1, name: 'Miloš', email: 'milos@example.com' });
      } else {
        reject(new Error('Korisnik nije pronađen!'));
      }
    }, 1000);
  });
}

fetchUser(1)
  .then((user) => {
    console.log('✅ User pronađen:', user);
  })
  .catch((error) => {
    console.log('❌ Greška:', error.message);
  });

// Primer 3: Promise chain
console.log('\n--- 3. Promise Chain ---\n');

function doubleNumber(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * 2);
    }, 500);
  });
}

doubleNumber(5)
  .then((result1) => {
    console.log('1. korak:', result1); // 10
    return doubleNumber(result1);
  })
  .then((result2) => {
    console.log('2. korak:', result2); // 20
    return doubleNumber(result2);
  })
  .then((result3) => {
    console.log('3. korak:', result3); // 40
    console.log('✅ Konačan rezultat:', result3);
  });

// Primer 4: Promise sa error handling-om
console.log('\n--- 4. Error Handling ---\n');

function riskyOperation(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Nešto je pošlo po zlu!'));
      } else {
        resolve('Sve je super!');
      }
    }, 500);
  });
}

// Uspešan slučaj
riskyOperation(false)
  .then((result) => console.log('✅', result))
  .catch((error) => console.log('❌', error.message));

// Neuspešan slučaj
riskyOperation(true)
  .then((result) => console.log('✅', result))
  .catch((error) => console.log('❌', error.message));

// KVIZ ZA PROVERU
console.log('\n=== QUIZ ===');
console.log('1. Koja su 3 stanja Promise-a?');
console.log('2. Koja je razlika između .then() i .catch()?');
console.log('3. Šta se dešava ako reject ne bude uhvaćen?');

/*
ODGOVORI:
1. Pending, Fulfilled, Rejected
2. .then() se izvršava na resolve, .catch() na reject
3. Dobija se UnhandledPromiseRejectionWarning
*/