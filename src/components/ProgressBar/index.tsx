import React, { useEffect, useState } from 'react';

interface Props {}
export default function ScrollProgressBar({}: Props) {
  const [currentScrollPercent, setCurrentScrollPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop === 0) {
        setCurrentScrollPercent(0);
        return;
      }

      const maxScrollY: number = scrollHeight - clientHeight;
      const currentScrollY = scrollTop || document.body.scrollTop;
      const currentScrollPer = (currentScrollY / maxScrollY) * 100;

      setCurrentScrollPercent(currentScrollPer);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return (
    <progress
      value={currentScrollPercent}
      max="100"
      className="fixed top-16 w-full h-[3px] z-50"
    />
  );
}
