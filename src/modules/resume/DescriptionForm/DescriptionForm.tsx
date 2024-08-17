import { Form, Typography, Input, Button } from "antd";
import classNames from "classnames/bind";
import styles from './DescriptionForm.module.scss'
import { useForm } from "antd/es/form/Form";
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from "@app/store";
import { selectResumeAboutMe, selectResumeId } from "@app/store/features/applicantResume/applicantResume.selector";
import React, { useEffect } from "react";
import { usePatchAboutMeMutation } from "@app/store/features/applicantResume";

const cx = classNames.bind(styles)

const mapStateToProps = (state: RootState) => ({
  resume_id: selectResumeId(state),
  about_me: selectResumeAboutMe(state),

})

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

const DescriptionForm: React.FC<Props> = ({
  about_me,
  resume_id,
}) => {
  const [form] = useForm()
  const [patch, request] = usePatchAboutMeMutation()

  useEffect(() => {
    form.setFieldsValue({ about_me, resume_id })
  }, [about_me, resume_id])

  return (
    <Form 
      className={cx('form')} 
      form={form}
      initialValues={{
        about_me,
        resume_id,
      }}
      onFinish={(values) => {
        patch(values)
      }}
    >
      <Typography.Title level={3} style={{ textAlign: "center" }}>Descripción Profesional</Typography.Title>
      <Form.Item 
        name='about_me'
        rules={[{ type: 'string', required: true, message: 'Campo requerido' }]}
      >
        <Input.TextArea
          showCount
          maxLength={2000}
          placeholder="Descripción de su perfil"
          style={{ height: 220, resize: "none" }}
        />
      </Form.Item>
      <Form.Item noStyle name='resume_id' ></Form.Item>
      <div className={cx('form__submit')}>
        <Button loading={request.isLoading} onClick={() => form.submit()} type="primary">
          <Typography.Text>Guardar</Typography.Text>
        </Button>
      </div>
    </Form>
  );
};

export default connector(DescriptionForm);
