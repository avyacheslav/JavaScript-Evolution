var data = '{\
	"caption": "JAVASCRIPT EVOLUTION",\
	"columns": ["Capabilities", "Edition", "Short Description", "Code"],\
	"info": [\
["String.trim()", "ECMAScript 2009 - ES5",\
"String.trim() removes whitespace from both sides of a string.",\
"var str = \'    trim in run     \';console.log(str.trim());"],\
["Array.isArray()", "ECMAScript 2009 - ES5",\
"The isArray() method checks whether an object is an array.",\
"var fruits = [\'Banana\', \'Orange\', \'Apple\', \'Mango\'];console.log(Array.isArray(fruits));"],\
["Array.forEach()", "ECMAScript 2009 - ES5",\
"The forEach() method calls a function once for each array element.",\
"var txt = \'\';var numbers = [1, 2, 3, 4, 5]; numbers.forEach(AddToString);function AddToString(value) {txt = txt + value;}console.log(txt);"],\
["Array.map()", "ECMAScript 2009 - ES5",\
"The map() method calls a function once for each array element and returns a new array. An invoked function should return a value.",\
"var numbers = [1, 2, 3, 4, 5];var newnumbers = numbers.map(myFunction);function myFunction(value) {return value * 2;}console.log(numbers);console.log(newnumbers);"],\
["Array.filter()", "ECMAScript 2009 - ES5",\
"A method Array.filter() return an the items of which satisfy the condition",\
"var numbers = [1, 2, 3, 4, 5];var over3 = numbers.filter(myFunction);function myFunction(value) {return value > 3;}console.log(over3);"],\
["Array.reduce()", "ECMAScript 2009 - ES5",\
"A method Array.reduce() returns a result of some action on array items from left to right.",\
"var numbers = [8, 4, 2];var result = numbers.reduce(myFunction);function myFunction(total, value) {return total / value;}console.log(result);"],\
["Array.reduceRight()", "ECMAScript 2009 - ES5",\
"A method Array.reduceRight() returns a result of some action on array items from right to left.",\
"var numbers = [8, 4, 2];var result = numbers.reduceRight(myFunction);function myFunction(total, value) {return total / value;}console.log(result);"],\
["Array.every()", "ECMAScript 2009 - ES5",\
"A method Array.every() check that all items meet some requirement.",\
"var numbers = [1, 2, 3, 4, 5];var allOver4 = numbers.every(myFunction);function myFunction(value) {return value > 4;}console.log(allOver4);"],\
["Array.some()", "ECMAScript 2009 - ES5",\
"A method Array.some() check that any item meets some requirement.",\
"var numbers = [1, 2, 3, 4, 5];var allOver4 = numbers.some(myFunction);function myFunction(value) {return value > 4;}console.log(allOver4);"],\
["Array.indexOf()", "ECMAScript 2009 - ES5",\
"Search an array for an element value and returns the position.",\
"var fruits = [\'Banana\', \'Apple\', \'Apple\', \'Mango\'];console.log(fruits.indexOf(\'Apple\'));"],\
["Array.lastIndexOf()", "ECMAScript 2009 - ES5",\
"Search an array for an element value from the end and returns the position.",\
"var fruits = [\'Banana\', \'Apple\', \'Apple\', \'Mango\'];console.log(fruits.lastIndexOf(\'Apple\'));"],\
["JSON.parse()", "ECMAScript 2009 - ES5",\
"A function JSON.parse() is used to convert the text into a JavaScript object.",\
"var txt = \'{ \\"name\\":\\"John\\", \\"age\\":30, \\"city\\":\\"New York\\"}\';var obj = JSON.parse(txt);console.log(obj.name + \', \' + obj.age);"],\
["JSON.stringify()", "ECMAScript 2009 - ES5",\
"A function JSON.stringify() converts an object into a JSON string.",\
"var obj = {name:\'John\', age:30, city:\'New York\'};var myJSON = JSON.stringify(obj);console.log(myJSON);"],\
["Date.now()", "ECMAScript 2009 - ES5",\
"Date.now() returns the number of milliseconds since zero date (January 1. 1970 00:00:00 UTC).",\
"console.log(Date.now());"],\
["Property Getters and Setters", "ECMAScript 2009 - ES5",\
"ES5 lets you define object methods with a syntax that looks like getting or setting a property.",\
"var book = {Caption: \'Cook book\', pages : 150, language : \'NO\', get lang() {return this.language;},set lang(value) {this.language = value.toUpperCase();}};book.lang = \'en\';console.log(book.lang);"],\
["New Object Property Methods", "ECMAScript 2009 - ES5",\
"It lets you define an object property and/or change a property\'s value and/or metadata.",\
"var person = {firstName: \'John\', lastName : \'Doe\', language : \'NO\',};Object.defineProperty(person, \'language\', {value: \'EN\', writable: true, enumerable: true, configurable: true});var txt = \'\';for (var x in person) { txt += person[x] + \' \';}console.log(txt);"],\
["Object method getOwnPropertyDescriptor", "ECMAScript 2009 - ES5",\
"Object method getOwnPropertyDescriptor returns descriptor of a property if it exists in object, otherwise undefined.",\
"var obj = { get foo() { return 17;}}; var descriptor = Object.getOwnPropertyDescriptor(obj, \'foo\');console.log(descriptor);"],\
["Object method getOwnPropertyNames", "ECMAScript 2009 - ES5",\
"Returns all properties as an array.",\
"function User(firstName, lastName, emailId, age){this.firstName = firstName;this.lastName = lastName;this.emailId = emailId;this.age = age;}console.log(Object.getOwnPropertyNames(new User()));"],\
["Object method keys", "ECMAScript 2009 - ES5",\
"Returns enumerable properties as an array.",\
"var obj = { 0: \'a\', 1: \'b\', 2: \'c\' };console.log(Object.keys(obj));"],\
["Object method getPrototypeOf", "ECMAScript 2009 - ES5",\
"Accessing the prototype.",\
"var proto = {};var obj = Object.create(proto);console.log(Object.getPrototypeOf(obj) === proto);"],\
["Object method preventExtensions", "ECMAScript 2009 - ES5",\
"Prevents adding properties to an object.",\
"const object1 = {};Object.preventExtensions(object1);try {Object.defineProperty(object1, \'property1\', {value: 42 });} catch (e) {console.log(e);}"],\
["Object method isExtensible", "ECMAScript 2009 - ES5",\
"Returns true if properties can be added to an object.",\
"const object1 = {};console.log(Object.isExtensible(object1));Object.preventExtensions(object1);console.log(Object.isExtensible(object1));"],\
["Object method seal", "ECMAScript 2009 - ES5",\
"Prevents changes of object properties, but not of values",\
"var obj = {prop1: function() {},prop2: function() {},};delete obj.prop1;console.log(obj);Object.seal(obj);delete obj.prop2;console.log(obj);"],\
["Object method isSealed", "ECMAScript 2009 - ES5",\
"Returns true if object is sealed.",\
"var obj = {};console.log(Object.isSealed(obj));Object.seal(obj);console.log(Object.isSealed(obj));"],\
["Object method freeze", "ECMAScript 2009 - ES5",\
"Prevents any changes to an object.",\
"var obj = { n: 0 };Object.freeze(obj);console.log(obj.n);obj.n = 1;console.log(obj.n);"],\
["Object method isFrozen", "ECMAScript 2009 - ES5",\
"Returns true if object is frozen",\
"var obj = {};console.log(Object.isFrozen(obj));Object.freeze(obj);console.log(Object.isFrozen(obj));"],\
["Property access on strings", "ECMAScript 2009 - ES5",\
"The charAt() method returns the character at a specified index (position) in a string",\
"var str = \'HELLO\';console.log(str.charAt(0));"],\
["Trailing commas", "ECMAScript 2009 - ES5",\
"ES5 allows trailing commas in object and array definitions.",\
"points = [ 1, 2, 3,];console.log(points);}"],\
["Reserved Words as Property Names", "ECMAScript 2009 - ES5",\
"ES5 allows reserved words as property names.",\
"var obj = {name: \'John\', new: \'yes\'}; console.log(obj);"],\
["let", "ES6", \
"The let keyword allows you to declare scoped variables only for the {...} block in which the declaration occurs.",\
"var a = 2;{let a = 3;console.log(a);}console.log(a);"],\
["const", "ES6",\
"Variables defined with const behave like let variables, except they cannot be reassigned. Nevertheless it is possible to manipulate with object.",\
"{const ARR = [5, 6];ARR.push(7);console.log(ARR);ARR[0] = 3;console.log(ARR);ARR = 10; // error}"],\
["Arrow Functions", "ES6",\
"Arrow functions allows a short syntax for writing function expressions. Keywords function, return and the curly brackets may be missed.",\
"let addition = (a, b) => a + b;console.log(addition(2,3));"],\
["Classes", "ES6",\
"JavaScript Classes are templates for JavaScript Objects.",\
"class Car {constructor(name, year) {this.name = name;this.year = year;}}let myCar = new Car(\'Ford\', 2015);console.log(myCar.name + \' \' + myCar.year);"],\
["Promise object", "ES6",\
"A Promise is a JavaScript object that links \'Producing Code\' and \'Consuming Code\'.\'Producing Code\' can take some time and \'Consuming Code\' must wait for the result.",\
"let myPromise = new Promise(function(myResolve, myReject) {setTimeout(function () {myResolve(\'Promise of ES6!\');}, 3000);});let out_value = \'\';myPromise.then(function (value) {out_value = value;});console.log(out_value);"],\
["The Symbol type", "ES6",\
"A JavaScript Symbol is a primitive datatype just like Number, String, or Boolean. It represents a unique \'hidden\' identifier that no other code can accidentally access.\
For instace, if different coders want to add a person.id property to a person object belonging to a third - party code, they could mix each others values.\
Using Symbol() to create a unique identifiers, solves this problem. Symbols are always unique. Ttwo symbols created with the same description will have different values.",\
"class Car {constructor(name, year) {this.name = name;this.year = year;}}let color = Symbol(\'color\');console.log(Car.color);console.log(Symbol(\'color\') == Symbol(\'color\'));"],\
["Default Parameter Values", "ES6",\
"ES6 allows function parameters to have default values.",\
"function myFunction(x, y = 10) {return x + y;}console.log(myFunction(5));"],\
["Function Rest Parameter", "ES6",\
"The rest parameter (...) allows a function to treat an indefinite number of arguments as an array.",\
"function sum(...args) {let sum = 0;for (let arg of args) sum += arg;return sum;}console.log(sum(1, 2, 3, 4));"],\
["Array.find()", "ES6",\
"The find() method returns the value of the first array element that passes a test function. Function takes 3 arguments: value, index and array itself.",\
"var numbers = [2, 4, 6, 8, 10];function myFunction(value, index, array) {return value > 5;}console.log(numbers.find(myFunction));"],\
["Array.findIndex()", "ES6",\
"The findIndex() method returns the index of the first array element that passes a test function. Function takes 3 arguments: value, index and array itself.",\
"var numbers = [2, 4, 6, 8, 10];function myFunction(value, index, array) {return value > 5;}console.log(numbers.findIndex(myFunction));"],\
["New Number Properties", "ES6",\
"ES6 added the following properties to the Number object: EPSILON, MIN_SAFE_INTEGER, MAX_SAFE_INTEGER.",\
"console.log(Number.EPSILON);console.log(Number.MIN_SAFE_INTEGER);console.log(Number.MAX_SAFE_INTEGER);"],\
["New Number method isInteger()", "ES6",\
"The Number.isInteger() method returns true if the argument is an integer.",\
"console.log(Number.isInteger(10));console.log(Number.isInteger(10.5));"],\
["New Number method isSafeInteger()", "ES6",\
"A safe integer is an integer that can be exactly represented as a double precision number. The Number.isSafeInteger() method returns true if the argument is a safe integer.",\
"console.log(Number.isSafeInteger(10));console.log(Number.isSafeInteger(12345678901234567890));"],\
["Global method isFinite()", "ES6",\
"The global isFinite() method returns false if the argument is Infinity or NaN. Otherwise it returns true.",\
"console.log(isFinite(10/0));console.log(isFinite(10 / 1));"],\
["Global method isNaN()", "ES6",\
"The global isNaN() method returns true if the argument is NaN. Otherwise it returns false.",\
"console.log(isNaN(10));console.log(isNaN(\'Hello\'));"],\
["Exponentiation Operator", "ECMAScript 2016",\
"The exponentiation operator (**) raises the first operand to the power of the second operand.",\
"let x = 5;console.log(x ** 2);"],\
["Exponentiation Assignment", "ECMAScript 2016",\
"The exponentiation assignment operator (**=) raises the value of a variable to the power of the right operand.",\
"let x = 5;x **= 2;console.log(x);"],\
["Array.prototype.includes", "ECMAScript 2016",\
"ECMAScript 2016 introduced Array.prototype.includes to arrays. This allows to check if an element is present in an array:",\
"const fruits = [\'Banana\', \'Orange\', \'Apple\', \'Mango\'];console.log(fruits.includes(\'Mango\'));"],\
["String padding", "ECMAScript 2017",\
"ECMAScript 2017 added two String methods: padStart and padEnd to support padding at the beginning and at the end of a string.",\
"let str = \'5\';console.log(str.padStart(4, 0));console.log(str.padEnd(4,0));"],\
["Object entries", "ECMAScript 2017",\
"A new method Object.entries outputs object properties with values.",\
"const person = {const person = {firstName: \'Ernest\', lastName: \'Hemingway\', born: 1899, occupation: \'writer\'};console.log(Objeci.entries(person));}"],\
["Object values", "ECMAScript 2017",\
"A method Object.values returns a single dimension array of the object values:",\
"const person = {const person = {firstName: \'Ernest\', lastName: \'Hemingway\', born: 1899, occupation: \'writer\'};console.log(Object.values(person));}"],\
["Async functions", "ECMAScript 2017",\
"The keyword async before a function makes the function return a promise.",\
"async function myDisplay() {let myPromise = new Promise(function (myResolve, myReject) {setTimeout(function () { myResolve(\'ECMAScript 2017\'); }, 2000);});console.log(await myPromise);}myDisplay();"]\
]\
}';