(function(ns){
    'use strict';
    window.app = ns = (ns || {});

    var token;

    $('#search').on('submit', function retrieveRepositories(event){
        event.preventDefault();
        if (!token) {
            token = $('#api-key').val();
        }
        localStorage.setItem('token', token);

        var searchQuery = $('input[value="Find Contributor"]').val();

        findContributor(token, searchQuery)
            .done(selectRandomData)
            .fail(function(xhr){
                console.log(xhr);
            });
    });


    /**
     * Takes the data object and searches the array in that data to select
     * a random Object within that array to display.
     * @param  {Object}    data    a list of repositories matching the search
     * @return {Object}            a random individual repository and it's info
     */
    function selectRandomData(data) {
        var dataList = data.items;
        console.log(dataList);
        var i = Math.ceil(Math.random() * (dataList.length - 1));
        console.log(dataList[i]);
        return dataList[i];
    }


    /**
     * Takes the token and searchQuery from user and send a request to GitHub
     * to retrieve all the repositories that match the search.
     * @param  {String}     token           the user's secure apiKey
     * @param  {String}     searchQuery     the repository search term(s)
     * @return {jQuery xhr Object}          the promises returned
     */
    function findContributor(token, searchQuery){
        return $.ajax({
            url: 'https://api.github.com/search/repositories?q=' + searchQuery,
            mehtod: 'get',
            headers: {'Authorization': 'token ' + token},
            dataType: 'json'
        });
    }





})(window.app);
