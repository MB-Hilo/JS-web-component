//When document is ready get themes then initialize list and render the view
var someThemesList = {};

$(document).ready(function() {
    someThemesList = createThemeList("someThemesList");

    getPopularThemes().done(function(data) {
        data = data.popular.items_last_week;

        // sort by value, highest to lowest
        data.sort(function(a, b) {
            return b.rating - a.rating;
        });

        //initialize the themeList
        someThemesList.initItems("#theme-list", data);
    });
});