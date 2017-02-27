'use strict'

import React, { Component,PropTypes } from 'react'
import Place from './place'

export default class PlaceList extends Component {
  constructor (props) {
    super(props);
    this.compare = this.compare.bind(this);
  }

  compare(item,i){
    return item.data.type==this.props.type;
  }

  render(){
    const rowPlaceNodes = this.props.data.filter(this.compare);
    const placeNodes = rowPlaceNodes.map((place, i) => {
      return (
        <Place data={place.data} key={i} />
      )
    });
    var href = '#page'+this.props.type;
    return (
        <a className='carousel-item' href={href}>
          <div>
            <div>
              <h3><i className="material-icons">fast_rewind</i>{this.props.name}<i className="material-icons">fast_forward</i></h3>
            </div>
            <div>
              {placeNodes}
            </div>
          </div>
        </a>
    );
  }
}
