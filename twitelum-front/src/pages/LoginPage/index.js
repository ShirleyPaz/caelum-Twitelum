import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {

    fazLogin = (event) => {
        event.preventDefault()
        const login = this.inputLogin.value
        const senha = this.inputSenha.value
        const infosDoUsuario = {
            login,
            senha
        }

        fetch('http://localhost:3001/login', {
            method: 'post',
            body: JSON.stringify(infosDoUsuario)
        })
        .then((response) => {
            if(!response.ok) {
                throw response;
            }
            return response.json()
        })
        .then((responseEmJSON) => {
            localStorage.setItem('TOKEN', responseEmJSON.token)
            this.props.history.push('/')
        })
        .catch((responseError) => {
            responseError.json().then((response) => {
                console.log(response)
            })
        })
    }

    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form className="loginPage__form" action="/" onSubmit={this.fazLogin}>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label>
                                <input
                                    ref={(inputLogin) => this.inputLogin = inputLogin}
                                    className="loginPage__input"
                                    type="text"
                                    //value= "vanessametonini"
                                    id="login"
                                    name="login" />
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label>
                                <input
                                    ref={(inputSenha) => this.inputSenha = inputSenha}
                                    className="loginPage__input"
                                    type="password"
                                    //value= "123456"
                                    id="senha"
                                    name="senha" />
                            </div>
                            {/* <div className="loginPage__errorBox">
                                Mensagem de erro!
                            </div> */}
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }
}


export default LoginPage