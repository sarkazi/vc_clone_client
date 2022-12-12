import * as yup from "yup";

export const loginFormSchema = yup.object({
  email: yup.string().email("Неверный формат почты").required("Введите email"),
  password: yup
    .string()
    .min(6, "Минимум 6 символов")
    .required("Введите пароль"),
});

export const registerFormSchema = yup
  .object({
    name: yup.string().required("Введите Имя и Фамилию"),
  })
  .concat(loginFormSchema);
