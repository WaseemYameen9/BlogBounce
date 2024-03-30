import styles from './SignUp.module.css'
import TextBox from '../TextBox/TextBox'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import signUpSchema from '../Schemas/SignUpSchema';
import {sigup} from '../../API/internel';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setUser } from '../../Store/userSlice';
function SignUp()
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    

    const HandleLogin = async () => {
        const data = {
            name:values.name,
            phoneNumber:values.phoneNumber,
            address:values.address,
            email: values.email,
            password:values.password
        };

        const response = await sigup(data);
        if(response.status === 200)
        {
            let user = {
                _id: response.data.User._id,
                email: response.data.User.email,
                auth: true
            }
            dispatch(setUser(user));
            navigate('/');
        }
        else if(response.code === "ERR_BAD_REQUEST"){
            setError(response.message);
        }
        else
        {
            setError("Hi");
        }
        
    }


    const {values, touched, handleBlur, handleChange, errors} = useFormik({
        initialValues: {
            name:"",
            phoneNumber:"",
            address:"",
            email:"",
            password:"",

        },
        validationSchema: signUpSchema 
    })
    return(
        <div className={styles.mainPage}>
        <div className={styles.pageHeader}>
            Welcome to <span className={styles.logo}>CoinBounce</span>
        </div>
        <TextBox type="text" placeholder="Enter your Name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} errormessage={errors.name} error={errors.name && touched.name ? 1 : undefined} />
        <TextBox type="text" placeholder="Enter your Phone Number" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} errormessage={errors.phoneNumber} error={errors.phoneNumber && touched.phoneNumber ? 1 : undefined} />
        <TextBox type="text" placeholder="Enter your Address" name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} errormessage={errors.address} error={errors.address && touched.address ? 1 : undefined} />
        <TextBox type="text" placeholder="Enter your Email" value={values.email} name="email" onChange={handleChange} onBlur={handleBlur} errormessage={errors.email} error={errors.email && touched.email ? 1 : undefined} />
        <TextBox type="password" placeholder="Enter your Password" value={values.password} name="password" onChange={handleChange} onBlur={handleBlur} errormessage={errors.password} error={errors.password && touched.password ? 1 : undefined} />
        <p className={styles.error}>{error}</p>
        <button onClick={HandleLogin} className={styles.LoginButton}>
            Create Account
        </button>
        </div>
    )
}

export default SignUp