import { Buildings, Clock, DollarCircle } from "iconsax-react";
import classNames from "classnames/bind";
import { IJobCard } from "./JobCard.interface";
import styles from './JobCard.module.scss';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const JobCard: React.FC<IJobCard> = ({
  title,
  company,
  salary,
  type,
}) => {
  return (
    <article className={cx('job-card')}>
      <h4 className={cx('job-card__title')}>{title}</h4>
      <div className={cx('job-card__center')}>
        <section className={cx('job-card__row')}>
          <Buildings size={20} />
          <p>{company}</p>
        </section>
        <section className={cx('job-card__row')}>
          <DollarCircle size={20} />
          {salary ? salary : 'A convenir'}
        </section>
        <section className={cx('job-card__row')}>
          <section className={cx('job-card__row')}>
            <Clock size={20} />
            {type}
          </section>
          <Link to="/" className={cx('job-card__see-detail')}>
            Ver detalle
          </Link>
        </section>
      </div>
    </article>
  );
}

export default JobCard