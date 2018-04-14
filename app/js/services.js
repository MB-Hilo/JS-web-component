//service to get list of themes < I would use ES6 fetch if IE support wasn't required
function getPopularThemes() {
    var popularThemesAPI = "http://marketplace.envato.com/api/edge/popular:themeforest.json";

    return $.getJSON(popularThemesAPI);
}