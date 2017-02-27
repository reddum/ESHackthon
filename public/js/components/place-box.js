/* global fetch */
'use strict'

import React, { Component, PropTypes } from 'react'
import PlaceList from './place-list'

export default class PlaceBox extends Component {
  constructor (props) {
    super(props)
    this.state = { data: [] }
    this.loadComments = this.loadComments.bind(this);
  }

  loadComments () {
    $.get(this.props.url,function(response){
      this.setState({data:response.result});
    }.bind(this));
  }

  componentDidMount () {
    this.loadComments();
    $('.carousel.carousel-slider').carousel({full_width: true});
  }

  render () {
    var rowStyle={
      height:'25vh'
    };
    return (
      <div className='row' style={rowStyle}>
        <div className='carousel carousel-slider'>
          <PlaceList data={this.state.data} type='1' name='Education' />
          <PlaceList data={this.state.data} type='2' name='Dome' />
          <PlaceList data={this.state.data} type='3' name='Food' />
          <PlaceList data={this.state.data} type='4' name='Play' />
        </div>
      </div>
    )
  }
}
