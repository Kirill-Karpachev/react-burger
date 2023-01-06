import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import registerStyles from "./register.module.css";

function Register() {
  return (
    <div className={registerStyles.content}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <form className={`${registerStyles.form} mt-6 mb-20`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          errorText={"Ошибка"}
          size={"default"}
        />
        <EmailInput name={"email"} isIcon={false} />
        <PasswordInput name={"password"} extraClass="mb-2" />
        <Button htmlType="button" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?{" "}
          <Link className={registerStyles.link} to={{ pathname: "/login" }}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
