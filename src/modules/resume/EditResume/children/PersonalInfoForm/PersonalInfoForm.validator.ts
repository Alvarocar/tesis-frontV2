import { z } from 'zod';
import { ESex } from '@app/enums/sex.enum';
import { EGender } from '@app/enums/gender.enum';
import { ESexualOrientation } from '@app/enums/sexual-orientation.enum';
import { EEthnicGroup } from '@app/enums/ethnic-group.enum';

const REQUIRED_MESSAGE = 'Campo requerido';

/**
 * Rango permitido para la fecha de nacimiento: 15 a 75 años respecto a hoy.
 * Se mantiene coherente con `birthDateRange` que arma el `DatePicker` del form.
 */
const MIN_AGE_YEARS = 15;
const MAX_AGE_YEARS = 120;

const today = new Date();
const minBirthDate = new Date(today);
minBirthDate.setFullYear(today.getFullYear() - MAX_AGE_YEARS);
const maxBirthDate = new Date(today);
maxBirthDate.setFullYear(today.getFullYear() - MIN_AGE_YEARS);
maxBirthDate.setMonth(11);
maxBirthDate.setDate(31);

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, REQUIRED_MESSAGE),
  lastName: z
    .string()
    .min(1, REQUIRED_MESSAGE),
  identification: z
    .string()
    .min(1, REQUIRED_MESSAGE)
    .regex(/^\d+$/, 'Solo dígitos'),
  phoneNumber: z
    .string()
    .min(1, REQUIRED_MESSAGE)
    .regex(/^\d+$/, 'Solo dígitos'),
  birthDate: z
    .date(REQUIRED_MESSAGE)
    .min(minBirthDate, { message: 'Fecha fuera del rango permitido' })
    .max(maxBirthDate, { message: 'Fecha fuera del rango permitido' }),
  salaryAspiration: z
    .number({ message: 'Debe ser un número' })
    .nonnegative('Debe ser un número positivo')
    .nullable()
    .optional(),
  countryOfBirth: z.unknown().nullable().optional(),
  departmentOfBirth: z.unknown().nullable().optional(),
  cityOfBirth: z.unknown().nullable().optional(),
  countryOfResidence: z.unknown().nullable().optional(),
  departmentOfResidence: z.unknown().nullable().optional(),
  cityOfResidence: z.unknown().nullable().optional(),
  sex: z.enum(ESex).nullable().optional(),
  genre: z.enum(EGender).nullable().optional(),
  sexualOrientation: z.enum(ESexualOrientation).nullable().optional(),
  ethnicGroup: z.enum(EEthnicGroup).nullable().optional(),
});

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;
