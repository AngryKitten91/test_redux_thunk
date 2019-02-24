import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

class App extends Component {

  handleIncrement = () => {
    const { add, } = this.props;
    add(1);
  }

  handleAsyncInc = () => {
    const { asyncAdd } = this.props;
    asyncAdd(1);
  }

  handleAsyncPosts = ()=>{
    const { asyncPosts } = this.props;
    asyncPosts()
  }

  componentDidMount(){
    this.handleAsyncPosts()
  }

  render() {
    const { sum, posts } = this.props;
    return (
      <div className="App">
        <p onClick={this.handleIncrement}>Sync Click</p>
        <p onClick={this.handleAsyncInc}>Async Click</p>
        <p>{sum}</p>
        {posts && posts.map(({ userId, title, body }, i) => {
          return (
            <div key={i} className="posts">
              <h3>{title}</h3>
              <p>{userId}</p>
              <p>{body}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export const ADD = "ADD";

const createAction = (data) => ({
  type: ADD,
  payload: data,
});

const addPosts = (data) => ({
  type: "POSTS",
  payload: data,
});

const posts_pending = (data) => ({
  type: "POSTS_PENDING",
  payload: data
});
const posts_err = (data) => ({
  type: "POSTS_ERROR",
  payload: data
});
const posts_succ = (data) => ({
  type: "POSTS_SUCCESS",
  payload: data
});


const asyncFunc = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(123)
    }, 2000)
  })
}

const fetchPosts = ()=>{
  return fetch('https://jsonplaceholder.typicode.com/posts/')
    .then(resp => resp.json())
}

const getAsyncData = () => {
  return (dispatch) =>{
    dispatch(posts_pending(true));
    fetchPosts()
    .then((resp)=>{
      dispatch(addPosts(resp))
      dispatch(posts_pending(false));
      dispatch(posts_succ(true));
      return resp;
    })
    .catch((err)=>{
      dispatch(posts_err(true));
      dispatch(posts_succ(false));
      dispatch(posts_pending(false));
    })
    
  }
}


const createAsyncActionInc = (data) => {
  return (dispatch) => {
    asyncFunc().then(() => {
      dispatch(createAction(data));
    })
  }
}


// STATE TO PROPS
const mapStateToProps = state => {
  return {
    sum: state.reducer,
    posts: state.reducer2
  }
};

// DISPATCH TO PROPS
const mapDispatchToProps = dispatch => ({
  add: (data) => {
    dispatch(createAction(data));
  },
  asyncAdd: (data) => {
    dispatch(createAsyncActionInc(data));
  },
  asyncPosts: (data) => {
    dispatch(getAsyncData());
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

