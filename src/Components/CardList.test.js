import React from 'react';
import {shallow, mount, render} from 'enzyme';
import CardList from './CardList';

it('expect to render Card component', () => {
    const mockRobots = [
        {
            id: 1,
            name: 'something',
            username: 's',
            email: 's@gmail.com'
        }
    ]
    expect(shallow(<CardList robots={mockRobots} />)).toMatchSnapshot();
})
