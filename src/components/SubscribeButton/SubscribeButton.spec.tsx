import { render, screen, fireEvent } from "@testing-library/react";
import { useSession, signIn } from "next-auth/react";
import { SubscribeButton } from ".";

jest.mock("next-auth/react");
jest.mock("next/router");

describe("SignInButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession); 
    useSessionMocked.mockResolvedValue(null as never);

    render(<SubscribeButton />);
    
    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const signInMocked = jest.mocked(signIn);
    signInMocked.mockResolvedValue(null);
    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });
});