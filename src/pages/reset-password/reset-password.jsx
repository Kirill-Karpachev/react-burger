import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import resetPasswordStyles from "./reset-password.module.css";

function ResetPassword() {
  return (
    <div className={resetPasswordStyles.content}>
      <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      <form className={`${resetPasswordStyles.form} mt-6 mb-20`}>
        <PasswordInput placeholder="Введите новый пароль" name={"password"} />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button htmlType="button" type="primary" size="medium">
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
