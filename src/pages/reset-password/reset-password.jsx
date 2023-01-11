import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import resetPasswordStyles from "./reset-password.module.css";
import { useDispatch, useSelector } from "react-redux";
import { recoverPassword } from "../../services/actions/reset-password";

function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const { successEmail } = useSelector((store) => store.resetPassword);

  const resetPasswordForm = (e) => {
    e.preventDefault();
    const form = {
      password,
      token,
    };
    dispatch(recoverPassword(form, () => history.replace("/login")));
  };

  if (!successEmail) {
    return <Redirect to={"/forgot-password"} />;
  }

  return (
    <div className={resetPasswordStyles.content}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <form
        onSubmit={resetPasswordForm}
        className={`${resetPasswordStyles.form} mt-6 mb-20`}
      >
        <PasswordInput
          placeholder="Введите новый пароль"
          name={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          errorText={"Ошибка"}
          size={"default"}
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?{" "}
          <Link
            className={resetPasswordStyles.link}
            to={{ pathname: "/login" }}
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
