/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
// Since the price value in our API is displayed in cents
// We need this func to convert cents to dollars
export const priceDisplay = priceInCents => `$${priceInCents / 100}`;
