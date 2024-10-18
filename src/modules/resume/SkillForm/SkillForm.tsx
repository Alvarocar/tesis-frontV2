import { useRef } from "react"
import { Button, Form, Typography } from "antd"
import classNames from "classnames/bind"
import { SkillInput } from "../SkillInput"
import { SkillItem } from "../SkillItem"
import styles from './SkillForm.module.scss'
import { ISkill } from "@app/@types/resume.types"
import { useSelector } from "react-redux"
import { selectResumeId, selectResumeSkills } from "@app/store/features/applicantResume/applicantResume.selector"
import { usePatchSkillMutation } from "@app/store/features/applicantResume"
import { stubTrue } from "lodash"

const cx = classNames.bind(styles)

type Props = {
  onSubmit?: () => void
}

const SkillForm: React.FC<Props> = ({ onSubmit = stubTrue }) => {
  const inputRef = useRef({
    clean: () => null,
  })
  const skills = useSelector(selectResumeSkills)
  const resumeId = useSelector(selectResumeId)
  const [update, request] = usePatchSkillMutation()

  const [form] = Form.useForm()

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={(values) => {
        update({
          resumeId: values.resumeId,
          skills: values.skills,
        })
        .then(res => {
          if (res.error === undefined) {
            onSubmit()
          }
        })
      }}
      onFinishFailed={console.log}
      initialValues={{
        skills,
        resumeId,
      }}
    >
      <Typography.Title level={3}>Agregar/Editar una Habilidad</Typography.Title>
      <Form.Item noStyle name="resumeId" />
      <Form.List name="skills">
      {(fields, { add, remove }) => (
        <div className={cx("skills")}>
          <SkillInput onChange={(value) => {
            const currentSkills: ISkill[] = form.getFieldValue('skills')
            if (currentSkills.some(skill => skill.name === value)) return
            add({ name: value })
            inputRef.current.clean()
          }} ref={inputRef} />
          <ul className={cx("skills__list")}>
            {fields.map((field, i) => (
              <Form.Item noStyle name={field.name} key={field.key}>
                <SkillItem onDelete={() => remove(i)} />
              </Form.Item>
            ))}
          </ul>
          <Button 
            htmlType="button"
            type="primary"
            className={cx("skills__submit")}
            onClick={() => form.submit()}
            loading={request.isLoading}
          >
            <Typography.Text>Guardar</Typography.Text>
          </Button>
        </div>
      )}
    </Form.List>
    </Form>
  )
}

export default SkillForm
