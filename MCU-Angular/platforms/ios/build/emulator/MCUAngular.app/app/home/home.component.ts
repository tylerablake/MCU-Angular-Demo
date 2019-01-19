import { Component, OnInit } from "@angular/core";
import { Movie } from "../data/movie";
import { Page } from "ui/page";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    tabIndex = 0;
    selectedIndex: number;
    selectedMovie: Movie;
    selectedMovieIndex: 0;
    toWatchList: Array<Movie> = new Array<Movie>();
    movies: Array<Movie> = [
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


    constructor(private page: Page) {
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void {
        this.selectedIndex = 0;
        this.selectedMovie = this.movies[this.selectedIndex];
        this.toWatchList = this.movies.filter(movie => !movie.Watched);
    }

    onMovieSwipe(args) {
        this.selectedIndex = args.value;
        this.selectedMovie = this.movies[this.selectedIndex];
    }

    onWatchedButtonTap(): void {
        this.selectedMovie.Watched = !this.selectedMovie.Watched;
        this.toWatchList = this.movies.filter(movie => !movie.Watched);
    }

    watchListSubtitle() {
        if (!this.toWatchList.length) {
            return "You watched all the movies!";
        }
        return `${this.toWatchList.length} to watch`;
    }

    onWatchListMovieTap(title) {
        console.log(`looking for index of movie: ${title}`);
        const index = this.movies.findIndex(movie => movie.Title === title);
        this.tabIndex = 0;
        this.selectedIndex = index;
        console.log(`this.selectedIndex = ${this.selectedIndex}`);
        this.selectedMovie = this.movies[this.selectedIndex];
        console.log(`selected movie : ${this.selectedMovie.Title}`);
    }

    onTabChange(index) {
        this.tabIndex = index;
    }
}
