import React from 'react';
import ReactDOM from 'react-dom';
import {getTodos, categoryNewList, addNewTodoList, setSelectedCatgry, updateCategoryname} from './TodoStore';

class SidePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos:[]
    };
    this.updateTodo = this.updateTodo.bind(this);
  }
  componentWillMount() {
    var atodos = getTodos();
    this.setState({
      todos: atodos,
    });
    categoryNewList(this.updateTodo);
  }
  updateTodo(){
    var atodos = getTodos();
    this.setState({
      todos: atodos,
    });
  }
  render(){
    return (
     <div className="left-side-panel">
       <User></User>
       <SidePanelContent todos={this.state.todos} ></SidePanelContent>
     </div>
   );
  }
}

class SidePanelContent extends React.Component {
  render(){
    return (
     <div className="side-panel-content">
        <ToDoInput todos={this.props.todos}></ToDoInput>
     </div>
   );
  }
}
class User extends React.Component {
  render(){
    return (
     <div className="todo-heading">
        <i className="fa fa-plus" aria-hidden="true"></i>
        Add New ToDo
     </div>
   );
  }
}
class ToDoInput extends React.Component {
  render(){
    return (
      <div>
        <div className="todo-input">
            <input type="text" placeholder="Enter TODO's" id="catgryName" onKeyPress={addNewTodoList}/>
            <i className="fa fa-external-link-square" aria-hidden="true"></i>
        </div>
        <div className="todo-category-all">
            {this.props.todos.map((todo, i) => <CategoryList key={i} index = {i} todo = {todo}/>)}
        </div>
      </div>

   );
  }
}

class CategoryList extends React.Component {
  render(){
    return (
      <div className="todo-category">
        <i className="fa fa-list" aria-hidden="true"></i>
        <input type="text" value={this.props.todo.category} onChange={updateCategoryname} onClick={(e) => setSelectedCatgry(this.props.index, e)}/>
     </div>
   );
  }
}

export default SidePanel;
