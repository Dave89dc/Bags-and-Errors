// BAGS AND ERRORS:

// let myName;

// function seName(newName) {
//     myNam = newName;  // esempio di erreore di battitura, ma per Javascript è come se fosse
// };                    // una nuova variabile.

// setName("Walter"); // Error!!!
// console.log("myName: " + myName);
// console.log("myNam: " + myNam);

// Applichiamo la parola "use strict" all'inizio del file:

// "use strict"

let myName;

function setName(newName) {
    myNam = newName;
};

setName("Walter");
console.log("myName: " + myName);
console.log("myNam: " + myNam);

// I browser non usano "use strict" di default perché altrimenti molti siti vecchi,
// che erano antecedenti ad esso, si potrebbero rompere.

function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // oops // manca la parola "new"
console.log(ferdinand); // undefined
console.log(name); // Ferdinand

// loggando "name" esce comunque "Ferdinand", perché "this" diventa globale,
// facendo riferimento a "window". (si vede se si logga "this")


// TYPES:

// Le variabili non hanno un tipo, ma i tipi esistono nel linguaggio (stringhe, numeri
// e booleani). Javascript è stato creato basandosi su questo, ed è per questo motivo
// che se in una variabile ci vado a mettere due valori di tipo diverso
// per Javascript è normale e "use strict" non lo corregge.
// E' molto importante e utile annotarsi con dei commenti (più che altro con le funzioni)
// di che tipo di valore venga gestito:

// bool --> bool
function invert(val) {
    return !val;
};

console.log("Invert ture: " + invert(true));
console.log("Invert 5: " + invert(5)); // qua esce false perché tutti i numeri sono true,
                                       // tranne lo 0 che è false.


// { firstName: String, lastName: String, getAge() --> int } --> ()
function printPersonData(p) {
    //...
    console.log(p.firstName + " " + p.lastName + "età: " + p.getAge());
    //...
};

// Tipi generici:

// Array --> ???
// ([T]) → T
function pickFirstElement(array) {
    if(!Array.isArray(array)) {
        throw new Error("Non è un array!");  // Con "throw" il valore restituito è
    };                          // un vero e proprio errore rosso con
    if(array.length === 0) {    // la stringa in descrizione.
        return null;
    };
    return array[0];
};



// Testing:

// Un test automatico è un programma che testa un altro programma,
// in modo da evitare di doverlo fare a mano

function test(textDescription, body) {
    if (!body()) {
        console.log(`Failed: ${textDescription}`);
    } else {
        console.log(`Succeeded: ${textDescription}`);
    }
};

test("Pick first element of array of strings", function () {
    return pickFirstElement(["ciao", "mondo"]) === "ciao";
});

test("Pick first element of array of numbers", function () {
    return pickFirstElement([1, 2, 3, 4]) === 1;
});

test("Pick first element of empty array", function () {
    return pickFirstElement([]) === undefined;
});


try {
    let val = pickFirstElement(true);
    console.log("First element of array is: " + val);
} catch(error) {
    console.log("Attenzione, si è verificato un errore: " + error);
};


// Errori come oggetti per distinguerli da altri tipi di risultati speciali
// non dovuti magari dall'errore in se.

function lastElement(array) {
    if (array.length == 0) {
      return {failed: true};
    } else {
      return {element: array[array.length - 1]};
    }
}

console.log(lastElement([1,2,3,6]))


// Esempi in classe con Andrea:

function parseIntWithError(selectedString) {
    const result = parseInt(selectedString);
    if(isNaN(result)) {
        throw new Error("Sei un cretino, non hai messo un numero!");
    };
    return result;
};

console.log(parseIntWithError("223"));
// console.log(parseIntWithError("W la figa"));

// "throw", comunque, rompe il programma e non è la soluzione migliore
// per cui un utente ci si trovi poi ad affrontare.
// Quindi gli errori lanciati vanno gestiti, e per questo si usa la funzione
// Try and Catch:

try {
    const numero = (parseIntWithError("W la figa"));
    console.log(numero);
} catch (error) {
    console.log(error.message); // --> oppure console.log("Caro utente, forse è colpa mia,
};  // ma qualcosa è andato storto. Potresti reinserire il numero ? Scusa e grazie ancora."); 


// IndexOf with Error:

function indexOfWithError(array, element) {
    if(array.length === 0) {
        throw new EmptyArrayError("Che cazzo combini, mi hai passato un array vuoto!");
    } else {
        const index = array.indexOf(element);
        if(index === -1) {
            throw new ElementNotFoundError("Non ho trovato un belino di niente!");
        } else {
            return index;
        };
    };
};

// try {
//     const index = indexOfWithError(["focaccia", "pizza", "hamburger"], "pizza");
//     console.log(index);
// } catch(error) {
//     if(error instanceof EmptyArrayError) {
//         console.log("Caro Utente, per qualche strano errore mi è arrivato un array vuoto.");
//     } else if(error instanceof ElementNotFoundError) {
//         console.log("Ho cercato in tutto l'array, ma purtroppo non ho trovato niente.");
//     } else {
//         console.log("Qualcosa non ha funzionato, ma non so altro.");
//     };
// };


function isElementInArray(array, element) {
    try {
        indexOfWithError(array, element);
        return true;
    } catch(error) {
        if(error instanceof ElementNotFoundError) {
            return false;
        } else {
            throw error;  
        };
    } finally {  // finally si usa pochissimo e esegue il comando assegnato anche se si rompe
        console.log("Qualcosa è andato storto!"); // il programma.
    }
};

try {
    const isInside = isElementInArray(["qui", "quo", "qua"], "qui");
    console.log(isInside);
} catch(error) {
    console.log(error.message);
};
