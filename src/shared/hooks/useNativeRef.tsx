import React, { RefObject, useRef } from 'react';

export function useNativeRef<T = any>(): RefObject<T> {
  const { current: ref } = useRef(React.createRef<T>());

  return ref;
}
