import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/app/action';
import "./Footer.scss";
import "@fontsource/roboto/400.css";
import Paging from "../../components/paging/Paging"

function Footer(props) {
    const dispatch = useDispatch()

    return (
        <div className={`footer__paging`}>
           <Paging />
        </div>
    )
}
export default Footer;