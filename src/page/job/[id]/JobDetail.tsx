import React from "react"
import DOMPurify from 'dompurify';
import classNames from "classnames/bind";
import { IJobDetail } from "@app/@types/job.types"
import styles from './JobDetail.module.scss'

const cx = classNames.bind(styles)

const JobDetail:React.FC<IJobDetail> = ({
  title,
  company,
  jobType,
  description,
}) => {
  const sanitizedHTML = DOMPurify.sanitize(description);
  return (
    <main className={cx('job-detail')}>
      <header className={cx('job-detail__')}>
        <section>
          <h2>{title}</h2>
          <p>{company}</p>
        </section>
        <span>{jobType}</span>
      </header>
      <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} ></div>
    </main>
  )
}

export default JobDetail;