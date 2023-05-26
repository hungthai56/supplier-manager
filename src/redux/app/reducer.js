import DropButton from 'shared/components/drop-button/DropButton';
import AppAction from './action';
import DropAction from 'shared/components/drop-action/DropAction';
import * as Constants from "utils/Constants";

const city = []
city.push(
    { idkey: 1, value: "Đà nẵng", text: "Đà nẵng" },
    { idkey: 2, value: "Quảng Nam", text: "Quảng Nam" },
    { idkey: 3, value: "Huế", text: "Huế" }
)

const dist = []
dist.push(
    { idkey: 1, idgr: 1, value: "Thanh Khê", text: "Thanh Khê" },
    { idkey: 2, idgr: 1, value: "Hải Châu", text: "Hải Châu" },
    { idkey: 3, idgr: 2, value: "Thanh Bình", text: "Thanh Bình" },
    { idkey: 4, idgr: 2, value: "Ngũ Hành Sơn", text: "Ngũ Hành Sơn" },
)

const wards = []
wards.push(
    { idkey: 1, idgr: 1, value: "Chính Gián", text: "Chính Gián" },
    { idkey: 2, idgr: 1, value: "Thạc Gián", text: "Thạc Gián" },
    { idkey: 3, idgr: 2, value: "Mỹ An", text: "Mỹ An" },
    { idkey: 4, idgr: 2, value: "Mỹ Khê", text: "Mỹ Khê" },
)

const debt = []
debt.push(
    { value: 111112021, text: "111112021" },
    { value: 455544112, text: "455544112" },
    { value: 788955441, text: "788955441" },
    { value: 888888888, text: "888888888" },
)


let initialState = {
    loadingApp: false,
    loadingAppPopup: false,
    defaultData: Constants.GET_DATA,
    defaultCityData: city,
    defaultDistData: dist,
    defaultWardsData: wards,
    defaultDebtData: debt,
    fillSearch: Constants.GET_DATA,
    fillDetail: Constants.GET_DATA,
    fillDistData: dist,
    fillWardsData: wards,
    sampleData: {
        loading: false,
        data: {}
    },
    getAllData: {
        loading: false,
        data: []
    },
    getDetail: {
        loading: false,
        data: []
    },
    getCity: {
        loading: false,
        data: []
    },
    getDist: {
        loading: false,
        data: []
    },
    getWards: {
        loading: false,
        data: []
    },
    getSearch: {
        loading: false,
        data: []
    },
    getDelete: {
        loading: false,
        data: []
    },
    getDebt: {
        loading: false,
        data: []
    }
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case AppAction.LOADING_APP_START:
            return {
                ...state,
                loadingApp: true,
            };
        case AppAction.CLOSE_LOADING_APP:
            return {
                ...state,
                loadingApp: false,
            };
        case AppAction.LOADING_APP_POPUP_START:
            return {
                ...state,
                loadingAppPopup: true,
            };
        case AppAction.CLOSE_LOADING_APP_POPUP:
            return {
                ...state,
                loadingAppPopup: false,
            };
        case AppAction.FETCH_SAMPLE_1:
            return {
                ...state,
                sampleData: {
                    ...state.sampleData,
                    loading: true,
                },
            };
        case AppAction.FETCH_SAMPLE_1_SUCCESS:
            return {
                ...state,
                sampleData: {
                    ...state.sampleData,
                    data: action.payload,
                    loading: false,
                },
            };

        // get data city
        case AppAction.FETCH_CITY_DATA:
            return {
                ...state,
                getCity: {
                    ...state.getCity,
                    data: action.payload,
                    loading: true,
                },
            };
        case AppAction.FETCH_CITY_DATA_SUCCESS:
            return {
                ...state,
                getCity: {
                    ...state.getCity,
                    dataCity: state.defaultCityData,
                    loadingCity: false,
                },
            };

        // get dist data list
        case AppAction.FETCH_DIST_DATA:
            // console.log(action.payload)
            return {
                ...state,
                getDist: {
                    ...state.getDist,
                    data: action.payload,
                    loading: true,
                },
            };

        case AppAction.FETCH_DIST_DATA_SUCCESS:
            // console.log(state.getDist.data.data)
            const fillDist = state.defaultDistData.filter(disdt => {
                // console.log(disdt)
                if (disdt.idgr === state.getDist.data.data) {
                    return true;
                }
                return false;
            });
            console.log(fillDist)
            if (fillDist) {
                state.fillDistData = fillDist
            } else {
                state.fillDistData = [{ text: "không tồn tại dự liệu" }]
            }


            return {
                ...state,
                getDist: {
                    ...state.getDist,
                    dataDist: state.fillDistData,
                    loadingDist: false,
                },
            };


        // get wards data list
        case AppAction.FETCH_WARDS_DATA:
            // console.log(action.payload)
            return {
                ...state,
                getWards: {
                    ...state.getWards,
                    data: action.payload,
                    loading: true,
                },
            };

        case AppAction.FETCH_WARDS_DATA_SUCCESS:
            // console.log(state.getDist.data.data)
            const fillWards = state.defaultWardsData.filter(disdt => {
                // console.log(disdt)
                if (disdt.idgr === state.getWards.data.data) {
                    return true;
                }
                return false;
            });

            state.fillWardsData = fillWards
            console.log(fillWards)
            return {
                ...state,
                getWards: {
                    ...state.getWards,
                    dataWards: state.fillWardsData,
                    loadingWards: false,
                },
            };


        // get data city
        case AppAction.DEBT_DATA:
            return {
                ...state,
                getDebt: {
                    ...state.getDebt,
                    loading: true,
                },
            };
        case AppAction.DEBT_DATA_SUCCESS:

            return {
                ...state,
                getDebt: {
                    ...state.getDebt,
                    dataDebt: state.defaultDebtData,
                    loadingDebt: false,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default AppReducer;
