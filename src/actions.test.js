import {
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

import * as actions from './actions';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureMockStore([thunkMiddleware])

afterEach(() => {
    nock.cleanAll();
})

it('should create an action to search robots', () => {
    const text = 'wooo';
    const expectedAction = {
        type: CHANGE_SEARCH_FIELD,
        payload: text
    }
    expect(actions.setSearchField(text)).toEqual(expectedAction);
})

it('handles requesting robots api', () => {
    const expectedAction = {
        type: REQUEST_ROBOTS_PENDING,
    }

    const store = mockStore();
    store.dispatch(actions.requestRobots());
    const action = store.getActions();

    expect(action[0]).toEqual(expectedAction);
})

it('successfully requests robots', () => {
    expect.assertions(1);

    const expectedAction = [
        {type: REQUEST_ROBOTS_PENDING},
        {
            type: REQUEST_ROBOTS_SUCCESS,
            payload: [
                {
                    id: 1, 
                    name: 'john',
                    email: 'johnF@gmail.com'
                },
                {
                    id: 2,
                    name: 'e',
                    email: 'e@email.com'
                }
            ]
        }
    ]

    nock('https:jsonplaceholder.typicode.com/')
        .get('/users')
        .reply(200, [{id: 1, name: 'john', email: 'johnF@gmail.com'}, {id: 2, name: 'e', email: 'e@email.com'}]);

    const store = mockStore();

    return store.dispatch(actions.requestRobots()).then(() => {
        expect(store.getActions()).toEqual(expectedAction)
    })
})

it('handles failed requests', () => {
    expect.assertions(1);
    
    const expectedAction = [
        {type: REQUEST_ROBOTS_PENDING},
        {
            type: REQUEST_ROBOTS_FAILED,
            payload: 'could not get thingies'
        }
    ]

    nock('https://jsonplaceholder.typicode.com/')
        .get('/users')
        .reply(400, expectedAction[1].payload);

    const store = mockStore();

    return store.dispatch(actions.requestRobots()).then(() => {
        expect(store.getActions()).toEqual(expectedAction)
    })
})