//npm install redux (lib javascript)
//react-redux (provider recebe o store de forma segura)
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state = { lista: [], tweetAtivo: {} }, action = {}) { //state = estada da store que fica sendo atualizado

    if (action.type === 'CARREGA_TWEETS') {
        const novoEstado = {
            ...state,
            lista: action.tweets
        }
        return novoEstado
    }

    if (action.type === 'ADICIONA_TWEET') {
        const novoEstado = {
            ...state,
            lista: [action.tweet, ...state.lista]
        }
        console.log('adicionado com sucesso', novoEstado)
        return novoEstado
    }

    if (action.type === 'REMOVE_TWEET') { // Poderia ser enviado para o componente no qual a ação acontece

        const novaListaTweet = state.lista.filter(tweetAtual => tweetAtual._id !== action.idDoTweet) // cria um array novo para todos os itens que retornam true

        const novoEstado = {
            ...state,
            lista: novaListaTweet,
        }
        console.log('removido com sucesso', novoEstado)
        return novoEstado
    }

    if (action.type === 'ADD_TWEET_ATIVO') {
        const tweetAtivo = state.lista.find(tweetAtual => tweetAtual._id === action.idDoTweet)
        const novoEstado = {
            ...state,
            tweetAtivo: tweetAtivo
        }
        console.log('tweet adicionado para modal', novoEstado)
        return novoEstado
    }

    if (action.type === 'REMOVE_TWEET_ATIVO') {
        return {
            ...state,
            tweetAtivo: {}
        }
    }

    if (action.type === 'LIKE') {
        console.log('antesdolike')
        const tweetLikeado = state.lista.map(tweetAtual => {
            if (tweetAtual._id === action.idDoTweet) {
                let { likeado, totalLikes } = tweetAtual
                tweetAtual.likeado = !likeado
                tweetAtual.totalLikes = likeado ? totalLikes - 1 : totalLikes + 1

            }
            return tweetAtual

        })
        return {
            ...state,
            lista: tweetLikeado
        }
    }
}


const store = createStore(
    tweetsReducer,
    applyMiddleware(
        thunk /* enhencer - com isso o dispatch poderá receber funções assíncronas, como o fetch.
                 Antes o dispatch recebia apenas objetos literais, com type e action. */

    )

)


export default store