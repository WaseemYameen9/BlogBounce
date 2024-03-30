import styles from './Login.module.css'
import TextBox from '../TextBox/TextBox'
import { useFormik } from 'formik';
import {useNavigate } from 'react-router-dom'
import LoginSchema from '../Schemas/LoginSchema';
import { LoginAPI } from '../../API/internel';
import { useState } from 'react';
import {useDispatch } from 'react-redux';
import { setUser } from '../../Store/userSlice';
function Login()
{
    const[error, setError] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const HandleLogin = async () => {
        const data = {
            email:values.email,
            password:values.password
        }
        let res = await LoginAPI(data);
        if(res.status === 200)
        {
            const user = 
            {
                _id: res.data.User._id,
                email: res.data.User.email,
                auth: true
            }
            dispatch(setUser(user))
            navigate('/')
        }
        else
        {
            setError(res)
        }
        
    }
    const {values, touched, handleBlur, handleChange, errors} = useFormik({
        initialValues: {
            email:"",
            password:"",

        },
        validationSchema: LoginSchema 
    })



    return(
        <div className={styles.mainPage}>
        <div className={styles.pageHeader}>
            Login to Your Accout
        </div>
        <TextBox type="text" placeholder="Enter your Email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} errormessage={errors.email} error={errors.email && touched.email ? 1 : undefined}/>
        <TextBox type="password" placeholder="Enter your Password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password} errormessage={errors.password} error={errors.password && touched.password ? 1 : undefined}/>
        <button onClick={HandleLogin} className={styles.LoginButton} 
        disabled={errors.email || errors.password ? true : false}
        >
            Login
        </button>
        <p>{error}</p>
        </div>
        
    )
}

export default Login