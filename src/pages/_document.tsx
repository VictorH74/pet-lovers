import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300&family=Righteous&family=Work+Sans:wght@300&display=swap"
          rel="stylesheet"
        />
        <script defer async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyANHEQS8QrLria1rajwM5HwZbMXIJpa02g"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
