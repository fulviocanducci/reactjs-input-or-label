import React, { ChangeEvent, FocusEvent, KeyboardEvent, memo, MouseEvent, useCallback, useEffect, useRef, useState } from "react";

interface IInputOrLabelProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  classNameInput: string | undefined;
  classNameLabel: string | undefined;
}

const useToogle = (initialValue = false) => {
  const [status, setStatus] = useState<Boolean>(initialValue);
  function toogleStatus() {
    setStatus((value) => !value);
  }
  return { status, toogleStatus };
};

const InputOrLabel = memo(({ value, onChange, classNameInput, classNameLabel }: IInputOrLabelProps) => {
  const { status, toogleStatus } = useToogle();
  const refInput = useRef<HTMLInputElement>(null);
  const handleSpanClick = useCallback(
    (e: MouseEvent<HTMLSpanElement>) => {
      e.preventDefault();
      toogleStatus();
    },
    [toogleStatus]
  );

  const handleInputBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      e.preventDefault();
      toogleStatus();
    },
    [toogleStatus]
  );

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key.toUpperCase() === "ENTER") {
        toogleStatus();
      }
    },
    [toogleStatus]
  );

  useEffect(() => {
    if (status) {
      if (refInput && refInput.current) {
        refInput.current.select();
      }
    }
  }, [status]);

  if (status) {
    return <input value={value} ref={refInput} onChange={onChange} onBlur={handleInputBlur} onKeyDown={handleInputKeyDown} className={classNameInput}></input>;
  }

  return (
    <span className={classNameLabel} onClick={handleSpanClick}>
      {value || "..."}
    </span>
  );
});

export default InputOrLabel;
