import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Trivia from './Trivia';
import FavControl from '../UI/FavControl/FavControl';

configure({adapter: new Adapter()});

describe('<Trivia />', () => {
    let wrapper;

    let item =  {
        posterUrl: '/a.jpg',
        topic: 'dummy',
        fact: 'Drama',
        
        favourite: true

    };;

    beforeEach(() => {
        wrapper = shallow(<Trivia item={item} clicked={null}/>);
       
    });

    it('should not render favourite option if not authenticated', () => {
       expect(wrapper.contains(<FavControl /> )).toEqual(false);
    });

    it('should render favourite option if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(FavControl)).toHaveLength(1);
     });

  
});

