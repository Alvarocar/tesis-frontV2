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
export const signinFormRules = {
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
};
