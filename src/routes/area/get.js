import geocoder from 'geocoder';
import { geocoderKey } from '../../credential.js';
import util from 'util';

export default (req, res) => {
  let latlong = req.query;

	geocoder.reverseGeocode(latlong.latitude, latlong.longitude, function (err, data) {
		if(err){
      return res.status(500).send(err);
		}
    res.status(200).send(data.results);
	}, {
	  key: geocoderKey,
	  result_type: ['administrative_area_level_1']
	});
};
