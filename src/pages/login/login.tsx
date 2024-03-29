import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { getLogin } from "../../services/actions/login";
import loginStyles from "./login.module.css";
import { useForm } from "../../utils/use-form";
import { FC, FormEvent } from "react";
import { useDispatch } from "../../utils/hooks";

const Login: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { values, handleChange } = useForm({ email: "", password: "" });

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getLogin(values, history.replace("/")));
  };

  return (
    <div className={loginStyles.content}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <form onSubmit={signIn} className={`${loginStyles.form} mt-6 mb-20`}>
        <EmailInput
          onChange={(e) => handleChange(e)}
          value={values.email}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          onChange={(e) => handleChange(e)}
          value={values.password}
          name={"password"}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы — новый пользователь?{" "}
          <Link className={loginStyles.link} to={{ pathname: "/register" }}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?{" "}
          <Link
            className={loginStyles.link}
            to={{ pathname: "/forgot-password" }}
          >
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
