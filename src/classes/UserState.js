import geocoder from 'geocoder';
import { geocoderKey } from '../../credential.js'

class UserState {
	constructor(opts = {}){
    this.navigator = opts.navigator;
	}

	/***
	メディアストリームを取得する
	***/
	allowVideo(done){
		this.navigator.getUserMedia = this.navigator.getUserMedia || this.navigator.webkitGetUserMedia;

		this.navigator.getUserMedia(
			{ video: true },
			(localMediaStream) => done(null, localMediaStream),
			(error) => done(error)
		)
	}

	/***
	位置情報を取得する
	***/
	allowLocate(done){
    this.navigator.geolocation.getCurrentPosition(
			(position ) =>  done(null, position),
			(error) => done(error)
		);
	}

	/***
	動画から画像を生成する
	***/
	takePhoto(srcVideo){
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');

		canvas.width = 640;
		canvas.height = 480;

		var src = {
			x: 0,
			y: 0,
			width: 640,
			height: 480
		};

		var dest = {
			x: 0,
			y: 0,
			width: 640,
			height: 480
		};

		context.drawImage(srcVideo, src.x, src.y, src.width, src.height, dest.x, dest.y, dest.width, dest.height);

		var imgURL = canvas.toDataURL('image/jpeg');
		return imgURL;
	}

	/***
	座標から県名を抽出する
	***/
	analizeState(latlong, done){
		geocoder.reverseGeocode(latlong.latitude, latlong.longitude, function ( err, data ) {
		  if(error){
				return done(error);
			}
			done(null, data.results);
		}, {
		  key: geocoderKey,
		  result_type: ['administrative_area_level_1']
		});
	}
}

export default UserState;
