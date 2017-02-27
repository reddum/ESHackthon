import React, { Component,PropTypes } from 'react'
import { render } from 'react-dom'
import MasterContact from './masterContact';

export default class ContactUs extends Component {

  constructor(props) {
    super(props);
    this.sendContact = this.sendContact.bind(this);
  }

  sendContact() {
    $.post('/sendContact',{content:$('#contactContent').html()},function(response) {
      $('#contactContent').html("");
    });
  }

  componentDidMount() {
      if(this.props.data.login=='yes'){
        render(
          <MasterContact data={this.props.data} />,
          document.getElementById('contactHole')
        );
      }
      else{
        var contentStyle = {
          borderRadius:'10px',
          minHeight: '200px'
        };
        var rowStyle = {
          borderRadius:'10px'
        };
        var content =
        <span> 
          <div className="row">
            <div id="contactContent" className="col s12 orange lighten-2" contentEditable="true" style={contentStyle}>

            </div>
          </div>
          <div className="row" style={rowStyle}>
            <a onClick={this.sendContact} className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Send</a>
          </div>
        </span>;
        render(
          content,
          document.getElementById('contactHole')
        );
      }
  }

  render() {

  	var contentStyle = {
  		borderRadius:'10px',
  		minHeight: '200px'
  	};

  	var rowStyle = {
  		textAlign:'center'
  	};

    return (
	<div id="contactUs" className="modal yellow lighten-2">
		<div className="modal-content">
			<div className="modal-header">
			  <h4>Contact Us</h4>
			</div>
			<span id="contactHole"></span>
		</div>
			<div className="modal-footer yellow darken-2">
			<a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Close</a>
		</div>
	</div>
    );
  }
}
