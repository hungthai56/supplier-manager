import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory, Link } from "react-router-dom";
import "@fontsource/roboto/400.css";
import styles from "./UpdateTable.module.scss"
import SidebarContainer from 'shared/components/sidebar/SidebarContainer';
import HeaderContainer from 'shared/components/header/HeaderContainer';
import { useDispatch } from 'react-redux';
import AppAction from 'redux/app/action';
import AppActionHook from 'redux/supplier/action';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import InputType from 'shared/components/input-type/InputType';
import SelectBox from 'shared/components/selectbox/SelectBox';
import Validator from 'utils/Validator';
import * as Constants from "utils/Constants";

function UpdateTable() {
    let history = useHistory()

    const [lengthData, steLengthData] = useState(0)
    // console.log(lengthData, 'lengthData')
    const { data, loading } = useSelector(state => state.Supplier.getAllData)
    // console.log(data, 'data')

    const [categoryValue, setCategoryValue] = useState([
        { value: "Ngành may mặc", text: "Ngành may mặc" },
        { value: "Ngành bán", text: "Ngành bán" },
        { value: "Ngành mua", text: "Ngành mua" }
    ]);

    const [statusValue, setStatusValue] = useState(Constants.GET_STATUS);

    useEffect(() => {
        setStatusValue
    }, [])
    const { dataFill, loadingFill } = useSelector(state => state.Supplier.getAllData)
    // console.log(dataFill, 'dataFill')
    let { type, id } = useParams()
    // console.log(id)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: AppAction.FILL_DETAIL_DATA,
            payload: {
                data: id
            }
        })
        dispatch({
            type: AppActionHook.FETCH_GET_DATA,
            payload: {
                data: { deleteId: "", searchName: "" }
            }
        })
        dispatch({
            type: AppAction.FETCH_CITY_DATA,
            payload: {
                data: {}
            }
        })
        dispatch({
            type: AppAction.DEBT_DATA,
            payload: {
                data: {}
            }
        })
    }, [])

    useEffect(() => {
        if (type == 1) {
            setDataDetail([{}])
        } else if (type == -1) {
            setDataDetail(dataFill)
        }

    }, [dataFill])

    useEffect(() => {
        steLengthData(data.length)
    }, [data])

    const { dataCity, loadingCity } = useSelector(state => state.App.getCity)
    const { dataDist, loadingDist } = useSelector(state => state.App.getDist)
    const { dataWards, loadingWards } = useSelector(state => state.App.getWards)
    const { dataDebt, loadingDebt } = useSelector(state => state.App.getDebt)
    // console.log(dataCity)

    const [cityValue, setCityValue] = useState([{}])
    const [dist, setDist] = useState([{}])
    const [wards, setWards] = useState([{}])
    const [codeDebit, setCodeDebit] = useState([{}])

    useEffect(() => {
        setCityValue(dataCity)
    }, [dataCity])

    useEffect(() => {
        setCodeDebit(dataDebt)
    }, [dataDebt])

    useEffect(() => {
        setDist(dataDist)
    }, [dataDist])

    useEffect(() => {
        setWards(dataWards)
    }, [dataWards])

    const [dataDetail, setDataDetail] = useState();
    const onchangeCity = (e) => {
        dispatch({
            type: AppAction.FETCH_DIST_DATA,
            payload: {
                data: e.key
            }
        })

    }
    const onchangeDist = (e) => {
        dispatch({
            type: AppAction.FETCH_WARDS_DATA,
            payload: {
                data: e.key
            }
        })
    }

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        mode: 'onSubmit'
    });

    const onSubmit = (data, e) => {
        // console.log(id, 'id')
        if (id > 0) {
            dispatch({
                type: AppActionHook.ADD_DATA,
                payload: {
                    data: data
                }
            })
            console.log(data)
        }
        if (id == 0) {
            dispatch({
                type: AppActionHook.PUSH_DATA,
                payload: {
                    data: data
                }
            })
            // console.log(data)
        }

        // console.log(lengthData)
        // let path = `/listsupplier?search=&page=1`;
        // history.push(path);
    };

    return (
        <div className={styles["HomeContainer"]}>
            <div className={styles["container"]}>
                <div className={styles["container__left"]}>
                    <SidebarContainer />
                </div>
                <div className={styles["container__right"]}>
                    <HeaderContainer category="Nhà cung cấp" title="Danh sách nhà cung cấp" description="Chỉnh sửa nhà cung cấp" />

                    {dataDetail && dataDetail.map((item, index) => {
                        // console.log(item.status)
                        // console.log(cityValue, 'cityValue')
                        return <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "60px" }}>
                            <div className={styles["detail__content"]}>
                                <p style={{ marginBottom: "15px", fontWeight: 700 }}>Thông tin nhà cung cấp</p>
                                <div className={styles["detail__content-flex"]}>
                                    <div className={styles["flex__item"]}>
                                        <div className={styles["change_input"]}>
                                            <InputType validate={register("key", {})} type={"hidden"} defaultValue={item.key ?? lengthData + 1} />
                                            <InputType validate={register("supplierCode", {})} type={"hidden"} defaultValue={"NCC000" + lengthData + 1} />
                                            <label htmlFor={styles["nameInput"]}><span>Tên nhà cung cấp</span><span className={styles["sup_span"]}>*</span></label>
                                            <InputType validate={register("nameSupplier", {
                                                validate: (value) => {
                                                    const required_mess = Validator.required(value);
                                                    if (required_mess) {
                                                        return required_mess;
                                                    }
                                                    const minlength_mess = Validator.minLength(5)(value);
                                                    if (minlength_mess) {
                                                        return minlength_mess;
                                                    }
                                                    const maxlength_mess = Validator.maxLength(70)(value);
                                                    if (maxlength_mess) {
                                                        return maxlength_mess;
                                                    }
                                                    const checkchar = Validator.checkCharRegex(value);
                                                    if (checkchar) {
                                                        return checkchar;
                                                    }
                                                    return true;
                                                }
                                            })}
                                                type={"text"}
                                                placeholder={"Nhập tên nhà cung cấp"}
                                                classname={styles["form_input"]}
                                                defaultValue={item.nameSupplier}
                                            />
                                            {errors.nameSupplier && <p>{errors.nameSupplier.message}</p>}
                                        </div>
                                    </div>
                                    <div className={styles["flex__item"]}>
                                        <div className={styles["change_input"]}>
                                            <label htmlFor={styles["categoryInput"]}><span>Danh mục</span><span className={styles["sup_span"]}>*</span></label>
                                            <Controller
                                                control={control}
                                                defaultValue={item.category}
                                                rules={{ required: { value: true, message: "* Không được để trống" } }}
                                                name='category'
                                                render={({
                                                    field: { onChange, onBlur, value, name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                }) => (
                                                    <SelectBox
                                                        handleChange={(e) => onChange(e)}
                                                        name="catgory"
                                                        placeholder={"Danh mục"}
                                                        optionlist={categoryValue}
                                                        defaultValue={item.category}
                                                        onChangeSelect={onchangeCity}
                                                    ></SelectBox>
                                                )}
                                            />
                                            {errors.category && <p>{errors.category.message}</p>}
                                        </div>
                                    </div>
                                    <div className={styles["flex__item"]}>
                                        <div className={styles["change_input"]}>
                                            <label htmlFor={styles["phoneInput"]}><span>Số điện thoại</span><span className={styles["sup_span"]}>*</span></label>
                                            <InputType validate={register("phoneLink", {
                                                validate: (value) => {
                                                    const required_mess = Validator.required(value);
                                                    if (required_mess) {
                                                        return required_mess;
                                                    }
                                                    const minlength_mess = Validator.minLength(5)(value);
                                                    if (minlength_mess) {
                                                        return minlength_mess;
                                                    }
                                                    const maxlength_mess = Validator.maxLength(70)(value);
                                                    if (maxlength_mess) {
                                                        return maxlength_mess;
                                                    }
                                                    const checkchar = Validator.checkCharRegex(value);
                                                    if (checkchar) {
                                                        return checkchar;
                                                    }
                                                    return true;
                                                }
                                            })}
                                                type={"number"}
                                                placeholder={"Nhập số điện thoại"}
                                                classname={styles["form_input"]}
                                                defaultValue={item.phoneLink}
                                            />
                                            {errors.phoneLink && <p>{errors.phoneLink.message}</p>}
                                        </div>
                                    </div>
                                    <div className={styles["flex__item"]}>
                                        <div className={styles["change_input"]}>
                                            <label htmlFor={styles["codeInput"]}><span>Mã code</span><span className={styles["sup_span"]}>*</span></label>
                                            <InputType validate={register("barcode", {
                                                validate: (value) => {
                                                    const required_mess = Validator.required(value);
                                                    if (required_mess) {
                                                        return required_mess;
                                                    }
                                                    const maxlength_mess = Validator.maxLength(70)(value);
                                                    if (maxlength_mess) {
                                                        return maxlength_mess;
                                                    }
                                                    const checkchar = Validator.checkCharRegex(value);
                                                    if (checkchar) {
                                                        return checkchar;
                                                    }
                                                    return true;
                                                }
                                            })}
                                                type={"text"}
                                                placeholder={"Nhập mã code"}
                                                classname={styles["form_input"]}
                                                defaultValue={item.barcode}
                                            />
                                            {errors.barcode && <p>{errors.barcode.message}</p>}
                                        </div>
                                    </div>

                                    <div className={styles["flex__item"]}>
                                        <div className={styles["change_input"]}>
                                            <label htmlFor={styles["categoryInput"]}><span>Công nợ</span><span className={styles["sup_span"]}>*</span></label>
                                            <Controller
                                                control={control}
                                                defaultValue={item.codeDebit}
                                                rules={{ required: { value: true, message: "* Không được để trống" } }}
                                                name='codeDebit'
                                                render={({
                                                    field: { onChange, onBlur, value, name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                }) => (
                                                    <SelectBox
                                                        handleChange={(e) => onChange(e)}
                                                        name="codeDebit"
                                                        placeholder={"Mã công nợ"}
                                                        optionlist={codeDebit ?? []}
                                                        defaultValue={item.codeDebit}
                                                        onChangeSelect={onchangeDist}
                                                    ></SelectBox>
                                                )}
                                            />
                                            {errors.codeDebit && <p>{errors.codeDebit.message}</p>}

                                        </div>
                                    </div>

                                    <div className={styles["flex__item"]}>
                                        <div className={styles["change_input"]}>
                                            <label htmlFor={styles["emailInput"]}><span>Email</span></label>
                                            <InputType validate={register("email", {
                                                validate: (value) => {
                                                    const required_mess = Validator.required(value);
                                                    if (required_mess) {
                                                        return required_mess;
                                                    }
                                                    const minlength_mess = Validator.minLength(5)(value);
                                                    if (minlength_mess) {
                                                        return minlength_mess;
                                                    }
                                                    const maxlength_mess = Validator.maxLength(70)(value);
                                                    if (maxlength_mess) {
                                                        return maxlength_mess;
                                                    }
                                                    return true;
                                                }
                                            })}
                                                type={"text"}
                                                placeholder={"abc@gmail.com"}
                                                classname={styles["form_input"]}
                                                defaultValue={item.email}
                                            />
                                            {errors.email && <p>{errors.email.message}</p>}
                                        </div>
                                    </div>

                                    <div className={styles["flex__item"]}>
                                        <div className={styles["change_input"]}>
                                            <label htmlFor={styles["categoryInput"]}><span>Tỉnh/ Thành phố</span><span className={styles["sup_span"]}>*</span></label>
                                            <Controller
                                                control={control}
                                                defaultValue={item.city}
                                                rules={{ required: { value: true, message: "* Không được để trống" } }}
                                                name='city'
                                                render={({
                                                    field: { onChange, onBlur, value, name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                }) => (
                                                    <SelectBox
                                                        handleChange={(e) => onChange(e)}
                                                        name="city"
                                                        placeholder={"Tỉnh/ Thành phố"}
                                                        optionlist={cityValue ?? []}
                                                        defaultValue={item.city}
                                                        onChangeSelect={onchangeCity}
                                                    ></SelectBox>
                                                )}
                                            />
                                            {errors.city && <p>{errors.city.message}</p>}
                                        </div>
                                    </div>

                                    <div className={styles["flex__item"]}>
                                        <div className={styles["change_input"]}>
                                            <label htmlFor={styles["categoryInput"]}><span>Quận/ Huyện</span><span className={styles["sup_span"]}>*</span></label>
                                            <Controller
                                                control={control}
                                                defaultValue={item.district}
                                                rules={{ required: { value: true, message: "* Không được để trống" } }}
                                                name='district'
                                                render={({
                                                    field: { onChange, onBlur, value, name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                }) => (
                                                    <SelectBox
                                                        handleChange={(e) => onChange(e)}
                                                        name="district"
                                                        placeholder={"Quận/ Huyện"}
                                                        optionlist={dist ?? []}
                                                        defaultValue={item.district}
                                                        onChangeSelect={onchangeDist}
                                                    ></SelectBox>
                                                )}
                                            />
                                            {errors.district && <p>{errors.district.message}</p>}
                                        </div>
                                    </div>

                                    <div className={styles["flex__item"]}>
                                        <div className={styles["change_input"]}>
                                            <label htmlFor={styles["categoryInput"]}><span>Phường/ Xã</span><span className={styles["sup_span"]}>*</span></label>
                                            <Controller
                                                control={control}
                                                defaultValue={item.wards}
                                                rules={{ required: { value: true, message: "* Không được để trống" } }}
                                                name='wards'
                                                render={({
                                                    field: { onChange, onBlur, value, name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                }) => (
                                                    <SelectBox
                                                        handleChange={(e) => onChange(e)}
                                                        name="wards"
                                                        placeholder={"Phường/ Xã"}
                                                        optionlist={wards ?? []}
                                                        defaultValue={item.wards}
                                                        onChangeSelect={onchangeDist}
                                                    ></SelectBox>
                                                )}
                                            />
                                            {errors.wards && <p>{errors.wards.message}</p>}

                                        </div>
                                    </div>

                                    <div className={styles["flex__item"]}>
                                        <div className={styles["change_input"]}>
                                            <label htmlFor={styles["addressInput"]}><span>Địa chỉ cụ thể</span ></label>
                                            <InputType validate={register("address", {})}
                                                type={"text"}
                                                placeholder={"Nhập địa chỉ cụ thể"}
                                                classname={styles["form_input"]}
                                                defaultValue={item.address}
                                            />
                                            {errors.address && <p>{errors.address.message}</p>}
                                        </div>
                                    </div>

                                    <div className={styles["flex__item"]}>
                                        <div className={styles["change_input"]}>
                                            <label htmlFor={styles["categoryInput"]}><span>Trạng thái</span><span className={styles["sup_span"]}>*</span></label>
                                            <Controller
                                                control={control}
                                                defaultValue={item.status}
                                                rules={{ required: { value: true, message: "* Không được để trống" } }}
                                                name='status'
                                                render={({
                                                    field: { onChange, onBlur, value, name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                }) => (
                                                    <SelectBox
                                                        handleChange={(e) => onChange(e)}
                                                        name="status"
                                                        placeholder={"Trạng thái"}
                                                        optionlist={statusValue ?? []}
                                                        defaultValue={item.status == 2 ? "Tạm dừng" : "Giao dịch"}
                                                        onChangeSelect={onchangeCity}
                                                    ></SelectBox>
                                                )}
                                            />
                                            {errors.status && <p>{errors.status.message}</p>}
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className={styles["_footer"]}>

                                <div className={styles["footer__load"]}>
                                    <button style={{ display: "flex", alignItems: "center", columnGap: "12px", background: "none", border: "none" }} type="button" onClick={() => history.goBack()}>
                                        <img src="../../images/back.svg" alt="back" />
                                        Trở lại</button>
                                    <div className={styles["load__button"]}>
                                        <button style={{ border: "1px solid #FF3434", color: "#FF3434" }} className={`delete__button`}>
                                            Huỷ bỏ
                                        </button>
                                        <input className={styles["edit__button"]} style={{ border: "1px solid #138300", color: "#fff", background: "#138300" }} type="submit" value="Lưu" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    })}
                </div>
            </div>
        </div>
    )
}
export default UpdateTable