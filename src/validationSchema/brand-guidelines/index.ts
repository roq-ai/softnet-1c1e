import * as yup from 'yup';

export const brandGuidelineValidationSchema = yup.object().shape({
  pdf: yup.string().required(),
  brandalyzer_id: yup.string().nullable(),
});
