/**
 * Created by yvan on 16/7/10.
 */
import { call, put, take, fork, cancel, race } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import fetch from 'isomorphic-fetch'
import fetchJsonp from 'fetch-jsonp'
import { TYPES as FT } from 'reducers/fetch'
import { TYPES as AT } from 'reducers/app'

export function getData(url) {
	return fetchJsonp(url).then(response => response.json())
}

export function* fetchData(action) {
	try {
		const data = yield call(getData,action.url);
		yield put({type: FT.FETCH_SUCCEED, data});
        console.log("============request data==============");
        console.log(data);

		if(action.successAction) {
			yield put({type: action.successAction, data});
		}
		if(action.successInfo) { //显示成功信息
			yield put({
				type: AT.SET_INFO,
				value: true,
				msg: action.successInfo
			});
		}
	} catch (error) {
		yield put({type: FT.FETCH_FAILED, error: error.toString()});
		yield put({ //弹出请求失败提示
			type: AT.SET_INFO,
			value: true,
			msg: "请求失败:"+error.toString(),
			style: "error"
		});
	}
}

function* fetchDataSaga() {
	yield takeLatest( FT.FETCH_REQUEST, fetchData)
}

export default function* sagaFetch() {
	yield fetchDataSaga()
}


//
//method = method.toUpperCase();
//if (method === 'GET') {
//    body = undefined;
//} else {
//    body = body && JSON.stringify(body);
//}
//
//return fetch(url, {
//    method,
//    headers: {
//        'Content-Type': 'application/json',
//        'Accept': 'application/json',
//        'Access-Token': sessionStorage.getItem('access_token') || ''
//    },
//    body
//})
//    .then((res) => {
//        if (res.status === 401) {
//            hashHistory.push('/login');
//            return Promise.reject('Unauthorized.');
//        } else {
//            const token = res.headers.get('access-token');
//            if (token) {
//                sessionStorage.setItem('access_token', token);
//            }
//            return res.json();
//        }
//    });
//}