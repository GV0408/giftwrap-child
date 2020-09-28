import HTTPService from './index';

import { WIDGET, PROFILE,BC } from '../constants/API';

export const getStoreInfo = (options = {}) => {
  return HTTPService.get({
    url: `${WIDGET}/info`,
    params: options
  });
};

export const addToCart = (data) => {
  return HTTPService.post({
    url: `${WIDGET}/addToCart`,
    data
  });
}

export const identifyProfile = (data) => {
  return HTTPService.post({
    url: `${WIDGET}${PROFILE}/identify`,
    data
  });
};

export const applyPromoCode = (data) => {
  return HTTPService.post({
    url: `${WIDGET}/applyPromoCode`,
    data
  });
};

export const checkBalance = (data) => {
  return HTTPService.post({
    url: `${WIDGET}/checkBalance`,
    data
  });
};

export const sendEmail = (data) => {
  return HTTPService.post({
    url: `${BC}/sendGiftwrapEmail`,
    data
  });


  
};