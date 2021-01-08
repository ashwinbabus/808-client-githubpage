import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import CreatableSelect from "react-select/creatable";

import "./add-options-dialogue-box.styles.scss";

const AddOptionsDialogueBox = ({
  toggleAddOptions,
  setVariant,
  variant,
  saveVariantsAndOptions,
  setEditing,
  value,
  setValue,
  inputValue,
  setInputValue,
}) => {
  const createOption = (label) => ({
    label,
    value: label,
  });

  /* react-select functions */

  const handleSelectChange = (value, actionMeta) => {
    if (value === null) {
      setValue([]);
    } else {
      setValue(value);
    }
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (value) {
          setValue([...value, createOption(inputValue)]);
        }
        setInputValue("");
        event.preventDefault();
        break;
      default:
        return;
    }
  };

  /* update state with values */

  const save = () => {
    saveVariantsAndOptions(value);
    setVariant("");
    setValue([]);
    toggleAddOptions();
    setEditing(false);
  };

  /* component */

  return (
    <div className="add-options-dialogueBox-bg">
      <div className="add-options-dialogueBox-container">
        <div className="add-options-dialogueBox-title-bar">
          <h4>+ADD OPTIONS</h4>
          <span className="close-icon">
            <div
              className="close-icon-container"
              onClick={() => {
                toggleAddOptions();
                setEditing(false);
                setVariant("");
              }}
            >
              <svg
                viewBox="0 0 8 8"
                fill="currentColor"
                width="8"
                height="8"
                data-hook="close-medium"
              >
                <path d="M7.2 0L4 3.2 0.8 0 0.1 0.7 3.3 4 0 7.3 0.7 8 4 4.7 7.3 8 8 7.3 4.7 4 7.9 0.7z"></path>
              </svg>
            </div>
          </span>
        </div>
        <div className="add-options-dialogueBox-form-container">
          <FormInput
            label="Variant Name"
            name="variant_name"
            handleChange={(e) => setVariant(e.target.value)}
            value={variant}
          />
          <CreatableSelect
            components={{ DropdownIndicator: null }}
            inputValue={inputValue}
            isClearable
            isMulti
            menuIsOpen={false}
            onChange={handleSelectChange}
            onInputChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter choices and hit enter"
            value={value}
          />
          <div className="button__container">
            <CustomButton toggle={save}>save</CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOptionsDialogueBox;
