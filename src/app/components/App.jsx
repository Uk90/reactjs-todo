import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import SidePanel from './SidePanel.jsx';
import Category from './Category.jsx';
import SubTask from './SubTask.jsx';

import {createStore} from 'redux';
import allReducers from '../reducer';

const store = createStore(allReducers)
class App extends React.Component {
  render(){
    return (
      <div>
        <Header></Header>
          <div className="cointainer">
            <SidePanel></SidePanel>
            <Category></Category>
          <SubTask></SubTask>
        </div>
      </div>
   );
  }
}

export default App;
