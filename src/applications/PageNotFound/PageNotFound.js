import React, { Component } from 'react';
import "./PageNotFound.css";

class PageNotFound extends Component {
  render() {
    return (
      <div className="pageNotFound">
        <h1 className="exclamation">PAGE NOT FOUND</h1>
        <h2 className="pageNotFoundText">ACHKKK!  I don't know how you got here,
          but there's nothing here...
          wherever "here" is...
        </h2>
      </div>
    );
  }
}

export default PageNotFound;
