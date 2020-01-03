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
     .then((response)=>console.log(response.data));

    this.setState({
      name: "",
      email: "",
      number:91,
      password:''
    });
    document.querySelector('.alert').classList.remove('hide');
    document.querySelector('.alert').classList.add('show');
    setTimeout(()=>{
      document.querySelector('.alert').classList.remove('show');
      document.querySelector('.alert').classList.add('hide');
    },1000);
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <div className="alert alert-success hide" role="alert">User successfully registered</div>
        <h3>Create new User</h3>
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
