import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from "yup";
import styles from "./style.module.css";
import instance from 'api/instance';
import { SET_PROFILE } from 'features/authentication/action';
import { useDispatch } from 'react-redux';


const schema = yup.object().shape({
  taiKhoan: yup.string().required("*Trường này bắt buộc nhập"),
  matKhau: yup.string().required("*Trường này bắt buộc nhập"),
})

function Signin() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const newUser = { ...values, maNhom: "GP02" }
      signIn(newUser)
    },
    validationSchema: schema
  })

  const signIn = async (user) => {
    try {
      setIsLoading(true)
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
      });
      const profile = { ...res.data.content };
      delete profile.accessToken;
      localStorage.setItem("token", res.data.content.accessToken)

      dispatch({ type: SET_PROFILE, payload: profile })
      console.log(res.data);
      
    } catch (err) {
      console.log(err);

    } finally {
      setIsLoading(false)
    }
  };

  console.log(formik.errors);
  return (
    <div>
      <h2 className={styles.title}>Đăng nhập</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <Input
          name='taiKhoan'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="text"
          placeholder='Tài khoản'
        />
        {formik.errors.taiKhoan && formik.touched.taiKhoan && <p className={styles.errorText}>{formik.errors.taiKhoan}</p>}
        <Input
          name='matKhau'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="password"
          placeholder="Mật khẩu"
        />
        {formik.errors.matKhau && formik.touched.matKhau && <p className={styles.errorText}>{formik.errors.matKhau}</p>}
        <Button loading={isLoading}
          htmlType='submit'
          className={styles.input} type='primary'>Đăng Nhập</Button>
      </form>

    </div>
  )
}

export default Signin