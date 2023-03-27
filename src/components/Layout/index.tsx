import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";

const excludeHeader = [
    "/login",
    "/signup"
]

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    setShowHeader(!excludeHeader.includes(router.pathname))
  }, [router]);

  return (
    <>
      <Head>
        <title>Pet Lovers</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showHeader && <Header />}
      <main className="m-auto min-h-[80vh]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
