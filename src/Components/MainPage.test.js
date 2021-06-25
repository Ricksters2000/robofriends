import React from 'react';
import {shallow} from 'enzyme';
import MainPage from './MainPage';

const mockRobots = [
    {
        name: 'e',
        id: 1,
        email: 'e@gmail.com'
    },
    {
        name: 'hi',
        id: 2,
        email: 'someHi@gmail.com'
    },
    {
        name: 'hello',
        id: 2,
        email: 'someHello@gmail.com'
    },
    {
        name: 'someting',
        id: 2,
        email: 'something@gmail.com'
    }
]

let wrapper;
beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: false
    }
    wrapper = shallow(<MainPage {...mockProps} />)
})

it('renders main page', () => {
    expect(wrapper).toMatchSnapshot();
})

it('filters robots correctly', () => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: mockRobots,
        searchField: 'h',
        isPending: false
    }
    const wrapper2 = shallow(<MainPage {...mockProps} />);
    expect(wrapper2.instance().filterRobots([])).toEqual([]);
    expect(wrapper2.instance().filterRobots(mockRobots)).toEqual([
        {
            name: 'hi',
            id: 2,
            email: 'someHi@gmail.com'
        },
        {
            name: 'hello',
            id: 2,
            email: 'someHello@gmail.com'
        },
    ])
})

it('test loading page', () => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: mockRobots,
        searchField: 'h',
        isPending: true
    }

    const wrapper2 = shallow(<MainPage {...mockProps} />);
    expect(wrapper2).toMatchSnapshot();
})