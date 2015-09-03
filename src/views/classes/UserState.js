import request from 'superagent';

class UserState {
	constructor(opts = {}){
    this.navigator = opts.navigator;
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
