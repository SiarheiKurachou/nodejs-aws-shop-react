import axios from "axios";
import React from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import API_PATHS from "~/constants/apiPaths";
import { CartItem } from "~/models/CartItem";
import { useAuth } from "react-oidc-context";

export function useCart() {
  const auth = useAuth();

  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const headers = auth.user?.id_token
        ? { Authorization: `Bearer ${auth.user.id_token}` }
        : {};

      const res = await axios.get<CartItem[]>(
        `${API_PATHS.cart}/profile/cart`,
        { headers },
      );
      return res.data;
    },
  });
}

export function useCartData() {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<CartItem[]>(["cart"]);
}

export function useInvalidateCart() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () => queryClient.invalidateQueries({ queryKey: ["cart"], exact: true }),
    [],
  );
}

export function useUpsertCart() {
  const auth = useAuth();

  return useMutation({
    mutationFn: (values: CartItem) => {
      const headers = auth.user?.id_token
        ? { Authorization: `Bearer ${auth.user.id_token}` }
        : {};

      return axios.put<CartItem[]>(`${API_PATHS.cart}/profile/cart`, values, {
        headers,
      });
    },
  });
}
