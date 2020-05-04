/*************************************** 
// Notes and Links
// https://www.jsviews.com/
/*************************************** */

/************************** */
// Setting Key Arrays
/************************** */
var appKeys = ["jira", "confluence", "bitbucket", "bamboo", "fecru", "crowd"];

var confluenceAddons = [
  "com.onresolve.confluence.groovy.groovyrunner", // scriptrunner for confluence
  "com.atlassian.confluence.extra.team-calendars", // team calendars for confluence
  "com.riadalabs.confluence.plugins.insight-confluence", // insight for confluence
  "com.atlassian.confluence.plugins.confluence-questions", // questions for coonfluence
  "com.atlassian.troubleshooting.plugin-confluence" // Troubleshooting and Support - Confluence
];

var jiraAddons = [];

var bitbucketAddons = [];

/************************** */
// getApplications()
// gets basic app data. Need to expand to get version information
/************************** */
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

/******************************************************************************************** */
/******************************************************************************************** */
/******************************************************************************************** */
let confAddonResults = [];
let addonResults2 = [];
var spacer = "/****************************************/";
confluenceAddons.forEach(addonKey => {
  //getAddonInfo3(addonKey)
});

var myResults = new Object();
var obj = new Object();
var element = new Object(),
  cart = [];

function getAddonInfo3(addonKey) {
  const uri = "https://marketplace.atlassian.com/rest/2/addons/" + addonKey;
  getData(uri).then(data => {
    element.name = data.name;
    myResults = data.name;
    //cart.push(element)
  });
}

getAddonInfo4(confluenceAddons);

let myResultsArray = [];

function getAddonInfo4(addonKeys) {
  addonKeys.forEach(addonKey => {
    const uri = "https://marketplace.atlassian.com/rest/2/addons/" + addonKey;
    getData(uri).then(data => {
      element.name = data.name;

      element.key = data.key;
      element.summary = data.summary;
      element.lastModified = data.lastModified;
      element.tagline = data.tagline;
      //element.logo = data._embedded.logo._links.highRes.href
      element.downloads = data._embedded.distribution.downloads;
      element.totalUsers = data._embedded.distribution.totalUsers;
      element.supportTicketSystem = data.vendorLinks.supportTicketSystem;

      for (let [key, value] of Object.entries(element)) {
        //console.log(`${key}: ${value}`);
      }

      myResultsArray.push(JSON.stringify(element));
    });
  });
}

console.log("myResultsArray", myResultsArray);

console.table("cart", cart);
console.log("element", element);

console.log(spacer);

for (let [key, value] of Object.entries(element)) {
  console.log(`${key}: ${value}`);
}

console.log(spacer);

app = {
  cart: cart
};

var myTemplate = $.templates("#addonTmpl2");
var html = myTemplate.render(myResultsArray);
$("#addonList2").html(html);

/******************************************************************************************** */

let addonResults = [];

confluenceAddons.forEach(addon => {
  let g = getAddonInfo(addon);
  addonResults.push(g);
  return g;
});

var myTemplate = $.templates("#addonTmpl2");
var html = myTemplate.render(addonResults);
$("#addonList2").html(html);

function getAddonInfo2(addonKeys) {
  //console.log("addonKeys: ", addonKeys);
  var results = [];

  addonKeys.forEach(addonKey => {
    console.log("addonKey", addonKey);
    const url = "".concat(
      "https://marketplace.atlassian.com/rest/2/addons/",
      addonKey
    );
    console.log("addonKey URL: ", url);
    results.push(url);
    fetch(url).then(jsonData => {
      results.push(jsonData);
    });
  });
  console.log("results", results);
  /*
  for (var i = 0; i < arguments.length; i++) {
    const url = ''.concat("https://marketplace.atlassian.com/rest/2/addons/", arguments[i])
//    const response = await fetch(url);
//    console.log(response.json());

    console.log("forloop: ",arguments[i])
    results.push(arguments[i]);
  }
  */
  return results;
}

/******************************************************************************************** */
function getAddonInfo(addonKey) {
  const uri = "https://marketplace.atlassian.com/rest/2/addons/" + addonKey;
  var getDataResults = []; //
  getData(uri).then(data => {
    //console.log(data);
    var myTemplate = $.templates("#addonTmpl");
    var html = myTemplate.render(data);
    $("#addonList").html(html);
    getDataResults.push(data); //
    return data;
  });
  //console.log(getDataResults)
  return getDataResults; //
}

getApplicationVersions("jira");

function getApplicationVersions(applicationKey) {
  const uri =
    "https://marketplace.atlassian.com/rest/2/applications/" +
    applicationKey +
    "/versions/latest";
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
      let applicationVersionObjects = jsonData;
      //json = Object.assign({}, myArray);
    });
}

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}
