import React from 'react'
import "./App.css"
import {connect, Provider, createStore} from './redux.jsx'
import {connectToUser} from './connecters/connectToUser'

const reducer = (state, {type, payload}) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}
const initState = {
  user: {name: 'shane', age: 18},
  group: {name: 'front-end group'}
}
const store = createStore(reducer, initState)

export const App = () => {
  return (
    <Provider store={store}>
      <FirstChild/>
      <SecondChild/>
      <ThirdChild/>
    </Provider>
  )
}

const FirstChild = () => {
  return <section>firstChild<User/></section>
}
const SecondChild = () => {

  return <section>secondChild<UserModifier x='x'>hello</UserModifier></section>
}
const ThirdChild = connect(state => {
  return {group: state.group}
})(({group}) => {
  return (<section>thirdChild
    <div>Group: {group.name}</div>
  </section>)
})

const User = connectToUser(({user}) => {
  return <div>User:{user.name}</div>
})

const ajax = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({data: {name: "Shane in 3 seconds."}})

    }, 3000)
  })
}
const fetchUserPromise = () => {
  return ajax('/user').then(response => response.data
  )
}

const fetchUser = (dispatch) => {
  return ajax('/user').then(response => dispatch({type: 'updateUser', payload: response.data}))
}
const UserModifier = connect(null, null)(({state, dispatch}) => {
  const onClick = (e) => {
    dispatch({type: 'updateUser', payload: fetchUserPromise()})
  }
  return <div>
    <div>User: {state.user.name}</div>
    <button onClick={onClick}>async get user</button>
  </div>
})

export default App