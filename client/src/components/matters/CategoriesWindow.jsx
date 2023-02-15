import { RadioGroup, Radio } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { MattersContext } from "../../context/MattersContext";
import CategoryItem from "./CategoryItem";
import { CirclePicker } from "react-color";

export default function CategoriesWindow() {
  const {
    activeMatter,
    addNewCategory,
    getCategories,
    categories,
    setCategoryColor,
  } = useContext(MattersContext);

  const [checkedCategory, setCheckedCategory] = useState();
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [colorPickerCategoryId, setColorPickerCategoryId] = useState("");

  const handleColorDotClick = (event) => {
    if (event.hex) {
      setCategoryColor(colorPickerCategoryId, event.hex);
    } else {
      setColorPickerCategoryId(parseInt(event.target.title));
      // console.log(event);
    }
    setIsColorPickerVisible(!isColorPickerVisible);
  };

  const handleCheck = (x) => {
    setCheckedCategory(x);
  };
  useEffect(() => {
    getCategories();
    setCheckedCategory(parseInt(activeMatter.categoryId));
    console.log("Control log");
  }, [activeMatter]);

  const CATEGORIES = categories?.map((category) => (
    <CategoryItem
      index={categories.indexOf(category)}
      value={category.id}
      control={<Radio color="secondary" />}
      label={category.name}
      color={category.color}
      checkMethod={handleCheck} // method only to force refreshing component
      whichIsChecked={parseInt(checkedCategory)}
      colorPickerSwitch={isColorPickerVisible}
      onClickColorDot={handleColorDotClick}
    />
    // <FormControlLabel
    //   value={category.id}
    //   control={<Radio />}
    //   label={category.id}
    //   onClick={handleMark}
    // />
  ));

  if (activeMatter.id === 0) {
    return <div></div>;
  } else {
    return isColorPickerVisible ? (
      <div className="categories-window">
        <h5 className="cat-title" style={{ marginTop: "5px" }}>
          Categories
        </h5>
        <div className="categories-window-content">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <CirclePicker onChange={handleColorDotClick} />
          </div>
        </div>
      </div>
    ) : (
      <div className="categories-window">
        <h5 className="cat-title" style={{ marginTop: "5px" }}>
          Categories
        </h5>
        <div className="categories-window-content">
          <RadioGroup>{CATEGORIES}</RadioGroup>
          <button
            className="add-new-todoitem-button"
            onClick={addNewCategory}
          ></button>
        </div>
      </div>
    );
    // if (isColorPickerVisible === true) {
    //   return <div></div>;
    // } else {

    // }
  }

  // return activeMatter.id === 0 ? (
  //   <div></div>
  // ) : (

  // );
}
