import React, { Key } from 'react';

export type SizeOptionItem = { key: Key, value: string, label: string };

type SelectProps = {
  name: string,
  value: string,
  label: string,
  options: SizeOptionItem[],
  onChange: (newValue: string) => void
};

function WrappedSelect({
  name, value, label, options, onChange,
}: SelectProps) {
  return (
    <div className="form-line">
      {/* TODO: Need to find e reason why this rule triggers eslint error even if I used 'htmlFor' */}
      { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
      <label htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        id={name}
        className="game-select"
        defaultValue={value}
        onChange={(event) => onChange(event.target.value)}
      >
        { options.map((it) => (
          <option value={it.value} key={it.key}>{ it.label }</option>
        )) }
      </select>
    </div>
  );
}

export default WrappedSelect;
