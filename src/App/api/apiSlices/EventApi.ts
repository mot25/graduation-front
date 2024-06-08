import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { ApiRoutes } from '../lib/ApiRoutes';
import { axiosBaseQuery } from '../lib/axiosBaseQuery';

export const EventApi = createApi({
  baseQuery: axiosBaseQuery(),
  reducerPath: 'eventsAPi',
  endpoints: build => ({
    getEvents: build.query<
      CommonTypes.ResponseData<EventsType.ResponseEventsType[]>,
      EventsType.RequestGetEvents
    >({
      query: query => ({
        url: ApiRoutes.GET_EVENTS,
        method: 'GET',
        params: query
      })
    }),
    getEventById: build.query<
      CommonTypes.ResponseData<EventsType.ResponseEventsType>,
      EventsType.RequestGetEventById
    >({
      query: query => ({
        url: ApiRoutes.GET_CATEGORIES_BY_ID + query._id
      })
    }),
    createEvents: build.mutation<
      CommonTypes.ResponseData<EventsType.ResponseEventsType>,
      EventsType.RequestCreateEvent
    >({
      query: query => {
        const fd = new FormData();
        for (const fdKey in query) {
          // @ts-ignore
          const data = query[fdKey] as any;
          if (fdKey === 'images') {
            for (const image of data) {
              fd.append(fdKey, image);
            }
            // console.log('images', data)
          }

          fd.append(fdKey, data);
        }
        return {
          url: ApiRoutes.CREATE_EVENTS,
          method: 'POST',
          data: fd,
          headers: { 'Content-Type': 'multipart/form-data' }
        };
      }
    })
  })
});
export const {
  useGetEventsQuery,
  useCreateEventsMutation,
  useGetEventByIdQuery
} = EventApi;
