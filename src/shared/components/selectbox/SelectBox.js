import React from 'react';
import styles from './SelectBox.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';

function SelectBox(props) {
    const { optionlist, value, placeholder, validate, name, id, handleChange, defaultValue, onChangeSelect } = props;
    // console.log(optionlist)
    const [IsClick, setIsClick] = useState(false);
    const [ListOption, setListOption] = useState(optionlist);
    const [SelectedValue, setSelectedValue] = useState({});
    // console.log(SelectedValue)
    useEffect(() => {
        if(value) {
            handleChange(value);
            ListOption.map((item) => {
                // console.log(item,'optionlist')
                if(item.value === value) setSelectedValue(item);
            }) 
        }
    }, [value,ListOption]);

    const handleClickSelectBox = () => {
        setIsClick(!IsClick);
    }
 
    const handleSearchText = (textsearch) => {
        let newoptlist = new Array();
        if(textsearch.length >= 0)  {
            ListOption.map((item) => {
                let text = item.text;
                if(text.search(textsearch) >= 0) newoptlist.push(item);
            }) 
        } else newoptlist = ListOption;
       
        setListOption(newoptlist);
    }

    const handleChangeOpt = (opt) => {
        setSelectedValue(opt);
    }

    const handleDeleteSelectOpt = () => {
        setSelectedValue({idkey: "",text: "", value: ""});
        handleChange("");
    }

    const handleOnChangeVal = (e) => {
        console.log(e);
    }

    let input_hidden;
    if (validate) {
        input_hidden = <input {...validate} type="hidden" id={id} value={SelectedValue.value ?? ""} onChange={(e) => handleOnChangeVal(e)}/>;
    } else {
        input_hidden = <input name={name} type="hidden" id={id} value={SelectedValue.value ?? "" } 
        onChange={
            (e) => handleOnChangeVal(e)
        }/>;
    }

    // console.log(validate);
    return (
        <div className={styles['select']} onClick={handleClickSelectBox}>
            <div className={styles['selectbox']}>
                <div className={styles['w-100']}>
                    <div className={styles['d-flex']}>
                        <input defaultValue={defaultValue} type="text" placeholder={placeholder} value={SelectedValue.text} onChange={(e) => handleSearchText(e.target.value)} />
                        {SelectedValue.text && <div className={styles['d-flex']} style={{paddingRight: "20px",zIndex: 1}} onClick={() => handleDeleteSelectOpt()}><img src='./images/clearicon.png' style={{right: "30px"}} /></div>}
                    </div>
                </div>
                <img src="./images/downsearch.png" alt="" />
            </div>
            {input_hidden}
            <div className={`${styles["selectbox_list"]} ${IsClick ? styles["show"] : styles["hide"]}`} >
                {optionlist.map((opt_item, key) => {
                    return (
                        <div key={key} className= {`${styles["selectbox_item"]} ${opt_item.value === SelectedValue.value ? styles["selected"]: ""}`} onClick={() => {handleChangeOpt(opt_item), handleChange(opt_item.value), onChangeSelect({key:opt_item.idkey,value: opt_item.value})}}>{opt_item.text}</div>
                    )
                })}
                
                {/* <div className='selectbox_item'>Ẩn</div> */}
            </div>
        </div>
    );
}

export default SelectBox;