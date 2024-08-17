import React from "react";
import { Button, Checkbox, DatePicker, Form, Input, Typography } from "antd";
import classNames from "classnames/bind";
import styles from "./ExperienceForm.module.scss";

const cx = classNames.bind(styles);

const ExperienceForm: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form layout="vertical" form={form} className={cx("form")}>
      <Typography.Title level={3}>Agregar/Editar Experiencia</Typography.Title>
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
      <Form.Item name="keep_study">
        <Checkbox>
          <Typography.Text>¿Aun sigue en el cargo?</Typography.Text>
        </Checkbox>
      </Form.Item>
      <div className={cx("form__row")}>
        <Form.Item name="start_date" label="Fecha de ingreso">
          <DatePicker />
        </Form.Item>
        <Form.Item name="end_date" label="Fecha de finalización">
          <DatePicker />
        </Form.Item>
      </div>
      <div className={cx('form__center')}>
        <Button type="primary" onClick={() => form.submit()}>
          <Typography.Text>Guardar</Typography.Text>
        </Button>
      </div>
    </Form>
  );
};

export default ExperienceForm;
