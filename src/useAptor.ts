import {
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
  ForwardedRef,
  RefObject,
  useMemo,
} from 'react';

// types:misc
type Nullable<T> = T | null;
// types:api
export type SingleAPI = (...args: any[]) => any;
export type APIObject = { [apiName: string]: SingleAPI };
export type APIGenerator = () => APIObject;
export type GetAPI<T> = (instance: Nullable<T>, prams?: any) => APIGenerator;
// types:configuration
export type Instantiate<T> = (node: Nullable<HTMLElement>, params?: any) => Nullable<T>;
export interface AptorConfiguration<T> {
  getAPI: GetAPI<T>;
  instantiate: Instantiate<T>;
  params?: any;
}

/**
 * react aptor(api-connector) a hook which connect api to react itself
 * @param ref - react forwarded ref
 * @param {Object} configuration - configuration object for setup
 * @param {Array} [deps=[]] - react dependencies array
 * @return domRef - can be bound to dom element
 */
export default function useAptor<T>(
  ref: ForwardedRef<APIObject>,
  configuration: AptorConfiguration<T>,
  deps = []
): RefObject<HTMLElement> {
  const [instance, setInstance] = useState<Nullable<T>>(null);
  const domRef = useRef<Nullable<HTMLElement>>(null);
  const { instantiate, getAPI, params } = configuration;

  useEffect(() => {
    setInstance(instantiate(domRef.current, params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const api = useMemo(() => getAPI(instance, params), [instance]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useImperativeHandle(ref, api, [api]);

  return domRef;
}
