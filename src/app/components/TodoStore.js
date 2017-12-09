var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

var Todos = [];
var selectedCatgry = 0;
var selectedTask = 0;
var showComments = false;
var emptyCmt = {};
var showTask = false;

module.exports = {

  getTodos: function() {
    return Todos;
  },
  getTodoTask: function(id) {
    return Todos[id];
  },
  getShowComments: function() {
    return showComments;
  },
  setSelectedCatgry: function(id) {
    selectedCatgry = id;
    showComments = false;
    emitter.emit('listTask');
    emitter.emit('commentsCheckCommentState');
    emitter.emit('listComments');
  },
  getSelectedCatgry: function() {
    return selectedCatgry;
  },
  setSelectedTaskId: function(id) {
    selectedTask = id;
    showComments = true;
    showTask = true;
    emitter.emit('commentsCheckCommentState');
    emitter.emit('listComments');
  },
  getSelectedTaskId: function(id) {
    return selectedTask;
  },
  getTodoTaskComments: function(id) {
    if(!showTask){
      return emptyCmt;
    }else{
      return Todos[selectedCatgry].subCategory[id];
    }
  },

  categoryNewList: function(callback) {
    emitter.addListener('listCatgry', callback);
  },
  commentsNewList: function(callback) {
    emitter.addListener('listComments', callback);
  },
  commentsCheckCommentState: function(callback) {
    emitter.addListener('commentsCheckCommentState', callback);
  },
  taskNewList: function(callback) {
    emitter.addListener('listTask', callback);
  },
  addNewTodoList: function(e) {
    if (e.key === 'Enter') {
      var newCtgry = e.target.value;
      if(!newCtgry){
        return;
      }
      catgryName.value='';
      Todos = Todos.concat({
        'category':newCtgry,
        'subCategory':[]
      });
      emitter.emit('listCatgry');
    }

  },
  addSubTaskList: function(e) {
    if (e.key === 'Enter') {
        var newSubCtgryName = e.target.value;
        if(!newSubCtgryName){
          return;
        }
        subCtgryName.value='';
        if(!Todos.length){
          alert('Add Todo to add task');
          return;
        }
        var asubCategory = Todos[selectedCatgry].subCategory.concat({
          'subTask':newSubCtgryName,
          'description':'',
          'comments':[]
        });
        var newTodos = Todos;
        newTodos[selectedCatgry].subCategory = asubCategory;
        Todos = newTodos;
        emitter.emit('listTask');
    }
  },
  updateTaskDescription: function(e){
    Todos[selectedCatgry].subCategory[selectedTask].description = e.target.value;
    emitter.emit('listTask');
    emitter.emit('commentsCheckCommentState');
    emitter.emit('listComments');
  },
  updateTaskCommentsList: function(e){
    if (e.key === 'Enter') {
      var newComments = e.target.value;
      var newTodos = Todos;
      if(!newComments){
        return;
      }
      tskComment.value='';
      var aComments = Todos[selectedCatgry].subCategory[selectedTask].comments.concat({
        'comment':newComments,
      });
      newTodos[selectedCatgry].subCategory[selectedTask].comments = aComments;
      Todos = newTodos;
      emitter.emit('commentsCheckCommentState');
      emitter.emit('listComments');
    }

  },
  updateCategoryname: function(event){
    Todos[selectedCatgry].category = event.target.value;
    emitter.emit('listCatgry');
    emitter.emit('listTask');
  },
  updateTaskName: function(event){
    Todos[selectedCatgry].subCategory[selectedTask].subTask = event.target.value;
    emitter.emit('listTask');
    emitter.emit('commentsCheckCommentState');
    emitter.emit('listComments');
  },
  deleteTask: function(){
    delete Todos[selectedCatgry].subCategory[selectedTask];
    emitter.emit('listTask');
    showComments = false;
    emitter.emit('commentsCheckCommentState');
    emitter.emit('listComments');
  },
  completedTask: function(event){
    var target = event.target;
    var parent = target.parentElement;
    target.style.color='green';
    parent.setAttribute('class','checked');
  },

};
