import { createSelector } from "reselect";

const selectMyAccount = state => state.myAccount;

export const selectMyAccountTab = createSelector(
    [selectMyAccount],
    myAccount => myAccount.currentTab
)
