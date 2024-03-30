import * as yup from 'yup'

const signUpSchema = yup.object().shape({
    name: yup.string().max(30).min(3).required("Name should be atleast of 3 and max 30 characters"),
    phoneNumber: yup.string().max(15).min(11).required("Phone Number should be atleast of 11 and max 15 digits"),
    address: yup.string().max(50).min(5).required("Enter valid Address..(min 5 characters)"),
    email: yup.string().max(40).min(12).required("Enter correct Email (min 12 characters)"),
    password: yup.string().max(20).min(8).required("Password should be atleast of 8 characters")

});

export default signUpSchema