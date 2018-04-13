import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

class App extends Component {
    constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: [],
        }
        this.adicionaTweet = this.adicionaTweet.bind(this)
    }

    componentDidMount() {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then(response => response.json())
            .then((tweetsDoServidor => {
                this.setState(
                    {
                        tweets: tweetsDoServidor
                    }
                )
            }))
    }

    adicionaTweet(event) {
    event.preventDefault()

    //pegar o value do input
    const novoTweet = this.state.novoTweet

    //manda o texto e o TOKEN      
    if (novoTweet) {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')
            }`, {
                method: 'POST',
                body: JSON.stringify({ conteudo: novoTweet })
            })
            .then(response => {
                return response.json()
            })
            .then(respostaPronta => {
                this.setState(
                    {
                        tweets: [respostaPronta, ...this.state.tweets],
                        novoTweet: ''
                    }
                )
                console.log(respostaPronta)
            })
    }
}

//evita que dê refresh no submit - ok
//resetar o valor do novo tweet
// pegar o value do input - okpara 
// criar uma lista de inputs - ok
//jogar o valor do tweet na lista -ok
//incluir no corpo do widget com map - ok
//incluir props no componente

render() {
    return (
        <Fragment>
            <Cabecalho>
                <NavMenu usuario="@omariosouto" />
            </Cabecalho>
            <div className="container">
                <Dashboard>
                    <Widget>
                        <form className="novoTweet" onSubmit={this.adicionaTweet}>
                            <div className="novoTweet__editorArea">
                                <span className={`novoTweet__status ${
                                    this.state.novoTweet.length > 140
                                        ? 'novoTweet__status--invalido' : ''
                                    }
                    `}>
                                    {this.state.novoTweet.length}/140</span>
                                <textarea
                                    value={this.state.novoTweet}
                                    onChange={(event) => { this.setState({ novoTweet: event.target.value }) }}
                                    className="novoTweet__editor"
                                    placeholder="O que está acontecendo?"></textarea>
                            </div>
                            <button
                                type="submit"
                                className="novoTweet__envia"
                                disabled={this.state.novoTweet.length > 140 ? true : false}>
                                Tweetar
                        </button>
                        </form>
                    </Widget>
                    <Widget>
                        <TrendsArea />
                    </Widget>
                </Dashboard>
                <Dashboard posicao="centro">
                    <Widget>
                        <div className="tweetsArea">
                            {this.state.tweets.length === 0 ?
                                <center>"Compartilhe seu primeiro tweet"</center> : ""}
                            {this.state.tweets.map(
                                (tweet, index) => {
                                    return <Tweet
                                        key={tweet._id}
                                        texto={tweet.conteudo}
                                        tweetInfo={tweet} />
                                })
                            }
                        </div>
                    </Widget>
                </Dashboard>
            </div>
        </Fragment>
    );
}
}

export default App;
