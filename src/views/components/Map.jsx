import React from 'react';
import Promise from 'bluebird';

import mapOptions from '../config/mapOptions';
import UserState from 'src/classes/UserState';

class Map extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let userState = new UserState({
			navigator: window.navigator
		});

		let allowLocate = Promise.promisify(userState.allowLocate.bind(window));
		let analizeArea = Promise.promisify(userState.analizeArea.bind(window));

		allowLocate()
		.then((position) => analizeArea({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		}))
		.then((results) => {
			var mapID = 'custom_style';
	    var mapOptions = {
	      center: new google.maps.LatLng(results.location.lat, results.location.lng),
	      zoom: 6,
		    mapTypeControl: false,
		    streetViewControl: false,
				mapTypeControlOptions: {
					mapTypeIds: [ google.maps.MapTypeId.ROADMAP, mapID ]
				},
				mapTypeId: mapID
	    };

	    var map = new google.maps.Map(React.findDOMNode(this.refs.map), mapOptions);

	  	var customMapType = new google.maps.StyledMapType(mapOptions, { name: 'Custom Style' })
	  	map.mapTypes.set(mapID, customMapType);

		})
		.catch((error)=>{
			console.log(error);
		});


		/*
    this.setState({ map: map });
		Stores.Initial.addChangeListener(this._changeState);

		google.maps.event.addListener(map, 'click', function(e){
			var latitude = e.latLng.A;
			var longitude = e.latLng.F;

			// 2回目以降にマーカーを生成する前に既存のマーカーを削除する
			if(_self.state.marker){
				_self.state.marker.setMap(null);
			}

	  	var marker = new google.maps.Marker({
				position: _self._mapCenterLatLng(latitude, longitude),
				title: 'イベントの場所',
				animation: google.maps.Animation.DROP,
				map: _self.state.map,
				icon: {
					url: '/images/marker.png',
					size: new google.maps.Size(48, 48)
				}
			});

			Actions.ClickMap.clickCoordinate({
				lat: latitude,
				long: longitude,
			});

			_self.setState({
				marker: marker
			});
		});
		*/
	}

	render(){
		return (
			<section className="map" ref='map'></section>
		);
	}
}

export default Map;
