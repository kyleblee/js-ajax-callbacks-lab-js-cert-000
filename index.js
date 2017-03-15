function handlebarsSetup() {
  //put any handlebars setup in here
  Handlebars.registerPartial("userDetails", $("#user-details-partial").html())
}

$(document).ready(function (){
  handlebarsSetup()
});

var rootURL = "https://api.github.com";

function searchRepositories() {
  var searchTerms = document.getElementById('searchTerms').value.split(' ').join('_');
  var uri = rootURL + "/search/repositories?q=" + searchTerms;
  $.get(uri, function(data){
    var repositoriesTemplate = Handlebars.compile(document.getElementById('repositories-template').innerHTML);
    var repoList = repositoriesTemplate(data);
    document.getElementById('results').innerHTML = repoList;
  }).fail(displayError);
}

function displayError() {
  var errorMessage = "<p>I'm sorry, there's been an error. Please try again.</p>";
  document.getElementById('errors').innerHTML = errorMessage;
}

function showCommits(repo) {
  var owner = repo.dataset.owner;
  var repo = repo.dataset.repo;
  var uri = rootURL + `/repos/${owner}/${repo}/commits`;
  $.get(uri, function(commits){
    var commitsTemplate = Handlebars.compile(document.getElementById('commits-template').innerHTML);
    var commitsList = commitsTemplate(commits);
    document.getElementById('details').innerHTML = commitsList;
  }).fail(displayError);
}

//it all works, just need to fix the timeout error (ask a Learn expert) and then rename things so they pass the
//Learn tests. Then we'll be all done!
