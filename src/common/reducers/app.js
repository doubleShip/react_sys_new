/**
 * Created by yvan on 16/7/8.
 */
import {fromJS} from 'immutable';

export const TYPES  = {
	SET_INFO : "APP/SET_INFO",
	CLOSE_INFO : "APP/CLOSE_INFO"
};

export const actions = {
	// 关闭提示框信息
	closeInfo : () => ({
		type : TYPES.CLOSE_INFO
	})
};


const initState = fromJS({
	info : {
		show : false,
		msg  : "",
		style : ""
	}
});


export const reducer = ( state = initState, action ) => {
	switch (action.type) {
		case TYPES.SET_INFO :
			return state.mergeDeep({
				info : {
					show : action.value,
					msg  : action.msg,
					style : action.style || "success"
				}
			});
		case TYPES.CLOSE_INFO :
			return state.mergeDeep({
				info : {
					show : false,
					msg  : "",
					style : ""
				}
			});
		default:
			return state;
	}
};

