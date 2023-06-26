import * as yup from 'yup';

export const invitationValidationSchema = yup.object().shape({
  email: yup.string().required(),
  brandalyzer_id: yup.string().nullable(),
});
