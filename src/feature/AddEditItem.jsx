import React, { Component } from 'react';
import Category from './Category';
import './styles.css';
class AddEditItem extends Component {
	state = {
		catName: null,
		catDescription: null,
	};
	addEditCategory() {
		const { catName, catDescription } = this.state;
		const { addEditCategory, category } = this.props;
		addEditCategory({
			name: catName,
			description: catDescription,
			category,
		});
		this.setState({ catName: null, catDescription: null });
	}
	changeState(key, value) {
		this.setState({ [key]: value });
	}
	render() {
		const { catName, catDescription } = this.state;
		const { category, text } = this.props;

		let name = category && category.name ? category.name : '';
		let description = category && category.description ? category.description : '';
		let nameValue = catName || catName == '' ? catName : name;
		let descriptonValue = catDescription || catDescription == '' ? catDescription : description;
		return (
			<section className="AddFields">
				<input
					onChange={e => this.changeState('catName', e.target.value)}
					placeholder="English Name"
					value={nameValue}
					type="text"
					className="inputtxt"
				/>
				<textarea
					onChange={e => this.changeState('catDescription', e.target.value)}
					placeholder="English Description"
					value={descriptonValue}
					className="inputtxt"
				/>
				<button className="btn btnPadding" disabled={!catName} onClick={() => this.addEditCategory()}>
					{text}
				</button>
			</section>
		);
	}
}

export default AddEditItem;
