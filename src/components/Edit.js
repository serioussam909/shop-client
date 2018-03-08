import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ItemEditForm from './Forms/ItemEditForm';
import ErrorPage from './ErrorPage';
import NotFound from './NotFound';

class Edit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			notFoundError: false,
			internalServerError: false,
			item: {
				name: '',
				description: '',
				price: '',
				modelFilename: ''
			}
		};
	}
	// connect to API to get the item
	componentDidMount() {
		axios.get('/api/item/' + this.props.match.params.id)
			.then(res => {
				if (res.data.success === true) {
					this.setState({ item: res.data.item });
				} else {
					this.setState({ error: "Item doesn't exist" });
				}

			}).catch(err => {
				if (err.response.status === 404) {
					this.setState({ notFoundError: true });
				}
				else {
					this.setState({ internalServerError: true });
				}
			});
	}

	onSubmit = (item) => {

		const formData = new FormData();
		for (var key in item) {
			if (item.hasOwnProperty(key) && key !== 'modelFilename') {
				formData.append(key, item[key]);
			}

		}

		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}

		axios.put('/api/item/' + this.props.match.params.id, formData, config)
			.then((res) => {
				if (res.data.success === true) {
					this.props.history.push("/show/" + this.props.match.params.id);
				}
				else {
					const state = this.state;
					state.error = res.data.message;
					this.setState(state);
				}

			}).catch(err => {
				if (err.response.status === 404) {
					this.setState({ notFoundError: true });
				}
				else {
					this.setState({ internalServerError: true });
				}
			});
	}

	render() {
		if (this.state.notFoundError === true) {
			return (<NotFound />);
		} if (this.state.internalServerError === true) {
			return (<ErrorPage />);
		} else {
			return (
				<div className="container">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title">
								EDIT ITEM
				</h3>
						</div>
						<div className="panel-body">
							<h4><Link to={`/show/${this.state.item._id}`}><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Item List</Link></h4>
							<ItemEditForm item={this.state.item} onSubmit={this.onSubmit} modelRequired={false} />
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Edit;