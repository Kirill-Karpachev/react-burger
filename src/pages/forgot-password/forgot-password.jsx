import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { forgetPassword } from "../../services/actions/reset-password";
import forgotPasswordStyles from "./forgot-password.module.css";

function ForgotPassword() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const forgetPasswordForm = (e) => {
    e.preventDefault();
    dispatch(
      forgetPassword({ email: email }, () => history.replace("/reset-password"))
    );
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
}

export default ForgotPassword;
