class UserState {
	constructor(opts = {}){
    this.navigator = opts.navigator;
	}

	allowVideo(done){
		const constraints = { video: true };

		let getUserMedia = (constraints, success, fail) => {
      if(this.navigator.getUserMedia){
        return this.navigator.getUserMedia(constraints, success, fail);
      }
      this.navigator.webkitGetUserMedia(constraints, success, fail);
    };

		function success(localMediaStream){
      done(null, localMediaStream);
		}

		function fail(){
      done(err);
		}

		getUserMedia(constraints, success, fail);
	}

	allowLocate(){

	}
}

export default UserState;
