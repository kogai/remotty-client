import { EventEmitter } from 'events';

import Promise from 'bluebird';

import config from 'src/views/config';

const TAKE_SNAP_EVENT = 'TAKE_SNAP_EVENT';

class SnapShot extends EventEmitter{

  /**
  * @constructor
  */
  constructor(){
    super();
    this.intervalID = null;
    this.mediaStream = null;
    this.video = null;
  }

  /**
   *動画を取得する
   * @param {Function} [done] - 非同期処理完了後に呼び出すコールバック。引数がなければPromise化して返す
   */
	allowVideo(done){
    let _allowVideo = (done) =>{
    	window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia;

      window.navigator.getUserMedia(
    		{ video: true },
    		(mediaStream) => {
        	const video = document.createElement('video');
        	const videoURL = window.URL.createObjectURL(mediaStream);
        	video.src = videoURL;

          this.mediaStream = mediaStream;
          this.video = video;

          done(null, video);
        },
    		(error) => done(error)
    	);
    }

    if(done){
      return _allowVideo(done);
    }
    return Promise.promisify(_allowVideo)();
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
    this.on(TAKE_SNAP_EVENT, this.emitableCallback);

    this.intervalID = setInterval(()=>{
			const imgURL = this.takePhoto(video);
      this.emit(TAKE_SNAP_EVENT, imgURL);
    }, config.SNAP_INTERVAL);
  }

  /**
  * 定期的な撮影を停止
  */
  stop(video){
    video.stop();
    clearInterval(this.intervalID);
    this.removeListener(TAKE_SNAP_EVENT, this.emitableCallback);
    this.mediaStream.stop();
  }

}


export default SnapShot;

const snapshot = new SnapShot();
export { snapshot };
