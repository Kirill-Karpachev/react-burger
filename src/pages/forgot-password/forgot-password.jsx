import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import forgotPasswordStyles from "./forgot-password.module.css";

function ForgotPassword() {
  const history = useHistory();
  const reset = useCallback(() => {
    history.replace({ pathname: "/reset-password" });
  }, [history]);
  return (
    <div className={forgotPasswordStyles.content}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <form className={`${forgotPasswordStyles.form} mt-6 mb-20`}>
        <EmailInput
          placeholder="Укажите e-mail"
          name={"email"}
          isIcon={false}
        />
        <Button onClick={reset} htmlType="button" type="primary" size="medium">
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
