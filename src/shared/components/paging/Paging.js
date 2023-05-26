import React, { useState, useEffect, useRef } from 'react';
import styles from "./Paging.module.scss"
import DropDown from "../../components/dropdown/Dropdown"
import DropdownPaging from '../dropdown-paging/DropdownPaging';
function Paging(props) {

    const { Options, value, ValueSelectLimit, id, placeholder, onChange, isHover, icon, top, style, OnChangeSelectNumPages, ShowStatus, CurrentPage, TotalRecord } = props;

    const [ValueSelect, setValueSelect] = useState({});
    const [Statuspage, setStatuspage] = useState("Hiển thị từ - trên tổng");

    useEffect(() => {
        setValueSelect(ValueSelectLimit)
    }, [ValueSelectLimit]);

    const onchangeStatus = (e) => {
        setValueSelect(e)
        OnChangeSelectNumPages(e)
    }
    useEffect(() => {
        setValueSelect(ValueSelectLimit)
        setShowStatus()

    }, []);

    useEffect(() => {
        setShowStatus()

    }, [ValueSelect]);
    useEffect(() => {

        setShowStatus()

    }, [ValueSelectLimit, CurrentPage]);


    const setShowStatus = () => {
        const start = ((CurrentPage - 1) * ValueSelect.value) + 1;
        const end = (CurrentPage * (ValueSelect.value));
        setStatuspage(`Hiển thị từ ${start ?? ""} - ${end} trên tổng ${TotalRecord ?? ""}`)
    }
    return (
        <div className={styles["Pagination", "stand_radius"]} id={styles["pagination"]} style={{ ...style }}>
            <div className={styles["chose_row_show"]}>
                <div>
                <p style={{ marginRight: "10px", width: "50px" }}>Hiển thị</p>
                </div>
                <DropdownPaging className={styles["_select_input", "inputs_item"]} placeholder={"Trạng thái "} id={styles["status"]} name="status"
                    Options={Options}
                    onChange={onchangeStatus}
                    value={ValueSelect.value}
                    isHover={true}
                    icon={
                        <img src='images/ic_dropdown_small.svg' className={styles["icon_"]} style={{
                            width: "24px", height: "24px"
                        }} />
                    }
                />
            </div>
            {ShowStatus && <div className={styles["_show_detail"]}>
                <span style={{ marginRight: "10px" }}>{Statuspage}</span>

            </div>
            }
            <div className={styles["pagination_wrrap"]}>

                <ButtonPage {...props} limit={ValueSelect.value} />


            </div>
        </div>
    )
}


function ButtonPage(props) {
    const { TotalRecord, CurrentPage, OnclickButtonChangePage, OnclickButtonNext, OnclickButtonPre, limit, LimitButton } = props;
    // console.log(props)
    const renders = [];
    let totalVisiblePages = LimitButton
    let TotalPage = Math.ceil((TotalRecord / limit))

    let startPage = Math.max(1, CurrentPage - Math.floor(totalVisiblePages / 2));
    let endPage = Math.min(TotalPage, startPage + totalVisiblePages - 1);
    if (endPage - startPage < totalVisiblePages - 1) {
        startPage = Math.max(1, endPage - totalVisiblePages + 1);
    }
    if (TotalPage) {
        for (let i = startPage; i <= endPage; i++) {
            renders.push(<button className={ CurrentPage == i ? styles["active"] : styles["reset_btn", "item", "item_left"]}
                onClick={(e) => OnclickButtonChangePage(e, i)}
            >
                {i}
            </button>)
        }
    }
    return (<div className={styles["flex__btn"]}>
        <button className='reset_btn item item_left' onClick={(e) => { OnclickButtonPre(e, CurrentPage <= 1 ? 1 : CurrentPage - 1) }}>
            <img src='images/prov.svg' className='icon_' style={{
                width: "24px", height: "24px", padding: "3px"
            }} />
        </button>
        {renders.map((item, index) => {
            return <div key={index}>{item}</div>

        })}
        <button className='reset_btn item item_right' onClick={(e) => OnclickButtonNext(e, CurrentPage >= TotalPage ? TotalPage : CurrentPage + 1)}>
            <img src='images/next.svg' className='icon_' style={{
                width: "24px", height: "24px", padding: "3px"
            }} />
        </button>
    </div>

    )


}


export default Paging;