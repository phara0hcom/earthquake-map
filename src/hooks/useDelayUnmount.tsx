import { useState, useEffect } from 'react';

const useDelayUnmount = (
  delay: number,
  show: boolean
): { render: boolean; animate: boolean } => {
  const [render, setRender] = useState(show);
  const [animate, setAnimate] = useState(!show);

  useEffect(() => {
    if (show) {
      setRender(true);
      setTimeout(() => {
        setAnimate(true);
      }, 5);
    } else {
      setAnimate(false);
      setTimeout(() => {
        setRender(false);
      }, delay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return { render, animate };
};

export default useDelayUnmount;
