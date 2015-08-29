class UserState {
	constructor(opts = {}){
    this.navigator = opts.navigator;
	}

	allowVideo(done){
		this.navigator.getUserMedia = this.navigator.getUserMedia || this.navigator.webkitGetUserMedia;

		this.navigator.getUserMedia(
			{ video: true },
			(localMediaStream) => done(null, localMediaStream),
			(error) => done(error)
		)
	}

	allowLocate(done){
    this.navigator.geolocation.getCurrentPosition(
			(position ) =>  done(null, position),
			(error) => done(error)
		);
	}
}

export default UserState;
