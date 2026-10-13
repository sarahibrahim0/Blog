import { Formik, Form } from "formik";
import { RotatingLines } from "react-loader-spinner";
import FormField from "./FormField";

const DEFAULT_SUBMIT_CLASS =
  "w-full self-center relative z-10 !bg-gradient-to-r from-sky-500 to-indigo-500 my-5 text-white min-h-[41.6px] box-border hover:!bg-custom-color transition-all duration-500 ease-in-out border-[1px] rounded-lg py-2 px-7";

const AppForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields = [],
  children,
  formClassName = "",
  submitLabel = "Submit",
  submittingLabel = "Submitting...",
  loading = false,
  showSubmit = true,
  submitClassName = DEFAULT_SUBMIT_CLASS,
  renderActions,
  footer,
  enableReinitialize,
  ...rest
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={enableReinitialize}
      {...rest}
    >
      {(formik) => {
        const isBusy = formik.isSubmitting || loading;
        return (
          <Form className={formClassName}>
            {fields.map((field) => (
              <FormField key={field.name} {...field} />
            ))}

            {typeof children === "function" ? children(formik) : children}

            {renderActions
              ? renderActions(formik)
              : showSubmit && (
                  <button
                    type="submit"
                    disabled={isBusy}
                    className={submitClassName}
                  >
                    {isBusy ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                      />
                    ) : (
                      <span className="text-inherit text-sm inline-block">
                        {submitLabel}
                      </span>
                    )}
                  </button>
                )}

            {footer}
          </Form>
        );
      }}
    </Formik>
  );
};

export default AppForm;
