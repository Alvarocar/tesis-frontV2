import PropTypes from 'prop-types'
import { Button as AntButton } from 'antd'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

const Button = ({
  type = "primary",
  onClick = () => null,
  htmlType = "button",
  className,
  loading = false,
  children,
}) => {
  return (
    <AntButton
      className={cx('btn', `btn--${type}`, className)}
      loading={loading}
      onClick={onClick}
      htmlType={htmlType}
    >{children}</AntButton>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(["primary"]),
  children: PropTypes.elementType,
  onClick: PropTypes.func,
  htmlType: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  loading: PropTypes.bool,
}

export default Button