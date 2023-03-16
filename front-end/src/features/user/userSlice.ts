import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Save, User } from '../../ts/interfaces'
import { client } from '../../client';
import { Status } from '../../ts/types';
import jwt_decode from "jwt-decode";
import { IdentifiedSanityDocumentStub } from '@sanity/client';
import { userQuery } from '../../utils/data';

interface userState {
    user: User
    loggedin: boolean
    status: Status
    error: null | string
}

const initialState = {
    loggedin: false,
    status: 'idle',
} as userState

export const savedPost = createAsyncThunk<Save, { postId: string, userId: string }>('user/savedPost', async ({ postId, userId }) => {
    let res = await client
        .patch(userId)
        .setIfMissing({ save: [] })
        .insert('after', `save[-1]`, [{
            _key: nanoid(),
            savedFrom: {
                _type: 'savedFrom',
                _ref: postId,
            },
            postId: postId
        }])
        .commit().then((response) => {
            return response['save'][response['save'].length - 1]
        })
    return res
})

export const unsavePost = createAsyncThunk<string, { postId: string, userId: string }>('user/unsavePost', async ({ postId, userId }) => {
    await client
        .patch(userId)
        .unset([`save[ postId == "${postId}"]`])
        .commit()
    return postId
})

export const loginUser = createAsyncThunk<User, string>('user/login', async (credential) => {
    const userObject: { name: string, sub: string, picture: string } = jwt_decode(credential);
    const { name, sub, picture } = userObject;

    const doc: IdentifiedSanityDocumentStub<User> = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
    };

    let user = await client.createIfNotExists(doc).then((e) => {
        return e
    })
    localStorage.setItem('user', user._id);
    return user

})

export const alreadyLoggedIn = createAsyncThunk<User, string>('user/alreadyLoggedIn', async (userInfo) => {
    const q = userQuery(userInfo);
    let user = await client.fetch(q).then((response) => {
        return response[0]
    })
    return user
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.loggedin = true
        },
        resetUserState: (state) => {          
            localStorage.clear();
            state = initialState
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.loggedin = true
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                if (action.error.message) {
                    state.error = action.error.message
                }
            })
            .addCase(alreadyLoggedIn.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(alreadyLoggedIn.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.loggedin = true
                state.user = action.payload
            })
            .addCase(alreadyLoggedIn.rejected, (state, action) => {
                state.status = 'failed'
                if (action.error.message) {
                    state.error = action.error.message
                }
            })
            .addCase(savedPost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(savedPost.fulfilled, (state, action) => {
                state.status = 'succeeded'
                if (state.user.save) {
                    state.user.save.unshift(action.payload)
                }
            })
            .addCase(unsavePost.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(unsavePost.fulfilled, (state, action) => {
                if (state.user.save) {
                    state.user.save = state.user.save.filter(save => save.postId !== action.payload)
                }
                state.status = 'succeeded'
            })
    }
})
export const { addUser,resetUserState } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
export const isLoggedIn = (state: RootState) => state.user.loggedin
export const getUserStatus = (state: RootState) => state.user.status;
export const getUserError = (state: RootState) => state.user.error;

export default userSlice.reducer