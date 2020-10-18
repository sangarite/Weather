import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { requestLocationID, updateValue, requestTemp } from '../redux/actions';
import images from './images';

const mapStateToProps = (state) => {
	return {
		value: state.value,
		location: state.location,
		src: state.src,
		min: state.min,
		max: state.max,
		displayLoading: state.displayLoading,
		displayWeather: state.displayWeather,
		displayError: state.displayError,
		error: state.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onChange: value => dispatch(updateValue(value)),
		onClick: value => dispatch(requestLocationID(value)),
		getTemp: value => dispatch(requestTemp(value))
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick(event) {
		this.props.onClick(this.props.value);
		setTimeout(() => {this.props.getTemp(this.props.location)}, 2000)
	}

	handleChange(event) {
		this.props.onChange(event.target.value);
	}

	render() {
		return(
			<div id="out" style={{ backgroundImage: `url("/static/media/${this.props.src}.${images[this.props.src]}.jpg")` }}>
				<div id="in">
					<h1>Current Weather</h1>
					<input 
						type="text" 
						placeholder="Enter a Location" 
						value={this.props.value} 
						onChange={this.handleChange}
					/>
					<br />
					<button onClick={this.handleClick}>Get It</button>
					<div className="loading" style={{display: this.props.displayLoading}}></div>
					<h2 style={{display: this.props.displayError}}>Error <br /> Try a Diffrent Place</h2>
					<h2 style={{display: this.props.displayWeather}}>{Math.round(this.props.min)} - {Math.round(this.props.max)}  °C</h2>
					<img 
						src={`https://www.metaweather.com/static/img/weather/png/${this.props.src}.png`}
						alt={this.props.src}
						style={{display: this.props.displayWeather}}
					/>
				</div>
			</div>
		);
	}
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;