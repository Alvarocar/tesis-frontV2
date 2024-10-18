import { Typography } from "antd";
import classNames from "classnames/bind";
import { IExperience } from "@app/@types/resume.types";
import { stubTrue } from "lodash";
import styles from './ExperienceItem.module.scss'

const cx = classNames.bind(styles)

type Props = {
  value: IExperience;
  onEdit?: (value: IExperience) => void;
};

const ExperiencieItem: React.FC<Props> = ({ value, onEdit = stubTrue }) => {
  return (
    <button onClick={() => onEdit(value)} className={cx('experience-item__btn')}>
      <article className={cx('experience-item')}>
        <Typography.Title className={cx('experience-item__rol')} level={5}>{value.rol}</Typography.Title>
        <Typography.Text className={cx('experience-item__company')}>{value.company}</Typography.Text>
        <Typography.Paragraph className={cx('experience-item__description')}>
          {value.description}
        </Typography.Paragraph>
        <section>
          <Typography.Text>{value.start_date} -</Typography.Text>
          <Typography.Text>
            {value.keep_working ? "Actual" : value.end_date}
          </Typography.Text>
        </section>
      </article>
    </button>
  );
};

export default ExperiencieItem;
