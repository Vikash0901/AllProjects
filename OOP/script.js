'use strict';

/// Constructor person called using 'New' keyword

const Person= function(firstName , birthyear){
    //instance properties
    this.firstName=firstName;
    this.birthyear=birthyear;


    // Never do this
    // this.calcAge= function() {
    //     console.log(2037-this.birthyear);
    // }
    
};

const jonas= new Person('Vikash', 1998);
console.log(jonas)

//New {} is created 
// function is called , this.={}
// {}  linked to prototype
// function automatically return {}

const matilda=new Person('Matilda', 2017);
console.log(matilda);

console.log( jonas instanceof Person);// thjs will print actually jonas is insatnce of person constructor


/// Prototypes

console.log(Person.prototype);

Person.prototype.calcAge= function() {
    console.log(2037-this.birthyear);
}

jonas.calcAge();
matilda.calcAge()

console.log(jonas.__proto__);
console.log(jonas.__proto__=== Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));


///Prototyoe of linked objects 

Person.prototype.species='Homo Sapiens';
console.log(jonas.species ,matilda.species)

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));
console.log(jonas.hasOwnProperty('firstName'));

/// Protypal inheritance and the prototypes

console.log(jonas.__proto__); //person prototype
console.log(jonas.__proto__.__proto__); // object prtotype
console.log(jonas.__proto__.__proto__.__proto__);//null
// oobject  prototype is usually top prototype (top of prototype chain) 

console.log(Person.prototype.constructor); //will point to function
///////////////////////
// CLOSURE example
////////////////************ */
const boardPassenger= function( n, wait) {
    const perGroup=n/3;

    setTimeout (function (){ ///callback function completely independent
        console.log(`we are now boarding all ${n} passenger`)
        console.log(`There are 3 groups, each with ${perGroup} passengers`)
    } , wait * 1000);

    console.log(` boarding will start in ${wait} seconds`)
};
////closure even has the priority over the scope chain
boardPassenger(180 , 3);
boardPassenger(180 , 5);