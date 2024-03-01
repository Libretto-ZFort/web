import { useEffect, useState } from 'react';

export function useEditableElement(
  callback: (value: string) => void,
  defaultValue = ''
) {
  const [value, setValue] = useState<string>(defaultValue);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const [valueEditable, setValueEditable] = useState<boolean>(false);
  const handleValueEdit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    setValueEditable(false);

    if (
      !event.currentTarget.textContent ||
      event.currentTarget.textContent.trim().length === 0
    ) {
      event.currentTarget.textContent = defaultValue;
      setValue(defaultValue);
      return;
    }

    setValue(event.currentTarget.textContent);
    callback(event.currentTarget.textContent);
  };

  return [value, valueEditable, setValueEditable, handleValueEdit] as const;
}
