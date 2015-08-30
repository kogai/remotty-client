import Promise from 'bluebird';

class MapClass {
  /***
  地図の描画
  ***/
  drawMap(opts, done){
    var mapOptions = {
      center: new google.maps.LatLng(opts.position.location.lat, opts.position.location.lng),
      zoom: 6,
	    mapTypeControl: false,
	    streetViewControl: false
    };

    var map = new google.maps.Map(opts.domNode, mapOptions);
    done(null, map);
  }

  /***
  地図上にアイコンを描画
  ***/
  drawIcon(opts = { latlong: [0, 0], icon: '/images/icon.png' }, done){
    /*
  	let marker = new google.maps.Marker({
			position: _map.center,
			title: '現在地',
			animation: google.maps.Animation.DROP,
			map: _map,
			icon: {
				url: '/images/icon.png',
				size: new google.maps.Size(48, 48)
			}
		});
    */
  }
}

export default MapClass;
