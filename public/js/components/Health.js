import React, { Component, PropTypes } from 'react'

export default class Health extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
       <div id="health" className="modal">
		  <div className="modal-content">
		    <div className="modal-header">
		      <h4>Health Manager</h4>
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
