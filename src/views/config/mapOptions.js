let invisible = [ { 'visibility': 'off' } ];

export default [
	// 表示の指定
  { featureType: 'administrative', 	stylers: invisible, elementType: 'geometry' },
  { featureType: 'poi', 						stylers: invisible },
  { featureType: 'road', 						stylers: invisible },
  { featureType: 'transit', 				stylers: invisible },
  { featureType: 'poi.park', 				stylers: [ { visibility: 'on' }] },
  { featureType: 'all', 						stylers: invisible, elementType: 'labels' },

	// 色調の指定
  { featureType: 'poi.park', 	elementType: 'fill', stylers: [ { color: '#2b6daa' }] },
  { featureType: 'landscape', elementType: 'fill', stylers: [ { color: '#dcf0ff' }] },
  { featureType: 'water', 		elementType: 'fill', stylers: [ { color: '#2b6daa' }] }
];
