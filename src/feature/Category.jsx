import React, { Component } from 'react';
import configData from './config';
import CategoryItem from './CategoryItem';
import AddEditItem from './AddEditItem';
import { editItem, deleteItem, addCategory, editCategory, deleteCategory, addItem } from './helper';
import './styles.css';
class Category extends Component {
	constructor(props) {
		super(props);
		this.state = { config: configData, isAdmin: props.isAdmin };
	}
	ResetCategories(config) {
		this.setState({
			config,
		});
	}
	renderItems(items, catId) {
		return (
			<React.Fragment>
				{items.map((item, contentIndex) => {
					return (
						<CategoryItem
							item={item}
							editItemInCategroy={data =>
								editItem(data, catId, this.state.config, newCategories =>
									this.ResetCategories(newCategories)
								)
							}
							deleteItemInCategroy={itemId =>
								deleteItem(itemId, catId, this.state.config, newCategories =>
									this.ResetCategories(newCategories)
								)
							}
						/>
					);
				})}
			</React.Fragment>
		);
	}
	renderNewCategory() {
		return (
			<React.Fragment>
				<AddEditItem
					addEditCategory={data =>
						addCategory(data, this.state.config, newCategories => this.ResetCategories(newCategories))
					}
					text="Add Category"
				/>
			</React.Fragment>
		);
	}
	extandItem(index, isExtended) {
		const { config } = this.state;
		var data = Object.assign({}, config);
		data.categories[index].extandItem = !isExtended;
		this.setState({
			config: data,
		});
	}
	renderCategories() {
		const { config, isAdmin } = this.state;
		return config.categories.map((category, contentIndex) => {
			const isExtended = category.extandItem;
			return (
				<div>
					<div className="catHeader">
						<div
							className={`${isAdmin ? 'pointer' : ''} headerlbl `}
							onClick={isAdmin ? () => this.extandItem(contentIndex, isExtended) : f => f}
						>
							{category.name}
						</div>
						{isAdmin ? (
							<div
								className="deteteCat"
								onClick={contentIndex =>
									deleteCategory(contentIndex, this.state.config, newCategories =>
										this.ResetCategories(newCategories)
									)
								}
							>
								x
							</div>
						) : null}
					</div>
					{isAdmin && isExtended ? (
						<section>
							<AddEditItem
								addEditCategory={data =>
									editCategory(data, this.state.config, newCategories =>
										this.ResetCategories(newCategories)
									)
								}
								category={category}
								text="Edit Category"
							/>
							<section>
								<AddEditItem
									addEditCategory={data =>
										addItem(data, contentIndex, this.state.config, newCategories =>
											this.ResetCategories(newCategories)
										)
									}
									text="Add Item"
								/>
							</section>
							{this.renderItems(category.items, category.id)}
						</section>
					) : null}
				</div>
			);
		});
	}
	render() {
		const { isAdmin } = this.state;
		return (
			<div className="menu">
				<span className="title">Menu Data</span>
				{isAdmin ? <section> {this.renderNewCategory()}</section> : null}
				<section>{this.renderCategories()}</section>
			</div>
		);
	}
}

export default Category;
