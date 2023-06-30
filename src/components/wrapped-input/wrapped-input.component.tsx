import React from 'react';

type NumberInputProps = {
  name: string,
  type: 'number',
  value: number,
  label: string,
  onChange: (newValue: number) => void
};

type TextInputProps = {
  name: string,
  type: 'text',
  value: string,
  label: string,
  onChange: (newValue: string) => void
};

function WrappedInput({
  type, name, value, label, onChange,
}: NumberInputProps | TextInputProps) {
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
        // NOTE: In JS we can put ternary operator into brackets of onChange to chose value to use as argument,
        // but then TS can't match properly types of value and of callback argument.
        // If ternary operator "outside of onChange" - types matched properly.
        onBlur={(event) => (type === 'number' ? onChange(event.target.valueAsNumber) : onChange(event.target.value))}
      />
    </div>
  );
}

export default WrappedInput;
