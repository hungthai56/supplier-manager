import React, { useState, useRef, useEffect } from 'react';
import AppActionHook from 'redux/supplier/action';
import styles from "./DropAction.module.scss"
import AppAction from 'redux/app/action';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function DropAction(props) {
    const { deleteAction, toast } = props;

    const dispatch = useDispatch()

    const notify = () => toast.info(<div><span>Bạn đang xoá nhà cung cấp!</span></div>, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        closeButton: <button onClick={() => clearRemove()} style={{ height: "28px", border: "none", background: "#D8D7D7", fontWeight: 700, color: "#333333", borderRadius: "3px", marginTop: "11px" }}>Hoàn tác</button>,
        draggablePercent: 60
    });

    var timer = ""
    const clearRemove = () => {
        clearTimeout(timer)
    }

    const removeData = () => {
        timer = setTimeout(() => {
            deleteAction.deleted = true
            
            dispatch({
                type: AppActionHook.ADD_DATA,
                payload: {
                    data: deleteAction
                }
            })

            console.log(deleteAction, 'deleteAction')

            toast.error('Xoá dữ liệu thành công!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                closeButton: false
            });
        }, 3000);

        return () => {
            clearTimeout(timer)
        }

    }

    const [isClick, setIsClick] = useState(false);
    return (
        <div className={styles["button__status"]} onClick={() => { setIsClick(!isClick) }}>
            <div className={`${isClick ? styles["check__action"] : ""}`}>
                <button className={styles["setting_role"]}>
                    <img src="../../images/tacvu.png" alt="" />
                </button>
                <div className={styles["action__change"]}>
                    <ul>
                        <li><Link to={{ pathname: "/update/-1/" + deleteAction.key }} ><img src="../../images/edit.svg" alt="edit" /> Sửa</Link></li>
                        <li onClick={() => removeData()}>
                            <button onClick={notify}> <img src="../../images/delete.svg" alt="delete" /> Xoá</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default DropAction;