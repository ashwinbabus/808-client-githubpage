import { takeLatest, put, all, call } from "redux-saga/effects";
import { getFolders, getImages } from "../api";
import ImagesActionTypes from './images.action-types';
import { fetchFoldersSuccess , fetchFoldersFailure , fetchImagesSuccess , fetchImagesFailure } from "./images.actions";


/*  folders  */

function* onFetchFoldersStart () {
    yield takeLatest(ImagesActionTypes.FETCH_FOLDERS_START,fetchFolders)
}

function* fetchFolders({payload}){
    console.log(payload);
    try{
        const folders = yield getFolders(payload);
        yield put(fetchFoldersSuccess(folders))
    } catch(error) {
        yield put(fetchFoldersFailure(error))
    }
}


/* images */

function* onFetchImagesStart(){
    yield takeLatest(ImagesActionTypes.FETCH_IMAGES_START,fetchRootImages)
}

function* fetchRootImages({payload}){
    console.log("image saga payload ",payload);
    try {
        const images = yield getImages(payload);
        yield put(fetchImagesSuccess(images))
    } catch (error) {
        yield put(fetchImagesFailure(error));
    }
}


/* yield all */

export function* imagesSagas(){
    yield all([call(onFetchFoldersStart),call(onFetchImagesStart)])
}



