import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../services/actions/register";
import { useForm } from "../../utils/use-form";
import registerStyles from "./register.module.css";
import { FC, FormEvent } from "react";
import { useDispatch } from "../../utils/hooks";

const Register: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const registerForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(values, history.replace("/login")));
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
          name={"name"}
          value={values.name}
          onChange={(e) => handleChange(e)}
        />
        <EmailInput
          name={"email"}
          isIcon={false}
          value={values.email}
          onChange={(e) => handleChange(e)}
        />
        <PasswordInput
          name={"password"}
          extraClass="mb-2"
          value={values.password}
          onChange={(e) => handleChange(e)}
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
};

export default Register;
