import * as yup from 'yup'

const LoginSchema = yup.object().shape({
    email: yup.string().max(40).min(12).required('Email should be atleast of 12 characters'),
    password:yup.string().max(20).min(8).required('Password should be atleast of 8 characters')
})

export default LoginSchema