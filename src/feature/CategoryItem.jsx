import React, { Component } from 'react';
import './styles.css';
class CategoryItem extends Component {
	state = {
		showEdit: false,
		itemName: null,
		itemDescription: null,
		itemPrice: null,
	};
	savechanges(event, item) {
		event.preventDefault();
		const { itemPrice, itemDescription, itemName } = this.state;
		const { editItemInCategroy } = this.props;

		const data = {
			itemPrice: itemPrice || itemPrice === '' ? itemPrice : item.price,
			itemDescription: itemDescription || itemDescription === '' ? itemDescription : item.description,
			itemName: itemName || itemName === '' ? itemName : item.name,
			itemId: item.id,
		};
		editItemInCategroy(data);
		this.setState({
			showEdit: false,
		});
	}
	DeleteItem(id) {
		const { deleteItemInCategroy } = this.props;
		deleteItemInCategroy(id);
		this.setState({
			showEdit: false,
		});
	}
	changeState(key, e) {
		this.setState({ [key]: e.target.value });
	}
	showEditsection(item) {
		const { itemPrice, itemDescription, itemName } = this.state;

		return (
			<form onSubmit={event => this.savechanges(event, item)}>
				<div>
					<label>Name</label>
					<input
						className="inputtxt"
						type="text"
						onChange={e => this.changeState('itemName', e)}
						value={itemName || itemName === '' ? itemName : item.name}
					/>
				</div>
				<div>
					<label>Description</label>
					<input
						className="inputtxt"
						type="text"
						onChange={e => this.changeState('itemDescription', e)}
						value={itemDescription || itemDescription === '' ? itemDescription : item.description}
					/>
				</div>
				<div>
					<label>Price</label>
					<input
						className="inputtxt"
						type="text"
						onChange={e => this.changeState('itemPrice', e)}
						value={itemPrice || itemPrice === '' ? itemPrice : item.price}
					/>
				</div>
				<button className="btn btnPadding" disabled={!(itemPrice || itemDescription || itemName)}>
					Save
				</button>
			</form>
		);
	}
	render() {
		const { item } = this.props;
		const { showEdit } = this.state;
		return (
			<li key={item.id} className="itemSection">
				<span>{item.name}</span>
				<span>
					<button className="btn btnPadding" onClick={() => this.setState({ showEdit: !showEdit })}>
						Edit
					</button>
				</span>
				<span>
					<button className="btn btnPadding" onClick={() => this.DeleteItem(item.id)}>
						Delete
					</button>
				</span>
				{showEdit ? this.showEditsection(item) : null}
			</li>
		);
	}
}

export default CategoryItem;
