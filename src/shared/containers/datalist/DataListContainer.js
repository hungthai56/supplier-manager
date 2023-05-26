import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/supplier/action';
import "@fontsource/roboto/400.css";
import styles from "./DataListContainer.module.scss"
import TableRole from "../../components/table/TableContainer"
import Paging from 'shared/components/paging/Paging';
import { useHistory, useLocation } from 'react-router-dom';
import * as Constants from "utils/Constants";
function DataListContainer(props) {

    const dispatch = useDispatch()
    let history = useHistory()
    let location = useLocation();
    const params = new URLSearchParams(location.search);
    const namnsup = params.get('search');
    const statusValue = params.get('status');
    const pageNumber = params.get('page');
    useEffect(() => {
        setCurrentPage(pageNumber ?? 1)
    }, [])


    const { data, detail, loading } = useSelector(state => state.Supplier.getAllData)
    // console.log(data, 'data')
    const [OptionsPagi, setOptionsPagi] = useState([]);
    const [ValueSelectLimit, setValueSelectPage] = useState({});

    const [CurrentPage, setCurrentPage] = useState(1);
    const [TotalRecord, setTotalRecord] = useState(0);

    // console.log("chay cai thứ nhất")
    const [Colums, setColums] = useState(Constants.GET_TITLE_DATA)
    const [DataRow, setDataRow] = useState([]);
    // console.log(DataRow, 'DataRow')
    const [DataRowShow, setDataRowShow] = useState([]);

    useEffect(() => {
        // console.log("chay api")
        dispatch({
            type: AppAction.FETCH_GET_DATA,
            payload: {
                data: { deleteId: "", searchName: "" }
            }
        })
    }, [data?.deleted || detail])

    useEffect(() => {
        // console.log("chạy cái thứ ba")
        var deleteItem = []
        data.map((item, index) =>{
            if (item.deleted != true) {
                deleteItem.push(item)
            }
        })
        // console.log(deleteItem, 'deleteItem');
        setDataRow(deleteItem)
    }, [data?.deleted || data || detail])

    useEffect(() => {
        setTotalRecord(DataRow.length)
        renderOptionlimit();
    }, [DataRow])
    useEffect(() => {
        // console.log("chạy cái thứ tư")
        const indexOfLastData = CurrentPage * ValueSelectLimit.value;
        const indexOfFirstData = indexOfLastData - ValueSelectLimit.value;
        const currentData = DataRow.slice(indexOfFirstData, indexOfLastData);
        setDataRowShow(currentData)
        // console.log(indexOfLastData, indexOfFirstData)
    }, [ValueSelectLimit, CurrentPage])
   

    const renderOptionlimit = () => {
        const result = [];

        const dataLen = DataRow.length;
        for (let i = 1; i <= 10; i++) {
            // console.log(dataLen, 'dataLen')
            const dataPerpage = Math.ceil(((dataLen) / 5)) * i
            // console.log(dataPerpage, 'dataPerpage')
            result.push({ value: dataPerpage, text: dataPerpage });

        }
        setValueSelectPage(result[0]);
        setOptionsPagi(result);
    }
    const getStatusText = (e) => {
        return (Options.filter(item => {
            return e === item.value
        }))[0].text
    }
    
    const onChangeSelectNumPages = (e) => {
        setValueSelectPage(e)
    }
    const OnchangePage = (e, i) => {
        setCurrentPage(i)
    }

    const OnchangePageNext = (e, i) => {
        setCurrentPage(i)
    }

    const OnchangePagePre = (e, i) => {
        setCurrentPage(i)
    }

    useEffect(() => {
        history.push({
            pathname: '/listsupplier',
            search: "?" + new URLSearchParams({ search: namnsup, status: statusValue, page: CurrentPage }).toString()
        })
    }, [CurrentPage])

    // console.log("chay cai hai")
    return (
        <>
            <TableRole Colums={Colums} DataRow={DataRowShow} />
            <div className={styles["footer"]}>
                <Paging style={{ marginTop: "5px", display: "flex", alignItems: "center", background: "#fff", borderRadius: "3px", justifyContent: "end", padding: "4px 10px" }}
                    Options={OptionsPagi}
                    OnChangeSelectNumPages={onChangeSelectNumPages}
                    ValueSelectLimit={ValueSelectLimit}
                    CurrentPage={CurrentPage}
                    ShowStatus={true}
                    LimitButton={10}
                    OnclickButtonChangePage={OnchangePage}
                    ShowNextPre={true}
                    OnclickButtonNext={OnchangePageNext}
                    OnclickButtonPre={OnchangePagePre}
                    TotalRecord={TotalRecord}
                />
            </div>
        </>

    )
}
export default DataListContainer