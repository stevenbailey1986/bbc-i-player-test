var search = document.getElementById("progSearch");

function autoUpdateURL() {
  if (history.pushState) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?searchString=" +
      search.value;
    window.history.pushState({ path: newurl }, "", newurl);
    console.log(window.location.search);
  }
}

$.ajax({
  url: "/test",
  type: "GET",
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  success: function(response) {
    console.log("success");
  },
  error: function(response) {
    console.log(response);
  }
});
