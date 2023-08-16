function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Utility function to get tile coords from latitude and longitude
  function long2tile(lon, zoom) {
    return (Math.floor((lon + 180) / 360 * (2 ** zoom)));
  }

  function lat2tile(lat, zoom) {
    if (lat >= 90 || lat <= -90) {
      //console.error('Invalid latitude value:', lat);
      return null;
    }

    return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * (2 ** zoom)));
  }

  function randomTileForRegion(lat_min, lat_max, lon_min, lon_max, z_min, z_max) {
    lat_min = ensureValidLatitude(lat_min);
    lat_max = ensureValidLatitude(lat_max);

    const z = getRandomInt(z_min, z_max);
    const x_min = long2tile(lon_min, z);
    const x_max = long2tile(lon_max, z);
    const y_min = lat2tile(lat_max, z);
    const y_max = lat2tile(lat_min, z);

    const x = getRandomInt(x_min, x_max);
    const y = getRandomInt(y_min, y_max);
    return { x, y, z };
  }

  function ensureValidLatitude(lat) {
    const MIN_LAT = -89.9;
    const MAX_LAT = 89.9;

    if (lat < MIN_LAT) {
      //console.warn(`Latitude ${lat} is too low. Adjusting to ${MIN_LAT}`);
      return MIN_LAT;
    } else if (lat > MAX_LAT) {
      //console.warn(`Latitude ${lat} is too high. Adjusting to ${MAX_LAT}`);
      return MAX_LAT;
    }
    return lat;
  }

  module.exports = {
    getRandomInt,
    long2tile,
    lat2tile,
    randomTileForRegion,
    ensureValidLatitude
};