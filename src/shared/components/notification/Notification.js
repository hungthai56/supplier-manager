import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import styles from "./Notification.module.scss"
function Notification(props) {
    const Notifis = { amount: 0, top: 55 };
    const checkAmountNoti = () => {
        Notifis.amount++;
        Notifis.top = Notifis.amount * Notifis.top;
        return Notifis
    }
    const AnimateProcess = () => {

        console.log('====================================');
        console.log(Notifis);
        console.log('====================================');
    }
    const SetTimeoutNoti = (item) => {
        console.log(item)
        const timer = setTimeout(() => {
            item.classList.add("hide")
            setTimeout(() => {
                item.remove()
            }, 500)

        }, 3000);

        return () =>{
            clearTimeout(timer)
        }
    }

    return {
        Notifis: Notifis,
        warnning: (props) => {
            const i = checkAmountNoti();
            document.body.insertAdjacentHTML("beforeend", `<div class='notification_fxxx' id="notification_fxxx${i.amount}" style="top:${i.top}px"></div>`)
            const myDiv = document.getElementById(`notification_fxxx${i.amount}`);
            myDiv.classList.add("show");
            ReactDOM.render(<Warnning  {...props} color={"#FFCD29"} />, myDiv);
        },
        primary: (props) => {
            const i = checkAmountNoti();
            document.body.insertAdjacentHTML("beforeend", `<div id="notification_fxxx${i.amount}"></div>`)
            const myDiv = document.getElementById(`notification_fxxx${i.amount}`);
            myDiv.classList.add("show");
            ReactDOM.render(<Primary  {...props} />, myDiv);

            SetTimeoutNoti(myDiv)

            // const [isActive, setIsActive] = useState(false);

            // const removeItem = event => {
            //     setIsActive(current => !current);

            //     const timerId = setTimeout(() => {
            //         setIsActive(false)
            //         console.log(isActive)
            //     }, 3000)

            //     return () => clearTimeout(timerId);
            // };
            // return (
            //     <div>
            //         <button onClick={removeItem}>test noti</button>
            //         <div className={`notification ${isActive ? "fadeInUp" : ""}`}>
            //             <div className={`notification__fade`}>
            //                 <img src="../../images/request.svg" alt="" />
            //                 <span>Đang xoá nhà cung cấp</span>
            //                 <button>Hoàn tác</button>
            //             </div>
            //         </div>
            //     </div>
            // )

        },
        success: (props) => {
            checkAmountNoti();
            const i = checkAmountNoti();
            document.body.insertAdjacentHTML("beforeend", `<div class='notification_fxxx' id="notification_fxxx${i}"></div>`)
            const myDiv = document.getElementById(`notification_fxxx${i}`);
            myDiv.classList.add("show");
            ReactDOM.render(<Primary  {...props} color={"#138300"} />, myDiv);
            SetTimeoutNoti(myDiv)
        }
    }
}
function NotificationWrrap(props) {
    return (<div>
        {props.children}
    </div>)
}
function Warnning(props) {
    return (
        <NotificationWrrap {...props}>
            {/* <div className={`notification-warning notification_item`} id='notification-warning' >
                {props.icon && <div className='icon_no'>{props.icon}</div>}
                {!props.icon && <div className='icon_no'><img src='images/ic_question.svg' className='icon_' /> </div>}
                {props.content && <div className='content_no'>{props.content}</div>}
                {props.action && <div className='action_no'>{props.action}</div>}
            </div> */}
        </NotificationWrrap >
    )
}

function Primary(props) {
    return (
        <NotificationWrrap {...props}>
            <div className={styles["notification_alert"]}>
                <div className={styles["notification__fade"]}>
                    <img src="../../images/request.svg" alt="" />
                    <span>{props.content}</span>
                    <button>Hoàn tác</button>
                </div>
            </div>
            {/* <div className={`notification-warning notification_item`} id='notification-warning'>
                {props.icon && <div className='icon_no'>{props.icon}</div>}
                {!props.icon && <div className='icon_no'><img src='images/ic_question.svg' className='icon_' /> </div>}
                {props.content && <div className='content_no'>{props.content}</div>}
                {props.action && <div className='action_no'>{props.action}</div>}
            </div> */}
        </NotificationWrrap >
    )
}
// const Notification = () => { return Notification() };
export default Notification();