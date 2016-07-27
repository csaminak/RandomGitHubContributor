(function(ns){
    'use strict';
    window.app = ns = (ns || {});


    $('#search').on('submit', function retrieveRepositories(event){
        event.preventDefault();
        var token = $('#api-key').val();
        var searchQuery = $('input[value="Find Contributor"]').val();

        getRepos(token, searchQuery)
            .done(function(data) {
                selectRandomRepo(data);
            })
            .fail(function(xhr){
                console.log(xhr);
            });
    });





    // function getCommits(repo) {
    //     var name = repo.full_name.split('/');
    //     name = name[0];
    //     console.log(name);
    //     return $.ajax({
    //         url: 'https://api.github.com/repos/' + name + '/' + repo.name + '/commits',
    //         method: 'get',
    //         headers: {'Authorization': 'token ' + token},
    //         dataType: 'json'
    //     });
    // }


    /**
     * Takes the data object and finds items which holds the array of repos
     * and then selects a random object/repo within that array to display.
     * @param  {Object}    data   a list of repositories matching the search
     * @return {Promise}          a random individual repo object and it's info
     */
    function selectRandomRepo(data) {
        return new Promise(function(resolve, reject) {
            if(!data || data.items) {
                return reject(new Error('Ajax call did not retrieve repos'));
            }
            var dataList = data.items;
            console.log(dataList);
            var repo = dataList[Math.floor(Math.random() * (dataList.length))];
            console.log(repo);
            resolve(repo);
        });
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
