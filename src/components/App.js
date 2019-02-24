import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

class App extends Component {

  handleIncrement = () => {
    const { add } = this.props;
    add(1);
  }


  render() {
    const { sum } = this.props;
    return (
      <div className="App">
        <p onClick={this.handleIncrement}>Click</p>
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

const mapStateToProps = state => {
  return {
    sum: state.reducer,
  }
};

const mapDispatchToProps = dispatch => ({
  add: (data) => {
    dispatch(createAction(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

