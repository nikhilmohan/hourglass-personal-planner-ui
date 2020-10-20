import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Movie from './Movie';
import FavControl from '../UI/FavControl/FavControl';

configure({adapter: new Adapter()});

describe('<Movie />', () => {
    let wrapper;

    let item =  {
        posterUrl: '/a.jpg',
        title: 'dummy',
        genre: 'Drama',
        certification: 'R',
        year: '2000',
        runningTime: '120',
        rating: '7.0',
        favourite: true

    };

    beforeEach(() => {
        wrapper = shallow(<Movie item={item} clicked={null}/>);
       
    });

    it('should not render favourite option if not authenticated', () => {
       expect(wrapper.contains(<FavControl /> )).toEqual(false);
    });

    it('should render favourite option if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(FavControl)).toHaveLength(1);
     });

  
});

