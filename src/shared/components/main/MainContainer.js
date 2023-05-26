import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/supplier/action';
import AppActionHook from 'redux/app/action';
import styles from "./MainContainer.module.scss";
import Dropdown from '../../components/dropdown/Dropdown';
import { useLocation, useParams, useHistory, Link } from "react-router-dom";
import "@fontsource/roboto/400.css";
import * as Constants from "utils/Constants";
import { useSelector } from 'react-redux';

function MainContainer(props) {
    const dispatch = useDispatch()
    const { dataCity, loadingCity } = useSelector(state => state.App.getCity)
    // console.log(dataCity)
    const [valueInput, setValueInput] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [status, setStatus] = useState(Constants.GET_STATUS);

    console.log(status, 'status.text')
    const [address, setAddress] = useState([]);

    const [ValueStatus, setValueStatus] = useState();
    // console.log(ValueStatus, 'ValueStatus')
    const [searchStatus, setSearchStatus] = useState("");
    const [ValueAddress, setValueAddress] = useState(false);
    useEffect(() => {
        dispatch({
            type: AppActionHook.FETCH_SAMPLE_1,
            payload: {}
        })
    }, [])

    useEffect(() => {
        dispatch({
            type: AppActionHook.FETCH_CITY_DATA,
            payload: {
                data: {}
            }
        })
    }, [])

    useEffect(()=>{
        setAddress(dataCity)
    }, [dataCity])

    const onchangeStatus = (e) => {
        const valueSearch = e.target
        setSearchStatus(valueSearch)
        setValueInput({
            ...valueInput, statusPutValue: e.target.value
        })
    }
    const onchangeAddress = (e) => {
        setValueAddress(e)
    }

    const updateInputValue = (e) => {
        const val = e.value;
        setSearchValue(val)
    }

    let history = useHistory()
    let location = useLocation();
    const params = new URLSearchParams(location.search);
    const nameSupplierS = params.get('search');
    const statusValue = params.get('status');
    console.log(statusValue, 'statusValue')

    const resuft = status.filter((item, index) =>{
        console.log(item, 'item')
        return parseInt(item.value) == parseInt(statusValue)
    })

    console.log(resuft, 'resuft')

    useEffect(() =>{
        setValueStatus(resuft[0].text)
    }, [])
    
    useEffect(() => {
        setValueInput({
            ...valueInput, searchName: nameSupplierS
        })
    }, [nameSupplierS])

    useEffect(() => {
        setValueInput({
            ...valueInput, statusPutValue: statusValue
        })
    }, [statusValue])

    useEffect(() => {
        console.log(valueInput, '====valueInput=========')
        dispatch({
            type: AppAction.FETCH_GET_DATA,
            payload: {
                data: valueInput
            }
        })
    })

    const searchModel = () => {
        console.log(valueInput)
        dispatch({
            type: AppAction.FETCH_GET_DATA,
            payload: {
                data: valueInput
            }
        })
    }
    const defaultStatus = statusValue ?? 0
    const defaultName = nameSupplierS ?? ""
    console.log(valueInput, 'search')
    useEffect(() => {
        history.push({
            pathname: '/listsupplier',
            search: "?" + new URLSearchParams({ search: searchValue ?? defaultName, status:  searchStatus.value ?? defaultStatus, page: 1 }).toString()
        })
    }, [searchValue || searchStatus])

    const resetSearch = () => {
        history.push({
            pathname: '/listsupplier',
            search: "?" + new URLSearchParams({ search: "", status: 0, page: 1 }).toString()
        })
    }


    return (
        <div className={styles["main"]}>
            <div className={styles["main__card"]}>
                <div className={styles["main__input"]}>
                    <img id={styles["focus"]} src="../../images/search.png" alt="search" />
                    <input onChange={e => updateInputValue({ value: e.target.value, name: e.target.name })} name='searchName' className={styles["main__input-first"]} type="text" placeholder='Tìm kiếm mã NCC, tên NCC, email,...' value={nameSupplierS} />
                </div>
                <div className={styles["main__input"]}>
                    <Dropdown className={styles["_select_input", "inputs_item"]} placeholder={"Trạng thái "} id="status" name="status"
                        Options={status}
                        onChange={onchangeStatus}
                        value={statusValue}
                        dataDefault={ValueStatus}
                    />
                </div>
                <div className={styles["main__input"]}>
                    <Dropdown className={styles["_select_input", "inputs_item"]} placeholder={"Địa chỉ"} id="status" name="status"
                        Options={address}
                        onChange={onchangeAddress}
                        value={ValueAddress.text}
                    />
                </div>
            </div>
            <div className={styles["main__fill"]}>
                <button onClick={resetSearch}>Thiết lập lại</button>
                <button onClick={searchModel} style={{ background: "#138300", color: "#fff" }}>Tìm kiếm</button>
                <button style={{ background: "#D2F2CC" }}><img src="../../images/fill.png" alt="" /></button>
                <button><img src="../../images/chitiet.png" alt="" /></button>
            </div>
        </div>
    )
}
export default MainContainer;