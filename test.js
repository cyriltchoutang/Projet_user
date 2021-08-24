const readLine = require('readline') // gestion du fichier par ligne de commande

const rl = readLine.createInterface({ // gestion des valeurs saisies au clavier
  input: process.stdin,
  output: process.stdout,
})

// tres important d'utiliser new Promise. Pour executer une action après une autre , on utilise awaitt. On peut aussi utiliser then cependant await est plus recent

const demanderPrenom = () => {
    return new Promise(resolve => {
      rl.question('Quel est ton prénom?', resolve) // resolve est le resultat saisi par le user
    })
  }
  

const afficherPrenom = prenom => {
  return console.log('Ton prénom est ' + prenom) 
  //demanderNom() 
}

const demanderNom = () => {
    rl.question('Quel est ton nom?', (resolve) => {
        return afficherNom(resolve)
    })
}

const afficherNom = nom => {
  console.log('Ton nom est ' + nom)
}

const demanderAge = () => {
  return new Promise(resolve => {
    rl.question('Quel est ton age?', resolve)
  })
}

const afficherAge = age => {
  console.log('Ton age est ' + age)
}
// il s'agit de les rendre synchrone
// tant qu'il n'ya pas de valeur retournée, on reste dans demanderprenom. Or en enlevant les await, il va directement afficher la ligne suivante
const demarrerProgramme = async() => {
    const prenom =   await demanderPrenom()
    console.log('Ton prénom est ' + prenom) 
    rl.close()
}

/// ouuu avec les then. ne pas oublier le new promise en haut
const demarrerProgramme = () => {
    demanderPrenom()
    .then(prenom => afficherPrenom(prenom))
    .then(() => demanderNom())
    .then(nom => afficherNom(nom))
    .then(() => demanderAge())
    .then(age => afficherAge(age))
    .then(() => rl.close())
}

demarrerProgramme()