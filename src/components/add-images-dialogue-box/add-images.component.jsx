import React, { useEffect, useRef, useState } from "react";
import PackmanLoader from "./packman-loader.component";
import _ from "lodash";
import { Image } from "cloudinary-react";
import "./add-images.component.scss";
import {
  fetchImagesStart,
  pushImagesToArray,
  fetchFoldersStart,
  pushFolderToArray,
  popFolderFromArray,
  popImagesFromArray,
} from "../../redux/images/images.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectFoldersArray,
  selectImagesArray,
  selectIsFoldersFetching,
  selectIsImagesFetching,
} from "../../redux/images/images.selectors";
import {
  createFolder,
  createUploadPreset,
  deleteFolderAsync,
  deleteImages,
} from "../../redux/api";

function Upload({
  setShowAddImage,
  folders,
  fetchImages,
  fetchFolders,
  isImagesFetching,
  isFoldersFetching,
  images,
  pushImagesToArray,
  setUserSelectedImages,
  popFolderFromArray,
  popImagesFromArray,
}) {
  const [selectedFolder, setSelectedFolder] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [addNewFolder, setAddNewFolder] = useState(false);
  const [newfolderName, setNewFolderName] = useState("");
  const [currentFolder, setCurrentFolder] = useState({
    name: "808_STORE",
    path: "808_STORE",
  });
  const newFolderInp = useRef();
  const y = window.cloudinary;

  const widget = y.createUploadWidget(
    {
      cloudName: "ashwin808",
      uploadPreset: `${currentFolder.name}_preset`,
    },
    (error, result) => {
      if (error) {
        console.error(error);
      }

      if (!error && result && result.event === "success") {
        pushImagesToArray(result.info);
      }
    }
  );

  const cloudiNaryFunc = () => {
    widget.open();
  };

  /* folder functions */

  const saveNewFolder = async (e) => {
    if (e.key === "Enter") {
      await createFolder(currentFolder.path + "/" + newfolderName);
      await createUploadPreset({
        name: newfolderName,
        path: `${currentFolder.path}/${newfolderName}`,
      });
      await fetchFolders(currentFolder.path);
      setNewFolderName("");
      setAddNewFolder(false);
    }
  };

  const deleteFolder = () => {
    if (!_.isEmpty(selectedFolder)) {
      deleteFolderAsync(selectedFolder.path);
      popFolderFromArray(selectedFolder.path);
      setSelectedFolder({});
    }
    if (selectedImages.length > 0) {
      deleteImages(selectedImages);
      popImagesFromArray(selectedImages);
      setSelectedImages([]);
    }
  };

  const selectImages = (image, e) => {
    console.log(image);
    if (selectedImages.includes(image)) {
      const filteredArr = selectedImages.filter((img) => img !== image);
      setSelectedImages(filteredArr);
      e.target.classList.remove("image__select");
    } else {
      setSelectedImages([...selectedImages, image]);
      e.target.classList.add("image__select");
    }
  };

  useEffect(() => {
    if (
      newFolderInp.current !== undefined &&
      newFolderInp &&
      newFolderInp.current
    )
      newFolderInp.current.focus();
  }, [addNewFolder]);

  /* component return */

  console.log("current folder ", currentFolder);

  return (
    <div className="addimages__background">
      <div className="addimages">
        <div className="addimages__header">
          <h4 style={{ color: "white" }}>Choose Images</h4>
          <h4
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => {
              setShowAddImage(false);
              fetchImages();
            }}
          >
            X
          </h4>
        </div>

        <div className="addimages__container">
          <div className="addimages__container--actions">
            <div className="folder__path">
              {currentFolder.path.split("/").map((path, index, arr) => (
                <div className="folder__path__link" key={index}>
                  <h6
                    onClick={() => {
                      let goto = "";
                      if (arr.length - 1 === index) return;
                      else if (index === 0) {
                        goto = path;
                      } else {
                        goto = arr.slice(0, index + 1).join("/");
                      }
                      fetchFolders(goto);
                      fetchImages(goto);
                      setCurrentFolder({
                        name: arr[index],
                        path: goto,
                      });
                    }}
                  >
                    {path}
                  </h6>
                  {arr.length - 1 !== index ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="24"
                      height="24"
                    >
                      <path d="M9.14644661,8.14512634 C9.34170876,7.9498642 9.65829124,7.9498642 9.85355339,8.14512634 L14.206596,12.5 L9.85355339,16.8536987 C9.65829124,17.0489609 9.34170876,17.0489609 9.14644661,16.8536987 C8.95118446,16.6584366 8.95118446,16.3418541 9.14644661,16.1465919 L12.7923824,12.5 L9.14644661,8.85223312 C8.95118446,8.65697098 8.95118446,8.34038849 9.14644661,8.14512634 Z"></path>
                    </svg>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="delete_and_edit">
              {!_.isEmpty(selectedFolder) || selectedImages.length > 0 ? (
                <img
                  src="https://img.icons8.com/ios-filled/24/000000/delete-sign--v1.png"
                  onClick={() => deleteFolder()}
                  style={{ cursor: "pointer" }}
                  alt="delete_icon"
                />
              ) : (
                <img
                  alt="svgImg"
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNjQiIGhlaWdodD0iNjQiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2NjY2NjYyI+PHBhdGggZD0iTTMxLjQ5NzUsMjEuNzE1bC05Ljc4MjUsOS43ODI1bDU0LjUwMjUsNTQuNTAyNWwtNTQuODI1LDU0LjkzMjVsOS42NzUsOS42NzVsNTQuOTMyNSwtNTQuODI1bDU0LjgyNSw1NC44MjVsOS43ODI1LC05Ljc4MjVsLTU0LjgyNSwtNTQuODI1bDU0LjUwMjUsLTU0LjUwMjVsLTkuNzgyNSwtOS43ODI1bC01NC41MDI1LDU0LjUwMjV6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4="
                  style={{ height: "24px" }}
                />
              )}
              <img
                src="https://img.icons8.com/ios-glyphs/24/000000/refresh--v1.png"
                onClick={() => {
                  fetchFolders(currentFolder.path);
                  fetchImages(currentFolder.path);
                }}
                style={{ cursor: "pointer" }}
                alt="refresh"
              />
              <img
                src="https://img.icons8.com/ios/26/000000/add-folder--v1.png"
                onClick={() => {
                  setAddNewFolder(true);
                }}
                alt="add_folder"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          {isFoldersFetching || isImagesFetching ? (
            <PackmanLoader />
          ) : (
            <div className="addimages__container__body">
              <div className="addimages__container__folders">
                {folders.map((folder, index) => (
                  <div
                    key={index}
                    className="folder__container"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (selectedFolder.name === folder.name) {
                        setSelectedFolder({});
                      } else {
                        console.log(folder);
                        setSelectedFolder(folder);
                      }
                    }}
                    onDoubleClick={() => {
                      fetchFolders(folder.path);
                      fetchImages(folder.path);
                      setCurrentFolder(folder);
                    }}
                  >
                    <img
                      src="https://img.icons8.com/ultraviolet/80/000000/folder-invoices--v1.png"
                      className={`${
                        selectedFolder.name === folder.name
                          ? "focus__folder"
                          : ""
                      }`}
                      alt="folder"
                    />
                    <h6>{folder.name}</h6>
                  </div>
                ))}

                {addNewFolder ? (
                  <div className="new__folder">
                    <div className="new__folder__icon">
                      <img
                        src="https://img.icons8.com/ultraviolet/80/000000/folder-invoices--v1.png"
                        alt="folder_icon"
                      />
                      <div className="new__folder__icon--action">
                        <img
                          src="https://img.icons8.com/ios-glyphs/30/ffffff/macos-close.png"
                          alt="remove_icon"
                          onClick={() => setAddNewFolder(false)}
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      name="folder_name"
                      ref={newFolderInp}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      onKeyDown={(e) => saveNewFolder(e)}
                    />
                  </div>
                ) : null}
              </div>

              <div className="addimages__container__images">
                {images.map((image, index) => (
                  <Image
                    publicId={image.public_id}
                    cloudName="ashwin808"
                    height={75}
                    key={index}
                    onClick={(e) => selectImages(image.public_id, e)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="addimages__footer">
          <div className="addimages__actions">
            <button id="upload" onClick={cloudiNaryFunc}>
              Upload Media
            </button>
            <button
              id="add"
              onClick={() => {
                setUserSelectedImages(selectedImages);
                setShowAddImage(false);
                fetchFolders("808_STORE");
                fetchImages("808_STORE");
              }}
            >
              Add to page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isImagesFetching: selectIsImagesFetching,
  isFoldersFetching: selectIsFoldersFetching,
  images: selectImagesArray,
  folders: selectFoldersArray,
});

const mapDispatchToProps = (dispatch) => ({
  fetchImages: (path) => dispatch(fetchImagesStart(path)),
  fetchFolders: (path) => dispatch(fetchFoldersStart(path)),
  pushImagesToArray: (image) => dispatch(pushImagesToArray(image)),
  pushFolderToArray: (folder) => dispatch(pushFolderToArray(folder)),
  popFolderFromArray: (path) => dispatch(popFolderFromArray(path)),
  popImagesFromArray: (imgArr) => dispatch(popImagesFromArray(imgArr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
