import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ApiRoutes } from '../lib/ApiRoutes';
import { axiosBaseQuery } from '../lib/axiosBaseQuery';

export const AuthApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'AuthApi',
  endpoints: build => ({
    createUsers: build.mutation<
      CommonTypes.ResponseData<CommonTypes.defaultResponseData>,
      AuthTypes.RequestRegistrationUser
    >({
      query: query => {
        const fd = new FormData();
        for (const fdKey in query) {
          // @ts-ignore
          const data = query[fdKey] as any;

          fd.append(fdKey, data);
        }
        return {
          url: ApiRoutes.REGISTRATION_USER,
          method: 'POST',
          data: fd,
          headers: { 'Content-Type': 'multipart/form-data' }
        };
      }
    }),
    loginUsers: build.mutation<
      CommonTypes.ResponseData<any>,
      AuthTypes.RequestLoginUser
    >({
      query: query => {
        return {
          url: ApiRoutes.LOGIN_USER,
          method: 'POST',
          data: query
        };
      }
    })
  })
});

export const { useCreateUsersMutation, useLoginUsersMutation } = AuthApi;
