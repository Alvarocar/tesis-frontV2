import { Typography } from "antd"
import classNames from "classnames/bind"
import styles from "./404.module.scss"
import { Link } from "react-router-dom"
import { ArrowRight } from "iconsax-react"

const cx = classNames.bind(styles)

const NotFoundPage = () => {
  return (
    <main className={cx('not-found')}>
      <Typography.Title level={1} className={cx('not-found__number')} >404</Typography.Title>
      <Typography.Title level={3} className={cx('not-found__title')} >P&aacute;gina no encontrada</Typography.Title>
      <Typography.Text className={cx('not-found__text')} >Lo sentimos, parece que la p&aacute;gina a la cual intenta acceder no existe.</Typography.Text>
      <Link to="/" className={cx('link')}>
        Ir a la p&aacute;gina principal.
        <ArrowRight size="25" color="#FFF"/>
      </Link>
    </main>
  )
}

export default NotFoundPage
