import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/app/action';
import styles from "./HomeContainer.module.scss";
import "@fontsource/roboto/400.css";
import SidebarContainer from 'shared/components/sidebar/SidebarContainer';
import HeaderContainer from 'shared/components/header/HeaderContainer';
import MainContainer from 'shared/components/main/MainContainer';
import DataListContainer from 'shared/containers/datalist/DataListContainer';
import Footer from 'shared/components/footer/Footer';
import Paging from 'shared/components/paging/Paging';

function HomeContainer(props) {
    
    return (
        <div className={styles["HomeContainer"]}>
            <div className={styles["container"]}>
                <div className={styles["container__left"]}>
                    <SidebarContainer />
                </div>
                <div className={styles["container__right"]}>
                    <HeaderContainer category="Nhà cung cấp" title="Danh sách nhà cung cấp" description=""/>
                    <MainContainer />
                    <DataListContainer />
                   
                </div>
            </div>
            {/* <MenuContainer/> */}
        </div>
    )
}
export default HomeContainer;