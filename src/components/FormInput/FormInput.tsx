import { useState } from 'react';

type Props = {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  required = true,
}: Props) {
  const [selected, setSelected] = useState(false);

  return (
    <label className="relative">
      <div
        className={`absolute left-4 font-normal text-zinc-600 duration-100 ${
          selected
            ? 'top-1 text-xs text-emerald-800'
            : value
            ? 'top-1 text-xs'
            : 'top-4 text-sm'
        }`}
      >
        {label}
        {required && '*'}
      </div>
      <input
        className={`h-12 w-full rounded-t bg-zinc-100 pl-4 pt-3 text-base font-normal text-zinc-900 outline-0 ${
          selected
            ? 'border-b-2 border-emerald-800 bg-zinc-200'
            : 'border-b border-zinc-500'
        }`}
        type={type}
        onFocus={() => setSelected(true)}
        onBlur={() => setSelected(false)}
        value={value}
        onChange={onChange}
        required={required}
      />
      <div className="mt-1 h-4 px-4 text-xs font-normal">
        {required ? '*obligatorio' : ''}
      </div>
    </label>
  );
}
