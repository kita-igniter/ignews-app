import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Home from "../../pages";

jest.mock("next/router");
jest.mock("next-auth/react");

describe("Home Page", () => {
  const useSessionMocked = jest.mocked(useSession); 
  useSessionMocked.mockResolvedValue(null as never);

  it("renders correctly", () => {
    render(<Home product={{ priceId: "fake-price-id", amount: "R$10,00"}} />);

    expect(screen.getByText("for R$10,00 month")).toBeInTheDocument();
  });
});
