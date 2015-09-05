import log4js from "log4js";
import log4js_extend from "log4js-extend";

class Logger {
  constructor(){
    const configure = {
    	appenders: [{
    		type: 'console',
    		category: 'debug'
      }]
    };

    const configureExtend = {
      path: __dirname + '/global',
      format: "[@file:@line:@column]"
    };

    log4js.configure(configure);
    log4js_extend(log4js, configureExtend);

    this.log4js = log4js;
  }

  getLogger(){
    return this.log4js.getLogger('debug');
  }
}

const logger = new Logger();
const log = logger.getLogger();

export { log }
export default Logger;
