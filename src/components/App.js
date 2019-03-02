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

  handleAsyncPosts = () => {
    const { asyncPosts } = this.props;
    asyncPosts()
  }

  handleAsyncComments = () => {
    const { asyncComments } = this.props;
    asyncComments()
  }

  handleUsers = () =>{
    const {asyncUsers} = this.props
    asyncUsers()
  }

  componentDidMount() {
    this.handleAsyncPosts();
    this.handleAsyncComments();
    this.handleUsers();
  }

  render() {
    const { sum, posts, postsAndComments } = this.props;
    return (
      <div className="App">
        <p onClick={this.handleIncrement}>Sync Click</p>
        <p onClick={this.handleAsyncInc}>Async Click</p>
        <p>{sum}</p>
        {postsAndComments && postsAndComments.map(({ userId, title, body, comments, userData:{name}='' }, i) => {
          return (
            <div key={i} className="posts">
              <h3>{title && title}</h3>
              <p>{name && name}</p>
              <p>{body && body}</p>
              {comments && comments.map((comment, key) => {
                const {body, email, name, id} = comment;
                return (
                  <div className="comments" key={key}>
                    <h4>{name && name}</h4>
                    <div className="email">{email && email}</div>
                    <div>{body && body}</div>
                  </div>
                );
              })}
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

const fetchPosts = (url = 'https://jsonplaceholder.typicode.com/posts/') => {
  return fetch(url)
    .then(resp => resp.json())
}

const getAsyncPosts = () => {
  return (dispatch) => {
    fetchPosts('https://jsonplaceholder.typicode.com/comments/')
      .then((resp) => {
        dispatch({
          type: "COMMENTS",
          payload: resp
        })
      })
  }
}

const getAsyngetAsyncUsers = () => {
  return (dispatch) => {
    fetchPosts('https://jsonplaceholder.typicode.com/users/')
      .then((resp) => {
        dispatch({
          type: "USERS",
          payload: resp
        })
      })
  }
}



const getAsyncData = () => {
  return (dispatch) => {
    dispatch(posts_pending(true));
    fetchPosts()
      .then((resp) => {
        dispatch(addPosts(resp))
        dispatch(posts_pending(false));
        dispatch(posts_succ(true));
        return resp;
      })
      .catch((err) => {
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

const selectorCommentstoPosts = (state) => {
  const { reducer2, reducer3, reducer4 } = state;
  
  const CommentswithPosts = reducer2.map(elem => {
    const {id, userId} = elem;
    const userData = reducer4.find(user => user.id === userId)
    const commentsWithId = reducer3.filter(comment => comment.postId === id)
    elem.comments = commentsWithId;
    elem.userData = userData;
    return elem;
  })

  return CommentswithPosts;
}

// STATE TO PROPS
const mapStateToProps = state => {
  return {
    sum: state.reducer,
    posts: state.reducer2,
    postsAndComments: selectorCommentstoPosts(state)
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
  asyncComments: (data) => {
    dispatch(getAsyncPosts())
  },
  asyncUsers: (data) => {
    dispatch(getAsyngetAsyncUsers())
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

