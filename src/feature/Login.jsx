import React, { Component } from 'react';
import { adminUsers } from './config';
import './styles.css';
class Login extends Component {
	state = {
		userName: '',
	};
	setUserName(value) {
		this.setState({
			userName: value,
		});
	}
	login(event) {
		const { userName } = this.state;
		event.preventDefault();
		const isAdmin = adminUsers.includes(userName);
		this.props.changeCredential(isAdmin);
	}
	render() {
		const { userName } = this.state;
		return (
			<React.Fragment>
				<form className="loginForm" onSubmit={event => this.login(event)}>
					<input
						className="userInput"
						value={userName}
						onChange={e => this.setUserName(e.target.value)}
						placeholder="username"
						type="text"
					/>

					<button className="LoginBtn btn" disabled={!userName}>
						Login
					</button>
				</form>
			</React.Fragment>
		);
	}
}

export default Login;
