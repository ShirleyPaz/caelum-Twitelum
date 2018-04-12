//aqui fica tudo do roteamento
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

//Paginas
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'

const Routes = () => {
    return (
    <Switch> {/* Ele pega a URL e faz os ifs malditos */}
        <Route path="/" component={Home} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="*" component={() => <div>Página 404</div>} />
    </Switch>
    )
}

export default Routes