import React from "react";
import "./CustomizeOrder.css";

const CustomizeOrder = props => {
  return (
    <div>
      <form class="form-group">
        <select
          class="custom-select my-2 mr-sm-2"
          id="select-size"
          onChange={props.handle_CustomizingSize}
        >
          <option selected>Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <select
          class="custom-select my-3 mr-sm-2"
          id="select-color"
          onChange={props.handle_CustomizingColor}
        >
          <option selected>Select Color</option>
          <option value="Blue">Blue</option>
          <option value="Red">Red</option>
          <option value="White">White</option>
        </select>
      </form>
    </div>
  );
};

export default CustomizeOrder;
