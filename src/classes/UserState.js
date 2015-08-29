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
	takePhoto(mediaStream){

	}

	/***
	座標から県名を抽出する
	***/
	analizeState(latitude, longitude){

	}
}

export default UserState;
