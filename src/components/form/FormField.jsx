import { Field, ErrorMessage } from "formik";

const DEFAULT_INPUT_CLASS =
  "w-full rounded-lg md:text-base sm:text-sm p-2 border-[1px] text-blue-black";

const FormField = ({
  name,
  label,
  type = "text",
  placeholder,
  as = "input",
  rows,
  options = [],
  layout = "stacked",
  outerClassName,
  rowClassName,
  labelClassName,
  inputClassName,
  errorClassName,
  children,
}) => {
  const isInline = layout === "inline";

  const outerClass =
    outerClassName ||
    (isInline
      ? "w-full flex flex-col items-center"
      : "w-full flex flex-col items-start mb-4");

  const rowClass =
    rowClassName ||
    (isInline
      ? "w-full flex flex-row items-center space-x-3"
      : "w-full flex flex-col items-start");

  const labelClass =
    labelClassName ||
    (isInline
      ? "whitespace-nowrap text-sm font-[500] text-blue-black"
      : "mb-1 text-sm font-[500] text-blue-black");

  const fieldClass = inputClassName || DEFAULT_INPUT_CLASS;

  const renderField = () => {
    if (children) {
      return children;
    }
    if (as === "select") {
      return (
        <Field as="select" name={name} id={name} className={fieldClass}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      );
    }
    if (as === "textarea") {
      return (
        <Field
          as="textarea"
          name={name}
          id={name}
          rows={rows || 5}
          placeholder={placeholder}
          className={fieldClass}
        />
      );
    }
    return (
      <Field
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={fieldClass}
      />
    );
  };

  return (
    <div className={outerClass}>
      <div className={rowClass}>
        {label && (
          <label htmlFor={name} className={labelClass}>
            {label}
          </label>
        )}
        {renderField()}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className={errorClassName || "text-red-500 text-xs italic"}
      />
    </div>
  );
};

export default FormField;
