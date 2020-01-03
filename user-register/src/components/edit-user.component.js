import React, {Component} from 'react';
import axios from 'axios';

export default class editUser extends React.Component {

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

    componentDidMount() {
        axios.get('http://localhost:4000/users/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    number: response.data.number,
                    password: response.data.password
                })
            })
            .catch(function(error) {
                console.log(error)
            })
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
        const obj={
            name:this.state.name,
            email:this.state.email,
            number:this.state.number,
            password:this.state.password
          } 
        axios.post('http://localhost:4000/users/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        

            document.querySelector('.alert').classList.remove('hide');
            document.querySelector('.alert').classList.add('show');
        setTimeout(()=>{this.props.history.push('/');},1000);
    }

    render() {
        return (
            
            <div>
              <div className="alert alert-success hide" role="alert">User Updated</div>
                <h3>Update User</h3>
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
              value="Update"
              className="btn btn-primary"
            />
          </div>
                </form>
            </div>
        )
    }
}