import { MemoryRouter } from "react-router-dom";
import { test, expect } from "vitest";
import App from "~/components/App/App";
import { server } from "~/mocks/server";
import { delay, http, HttpResponse } from "msw";
import API_PATHS from "~/constants/apiPaths";
import { AvailableProduct } from "~/models/Product";
import { renderWithProviders } from "~/testUtils";
import { formatAsPrice } from "~/utils/utils";

async function waitFor(condition: () => boolean, timeoutMs = 3000) {
  const startedAt = Date.now();
  while (!condition()) {
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error("Timed out waiting for condition");
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

test("Renders products list", async () => {
  const products: AvailableProduct[] = [
    {
      id: "1",
      title: "Product 1",
      description: "Product 1 description",
      price: 1,
      count: 1,
    },
    {
      id: "2",
      title: "Product 2",
      description: "Product 2 description",
      price: 2,
      count: 2,
    },
  ];
  server.use(
    http.get(`${API_PATHS.bff}/product/available`, async () => {
      await delay();
      return HttpResponse.json(products);
    }),
    http.get(`${API_PATHS.cart}/profile/cart`, () => {
      return HttpResponse.json([]);
    }),
  );
  const { container, unmount } = renderWithProviders(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );

  await waitFor(() => !container.textContent?.includes("Loading"));
  products.forEach((product) => {
    expect(container.textContent).toContain(product.title);
    expect(container.textContent).toContain(formatAsPrice(product.price));
  });
  unmount();
});
