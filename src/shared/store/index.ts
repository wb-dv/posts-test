// yes, it is not following to the FSD, but it is :)
import { RootState, TAppDispatch } from '@/app/store';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
