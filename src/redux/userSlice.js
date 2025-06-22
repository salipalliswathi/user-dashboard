import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const result = await axios.get('https://reqres.in/api/users?page=1', {
    headers: {
      'x-api-key': 'reqres-free-v1'
    }
  })
  return result.data
})
export const addUserThunk = createAsyncThunk('users/addUser', async ({data, callBack}) => {
  try {
  const result = await axios.post('https://reqres.in/api/users', data, {
    headers: {
      'x-api-key': 'reqres-free-v1'
    }
    })
    callBack()
    return result.data
  }
  catch (error) {
    console.log(error)
  }
})
const userSlice = createSlice(({
  name: 'user',
  initialState: {
    users: [],
    loading: false,
    error: ''
  },
  reducers: {
    updateUsers: (state, data) => {
      console.log(state, data.payload)
      state.users = data.payload
    }
  },
  extraReducers: build => {
    build.addCase(fetchUsers.pending, state => {
      state.loading = true
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload.data
    })
    .addCase(fetchUsers.rejected, state => {
      state.loading = false
      state.error = 'something went wrong'
    })

    // add user
    build.addCase(addUserThunk.pending, state => {
      state.loading = true
    })
    .addCase(addUserThunk.fulfilled, (state, action) => {
      state.loading = false
      state.users.push({
        id: action.payload?.id || Date.now(),
        first_name: action.payload.first_name || '',
        last_name: action.payload.last_name || '',
        email: action.payload.email || '',
        avatar: 'https://i.pravatar.cc/150?img=1' // mock avatar
      });
    })
    .addCase(addUserThunk.rejected, state => {
      state.loading = false
      state.error = 'failed adding user'
    })
  }
}))
export const {updateUsers} = userSlice.actions
export default userSlice.reducer