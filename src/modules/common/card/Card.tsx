import classNames from "classnames";

type Props = {
  children?: React.ReactNode;
  colorType?: keyof typeof colors;
  className?: string;
}

const colors = {
  white: 'bg-white'
}

const Card: React.FC<Props> = ({ children, className,colorType = 'white' }) => {
  return (
    <div className={classNames('shadow-md p-5 rounded', colors[colorType], className)}>
      {children}
    </div>
  )
}

export default Card;