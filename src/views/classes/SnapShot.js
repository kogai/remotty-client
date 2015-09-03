import { EventEmitter } from 'events';

import Promise from 'bluebird';

import config from 'src/views/config';

const TAKE_SNAP = 'TAKE_SNAP';

class SnapShot extends EventEmitter{

  /**
  * @constructor
  */
  constructor(){
    this.intervalID;
  }

  /**
   *動画を取得する
   * @param {Function} [done] - 非同期処理完了後に呼び出すコールバック。引数がなければPromise化して返す
   */
	allowVideo(done){
    const _allowVideo = (done) =>{
    	this.navigator.getUserMedia = this.navigator.getUserMedia || this.navigator.webkitGetUserMedia;

      this.navigator.getUserMedia(
    		{ video: true },
    		(localMediaStream) => {
        	const video = document.createElement('video');
        	const videoURL = window.URL.createObjectURL(localMediaStream);
        	video.src = videoURL;
          done(null, video);
        },
    		(error) => done(error)
    	);
    }

    if(done){
      _allowVideo(done);
    }
    return Promise.promisify(_allowVideo);
	}

  /**
  * 動画を破棄する
  */
  disAllowVideo(){

  }

	/**
	* 動画から画像を生成する
   * @param {Object} srcVideo - videoオブジェクト
   * @return {String} imgURL - 画像のソース文字列
	*/
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
			width: videoHeight,
			height: videoHeight
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

  /**
  * 定期的な撮影を開始
  */
  start(video, emitableCallback){
    video.play();

    this.emitableCallback = emitableCallback;
    this.on(TAKE_SNAP, this.emitableCallback);

    this.intervalID = setInterval(()=>{
			const imgURL = this.takePhoto(video);
      this.emit(TAKE_SNAP, imgURL);
    }, config.SNAP_INTERVAL);
  }

  /**
  * 定期的な撮影を停止
  */
  stop(video){
    video.stop();
    clearInterval(this.intervalID);
    this.removeListener(TAKE_SNAP, this.emitableCallback);
  }
}


/*
	const video = document.createElement('video');
	const videoURL = window.URL.createObjectURL(localMediaStream);
	video.src = videoURL;
	video.play();

	video.onloadedmetadata = function(e) {
		setInterval( () => {
			const imgURL = userState.takePhoto(video);
			_self.setState({
				imgURL: imgURL
			});
		}, config.snapInterval);
	};

	emitChange(){
		this.emit(CHANGE_EVENT);
	},

	listen(callback){
		this.on(CHANGE_EVENT, callback);
	}

snapshot.on('register', callback);
snapshot.on('deregister', callback);

*/


export default SnapShot;
export function snapshot (opts = {}) {
  return new SnapShot(opts);
}
