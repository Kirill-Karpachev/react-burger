import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { getLogin, LOGIN_FORM } from "../../services/actions/login";
import loginStyles from "./login.module.css";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { form, isAuth } = useSelector((store) => store.login);
  const user = useSelector((store) => store.user.user);

  function onChange(e) {
    dispatch({
      type: LOGIN_FORM,
      name: e.target.name,
      value: e.target.value,
    });
  }

  function signIn(e) {
    e.preventDefault();
    const data = {
      email: form.email,
      password: form.password,
    };
    dispatch(getLogin(data, () => history.replace("/")));
  }

  if (isAuth || (user.email && user.name)) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className={loginStyles.content}>
      <h2 className="text text_type_main-medium">Вход</h2>
      <form onSubmit={signIn} className={`${loginStyles.form} mt-6 mb-20`}>
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
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
