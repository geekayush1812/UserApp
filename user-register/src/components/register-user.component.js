import React, { Component } from "react";
import axios from 'axios';

export default class registerUser extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangePassword=this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      email: "",
      number:91,
      password:''
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeNumber(e) {
    this.setState({
      number: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  


  onSubmit(e) {
    e.preventDefault();

    console.log("Form submitted:");
    console.log(`name: ${this.state.name}`);
    console.log(`email : ${this.state.email}`);
    console.log(`number : ${this.state.number}`);
    console.log(`password : ${this.state.password}`);

    const newUser={
      name:this.state.name,
      email:this.state.email,
      number:this.state.number,
      password:this.state.password
    } 

     axios.post('http://localhost:4000/users/add',newUser)
     .then((response)=>{
       document.querySelector('.alert').classList.toggle('fadeOut');
       document.querySelector('.alert').classList.toggle('fadeIn');
     });

    this.setState({
      name: "",
      email: "",
      number:91,
      password:''
    });
  }

  onCloseSuccess(e){
     e.preventDefault();
       document.querySelector('.alert').classList.toggle('fadeOut');
       document.querySelector('.alert').classList.toggle('fadeIn');
  }
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create new User</h3>
        <div class="alert alert-success">
          <a 
          href="#" 
          class="close"
          data-dismiss="alert"
          aria-label="close"
          onClick={this.onCloseSuccess}
          >
            &times;
          </a>
          <strong>Success!</strong>
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Number</label>
            <input
              type="phone"
              className="form-control"
              value={this.state.number}
              onChange={this.onChangeNumber}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Register"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
