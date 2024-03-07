import * as React from "react";
import { getImageUrl, parseDate } from '../../utils';
import config from "../../data";

function getSvg({ direction, fillColor }) {
  switch (direction) {
    case 'right':
      return <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill={fillColor}><g><path d="M 13.8,24.196c 0.39,0.39, 1.024,0.39, 1.414,0l 6.486-6.486c 0.196-0.196, 0.294-0.454, 0.292-0.71 c0-0.258-0.096-0.514-0.292-0.71L 15.214,9.804c-0.39-0.39-1.024-0.39-1.414,0c-0.39,0.39-0.39,1.024,0,1.414L 19.582,17 L 13.8,22.782C 13.41,23.172, 13.41,23.806, 13.8,24.196z"></path></g></svg>
    default:
      return <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill={fillColor}><g><path d="M 12.3,17.71l 6.486,6.486c 0.39,0.39, 1.024,0.39, 1.414,0c 0.39-0.39, 0.39-1.024,0-1.414L 14.418,17 L 20.2,11.218c 0.39-0.39, 0.39-1.024,0-1.414c-0.39-0.39-1.024-0.39-1.414,0L 12.3,16.29C 12.104,16.486, 12.008,16.742, 12.008,17 C 12.008,17.258, 12.104,17.514, 12.3,17.71z"></path></g></svg>
  }
}

function getFillColor(color) {
  switch (color) {
    case 'secondary':
      return config.colors.secondaryTextColor;
    default:
      return config.colors.textColor;
  }
}

const Arrow = ({ direction, color }) => {
  return (
    <div role="img" aria-label={`Arrow pointing ${direction}`}>
      {getSvg({ direction, fillColor: getFillColor(color) })}
    </div>
  );
};


const ArrowRight = ({ color }) => {
  return (
    <Arrow direction="right" color={color} />
  );
};

const ArrowLeft = ({ color }) => {
  return (
    <Arrow direction="left" color={color} />
  )
}

export {
  ArrowRight,
  ArrowLeft
}


