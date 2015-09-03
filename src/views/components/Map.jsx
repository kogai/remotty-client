import React from 'react';
import Promise from 'bluebird';

import UserState from 'src/views/classes/UserState';
import MapClass from 'src/views/classes/MapClass';

let map;

class Map extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		let userState = new UserState({
			navigator: window.navigator
		});

		let mapInstance = new MapClass();

		let allowLocate = Promise.promisify(userState.allowLocate.bind(window));
		let analizeArea = Promise.promisify(userState.analizeArea.bind(window));
		let drawMap = Promise.promisify(mapInstance.drawMap.bind(window));

		allowLocate()
		.then((position) => analizeArea({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		}))
		.then((position) => drawMap({
			position: position,
			domNode: React.findDOMNode(this.refs.map)
		}))
		.then((_map) => {
			map = _map;
		})
		.catch((error)=>{
			console.log(error);
		});
	}

	render(){
		return (
			<section className="map" ref='map'></section>
		);
	}
}

export default Map;
