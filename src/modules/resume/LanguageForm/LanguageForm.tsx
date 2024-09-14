import React from "react";
import { Form, Typography } from "antd";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { LanguageLevel } from "../LanguageLevel";
import { selectResumeLanguages } from "@app/store/features/applicantResume/applicantResume.selector";
import { LanguageSearch } from "../LanguageSearch";
import styles from "./LanguageForm.module.scss";

const cx = classNames.bind(styles);

const LanguageForm: React.FC = () => {
  const languages = useSelector(selectResumeLanguages);
  return (
    <Form
      layout="vertical"
      initialValues={{
        languages,
      }}
    >
      <Typography.Title level={3}>Agregar/Editar un Lenguaje</Typography.Title>
      <Form.List name="languages">
        {(fields, { add, remove }) => (
          <div className={cx("form-lang")}>
            <LanguageSearch onSelect={(data) => {
              debugger
              add({ level: 1, ...data })
            }} />
            <ul className={cx("list")}>
              {fields.map((field) => (
                <Form.Item noStyle name={field.name} key={field.key}>
                  <LanguageLevel />
                </Form.Item>
              ))}
            </ul>
          </div>
        )}
      </Form.List>
      <Form.Item name></Form.Item>
    </Form>
  );
};

export default LanguageForm;
