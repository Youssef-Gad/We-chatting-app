import { forwardRef, useEffect, useRef } from "react";

function ActivationInputs() {
  const num1Ref = useRef(null);
  const num2Ref = useRef(null);
  const num3Ref = useRef(null);
  const num4Ref = useRef(null);
  const num5Ref = useRef(null);
  const num6Ref = useRef(null);

  useEffect(function () {
    num1Ref.current.focus();
  }, []);

  return (
    <>
      <ActivationNum name="num1" ref={num1Ref} nextRef={num2Ref} />
      <ActivationNum
        name="num2"
        ref={num2Ref}
        nextRef={num3Ref}
        prevRef={num1Ref}
      />
      <ActivationNum
        name="num3"
        ref={num3Ref}
        nextRef={num4Ref}
        prevRef={num2Ref}
      />
      <ActivationNum
        name="num4"
        ref={num4Ref}
        nextRef={num5Ref}
        prevRef={num3Ref}
      />
      <ActivationNum
        name="num5"
        ref={num5Ref}
        nextRef={num6Ref}
        prevRef={num4Ref}
      />
      <ActivationNum name="num6" ref={num6Ref} prevRef={num5Ref} />
    </>
  );
}

export default ActivationInputs;

const ActivationNum = forwardRef(({ name, nextRef, prevRef }, ref) => {
  const handleChange = (e) => {
    if (!/^\d$/.test(e.target.value)) {
      e.target.value = "";
      return;
    }

    if (e.target.value.length === 1 && nextRef?.current)
      nextRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && e.target.value === "" && prevRef?.current)
      prevRef.current.focus();
  };

  return (
    <input
      ref={ref}
      type="text"
      maxLength="1"
      name={name}
      className="activation-num"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
});
