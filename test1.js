PI = 3.14
const SOMME = (val1,val2) =>{return val1+val2}
class testobjet{
    constructor(){
        console.log('nous testons les objets')
    }
}

// action qui se declenche à la suite d'un évenement
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('tutorial',(val1,val2)=>{
    console.log(val1+val2);
});
eventEmitter.emit('tutorial',5,6);

class Person extends EventEmitter{
    constructor(name){
        super();
        this._name = name;
    }
    getname(){
        return this._name;
    }
}
let pedro = new Person('pedro')
console.log(pedro.getname())

pedro.on('name',()=>{
    console.log('my name is ' + pedro.getname())
});

pedro.emit('name');


module.exports.PI2 = PI 
module.exports.SOMME = SOMME
module.exports.testobjet = testobjet