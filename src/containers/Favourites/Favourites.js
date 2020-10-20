import React, { Component } from 'react';
import classes from './Favourites.css';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Favourite from '../../components/Favourite/Favourite';

class Favourites extends Component {
    state = {
        movies: [],
        tidbits: []
      };

    
    componentDidMount () {
         //server call to fetch favourites

        const img = '/sport.jpg';
        const movie1 = {
            name: 'abc',
            imageUrl: img,
            description: 'Nice movie'
        }
        const movie2 = {
          name: 'pqr',
          imageUrl: img,
          description: 'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.'
        }
        const movie3 = {
          name: 'xyz',
          imageUrl: img,
          description: 'Nice movie'
        }
        const movie4 = {
          name: 'def',
          imageUrl: img,
          description: 'Nice movie'
        }

        const fetchedMovies = [...this.state.movies];
        fetchedMovies.push(movie1);
        fetchedMovies.push(movie2);
        fetchedMovies.push(movie3);
        fetchedMovies.push(movie4);
      
        const tidbit1 = {
          topic: 'abc',
          imageUrl: img,
          fact: 'Nice movie'
        }
        const tidbit2 = {
          topic: 'pqr',
          imageUrl: img,
          fact: 'Nice movie'
        }
        const tidbit3 = {
          topic: 'xyz',
          imageUrl: img,
          fact: 'Nice movie'
        }
        const tidbit4 = {
          topic: 'def',
          imageUrl: img,
          fact: 'Nice movie'
        }
       
        const fetchedTidbits = [...this.state.tidbits];
        fetchedTidbits.push(tidbit1);
        fetchedTidbits.push(tidbit2);
        fetchedTidbits.push(tidbit3);
        fetchedTidbits.push(tidbit4);

        this.setState({movies: fetchedMovies, tidbits: fetchedTidbits});
    }

    render()    {
      const favMovies = this.state.movies.map(movie => {
                              return <Favourite key={movie.name} 
                                                name={movie.name}
                                                description={movie.description}
                                                posterUrl={movie.imageUrl}/>;
      });

      const favTidbits = this.state.tidbits.map(tidbit => {
        return <Favourite key={tidbit.topic} 
                          name={tidbit.topic}
                          description={tidbit.fact}
                          posterUrl={tidbit.imageUrl}/>;
      });   

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
export default Favourites;