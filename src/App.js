import React, { useMemo } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { styleReset } from "react95";
// pick a theme of your choice
import original from "react95/dist/themes/original";
// original Windows95 font (optionally)
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import Home from "src/views/Home";
import BottomBar from "src/views/AppBar";
import useWindowSize from "src/hooks/useWindowSize";
import useAccount from "src/hooks/useAccount";
import useChainId from "src/hooks/useChainId";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./context/Auth";
// import GoogleAnalytics from "src/component/GoogleAnalytics";
const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  ${styleReset}
  body {
    font-family: ms_sans_serif !important;
  }
`;

const App = () => {
  const changeAccout = useAccount();
  const chainId = useChainId();
  const size = useWindowSize();
  let zoom = 1;
  if (size.width >= 767) {
    const s = Math.min(size.width / 1280, size.height / 900);
    zoom = Math.max(0.621, Math.min(s, 1));
  }
  1 === zoom
    ? document.getElementsByTagName("html")[0].style.removeProperty("zoom")
    : document.getElementsByTagName("html")[0].style.setProperty("zoom", zoom);

  const appData = useMemo(() => {
    return <BottomBar crtAccount={changeAccout} chainId={chainId} />;
  }, [changeAccout, chainId]); //eslint-disable-line

  return (
    <>
      <GlobalStyles />
      {/* <GoogleAnalytics /> */}
      <ToastContainer style={{ marginTop: "21px" }} autoClose={8000} />
      <ThemeProvider theme={original}>
        <AuthContext>
          <div id="desktop">
            <Home />
          </div>
          {appData}
        </AuthContext>
      </ThemeProvider>
    </>
  );
};

export default App;
