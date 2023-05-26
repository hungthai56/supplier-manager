import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/app/action';
import styles from "./SidebarContainer.module.scss"
import { event } from 'jquery';
import { NavLink } from "react-router-dom";

function openTab(evt, nameTab) {

}

function SidebarContainer(props) {
    const dispatch = useDispatch()
    // const { data, loading } = useSelector(state => state.App.sampleData)
    useEffect(() => {
        dispatch({
            type: AppAction.FETCH_SAMPLE_1,
            payload: {}
        })
    }, [])
    return (
        <div className={styles["left"]}>
            {/* create title header ui */}
            <div className={styles["container__title-shadow"]}>
                <button className={styles["container__button"]}><img src="../../images/iconback.png" alt="logo Fm" /></button>
                <img style={{ marginLeft: "50px" }} src="../../images/Logo.png" alt="logo Fm" />
            </div>

            {/* create item menu ui */}
            <div className="container__menu">
                <ul className={styles["container__ul"]}>

                    <li className={styles["container__item"]}>
                        <NavLink to="/dashboard" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? styles["active"] : ""}>
                            <img src="../../images/danhmuc1.png" alt="" />
                            <span>Tổng quan</span>
                        </NavLink>
                    </li>
                    <li className={styles["container__item"]}>
                        <NavLink to="/user" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? styles["active"] : ""}>
                            <img src="../../images/danhmuc.png" alt="" />
                            <span>Danh mục NCC</span>
                        </NavLink>
                    </li>
                    <li className={styles["container__item"]}>
                        <NavLink to="/listsupplier?search=" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? styles["active"] : ""}>
                            <img src="../../images/danhmuc2.png" alt="" />
                            <span>Danh sách NCC</span>
                        </NavLink>
                    </li>
                    <li className={styles["container__item"]}>
                        <NavLink to="/history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? styles["active"] : ""}>
                            <img src="../../images/danhmuc3.png" alt="" />
                            <span>Lịch sử đặt hàng</span>
                        </NavLink>
                    </li>
                    <li className={styles["container__item"]}>
                        <NavLink to="/history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? styles["active"] : ""}>
                            <img src="../../images/danhmuc4.png" alt="" />
                            <span>Bảng báo giá</span>
                        </NavLink>
                    </li>
                    <li className={styles["container__item"]}>
                        <NavLink to="/history" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? styles["active"] : ""}>
                            <img src="../../images/danhmuc5.png" alt="" />
                            <span>Lịch sử theo dõi</span>
                        </NavLink>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default SidebarContainer;