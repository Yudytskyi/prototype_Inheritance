// Прототипное наследование в JavaScript

// Реализовать функцию конструктор MyArray.

// Реализовать следующие методы функции конструктора:
// MyArray.isMyArray();  // подсказка: instanceof

function MyArray() {
    this.length = 0;
    this.isMyArray = (array) => array instanceof MyArray
}

const myArrayProto = new MyArray();

MyArray.prototype = myArrayProto;

myArrayProto.push = function (...args) {
    for (let i in args) {
        this[this.length++] = args[i];
    }
    return this;
};

myArrayProto.find = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i])) return this[i];
    }
};

myArrayProto.includes = function (searchElement, fromIndex = 0) {
    const index =
        fromIndex < 0
            ? this.length + fromIndex < 0
            ? 0
            : this.length + fromIndex
            : fromIndex;
    for (let i = index; i < this.length; i++) {
        if (this[i] === searchElement) return true;
    }
    return false;
};

myArrayProto.join = function (separator = ",") {
    separator = separator.toString();
    if (!this.length) return '';

    let str = this[0];

    for (let i = 1; i < this.length; i++) {
        str += separator + this[i];
    }
    return str;
};

myArrayProto.filter = function (collback) {
    const newArray = [];
    for (let i = 0; i < this.length; i++) {
        if (collback(this[i], i, this)) {
            newArray[newArray.length++] = this[i];
        }
    }
    return newArray;
};

myArrayProto.map = function (collback) {
    const newArray = [];
    for (newArray.length; newArray.length < this.length;) {
        newArray[newArray.length] = collback(this[newArray.length], newArray.length, this);
    }
    return newArray;
};

myArrayProto.reduce = function (callback, initialValue) {
    const array = [];

    for (let i = 0; i < this.length; i++) {

        if (this[i]) array[array.length++] = this[i];
    }

    if (array.length === 0) return initialValue ? initialValue : TypeError;

    let accumulator, startingIndex;

    if (initialValue) {
        accumulator = initialValue;
        startingIndex = 0;
    } else {
        accumulator = array[0];
        startingIndex = 1;
    }

    for (let i = startingIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
};

myArrayProto.flat = function (depth = 1) {
    if (depth < 0) return this;
    let n = depth ? 1 : 0;
    const newArray = new MyArray();
    for (let i = 0; i < this.length; i++) {
        if (!this[i]) continue;

        if (Array.isArray(this[i])) {
            let addElem = myArrayProto.flat.call(this[i],depth - n);
            if (depth){
                for (let g=0;g<addElem.length;g++){
                    newArray[newArray.length++] = addElem[g]
                }
            } else {
                newArray[newArray.length++] = addElem

            }
        } else {
            newArray[newArray.length++] = this[i];
        }
    }
    return newArray;
};

myArrayProto.pop = function () {
    delete this[this.length-- - 1];
};

const arr = new MyArray();
let arr1 = new MyArray();
const arr2 = new Array();

console.log(`arr.isMyArray(arr1) => ${arr.isMyArray(arr1)}`);
console.log(`arr.isMyArray(arr2) => ${arr.isMyArray(arr2)}`);
console.log(" ");

arr.push(2, 5, 4, 7, 9);
console.log("arr.Push(2, 5, 4, 7, 9) =>");
console.log(arr);
console.log(" ");

const arrFind = arr.find((i) => i > 67);
console.log(`arr.find(i > 67) => ${arrFind}`);
console.log(" ");

const arrIncludes = arr.includes(4);
console.log(`arr.includes(4) => ${arrIncludes}`);
console.log(" ");

const arrJoin = arr.join("-0-");
console.log(`arr.join('-0-') => ${arrJoin}`);
console.log(" ");

const arrFilter = arr.filter((i) => i > 4);
console.log(`arr.filter(i > 4) => ${arrFilter}`);
console.log(" ");

const arrMap = arr.map((i, n, a) => (n < a.length - 1 ? i * a[n + 1] : i));
console.log(`arr.map(n < a.length-1 ? i * a[n + 1] : i) => ${arrMap}`);
console.log(" ");

const arrReduce = arr.reduce((r, i) => (r += i + 1), 8);
console.log(`arr.reduce((2, 5, 4, 7, 9)=> r+=i+1,8) => ${arrReduce}`);
console.log(" ");

arr1.push(null, null, 5, null, null);
const arr1Reduce = arr1.reduce((r, i) => (r += i + 1), 2);
console.log(
    `arr1.reduce((null,null,5,null,null) => r += i + 1, 2) => ${arr1Reduce}`
);
console.log(" ");

const arrFlat = new MyArray();
console.log('arrFlat = [1, 2, , 3, [4, 5, , 6, [7, , 8, [11, , 12]]], 9, 10]');
arrFlat.push([1, 2, , 3, [4, 5, , 6, [7, , 8, [11, , 12]]], 9, 10]);
console.dir(arrFlat);
console.log(" ");
console.log("arr.flat(0) =>");
console.log(arrFlat.flat(0));
console.log(" ");
console.log("arr.flat(1) =>");
console.log(arrFlat.flat(1));
console.log(" ");
console.log("arr.flat(2) =>");
console.log(arrFlat.flat(2));
console.log(" ");
console.log("arr.flat(Infinity) =>");
console.log(arrFlat.flat(Infinity));
console.log(" ");


arr.pop();
console.log("arr.pop(2, 5, 4, 7, 9) =>");
console.log(arr);
console.log(" ");
