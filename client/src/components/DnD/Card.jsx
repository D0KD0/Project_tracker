import React from "react";

const Card = ({ id, title, content, status }) => {
  return (
    <div className="card" draggable="true" id={id}>
      <h3 className="card-title">{title}</h3>
      <p className="card-content">{content}</p>
      <span className="card-status">{status}</span>
    </div>
  );
};

export default Card;
