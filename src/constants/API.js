import APIConfig from '../config/api.json';

const activeConfig = APIConfig[process.env.NODE_ENV];
// const activeConfig = APIConfig[process.env.REACT_APP_STAGE];

export const baseURL =  activeConfig.url;

export const RESPONSE_CODES = {
  SUCCESS: 200,
  UNAUTHORIZED: 401
};

export const DEV_JWT = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJjdXN0b21lciI6eyJpZCI6NDUsImVtYWlsIjoicHJhdmluQGRvYm96LmluIiwiZ3JvdXBfaWQiOiIwIn0sImlzcyI6ImJjL2FwcHMiLCJzdWIiOiJjbTF0cXN6enp0IiwiaWF0IjoxNTk3OTI1NTQ3LCJleHAiOjE1OTc5MjY0NDcsInZlcnNpb24iOjEsImF1ZCI6IjI5NDFxbWVpMnRmbmFjMWFhbmp3aHYzaDdnb3RmNzQiLCJhcHBsaWNhdGlvbl9pZCI6IjI5NDFxbWVpMnRmbmFjMWFhbmp3aHYzaDdnb3RmNzQiLCJzdG9yZV9oYXNoIjoiY20xdHFzenp6dCIsIm9wZXJhdGlvbiI6ImN1cnJlbnRfY3VzdG9tZXIifQ.mXLu8tnGBnsrL-x9W1NTSJ2mDnNRg2aepmicLUkU9Ik7e2t2NPCTNc6j4cVYn13XJljIZkt7d0jIovHvf6IiGg";

export const GIFTCARD = '/giftcard';
export const WIDGET = '/widget';
export const BC = '/bigcommerce/bigcommerce_products';
export const PROFILE = '/profile';