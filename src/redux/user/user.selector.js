import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  (currentUser) => (currentUser ? currentUser._id : null)
);

export const selectIsAdmin = createSelector(
  [selectCurrentUser],
  (currentUser) => (currentUser ? currentUser.admin : null)
);

export const selectError = createSelector([selectUser], (user) => user.error);
