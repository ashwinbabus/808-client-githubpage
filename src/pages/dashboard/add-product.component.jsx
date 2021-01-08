import React, { useState } from "react";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormInput from "../../components/form-input/form-input.component";
import QuillEditor from "../../components/quill/quill.component";
import Upload from "../../components/add-images-dialogue-box/add-images.component";
import "./add-product.styles.scss";
import Image from "cloudinary-react/lib/components/Image";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { ReactComponent as LinkIcon } from "../../assets/link.svg";
import {
  fetchFoldersStart,
  fetchImagesStart,
} from "../../redux/images/images.actions";
import { connect } from "react-redux";
import AddOptionsDialogueBox from "../../components/add-options-diagalogue-box/add-options-dialogue-box";
import AddUrl from "../../components/add-url/addurl.component";
import Loader from "../../components/loader/loader.component";
import axios from "axios";
import {serverUrl} from '../../util'

function AddProductComponent({ fetchFolders, fetchImages }) {
  const [showAddImageDialogue, setShowAddImage] = useState(false);
  const [userSelectedImages, setUserSelectedImages] = useState([]);
  const [isOptionsDialogueBoxOpen, setIsOptionsDialogueBoxOpen] = useState(
    false
  );
  const [showLinkImagessDialogueBox, setShowLinkImageDialogueBox] = useState(
    false
  );

  const [sku, setSku] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [variant, setVariant] = useState("");
  const [variantsArr, setVariantsArr] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionImagesArr, setOptionsImagesArr] = useState([]);
  const [variantsArrWithImages, setVariantsArrWithImages] = useState([]);
  const [uploadingData, setUploadingData] = useState(false);

  const [editIndex, setEditIndex] = useState(-1);
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([]);

  const setUserImagesHandler = (imagesArr) => {
    console.log("image handler fired");
    const filteredArray = imagesArr.filter(
      (image) => !userSelectedImages.includes(image)
    );
    setUserSelectedImages([...userSelectedImages, ...filteredArray]);
  };

  const removeImage = (image) => {
    const filteredImages = userSelectedImages.filter((img) => img !== image);
    setUserSelectedImages(filteredImages);
  };

  const fetchFoldersAndImages = () => {
    fetchFolders("808_STORE");
    fetchImages("808_STORE");
    setShowAddImage(!showAddImageDialogue);
  };

  const handleQuillEditorChange = (value) => {
    setDescription(value);
  };

  const saveVariantsAndOptions = (value) => {
    if (editing) {
      variantsArr[editIndex] = variant;
      options[editIndex] = value;
    } else {
      setOptions([...options, value]);
      setVariantsArr([...variantsArr, variant]);
      let objMap = value.map((obj) => {
        return {
          [obj.value]: [],
        };
      });
      setVariantsArrWithImages([...variantsArrWithImages,{
        [variant] : objMap
      }])
    }
  };

  const deleteVariant = (index) => {
    const newVariantsArr = variantsArr.filter((variant, i) => i !== index);
    setVariantsArr(newVariantsArr);
    const newOptionArr = options.filter((option, i) => i !== index);
    setOptions(newOptionArr);
  };

  const editOptions = (index) => {
    setVariant(variantsArr[index]);
    setEditIndex(index);
    setEditing(true);
    setValue(options[index]);
    setIsOptionsDialogueBoxOpen(true);
  };

  const saveToDb = () => {
    const data = {
      sku: parseInt(sku),
      title,
      brand,
      price: parseInt(price),
      category,
      description,
      variants: variantsArrWithImages,
      images: userSelectedImages,
    };

    setUploadingData(true);

    axios
      .post(`${serverUrl}/products`, data)
      .then((res) => {
        setUploadingData(false);
        window.alert("data inserted");
        window.location.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="addproduct__page">
      {showAddImageDialogue ? (
        <Upload
          setShowAddImage={setShowAddImage}
          setUserSelectedImages={setUserImagesHandler}
        />
      ) : null}

      {uploadingData ? (
        <Loader />
      ) : (
        <div className="addproduct__page__container">
          <div className="addproduct__images">
            <div className="addproduct__images__header">
              <h3>Images</h3>
            </div>

            <div
              className={`addproduct__images__body  ${
                userSelectedImages.length <= 0 ? "center__items" : ""
              }  `}
            >
              {userSelectedImages.length > 0 ? (
                <div style={{ display: "flex", gap: "10px" }}>
                  <div className="user__selected__images">
                    {userSelectedImages.length
                      ? userSelectedImages.map((image, index) => (
                          <div
                            className="user__selected__image__container"
                            key={index}
                          >
                            <div
                              className="selected__images--actions"
                              key={index}
                            >
                              <img
                                src="https://img.icons8.com/ios-glyphs/30/ffffff/macos-close.png"
                                style={{ cursor: "pointer" }}
                                onClick={() => removeImage(image)}
                                alt="close"
                              />
                            </div>
                            <Image
                              cloudName="ashwin808"
                              publicId={image}
                              key={image}
                              height="75"
                              radius="10"
                            />
                          </div>
                        ))
                      : null}{" "}
                    <div
                      className="add__image--action"
                      onClick={() => setShowAddImage(!showAddImageDialogue)}
                    >
                      <div className="add__image--action__innerbox">
                        <h1>+</h1>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="addproduct__images__container"
                  onClick={() => fetchFoldersAndImages()}
                >
                  <h4>+ ADD IMAGES</h4>
                </div>
              )}
            </div>
          </div>

          {/* Product general info form */}

          <div className="addproduct__form">
            <div className="addproduct__form__header">
              <h3>Product Info</h3>
            </div>
            <div className="addproduct__form__body">
              <div className="addproduct__form__container">
                <FormInput
                  label="SKU"
                  value={sku}
                  handleChange={(e) => setSku(e.target.value)}
                />
                <FormInput
                  label="Title"
                  value={title}
                  handleChange={(e) => setTitle(e.target.value)}
                />
                <FormInput
                  label="Brand"
                  value={brand}
                  handleChange={(e) => setBrand(e.target.value)}
                />
                <FormInput
                  label="Price"
                  value={price}
                  handleChange={(e) => setPrice(e.target.value)}
                />
                <FormInput
                  label="Category"
                  value={category}
                  handleChange={(e) => setCategory(e.target.value)}
                />
                <QuillEditor
                  placeholder={"Product description ... "}
                  onEditorChange={handleQuillEditorChange}
                  name="description"
                />
              </div>
            </div>
          </div>

          {/* Product Options */}

          <div className="addproduct__options">
            <div className="addproduct__options__header">
              <h3>Product Options</h3>
              {variantsArr.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowLinkImageDialogueBox(true)}
                >
                  <LinkIcon
                    title="Add img urls"
                    style={{ height: "18px", margin: "0 5px" }}
                  />
                  <h6>link images</h6>
                </div>
              ) : null}
            </div>

            <div className="addproduct__options__body">
              <div className="addproduct__options__container">
                {variantsArr && variantsArr.length > 0
                  ? variantsArr.map((variant, index) => (
                      <div className="choices-container" key={index}>
                        <div
                          className="editable"
                          onClick={() => {
                            editOptions(index);
                          }}
                        >
                          <div className="product-option-name">{variant}</div>
                          <div className="choices">
                            {options[index]
                              .map((option) => option.value)
                              .toString()}
                          </div>
                        </div>
                        <div
                          className="delete-icon"
                          onClick={() => deleteVariant(index)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    ))
                  : null}
                {variantsArr.length <= 0 && (
                  <h6>
                    Does your product come in different options, like Size,
                    Color or Material? Add them here.
                  </h6>
                )}
                <CustomButton toggle={() => setIsOptionsDialogueBoxOpen(true)}>
                  {" "}
                  add options{" "}
                </CustomButton>
              </div>
            </div>
          </div>
          <div className="saveproduct__db">
            <CustomButton toggle={() => saveToDb()}>SAVE</CustomButton>
          </div>
        </div>
      )}

      {isOptionsDialogueBoxOpen ? (
        <AddOptionsDialogueBox
          toggleAddOptions={() => setIsOptionsDialogueBoxOpen(false)}
          setVariant={setVariant}
          variant={variant}
          saveVariantsAndOptions={saveVariantsAndOptions}
          editing={editing}
          setEditing={setEditing}
          value={value}
          setValue={setValue}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      ) : null}

      {showLinkImagessDialogueBox && variantsArr.length > 0 ? (
        <AddUrl
          variantsArr={variantsArr}
          hideMe={setShowLinkImageDialogueBox}
          options={options}
          userSelectedImages={userSelectedImages}
          variantsArrWithImages={variantsArrWithImages}
          setVariantsArrWithImages={setVariantsArrWithImages}
          optionImagesArr={optionImagesArr}
          setOptionsImagesArr={setOptionsImagesArr}
        />
      ) : null}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchFolders: (path) => dispatch(fetchFoldersStart(path)),
  fetchImages: (path) => dispatch(fetchImagesStart(path)),
});

export default connect(null, mapDispatchToProps)(AddProductComponent);
