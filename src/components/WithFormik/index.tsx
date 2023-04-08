import { Form, Formik } from "formik";
import Fields from "../InputField";
import Yup from "yup";
import React from "react";

interface Props {
  initialValues: {};
  validationSchema: Yup.ObjectSchema<{ [key: string]: any }>;
  onSubmit: (values: any) => any;
  fieldArray: any[];
  fieldVariant?: "standard" | "outlined";
  submitBtnLabel: string;
  aboveTheFields?: JSX.Element;
  belowTheFields?: JSX.Element;
}

const WithFormik: React.FC<Props> = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <div className="grid gap-4 my-6">
            {props.aboveTheFields || ""}
            <Fields
              fieldArray={props.fieldArray}
              fieldVariant={props.fieldVariant}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {props.belowTheFields || ""}
          </div>
          <button
            type="submit"
            className="bg-custom-blue uppercase px-10 py-3 rounded-3xl hover:px-14 duration-200"
          >
            {props.submitBtnLabel}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default WithFormik;
