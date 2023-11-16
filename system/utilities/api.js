import { notify } from "./notification";
import axios from "axios";
import {cachify, getCache, removeCache, setCache , updateCache} from "cachifyjs";

export const request = async ({ axiosConfig, cacheConfig }) => {
  try {
    let response = cacheConfig && axiosConfig.method === "GET" ?
        await cachify(axiosConfig, cacheConfig)
        : await axios(axiosConfig);

    if (response.data) {
      return response;
    } else if (response.nodata) {
      // console.log('nodata response:', response);
    } else {
      notify({ success: false, message: response.response.data.message });
    }
  } catch (error) {
    if(!error.response){
      console.error("api-service-error:" , error);
    }
    else if (error.response.data.message === "Unauthenticated.") {
      handleUnAuth(error.response.data.message);
    } else if (error.response.data.errors) {
      return {
        data: {
          success: false,
          type: "validation-error",
          errors: error.response.data.errors,
        }
      };
    } else notify({ success: false, message: error.response.data.message });
  }
};

export const setCacheData = async (config, data) => {
  try {
    await setCache (config, data)
  } catch (error) {
    console.error("Set Cache Error: ", error)
  }
};

export const getCacheData = async (config) => {
  try {
    const response = await getCache (config)
    if (response.data) {
      return response;
    }
  } catch (error) {
    console.error("Get Cache Error: ", error)
  }
};
export const updateCacheData = async (config, data) => {
  try {
    await updateCache (config, data)
  } catch (error) {
    console.error("Update Cache Error: ", error)
  }
};
export const removeCacheData = async (config) => {
  try {
    await removeCache (config)
  } catch (error) {
    console.error("Remove Cache Error: ", error)
  }
};
export const handleError = (error) => {
  if(!error.response){
    console.error("cachify-error:" , error);
  }
  else if (error.response.data.message === "Unauthenticated.") {
    handleUnAuth(error.response.data.message);
  }
};
export const handleUnAuth = (message) => {
  localStorage.removeItem("userToken");
  localStorage.setItem("error", "Please Login to Continue");
  window.location.href = window.location.origin + "/login";
};