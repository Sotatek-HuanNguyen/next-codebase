import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { ReduxState, ReduxDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<ReduxDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;
