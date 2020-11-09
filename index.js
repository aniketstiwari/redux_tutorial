const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM"


//Action is an object with a type property. And action creator is a function
//which returns an action
function bycake() {
    return {
        type: BUY_CAKE,
        info: 'First Redux action'
    }
}

function buyicecream() {
    return {
        type: BUY_ICECREAM,
        info: 'Second Redux action'
    }
}

//Reducer
// (previousState, action) => newState

// const InitialState = {
//     numOfCakes: 10,
//     numOfIceCream: 20
// }

const InitialCakeState = {
    numOfCakes: 10
}

const InitialIceCreamState = {
    numOfIceCream: 10
}

//having singular reducer is very diffcult to manage
// const reducer = (state = InitialState, action) => {
//     switch(action.type) {
//         case BUY_CAKE: return {
//             //In reality state object may contain more than one property that is why
//             //it is always safer to create the copy of the state object and then change only
//             // the properties that's needs to. To make a copy of state object we use
//             // spread operator
//             ...state,
//             numOfCakes: state.numOfCakes - 1
//         }
//         case BUY_ICECREAM: return {
//             ...state,
//             numOfIceCream: state.numOfIceCream - 1
//         }
//         //For managing default state we return back the state
//         //One important thing to note down here that we are not mutating the
//         //state object
//         default: return  state
//     }
// }


const cakeReducer = (state = InitialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: return { 
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return  state
    }
}


const iceCreamReducer = (state = InitialIceCreamState, action) => {
    switch(action.type) {
        case BUY_CAKE: return { 
            ...state,
            numOfIceCream: state.numOfIceCream - 1
        }
        default: return  state
    }
}

//the convention is to call all your reducer as the root reducer
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))

//Hold the application state
//const store = createStore(reducer)

//Since till now we haven't perform any state transition getstate() should
//return initial state
console.log('Initial Stat',  store.getState())

//Allow the app to subscribe the changes in the store that is achieve
//using subscribe method

//const unsubscribe = store.subscribe(() => console.log("updated state", store.getState()) )
const unsubscribe = store.subscribe(() => {} )

//Accepts action as a parameter.As paramter we will invoke(call) the action created
store.dispatch(bycake())
store.dispatch(bycake())
store.dispatch(bycake())

store.dispatch(buyicecream())
store.dispatch(buyicecream())
store.dispatch(buyicecream())
unsubscribe()