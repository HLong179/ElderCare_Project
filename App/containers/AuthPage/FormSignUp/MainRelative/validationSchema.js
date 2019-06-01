import * as Yup from 'yup';

const commonMaxLength = 15;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


export default () => {
    return Yup.object().shape({
      name: Yup.string()
        .required("Vui lòng nhập tên của bệnh nhân")
        .max(30, "Vui lòng nhập nhỏ hơn 30 kí tự")
        .min(8, "Vui lòng nhập lớn hơn 8 kí tự"),

      email: Yup.string().required("Vui lòng nhập email"),

      phone: Yup
      .string()
      .matches(phoneRegExp, 'Vui lòng nhập số điện thoại hợp lệ')
      .required('Vui lòng nhập số điện thoại')
      .test('len', 'Vui lòng nhập nhỏ hơn 15 kí tự', (val) => val && val.length < commonMaxLength + 1),

      address: Yup.string()
      .required("Vui lòng nhập địa chỉ")
      .max(30, "Vui lòng nhập nhỏ hơn 30 kí tự")
      .min(8, "Vui lòng nhập lớn hơn 8 kí tự"),

      username: Yup.string()
      .required("Vui lòng nhập tên đăng nhập")
      .max(30, "Vui lòng nhập nhỏ hơn 30 kí tự")
      .min(8, "Vui lòng nhập lớn hơn 8 kí tự"),

      password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .max(30, "Vui lòng nhập nhỏ hơn 30 kí tự")
      .min(8, "Vui lòng nhập lớn hơn 8 kí tự"),

      confirmPassword: Yup.string()
      .required("Vui lòng nhập lại mật khẩu")
      .oneOf([Yup.ref('password')],'Mật khẩu không khớp'),
    });
};