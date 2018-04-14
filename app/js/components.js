//this could be accomplished a number of simpler ways, such as ES6 web components, React-Redux, Vue.js

//component factory
function createThemeList(ID){
    var newComponent = Object.create(themeList);
    newComponent.componentID = ID;
    return newComponent;
}

//themeList component with a state containing an array of themes, initItems function and a render to DOM function
//would use ES6 const here instead
var themeList = {
    componentID: "",
    target: "",
    state: null,
    initItems: function(target, dataSource) {
        if(target && dataSource) {
            this.target = target;
            this.state = dataSource;
            this.render(target);
            return "success";
        }else{
            return "error";
        }
    },
    remove: function(item) {
        if(item) {
            //get data-id from element passed in from click
            var scope = this;
            $(item).closest("li").addClass("animated flipOutX").delay(700).queue(function(){
                //get item ID to remove from state
                var elementID = $(this).data("id").toString();

                //return new state after filtering out that theme
                scope.state = scope.state.filter(function (theme) {
                    return theme.id !== elementID;
                });

                scope.render();
            });
        }
    },
    render: function(target) {
        target = (target) ? target : this.target;
        console.log("render ", target);
        var scope = this;
        var fiveStar = "";

        //iterate over each json row and build template
        var items = this.state.map(function(val) {
            //if rating is 5 then add class five-star
            fiveStar = (val.rating === "5.0") ? "five-star" : "";

            //would use ES6 template strings or templating library instead here
            return "<li tabindex='3' data-id='" + val.id + "' class='theme-list-block " + fiveStar + "'>" +
                "<a aria-label='go to this theme' href='" + val.url + "'><img class='theme-list-block-image' alt='theme thumbnail' src='" + val.thumbnail + "'></a>" +
                "<section class='theme-list-block-details'>" +
                "<a aria-label='"+val.item+"' href='" + val.url + "'>" + val.item + "</a>" +
                "<label aria-label='rating of "+val.rating+"' class='theme-list-block-rating'>Rating " + val.rating + "</label>" +
                "<label aria-label='remove this theme' data-id='" + val.id + "' class='theme-list-block-remove' onclick='" + scope.componentID + ".remove(this)'>Remove</label>" +
                "</section></li>";
        });

        //could remove jQuery and have component without a dependency
        var animate = ($(target).find("ul").length > 0) ? "" : "animated fadeIn";
        $(target).empty();
        $("<ul/>", {
            "class": "theme-list "+animate,
            html: items.join("")
        }).appendTo(target);
    }
};
