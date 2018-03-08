import React, { Component } from 'react';

class ItemEditForm extends Component {

	constructor(props) {
		super(props);

		this.state = props.item;

		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.item !== this.props.item) {
			this.setState(nextProps.item);
		}
	}


	onSubmit = (e) => {
		e.preventDefault();
		this.props.onSubmit(this.state);
	}

	onChange = (e) => {
		const state = this.state
		state[e.target.name] = e.target.value;
		this.setState(state);
	}


	onModelChange = (e) => {
		const state = this.state
		state.model = e.target.files[0];
		this.setState(state);
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} encType='multipart/form-data'>
				<div className="form-group">
					<label htmlFor="name">Name:</label>
					<input type="text" className="form-control" name="name" required value={this.state.name} onChange={this.onChange} placeholder="Name" />
				</div>

				<div className="form-group">
					<label htmlFor="description">Description:</label>
					<textarea className="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
				</div>
				<div className="form-group">
					<label htmlFor="price">Price:</label>
					<input type="number" className="form-control" required name="price" min="0" value={this.state.price} onChange={this.onChange} placeholder="Price" />
				</div>
				<div className="form-group">
					{this.state.modelFilename.length > 0 ? "Model filename: " + this.state.modelFilename : ""}
				</div>
				<div className="form-group">
					<label htmlFor="model">Model:</label>
					<input type="file" className="form-control" required={this.props.modelRequired ? 'required' : ''} name="model" accept=".zip" onChange={this.onModelChange} placeholder="Model" />
				</div>

				<button type="submit" className="btn btn-default">Submit</button>
			</form>
		)
	}
}

export default ItemEditForm;