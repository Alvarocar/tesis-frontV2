import { Typography } from "antd"
import { stubTrue } from "lodash"
import classNames from "classnames/bind"
import { IEducation } from "@app/@types/resume.types"
import styles from './EducationItem.module.scss'

const cx = classNames.bind(styles)

type Props = {
  study: IEducation
  onEdit?: (study: IEducation) => void
}

const EducationItem: React.FC<Props> = ({ study, onEdit = stubTrue }) => {
  return (
    <button onClick={() => onEdit(study)} className={cx('education-item__edit')}>
      <article className={cx('education-item')}>
        <Typography.Title className={cx('education-item__title')} level={5}>{study.title}</Typography.Title>
        <div>
        <Typography.Text className={cx('education-item__subtitle')}>Institución: </Typography.Text>
        <Typography.Text className={cx('education-item__title')}  >{study.institute}</Typography.Text>
        </div>
        <section>
          <Typography.Text>{study.start_date} -</Typography.Text>
          <Typography.Text>{study.keep_study ? 'Actual' : study.end_date}</Typography.Text>
        </section>
      </article>
    </button>
  )
}

export default EducationItem
