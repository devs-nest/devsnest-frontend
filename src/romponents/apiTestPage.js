import React, { useEffect, memo } from 'react';
import { useApi } from '@services/api';
const ApiTestPage = () => {
  const postData = {
    title: 'foo',
    body: 'bar',
    userId: 1,
  };
  const putData = {
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  };
  const patchData = {
    title: 'foo',
  };
  // const { data, loading, error } = useApi('get', 'posts'); // GET API
  // const { data, loading, error } = useApi('post', 'posts', postData); // POST API
  // const { data, loading, error } = useApi('put', 'posts/1', putData); // PUT API
  // const { data, loading, error } = useApi('patch', 'posts/1', patchData); // PUT API
  // const { data, loading, error } = useApi('delete', 'posts/1'); // DELETE API
  // console.log(data)
  return <div>this is a API testing page</div>;
};

export default ApiTestPage;
