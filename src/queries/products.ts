import axios from "axios";
import API_PATHS from "~/constants/apiPaths";
import { AvailableProduct } from "~/models/Product";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { useAuth } from "react-oidc-context";

export function useAvailableProducts() {
  const auth = useAuth();

  return useQuery({
    queryKey: ["available-products"],
    queryFn: async () => {
      const headers = auth.user?.id_token
        ? { Authorization: `Bearer ${auth.user.id_token}` }
        : {};

      const res = await axios.get<AvailableProduct[]>(
        `${API_PATHS.bff}/products`,
        { headers }
      );
      return res.data;
    },
  });
}

export function useInvalidateAvailableProducts() {
  const queryClient = useQueryClient();
  return React.useCallback(
    () =>
      queryClient.invalidateQueries({
        queryKey: ["available-products"],
        exact: true,
      }),
    [],
  );
}

export function useAvailableProduct(id?: string) {
  return useQuery({
    queryKey: ["product", { id }],
    queryFn: async () => {
      const res = await axios.get<AvailableProduct>(
        `${API_PATHS.bff}/products/${id}`,
      );
      return res.data;
    },
    enabled: !!id,
  });
}

export function useRemoveProductCache() {
  const queryClient = useQueryClient();
  return React.useCallback(
    (id?: string) =>
      queryClient.removeQueries({ queryKey: ["product", { id }], exact: true }),
    [],
  );
}

export function useUpsertAvailableProduct() {
  const auth = useAuth();

  return useMutation({
    mutationFn: (values: AvailableProduct) => {
      const headers = auth.user?.id_token
        ? { Authorization: `Bearer ${auth.user.id_token}` }
        : {};

      return axios.post<AvailableProduct>(`${API_PATHS.bff}/products`, values, {
        headers,
      });
    },
  });
}

export function useDeleteAvailableProduct() {
  const auth = useAuth();

  return useMutation({
    mutationFn: (id: string) => {
      const headers = auth.user?.id_token
        ? { Authorization: `Bearer ${auth.user.id_token}` }
        : {};

      return axios.delete(`${API_PATHS.bff}/products/${id}`, {
        headers,
      });
    },
  });
}
