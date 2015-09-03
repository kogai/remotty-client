import request from 'superagent';

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
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		const photoSize = 100;
		const videoWidth = 640;
		const videoHeight = 480;

		canvas.width = photoSize;
		canvas.height = photoSize;

		const src = {
			x: (videoWidth - videoHeight) / 2,
			y: 0,
			width: videoHeight / 2,
			height: videoHeight / 2
		};

		const dest = {
			x: 0,
			y: 0,
			width: photoSize,
			height: photoSize
		};

		context.drawImage(srcVideo, src.x, src.y, src.width, src.height, dest.x, dest.y, dest.width, dest.height);

		const imgURL = canvas.toDataURL('image/jpeg');
		return imgURL;
	}


	/***
	座標から県名を抽出する
	***/
	analizeArea(latlong, done){
		request
		.get('/area')
		.query(latlong)
		.end((error, ret) => {
			if(error){
				return done(error);
			}
			done(null, ret.body);
		});
	}
}

export default UserState;
