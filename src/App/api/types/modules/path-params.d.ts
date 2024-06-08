declare module 'path-params' {
  export default function pathParams<P>(url: string, params: P): string;
}
