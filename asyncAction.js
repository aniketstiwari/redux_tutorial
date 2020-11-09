const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware
const axiox = require('axios')


const initialState = {
    loading: false,
    data: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST: 
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        
    }   
}

//the thunk middleware brings the ability for an action creator
// to return a function instead of an action object
const fetchUsers = () => {
    
    return function(dispatch) {
        //it isn't a pure function so it is allowed to have sideeffect
        // such as async api calls
        //Now let's see to have an axiox call and dispatch the necessary action
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
           //response.data is the array of users
           const users = response.data.map(user => user.id);
           dispatch(fetchUsersSuccess(users)) 
        })
        .catch(error => {
            //error.message gives the  description of the error
            dispatch(fetchUsersFailure('')) 
        })
    }
}


const store = createStore(reducer, applyMiddleWare(thunkMiddleware))
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers)