import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorPage extends Component {

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">

          </div>
          <div className="panel-body">
            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span> Back To Item List</Link></h4>
            <p>INTERNAL SERVER ERROR</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;