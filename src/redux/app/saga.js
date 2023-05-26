import { all, call, fork, put, takeEvery } from '@redux-saga/core/effects';
import actions from './action';
import factories from './factory';


function* watchSample1 () {
    yield takeEvery(actions.FETCH_SAMPLE_1, function* (payload) {
        try {
            const response = yield call(() =>
                factories.fetchSample(payload),
            );
            yield put({
                type: actions.FETCH_SAMPLE_1_SUCCESS,
                payload: response.Data,
            });
            
        } catch (error) {

        } finally {
        }
    });
}

function* fetthData (){
    yield takeEvery(actions.FETCH_DATA, function* (payload){
        try { 
            const response = yield call(() => factories.getData(payload));
            
            yield put({
                type: actions.FETCH_DATA_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {

        }
    });
}
function* watchSample2 () {
    yield takeEvery(actions.FETCH_SAMPLE_2, function* (payload) {
        try {
            const response = yield call(() =>
                factories.updateSample(payload),
            );
            yield put({
                type: actions.FETCH_SAMPLE_2_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}

function* getDetail () {
    yield takeEvery(actions.FILL_DETAIL_DATA, function* (payload) {
        console.log(payload, 'payload')
        try {
            const response = yield call(() =>
                factories.detail(payload),
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

function* getCity () {
    yield takeEvery(actions.FETCH_CITY_DATA, function* (payload) {
        try {
            const response = yield call(() =>
                factories.city(payload),
            );
            // console.log(response.Data)
            yield put({
                type: actions.FETCH_CITY_DATA_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}

function* getDist () {
    yield takeEvery(actions.FETCH_DIST_DATA, function* (payload) {
        try {
            const response = yield call(() =>
                factories.dist(payload),
            );
            console.log(response.Data)
            yield put({
                type: actions.FETCH_DIST_DATA_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}

function* getWards () {
    yield takeEvery(actions.FETCH_WARDS_DATA, function* (payload) {
        try {
            const response = yield call(() =>
                factories.wards(payload),
            );
            console.log(response.Data)
            yield put({
                type: actions.FETCH_WARDS_DATA_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}

function* search () {
    yield takeEvery(actions.SEARCH_DATA, function* (payload) {
        try {
            const response = yield call(() =>
                factories.getSearch(payload),
            );
            console.log(response.Data)
            yield put({
                type: actions.SEARCH_DATA_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}

// function* deleteData () {
//     yield takeEvery(actions.DELETE_DATA, function* (payload) {
//         try {
//             const response = yield call(() =>
//                 factories.callDelete(payload),
//             );
//             console.log(response.Data)
//             yield put({
//                 type: actions.DELETE_DATA_SUCCESS,
//                 payload: response.Data,
//             });
//         } catch (error) {

//         } finally {
//         }
//     });
// }

function* getDebt () {
    yield takeEvery(actions.DEBT_DATA, function* (payload) {
        try {
            const response = yield call(() =>
                factories.callDebt(payload),
            );
            console.log(response.Data)
            yield put({
                type: actions.DEBT_DATA_SUCCESS,
                payload: response.Data,
            });
        } catch (error) {

        } finally {
        }
    });
}

export default function* AppSaga () {
    yield all([
        fork(watchSample1),
        fork(fetthData),
        // fork(setSup),
        fork(getDetail),
        fork(getCity),
        fork(getDist),
        fork(getWards),
        fork(search),
        fork(getDebt),
        // fork(deleteData),
        fork(watchSample2),
    ]);
}
