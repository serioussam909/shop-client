import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  getItems() {
    axios.get('/api/item')
      .then(res => {
        this.setState({ items: res.data.items });
      });
  }

  componentDidMount() {
    this.getItems();
  }

  delete(id) {
    axios.delete('/api/item/' + id)
      .then((result) => {
        this.props.history.push("/")
        this.getItems();
      });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ITEM LIST
              </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/create"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Item</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Created</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map(item =>
                  <tr key={item._id}>
                    <td>
                      <Link to={`/show/${item._id}`}>{item.name}</Link>
                    </td>
                    <td>{item.price}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <button onClick={this.delete.bind(this, item._id)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;