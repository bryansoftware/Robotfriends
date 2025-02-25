import React, { Component } from 'react';
import './App.css';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';


class App extends Component {
	// building in the STATE, to be able to modify CardList based on SearchBox input
	// this allows the children to pass info back to the parent, to pass to a sibling
	// robots and searchfield are the things that can change in the App
	// state lives in the parent component
	constructor() {
		super()						// call super() to be able to use 'this'
		this.state = {		
			robots: [],
			searchfield: ''
		}
		console.log('constructor');
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json())
			.then(users => this.setState({ robots: users }));
				
		console.log('componentDidMount');
	}

	// this function is sent as a prop to <SearchBox /> and doesn't get called until <SearchBox /> calls it due
	// to onChange() in the <input> ---> the event is coming from <SearchBox />
	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })				// any time you change a value of a state, use setState()
	}

	render() {
		const { robots, searchfield } = this.state;		// destructure the state, so you don't have to keep using this.state
		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})

		console.log('render');

		// if no robots/users say "Loading...", otherwise load the array
		return !robots.length ?
			<h1>Loading...</h1> :
		(
			<div>
				<h1>Robotfriends</h1>
				<div class='searchbox'>
					<SearchBox searchChange={this.onSearchChange}/>
				</div>

				{/*we don't want to access the static robots array... we want to access the
				state.robots and display whatever the user is searching for when we call <CardList />*/}
				<Scroll>
					<CardList robots={filteredRobots} />		
				</Scroll>
			</div>
		);
	}
}

export default App;


// props get passed down to children
// STATE is an object that describes your application
// a parent feeds state into a child component, as soon as a child receives the state, it becomes a property
// the child can't change a prop
// the parent tells it what the state is, the child receives it as a prop
// STATE >> prop
// STATE can change the app
// STATE lives in the parent component and pas