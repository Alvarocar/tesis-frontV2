import { Rate, Typography } from "antd"
import classNames from "classnames/bind"
import { ILanguage } from "@app/@types/resume.types"
import { stubTrue } from "lodash"
import styles from './LanguageLevel.module.scss'

const cx = classNames.bind(styles)

const levelsLabel = [
  {
    id: 1,
    label: 'Basico'
  },
  {
    id: 2,
    label: 'Intermedio'
  },
  {
    id: 3,
    label: 'Avanzado'
  },
  {
    id: 4,
    label: 'Nativo'
  }
]

const LanguageLevel: React.FC<{value?: ILanguage, onChange?: (level: ILanguage) => void, onDelete?: (value: ILanguage) => void}> = ({ value, onChange = stubTrue, onDelete = stubTrue }) => {
  if (!value) return null
  return (
    <div className={cx('language')}>
      <div className={cx('levels-bar')}>
        <Rate
          allowClear={false}
          defaultValue={value.level}
          count={4}
          className={cx('levels')}
          onChange={(level) => onChange({ name: value.name, level })}
          character={({ prefixCls }) => <div 
            className={cx(prefixCls, 'level')}
            style={{ height: '1rem' }}></div>}
        />
        <label className={cx('levels-bar__legend')}>
          {levelsLabel.find(level => level.id === value.level)?.label}</label>
      </div>
      <div className={cx('language__name')}>
        {value.name}
      </div>
      <button className={cx('language__delete')} onClick={() => {
        if (value === undefined) return
        onDelete(value)
      }}>
        <Typography.Text>X</Typography.Text>
      </button>
    </div>
  )
}

export default LanguageLevel
