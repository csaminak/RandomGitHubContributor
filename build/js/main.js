(function(ns){
    'use strict';
    window.app = ns = (ns || {});

    var $contributors = $('#contributors ul');
    var token;

    window.addEventListener('load', function(){
        var name = JSON.parse(localStorage.getItem('contributors')).name;
        var avatar = JSON.parse(localStorage.getItem('contributors')).avatar;
        $('#contributors ul')
            .append('<li><img src="' + avatar +'">\
                        <cite>' + name + '</cite></li>');
    });


    $('#search').on('submit', function findContributor(event){
        event.preventDefault();
        token = $('#api-key').val();
        var searchQuery = $('#query').val();

        getRepos(token, searchQuery)
            .then(function searchRepos(repositories) {
                console.log(repositories);
                var repo = selectRandomRepo(repositories);
                console.log(repo);
                return getCommits(repo);
            })
            .then(function (commits){
                console.log(commits);
                var commit = selectRandomCommit(commits);
                console.log(commit);
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
     * Saves the contributor of every search to localStorage
     * @param  {[type]}     commit      [description]
     * @return {Void}
     */
    function saveContributor(commit){
        var contributors;

        if(!contributors) {
            contributors = {'name': commit.author.login, 'avatar': commit.author.avatar_url};
        }
        localStorage.setItem('contributors', JSON.stringify(contributors));
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
        console.log(name);
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

//# sourceMappingURL=main.js.map