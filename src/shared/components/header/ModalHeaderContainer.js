import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/app/action';
import styles from "./HeaderContainer.module.scss"
import { Link } from "react-router-dom";

function ModalHeaderContainer(isActive) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: AppAction.FETCH_SAMPLE_1,
            payload: {}
        })
    }, [])
    return (
        <div id={ isActive.isActive ? styles["active"] : ''} className={styles["header__modal"]}>
            <Link to={{ pathname: "/update/1/0"}}><span>Tạo nhà cung cấp</span></Link> 
        </div>
    )
}

export default ModalHeaderContainer;