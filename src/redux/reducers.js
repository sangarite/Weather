import { 
	REQUEST_LOCATION_PENDING,
	REQUEST_LOCATION_SUCCESS,
	REQUEST_LOCATION_FAILED,  
	UPDATE_VALUE,
	REQUEST_TEMP_SUCCESS,
	REQUEST_TEMP_FAILED
} from './actions';

const initialState = {
	value: '',
	location: '',
	src: '',
	min: '',
	max: '',
	displayLoading: 'none',
	displayWeather: 'none',
	displayError: 'none',
	error: ''
};

const rootReducer = (state = initialState, action = {}) => {
	switch(action.type) {
		case REQUEST_LOCATION_SUCCESS: {
			return Object.assign({}, state, { location: action.location })
		}
		case REQUEST_LOCATION_PENDING: return Object.assign({}, state, { 
			displayLoading: action.displayLoading, 
			displayWeather: action.displayWeather,
			displayError: action.displayError
			})
		case REQUEST_LOCATION_FAILED: return Object.assign({}, state, { error: action.error })
		case UPDATE_VALUE: return Object.assign({}, state, { value: action.payload })
		case REQUEST_TEMP_SUCCESS: return Object.assign({}, state, { 
			min: action.min, 
			max: action.max, 
			src: action.src, 
			displayLoading: action.displayLoading,
			displayWeather: action.displayWeather,
			location: action.location
		})
		case REQUEST_TEMP_FAILED: return Object.assign({}, state, { 
			error: action.error, 
			displayLoading: action.displayLoading, 
			displayWeather: action.displayWeather,
			displayError: action.displayError,
			location: action.location,
			min: action.min,
			max: action.max,
			src: action.src
		})
		default: return state
	}
}

export default rootReducer;