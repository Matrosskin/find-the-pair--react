import React from 'react';

type InputProps = {
  name: string,
  type: 'number' | 'text',
  value: number | string,
  label: string,
  onChange: (newValue: number | string) => void
};

function WrappedInput({
  name, type, value, label, onChange,
}: InputProps) {
  return (
    <div className="form-line">
      {/* TODO: Need to find e reason why this rule triggers eslint error even if I used 'htmlFor' */}
      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
      <label htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="game-input"
        defaultValue={value}
        onBlur={(event) => onChange(type === 'number' ? event.target.valueAsNumber : event.target.value)}
      />
    </div>
  );
}

export default WrappedInput;
