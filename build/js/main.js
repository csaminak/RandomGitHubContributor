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

        findContributors(token, searchQuery)
            .done(function(data){
                console.log(data);
            })
            .fail(function(xhr){
                console.log(xhr);
            });
    });



    // function selectRandomData(data) {
    //     return Math.ceil(Math.random() * (data.length - 1));
    // }

    /**
     * Takes the token and searchQuery from user and send a request to GitHub
     * to retrieve all the repositories that match the search.
     * @param  {String}     token           the user's secure apiKey
     * @param  {String}     searchQuery     the repository search term(s)
     * @return {jQuery xhr Object}          the promises returned
     */
    function findContributors(token, searchQuery){
        return $.ajax({
            url: 'https://api.github.com/search/repositories?q=' + searchQuery,
            mehtod: 'get',
            headers: {'Authorization': 'token ' + token},
            dataType: 'json'
        });
    }





})(window.app);

//# sourceMappingURL=main.js.map