const pipe =
    (...functions) =>
        (initialValue) =>
            functions.reduce((acc, fn) => fn(acc), initialValue);

// Building blocks to use for composition
const double = (x) => 2 * x;
const triple = (x) => 3 * x;
const quadruple = (x) => 4 * x;

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// Usage
const result = multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240

console.log(result);