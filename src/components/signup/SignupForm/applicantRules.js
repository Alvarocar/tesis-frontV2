/**
 * @typedef {Array<import('antd/es/form').Rule>} Rule
 */

/**
 * @typedef {Object} ApplicantRules
 * @property {Rule} name
 * @property {Rule} email
 * @property {Rule} password
 */

/**
 * @type {ApplicantRules}
 */
export const rules = {
  email: [{ required: true }],
  name: [{ required: true, type: "email" }],
  password: [{ required: true }],
};
