export const carrega = () => {

    return (dispatch) => { //closure
        console.log('carrega funcionando')
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then(response => response.json())
            .then((tweetsDoServidor) => {
                dispatch({ type: "CARREGA_TWEETS", tweets: tweetsDoServidor })
            })
    }
}

export const adiciona = (novoTweet) => {
    return (dispatch) => {

        if (novoTweet) {
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')
                }`, {
                    method: 'POST',
                    body: JSON.stringify({ conteudo: novoTweet })
                })
                .then(response => {
                    return response.json()
                })
                .then((respostaPronta) => {
                    dispatch({ type: "ADICIONA_TWEET", tweet: respostaPronta })

                })
        }
    }
}

export const remove = (idDoTweet) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets/${idDoTweet}/?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')
            }`, {
                method: 'DELETE',
            })
            //     
            .then(response => {
                return response.json()
            })
            .then(respostaPronta => {
                dispatch({ type: 'REMOVE_TWEET', idDoTweet: idDoTweet })
                dispatch({ type: 'REMOVE_TWEET_ATIVO', idDoTweet: idDoTweet })
            })
        // const tweetAtualizados = this.state.tweets.filter(tweetAtual => tweetAtual._id !== idDoTweet)

        // this.setState({
        //     tweets: tweetAtualizados

        // })
    }
}

export const like = (idDoTweet) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets/${idDoTweet}/like?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')
            }`, {
                method: 'POST',
            })
            //     
            .then(response => response.json())
            .then(respostaPronta => {
                dispatch({ type: 'LIKE', idDoTweet })
                dispatch({ type: 'ADD_NOTIFICACAO', msg: "Alo Alo Like" })

            })
    }
}
