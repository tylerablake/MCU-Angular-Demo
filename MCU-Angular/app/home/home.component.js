"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
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
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html",
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUVsRCxnQ0FBK0I7QUFRL0I7SUFrSUksdUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBakk5QixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBSWIsZ0JBQVcsR0FBaUIsSUFBSSxLQUFLLEVBQVMsQ0FBQztRQUMvQyxXQUFNLEdBQWlCO1lBQ25CO2dCQUNJLEtBQUssRUFBRSxvQ0FBb0M7Z0JBQzNDLElBQUksRUFBRSwrT0FBK087Z0JBQ3JQLE1BQU0sRUFBRSxvR0FBb0c7Z0JBQzVHLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLElBQUksRUFBRSxzSUFBc0k7Z0JBQzVJLE1BQU0sRUFBRSxvR0FBb0c7Z0JBQzVHLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLElBQUksRUFBRSx1S0FBdUs7Z0JBQzdLLE1BQU0sRUFBRSxvR0FBb0c7Z0JBQzVHLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLHFCQUFxQjtnQkFDNUIsSUFBSSxFQUFFLDhJQUE4STtnQkFDcEosTUFBTSxFQUFFLG9HQUFvRztnQkFDNUcsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsTUFBTTtnQkFDYixJQUFJLEVBQUUsNEpBQTRKO2dCQUNsSyxNQUFNLEVBQUUsb0lBQW9JO2dCQUM1SSxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxjQUFjO2dCQUNyQixJQUFJLEVBQUUscUtBQXFLO2dCQUMzSyxNQUFNLEVBQUUsb0lBQW9JO2dCQUM1SSxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNEO2dCQUNJLEtBQUss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QUFDLGFBQWEsQ0FBQyxLQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLEtBQUs7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBektRLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ3RDLENBQUM7eUNBbUk0QixXQUFJO09BbElyQixhQUFhLENBMEt6QjtJQUFELG9CQUFDO0NBQUEsQUExS0QsSUEwS0M7QUExS1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNb3ZpZSB9IGZyb20gXCIuLi9kYXRhL21vdmllXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiSG9tZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbJy4vaG9tZS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdGFiSW5kZXggPSAwO1xuICAgIHNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgICBzZWxlY3RlZE1vdmllOiBNb3ZpZTtcbiAgICBzZWxlY3RlZE1vdmllSW5kZXg6IDA7XG4gICAgdG9XYXRjaExpc3Q6IEFycmF5PE1vdmllPiA9IG5ldyBBcnJheTxNb3ZpZT4oKTtcbiAgICBtb3ZpZXM6IEFycmF5PE1vdmllPiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgVGl0bGU6IFwiQ2FwdGFpbiBBbWVyaWNhOiBUaGUgRmlyc3QgQXZlbmdlclwiLFxuICAgICAgICAgICAgUGxvdDogXCJTdGV2ZSBSb2dlcnMsIGEgcmVqZWN0ZWQgbWlsaXRhcnkgc29sZGllciB0cmFuc2Zvcm1zIGludG8gQ2FwdGFpbiBBbWVyaWNhIGFmdGVyIHRha2luZyBhIGRvc2Ugb2YgYSBcXFwiU3VwZXItU29sZGllciBzZXJ1bVxcXCIuIEJ1dCBiZWluZyBDYXB0YWluIEFtZXJpY2EgY29tZXMgYXQgYSBwcmljZSBhcyBoZSBhdHRlbXB0cyB0byB0YWtlIGRvd24gYSB3YXIgbW9uZ2VyIGFuZCBhIHRlcnJvcmlzdCBvcmdhbml6YXRpb24uXCIsXG4gICAgICAgICAgICBQb3N0ZXI6IFwiaHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL00vTVY1Qk1UWXpPVGMyTnpVM04xNUJNbDVCYW5CblhrRnRaVGN3TmpZM01ERTNOUUBALl9WMV9TWDMwMC5qcGdcIixcbiAgICAgICAgICAgIFdhdGNoZWQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFRpdGxlOiBcIklyb24gTWFuXCIsXG4gICAgICAgICAgICBQbG90OiBcIkFmdGVyIGJlaW5nIGhlbGQgY2FwdGl2ZSBpbiBhbiBBZmdoYW4gY2F2ZSwgYmlsbGlvbmFpcmUgZW5naW5lZXIgVG9ueSBTdGFyayBjcmVhdGVzIGEgdW5pcXVlIHdlYXBvbml6ZWQgc3VpdCBvZiBhcm1vciB0byBmaWdodCBldmlsLlwiLFxuICAgICAgICAgICAgUG9zdGVyOiBcImh0dHBzOi8vbS5tZWRpYS1hbWF6b24uY29tL2ltYWdlcy9NL01WNUJNVGN6TlRJMk9EVXdPRjVCTWw1QmFuQm5Ya0Z0WlRjd01UVTBOVEl6TXdAQC5fVjFfU1gzMDAuanBnXCIsXG4gICAgICAgICAgICBXYXRjaGVkOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBUaXRsZTogXCJJcm9uIE1hbiAyXCIsXG4gICAgICAgICAgICBQbG90OiBcIldpdGggdGhlIHdvcmxkIG5vdyBhd2FyZSBvZiBoaXMgaWRlbnRpdHkgYXMgSXJvbiBNYW4sIFRvbnkgU3RhcmsgbXVzdCBjb250ZW5kIHdpdGggYm90aCBoaXMgZGVjbGluaW5nIGhlYWx0aCBhbmQgYSB2ZW5nZWZ1bCBtYWQgbWFuIHdpdGggdGllcyB0byBoaXMgZmF0aGVyJ3MgbGVnYWN5LlwiLFxuICAgICAgICAgICAgUG9zdGVyOiBcImh0dHBzOi8vbS5tZWRpYS1hbWF6b24uY29tL2ltYWdlcy9NL01WNUJNVE0wTURnd05qTXlNbDVCTWw1QmFuQm5Ya0Z0WlRjd05UZzNOekF6TXdAQC5fVjFfU1gzMDAuanBnXCIsXG4gICAgICAgICAgICBXYXRjaGVkOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBUaXRsZTogXCJUaGUgSW5jcmVkaWJsZSBIdWxrXCIsXG4gICAgICAgICAgICBQbG90OiBcIkJydWNlIEJhbm5lciwgYSBzY2llbnRpc3Qgb24gdGhlIHJ1biBmcm9tIHRoZSBVLlMuIEdvdmVybm1lbnQsIG11c3QgZmluZCBhIGN1cmUgZm9yIHRoZSBtb25zdGVyIGhlIHR1cm5zIGludG8sIHdoZW5ldmVyIGhlIGxvc2VzIGhpcyB0ZW1wZXIuXCIsXG4gICAgICAgICAgICBQb3N0ZXI6IFwiaHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL00vTVY1Qk1UVXlOemszTWpBMU9GNUJNbDVCYW5CblhrRnRaVGN3TVRFMU5qZzJNUUBALl9WMV9TWDMwMC5qcGdcIixcbiAgICAgICAgICAgIFdhdGNoZWQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFRpdGxlOiBcIlRob3JcIixcbiAgICAgICAgICAgIFBsb3Q6IFwiVGhlIHBvd2VyZnVsLCBidXQgYXJyb2dhbnQgZ29kIFRob3IsIGlzIGNhc3Qgb3V0IG9mIEFzZ2FyZCB0byBsaXZlIGFtb25nc3QgaHVtYW5zIGluIE1pZGdhcmQgKEVhcnRoKSwgd2hlcmUgaGUgc29vbiBiZWNvbWVzIG9uZSBvZiB0aGVpciBmaW5lc3QgZGVmZW5kZXJzLlwiLFxuICAgICAgICAgICAgUG9zdGVyOiBcImh0dHBzOi8vbS5tZWRpYS1hbWF6b24uY29tL2ltYWdlcy9NL01WNUJPR0U0TnpVMVlUQXROekEzTWkwMFpUQTJMVGcyWW1ZdE1ESm1NVGhpTWpsa1lqZzJYa0V5WGtGcWNHZGVRWFZ5TlRnek1ETXpNVGdALl9WMV9TWDMwMC5qcGdcIixcbiAgICAgICAgICAgIFdhdGNoZWQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFRpdGxlOiBcIlRoZSBBdmVuZ2Vyc1wiLFxuICAgICAgICAgICAgUGxvdDogXCJFYXJ0aCdzIG1pZ2h0aWVzdCBoZXJvZXMgbXVzdCBjb21lIHRvZ2V0aGVyIGFuZCBsZWFybiB0byBmaWdodCBhcyBhIHRlYW0gaWYgdGhleSBhcmUgZ29pbmcgdG8gc3RvcCB0aGUgbWlzY2hpZXZvdXMgTG9raSBhbmQgaGlzIGFsaWVuIGFybXkgZnJvbSBlbnNsYXZpbmcgaHVtYW5pdHkuXCIsXG4gICAgICAgICAgICBQb3N0ZXI6IFwiaHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL00vTVY1Qk5EWXhOalF5TWpBdE5UZGlPUzAwTkdZd0xXRm1OVEF0TlRobVlqVTVaR0kyWVRJMVhrRXlYa0ZxY0dkZVFYVnlNVE14T0RrMk9UVUAuX1YxX1NYMzAwLmpwZ1wiLFxuICAgICAgICAgICAgV2F0Y2hlZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgVGl0bGU6IFwiSXJvbiBNYW4gM1wiLFxuICAgICAgICAgICAgUGxvdDogXCJXaGVuIFRvbnkgU3RhcmsncyB3b3JsZCBpcyB0b3JuIGFwYXJ0IGJ5IGEgZm9ybWlkYWJsZSB0ZXJyb3Jpc3QgY2FsbGVkIHRoZSBNYW5kYXJpbiwgaGUgc3RhcnRzIGFuIG9keXNzZXkgb2YgcmVidWlsZGluZyBhbmQgcmV0cmlidXRpb24uXCIsXG4gICAgICAgICAgICBQb3N0ZXI6IFwiaHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL00vTVY1Qk1qRTVNemN5TmprMU0xNUJNbDVCYW5CblhrRnRaVGN3TWpRNE1qY3hPUUBALl9WMV9TWDMwMC5qcGdcIixcbiAgICAgICAgICAgIFdhdGNoZWQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFRpdGxlOiBcIlRob3I6IFRoZSBEYXJrIFdvcmxkXCIsXG4gICAgICAgICAgICBQbG90OiBcIldoZW4gRHIuIEphbmUgRm9zdGVyIGdldHMgY3Vyc2VkIHdpdGggYSBwb3dlcmZ1bCBlbnRpdHkga25vd24gYXMgdGhlIEFldGhlciwgVGhvciBpcyBoZXJhbGRlZCBvZiB0aGUgY29zbWljIGV2ZW50IGtub3duIGFzIHRoZSBDb252ZXJnZW5jZSBhbmQgdGhlIGdlbm9jaWRhbCBEYXJrIEVsdmVzLlwiLFxuICAgICAgICAgICAgUG9zdGVyOiBcImh0dHBzOi8vbS5tZWRpYS1hbWF6b24uY29tL2ltYWdlcy9NL01WNUJNVFF5TnpBd09UVXhPRjVCTWw1QmFuQm5Ya0Z0WlRjd01URTBPVGM1T1FAQC5fVjFfU1gzMDAuanBnXCIsXG4gICAgICAgICAgICBXYXRjaGVkOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBUaXRsZTogXCJDYXB0YWluIEFtZXJpY2E6IFRoZSBXaW50ZXIgU29sZGllclwiLFxuICAgICAgICAgICAgUGxvdDogXCJBcyBTdGV2ZSBSb2dlcnMgc3RydWdnbGVzIHRvIGVtYnJhY2UgaGlzIHJvbGUgaW4gdGhlIG1vZGVybiB3b3JsZCwgaGUgdGVhbXMgdXAgd2l0aCBhIGZlbGxvdyBBdmVuZ2VyIGFuZCBTLkguSS5FLkwuRCBhZ2VudCwgQmxhY2sgV2lkb3csIHRvIGJhdHRsZSBhIG5ldyB0aHJlYXQgZnJvbSBoaXN0b3J5OiBhbiBhc3Nhc3NpbiBrbm93biBhcyB0aGUgV2ludGVyIFNvbGRpZXIuXCIsXG4gICAgICAgICAgICBQb3N0ZXI6IFwiaHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL00vTVY1Qk16QTJORGt3T0RBd00xNUJNbDVCYW5CblhrRnRaVGd3T0RrNU1UZ3pNVEVALl9WMV9TWDMwMC5qcGdcIixcbiAgICAgICAgICAgIFdhdGNoZWQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFRpdGxlOiBcIkd1YXJkaWFucyBvZiB0aGUgR2FsYXh5XCIsXG4gICAgICAgICAgICBQbG90OiBcIkEgZ3JvdXAgb2YgaW50ZXJnYWxhY3RpYyBjcmltaW5hbHMgYXJlIGZvcmNlZCB0byB3b3JrIHRvZ2V0aGVyIHRvIHN0b3AgYSBmYW5hdGljYWwgd2FycmlvciBmcm9tIHRha2luZyBjb250cm9sIG9mIHRoZSB1bml2ZXJzZS5cIixcbiAgICAgICAgICAgIFBvc3RlcjogXCJodHRwczovL20ubWVkaWEtYW1hem9uLmNvbS9pbWFnZXMvTS9NVjVCTVRBd01qVTVPVGd4TmpaZVFUSmVRV3B3WjE1QmJXVTRNRFV4TkRZeE9ERXguX1YxX1NYMzAwLmpwZ1wiLFxuICAgICAgICAgICAgV2F0Y2hlZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgVGl0bGU6IFwiR3VhcmRpYW5zIG9mIHRoZSBHYWxheHkgVm9sLiAyXCIsXG4gICAgICAgICAgICBQbG90OiBcIlRoZSBHdWFyZGlhbnMgbXVzdCBmaWdodCB0byBrZWVwIHRoZWlyIG5ld2ZvdW5kIGZhbWlseSB0b2dldGhlciBhcyB0aGV5IHVucmF2ZWwgdGhlIG15c3Rlcnkgb2YgUGV0ZXIgUXVpbGwncyB0cnVlIHBhcmVudGFnZS5cIixcbiAgICAgICAgICAgIFBvc3RlcjogXCJodHRwczovL20ubWVkaWEtYW1hem9uLmNvbS9pbWFnZXMvTS9NVjVCTVRnMk16STFNVGczT0Y1Qk1sNUJhbkJuWGtGdFpUZ3dOVFUzTkRBMk1USUAuX1YxX1NYMzAwLmpwZ1wiLFxuICAgICAgICAgICAgV2F0Y2hlZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgVGl0bGU6IFwiQXZlbmdlcnM6IEFnZSBvZiBVbHRyb25cIixcbiAgICAgICAgICAgIFBsb3Q6IFwiV2hlbiBUb255IFN0YXJrIGFuZCBCcnVjZSBCYW5uZXIgdHJ5IHRvIGp1bXAtc3RhcnQgYSBkb3JtYW50IHBlYWNla2VlcGluZyBwcm9ncmFtIGNhbGxlZCBVbHRyb24sIHRoaW5ncyBnbyBob3JyaWJseSB3cm9uZyBhbmQgaXQncyB1cCB0byBFYXJ0aCdzIG1pZ2h0aWVzdCBoZXJvZXMgdG8gc3RvcCB0aGUgdmlsbGFpbm91cyBVbHRyb24gZnJvbSBlbmFjdGluZyBoaXMgdGVycmlibGUgcGxhbi5cIixcbiAgICAgICAgICAgIFBvc3RlcjogXCJodHRwczovL20ubWVkaWEtYW1hem9uLmNvbS9pbWFnZXMvTS9NVjVCTVRNNE9HSm1OV010T1RNNE5pMDBOVEUzTFRnM01ESXRabVF4WWpjNE4ySmhObVV4WGtFeVhrRnFjR2RlUVhWeU5UZ3pNRE16TVRnQC5fVjFfU1gzMDAuanBnXCIsXG4gICAgICAgICAgICBXYXRjaGVkOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBUaXRsZTogXCJBbnQtTWFuXCIsXG4gICAgICAgICAgICBQbG90OiBcIkFybWVkIHdpdGggYSBzdXBlci1zdWl0IHdpdGggdGhlIGFzdG9uaXNoaW5nIGFiaWxpdHkgdG8gc2hyaW5rIGluIHNjYWxlIGJ1dCBpbmNyZWFzZSBpbiBzdHJlbmd0aCwgY2F0IGJ1cmdsYXIgU2NvdHQgTGFuZyBtdXN0IGVtYnJhY2UgaGlzIGlubmVyIGhlcm8gYW5kIGhlbHAgaGlzIG1lbnRvciwgRHIuIEhhbmsgUHltLCBwbGFuIGFuZCBwdWxsIG9mZiBhIGhlaXN0IHRoYXQgd2lsbCBzYXZlIHRoZSB3b3JsZC5cIixcbiAgICAgICAgICAgIFBvc3RlcjogXCJodHRwczovL20ubWVkaWEtYW1hem9uLmNvbS9pbWFnZXMvTS9NVjVCTWpNMk5UUTVNemMyTTE1Qk1sNUJhbkJuWGtGdFpUZ3dOVGN4TURJMk5URUAuX1YxX1NYMzAwLmpwZ1wiLFxuICAgICAgICAgICAgV2F0Y2hlZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgVGl0bGU6IFwiQ2FwdGFpbiBBbWVyaWNhOiBDaXZpbCBXYXJcIixcbiAgICAgICAgICAgIFBvc3RlcjogXCJodHRwczovL20ubWVkaWEtYW1hem9uLmNvbS9pbWFnZXMvTS9NVjVCTWpRME1UZ3lOakF4TVY1Qk1sNUJhbkJuWGtGdFpUZ3dOalV6TURreU9ERUAuX1YxX1NYMzAwLmpwZ1wiLFxuICAgICAgICAgICAgUGxvdDogXCJQb2xpdGljYWwgaW52b2x2ZW1lbnQgaW4gdGhlIEF2ZW5nZXJzJyBhY3Rpdml0aWVzIGNhdXNlcyBhIHJpZnQgYmV0d2VlbiBDYXB0YWluIEFtZXJpY2EgYW5kIElyb24gTWFuLlwiLFxuICAgICAgICAgICAgV2F0Y2hlZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgVGl0bGU6IFwiU3BpZGVyLU1hbjogSG9tZWNvbWluZ1wiLFxuICAgICAgICAgICAgUGxvdDogXCJQZXRlciBQYXJrZXIgYmFsYW5jZXMgaGlzIGxpZmUgYXMgYW4gb3JkaW5hcnkgaGlnaCBzY2hvb2wgc3R1ZGVudCBpbiBRdWVlbnMgd2l0aCBoaXMgc3VwZXJoZXJvIGFsdGVyLWVnbyBTcGlkZXItTWFuLCBhbmQgZmluZHMgaGltc2VsZiBvbiB0aGUgdHJhaWwgb2YgYSBuZXcgbWVuYWNlIHByb3dsaW5nIHRoZSBza2llcyBvZiBOZXcgWW9yayBDaXR5LlwiLFxuICAgICAgICAgICAgUG9zdGVyOiBcImh0dHBzOi8vbS5tZWRpYS1hbWF6b24uY29tL2ltYWdlcy9NL01WNUJOVGs0T0RRMU16Z3pObDVCTWw1QmFuQm5Ya0Z0WlRnd01UTXlNek00TVRJQC5fVjFfU1gzMDAuanBnXCIsXG4gICAgICAgICAgICBXYXRjaGVkOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBUaXRsZTogXCJEb2N0b3IgU3RyYW5nZVwiLFxuICAgICAgICAgICAgUGxvdDogXCJXaGlsZSBvbiBhIGpvdXJuZXkgb2YgcGh5c2ljYWwgYW5kIHNwaXJpdHVhbCBoZWFsaW5nLCBhIGJyaWxsaWFudCBuZXVyb3N1cmdlb24gaXMgZHJhd24gaW50byB0aGUgd29ybGQgb2YgdGhlIG15c3RpYyBhcnRzLlwiLFxuICAgICAgICAgICAgUG9zdGVyOiBcImh0dHBzOi8vbS5tZWRpYS1hbWF6b24uY29tL2ltYWdlcy9NL01WNUJOamd3TnpBek5qazFObDVCTWw1QmFuQm5Ya0Z0WlRnd016UTJOakkxT1RFQC5fVjFfU1gzMDAuanBnXCIsXG4gICAgICAgICAgICBXYXRjaGVkOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBUaXRsZTogXCJCbGFjayBQYW50aGVyXCIsXG4gICAgICAgICAgICBQbG90OiBcIlQnQ2hhbGxhLCBoZWlyIHRvIHRoZSBoaWRkZW4gYnV0IGFkdmFuY2VkIGtpbmdkb20gb2YgV2FrYW5kYSwgbXVzdCBzdGVwIGZvcndhcmQgdG8gbGVhZCBoaXMgcGVvcGxlIGludG8gYSBuZXcgZnV0dXJlIGFuZCBtdXN0IGNvbmZyb250IGEgY2hhbGxlbmdlciBmcm9tIGhpcyBjb3VudHJ5J3MgcGFzdC5cIixcbiAgICAgICAgICAgIFBvc3RlcjogXCJodHRwczovL20ubWVkaWEtYW1hem9uLmNvbS9pbWFnZXMvTS9NVjVCTVRnMU1UWTJNall6TlY1Qk1sNUJhbkJuWGtGdFpUZ3dNVGM0TlRNd05ESUAuX1YxX1NYMzAwLmpwZ1wiLFxuICAgICAgICAgICAgV2F0Y2hlZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgVGl0bGU6IFwiVGhvcjogUmFnbmFyb2tcIixcbiAgICAgICAgICAgIFBsb3Q6IFwiVGhvciBpcyBpbXByaXNvbmVkIG9uIHRoZSBwbGFuZXQgU2FrYWFyLCBhbmQgbXVzdCByYWNlIGFnYWluc3QgdGltZSB0byByZXR1cm4gdG8gQXNnYXJkIGFuZCBzdG9wIFJhZ25hcsO2aywgdGhlIGRlc3RydWN0aW9uIG9mIGhpcyB3b3JsZCwgYXQgdGhlIGhhbmRzIG9mIHRoZSBwb3dlcmZ1bCBhbmQgcnV0aGxlc3MgdmlsbGFpbiBIZWxhLlwiLFxuICAgICAgICAgICAgUG9zdGVyOiBcImh0dHBzOi8vbS5tZWRpYS1hbWF6b24uY29tL2ltYWdlcy9NL01WNUJNak15TkRrek16STFPRjVCTWw1QmFuQm5Ya0Z0WlRnd09EY3hPRGc1TWpJQC5fVjFfU1gzMDAuanBnXCIsXG4gICAgICAgICAgICBXYXRjaGVkOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBUaXRsZTogXCJBbnQtTWFuIGFuZCB0aGUgV2FzcFwiLFxuICAgICAgICAgICAgUGxvdDogXCJBcyBTY290dCBMYW5nIGJhbGFuY2VzIGJlaW5nIGJvdGggYSBTdXBlciBIZXJvIGFuZCBhIGZhdGhlciwgSG9wZSB2YW4gRHluZSBhbmQgRHIuIEhhbmsgUHltIHByZXNlbnQgYW4gdXJnZW50IG5ldyBtaXNzaW9uIHRoYXQgZmluZHMgdGhlIEFudC1NYW4gZmlnaHRpbmcgYWxvbmdzaWRlIFRoZSBXYXNwIHRvIHVuY292ZXIgc2VjcmV0cyBmcm9tIHRoZWlyIHBhc3QuXCIsXG4gICAgICAgICAgICBQb3N0ZXI6IFwiaHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL00vTVY1QllqY3lZVGswTjJZdE16YzRaQzAwWTJFMExXRmtORGd0TmpFMU16Wm1NR0UxWWpZMVhrRXlYa0ZxY0dkZVFYVnlNVE14T0RrMk9UVUAuX1YxX1NYMzAwLmpwZ1wiLFxuICAgICAgICAgICAgV2F0Y2hlZDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgVGl0bGU6IFwiQXZlbmdlcnM6IEluZmluaXR5IFdhclwiLFxuICAgICAgICAgICAgUGxvdDogXCJUaGUgQXZlbmdlcnMgYW5kIHRoZWlyIGFsbGllcyBtdXN0IGJlIHdpbGxpbmcgdG8gc2FjcmlmaWNlIGFsbCBpbiBhbiBhdHRlbXB0IHRvIGRlZmVhdCB0aGUgcG93ZXJmdWwgVGhhbm9zIGJlZm9yZSBoaXMgYmxpdHogb2YgZGV2YXN0YXRpb24gYW5kIHJ1aW4gcHV0cyBhbiBlbmQgdG8gdGhlIHVuaXZlcnNlLlwiLFxuICAgICAgICAgICAgUG9zdGVyOiBcImh0dHBzOi8vbS5tZWRpYS1hbWF6b24uY29tL2ltYWdlcy9NL01WNUJNak14TmpZMk1EVTFPVjVCTWw1QmFuQm5Ya0Z0WlRnd056WTFNVFV3TlRNQC5fVjFfU1gzMDAuanBnXCIsXG4gICAgICAgICAgICBXYXRjaGVkOiBmYWxzZVxuICAgICAgICB9XG4gICAgXTtcblxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnNlbGVjdGVkTW92aWUgPSB0aGlzLm1vdmllc1t0aGlzLnNlbGVjdGVkSW5kZXhdO1xuICAgICAgICB0aGlzLnRvV2F0Y2hMaXN0ID0gdGhpcy5tb3ZpZXMuZmlsdGVyKG1vdmllID0+ICFtb3ZpZS5XYXRjaGVkKTtcbiAgICB9XG5cbiAgICBvbk1vdmllU3dpcGUoYXJncykge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBhcmdzLnZhbHVlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkTW92aWUgPSB0aGlzLm1vdmllc1t0aGlzLnNlbGVjdGVkSW5kZXhdO1xuICAgIH1cblxuICAgIG9uV2F0Y2hlZEJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZE1vdmllLldhdGNoZWQgPSAhdGhpcy5zZWxlY3RlZE1vdmllLldhdGNoZWQ7XG4gICAgICAgIHRoaXMudG9XYXRjaExpc3QgPSB0aGlzLm1vdmllcy5maWx0ZXIobW92aWUgPT4gIW1vdmllLldhdGNoZWQpO1xuICAgIH1cblxuICAgIHdhdGNoTGlzdFN1YnRpdGxlKCkge1xuICAgICAgICBpZiAoIXRoaXMudG9XYXRjaExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJZb3Ugd2F0Y2hlZCBhbGwgdGhlIG1vdmllcyFcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7dGhpcy50b1dhdGNoTGlzdC5sZW5ndGh9IHRvIHdhdGNoYDtcbiAgICB9XG5cbiAgICBvbldhdGNoTGlzdE1vdmllVGFwKHRpdGxlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBsb29raW5nIGZvciBpbmRleCBvZiBtb3ZpZTogJHt0aXRsZX1gKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLm1vdmllcy5maW5kSW5kZXgobW92aWUgPT4gbW92aWUuVGl0bGUgPT09IHRpdGxlKTtcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgICAgICBjb25zb2xlLmxvZyhgdGhpcy5zZWxlY3RlZEluZGV4ID0gJHt0aGlzLnNlbGVjdGVkSW5kZXh9YCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRNb3ZpZSA9IHRoaXMubW92aWVzW3RoaXMuc2VsZWN0ZWRJbmRleF07XG4gICAgICAgIGNvbnNvbGUubG9nKGBzZWxlY3RlZCBtb3ZpZSA6ICR7dGhpcy5zZWxlY3RlZE1vdmllLlRpdGxlfWApO1xuICAgIH1cblxuICAgIG9uVGFiQ2hhbmdlKGluZGV4KSB7XG4gICAgICAgIHRoaXMudGFiSW5kZXggPSBpbmRleDtcbiAgICB9XG59XG4iXX0=