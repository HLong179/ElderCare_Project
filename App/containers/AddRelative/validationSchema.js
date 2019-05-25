import * as Yup from "yup";

export default () => {
  return Yup.object().shape({
    fullname: Yup.string().required('Vui lòng nhập họ và tên'),
    email: Yup.string().required(),
    phone: Yup.string().required(''),
    username: Yup.string()
      .required()
      .max(30, 'Tên đăng nhập nhỏ hơn 30 kí tự')
      .min(6, 'Tên đăng nhập lớn hơn 6 kí tự'),
    
    password: Yup.string().required()
    .max(30, 'Mật khẩu phải nhỏ hơn 30 kí tự')
    .min(6, 'Mật khẩu phải lớn hơn 6 kí tự'),
  });
};
