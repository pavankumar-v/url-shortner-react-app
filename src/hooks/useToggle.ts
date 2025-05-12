import { useState } from 'react';

const useToggle = (value: boolean = false): [boolean, (value?: boolean) => void] => {
  const [toggle, setToggle] = useState<boolean>(value);

  const toggleState = (value?: boolean) => {
    setToggle((val) => {
      if (value !== undefined) {
        return value;
      }

      return !val;
    });
  };

  return [toggle, toggleState];
};

export default useToggle;
