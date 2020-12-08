import React, { Component } from 'react';
import Movie from '../../components/Movie/Movie';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import { connect } from 'react-redux';
import Axios from 'axios';
import classes from './Movies.css';

class Movies extends Component    {

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    state = {
        movies: []
    };

    updateFavouritesHandler = (title) =>  {
        console.log("clicked! " + title);
        const selectedMovieIdx = this.state.movies.findIndex(movie => movie.title === title);
        let updatedMovies = [...this.state.movies];
        let selectedMovie = updatedMovies[selectedMovieIdx];
        selectedMovie.favourite = !selectedMovie.favourite;

        this.setState({ movies: updatedMovies});
        this.state.movies.forEach(movie => console.log(movie));
        const authHeader = {
            headers: {
                Authorization : 'Bearer ' + this.props.token
            }
        }

        const favMovie = 
        {
            id: selectedMovie.id,
            name: selectedMovie.title,
            description: selectedMovie.plot,
            poster: selectedMovie.poster
        }
        Axios.put("/api/favourites-service/favourites/user/" + this.props.id + "/movie",  favMovie, authHeader)
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => console.log(err));
            
    }

    componentDidMount() {
        console.log("Component did mount " + this.props.token);
        const authHeader = (this.props.token !== null) ? {
            headers:
            {
                Authorization: 'Bearer ' + this.props.token
            }
        } : null;
        Axios.get('/api/movie-service/movies', authHeader)
            .then(response => {
                console.log(response);
                const movieList = response.data.movies.map(movie => {return { ...movie, votes: this.numberWithCommas(movie.imdbVotes) }});
                this.setState({movies : movieList});
            })
            .catch(err => console.log(err));
        
        Axios.get('/api/userservice/user/fallback')
            .then(response => {
                console.log("Check response " + response);
            })
            .catch(err => console.log(err));
    }
 
    render()    {
        const movies =  this.state.movies.map(movie => {
                return <Movie item={movie} isAuth={this.props.isAuth} clicked={() => this.updateFavouritesHandler(movie.title)} key={movie.title}/>
                });
            
           
            
        return <div >
                    <SectionHeader heading="Movie Picks"/>
                    <div className={classes.Movies}>
                        {movies}
                    </div>
                </div>;
    }

}
const mapStateToProps = state => {
    return {
      id: state.auth.id,
      token: state.auth.token
     
    };
  };

  export default connect(mapStateToProps, null)(Movies);