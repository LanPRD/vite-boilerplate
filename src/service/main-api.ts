import { apiCall } from "./api";

export function getLootBox(props?: any) {
  return apiCall<any>({
    method: "GET",
    url: "/loot/all",
    params: { layout: props?.layout }
  });
}

export function openLootBox(props: any) {
  return apiCall<any>({
    method: "POST",
    url: `/loot/open/${props.network}/${props.slug}`,
    data: { ...props },
    headers: { Authorization: `Bearer ${props.access_token}` }
  });
}
