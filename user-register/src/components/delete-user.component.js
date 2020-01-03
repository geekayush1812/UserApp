import React, {Component} from 'react';
import axios from 'axios';

export default class deleteUser extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel= this.onCancel.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.props);
        axios.post('http://localhost:4000/users/delete/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data)
                document.querySelector('.alert').classList.remove('hide');
                document.querySelector('.alert').classList.add('show');
            })
            .catch(err=>{
             console.log(err)
            })
        setTimeout(()=>{
            this.props.history.push('/');
        },1000);
    }
    onCancel(e){
        e.preventDefault();
        this.props.history.push('/');
    }

    render() {
        return (             
            <div>
                <div className="alert alert-success hide" role="alert">User has been deleted</div>
                <h3>Are you sure you want to delete this user?</h3>
                <button onClick={this.onSubmit} className='btn btn-primary btn-danger' style={{marginRight:10}}>
                    delete
                </button>
                <button onClick={this.onCancel} className='btn btn-primary ' style={{marginLeft:10}}>cancel
                </button>
            </div>
        )
    }
}