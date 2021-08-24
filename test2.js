const test = require('./test1.js')
console.log(test.PI2)
console.log(test.SOMME(5,7))
console.log(new test.testobjet())

var fs = require('fs');
//rename: pour renommer / appedfile: pour ajouter une vaeur dans le fichier
//mkdir: creer un dossier / rmdir: supprimer un dossier / readFile: avoir la taille memoire d'un fichier
////// creer un fichier // createWriteStream: st un flux qui ouvre le fichier en arrière-plan et met en file d'attente les écritures jusqu'à ce que le fichier soit prêt. De plus, comme il implémente l'API de flux, vous pouvez l'utiliser de manière plus générique, tout comme un flux réseau ou autre.

fs.writeFile('example1.txt',"this is an example",'utf8',(err,file)=>{
    if(err)
        console.log(err);
    else
        console.log('File successfully created');
        console.log(file);
})

//////////////Lecture dans un fichier

// Create a stream to read file. IL CREE LE FLUX ET NON LE FICHIER
var rs = fs.createReadStream('./example.txt');
// The event 'open':
rs.on('open', function() {
    console.log('File opened!');
});

const readStream = fs.createReadStream('./example3.txt','utf8');// Create a stream to read file. IL CREE LE FLUX ET NON LE FICHIER
const writeStream = fs.createWriteStream('./example4.txt');// CREER un flux pour creer le fichier
readStream.pipe(writeStream); //copie les valeurs qui sont dans le readstream (exemple3) dans writestream (exemple4)

/// creation dun serveur http. Mais on le fait autrement avec express

const http = require('http');
const server = http.createServer((req,res)=> {
    const readStream1 = fs.createReadStream('./example5.json') // ou index.html
    res.writeHead(200,{'Content-type':'application/json'})  // ou text/html
    readStream1.pipe(res)
    res.write('hello le bosss');
    res.end();
} ).listen('3003')

//server.listen('3002')

// joi de express pour la gestion des restrictions (validation) = emal correct?....