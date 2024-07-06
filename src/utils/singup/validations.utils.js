/**
 * @typedef {Array<import('antd/es/form').Rule>} Rule
 */

/**
 * @typedef {Object} ApplicantRules
 * @property {Rule} name
 * @property {Rule} email
 * @property {Rule} password
 * @property {Rule} confirmPassword
 */

/**
 * @type {ApplicantRules}
 */
export const signupFormRules = {
  email: [
    {
      required: true,
      message: "El email es requerido",
    },
    {
      type: "email",
      message: "El campo no tiene el formato de un email",
    },
  ],
  name: [
    {
      required: true,
      message: "El nombre es requerido",
    },
    {
      min: 4,
      max: 60,
      message: "El nombre debe contener entre 4 y 60 caracteres",
    },
  ],
  password: [
    {
      required: true,
      message: "La contraseña es requerida",
    },
    {
      min: 6,
      message: "La contraseña debe tener al menos 6 caracteres",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "La confirmación de la contraseña es requerida",
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (value == null) return Promise.resolve();
        if (getFieldValue("password") === value) {
          return Promise.resolve();
        }
        return Promise.reject("La contraseña no coincide");
      },
    }),
  ],
};
