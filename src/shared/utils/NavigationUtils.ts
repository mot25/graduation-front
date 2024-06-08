import { Route, useRoute } from '@react-navigation/native';

export function useParams<T extends NonNullable<unknown>>(
  initial: Partial<T> = {}
) {
  const { params = {} } = useRoute<Route<string, T>>();
  return { ...initial, ...params } as T;
}
