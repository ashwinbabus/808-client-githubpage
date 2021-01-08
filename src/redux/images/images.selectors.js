import {createSelector} from 'reselect';

const selectImages = state => state.images;

export const selectImagesArray = createSelector(
    [selectImages],
    images => images.images
)

export const selectFoldersArray = createSelector(
    [selectImages],
    images => images.folders
)

export const selectIsImagesFetching = createSelector(
    [selectImages],
    images => images.isImagesFetching
)

export const selectIsFoldersFetching = createSelector(
    [selectImages],
    images => images.isFoldersFetching
)