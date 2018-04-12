//aqui fica tudo do roteamento
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

//Paginas
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'

//Funcao de Validacao
function estaAutenticado() {
    if (localStorage.getItem('TOKEN')) {
        return true
    }
    return false
}

class PrivateRoute extends Component {
    render() {
        if (estaAutenticado()) {
            return (
                <Route {...this.props}/>
            )
        } else {
            return (
                <Redirect to='/login' />
            )
        }
        
    }
}

const Routes = () => {
    return (
        <Switch> {/* Ele pega a URL e faz os ifs malditos */}
            <PrivateRoute path="/" component={Home} exact />
            <Route path="/login" component={LoginPage} />
            <Route path="*" component={() => <div>Página 404</div>} />
        </Switch>
    )
}

export default Routes