import React from 'react';
import ReactDOM from 'react-dom';
// import TodoStore from './TodoStore';
import {getSelectedTaskId,getShowComments, commentsCheckCommentState,  getTodoTaskComments, commentsNewList, updateTaskName, updateTaskCommentsList, updateTaskDescription, deleteTask} from './TodoStore';


class SubTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments:{},
      showComments:false
    };
    this.updateComments = this.updateComments.bind(this);
    this.checkCommentState = this.checkCommentState.bind(this);
  }
  componentWillMount() {
    var selectedTaskId = getSelectedTaskId();
    var taskComments = getTodoTaskComments(selectedTaskId);
    this.setState({
      comments: taskComments,
    });
    commentsNewList(this.updateComments);
    commentsCheckCommentState(this.checkCommentState);
  }
  checkCommentState(){
    var showComments = getShowComments();
    this.setState({
      showComments:showComments
    });
  }
  updateComments(){
    var selectedTaskId = getSelectedTaskId();
    var taskComments = getTodoTaskComments(selectedTaskId);
    this.setState({
      comments: taskComments,
    });
  }
  render(){
    let TitleSec = null;
    let DescpSec = null;
    let TitleSecEditDom = null;
    if(this.state.showComments){
        TitleSecEditDom = <TitleSecEdit ></TitleSecEdit>
        TitleSec = <SubTaskTitle task={this.state.comments.subTask} ></SubTaskTitle>
        DescpSec = <Description taskDesc={this.state.comments.description} taskCmts={this.state.comments.comments}></Description>
    }else{
      TitleSecEditDom = '';
      TitleSec = '';
      DescpSec = '';
    }
    return (
     <div className="comment-cointainor">
     {TitleSecEditDom}
     {TitleSec}
     {DescpSec}
     </div>
   );
  }
}
class SubTaskTitle extends React.Component {
  render(){
    return (
     <div className="title">
      <i className="fa fa-bell" aria-hidden="true"></i>
        <input type="text" value={this.props.task} onChange={updateTaskName} />
     </div>
   );
  }
}
class Description extends React.Component {
  render(){
    return (
      <div>
        <div className="title-description">
          <h4><i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            Description:
          </h4>
          <textarea name="name" rows="4" cols="30" maxLength="80" onChange={updateTaskDescription} value={this.props.taskDesc} placeholder="Enter your description"></textarea>
        </div>
        <div className="comments-input">
          <h4><i className="fa fa-comments" aria-hidden="true"></i>
          Comments:
          </h4>
          <input type="text" placeholder="Add Comments" id="tskComment" onKeyPress={updateTaskCommentsList}/>
        </div>
        <div className="comments-sec">
          {this.props.taskCmts.map((cmts, i) => <Comments key={i} index = {i} cmnts = {cmts}/>)}
        </div>
      </div>
   );
  }
}

class Comments extends React.Component {
  render(){
    return (
        <div className="comments-list">
          <h3><i className="fa fa-comment-o" aria-hidden="true"></i>{this.props.cmnts.comment}</h3>
        </div>
    );
  }
}
class TitleSecEdit extends React.Component {
  render(){
    return (
      <div className="task-delete">
        <h3>
          <i className="fa fa-trash-o flt-right" title="Delete Task" aria-hidden="true" onClick={deleteTask}></i>
        </h3>
      </div>
   );
  }
}

export default SubTask;
