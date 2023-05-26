import ApiConstants from 'adapter/ApiConstants';
import ApiOperation from 'adapter/ApiOperation';

const AppFactory = {
    fetchSample: (data) => {
        return {
            Data: {}
        };
        // return ApiOperation.request({
        //     url: ApiConstants.CREATE_CATEGORY,
        //     method: 'POST',
        //     data: data
        // });
    },
    getData: (data) => {
        return {
            Data: {}
        };
    },

    city: (data) => {
        return {
            Data: {}
        };
    },


    setBrand: (data) => {
        // console.log(data)
        return {
            Data: data
        };
    },

    dist: (data) => {
        return {
            Data: data
        };
    },
    wards: (data) => {
        return {
            Data: data
        };
    },

    getSearch: (data) => {
        return {
            Data: data
        };
    },

    detail: (data) => {
        return {
            Data: data
        };
    },
    callDelete: (data) => {
        return {
            Data: data
        };
    },
    callDebt: (data) => {
        return {
            Data: data
        };
    },
    updateSample: (data) => {
        return {
            Data: {}
        };
        // return ApiOperation.request({
        //     url: ApiConstants.CREATE_CATEGORY,
        //     method: 'POST',
        //     data: data
        // });
    },
}

export default AppFactory