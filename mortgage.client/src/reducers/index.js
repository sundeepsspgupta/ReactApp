import { combineReducers } from "redux";
import { customerReducers } from "./customer";
import { mortgageReducers } from "./mortgage";
import { dashboardReducers } from "./showMortgage";

export const reducers = combineReducers({
    customerReducers,
    mortgageReducers,
    dashboardReducers
})