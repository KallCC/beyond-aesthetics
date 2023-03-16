import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Post, User } from '../../ts/interfaces'
import { client } from '../../client';
import { allPostsQuery, allSavedPostsQuery, searchQuery, userCreatedPostsQuery } from '../../utils/data';
import { Status } from '../../ts/types';
import { SanityDocumentStub } from '@sanity/client';

interface postsState {
  all: Post[]
  created: Post[]
  saved: Post[]
  status: Status
  error: null | string
}

const initialState = {
  all: [],
  created: [],
  saved: [],
  status: 'idle',
  error: null
} as postsState

export const deletedPost = createAsyncThunk<SanityDocumentStub<Record<string, any>>, string>('posts/deletedPost', async (id) => {

  const document = await client.getDocument(id)

  if(document){
    const dependentUsers = await client.fetch(`*[_type == "user" && references($id) && defined(save)]`, { id })
    //console.log('dependentUsers',dependentUsers);
    //cascading delete
    await Promise.all(dependentUsers.map(async (dependentUser: User) => {
      if(dependentUser._id && dependentUser.save){
        const index = dependentUser.save.findIndex(save => save.postId === document._id)
    
        if (index !== -1) {
          dependentUser.save.splice(index, 1)
          await client.patch(dependentUser._id).set({ save: dependentUser.save }).commit()
        }
      }
    }))
  }

  let deletedPost = await client.delete(id).then((data) => {
    return data
  });

  return deletedPost
})

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
  let posts = await client.fetch(allPostsQuery).then((data) => {
    return data
  });

  return posts
})

export const fetchCreatedPosts = createAsyncThunk<Post[], string>('posts/fetchCreatedPosts', async (userId) => {
  const createdPinsQuery = userCreatedPostsQuery(userId);
  let posts = await client.fetch(createdPinsQuery).then((data) => {
    return data
  });
  return posts
})


export const fetchSavedPosts = createAsyncThunk<Post[], Array<string>, { state: { user: { user: User } } }>('posts/fetchSavedPosts', async (savedIds) => {

  const savedPostsQuery = allSavedPostsQuery();
  let posts = await client.fetch(savedPostsQuery, { postsIds: savedIds }).then((data) => {
    return data
  });

  return posts
})

export const fetchTearmPosts = createAsyncThunk<Post[], string>('posts/fetchTearmPosts', async (searchTearm) => {
  const query = searchQuery(searchTearm)
  let posts = await client.fetch(query).then((data) => {
    return data
  });
  return posts
})

export const addNewPost = createAsyncThunk<Post, SanityDocumentStub<Post>, { state: { user: { user: User } } }>('posts/addNewPost', async (doc, { getState }) => {
  let user = getState().user.user
  let post = client.create(doc).then((res) => {
    if (res.postedBy) {
      res.postedBy.image = user.image
      res.postedBy.userName = user.userName
      res.postedBy._id = user._id
    }
    return res
  });
  return post
}
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    allpostsAdded: (state, action: PayloadAction<Post[]>) => {
      state.all = action.payload
    },
    statusChange: (state, action: PayloadAction<Status>) => {
      state.status = action.payload
    },
    resetPostsState: (state) => {
      state = initialState
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.all = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        if (action.error.message) {
          state.error = action.error.message
        }
      })
      .addCase(fetchTearmPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTearmPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.all = action.payload
      })
      .addCase(fetchTearmPosts.rejected, (state, action) => {
        state.status = 'failed'
        if (action.error.message) {
          state.error = action.error.message
        }
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.all.unshift(action.payload)
        state.created.unshift(action.payload)
      })
      .addCase(deletedPost.fulfilled, (state, action) => {
        state.all = state.all.filter(post => post._id !== action.payload['documentIds'][0])
        state.created = state.created.filter(post => post._id !== action.payload['documentIds'][0])
      })
      .addCase(fetchCreatedPosts.fulfilled, (state, action) => {
        state.created = action.payload
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.saved = action.payload
      })
  }
})

export const { allpostsAdded, statusChange, resetPostsState } = postsSlice.actions

export const selectAllposts = (state: RootState) => state.posts.all
export const selectCreated = (state: RootState) => state.posts.created
export const selectSaved = (state: RootState) => state.posts.saved
export const getPostsStatus = (state: RootState) => state.posts.status;
export const getPostsError = (state: RootState) => state.posts.error;

export default postsSlice.reducer