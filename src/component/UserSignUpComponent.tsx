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
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      "
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
