(function(ns){
    'use strict';
    window.app = ns = (ns || {});

    var token;

    $('#search').on('submit', function retrieveRepositories(event){
        event.preventDefault();
        token = $('#api-key').val();
        var searchQuery = $('input[value="Find Contributor"]').val();

        getRepos(token, searchQuery)
            .done(function(repositories) {
                var repo = selectRandomData(repositories);
                return getCommits(repo);
            })
            .done(function(commits){
                var commit = selectRandomData(commits);
                console.log(commit);
                // return getUser(commit);
            })
            .fail(function(xhr){
                console.log(xhr);
            });
    });


    // function getUser(commit) {
    //
    // }


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
     * Takes the data object and finds items which holds the array of repos
     * and then selects a random object/repo within that array to display.
     * @param  {Object}   data    Object that has a property that holds an array of data
     * @return {Object}   selectedData    a random selected object that holds data
     */
    function selectRandomData(data) {
        var dataList = data.items;
        console.log(dataList);
        var selectedData = dataList[Math.floor(Math.random() * (dataList.length))];
        console.log(selectedData);
        return selectedData;
    }


    /**
     * Takes the token and searchQuery from user and sends a request to GitHub
     * to retrieve all the repositories that match the search.
     * @param  {String}     apiKey           the user's secure apiKey
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
