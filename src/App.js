import logo from './logo.svg';
import './App.css';

import Home from './Containers/Home/Home' // Import accueil
import AddUser from './Containers/AddUser/AddUser' //Import inscription user
import Connexion from './Containers/Connexion/Connexion' // Import authentification user
import Information from './Containers/Information/Information.js' // Import information user
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/inscription" exact component={AddUser}/>
        <Route path="/connexion" exact component={Connexion}/>
        <Route path="/information" exact component={Information}/>
      </Switch>
    </Router>
  )
}

export default App;
