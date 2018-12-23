import React, { Component } from 'react';
import Category from './feature/Category';
import Login from './feature/Login';

class App extends Component {
	state = {
		loggedIn: false,
		isAdmin: false,
	};
	changeCredential(isAdmin) {
		this.setState({
			loggedIn: true,
			isAdmin,
		});
	}
	render() {
		const { isAdmin, loggedIn } = this.state;
		return (
			<div className="App">
				{loggedIn ? (
					<Category isAdmin={isAdmin} />
				) : (
					<Login changeCredential={isLoggedIn => this.changeCredential(isLoggedIn)} />
				)}
			</div>
		);
	}
}

export default App;
