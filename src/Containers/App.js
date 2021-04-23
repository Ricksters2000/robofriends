import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import CardList from '../Components/CardList';
// import {robots} from './robots';
import SearchBox from '../Components/SeachBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
import Header from '../Components/Header';
import './App.css'

import {requestRobots, setSearchField} from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

const App = ({searchField, robots, isPending, error, onSearchChange, onRequestRobots}) => {
    //with states:
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: [],
    //         searchfield: ''
    //     }
    // }

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(response=> response.json())
    //     .then(users => this.setState({robots: users}));
        
    // }

    //with hooks:
    // const [robots, setRobots] = useState([]);
    // const [searchfield, setSearchfield] = useState('');
    
    //with hooks:
    useEffect(/*async*/ () => {
        // const resp = await fetch('https://jsonplaceholder.typicode.com/users');
        // const users = await resp.json();
        // setRobots(users);

        onRequestRobots();
    }, [])

    // const onSearchChange = (event) => {
    //     //this.setState({searchfield: event.target.value});
    //     setSearchfield(event.target.value);
    // }

    // render() {
        //const {robots, searchfield} = this.state
        const filteredRobots = robots.filter(obj => obj.name.toLowerCase().includes(searchField.toLowerCase()));

        if(isPending) {
            return <h1>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <Header />
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )
        }
    //}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);