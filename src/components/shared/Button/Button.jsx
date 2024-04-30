import PropTypes from 'prop-types'
import { Button as AntButton } from 'antd'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

const Button = ({
  type = "primary",
  onClick = () => null,
  htmlType = "button",
  children,
}) => {
  return (
    <AntButton
      className={cx('btn', `btn--${type}`)}
      onClick={onClick}
      htmlType={htmlType}
    >{children}</AntButton>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(["primary"]),
  children: PropTypes.element,
  onClick: PropTypes.func,
  htmlType: PropTypes.oneOf(["button", "submit", "reset"]),
}

export default Button