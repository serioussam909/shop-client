import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ItemEditForm from './Forms/ItemEditForm';
import ErrorPage from './ErrorPage';
import NotFound from './NotFound';

class Create extends Component {

    constructor() {
        super();
        this.state = {
            notFoundError: false,
            internalServerError: false,
            item: {
                name: '',
                description: '',
                price: '',
                modelFilename: ""
            }
        };
    }


    onSubmit = (item) => {

        const formData = new FormData();
        for (var key in item) {
            if (item.hasOwnProperty(key)) {
                formData.append(key, item[key]);
            }

        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('/api/item', formData, config)
            .then((res) => {
                if (res.data.success === true) {
                    this.props.history.push("/")
                }
                else {

                    const state = this.state;
                    state.error = res.data.message;
                    this.setState(state);
                }
            }).catch(err => {
                console.log(err);
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
                                ADD ITEM
                            </h3>
                        </div>

                        <div className="panel-body">
                            <div className="panel panel-warning">
                                {this.state.error}
                            </div>
                            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Item List</Link></h4>
                            <ItemEditForm item={this.state.item} onSubmit={this.onSubmit} modelRequired={true} />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Create;