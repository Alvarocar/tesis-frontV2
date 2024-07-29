import { useCreateNewResumeMutation } from "@app/store/features/applicantResume"
import { Button, Form, Input } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const ResumeCreateForm = () => {

  const [create, request] = useCreateNewResumeMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (request.isSuccess) {
      navigate(`aspirantes/hojas-de-vida/${request.data.id}`)
    }
  }, [])

  return (
    <Form
      layout="vertical"
      onFinish={(data: { title: string }) => {
        const { title } = data
        create({ title })
      }}
      validateTrigger="onSubmit"
    >
      <Form.Item
        name="title"
        label="Nombre de la hoja de vida"
        tooltip="Este nombre no se vera en la hoja de vida, solo es para diferenciarla del resto."
        rules={[
          {
            max: 30,
            message: "El nombre de la hoja de vida no puede tener mas de 30 caracteres"
          },
          {
            min: 5,
            message: "El nombre de la hoja de vida al menos debe tener 5 caracteres"
          }
        ]}
        normalize={(value: string | undefined) => value?.trimStart()}
      >
        <Input type="text" placeholder="Nombre de la hoja de vida" />
      </Form.Item>
      <Button loading type="primary" htmlType="submit" >Crear Hoja de vida</Button>
    </Form>
  )
}

export default ResumeCreateForm
