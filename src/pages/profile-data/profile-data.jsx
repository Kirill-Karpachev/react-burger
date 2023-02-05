import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../services/actions/user";
import { useForm } from "../../utils/use-form";
import profileDataStyles from "./profile-data.module.css";

function ProfileData() {
  const dispatch = useDispatch();
  const { name, email } = useSelector((store) => store.user.user);
  const { values, handleChange, setValues } = useForm({
    name: name,
    email: email,
  });

  const [disabled, setDisabled] = useState(true);

  const updateUserForm = (e) => {
    e.preventDefault();
    dispatch(updateUser(values));
  };

  const resetUserForm = () => {
    setValues({ name: name, email: email });
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
        value={values.name}
        onChange={(e) => handleChange(e)}
        disabled={disabled}
      />
      <EmailInput
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-6"
        onChange={(e) => handleChange(e)}
        value={values.email}
      />
      <PasswordInput
        name={"password"}
        icon="EditIcon"
        value="password"
        extraClass="mb-6"
        onChange={(e) => e}
      />
      {!(name === values.name && email === values.email) && (
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
