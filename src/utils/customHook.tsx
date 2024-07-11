import { useEffect, useState } from 'react';

export default function useCustom() {
  const [value, setValue] = useState('this is custome');

  useEffect(() => {
    setValue('dsdsdsd');
  }, []);
  return value;
}
