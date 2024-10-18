import React from "react";
import dayjs from "dayjs";
import { isUndefined, stubTrue } from "lodash";
import classNames from "classnames/bind";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { usePatchExperienceMutation } from "@app/store/features/applicantResume";
import { useSelector } from "react-redux";
import { selectResumeId } from "@app/store/features/applicantResume/applicantResume.selector";
import { dateToString } from "@app/utils/date.util";
import { CustomDatePicker } from "@app/components/shared/CustomDatePicker";
import { IExperience } from '../../../@types/resume.types';
import styles from "./ExperienceForm.module.scss";

const cx = classNames.bind(styles);

type Props = {
  onSubmit?: () => void;
  value: IExperience;
};

const ExperienceForm: React.FC<Props> = ({ onSubmit = stubTrue, value }) => {
  const [form] = Form.useForm();
  const [update, request] = usePatchExperienceMutation();
  const resumeId = useSelector(selectResumeId);
  return (
    <Form
      layout="vertical"
      form={form}
      className={cx("form")}
      onFinish={(values) => {
        update({
          resumeId: values.resumeId,
          experience: {
            ...values,
            resumeId: undefined,
            start_date: dateToString(values.start_date),
            end_date: values.end_date
              ? dateToString(values.end_date)
              : null,
          },
        }).then(req => {
          if (isUndefined(req.error)) {
            onSubmit()
          }
        });
      }}
      initialValues={{
        ...value,
        resumeId,
      }}
    >
      <Typography.Title level={3}>Agregar/Editar Experiencia</Typography.Title>
      <Form.Item noStyle name="resumeId"/>
      <Form.Item noStyle name="id" />
      <div className={cx("form__row")}>
        <Form.Item
          label="Rol"
          name="rol"
          rules={[
            { type: "string", required: true, message: "Campo requerido" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Compañia"
          name="company"
          rules={[
            { type: "string", required: true, message: "Campo requerido" },
          ]}
        >
          <Input />
        </Form.Item>
      </div>
      <Form.Item
        name="description"
        rules={[{ type: "string", required: true, message: "Campo requerido" }]}
      >
        <Input.TextArea
          showCount
          maxLength={2000}
          placeholder="Descripción"
          style={{ height: 220, resize: "none" }}
        />
      </Form.Item>
      <Form.Item name="keep_working" valuePropName="checked">
        <Checkbox>
          <Typography.Text>¿Aun sigue en el cargo?</Typography.Text>
        </Checkbox>
      </Form.Item>
      <div className={cx("form__row")}>
        <Form.Item name="start_date" label="Fecha de ingreso">
          <CustomDatePicker />
        </Form.Item>
        <Form.Item name="end_date" label="Fecha de finalización">
          <CustomDatePicker />
        </Form.Item>
      </div>
      <div className={cx("form__center")}>
        <Button
          loading={request.isLoading}
          type="primary"
          onClick={() => form.submit()}
        >
          <Typography.Text>Guardar</Typography.Text>
        </Button>
      </div>
    </Form>
  );
};

export default ExperienceForm;
