import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import { resolve } from 'path';
import { reject } from 'q';

class App extends Component {

  handleIncrement = () => {
    const { add } = this.props;
    add(1);
  }

  handleAsyncInc = () =>{
    const { asyncAdd } = this.props;
    asyncAdd(1);
  }


  render() {
    const { sum } = this.props;
    return (
      <div className="App">
        <p onClick={this.handleIncrement}>Sync Click</p>
        <p onClick={this.handleAsyncInc}>Async Click</p>
        <p>{sum}</p>
      </div>
    );
  }
}

export const ADD = "ADD";

const createAction = (data) => ({
  type: ADD,
  payload: data,
});

const asyncFunc = () =>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve(123)
    }, 3000)
  })
}

asyncFunc().then((resp)=>{
  console.log(resp);
  
})


const createAsyncActionInc = (data) => {
  return (dispatch)=>{
    asyncFunc().then(()=>{
      dispatch(createAction(data));
    })
  }
}

const mapStateToProps = state => {
  return {
    sum: state.reducer,
  }
};

const mapDispatchToProps = dispatch => ({
  add: (data) => {
    dispatch(createAction(data));
  },
  asyncAdd: (data) => {
    dispatch(createAsyncActionInc(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

