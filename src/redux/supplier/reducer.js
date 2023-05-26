import AppAction from './action';
let initialState = {
    loadingApp: false,
    loadingAppPopup: false,
    getAllData: {
        loading: false,
        data: []
    },
    getDataPush: {
        loading: false,
        data: []
    }
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case AppAction.FETCH_GET_DATA:
            return {
                ...state,
                getAllData: {
                    ...state.getAllData,
                    search: action.payload,
                    loading: true,
                },
            };
        case AppAction.FETCH_GET_DATA_SUCCESS:
            return {
                ...state,
                getAllData: {
                    ...state.getAllData,
                    data: action.payload.data,
                    loading: false,
                },
            };

        case AppAction.ADD_DATA:
            return {
                ...state,
                getAllData: {
                    ...state.getAllData,
                    detail: action.payload,
                    loading: true,
                },
            };
        case AppAction.ADD_DATA_SUCCESS:
            console.log(action.payload, 'action.payload')
            return {
                ...state,
                getAllData: {
                    ...state.getAllData,
                    data: action.payload,
                    loading: false,
                },
            };

        case AppAction.PUSH_DATA:
            return {
                ...state,
                getDataPush: {
                    ...state.getDataPush,
                    data: true,
                    loading: true,
                },
            };
        case AppAction.PUSH_DATA_SUCCESS:
            return {
                ...state,
                getDataPush: {
                    ...state.getDataPush,
                    data: action.payload.data,
                    loading: false,
                },
            };


        // get detail data list
        case AppAction.FILL_DETAIL_DATA:
            return {
                ...state,
                getAllData: {
                    ...state.getAllData,
                    search: action.payload,
                    loading: true,
                },
            };

        case AppAction.FILL_DETAIL_DATA_SUCCESS:

        console.log(action.payload.data, 'action.payload')
            return {
                ...state,
                getAllData: {
                    ...state.getAllData,
                    dataFill: action.payload.data,
                    loading: false,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default AppReducer;
