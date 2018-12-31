(global["webpackJsonp"] = global["webpackJsonp"] || []).push([[0],{

/***/ "./home/home-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeRoutingModule", function() { return HomeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/router/index.js");
/* harmony import */ var nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./home/home.component.ts");



var routes = [
    { path: "", component: _home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"] }
];
var HomeRoutingModule = /** @class */ (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__["NativeScriptRouterModule"].forChild(routes)],
            exports: [nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__["NativeScriptRouterModule"]]
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());



/***/ }),

/***/ "./home/home.component.css":
/***/ (function(module, exports) {

module.exports = "#page {\n    background: linear-gradient(to bottom, #eb2328, #252323, #000);\n    color: #fff;\n    font-family: Helvetica, sans-serif;\n}\n\n.logo {\n    margin: 20px 0;\n}\n\n.tab {\n    text-align: center;\n    font-weight: 700;\n    font-size: 19px;\n    background: #000;\n    color: #fff;\n    text-transform: capitalize;\n}\n\n.tab-is-active {\n    background: #fff;\n    color: #000;\n}\n\n\n/* MOVIES TIMELINE */\n.movies-timeline-item {\n    opacity: 1;\n}\n\n.movies-timeline-item-is-watched {\n    opacity: 0.5;\n}\n\n.movies-timeline-movie {\n    padding: 40px;\n    color: #fff\n}\n\n.movies-timeline-movie-is-watched {\n    padding: 40px;\n    color: #444444;\n}\n\n.movies-timeline-total {\n    padding: 40px;\n    color: #444444;\n}\n\n.movies-timeline-title {\n    font-size: 24px;\n    padding: 0 0 15px;\n    margin: 0 0 15px;\n    font-weight: bold;\n    border-bottom-color:#EB2328;\n    border-bottom-width: 2px;\n}\n\n.movies-timeline-button {\n    font-size: 16px;\n    color: #fff;\n    background-color: #EB2328;\n    border-radius: 8px;\n    height: 50px;\n    padding: 0 10px;\n    text-transform: capitalize;\n}\n\n.movies-timeline-total {\n    font-size: 16px;\n    padding: 10px;\n    background-color: #fff;\n    color: #000;\n}\n\n.movies-timeline-desc {\n    font-size: 13px;\n    margin-top: 30px;\n}\n\n\n/* MOVIES WATCH LIST */\n.watch-list-title{\n    font-size: 29px;\n    font-weight: 700;\n}\n.watch-list-subtitle{\n    font-size: 16px;\n    padding: 20px 10px;\n}\n.watch-list-movie{\n    margin: 0 10px 20px;\n}\n\n/* } */"

/***/ }),

/***/ "./home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<ActionBar title=\"Home\" class=\"action-bar\" actionBarHidden=\"true\">\n</ActionBar>\n\n<GridLayout id=\"page\" rows=\"50, *, 50\">\n    <StackLayout row=\"0\" orientation=\"horizontal\" horizontalAlignment=\"center\">\n        <Image height=\"30\" src=\"~/images/marvel-logo.png\" stretch=\"aspectFit\"\n            horizontalAlignment=\"center\" class=\"logo\"></Image>\n    </StackLayout>\n\n    <!-- MOVIES TIMELINE -->\n    <GridLayout row=\"1\" *ngIf=\"tabIndex === 0\" columns=\"*\" rows=\"600,auto\">\n        <StackLayout col=\"0\" row=\"0\">\n            <Pager row=\"1\" col=\"0\" height=\"320\" width=\"100%\"\n                [items]=\"movies\" (selectedIndexChange)=\"onMovieSwipe($event)\"\n                [selectedIndex]=\"selectedIndex\">\n                <ng-template let-item=\"item\" let-i=\"index\">\n                    <GridLayout columns=\"*\" rows=\"320\">\n                        <Image col=\"0\" row=\"0\" height=\"100%\" [src]=\"item.Poster\"\n                            horizontalAlignment=\"center\" [class]=\"item.Watched ? 'is-watched thumb movies-timeline-item': 'thumb movies-timeline-item'\"\n                            stretch=\"aspectFit\"></Image>\n\n                        <Image col=\"0\" row=\"0\" [visibility]=\"item.Watched ? 'visible' : 'collapsed'\"\n                            left=\"70\" top=\"130\" height=\"70\" stretch=\"aspectFit\"\n                            src=\"~/images/tick.png\"></Image>\n                    </GridLayout>\n                </ng-template>\n            </Pager>\n\n            <StackLayout row=\"2\" col=\"0\" [class]=\"selectedMovie.Watched ? 'movies-timeline-movie-is-watched': 'movies-timeline-movie'\">\n                <Label class=\"movies-timeline-title\" [text]=\"selectedMovie.Title\"\n                    textWrap=\"true\"></Label>\n                <FlexboxLayout justifyContent=\"space-between\">\n                    <Label class=\"movies-timeline-total\">\n                        <FormattedString>\n                            <Span text=\"Movie: \"></Span>\n                            <Span [text]=\"+selectedIndex + 1\" fontWeight=\"bold\"></Span>\n                            <Span [text]=\"' of ' + movies.length\"></Span>\n                        </FormattedString>\n                    </Label>\n                    <Button class=\"movies-timeline-button\" (tap)=\"onWatchedButtonTap()\"\n                        [text]=\"selectedMovie.Watched ? 'Add To Watch List' : 'Watched It'\"></Button>\n                </FlexboxLayout>\n                <Label class=\"movies-timeline-desc\" [text]=\"movies[selectedIndex].Plot\"\n                    textWrap=\"true\"></Label>\n            </StackLayout>\n        </StackLayout>\n\n    </GridLayout>\n\n    <!-- MOVIES WATCHLIST -->\n    <ScrollView row=\"1\" *ngIf=\"tabIndex === 1\">\n        <StackLayout class=\"watch-list\">\n            <Label class=\"watch-list-title\" text=\"To watch\"></Label>\n            <Label class=\"watch-list-subtitle\" [text]=\"watchListSubtitle()\"></Label>\n            <FlexboxLayout *ngIf=\"toWatchList.length\" flexWrap=\"wrap\">\n                <StackLayout *ngFor=\"let movie of toWatchList; let index = index\"\n                    width=\"30%\" [key]=\"index\" class=\"watch-list-movie\">\n                    <Image (tap)=\"onWatchListMovieTap(movie.Title)\" [src]=\"movie.Poster\"\n                        height=\"150\" stretch=\"aspectFill\"></Image>\n                </StackLayout>\n            </FlexboxLayout>\n            <StackLayout *ngIf=\"toWatchList.length === 0\">\n                <AbsoluteLayout width=\"290\" verticalAlignment=\"center\"\n                    horizontalAlignment=\"center\">\n                    <Image width=\"290\" src=\"~/images/bye.png\" stretch=\"aspectFit\"></Image>\n                    <Label top=\"320\" left=\"50\">\n                        <FormattedString>\n                            <Span text=\"Marvel will return\" fontWeight=\"bold\"\n                                style=\"font-size: 24px\"></Span>\n                        </FormattedString>\n                    </Label>\n                </AbsoluteLayout>\n            </StackLayout>\n        </StackLayout>\n    </ScrollView>\n\n    <GridLayout row=\"2\" height=\"60\" columns=\"*,*\" rows=\"*\">\n        <Button col=\"0\" row=\"0\" width=\"50%\" text=\"Timeline\" (tap)=\"onTabChange(0)\"\n            [class]=\"tabIndex === 0 ? 'tab-is-active' : 'tab'\"></Button>\n        <Button col=\"1\" row=\"0\" width=\"50%\" text=\"Watch List\" (tap)=\"onTabChange(1)\"\n            [class]=\"tabIndex === 1 ? 'tab-is-active' : 'tab'\"></Button>\n    </GridLayout>\n</GridLayout>"

/***/ }),

/***/ "./home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ui_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/tns-core-modules/ui/page/page.js");
/* harmony import */ var ui_page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ui_page__WEBPACK_IMPORTED_MODULE_1__);


var HomeComponent = /** @class */ (function () {
    function HomeComponent(page) {
        this.page = page;
        this.tabIndex = 0;
        this.toWatchList = new Array();
        this.movies = [
            {
                Title: "Captain America: The First Avenger",
                Plot: "Steve Rogers, a rejected military soldier transforms into Captain America after taking a dose of a \"Super-Soldier serum\". But being Captain America comes at a price as he attempts to take down a war monger and a terrorist organization.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMTYzOTc2NzU3N15BMl5BanBnXkFtZTcwNjY3MDE3NQ@@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Iron Man",
                Plot: "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Iron Man 2",
                Plot: "With the world now aware of his identity as Iron Man, Tony Stark must contend with both his declining health and a vengeful mad man with ties to his father's legacy.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "The Incredible Hulk",
                Plot: "Bruce Banner, a scientist on the run from the U.S. Government, must find a cure for the monster he turns into, whenever he loses his temper.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMTUyNzk3MjA1OF5BMl5BanBnXkFtZTcwMTE1Njg2MQ@@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Thor",
                Plot: "The powerful, but arrogant god Thor, is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders.",
                Poster: "https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "The Avengers",
                Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
                Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Iron Man 3",
                Plot: "When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Thor: The Dark World",
                Plot: "When Dr. Jane Foster gets cursed with a powerful entity known as the Aether, Thor is heralded of the cosmic event known as the Convergence and the genocidal Dark Elves.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMTQyNzAwOTUxOF5BMl5BanBnXkFtZTcwMTE0OTc5OQ@@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Captain America: The Winter Soldier",
                Plot: "As Steve Rogers struggles to embrace his role in the modern world, he teams up with a fellow Avenger and S.H.I.E.L.D agent, Black Widow, to battle a new threat from history: an assassin known as the Winter Soldier.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMzA2NDkwODAwM15BMl5BanBnXkFtZTgwODk5MTgzMTE@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Guardians of the Galaxy",
                Plot: "A group of intergalactic criminals are forced to work together to stop a fanatical warrior from taking control of the universe.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Guardians of the Galaxy Vol. 2",
                Plot: "The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill's true parentage.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Avengers: Age of Ultron",
                Plot: "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Ant-Man",
                Plot: "Armed with a super-suit with the astonishing ability to shrink in scale but increase in strength, cat burglar Scott Lang must embrace his inner hero and help his mentor, Dr. Hank Pym, plan and pull off a heist that will save the world.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Captain America: Civil War",
                Poster: "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
                Plot: "Political involvement in the Avengers' activities causes a rift between Captain America and Iron Man.",
                Watched: false
            },
            {
                Title: "Spider-Man: Homecoming",
                Plot: "Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace prowling the skies of New York City.",
                Poster: "https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Doctor Strange",
                Plot: "While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts.",
                Poster: "https://m.media-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Black Panther",
                Plot: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Thor: Ragnarok",
                Plot: "Thor is imprisoned on the planet Sakaar, and must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Ant-Man and the Wasp",
                Plot: "As Scott Lang balances being both a Super Hero and a father, Hope van Dyne and Dr. Hank Pym present an urgent new mission that finds the Ant-Man fighting alongside The Wasp to uncover secrets from their past.",
                Poster: "https://m.media-amazon.com/images/M/MV5BYjcyYTk0N2YtMzc4ZC00Y2E0LWFkNDgtNjE1MzZmMGE1YjY1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
                Watched: false
            },
            {
                Title: "Avengers: Infinity War",
                Plot: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.",
                Poster: "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg",
                Watched: false
            }
        ];
        this.page.actionBarHidden = true;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.selectedIndex = 0;
        this.selectedMovie = this.movies[this.selectedIndex];
        this.toWatchList = this.movies.filter(function (movie) { return !movie.Watched; });
    };
    HomeComponent.prototype.onMovieSwipe = function (args) {
        this.selectedIndex = args.value;
        this.selectedMovie = this.movies[this.selectedIndex];
    };
    HomeComponent.prototype.onWatchedButtonTap = function () {
        this.selectedMovie.Watched = !this.selectedMovie.Watched;
        this.toWatchList = this.movies.filter(function (movie) { return !movie.Watched; });
    };
    HomeComponent.prototype.watchListSubtitle = function () {
        if (!this.toWatchList.length) {
            return "You watched all the movies!";
        }
        return this.toWatchList.length + " to watch";
    };
    HomeComponent.prototype.onWatchListMovieTap = function (title) {
        console.log("looking for index of movie: " + title);
        var index = this.movies.findIndex(function (movie) { return movie.Title === title; });
        this.tabIndex = 0;
        this.selectedIndex = index;
        console.log("this.selectedIndex = " + this.selectedIndex);
        this.selectedMovie = this.movies[this.selectedIndex];
        console.log("selected movie : " + this.selectedMovie.Title);
    };
    HomeComponent.prototype.onTabChange = function (index) {
        this.tabIndex = index;
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "Home",
            /*duleId: module.i*/
            template: __webpack_require__("./home/home.component.html"),
            styles: [__webpack_require__("./home/home.component.css")]
        }),
        __metadata("design:paramtypes", [ui_page__WEBPACK_IMPORTED_MODULE_1__["Page"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/common.js");
/* harmony import */ var nativescript_angular_common__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_common__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nativescript_ui_sidedrawer_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/nativescript-ui-sidedrawer/angular/side-drawer-directives.js");
/* harmony import */ var nativescript_ui_sidedrawer_angular__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_sidedrawer_angular__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var nativescript_ui_listview_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/nativescript-ui-listview/angular/listview-directives.js");
/* harmony import */ var nativescript_ui_listview_angular__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_listview_angular__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var nativescript_ui_calendar_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("../node_modules/nativescript-ui-calendar/angular/calendar-directives.js");
/* harmony import */ var nativescript_ui_calendar_angular__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_calendar_angular__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var nativescript_ui_chart_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("../node_modules/nativescript-ui-chart/angular/chart-directives.js");
/* harmony import */ var nativescript_ui_chart_angular__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_chart_angular__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var nativescript_ui_dataform_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("../node_modules/nativescript-ui-dataform/angular/dataform-directives.js");
/* harmony import */ var nativescript_ui_dataform_angular__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_dataform_angular__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("../node_modules/nativescript-ui-autocomplete/angular/autocomplete-directives.js");
/* harmony import */ var nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var nativescript_ui_gauge_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("../node_modules/nativescript-ui-gauge/angular/gauges-directives.js");
/* harmony import */ var nativescript_ui_gauge_angular__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(nativescript_ui_gauge_angular__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var nativescript_angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("../node_modules/nativescript-angular/forms/index.js");
/* harmony import */ var nativescript_angular_forms__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_forms__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./home/home-routing.module.ts");
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./home/home.component.ts");
/* harmony import */ var nativescript_pager_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("../node_modules/nativescript-pager/angular/index.js");
/* harmony import */ var nativescript_pager_angular__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(nativescript_pager_angular__WEBPACK_IMPORTED_MODULE_12__);













var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                nativescript_ui_sidedrawer_angular__WEBPACK_IMPORTED_MODULE_2__["NativeScriptUISideDrawerModule"],
                nativescript_ui_listview_angular__WEBPACK_IMPORTED_MODULE_3__["NativeScriptUIListViewModule"],
                nativescript_ui_calendar_angular__WEBPACK_IMPORTED_MODULE_4__["NativeScriptUICalendarModule"],
                nativescript_ui_chart_angular__WEBPACK_IMPORTED_MODULE_5__["NativeScriptUIChartModule"],
                nativescript_ui_dataform_angular__WEBPACK_IMPORTED_MODULE_6__["NativeScriptUIDataFormModule"],
                nativescript_ui_autocomplete_angular__WEBPACK_IMPORTED_MODULE_7__["NativeScriptUIAutoCompleteTextViewModule"],
                nativescript_ui_gauge_angular__WEBPACK_IMPORTED_MODULE_8__["NativeScriptUIGaugeModule"],
                nativescript_angular_common__WEBPACK_IMPORTED_MODULE_1__["NativeScriptCommonModule"],
                _home_routing_module__WEBPACK_IMPORTED_MODULE_10__["HomeRoutingModule"],
                nativescript_angular_forms__WEBPACK_IMPORTED_MODULE_9__["NativeScriptFormsModule"],
                nativescript_pager_angular__WEBPACK_IMPORTED_MODULE_12__["PagerModule"]
            ],
            declarations: [
                _home_component__WEBPACK_IMPORTED_MODULE_11__["HomeComponent"]
            ],
            schemas: [
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["NO_ERRORS_SCHEMA"]
            ]
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ })

}]);