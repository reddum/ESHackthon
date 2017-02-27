import React, { Component,PropTypes } from 'react'
import { render } from 'react-dom'
import {map} from '../react/index'
import PlaceBox from './place-box';
import ContactUs from './contactUs';
import Account from './Account';
import MyAccount from './MyAccount';
import Health from './Health';

export default class UI extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchButToggle : false,
			navigationButToggle : false,
			locationOriginToggle : false,
			locationOriginInterval:null
		};
		this.getNearestBike = this.getNearestBike.bind(this);
		this.myLocation = this.myLocation.bind(this);
		this.toggleSearchPanel = this.toggleSearchPanel.bind(this);
		this.placeBtnHendler = this.placeBtnHendler.bind(this);
		this.showSearchPanel = this.showSearchPanel.bind(this);
		this.hideSearchPanel = this.hideSearchPanel.bind(this);
	}

	getNearestBike() {
		if(this.state.navigationButToggle){
			this.setState({navigationButToggle:false});
			map.clearPath();
			$('#navigationBut i').html("navigation");
		}
		else{
			this.setState({navigationButToggle:true});
			map.setNearestBikePath();
			$('#navigationBut i').html("stop");
		}
	}

	myLocation() {
		if(this.state.locationOriginToggle){
			this.setState({locationOriginToggle:false});
			map.unLockMove();
			clearInterval(this.state.locationOriginInterval);
			$('#centerLocationBut i').html("my_location");
		}
		else{
			this.setState({locationOriginToggle:true});
			map.lockMove();
			map.setOriginLocation();
			this.state.locationOriginInterval = setInterval(function() {
				map.setOriginLocation();
			},1000);
			$('#centerLocationBut i').html("stop");
		}
	}

	toggleSearchPanel(){
		if(this.state.searchButToggle){
			this.setState({searchButToggle:false});
			this.hideSearchPanel();
		}
		else{
			this.setState({searchButToggle:true});
			this.showSearchPanel();
		}
	}

	placeBtnHendler(lat,lng) {
		map.findPlacePath(parseFloat(lat),parseFloat(lng));
		this.toggleSearchPanel();
	}

	showSearchPanel() {!
		$("#searchPanel").animate({top: '70vh'});
		$("#buts").animate({bottom: '30vh'});
		$('#searchBut i').html("stop");
		map.clearPlacePath();
	}

	hideSearchPanel() {
		$("#searchPanel").animate({top: '100vh'});
		$("#buts").animate({bottom: '10px'});
		$('#searchBut i').html("search");
	}

	componentDidMount() {   
		$.post('/isLogin',function(response){
			var AccountLi;
			var AccountModal;
			console.log(response);
			if(response.login=='no'){
				AccountLi = <li><a className="btn-floating modal-trigger blue" href="#login"><i className="material-icons">vpn_key</i></a></li>;
				AccountModal = 
				<span>
					<ContactUs data={response}/>
					<Account />
				</span>;
			}
			else{
				AccountLi = 
				<span>
					<li><a className="btn-floating modal-trigger green" href="#health"><i className="material-icons">perm_identity</i></a></li>
    				<li><a className="btn-floating modal-trigger blue" href="#account"><i className="material-icons">settings</i></a></li>
				</span>;
				AccountModal = 
				<span>
					<ContactUs data={response}/>
					<MyAccount data={response}/>
					<Health data={response}/>
				</span>;
			}
			render(AccountLi,document.getElementById('AccountLiHole'));
			render(AccountModal,document.getElementById('AccountModalHole'));
			$('.modal-trigger').leanModal();
		});
	}

	render() {

		var menuStyle = {
			position:'fixed',
			bottom:'10px',
			right:'10px'
		};

		var footerStyle = {
			left:'0',
			top:'100vh',
			position:'fixed',
			width:'100%',
			overflow:'auto'
		};

		return (
			<div>
				<div id="buts" className="fixed-action-btn click-to-toggle" style={menuStyle}>
					<a className="btn-floating btn-large waves-effect waves-light red">
						<i className="material-icons">menu</i>
					</a>
					<ul>
						<li><a className="btn-floating modal-trigger" href="#contactUs"><i className="material-icons">supervisor_account</i></a></li>
						<li><a className="btn-floating lime accent-2" id="searchBut" onClick={this.toggleSearchPanel}><i className="material-icons">search</i></a></li>
						<li><a className="btn-floating red" id="centerLocationBut" onClick={this.myLocation}><i className="material-icons">my_location</i></a></li>
						<li><a className="btn-floating yellow darken-1" id="navigationBut" onClick={this.getNearestBike} id="navigationBut"><i className="material-icons">navigation</i></a></li>
						<span id="AccountLiHole"></span>
					</ul>
				</div>
				<footer id="searchPanel" className="page-footer" style={footerStyle}>
					<div className="container" id="placeContainer">
						<PlaceBox url='/place' />
					</div>
				</footer>
				<span id="AccountModalHole"></span>
			</div>
		);
	}
}
