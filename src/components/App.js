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

const asyncFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123)
    }, 2000)
  })
}

const getAsyncData = () => {
  return (dispatch) =>{
    fetch('https://jsonplaceholder.typicode.com/posts/')
    .then(resp=> resp.json())
    .then((resp)=>{
      dispatch(addPosts(resp))
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

const mapStateToProps = state => {
  return {
    sum: state.reducer,
    posts: state.reducer2
  }
};

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

