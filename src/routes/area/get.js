import geocoder from 'geocoder';
import { geocoderKey } from '../../credential.js';
import util from 'util';

export default (req, res) => {
  const latlong = req.query;

  let options = {
	  key: geocoderKey,
	  result_type: ['administrative_area_level_1']
  };

  const japaneseLang = 'ja';
  if(req.headers['accept-language'].match(japaneseLang)){
    options.language = japaneseLang;
  }

	geocoder.reverseGeocode(latlong.latitude, latlong.longitude, function (err, data) {
		if(err){
      return res.status(500).send(err);
		}

    let result;
    try{
      result = data.results[0];
    }catch(cathcedError){
      return res.status(400).send(cathcedError);
    }

    res.status(200).send({
      body: result,
      formatted_address: result.formatted_address,
      location: result.geometry.location
    });

	}, options);
};
