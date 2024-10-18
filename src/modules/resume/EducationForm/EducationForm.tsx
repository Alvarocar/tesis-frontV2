import React, { useEffect } from "react";
import dayjs from "dayjs";
import { stubTrue } from "lodash";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import { IEducation } from "@app/@types/resume.types";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { usePatchEducationMutation } from "@app/store/features/applicantResume";
import { educationFormRules } from "@app/utils/rules/resume/education.rules";
import { selectResumeId } from "@app/store/features/applicantResume/applicantResume.selector";
import { dateToString } from "@app/utils/date.util";
import { CustomDatePicker } from "@app/components/shared/CustomDatePicker";
import styles from "./EducationForm.module.scss";

const cx = classNames.bind(styles);

const EducationForm: React.FC<{ value: IEducation, onSubmit?: () => void }> = ({ value, onSubmit = stubTrue }) => {
  const [form] = Form.useForm();
  const resumeId = useSelector(selectResumeId);
  const [update, req] = usePatchEducationMutation();

  useEffect(() => {
    form.setFieldsValue(value);
  }, [value]);
  
  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={(values) => {
        update({
          resumeId: values.resumeId,
          education: {
            ...values,
            resumeId: undefined,
            start_date: dateToString(values.start_date),
            end_date: values.end_date
              ? dateToString(values.end_date)
              : undefined,
          },
        });
      }}
      initialValues={{
        
        start_date: dayjs(value.start_date),
        end_date: dayjs(value.end_date),
        resumeId,
      }}
    >
      <Form.Item name="id" noStyle></Form.Item>
      <Form.Item name="resumeId" noStyle></Form.Item>
      <Typography.Title level={3}>Agregar/Editar Estudio</Typography.Title>
      <Form.Item
        name="title"
        label="Titulo obtenido"
        rules={educationFormRules.title}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        name="institute"
        label="Instituo en donde estudiaste"
        rules={educationFormRules.institute}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        name="keep_study"
        rules={educationFormRules.institute}
        valuePropName="checked"
      >
        <Checkbox>
          <Typography.Text>¿Aun sigue estudiando?</Typography.Text>
        </Checkbox>
      </Form.Item>
      <div className={cx("row")}>
        <Form.Item
          name="start_date"
          label="Fecha de ingreso"
          rules={educationFormRules.start_date}
        >
          <CustomDatePicker />
        </Form.Item>
        <Form.Item
          name="end_date"
          dependencies={["keep_study"]}
          label="Fecha de finalización"
          rules={educationFormRules.end_date}
          className={cx("form__end-date")}
        >
          <CustomDatePicker />
        </Form.Item>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          htmlType="button"
          onClick={() => form.submit()}
          type="primary"
          loading={req.isLoading}
        >
          <Typography.Text>Guardar</Typography.Text>
        </Button>
      </div>
    </Form>
  );
};

export default EducationForm;
