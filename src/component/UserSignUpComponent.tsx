export const UserSignUpComponent = (props: any) => {
  const {
    label,
    handleChange,
    formData,
    id,
    name,
    placeholder,
    type,
    validError,
  } = props;

  return (
    <div>
      <label>{label}</label>
      <input
        className="form-control bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        type={type}
        name={name}
        id={id}
        onChange={handleChange}
        value={formData[name]}
        maxLength={50}
      />
      <div>
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {validError}
        </span>
      </div>
    </div>
  );
};
