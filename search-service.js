/*** Data was copied from https://rmp.files.bbci.co.uk/technical-test/source-data.json and placed in source-data.json.
 * With more time I would of loaded the data in directly from https://rmp.files.bbci.co.uk/technical-test/source-data.json.
 * Would have loaded the data in via a dependancy such as Request or Fetch.
 */
const data = require('./source-data.json');

/*** This function takes in the search query parameter from app.js and returns array of programmes containing query param.
 *	Search String (word or phrase) has any spaces removed and is then transformed to lowercase.
 * This transformation makes the search case insensitive and allows us to use the "slice-title" property as part of search.
 * e.g. Input Value "Archers Omnibus" => ArchersOmnibus => archersomnibus
 * Given more time, the search function would be set up to allow other criteria to qualify search results.
 */
exports.fetchProgrammes = function(searchString) {
	var str = searchString.replace(/ /g,"").toLowerCase();
	var x = data.atoz.tleo_titles;	
	var returnedArr = [];
	for(var i = 0; i < x.length; i++){
		var sliceTitle = x[i].slice_title;
		var title = x[i].programme.title.replace(/ /g,"").toLowerCase();

		if(sliceTitle.includes(str)){
			returnedArr.push(x[i]);
		} else if(title.includes(str)) {
			returnedArr.push(x[i]);
		}
	}

	return returnedArr;
}