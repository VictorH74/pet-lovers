import { Form, Formik } from "formik";
import Fields from "../Fields";
import Yup from "yup";
import React from "react";
import Button from "../Button";

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
  submitBtnClassName?: string;
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
                  "grid place gap-4" + " " + props.fieldsContainerClassName ||
                  ""
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
            <Button
              type="submit"
              className={props.submitBtnClassName || "hover:px-14 duration-150"}
            >
              {props.submitBtnLabel}
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default WithFormik;
