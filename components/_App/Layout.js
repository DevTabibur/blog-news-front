import React from "react";
import Head from "next/head";
import GoTop from "./GoTop";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Boostingon - A Digital Agency Platform</title>
      </Head>

      {children}

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />

      <GoTop scrollStepInPx="100" delayInMs="10.50" />
      {/* LTR / RTL Feature */}
      {/* <Sidebar /> */}
    </>
  );
};

export default Layout;
