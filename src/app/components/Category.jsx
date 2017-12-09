import React from 'react';
import ReactDOM from 'react-dom';
// import TodoStore from './TodoStore';
import {getSelectedCatgry, getTodoTask, taskNewList, addSubTaskList, setSelectedTaskId, completedTask} from './TodoStore';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task:{},
      showTask:false
    };
    this.updateTask = this.updateTask.bind(this);
  }
  componentWillMount() {
    var SelectedCatgry = getSelectedCatgry();
    var todoTask = getTodoTask(SelectedCatgry);
    this.setState({
      task: todoTask,
    });
    taskNewList(this.updateTask);
    if(!this.state.task.length){
      var newtask = {
        category:'Category',
        subCategory:[]
      };
      this.setState({
        task: newtask,
      });
    }
  }
  updateTask(){
    var SelectedCatgry = getSelectedCatgry();
    var todoTask = getTodoTask(SelectedCatgry);
    this.setState({
      task: todoTask,
    });
  }

  render(){
    return (
      <div className="category">
        <Heading catName={this.state.task.category}></Heading>
        <SubCategoryInput subTask={this.state.task.subCategory}></SubCategoryInput>
      </div>
   );
  }
}
class Heading extends React.Component {
  render(){
    return (
      <div className="heading">
        <h4>
          <i className="fa fa-tasks" aria-hidden="true"></i>
          {this.props.catName}
        </h4>
     </div>
   );
  }
}
class SubCategoryInput extends React.Component {
  render(){
    if(this.props.subTask == undefined){
      this.props.subTask=[];
    }
    return (
      <div>
        <div className="task-input">
            <input type="text" placeholder="Enter Task's" id="subCtgryName" onKeyPress={addSubTaskList}/>
        </div>
        <div className="task-category">
            {this.props.subTask.map((task, i) => <SubCategoryList key={i} index = {i} task = {task}/>)}
        </div>
      </div>
   );
  }
}
class SubCategoryList extends React.Component {
  render(){
    return (
      <div className="category-list">
        <div className="check">
          <i className="fa fa-thumb-tack" aria-hidden="true"></i>
        </div>
        <div className="sub-category">
          <h3 onClick={(e) => setSelectedTaskId(this.props.index, e)}>{this.props.task.subTask}
          <i className="fa fa-check flt-right" title="Delete Task" aria-hidden="true" onClick={completedTask}></i></h3>
          <p>{this.props.task.description}.</p>
        </div>
      </div>
   );
  }
}

export default Category;
