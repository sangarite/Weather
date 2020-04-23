export const REQUEST_LOCATION_SUCCESS = 'REQUEST_LOCATION_SUCCESS';
export const REQUEST_LOCATION_FAILED = 'REQUEST_LOCATION_FAIL';
export const REQUEST_LOCATION_PENDING = 'REQUEST_LOCATION_PENDING';
export const REQUEST_TEMP_SUCCESS = 'REQUEST_TEMP_SUCCESS';
export const REQUEST_TEMP_FAILED = 'REQUEST_TEMP_FAIL';
export const UPDATE_VALUE = 'UPDATE_VALUE';

export const requestLocationID = (location) => (dispatch) => {
	dispatch({type: REQUEST_LOCATION_PENDING, displayLoading: 'block', displayWeather: 'none', displayError: 'none' })
	fetch(`https://weather.daveceddia.com/api/location/search/?query=${location}`)
	.then(response => response.json())
	.then(data => dispatch({ type: REQUEST_LOCATION_SUCCESS, location: data[0].woeid }))
	.catch(error => dispatch({type: REQUEST_LOCATION_FAILED, error: error}))
}

export const updateValue = (payload) => {
	return {
		type: UPDATE_VALUE,
		payload
	}
}

export const requestTemp = (location) => (dispatch) => {
	fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${location}`)
	.then(response => response.json())
	.then(data => dispatch({
		location: '',
		type: REQUEST_TEMP_SUCCESS, 
		src: data.consolidated_weather[0].weather_state_abbr, 
		min: data.consolidated_weather[0].min_temp, 
		max: data.consolidated_weather[0].max_temp, 
		displayLoading: 'none',
		displayWeather: 'block'
	}))
	.catch(error => dispatch({ 
		location: '',
		type: REQUEST_TEMP_FAILED, 
		error: error, 
		displayLoading: 'none', 
		displayWeather: 'none',
		displayError: 'block',
		min: '',
		max: '',
		src: ''
	}))
}