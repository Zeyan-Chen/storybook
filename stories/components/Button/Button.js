import React from 'react';
import './Button.css';

const Button = (props) => {
  const { variant = 'primary', children, task, ...rest } = props;
  return (
    <button className={`button ${variant}`} {...rest}>
      {task.title}
    </button>
  );
}

export default Button;
