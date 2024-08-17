import React, { useState } from "react";
import { Button, Modal, Typography } from "antd";
import classNames from "classnames/bind";
import styles from "./ExperienceList.module.scss";
import { ExperienceForm } from "../ExperienceForm";

const cx = classNames.bind(styles);

const ExperienceList: React.FC = () => {

  const [open, setOpen] = useState(false)

  return (
    <article className={cx("experience")}>
      <Typography.Title level={3}>Experiencias</Typography.Title>
      <Button 
        type="primary"
        onClick={() => setOpen(true)}>
        <Typography.Text>Agregar nueva experiencia</Typography.Text>
      </Button>
      <Modal 
        open={open} 
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        footer={null}
        >
          <ExperienceForm />
      </Modal>
    </article>
  );
};

export default ExperienceList;
