const redux = require('redux')
const createStore = redux.createStore

const BUY_CAKE = "BUY_CAKE";


//Action is an object with a type property. And action creator is a function
//which returns an action
function bycake() {
    return {
        type: BUY_CAKE,
        info: 'First Redux action'
    }
}

//Reducer
// (previousState, action) => newState

const InitialState = {
    numOfCakes: 10
}

const reducer = (state = InitialState, action) => {
    switch(action.type) {
        case BUY_CAKE: return {
            //In reality state object may contain more than one property that is why
            //it is always safer to create the copy of the state object and then change only
            // the properties that's needs to. To make a copy of state object we use
            // spread operator
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        //For managing default state we return back the state
        //One important thing to note down here that we are not mutating the
        //state object
        default: return  state
    }
}

//Hold the application state
const store = createStore(reducer)

//Since till now we haven't perform any state transition getstate() should
//return initial state
console.log('Initial Stat',  store.getState())

//Allow the app to subscribe the changes in the store that is achieve
//using subscribe method

const unsubscribe = store.subscribe(() => console.log("updated state", store.getState()) )

//Accepts action as a parameter.As paramter we will invoke(call) the action created
store.dispatch(bycake)
store.dispatch(bycake)
store.dispatch(bycake)
unsubscribe()