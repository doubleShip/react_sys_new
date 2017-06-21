/**
 * Created by soga on 2017/6/17.
 */
import {fromJS} from 'immutable';
//import { handleActions, createAction } from 'redux-actions'

export const TYPES = {
    SET_MUSIC_LIST: 'TODO/SET_MUSIC_LIST',
    //SET_SEARCH_FIELDS: 'TODO/SET_SEARCH_FIELDS',
}

export const actions = {
    // 关闭提示框信息
    setMusicList : () => ({
        type : TYPES.SET_MUSIC_LIST
    })
}


const initState = fromJS({
    song_list : [],
    searchFields : {}
})

export const reducer = ( state = initState, action ) => {
    switch (action.type) {
        case TYPES.SET_MUSIC_LIST :
            return state.mergeDeep({
                song_list : action.data.song_list
            });
        default:
            return state;
    }
};