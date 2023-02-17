import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { forgetPassword } from "../../services/actions/reset-password";
import { useForm } from "../../utils/use-form";
import forgotPasswordStyles from "./forgot-password.module.css";
import { FC, FormEvent } from "react";
import { useDispatch } from "../../utils/hooks";

const ForgotPassword: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { values, handleChange } = useForm({ email: "" });

  const forgetPasswordForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgetPassword(values, () => history.replace("/reset-password")));
  };

  return (
    <div className={forgotPasswordStyles.content}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <form
        onSubmit={forgetPasswordForm}
        className={`${forgotPasswordStyles.form} mt-6 mb-20`}
      >
        <EmailInput
          placeholder="Укажите e-mail"
          name={"email"}
          isIcon={false}
          value={values.email}
          onChange={(e) => handleChange(e)}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?{" "}
          <Link
            className={forgotPasswordStyles.link}
            to={{ pathname: "/login" }}
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
