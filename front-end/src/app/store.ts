import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import userReducer from '../features/user/userSlice'
import uiReducer from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    ui: uiReducer
   },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch