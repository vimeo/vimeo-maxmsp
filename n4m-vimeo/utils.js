module.exports = {
	isTokenValid: function(authToken) {
		// If token is not null or empty, return true
		if (authToken && authToken !== '') {
			return true;
		}
		return false;
	},

	/**
	 * Sort an array of objects from high to low based on a property
	 * @param  {Object} list     Array of objects
	 * @param  {String} property Property criterion for sorting
	 * @return {Object}          Sorted array
	 */
	sortHighToLow: function(list, property) {
		return list.sort(function(a, b) {
			if (parseInt(a[property]) > parseInt(b[property])) return -1;
				return 1;
		});	
	}
}
