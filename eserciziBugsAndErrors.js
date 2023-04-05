// ESERCIZIO 1:

function multiplyB2Maybe(selectedNumber) {
    const randomNumber = Math.random();
    if(randomNumber <= 0.2) {
        return selectedNumber * 2;
    } else {
        throw new MultiplicatorUnitFailed();
    };
};

// try {
//     const result = multiplyB2Maybe(5);
//     console.log(result);
// } catch(error) {
//     console.log(error.message);
// };


function reliableMultiplyBy2(selectedNumber) {
    try {
        const result = multiplyB2Maybe(selectedNumber);
        return result;
    } catch (error) {
        if(error instanceof MultiplicatorUnitFailed) {
            console.log(error.message);
            return reliableMultiplyBy2(selectedNumber);
        } else {
            console.log(error.message);
        };
    };
};

console.log(reliableMultiplyBy2(5));


// Rifatto con ciclo while:

function reliableMultiplyBy2While(selectedNumber) {
    while(true) {
        try {
            const result = reliableMultiplyBy2(selectedNumber);
            return result;
        } catch(error) {
            if (error instanceof MultiplicatorUnitFailed) {
                continue;
            } else {
                break;
            };
        };
    };
};

console.log(reliableMultiplyBy2While(6));


// Esercizio 2:


const box1 = new Box();

function withBoxUnlocked(box, func) {
    box.unlock();
    try {
        func(box);
    } catch (error) {
        throw error;
    } finally {
        box.lock();
    };
};

withBoxUnlocked(box1, (box) => {
    box.content.push("gold piece");
});

console.log(box1);

try {
    withBoxUnlocked(box1, (box) => {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch(error) {
    console.log("Error raised: " + error);
};