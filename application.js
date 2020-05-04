getApplications();
function getApplications() {
  const uri = "https://marketplace.atlassian.com/rest/2/applications/";
  let req = new Request(uri, {
    method: "GET"
  });

  fetch(req)
    .then(response => {
      if (response.ok) {
        return response.json();
        //return response
      } else {
        console.log(`Response: ${response.status} ${response.statusText}`);
      }
    })
    .then(jsonData => {
      applicationObjects = jsonData._embedded;
      console.log("applicationObjects: ", applicationObjects);

      var myTemplate = $.templates("#applicationTmpl");
      var html = myTemplate.render(applicationObjects);
      $("#applicationList").html(html);
    });
}