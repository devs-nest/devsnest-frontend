import React from 'react';

const responsiveMultipleItem = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const responsiveSingleItem = {
  ...responsiveMultipleItem,
  superLargeDesktop: {
    ...responsiveMultipleItem.superLargeDesktop,
    items: 1,
  },
  desktop: {
    ...responsiveMultipleItem.desktop,
    items: 1,
  },
  tablet: {
    ...responsiveMultipleItem.tablet,
    items: 1,
  },
};

export { responsiveMultipleItem, responsiveSingleItem };
