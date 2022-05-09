import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { City, ListResponse } from "model";

export interface CityState {
    loading: boolean,
    list: City[],
}

const initialState: CityState ={
    loading: false,
    list:[]
}


const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {
        fetCityList(state) {
            state.loading=true
        },
        fetCityListSuccess(state, actions: PayloadAction<ListResponse<City>>) {
            state.loading=false;
            state.list = actions.payload.data
        },
        fetCityListFailed(state) {
            state.loading=true
        },
    },
})

//actions 
export const cityActions = citySlice.actions;

//selector
export const selectCityList = (state:RootState) => state.city.list
export const selectCityMap = createSelector(selectCityList, (cityList) => cityList.reduce((map: {[ket:string]:City}, city)=>{
map[city.code] = city

    return map
},{}))
//reducer
const cityReducer = citySlice.reducer;
export default cityReducer