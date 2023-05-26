import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import factories from './factory';

function* fetthData (){
    yield takeEvery(actions.FETCH_GET_DATA, function* (payload){
        // console.log(payload, 'payload')
        try { 
            const response = yield call(() => factories.getData(payload));
            
            // console.log(response.Data, 'response.Dataresponse.Dataresponse.Data')
            yield put({
                type: actions.FETCH_GET_DATA_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {

        }
    });
}

function* setSup () {
    yield takeEvery(actions.ADD_DATA, function* (payload) {
        try {
            const response = yield call(() =>
                factories.setBrand(payload),
            );
            yield put({
                type: actions.ADD_DATA_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}

function* pushData () {
    yield takeEvery(actions.PUSH_DATA, function* (payload) {
        try {
            const response = yield call(() =>
                factories.setPushData(payload),
            );
            yield put({
                type: actions.PUSH_DATA_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}

function* fillRow () {
    yield takeEvery(actions.FILL_DETAIL_DATA, function* (payload) {
        try {
            const response = yield call(() =>
                factories.setFillRow(payload),
            );
            yield put({
                type: actions.FILL_DETAIL_DATA_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}

export default function* AppSaga () {
    yield all([
        fork(fetthData),
        fork(setSup),
        fork(pushData),
        fork(fillRow),
    ]);
}
