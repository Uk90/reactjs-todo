import React from 'react';
import ReactDOM from 'react-dom';


class Header extends React.Component {
  render(){
    return (
     <header>
     <HeaderContaner></HeaderContaner>
     </header>
   );
  }
}
class HeaderContaner extends React.Component {
  render(){
    return (
     <div className="header-conatinor">
     <HeaderLogo></HeaderLogo>
     <HeaderBody></HeaderBody>
     <User></User>
     </div>
   );
  }
}
class HeaderLogo extends React.Component {
  render(){
    return (
     <div className="header-logo">
      <img src={"./app/images/todo.jpg"} alt=""/>
     </div>
   );
  }
}
class User extends React.Component {
  render(){
    return (
     <div className="todo-profile">
     <img src={"./app/images/profile.jpg"} alt=""/>
      <div className="profile-name">Unni Krishnan M</div>
     </div>
   );
  }
}
class HeaderBody extends React.Component {
  render(){
    return (
     <div className="header-body">
      <h1>
        To-Do APP
      </h1>
    </div>
   );
  }
}
export default Header;
