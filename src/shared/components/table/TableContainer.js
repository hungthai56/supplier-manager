import React, { useState, useEffect, useRef } from 'react';
import styles from "./TableContainer.module.scss";
import CheckBox from '../checkbox/CheckBox';
import { Link, Route } from "react-router-dom";
import Paging from '../paging/Paging';
import DropButton from '../drop-button/DropButton';
import DropAction from '../drop-action/DropAction';
import { ToastContainer, toast } from 'react-toastify';
import * as Constants from "utils/Constants";
import 'react-toastify/dist/ReactToastify.css';

function TableRole(props) {
    const { Colums, DataRow, isboder, ischeckbox, WrapperStyle } = props
    // console.log(props)
    const [Values, setValues] = useState([]);
    const [check, setCheck] = useState(false);
    const [checkTable, setcheckTable] = useState("");
    const [Status, setStatus] = useState(Constants.GET_STATUS);

    const onChangeCheckbox = (e, value, isall) => {
        let result = [];
        if (!isall) {
            if (e.target.checked) {
                if (!Values.includes(value)) {
                    Values.push(value)
                    result = Values
                }
            } else {
                result = Values.filter(item => {
                    return value !== item
                })
            }
        } else {
            if (e.target.checked) {
                (DataRow || []).map((item, index) => {
                    result.push(item.key)
                })
            } else {
                result = []
            }

        }
        setValues(result)
        setCheck(!check)
    }

    const CloseButton = ({ closeToast }) => (
        <i
            className="material-icons"
            onClick={closeToast}
        >
            delete
        </i>
    );
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                closeButton={CloseButton}
                draggable
                pauseOnHover
                theme="light"

                style={{
                    zIndex: 99999999999
                }}
            />

            {/* <ToastContainer style={{position: "absolute",top: "60px",right: "40px"}} /> */}
            <div className={styles["table"]}>
                <div className={styles["table__row"]}>
                    <table className={styles["table__list"]}>
                        <thead>
                            <tr style={{ background: "#F2F2F2", fontWeight: 700 }}>
                                <td className={styles["t_head"]}><CheckBox
                                    id={"all_check"}
                                    value={"all_check"}
                                    style={{
                                        marginRight: "10px", width: "20px",
                                        height: "20px"
                                    }}
                                    onChange={(e) => onChangeCheckbox(e, "all_check", true)}
                                    checked={Values.length === DataRow.length}
                                >
                                </CheckBox></td>
                                {Colums && Colums.map((item, index) => {
                                    return <td className={styles["t_head"]}><span>{item.name}</span></td>
                                })}
                                <td><span>Trạng thái</span></td>
                                <td><span>Tác vụ</span></td>
                            </tr>
                        </thead>
                        <tbody>
                            {DataRow && DataRow.map((item, index) => {
                                // console.log(item, 'value hear')
                                var colorTable = "";
                                {
                                    Values && Values.map((itemColor, inline) => {
                                        if (item.key == itemColor) {
                                            colorTable = "set_color_table"
                                        }
                                    })
                                }
                                return <tr>
                                    <td className={styles[colorTable]}><CheckBox id={item.key} value={item.key}
                                        onChange={(e) => onChangeCheckbox(e, item.key, false)} checked={Values.includes(item.key)} >
                                    </CheckBox></td>
                                    {Colums && Colums.map((itemList, id) => {
                                        // console.log(itemList.dataIndex)
                                        return <td className={styles[colorTable]}>
                                            <Link className={styles["a__nonelink"]} to={{ pathname: "/detail/" + item.key, query: { item } }}><span style={itemList.css}>{item[itemList.dataIndex]}</span></Link> </td>
                                    })}
                                    <td><DropButton valuepr={item.status} table={item} statusValue={Status} value={item.status === 1 ? "Giao dịch" : "Tạm dừng"} style={{
                                            backgroundColor: item.status === 1 ? "#008A5A" : "#F85555",
                                        }} /></td>
                                    <td><DropAction deleteAction={item} toast={toast} /></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TableRole