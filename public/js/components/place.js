'use strict'

import React, { Component,PropTypes } from 'react'
import {ui} from '../react/index'

export default class Place extends Component {
	constructor (props) {
	    super(props);
	    this.onClickHendler = this.onClickHendler.bind(this);
	}

	onClickHendler(){
		ui.placeBtnHendler(this.props.data.lat,this.props.data.lng);
	}

	render(){
		return (
		    <button className="waves-effect waves-light btn" onClick={this.onClickHendler} style={{margin:'5px'}}>{this.props.data.name}</button>
		);
	}
}
