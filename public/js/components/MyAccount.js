import React, { Component, PropTypes } from 'react'

export default class MyAccount extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
     <div id="account" className="modal">
	  <div className="modal-content">
	    <div className="modal-header">
	      <h4>Account</h4>
	    </div>
	    //content
	  </div>
	  <div className="modal-footer">
	    <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
	  </div>
	</div>
    );
  }
}
