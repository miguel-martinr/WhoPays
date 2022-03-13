import { useEffect, useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { getBSSize } from '../features/Utils/ScreenSizeBreakPoints';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useBSSize = () => {
  const [size, setSize] = useState(getBSSize());
  
  useEffect(() => {
    const handleResize = () => {
      setSize(getBSSize());
    }

    window.addEventListener('resize', handleResize);
    console.log('listener added');

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

export const useSmallDisplay = () => {
  const size = useBSSize();
  return ['xs', 'sm'].includes(size);
}