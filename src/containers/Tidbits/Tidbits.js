import React, { Component } from 'react';
import Trivia from '../../components/Trivia/Trivia';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import Axios from 'axios';
import classes from './Tidbits.css';
import Spinner from '../../components/UI/Spinner/Spinner';

class Tidbits extends Component    {

    state = {
        tidbits: [],
        loading: true
    };

    addToFavouritesHandler = (topic) =>  {
        console.log("clicked! " + topic);
        const selectedTriviaIdx = this.state.tidbits.findIndex(trivia => trivia.topic === topic);
        let updatedTidbits = [...this.state.tidbits];
        let selectedTrivia = updatedTidbits[selectedTriviaIdx];
        selectedTrivia.favourite = !selectedTrivia.favourite;
        this.setState({ tidbits: updatedTidbits});
        this.state.tidbits.forEach(trivia => console.log(trivia));
    }

    componentDidMount() {
        console.log("Component did mount");
        Axios.get('http://localhost:8095/tidbits')
            .then(response => {
                console.log(response);               
                this.setState({tidbits : response.data, loading: false});
                
            });
    }
 
    render()    {
        const tidbits =  (this.state.loading) ? <Spinner /> : this.state.tidbits.map(trivia => {
                return <Trivia item={trivia} isAuth={this.props.isAuth} clicked={() => this.addToFavouritesHandler(trivia.topic)} key={trivia.topic}/>
                });
            
           
            
        return <div >
                    <SectionHeader heading="Trivia Picks"/>
                    <div className={classes.Tidbits}>
                        {tidbits}
                    </div>
                </div>;
    }

}
export default Tidbits;