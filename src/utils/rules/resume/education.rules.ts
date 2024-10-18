
import { IEducation } from "@app/@types/resume.types";
import { Rule } from "antd/es/form";

export const educationFormRules: Record<keyof IEducation, Rule[]> = {
  id: [],
  institute: [{ required: true, message: 'El campo es requerido' }],
  title: [{ required: true, message: 'El campo es requerido' }],
  start_date: [],
  keep_study: [],
  end_date: [(form) => ({
    validator(_, value) {
      const keepStudy = form.getFieldValue('keep_study')
      if (keepStudy && value) {
        return Promise.reject('si sigue estudiando elimina la Fecha de finalización')
      }

      if (!keepStudy && !value) {
        return Promise.reject('El campo es requerido')
      }
      return Promise.resolve()
    }
  })]
} 