import * as Yup from 'yup';

export default () => {
    return Yup.object().shape({
        icid: Yup.string()
        .required('Vui lòng nhập Icid'),
        name: Yup.string()
        .required('Vui lòng nhập tên của bệnh nhân')
        .max(30, 'Vui lòng nhập nhỏ hơn 30 kí tự')
        .min(8, 'Vui lòng nhập lớn hơn 8 kí tự'),
    });
};