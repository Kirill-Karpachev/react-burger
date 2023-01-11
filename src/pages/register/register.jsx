import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../services/actions/register";
import registerStyles from "./register.module.css";

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerForm = (e) => {
    e.preventDefault();
    const form = {
      name,
      email,
      password,
    };
    dispatch(registerUser(form, () => history.replace("/login")));
  };

  return (
    <div className={registerStyles.content}>
      <h2 className="text text_type_main-medium">Регистрация</h2>
      <form
        onSubmit={registerForm}
        className={`${registerStyles.form} mt-6 mb-20`}
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          errorText={"Ошибка"}
          size={"default"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <EmailInput
          name={"email"}
          isIcon={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          name={"password"}
          extraClass="mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button htmlType="submit" type="primary" size="medium">
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
