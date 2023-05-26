import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AppActionHook from 'redux/supplier/action';
import "@fontsource/roboto/400.css";
import styles from "./DetailUserContainer.module.scss";
import SidebarContainer from 'shared/components/sidebar/SidebarContainer';
import HeaderContainer from 'shared/components/header/HeaderContainer';

function DetailUserContainer(props) {
    let history = useHistory()

    const [dataDetail, setDataDetail] = useState([])

    let { id } = useParams()

    const { dataFill, loading } = useSelector(state => state.Supplier.getAllData)
    console.log(dataFill, 'data')
    useEffect(() => {
        setDataDetail(dataFill)
    }, [dataFill])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: AppActionHook.FILL_DETAIL_DATA,
            payload: {
                data: id
            }
        })
    }, [])

    console.log(dataDetail)

    var colorName = ""
    return (
        <div className={styles["HomeContainer"]}>
            <div div className={styles["container"]}>
                <div className={styles["container__left"]}>
                    <SidebarContainer />
                </div>
                <div className={styles["container__right"]}>
                    <HeaderContainer />
                    <div className={styles["detail__title"]}>
                        <div className={styles["icon__reload"]}>
                            <img src="../../images/reload.svg" alt="" />
                            <span style={{ display: "block" }}>Trạng thái</span>

                            {/* <DropButton valuepr={status}/> */}
                        </div>
                    </div>

                    {dataDetail && dataDetail.map((item, index) => {
                        return <div className={styles["detail__content"]}>
                            <p style={{ marginBottom: "15px", fontWeight: 700 }}>Thông tin nhà cung cấp</p>

                            <div className={styles["detail__content-flex"]}>
                                <div className={styles["flex__item"]}>
                                    <ul>
                                        <li>Tên nhà cung cấp</li>
                                        <li>: {item.nameSupplier}</li>
                                    </ul>
                                </div>
                                <div className={styles["flex__item"]}>
                                    <ul>
                                        <li>Trạng thái</li>
                                        <li style={{ color: colorName, fontWeight: 700 }}>: {item.status == 2 ? <span style={{ color: "rgba(255, 52, 52, 1)" }}>Tạm dừng</span> : <span style={{ color: "#138300" }}>Giao dịch</span> } </li>
                                    </ul>
                                </div>
                                <div className={styles["flex__item"]}>
                                    <ul>
                                        <li>Danh mục</li>
                                        <li>: {item.category}</li>
                                    </ul>
                                </div>
                                <div className={styles["flex__item"]}>
                                    <ul>
                                        <li>Tỉnh/ Thành phố</li>
                                        <li>: {item.city}</li>
                                    </ul>
                                </div>
                                <div className={styles["flex__item"]}>
                                    <ul>
                                        <li>Điện thoại</li>
                                        <li>: {item.phoneLink}</li>
                                    </ul>
                                </div>
                                <div className={styles["flex__item"]}>
                                    <ul>
                                        <li>Quận/Huyện</li>
                                        <li>: {item.district}</li>
                                    </ul>
                                </div>
                                <div className={styles["flex__item"]}>
                                    <ul>
                                        <li>Email</li>
                                        <li>: {item.email}</li>
                                    </ul>
                                </div>
                                <div className={styles["flex__item"]}>
                                    <ul>
                                        <li>Phường/Xã</li>
                                        <li>: {item.wards}</li>
                                    </ul>
                                </div>
                                <div className={styles["flex__item"]}>
                                    <ul>
                                        <li>Công nợ</li>
                                        <li>: {item.codeDebit}</li>
                                    </ul>
                                </div>
                                <div className={styles["flex__item"]}>
                                    <ul>
                                        <li>Địa chỉ cụ thể</li>
                                        <li>: {item.address}</li>
                                    </ul>
                                </div>
                                <div className={styles["flex__item"]}>
                                    <ul>
                                        <li>Mã code</li>
                                        <li>: {item.barcode}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    })}

                    <div className={styles["_footer"]}>

                        <div className={styles["footer__load"]}>
                            <button style={{ display: "flex", alignItems: "center", columnGap: "12px", background: "none", border: "none" }} type="button" onClick={() => history.goBack()}>
                                <img src="../../images/back.svg" alt="back" />
                                Trở lại</button>
                            <div className={styles["load__button"]}>
                                <button style={{ border: "1px solid #FF3434", color: "#FF3434" }} className={styles["delete__button"]}>
                                    Xoá
                                </button>
                                <button style={{ border: "1px solid #138300", color: "#fff", background: "#138300" }} className={styles["edit__button"]}>
                                    Sửa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                {Datas && Datas.map((item, index) => {
                    if (index == idPage) {
                        return <tr>
                            {Colums && Colums.map((itemList, id) => {
                                return <td className={colorTable}><span style={itemList.css}>{item[itemList.dataIndex]}</span></td>
                            })}
                        </tr>
                    }
                })}
            </div> */}

        </div >
    )
}
export default DetailUserContainer