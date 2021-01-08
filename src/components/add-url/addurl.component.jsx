import React, { useState } from "react";
import Select from "react-select";
import { Image } from "cloudinary-react";
import "./addurl.styles.scss";
import CustomButton from "../custom-button/custom-button.component";

export default function AddUrl({
  variantsArr,
  hideMe,
  options,
  userSelectedImages,
  variantsArrWithImages,
  setVariantsArrWithImages,
  optionImagesArr,
  setOptionsImagesArr
}) {
  const variantsArrForSelect = variantsArr.map((variant) => ({
    label: variant,
    value: variant,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentVariant, setCurrentVariant] = useState(variantsArr[0]);
  const [selectedOption, setSelectedOption] = useState("");
  const [tempImagesArr, setTempImagesArr] = useState([]);
  const [showSelectedImages, setShowSelectedImages] = useState(false);
  const [selectedTargets, setSelectedTargets] = useState([]);


  const optionImagesHandler = (image, e) => {
    if (!tempImagesArr.includes(image)) {
      setTempImagesArr([...tempImagesArr, image]);
      e.target.classList.add("optionsimage__select");
      setSelectedTargets([...selectedTargets, e.target]);
    } else {
      const filteredArr = tempImagesArr.filter((img) => img !== image);
      setTempImagesArr([...filteredArr]);
      e.target.classList.remove("optionsimage__select");
      const filteredSelectedTargets = selectedTargets.filter(
        (item) => item !== e.target
      );
      setSelectedTargets(filteredSelectedTargets);
    }
  };

  const handleSelectChange = (e) => {
    const index = variantsArr.indexOf(e.value);
    setCurrentIndex(index);
    setCurrentVariant(e.value);
  };

  const createOptionsImageArray = () => {
    setTempImagesArr([]);
    let optionImageObj = {};
    let index = optionImagesArr.findIndex(
      (obj) => Object.keys(obj)[0] === selectedOption
    );
    if (index < 0) {
      console.log("if block executed");
      optionImageObj = {
        [selectedOption]: tempImagesArr,
      };
      setOptionsImagesArr([...optionImagesArr, optionImageObj]);
    } else {

      let temp = [...optionImagesArr];
      let imagesInObj = [...Object.values(temp[index]).flat()];
      let filteredTempImages = tempImagesArr.filter(
        (img) => !imagesInObj.includes(img)
      );
      temp[index] = {
        [selectedOption]: [...imagesInObj, ...filteredTempImages],
      };
      setOptionsImagesArr(temp);
    }
  };

  const removeImage = (img, option) => {
    let index = optionImagesArr.findIndex(
      (obj) => Object.keys(obj)[0] === option
    );
    let temp = [...optionImagesArr];
    let imagesInOption = [...Object.values(temp[index]).flat()];
    let filteredImages = imagesInOption.filter((image) => image !== img);
    temp[index] = {
      [Object.keys(temp[index])[0]]: [...filteredImages],
    };
    setOptionsImagesArr(temp);
  };

  const apply = () => {
    hideMe(false);
    console.log();
    let tempVwIARR = variantsArrWithImages;
    let index = tempVwIARR.findIndex(
      (variant) => Object.keys(variant)[0] === currentVariant
    );
    tempVwIARR[index] = {
      [currentVariant]: [...optionImagesArr],
    };

    console.log("option images :::::: " , optionImagesArr);
    setVariantsArrWithImages(tempVwIARR);

    // if(!Object.keys(Object.assign({},...variantsArrWithImages)).includes(currentVariant)){
    //   setVariantsArrWithImages([...variantsArrWithImages,obj]);
    // }
  }

  const handleAddImageInnerBoxActions = (option) => {
    setTempImagesArr([]);
    setSelectedOption(option.value);
    setShowSelectedImages(true);
    selectedTargets.forEach((item) =>
      item.classList.remove("optionsimage__select")
    );
  };

  return (
    <div className="addurl">
      <div className="addurl__container">
        <div className="addurl__header">
          <h4>Choose Images To an option</h4>
          <span className="close-icon" onClick={() => hideMe(false)}>
            <svg
              viewBox="0 0 8 8"
              fill="currentColor"
              width="8"
              height="8"
              data-hook="close-medium"
              id="close-icon"
            >
              <path d="M7.2 0L4 3.2 0.8 0 0.1 0.7 3.3 4 0 7.3 0.7 8 4 4.7 7.3 8 8 7.3 4.7 4 7.9 0.7z"></path>
            </svg>
          </span>
        </div>
        <div className="addurl__body">
          <div className="addurl__info">
            <h4>
              Select an option and connect images you want customers to see when
              they click on that option's choices.
            </h4>
            <h5>Select an option</h5>
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={variantsArrForSelect[0]}
              isSearchable={true}
              name="color"
              options={variantsArrForSelect}
              onChange={(e) => handleSelectChange(e)}
            />
          </div>
          <div className="addurl__table">
            <div className="table__header table__flex">
              <h4 className="col1">Choices</h4>
              <h4 className="col2">Product Images</h4>
            </div>
            {options[currentIndex].map((option) => {
              return (
                <div className="table__body table__flex" key={option.value}>
                  <h4 className="col1">{option.value}</h4>
                  <div className="col2">
                    {/* display the images once selected */}

                    {optionImagesArr.length &&
                    optionImagesArr.find(
                      (obj) => Object.keys(obj)[0] === option.value
                    ) !== undefined
                      ? Object.values(
                          optionImagesArr.find(
                            (obj) => Object.keys(obj)[0] === option.value
                          )
                        )
                          .flat()
                          .map((img) => (
                            <div className="optionsimage__container" key={img}>
                              <div className="delete__icon">
                                <img
                                  src="https://img.icons8.com/material-rounded/24/ffffff/delete-forever.png"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => removeImage(img, option.value)}
                                  alt="delete"
                                />
                              </div>
                              <Image
                                publicId={img}
                                cloudName="ashwin808"
                                height="45"
                              />
                            </div>
                          ))
                      : null}

                    {/* link images to options button and container showing the selected images */}

                    <div className="addimage__outerbox">
                      {userSelectedImages.length > 0 && showSelectedImages ? (
                        <div
                          className={`user_selected_images__container  ${
                            option.value !== selectedOption
                              ? "hideImagesContainer"
                              : ""
                          } `}
                        >
                          {userSelectedImages.map((image) => (
                            <Image
                              publicId={image}
                              cloudName="ashwin808"
                              key={image}
                              height="75"
                              onClick={(e) => optionImagesHandler(image, e)}
                              className="selected__image"
                            />
                          ))}

                          {tempImagesArr.length > 0 ? (
                            <img
                              src="https://img.icons8.com/carbon-copy/100/000000/zombie-hand-thumbs-up.png"
                              alt="okay"
                              style={{ height: "50px" }}
                              className="Layer_1"
                              onClick={() => {
                                createOptionsImageArray();
                                setShowSelectedImages(false);
                              }}
                            ></img>
                          ) : null}
                        </div>
                      ) : null}

                      <div
                        className="addimage__innerbox"
                        onClick={() => {
                          handleAddImageInnerBoxActions(option);
                        }}
                      >
                        <h1>+</h1>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="addurl__buttons">
            <CustomButton toggle={()=>apply()}>Apply</CustomButton>
        </div>
      </div>
    </div>
  );
}
