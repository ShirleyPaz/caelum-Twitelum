import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import Modal from '../../components/Modal'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'

import PropTypes from 'prop-types'
import * as TweetsAPI from '../../apis/TweetsAPI'



class App extends Component {

    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: [],
            tweetAtivo: {
                usuario: {}
            }
            //     
        }
        this.adicionaTweet = this.adicionaTweet.bind(this)
    }

    componentWillMount() {
        this.context.store.subscribe(() => {
            this.setState({
                tweets: this.context.store.getState()
            })
        })
    }

    componentDidMount() {
        this.context.store.dispatch(TweetsAPI.carrega())
    }

    adicionaTweet(event) {
        event.preventDefault()

        //pegar o value do input
        const novoTweet = this.state.novoTweet
        //manda o texto e o TOKEN     
        this.context.store.dispatch(TweetsAPI.adiciona(novoTweet))

        this.setState({ novoTweet: '' })
    }

    removeTweet = (idDoTweet) => {
        // Saber o ID do tweet
        // setState

        fetch(`http://localhost:3001/tweets/${idDoTweet}/?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')
            }`, {
                method: 'DELETE',
            })
            //     
            .then(response => {
                return response.json()
            })

        const tweetAtualizados = this.state.tweets.filter(tweetAtual => tweetAtual._id !== idDoTweet)

        this.setState({
            tweets: tweetAtualizados

        })
    }

    abreModalTweet = (idDoTweet, event) => {
        // pegar o tweet correto no array de tweets
        const ignoraModal = event.target.closest('.ignoraModal') //procura a cadeia inteira buscando esse item como classe ou id

        if (!ignoraModal) {
            const tweetAtivo = this.state.tweets.find(tweetAtual => tweetAtual._id === idDoTweet)

            this.setState({
                tweetAtivo: tweetAtivo
            })
        }
    }

    fechaModal = (event) => {

        const isModal = event.target.classList.contains('modal')
        if (isModal) {
            this.setState({
                tweetAtivo: {}
            })
        }
    }

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
                                            removeHandler={() => this.removeTweet(tweet._id)}
                                            handleModal={(event) => this.abreModalTweet(tweet._id, event)}
                                            texto={tweet.conteudo}
                                            tweetInfo={tweet}
                                        />
                                    })
                                }
                            </div>
                        </Widget>
                    </Dashboard>
                </div>

                <Modal isAberto={this.state.tweetAtivo._id} fechaModal={this.fechaModal}>
                    <Widget>
                        <Tweet
                            removeHandler={() => this.removeTweet(this.state.tweetAtivo._id)}
                            texto={this.state.tweetAtivo.conteudo || ''}
                            tweetInfo={this.state.tweetAtivo}
                        />
                    </Widget>
                </Modal>

            </Fragment>
        );
    }
}


export default App;
