import React, { Component } from 'react';
import Movie from '../../components/Movie/Movie';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Axios from 'axios';
import classes from './Movies.css';

class Movies extends Component    {

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    state = {
        movies: []
    };

    addToFavouritesHandler = (title) =>  {
        console.log("clicked! " + title);
        const selectedMovieIdx = this.state.movies.findIndex(movie => movie.title === title);
        let updatedMovies = [...this.state.movies];
        let selectedMovie = updatedMovies[selectedMovieIdx];
        selectedMovie.favourite = !selectedMovie.favourite;
        this.setState({ movies: updatedMovies});
        this.state.movies.forEach(movie => console.log(movie));
        

    }

    componentDidMount() {
        console.log("Component did mount");
        Axios.get('http://localhost:8095/movies')
            .then(response => {
                console.log(response);
                const movieList = response.data.map(movie => {return { ...movie, votes: this.numberWithCommas(movie.votes) }});
                this.setState({movies : movieList});
            });
    }
 
    render()    {
        const movies =  this.state.movies.map(movie => {
                return <Movie item={movie} isAuth={this.props.isAuth} clicked={() => this.addToFavouritesHandler(movie.title)} key={movie.title}/>
                });
            
           
            
        return <div >
                    <SectionHeader heading="Movie Picks"/>
                    <div className={classes.Movies}>
                        {movies}
                    </div>
                </div>;
    }

}
export default Movies;