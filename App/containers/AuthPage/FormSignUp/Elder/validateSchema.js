import * as Yup from 'yup';

export default () => {
    return Yup.object().shape({
        username: Yup.string()
        .required('Vui lòng nhập tên đăng nhập'),
        password: Yup.string()
        .required('Vui lòng nhập mật khẩu của bạn')
    });
};