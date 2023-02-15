import { FormControlLabel, Radio } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { MattersContext } from "../../context/MattersContext";

export default function CategoryItem(props) {
  const { deleteCategory, updateCategoryName, assignCategory, categories } =
    useContext(MattersContext);

  const [categoryName, setCategoryName] = useState(props.label);
  const [categoryColor, setCategoryColor] = useState(props.color);

  useEffect(() => {
    setCategoryColor(props.color);
  }, [categories]);

  const handleChange = (event) => {
    setCategoryName(event.target.value);
    updateCategoryName(props.value, event.target.value);
  };

  const handleMark = async (event) => {
    let status;
    // console.log(event.target.value + "=======" + props.whichIsChecked);
    if (parseInt(event.target.value) === props.whichIsChecked) {
      status = null;
    } else {
      status = event.target.value;
    }
    await assignCategory(status);
    await props.checkMethod(status);
  };

  const handleDelete = () => {
    deleteCategory(props.value);
  };

  return (
    <div className="category-item-div">
      <FormControlLabel
        value={props.value}
        control={props.control}
        //label={props.l}
        onClick={handleMark}
        checked={props.whichIsChecked === props.value ? true : false}
      />
      <input
        className="category-item-input"
        value={categoryName}
        onChange={handleChange}
      ></input>
      <span
        className="color-dot-span"
        onClick={props.onClickColorDot}
        title={props.value}
        style={{ backgroundColor: categoryColor }}
      ></span>
      <div
        style={{
          position: "relative",
          // right: "30px",
          // bottom: "50px",
          zIndex: "2",
        }}
      >
        {/* <CirclePicker /> */}
      </div>
      <button
        className="delete-category-button"
        onClick={handleDelete}
      ></button>
    </div>
  );
}
