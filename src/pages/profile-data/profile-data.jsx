import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../services/actions/user";
import profileDataStyles from "./profile-data.module.css";

function ProfileData() {
  const dispatch = useDispatch();

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

  return (
    <form className={profileDataStyles.form} onSubmit={updateUserForm}>
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
        <div className={profileDataStyles.buttons}>
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
  );
}

export default ProfileData;
