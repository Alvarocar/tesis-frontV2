import classNames from "classnames/bind"
import { useGetJobDetailQuery } from "@app/store/features/job"
import JobDetail from "./JobDetail"
import styles from './JobDetail.module.scss'

const cx = classNames.bind(styles)

const Page = () => {
  const { data } = useGetJobDetailQuery(1)

  if (data === undefined) return <div>cargando...</div>

  return (
    <div className={cx('page')}>
      <JobDetail {...data} />
    </div>
  )
}

export const Component = Page