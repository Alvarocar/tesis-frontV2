import React from "react"
import { stubTrue } from "lodash"
import classNames from "classnames/bind"
import { ISkill } from "@app/@types/resume.types"
import styles from './SkillItem.module.scss'

const cx = classNames.bind(styles)

type Props = {
  value?: ISkill,
  onChange?: (value: ISkill) => void
  onDelete?: () => void
}

const SkillItem: React.FC<Props> = ({ value, onDelete = stubTrue }) => {

  return (
    <div className={cx('skill-item')}>
      <span>{value?.name}</span>
      <button 
        type="button"
        onClick={() => onDelete()}
        className={cx('skill-item__x')}
        >X</button>
    </div>
  )
}

export default SkillItem
