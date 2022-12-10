import { render, screen } from "@testing-library/react";
import { debug } from "console";
import { useSession } from "next-auth/react";
import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockResolvedValueOnce(null as never);

    render(
      <SignInButton />
    );

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce(
      {
        data: {
          user: { name: "John Doe", email: "john.doe@example.com" },
          expires: "fake-expires",
        },
      } as any
    );

    render(
      <SignInButton />
    );
    debug();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});