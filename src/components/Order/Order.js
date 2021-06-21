import classes from "./Order.module.css";
import React  from "react";
const Order = (props) => {
  const ingredients = [];
  for (const key in props.ingredients) {
    ingredients.push({ igName: key, mount: props.ingredients[key] });
  }
  const getingredients = ingredients.map((ig) => {
    return (
      <span style={{
          display:'inline-block',
          margin:'0 8px',
          border:'1px solid #ccc',
          padding:'8px'
      }}
      key={ig.igName}>
        {ig.igName}:({ig.mount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients : {getingredients}</p>
      <p>
        Price : <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
