import React, { Component } from 'react';
import classes from './Favourites.css';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Favourite from '../../components/Favourite/Favourite';
import Axios from 'axios';
import { connect } from 'react-redux';

class Favourites extends Component {
    state = {
        movies: [],
        tidbits: []
      };

    
    componentDidMount () {
         //server call to fetch favourites

         Axios.get('http://gateway-service:9900/favourites-service/favourites/user/' + this.props.id + '/movies')
            .then(response => {
                console.log(response);
                this.setState({movies : response.data.favouriteMovies});
            })
            .catch(err => console.log(err));

        // const img = '/sport.jpg';
        // const movie1 = {
        //     name: 'abc',
        //     imageUrl: img,
        //     description: 'Nice movie'
        // }
        // const movie2 = {
        //   name: 'pqr',
        //   imageUrl: img,
        //   description: 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.'
        // }
        // const movie3 = {
        //   name: 'xyz',
        //   imageUrl: img,
        //   description: 'Nice movie'
        // }
        // const movie4 = {
        //   name: 'def',
        //   imageUrl: img,
        //   description: 'Nice movie'
        // }

        // const fetchedMovies = [...this.state.movies];
        // fetchedMovies.push(movie1);
        // fetchedMovies.push(movie2);
        // fetchedMovies.push(movie3);
        // fetchedMovies.push(movie4);
      
        // const tidbit1 = {
        //   topic: 'abc',
        //   imageUrl: img,
        //   fact: 'Nice movie'
        // }
        // const tidbit2 = {
        //   topic: 'pqr',
        //   imageUrl: img,
        //   fact: 'Nice movie'
        // }
        // const tidbit3 = {
        //   topic: 'xyz',
        //   imageUrl: img,
        //   fact: 'Nice movie'
        // }
        // const tidbit4 = {
        //   topic: 'def',
        //   imageUrl: img,
        //   fact: 'Nice movie'
        // }
       
        // const fetchedTidbits = [...this.state.tidbits];
        // fetchedTidbits.push(tidbit1);
        // fetchedTidbits.push(tidbit2);
        // fetchedTidbits.push(tidbit3);
        // fetchedTidbits.push(tidbit4);

        Axios.get('http://gateway-service:9900/favourites-service/favourites/user/' + this.props.id + '/trivia')
        .then(response => {
            console.log(response);
            this.setState({tidbits : response.data.favouriteTrivia});
        })
        .catch(err => console.log(err));

    }

    render()    {

      const favMovies = (this.state.movies.length > 0 ) ? (
                              this.state.movies.map(movie => {
                              return <Favourite key={movie.name} 
                                                name={movie.name}
                                                description={movie.description}
                                                poster={movie.poster}/>;
                                                
      })): <p>No movies yet!</p>;

      const favTidbits = (this.state.tidbits.length > 0 ) ? (this.state.tidbits.map(tidbit => {
        return <Favourite key={tidbit.term} 
                          name={tidbit.term}
                          description={tidbit.fact}
                          poster={tidbit.category}/>;
      })):<p>No trivia yet!</p>;   

      return (
        <div>
          <SectionHeader heading="My watchlist"/>
          <div className={classes.Content}>
            {favMovies}
          </div>
          <SectionHeader heading="Interested Trivia"/>
          <div className={classes.Content}>
            {favTidbits}
          </div>
        </div>
      );
    }
}
const mapStateToProps = state => {
  return {
    id: state.auth.id,
    token: state.auth.token
   
  };
};
export default connect(mapStateToProps)(Favourites);