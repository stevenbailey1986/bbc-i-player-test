/*** Function to return and render data that contains the search input.
 */
function searchProgramme(){

  var search = document.getElementById("progSearch").value;

/*** AJAX Get request that sends the search input value up as a query parameter to search endpoint.
 * Returns array of data of prgrammes who's title contains the searched for phrase.
 * Empties <ul> element with id="results" before appending results to clear previous search results.
 * If no items returned, displays "There are no results".
 * For loop iterates returned array of matching programes & creates & appends a <li> element for each.
 * Throws error object if error.
 */
  $.ajax({
    url: "http://localhost:3000/search?search=" + search,
    type: "GET",
    success: function(response) {
      //
      $("#results").empty();
      
      if(response.length === 0){
        $( "#results" ).append("There are no results");
      } else {
        for(var i = 0; i < response.length; i++){
          const programme = response[i].programme;
          const template = createResultHtml(programme);

          // 
          $( "#results" ).append(template);
        }
      }
    },
    error: function(response) {
      alert("Error fetching data. Is the server running?")
      console.log("Error Response: ", response);
    }
  });

}

/*** Template constructor function that creates <li> element for each programme in returned array
*/
function createResultHtml(programme) {
  return `  
    <li>
      <img class="imagePID img-responsive img-rounded" src="https://ichef.bbci.co.uk/images/ic/480x270/${programme.image.pid}.jpg">
      <div style="float:left;">
        <p class="title">${programme.title}</p>
        <p class="synopsis">${programme.short_synopsis}</p>
      </div>
      <hr style="clear:both;">
    </li>
`
}