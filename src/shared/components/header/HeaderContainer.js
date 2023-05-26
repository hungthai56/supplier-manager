import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/app/action';
import styles from "./HeaderContainer.module.scss"
import ModalHeaderContainer from 'shared/components/header/ModalHeaderContainer';

function openModal() {
    var element = document.getElementById("header__modal");
    element.classList.toggle("active");
}

function HeaderContainer(props) {
    const {category, title, description} = props
    const [isActive, setIsActive] = useState(false);
    const handleClick = event => {
        setIsActive(current => !current);
    };

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: AppAction.FETCH_SAMPLE_1,
            payload: {}
        })
    }, [])
    return (

        <div className={styles["right"]}>
            <div className={styles["header"]}>
                <div className={styles["header__left"]}>
                    <div className={styles["header__left-flex"]}>
                        <button onClick={handleClick} style={{ height: "36px" }} className={styles["header__left-button"]}><img src="../../images/iconplus.png" alt="logo Fm" /></button>
                        <div className={styles["header__tag"]}>
                            <h4 className={styles["uppercase"]}>Bán hàng</h4>
                            <div className={styles["line"]}></div>
                            <h4>{props.category}</h4>
                            <img src="../../images/right.png" alt="" />
                            <h4>{props.title}</h4>
                            <img src="../../images/right.png" alt="" />
                            <h4>{props.description}</h4>
                        </div>
                    </div>
                    <ModalHeaderContainer isActive={isActive}/>
                </div>
                <div className={styles["header__right"]}>
                    <div className={styles["header__icon"]}>
                        <button className={styles["header__left-button"]}><img src="../../images/listmenu.png" alt="listmenu" /></button>
                        <button className={styles["header__left-button"]}><img src="../../images/chart.png" alt="chart" /></button>
                        <button className={styles["header__left-button"]}><img src="../../images/taomoinhanh.png" alt="taomoinhanh" /></button>
                        <button className={styles["header__left-button"]}><img src="../../images/notication.png" alt="notication" /></button>
                        <button className={styles["header__left-button"]}><img src="../../images/home.png" alt="home" /></button>
                    </div>
                    <button style={{ height: "32px", width: "32px", background: "#FFCD29", borderRadius: "50px" }} className={styles["header__left-button"]}><img src="../../images/IconUser.png" alt="IconUser" /></button>
                </div>
            </div>
        </div>
    )
}

export default HeaderContainer;