//npm install redux (lib javascript)
//react-redux (provider recebe o store de forma segura)
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state = [], action = {}) {

    if (action.type === 'CARREGA_TWEETS') {
        const novoEstado = action.tweets
        console.log('novoEstado', novoEstado)
        return novoEstado
    }

    if (action.type === 'ADICIONA_TWEET') {
        const novoEstado = [action.tweet, ...state]
        console.log('pós adiciona tweet', novoEstado)
        return novoEstado
    }

      
    return state
}

const store = createStore(
    tweetsReducer,
    applyMiddleware(
        thunk /* enhencer - com isso o dispatch poderá receber funções assíncronas, como o fetch.
                 Antes o dispatch recebia apenas objetos literais, com type e action. */

    )
)



export default store