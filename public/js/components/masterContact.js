import React, { Component,PropTypes } from 'react'

var MySelect = React.createClass({
  getInitialState: function() {
    return {
      value: "0"
    };
  },

  handleChange: function(event) {
    var value = event.target.value;
    this.setState({value: event.target.value});
  },

  render: function() {
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="0" disabled>Choose Type</option>
		<option value="1">Education</option>
		<option value="2">Dome</option>
		<option value="3">Food</option>
		<option value="4">Play</option>
      </select>
    );
  }
});

export default class MasterContact extends Component {

  constructor(props) {
    super(props);
    this.addPlace = this.addPlace.bind(this);
  }

  addPlace() {
    var name = $('#plact_name').val();
    var lat = $('#lat_name').val();
    var lng = $('#lng_name').val();
    var type = $('#type_name').val();
    $.post('/addPlace',{name:name,lat:lat,lng:lng,type:type},function(response){
      $('#plact_name').val("");
      $('#lat_name').val("");
      $('#lng_name').val("");
      $('#type_name').val("");
    });
  }

  componentDidMount() {
      $('select').material_select();  
  }

  render() {
  	var styleA = {'borderRadius':'10px'};
  	var styleB = {'margin':'5px'};
  	var contacts = this.props.data.contact.result.map((contact,i)=>{
  		return (
  			<div className="row" key={i}>
				<div id="contactContent" className="col s12 orange lighten-2" style={styleA}>
					<div style={styleB}>{contact.data.content}</div>
				</div>
		    </div>
  		);
  	});
    return (
      <div>
      	<div className="row">
	      <form className="col s12">
	        <div className="row">
	          <div className="input-field col s2">
	            <input placeholder="Name" id="plact_name" type="text" className="validate" />
	          </div>
	          <div className="input-field col s2">
	            <input placeholder="Lat" id="lat_name" type="text" className="validate" />
	          </div>
	          <div className="input-field col s2">
	            <input placeholder="Lng" id="lng_name" type="text" className="validate" />
	          </div>
	          <div className="input-field col s3">
	            <MySelect />
	          </div>
	          <div className="input-field col s3">
	            <a onClick={this.addPlace} className="waves-effect waves-light btn"><i className="material-icons left">cloud</i>Add</a>
	          </div>
	        </div>
	      </form>
	    </div>
	    {contacts}
      </div>
    );
  }
}
