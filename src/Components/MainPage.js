import React, {useState, useEffect, Component} from 'react';
import CardList from '../Components/CardList';
import SearchBox from './SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
import Header from '../Components/Header';
import './MainPage.css'

class MainPage extends Component {
    componentDidMount() {
        this.props.onRequestRobots();
    }

    filterRobots = (robots) => robots.filter(obj => obj.name.toLowerCase().includes(this.props.searchField.toLowerCase()));

    render() {
        const {robots, onSearchChange, isPending} = this.props;

        if(isPending) {
            return <h1>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <Header />
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={this.filterRobots(robots)} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            )
        }
    }
}

export default MainPage