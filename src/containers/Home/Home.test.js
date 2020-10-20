import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Home } from './Home';
import Dashboard from '../Dashboard/Dashboard';
import Banner from '../../components/Banner/Banner';

configure({adapter: new Adapter()});

describe('<Home />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Home />);
    });

    it('should render Banner if not authenticated', () => {
        expect(wrapper.find(Banner)).toHaveLength(1);
    });

    it('should render Dashboard if authenticated', () => {
        wrapper.setProps({isAuthenticated : true });
        expect(wrapper.find(Dashboard)).toHaveLength(1);
    });

  
});
