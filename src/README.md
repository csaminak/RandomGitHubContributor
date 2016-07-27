Learning Objectives

Let's get some practice using Promises and localStorage by writing a couple Ajax calls in succession to find a random GitHub contributor and then save that data locally for later. By the end of this assignment you should be able to chain multiple Ajax calls together that use promises and save and recall data from localStorage.

Your Mission

Use the GitHub API to search GitHub repositories, select a random repo from the results, then make a second Ajax call to find commits to that repo. Within those results you should select a random commit and grab the author, showing the username and avatar URL in the page (inside the #contributors ul element).

You are given the HTML for this assignment, users of your system should provide you their GitHub personal access token and a search query. (You can change the HTML if you wish, but this is not necessary, and is not required to complete the assignment.)

Make an Ajax call to: https://api.github.com/search/repositories?q=... using jQuery
Don't forget your access token in an Authorization header with a value of "token 3bc72c4..."
jQuery returns a Promise, and you must use that promise to get the results of the Ajax call
Select a random repo from the results
Make a second jQuery Ajax call for the commits in that repo: https://api.github.com/repos/:username/:reponame/commits
Use the returned Promise to get the results of the Ajax call
You must use Promise chaining!
Select a random commit from the results
Add that user (the author of the commit) to the page along with their avatar image
Also add that user to the localStorage
On page load, add the previously found contributors (a.k.a. users/authors) to the page
(Before the user even submits the form)
