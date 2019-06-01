import * as Yup from 'yup';

export default () => {
    return Yup.object().shape({
        username: Yup.string()
        .required('Vui lòng nhập tên đăng nhập'),
        // .max(20, 'Vui lòng nhập nhỏ hơn 20 kí tự')
        // .min(10, 'Vui lòng nhập hơn 10 ký tự'),
        password: Yup.string()
        .required('Vui lòng nhập mật khẩu của bạn')
        // .min(8, 'Vui lòng nhập hơn 10 ký tự')
        // .max(20, 'Vui lòng nhập hơn 20 ký tự'),
    });
};