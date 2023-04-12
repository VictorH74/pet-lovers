export const GOOGLE_MAPS_API_KEY =
  process.env.GOOGLE_MAPS_API_KEY ||
  (() => {
    throw new Error("GOOGLE_MAPS_API_KEY not defined");
  })();

export const SECRET =
  process.env.JWT_SECRET ||
  (() => {
    throw new Error("SECRET not defined");
  })();

export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  (() => {
    throw new Error("GOOGLE_CLIENT_ID not defined");
  })();

export const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET ||
  (() => {
    throw new Error("GOOGLE_CLIENT_SECRET not defined");
  })();
