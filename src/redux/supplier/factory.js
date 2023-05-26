import ApiConstants from 'adapter/ApiConstants';
import ApiOperation from 'adapter/ApiOperation';
import * as Constants from "utils/Constants"
import React, { useEffect, useState } from 'react';

const storedItems = JSON.parse(localStorage.getItem('items'))
const AppFactory = {
    getData: (data) => {
        const dataDefault = storedItems ?? Constants.GET_DATA;
        let dataRole = []
        let dataSearch = data.payload.data
        console.log(dataSearch, 'dataSearch ===')
        dataDefault.map((item, index) => {
            if (item.deleted != true) {
                if (dataSearch.searchName || dataSearch.statusPutValue) {
                    const dataReturn = searchFill(dataDefault, dataSearch)
                    dataRole = dataReturn
                } else {
                    dataRole.push(item)
                }
            }
        })
        return {
            Data: { data: dataRole }
        };
    },
    setBrand: (data) => {
        console.log(data.payload.data, 'data.payload.data')
        data = data.payload.data
        let i = ''
        const dataDefault = storedItems ?? Constants.GET_DATA
        dataDefault.map((item, index) => {
            if (item.key == data.key && item.deleted != true) {
                i = index
            }
            dataDefault[i] = data
        })
        // console.log(dataDefault, 'dataDefault[i]')
        localStorage.setItem('items', JSON.stringify(dataDefault));

        return {
            Data: dataDefault
        }
    },
    setPushData: (data) => {
        data = data.payload.data
        const dataDefault = storedItems ?? Constants.GET_DATA
        console.log(dataDefault, 'dataDefault')
        dataDefault.unshift(data)
        localStorage.setItem('items', JSON.stringify(dataDefault));
        return {
            Data: data
        }
    },
    setFillRow: (data) => {
        data = data.payload.data
        console.log(data, 'data = data.payload.data ')
        const dataDefault = storedItems ?? Constants.GET_DATA;
        result = dataDefault.filter(item => {
            if (data) {
                return parseInt(item.key) == parseInt(data)
            }
        })
        // console.log(result, 'dataDefault')
        return {
            Data: { data: result }
        };
    }
}


let result = [];
const searchFill = (dataRow, dataSearch) => {
    console.log(dataSearch, 'dataSearchdataSearch')
    if ((dataSearch.statusPutValue && dataSearch.statusPutValue != 0) || dataSearch.searchName) {
        result = dataRow.filter(item => {

            if (dataSearch.searchName && dataSearch.statusPutValue) {
                return (parseInt(item.status) == parseInt(dataSearch.statusPutValue) && item.supplierCode.includes(dataSearch.searchName) || item.nameSupplier.includes(dataSearch.searchName) || item.email.includes(dataSearch.searchName))
            } else if (dataSearch.statusPutValue) {
                return parseInt(item.status) == parseInt(dataSearch.statusPutValue)
            } else if (dataSearch.searchName) {
                return item.supplierCode.includes(dataSearch.searchName) || item.nameSupplier.includes(dataSearch.searchName) || item.email.includes(dataSearch.searchName)
            }
        })
    } else {
        result = dataRow
    }

    // console.log(result, "result")

    return result
}
export default AppFactory