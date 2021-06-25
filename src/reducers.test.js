import {
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

import * as reducers from './reducers';

describe('searchRobots', () => {
    const initialStateSearch = {
        searchField: ''
    }
    it('should return the initial state', () => {
        expect(reducers.searchRobots(undefined, {})).toEqual({searchField: ''})
    })

    it('should handle CHANGE_SEARCHFIELD', () => {
        expect(reducers.searchRobots(initialStateSearch, {
            type: CHANGE_SEARCH_FIELD,
            payload: 'abc'
        })).toEqual({searchField: 'abc'})
    })

    it('handles invalid action type', () => {
        expect(reducers.searchRobots(initialStateSearch, {type: 'rneijnrejikk', payload: 'eeee'})).toEqual(initialStateSearch);
    })
})

describe('request robots', () => {
    const initialState = {
        isPending: false,
        robots: [],
        error: ''
    }

    it('should return the initial state', () => {
        expect(reducers.requestRobots(undefined, {})).toEqual(initialState)
    })

    it('should handle REQUESTS_ROBOTS_PENDING action', () => {
        expect(reducers.requestRobots(initialState, {
            type: REQUEST_ROBOTS_PENDING
        })).toEqual({...initialState, isPending: true})
    })

    it('should handle REQUESTS_ROBOTS_SUCCESS action', () => {
        expect(reducers.requestRobots(initialState, {
            type: REQUEST_ROBOTS_SUCCESS,
            payload: [{
                id: '123',
                name: 'test',
                email: 'e@gmail.com'
            }]
        })).toEqual({...initialState, robots: [{id: '123', name: 'test', email: 'e@gmail.com'}]})
    })

    it('should handle REQUESTS_ROBOTS_FAILED action', () => {
        expect(reducers.requestRobots(initialState, {
            type: REQUEST_ROBOTS_FAILED,
            payload: 'eeeeeeeeeeeeee'
        })).toEqual({...initialState, error: 'eeeeeeeeeeeeee'})
    })

    it('handles invalid action type', () => {
        expect(reducers.requestRobots(initialState, {type: 'rneijnrejikk', payload: 'eeee'})).toEqual(initialState);
    })
})