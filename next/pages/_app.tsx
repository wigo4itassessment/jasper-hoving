import "../styles/globals.css";
import React from "react";

function MyApp({
  Component,
  pageProps,
}: {
  Component: typeof React.Component;
  pageProps: any;
}) {
  return <Component {...pageProps} />;
}

export default MyApp;
