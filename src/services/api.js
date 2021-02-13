import React, { useState, useEffect, useCallback } from 'react';
import axios from '@config/axios.config';

/**
 * API custom hook
 * @param {string} method api method type (get post put delete patch)
 * @param {string} url sub-url expected without the base-url
 * @param {Object} dataObject data object to send
 * @param {Object} params basic get parameters for ex { ID: 12345 } if the get API is something like /user?ID=12345
 */
const useApi = (method, url, dataObject = null, params = null) => {
  const [data, setData] = useState(null); // set data
  const [loading, setLoading] = useState(false); // set loading state
  const [error, setError] = useState(null); // set error state
  // (component did mount) as it would run only once to avoid repeated calls
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: method,
        url: url,
        data: dataObject,
        params: params,
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, loading, error };
};
export { useApi };
