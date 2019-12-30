import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.name}</td>
        <td>{props.user.email}</td>
        <td>{props.user.number}</td>
        <td>
            <Link to={"/edit/"+props.user._id}>Edit</Link>
        </td>
    </tr>
)

export default class showUser extends Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/users/')
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/users/')
        .then(response => {
            this.setState({users: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    showUser() {
        return this.state.users.map(function(currentUser, i) {
            return <User user={currentUser} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Registered User</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>email</th>
                            <th>Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.showUser() }
                    </tbody>
                </table>
            </div>
        )
    }
}