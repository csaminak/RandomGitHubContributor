(function(ns){
    'use strict';
    window.app = ns = (ns || {});

    var $contributors = $('#contributors ul');
    var token;
    var contributorsList = [];


    /**
     * Loads the previous contributors that are stored in local storage.
     * @param {String}          'load'    the event when page loads
     * @param {Event Handler}   function  loads the previous contributors
     */
    window.addEventListener('load', function loadPreviousContributors(){
        if (!contributorsList) {
            return;
        }
        contributorsList = JSON.parse(localStorage.getItem('contributors'));
        contributorsList.forEach(function(contributor) {
            $contributors
                .append('<li><img src="' + contributor.avatar +'">\
                            <cite>' + contributor.name + '</cite></li>');
        });
    });


    /**
     * When user submits a search query they will get a contributor that
     * committed to a repository with a name that matches their search query.
     * @param  {String}   'submit'    Event in which 'form' is submitted
     * @return {void}
     */
    $('#search').on('submit', function findContributor(event){
        event.preventDefault();
        token = $('#api-key').val();
        var searchQuery = $('#query').val();

        getRepos(token, searchQuery)
            .then(function searchRepos(repositories) {
                var repo = selectRandomRepo(repositories);
                return getCommits(repo);
            })
            .then(function (commits){
                var commit = selectRandomCommit(commits);
                displayUser(commit);
                saveContributor(commit);
            })
            .fail(function(xhr){
                console.log(xhr);
            });

    });



    /**
     * takes the information from the commit to display the user.
     * @param  {Object}    commit      object with info about commit
     * @return {Void}
     */
    function displayUser(commit) {
        $contributors
            .append('<li><img src="' + commit.author.avatar_url +'">\
                        <cite>' + commit.author.login + '</cite></li>');
    }


    /**
     * Saves the contributor of every search to localStorage including their avatar.
     * @param  {Object}     commit      information about commit including author
     * @return {Void}
     */
    function saveContributor(commit) {
        var contributors = {'name': commit.author.login, 'avatar': commit.author.avatar_url};
        contributorsList.push(contributors);
        localStorage.setItem('contributors', JSON.stringify(contributorsList));
    }

    /**
     * Takes the array of commits and selects a random commit
     * @param  {Array}     commitsArray     Holds all the commits for a repo
     * @return {Object}                     An individual commit
     */
    function selectRandomCommit(commitsArray) {
        return commitsArray[Math.floor(Math.random() * (commitsArray.length))];
    }


    /**
     * Gets all the commits for the selected repo.
     * @param  {String}     repo    selected repo to look into
     * @return {Object}             An object that hold a list of commits for user
     */
    function getCommits(repo) {
        var name = repo.full_name.split('/');
        name = name[0];
        return $.ajax({
            url: 'https://api.github.com/repos/' + name + '/' + repo.name + '/commits',
            method: 'get',
            headers: {'Authorization': 'token ' + token},
            dataType: 'json'
        });
    }


    /**
     * Takes the repositories object and finds the items property, which holds
     * the array of repos and then selects a random object/repo within
     * that array to return.
     * @param  {Object}   repositories    Object that holds an array of repos
     * @return {Object}   repo            a randomly selected repo
     */
    function selectRandomRepo(repositories) {
        var reposList = repositories.items;
        var repo = reposList[Math.floor(Math.random() * (reposList.length))];
        return repo;
    }


    /**
     * Takes the token and searchQuery from user and sends a request to GitHub
     * to retrieve all the repositories that match the search.
     * @param  {String}     apiKey          the user's secure apiKey
     * @param  {String}     searchQuery     the repository search term(s)
     * @return {jQuery xhr Object}          holds promises that can be implemented
     */
    function getRepos(apiKey, searchQuery){
        return $.ajax({
            url: 'https://api.github.com/search/repositories?q=' + searchQuery,
            mehtod: 'get',
            headers: {'Authorization': 'token ' + apiKey},
            dataType: 'json'
        });
    }





})(window.app);
