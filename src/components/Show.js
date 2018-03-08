import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import NotFound from './NotFound';
import ModelViewer from './ModelViewer';

class Show extends Component {

	constructor(props) {
		super(props);
		this.state = {
			modelAvailable: false,
			modelFilepath: "",
			notFoundError: false,
			internalServerError: false,
			item: {}
		};
	}

	componentDidMount() {
		axios.get('/api/item/' + this.props.match.params.id)
			.then(res => {

				if (res.data.success === true) {
					const item = res.data.item;
					var modelFilepath="";
					var modelAvailable=false;
					if(item.modelFilename.length>0){
						modelAvailable=true;
						modelFilepath=axios.defaults.baseURL+'/uploads/'+item._id+'/'+item.modelFilename;
					}	
					this.setState({ 
						modelAvailable: modelAvailable,
						modelFilepath: modelFilepath,
						item: res.data.item
					 });
				} else {

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

	delete(id) {
		axios.delete('/api/item/' + id)
			.then(res => {
				this.props.history.push("/")
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
								{this.state.item.name}
							</h3>
						</div>
						<div className="panel-body">
							<div className="col-md-4">
								<h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Item List</Link></h4>
								<dl>
									<dt>Description:</dt>
									<dd>{this.state.item.description}</dd>
									<dt>Price:</dt>
									<dd>{this.state.item.price}</dd>
									<dt>Model filename</dt>
									<dd>{this.state.item.modelFilename}</dd>
									<dt>Created</dt>
									<dd>{this.state.item.createdAt}</dd>
								</dl>
								<Link to={`/edit/${this.state.item._id}`} className="btn btn-success">Edit</Link>&nbsp;
							<button onClick={this.delete.bind(this, this.state.item._id)} className="btn btn-danger">Delete</button>
							</div>
							<div className="col-md-6">
							{
								this.state.modelAvailable === true &&
								<ModelViewer modelFilepath={this.state.modelFilepath} />
      						}
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Show;