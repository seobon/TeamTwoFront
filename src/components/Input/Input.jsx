import React, { forwardRef } from 'react';

const Input = forwardRef(({id, name, type, placeholder, errors, rules, register, ...props }, ref) => {
  const inputCss =
    'font-Body2 w-full py-3.5 px-4 mb-1 bg-transparent rounded-lg border border-solid focus:outline-none focus:bg-transparent active:bg-transparent';
  const errorMessages = errors[name] && errors[name].message;
  const hasError = !!(errors && errorMessages);

  return (
    <div className="mb-5 w-full">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
        rules={rules}
        {...props}
        {...(register && register(name, rules))}
        className={
          hasError
            ? `${inputCss}  border-red text-deepRed`
            : `${inputCss} border-gray-400  focus:border-gray-500 focus:text-gray-800  active:border-gray-500 active:text-gray-800`
        }
      />
      {hasError && <p className="text-deepRed font-Caption">{errorMessages}</p>}
    </div>
  );
});

export default Input;
