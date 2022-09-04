import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import styles from "./style.module.css";
import * as yup from "yup";
import instance from 'api/instance';
import { useHistory } from 'react-router-dom';


const schema = yup.object().shape({
    taiKhoan: yup.string().required("*Trường này bắt buộc nhập"),
    matKhau: yup.string().required("*Trường này bắt buộc nhập").min(8, "*Mật khẩu phải từ 8-16 ký tự").max(16),
    email: yup.string().required("*Trường này bắt buộc nhập").email("*Email không đúng định dạng"),
    hoTen: yup.string().required("*Trường này bắt buộc nhập").matches(/^[A-Za-z ]+$/g, "*Họ tên không đúng định dạng")
})

function Signup() {
    const history = useHistory()

    const [isLoading, setIsLoading] = useState(false)

    const forMik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            hoTen: "",
            soDt: "",
        },
        onSubmit: (values) => {
            console.log(values);
            const newUser = { ...values, maNhom: "GP02" }
            signUp(newUser)
        },
        validationSchema: schema,
    });

    const signUp = async (user) => {
        try {
            setIsLoading(true)
            const res = await instance.request({
                url: "/api/QuanLyNguoiDung/DangKy",
                method: "POST",
                data: user,
            });
            console.log(res.data);
            history.push("/signin")
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }

    };

    console.log(forMik.errors);
    return (
        <div>
            <h2 className={styles.title}>Sign up</h2>
            <form onSubmit={forMik.handleSubmit} className={styles.form}>
                <Input
                    name='taiKhoan'
                    onChange={forMik.handleChange}
                    onBlur={forMik.handleBlur}
                    className={styles.input}
                    type="text"
                    placeholder='Username'
                />
                {forMik.errors.taiKhoan && forMik.touched.taiKhoan && <p className={styles.errorText}>{forMik.errors.taiKhoan}</p>}
                <Input
                    name='hoTen'
                    onChange={forMik.handleChange}
                    onBlur={forMik.handleBlur}
                    className={styles.input}
                    type="text"
                    placeholder='Fullname'
                />
                {forMik.errors.hoTen && forMik.touched.hoTen && <p className={styles.errorText}>{forMik.errors.hoTen}</p>}
                <Input
                    name='matKhau'
                    onChange={forMik.handleChange}
                    onBlur={forMik.handleBlur}
                    className={styles.input}
                    type="password"
                    placeholder='Password'
                />
                {forMik.errors.matKhau && forMik.touched.matKhau && <p className={styles.errorText}>{forMik.errors.matKhau}</p>}
                <Input
                    name='email'
                    onChange={forMik.handleChange}
                    onBlur={forMik.handleBlur}
                    className={styles.input}
                    type="text"
                    placeholder='Emal'
                />
                {forMik.errors.email && forMik.touched.email && <p className={styles.errorText}>{forMik.errors.email}</p>}
                <Input
                    name='soDt'
                    onChange={forMik.handleChange}
                    onBlur={forMik.handleBlur}
                    className={styles.input}
                    type="text"
                    placeholder='Phone number'
                />
                {forMik.errors.soDt && forMik.touched.soDt && <p className={styles.errorText}>{forMik.errors.soDt}</p>}
                <Button loading={isLoading}
                    htmlType='submit'
                    className={styles.input}
                    type='primary'>submit</Button>
            </form>
        </div>
    )
}

export default Signup