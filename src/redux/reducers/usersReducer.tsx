import { createSlice } from "@reduxjs/toolkit"

let initialState:{
    users: object[]
}
let users = localStorage.getItem("users");
initialState={
    users: users ? JSON.parse(users) : []
}

// Creating reducer using redux toolkit 

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        // this is add user action
        addUser:(state, action)=> {
            state.users.push(action.payload);
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        // this is remove user action
        // removeUser:(state, action)=> {
        //     state.users.push(action.payload)
        // },
        

    }
})
export const usersReducer = usersSlice.reducer;
export const action = usersSlice.actions;
export const usersSelector = (state: any) => state.usersReducer.users;