//npm install redux (lib javascript)
//react-redux (provider recebe o store de forma segura)
import { createStore, applyMiddleware, combineReducers } from 'redux'
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

        const tweetsAtualizados = state.lista.map(tweetAtual => {

            if (tweetAtual._id === action.idDoTweet) {
                let { likeado, totalLikes } = tweetAtual
                tweetAtual.likeado = !likeado
                tweetAtual.totalLikes = likeado ? totalLikes - 1 : totalLikes + 1
                console.log(tweetAtual)
            }
            return tweetAtual

        })

        /* let tweetAtivoAtualizado
        if (state.tweetAtivo._id) {
            tweetAtivoAtualizado = state.lista.find(tweetAtual => tweetAtual._id === action.idDoTweet)
        } */

        return {
            ...state,
            /* tweetAtivo: tweetAtivoAtualizado,  *///Faz o modal abrir quando você clica no like 
            lista: tweetsAtualizados
        }
    }

    return state
}

function notificacoesReducer(state = '', action = {}) {

    if (action.type === 'ADD_NOTIFICACAO') {
        const novoEstado = action.msg
        return novoEstado
    }

    if (action.type === 'REMOVE_NOTIFICACAO') {
        return ''  // equivalente a novoEstado = '' / Return novoEstado
    }

    return state
}

const store = createStore(
    combineReducers({ // Melhor sempre colocar já no início do projeto
        tweets: tweetsReducer,
        notificacoes: notificacoesReducer
    }),
        applyMiddleware(
            thunk /* enhencer - com isso o dispatch poderá receber funções assíncronas, como o fetch.
                 Antes o dispatch recebia apenas objetos literais, com type e action. */
        )
    )


export default store