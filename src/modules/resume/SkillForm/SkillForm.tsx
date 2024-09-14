import { useRef } from "react"
import { Button, Form, Typography } from "antd"
import classNames from "classnames/bind"
import { SkillInput } from "../SkillInput"
import { SkillItem } from "../SkillItem"
import styles from './SkillForm.module.scss'
import { ISkill } from "@app/@types/resume.types"

const cx = classNames.bind(styles)

const SkillForm = () => {
  const inputRef = useRef({
    clean: () => null,
  })

  const [form] = Form.useForm()

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={(values) => {
        console.log(values)
      }}
      initialValues={{
        skills: [],
      }}
    >
      <Typography.Title level={3}>Agregar/Editar una Habilidad</Typography.Title>
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
