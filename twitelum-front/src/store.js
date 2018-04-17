//npm install redux (lib javascript)
//react-redux (provider recebe o store de forma segura)
import { createStore } from 'redux'

function tweetsReducer(estadoInicial = [], action = {}) {
    console.log('estado inicial', estadoInicial)
    if(action.type === 'CARREGA_TWEETS') {
        const novoEstado = action.tweets
        console.log('novo estado', novoEstado)
        return novoEstado   
    }
    return estadoInicial
}

const store = createStore(tweetsReducer)
console.log('getState final', store.getState())

export default store