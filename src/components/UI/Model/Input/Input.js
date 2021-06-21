import classes from "./Input.module.css";
import React from "react";

const Input = (props) => {
  let inputElement = null;
  let classesName = [classes.InputElement]
  if (props.invalid && props.shouldValidate && props.touched) {
    classesName.push(classes.Invalid)
  }
  
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classesName.join(' ')}
          {...props.elementConfig}
          value={props.value}
            onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classesName.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classesName.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option =>{
            return <option key={option.value} value={option.value}>{option.displayValue}</option>
          })}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={classesName.join(' ')}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
