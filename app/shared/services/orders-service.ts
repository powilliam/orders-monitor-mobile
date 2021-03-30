import { AxiosResponse } from "axios";

import { provider } from "app/shared/providers/orders-provider";

import { Order } from "app/shared/models/order";

export interface GetOrderDetails {
  hash: string;
  identifier: string;
}

export async function getOrderDetails({
  hash,
  identifier,
}: GetOrderDetails): Promise<AxiosResponse<Order>> {
  return await provider.get<Order>("/braspress", {
    headers: {
      hash,
      identifier,
    },
  });
}
