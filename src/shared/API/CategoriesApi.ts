import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ApiRoutes } from '../../App/api/lib/ApiRoutes';
import { axiosBaseQuery } from '../../App/api/lib/axiosBaseQuery';

export const CategoriesApi = createApi({
  reducerPath: 'CategoriesApi',
  baseQuery: axiosBaseQuery(),
  endpoints(build) {
    return {
      getCategories: build.query<
        CommonTypes.ResponseData<CategoriesTypes.Category[]>,
        void
      >({
        query: () => ({
          url: ApiRoutes.GET_CATEGORIES
        })
      })
    };
  }
});

// NEXT_PUBLIC_BUCKET_NAME=events-app-e3ce4.appspot.com
// NEXT_PUBLIC_IMAGE_URL=https://firebasestorage.googleapis.com/v0/b

// const urlToImage = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${process.env.NEXT_PUBLIC_BUCKET_NAME}/o/events_${event.mainImage}?alt=media`;

export const { useGetCategoriesQuery } = CategoriesApi;
