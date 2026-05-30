import axios from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import API_PATHS from "~/constants/apiPaths";
import { OrderStatus } from "~/constants/order";
import { Order } from "~/models/Order";
import { useAuth } from "react-oidc-context";

export function useOrders() {
  const auth = useAuth();

  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const headers = auth.user?.id_token
        ? { Authorization: `Bearer ${auth.user.id_token}` }
        : {};

      const res = await axios.get<Order[]>(`${API_PATHS.order}/order`, { headers });
      return res.data;
    },
  });
}

export function useInvalidateOrders() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries({ queryKey: ["orders"], exact: true }),
    [],
  );
}

export function useUpdateOrderStatus() {
  const auth = useAuth();

  return useMutation({
    mutationFn: (values: {
      id: string;
      status: OrderStatus;
      comment: string;
    }) => {
      const { id, ...data } = values;
      const headers = auth.user?.id_token
        ? { Authorization: `Bearer ${auth.user.id_token}` }
        : {};

      return axios.put(`${API_PATHS.order}/order/${id}/status`, data, {
        headers,
      });
    },
  });
}

export function useSubmitOrder() {
  const auth = useAuth();

  return useMutation({
    mutationFn: (values: Omit<Order, "id">) => {
      const headers = auth.user?.id_token
        ? { Authorization: `Bearer ${auth.user.id_token}` }
        : {};

      return axios.put<Omit<Order, "id">>(`${API_PATHS.order}/order`, values, {
        headers,
      });
    },
  });
}

export function useInvalidateOrder() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id: string) =>
      queryClient.invalidateQueries({
        queryKey: ["order", { id }],
        exact: true,
      }),
    [],
  );
}

export function useDeleteOrder() {
  const auth = useAuth();

  return useMutation({
    mutationFn: (id: string) => {
      const headers = auth.user?.id_token
        ? { Authorization: `Bearer ${auth.user.id_token}` }
        : {};

      return axios.delete(`${API_PATHS.order}/order/${id}`, {
        headers,
      });
    },
  });
}
