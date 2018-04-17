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
    return(dispatch) => {
      
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
}}