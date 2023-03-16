import {  createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Aesthetic } from '../../ts/interfaces';
import {  ThemeOptions } from '../../ts/types';

interface uiState {
  theme: ThemeOptions
  sidebar: boolean
  activeAesthetic: Aesthetic | null
}

const initialState = {
    sidebar: false,
    theme:'light',
    activeAesthetic: null
} as uiState

export const uiSlice = createSlice({
  name: 'uislice',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeOptions>) => {
      state.theme = action.payload
    },
    flipTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light' 
    },
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebar = action.payload
    },
    flipSidebar: (state) => {
      state.sidebar = !state.sidebar
    },
    setAesthetic: (state, action: PayloadAction<Aesthetic>) => {
      state.activeAesthetic = action.payload
    },
    deleteAesthetic: (state) => {
      state.activeAesthetic = null
    },
  },
})

export const { 
  setTheme,
  flipTheme, 
  setSidebar,
  flipSidebar,
  setAesthetic,
  deleteAesthetic 
} = uiSlice.actions

export const getSidebar = (state: RootState) => state.ui.sidebar;
export const getTheme = (state: RootState) => state.ui.theme;
export const getActiveAesthetic = (state: RootState) => state.ui.activeAesthetic;

export default uiSlice.reducer