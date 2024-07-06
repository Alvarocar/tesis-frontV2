import { Link } from "react-router-dom"
import classNames from "classnames/bind"
import styles from "./HeaderPublic.module.scss"

const cx = classNames.bind(styles)

const HeaderPublic = () => {

  return (
    <header className={cx('header')}>
      <section>
        <Link to='/'><h4 className={cx('header__title')}>Acme Inc.</h4></Link>

      </section>
      <section className={cx('header__links')}>
        <Link className={cx('btn')} to="/">About</Link>
        <Link className={cx('btn')} to="/">Careers</Link>
        <Link className={cx('btn')} to="/">Contact</Link>
        <Link className={cx('btn__login')} to="/aspirantes/sign-in">Log in</Link>
        <Link className={cx('btn__signup')} to="/aspirantes/sign-up">Sign up</Link>
      </section>
    </header>
  )
}

export default HeaderPublic