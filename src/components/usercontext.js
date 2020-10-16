import React from 'react';
import ReactDOM from 'react-dom';

import View from './view';


export const Context = React.createContext("");

export default class App extends React.Component {
  render() {
    return (
      <Context.Provider
        value={{
          foo: 'bar',
          baz: 'blah',
        }}
      >
        <View />
      </Context.Provider>
    );
  }
}


