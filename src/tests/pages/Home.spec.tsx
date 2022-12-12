import { render, screen } from "@testing-library/react";
import { stripe } from "../../services/stripe";
import { useSession } from "next-auth/react";
import Home, { getStaticProps } from "../../pages";

jest.mock("next/router");
jest.mock("next-auth/react");
jest.mock("../../services/stripe");

describe("Home Page", () => {
  const useSessionMocked = jest.mocked(useSession); 
  useSessionMocked.mockResolvedValue(null as never);

  it("renders correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "R$10,00"}} />);

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const stripePricesRetrieveMocked = jest.mocked(stripe.prices.retrieve);

    stripePricesRetrieveMocked.mockResolvedValueOnce({
      id: "fake-prices-id",
      unit_amount: 1000,
    } as any);

    const res = await getStaticProps({});

    expect(res).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-prices-id",
            amount: "$10.00"
          }
        },
        revalidate: 86400,
      })
    );
  });
});
