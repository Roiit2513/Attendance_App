import { createSlice, PayloadAction} from "@reduxjs/toolkit";

const date = new Date();
const DateString = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();

type InitialState = {
    value: DateState;
}
type DateState = {
    DateString: string,
}

const initialState = {
    value: {
        DateString: DateString, 
    } as DateState,
} as InitialState;

export const currDate = createSlice({
    name: "currDate",
    initialState,
    reducers: {
        setCurrDate: (state, action: PayloadAction<string>) => {
            return {
                value : {
                    DateString: action.payload,
                }
            };
        },
    },
});

export const { setCurrDate } = currDate.actions;
export default currDate.reducer;