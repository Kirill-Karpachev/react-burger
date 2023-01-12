import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUser, signOut, updateUser } from "../../services/actions/user";
import { getCookie } from "../../utils/util";
import profileStyles from "./profile.module.css";

function Profile() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { name, email } = useSelector((store) => store.user.user);

  const [nameValue, setNameValue] = useState(name);
  const [emailValue, setEmailValue] = useState(email);
  const [disabled, setDisabled] = useState(true);

  const updateUserForm = (e) => {
    e.preventDefault();
    const form = {
      name: nameValue,
      email: emailValue,
    };
    dispatch(updateUser(form));
  };

  const resetUserForm = () => {
    setNameValue(name);
    setEmailValue(email);
  };

  const logout = useCallback(() => {
    dispatch(
      signOut({ token: getCookie("refreshToken") }, () =>
        history.replace({ pathname: "/login" })
      )
    );
  }, [history, dispatch]);

  return (
    <div className={profileStyles.content}>
      <div className={profileStyles.menu}>
        <ul className={`${profileStyles.nav} mb-20`}>
          <li className={profileStyles.item}>
            <Link
              className={`${profileStyles.link} text text_type_main-medium ${profileStyles.active}`}
              to={{ pathname: "/profile" }}
            >
              Профиль
            </Link>
          </li>
          <li className={profileStyles.item}>
            <Link
              className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
              to={{ pathname: "/profile/order" }}
            >
              История заказов
            </Link>
          </li>
          <li className={profileStyles.item}>
            <button
              onClick={logout}
              className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}
            >
              Выход
            </button>
          </li>
        </ul>

        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form onSubmit={updateUserForm}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          icon="EditIcon"
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          onIconClick={(e) => setDisabled(false)}
          extraClass="mb-6"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          disabled={disabled}
        />
        <EmailInput
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          extraClass="mb-6"
          onChange={(e) => setEmailValue(e.target.value)}
          value={emailValue}
        />
        <PasswordInput
          name={"password"}
          icon="EditIcon"
          value="password"
          extraClass="mb-6"
          onChange={(e) => e}
        />
        {!(name === nameValue && email === emailValue) && (
          <div className={profileStyles.buttons}>
            <Button
              onClick={resetUserForm}
              htmlType="button"
              type="secondary"
              size="medium"
            >
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Profile;
