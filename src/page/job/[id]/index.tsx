import classNames from "classnames/bind"
import { useGetJobDetailQuery } from "@app/store/features/job"
import JobDetail from "./JobDetail"
import styles from './JobDetail.module.scss'
import { useParams } from "react-router-dom"

const cx = classNames.bind(styles)

const Page = () => {
  const { id = '1' } = useParams()
  const { data } = useGetJobDetailQuery(Number(id))

  if (data === undefined) return <div>cargando...</div>

  return (
    <div className={cx('page')}>
      <JobDetail {...data} />
    </div>
  )
}

export const Component = Page