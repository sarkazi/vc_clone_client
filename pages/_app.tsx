import "../styles/globals.css";
import { Provider } from "react-redux";
import { store, wrapper } from "../redux/store";
import Head from "next/head";
import { parseCookies } from "nookies";
import { setUserData } from "../redux/slices/user";
import { userApi } from "../utils/api/user";
import { Api } from "../utils/api";

import { setPostsData } from "../redux/slices/posts";
import { useAppSelector } from "../redux/hooks";
import { selectPostData } from "../redux/slices/posts";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>RJournal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      try {
        const userData = await Api(ctx).user.authMe();
        const postsData = await Api(ctx).posts.getPosts();
        store.dispatch(setUserData(userData));
        store.dispatch(setPostsData(postsData));
      } catch (err) {
        if (ctx.asPath === "/write") {
          ctx.res.writeHead(302, {
            location: "/403",
          });
          ctx.res.end();
        }
        console.log(err);
      }

      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
        },
      };
    }
);

export default wrapper.withRedux(MyApp);
