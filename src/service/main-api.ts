import { apiCall } from "./api";

export function getRequest(props?: any) {
  return apiCall<any>({
    method: "GET",
    url: "/get-endpoint",
    params: { layout: props?.layout }
  });
}

export function postRequest(props: any) {
  return apiCall<any>({
    method: "POST",
    url: "/post-endpoint",
    data: { ...props },
    headers: { Authorization: `Bearer ${props.access_token}` }
  });
}
