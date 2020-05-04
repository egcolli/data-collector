// https://www.jsviews.com/
// https://underscorejs.org/

$.getScript("https://underscorejs.org/underscore-min.js", function() {});

var appKeys = ["jira", "confluence", "bitbucket", "bamboo", "fecru", "crowd"];

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
const confluenceAddons = [
  "com.onresolve.confluence.groovy.groovyrunner", // scriptrunner for confluence
  "com.atlassian.confluence.extra.team-calendars", // team calendars for confluence
  "com.riadalabs.confluence.plugins.insight-confluence", // insight for confluence
  "com.atlassian.confluence.plugins.confluence-questions", // questions for coonfluence
  "com.atlassian.troubleshooting.plugin-confluence", // Troubleshooting and Support - Confluence
];
/******************************************************************************************** */
/******************************************************************************************** */
let confAddonResults = []
let addonResults2 = []

confluenceAddons.forEach(addon =>{
  //getAddonInfo3(addon)
  addonResults2.push(getAddonInfo3(addon))
})
console.log("addonResults2", addonResults2)
const entries = Object.entries(addonResults2)
console.log(entries)
function getAddonInfo3(addonKey){
  const uri = "https://marketplace.atlassian.com/rest/2/addons/" + addonKey;
  getData(uri).then(data => {
    console.log(data)
  })
}


    var myTemplate = $.templates("#addonTmpl2");
    var html = myTemplate.render(confAddonResults);
    $("#addonList2").html(html);

/******************************************************************************************** */


let addonResults = [];

confluenceAddons.forEach(addon => {
  let g = getAddonInfo(addon);
  addonResults.push(g);
});

addonResults.forEach(addonResult => {
  //console.log("addonResult", addonResult)
  //console.table("results: ", results)  
})

//console.table(addonResults)
//console.log("addonResults: ", addonResults);

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

getData("https://marketplace.atlassian.com/rest/2/applications/jira").then(
  data => {
    //console.log("getData: ", "bananas")
    //console.log(data)
  }
);

async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

function arrayFromArgs() {
  var results = [];
  for (var i = 0; i < arguments.length; i++) {
    results.push(arguments[i]);
  }
  return results;
}
var fruits = arrayFromArgs("Apple", "Orange", "Banana");
//console.log(fruits);
