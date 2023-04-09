import { Form, Formik } from "formik";
import Fields from "../Fields";
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
  before?: JSX.Element;
  fieldsContainerClassName?: string;
}

const WithFormik: React.FC<Props> = (props) => {
  return (
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <div className="text-center">
          <Form>
            <div className="flex flex-wrap gap-4 items-center">
              {props.before && <div>{props.before}</div>}

              <div
                className={
                  "grid place gap-4" +
                    " " +
                    props.fieldsContainerClassName || ""
                }
              >
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
            </div>
            <button
              type="submit"
              className="bg-custom-blue uppercase px-10 py-3 rounded-3xl hover:px-14 duration-200 text-white"
            >
              {props.submitBtnLabel}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default WithFormik;
