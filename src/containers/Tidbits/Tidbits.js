import React, { Component } from 'react';
import Trivia from '../../components/Trivia/Trivia';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Axios from 'axios';
import { connect } from 'react-redux';
import classes from './Tidbits.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import { auth } from '../../store/actions';

class Tidbits extends Component    {

    state = {
        tidbits: [],
        loading: true
    };

    updateFavouritesHandler = (term) =>  {
        console.log("clicked! " + term);
        const selectedTriviaIdx = this.state.tidbits.findIndex(trivia => trivia.term === term);
        let updatedTidbits = [...this.state.tidbits];
        let selectedTrivia = updatedTidbits[selectedTriviaIdx];
        selectedTrivia.favourite = !selectedTrivia.favourite;
        this.setState({ tidbits: updatedTidbits});
        this.state.tidbits.forEach(trivia => console.log(trivia));
        const triviaData = {
            term: selectedTrivia.term,
            fact: selectedTrivia.fact,
            category: selectedTrivia.category
        }
        const authHeader = {
            headers: {
                Authorization : 'Bearer ' + this.props.token
            }
        };
        Axios.put("http://gateway-service:9900/favourites-service/favourites/user/" + this.props.id + "/trivia", triviaData, authHeader)
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
        Axios.get('http://gateway-service:9900/tidbits-service/tidbits', authHeader)
            .then(response => {
                console.log(response);  
                        
                this.setState({tidbits : response.data.triviaList, loading: false});
                
            });
    }
 
    render()    {
        const tidbits =  (this.state.loading) ? <Spinner /> : this.state.tidbits.map(trivia => {
                return <Trivia item={trivia} isAuth={this.props.isAuth} clicked={() => this.updateFavouritesHandler(trivia.term)} key={trivia.category}/>
                });
            
           
            
        return <div >
                    <SectionHeader heading="Trivia Picks"/>
                    <div className={classes.Tidbits}>
                        {tidbits}
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
export default connect(mapStateToProps)(Tidbits);