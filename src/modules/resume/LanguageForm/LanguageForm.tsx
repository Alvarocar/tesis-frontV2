import React from "react";
import { stubTrue } from "lodash";
import { Button, Form, Typography } from "antd";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { LanguageLevel } from "../LanguageLevel";
import { selectResumeId, selectResumeLanguages } from "@app/store/features/applicantResume/applicantResume.selector";
import { LanguageSearch } from "../LanguageSearch";
import { usePatchLanguagesMutation } from "@app/store/features/applicantResume";
import styles from "./LanguageForm.module.scss";

const cx = classNames.bind(styles);

type Props = {
  onSubmit?: () => void;
}

const LanguageForm: React.FC<Props> = ({ onSubmit = stubTrue }) => {
  const languages = useSelector(selectResumeLanguages);
  const resumeId = useSelector(selectResumeId);
  const [update, request] = usePatchLanguagesMutation();
  const [form] = Form.useForm()

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={values => {
        update({
          resumeId: resumeId ?? 0,
          languages: values.languages,
        }).then(req => {
          if (req.error === undefined) {
            onSubmit()
          }
        })
      }}
      initialValues={{
        languages,
      }}
    >
      <Typography.Title level={3}>Agregar/Editar un Lenguaje</Typography.Title>
      <Form.List name="languages">
        {(fields, { add, remove }) => (
          <div className={cx("form-lang")}>
            <LanguageSearch onSelect={(data) => {
              add({ level: 1, ...data })
            }} />
            <ul className={cx("list")}>
              {fields.map((field, i) => (
                <Form.Item noStyle name={field.name} key={field.key}>
                  <LanguageLevel onDelete={() => remove(i)} />
                </Form.Item>
              ))}
            </ul>
          </div>
        )}
      </Form.List>
      <Form.Item name></Form.Item>
      <div className={cx("form-lang__submit-section")}>
        <Button 
          type="primary"
          htmlType="button"
          loading={request.isLoading}
          onClick={() => form.submit()}>
          <Typography.Text>Guardar</Typography.Text>
        </Button>
      </div>
    </Form>
  );
};

export default LanguageForm;
