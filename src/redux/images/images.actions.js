import ImagesActionTypes from "./images.action-types";



export const fetchFoldersStart = (path) => ({
    type : ImagesActionTypes.FETCH_FOLDERS_START,
    payload : path
})

export const fetchFoldersSuccess = (folders) => ({
    type : ImagesActionTypes.FETCH_FOLDERS_SUCCESS,
    payload : folders
})

export const fetchFoldersFailure = error => ({
    type : ImagesActionTypes.FETCH_FOLDERS_FAILURE,
    payload : error
})


export const fetchImagesStart = (path) => ({
    type : ImagesActionTypes.FETCH_IMAGES_START,
    payload : path
}) 

export const fetchImagesSuccess = (images) => ({
    type : ImagesActionTypes.FETCH_IMAGES_SUCCESS,
    payload : images
})

export const fetchImagesFailure = error => ({
    type : ImagesActionTypes.FETCH_IMAGES_FAILURE,
    payload : error
})

export const pushImagesToArray = image => ({
    type : ImagesActionTypes.PUSH_IMAGES_TO_ARRAY,
    payload : image
}) 


export const createFolder = path => ({
    type : ImagesActionTypes.CREATE_FOLDER,
    payload : path
})

export const pushFolderToArray = folder => ({
    type : ImagesActionTypes.PUSH_FOLDER_TO_ARRAY,
    payload : folder
})

export const popFolderFromArray = path => ({
    type : ImagesActionTypes.POP_FOLDER_FROM_ARRAY,
    payload : path
})

export const popImagesFromArray = arr => ({
    type : ImagesActionTypes.POP_IMAGES_FROM_ARRAY,
    payload : arr
})