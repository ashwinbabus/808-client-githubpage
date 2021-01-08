import ImagesActionTypes from "./images.action-types";

const INITIAL_STATE = {
  folders: [],
  images: [],
  isFoldersFetching: false,
  isImagesFetching: false,
  errors: null,
};


const imagesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ImagesActionTypes.FETCH_FOLDERS_START:
      return {
        ...state,
        isFoldersFetching: true,
      };

    case ImagesActionTypes.FETCH_FOLDERS_SUCCESS:
      return {
        ...state,
        isFoldersFetching: false,
        folders: action.payload,
      };

    case ImagesActionTypes.FETCH_IMAGES_START:
      return {
        ...state,
        isImagesFetching: true,
      };

    case ImagesActionTypes.FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        isImagesFetching: false,
        images: action.payload,
      };

    case ImagesActionTypes.FETCH_FOLDERS_FAILURE:
      return {
        ...state,
        isFoldersFetching: false,
        errors: action.payload,
      };

    case ImagesActionTypes.FETCH_IMAGES_FAILURE:
      return {
        ...state,
        isImageFetching: false,
        errors: action.payload,
      };

    case ImagesActionTypes.PUSH_IMAGES_TO_ARRAY:
      return {
        ...state,
        isFetching: false,
        images: [...state.images, action.payload],
      };
    case ImagesActionTypes.PUSH_FOLDER_TO_ARRAY:
        return{
            ...state,
            folders : [...state.folders,action.payload]
        }
    
    case ImagesActionTypes.POP_FOLDER_FROM_ARRAY:
        return{
            ...state,
            folders : state.folders.filter(
                folder => folder.path !== action.payload
            )
        }

    case ImagesActionTypes.POP_IMAGES_FROM_ARRAY:
      return{
        ...state,
        images : state.images.filter( image => !action.payload.includes(image.public_id) )
      }

    default:
      return state;
  }
};

export default imagesReducer;
