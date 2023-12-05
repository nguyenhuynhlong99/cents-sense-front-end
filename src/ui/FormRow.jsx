function FormRow({ label, error, children }) {
  return (
    <div className="py-3 grid grid-cols-1 gap-1 items-center sm:grid-cols-[10em,_1fr,_1fr] sm:gap-0">
      {label && (
        <label
          htmlFor={children.props.id}
          className="font-semibold text-sm sm:text-base"
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="pl-3 text-xs text-red-500 sm:text-sm">{error}</span>
      )}
    </div>
  );
}

export default FormRow;
