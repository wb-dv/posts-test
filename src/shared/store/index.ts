// yes, it is not following to the FSD, but it is :)
import { RootState, AppDispatch } from '@/app/store';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
