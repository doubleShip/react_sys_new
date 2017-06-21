/**
 * Created by yvan on 16/7/10.
 */
import {fromJS} from 'immutable';

export const TYPES = {
	FETCH_REQUEST : "FETCH/FETCH_REQUEST",
	FETCH_SUCCEED : "FETCH/FETCH_SUCCEED",
	FETCH_FAILED : "FETCH/FETCH_FAILED",
};

const action = (type, payload = {}) => ({
	type,
	...payload
});

export const fetchData = data => action(TYPES.FETCH_REQUEST,data);

const initState = fromJS({
	data: null,
	error: '',
	isFetching: false,
	isFailed: false
})

export const reducer = (state = initState, action) => {
    if(action.showLoading) {
        switch (action.type) {
            case TYPES.FETCH_SUCCEED:
                return state.merge({
                    data: action.data,
                    error: '',
                    isFetching: false,
                    isFailed: false
                })
            case TYPES.FETCH_FAILED:
                return state.merge({
                    data: action.data,
                    error: action.error,
                    isFetching: false,
                    isFailed: true
                });
            case TYPES.FETCH_REQUEST:
                return state.merge({
                    data: null,
                    error: '',
                    isFetching: true,
                    isFailed: false
                });

            default:
                return state
        }
    }
    else {
        return state
    }
}
