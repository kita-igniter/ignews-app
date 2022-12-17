import { render, screen } from "@testing-library/react";
import { debug } from "console";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
    slug: "my-new-post",
    title: "My New Post",
    excerpt: "Post excerpt",
    updatedAt: "10 de Abril"
};

jest.mock("next-auth/react");
jest.mock("../../services/prismic");
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn()
}))


describe("Posts Preview Page", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({ data: null} as never);

    render(<Post post={post} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", async () => {
    const useSessionMocked = jest.mocked(useSession);
    //const useRouterMocked = jest.mocked(useRouter);
    const mockRouter = {
      push: jest.fn() 
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: "fake-active-subscription"},
      false
    ] as any);

    render(<Post post={post} />);

    //expect(mockRouter.push).toHaveBeenCalledWith("/posts/my-new-post");
  });
});