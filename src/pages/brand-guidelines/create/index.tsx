import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createBrandGuideline } from 'apiSdk/brand-guidelines';
import { Error } from 'components/error';
import { brandGuidelineValidationSchema } from 'validationSchema/brand-guidelines';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { BrandalyzerInterface } from 'interfaces/brandalyzer';
import { getBrandalyzers } from 'apiSdk/brandalyzers';
import { BrandGuidelineInterface } from 'interfaces/brand-guideline';

function BrandGuidelineCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BrandGuidelineInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBrandGuideline(values);
      resetForm();
      router.push('/brand-guidelines');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BrandGuidelineInterface>({
    initialValues: {
      pdf: '',
      brandalyzer_id: (router.query.brandalyzer_id as string) ?? null,
    },
    validationSchema: brandGuidelineValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Brand Guideline
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="pdf" mb="4" isInvalid={!!formik.errors?.pdf}>
            <FormLabel>Pdf</FormLabel>
            <Input type="text" name="pdf" value={formik.values?.pdf} onChange={formik.handleChange} />
            {formik.errors.pdf && <FormErrorMessage>{formik.errors?.pdf}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<BrandalyzerInterface>
            formik={formik}
            name={'brandalyzer_id'}
            label={'Select Brandalyzer'}
            placeholder={'Select Brandalyzer'}
            fetcher={getBrandalyzers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'brand_guideline',
  operation: AccessOperationEnum.CREATE,
})(BrandGuidelineCreatePage);
