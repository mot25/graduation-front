import { isString } from 'lodash';
import qs from 'qs';
// @ts-ignore
import { BaseQueryArg } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import pathParams from 'path-params';
interface CreateUrlOptionsProps<Q, P> {
  readonly query?: Q;
  readonly params?: P;
  readonly host?: string;
}
export function createUrl<Q, P>(
  path: string,
  options: CreateUrlOptionsProps<Q, P>
): BaseQueryArg<any> {
  const query = isString(options.query)
    ? options.query
    : qs.stringify(options.query);
  const pathname = [options.host, path].filter(Boolean).join('/');
  const url = [pathname, query].filter(Boolean).join('?');

  if (options?.params) {
    return pathParams<P>(url, options.params) as string;
  }

  return url;
}

export function mergeQuery(
  url: string,
  query: Record<string, unknown>
): string {
  const [path, urlQuery] = url.split('?');

  const parsedQuery = qs.parse(urlQuery);

  return createUrl(path, {
    query: {
      ...parsedQuery,
      ...query
    }
  });
}
