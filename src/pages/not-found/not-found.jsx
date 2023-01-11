import { Link } from "react-router-dom";
import notFoundStyles from './not-found.module.css'

function NotFound() {
  return (
    <div className={notFoundStyles.content}>
      <p className={`${notFoundStyles.digits} text text_type_digits-large`}>404</p>
      <p className="text text_type_main-medium mb-20">Страница не найдена</p>
      <Link className={`${notFoundStyles.link} text text_type_main-medium`} to="/">На главную</Link>
    </div>
  );
}

export default NotFound;
