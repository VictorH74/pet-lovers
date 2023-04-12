import Layout from "@/components/Layout";
import Providers from "@/components/Providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <Providers session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
}
