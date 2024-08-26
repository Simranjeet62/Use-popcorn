import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from "./App";
//import CurrencyConverter from "./CurencyConverter";
//import TextExpander from "./TextExpander";
import GeoLocate from "./GeoLocate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <CurrencyConverter /> */}
    <GeoLocate />
    {/* <App /> */}
    {/*<TextExpander textLength={10}>
      Space travel is the ultimate adventure! Imagine soaring past the stars and
      exploring new worlds. It's the stuff of dreams and science fiction, but
      believe it or not, space travel is a real thing. Humans and robots are
      constantly venturing out into the cosmos to uncover its secrets and push
      the boundaries of what's possible.
    </TextExpander>
    <TextExpander textLength={18}>
      Space travel is the ultimate adventure! Imagine soaring past the stars and
      exploring new worlds. It's the stuff of dreams and science fiction, but
      believe it or not, space travel is a real thing. Humans and robots are
      constantly venturing out into the cosmos to uncover its secrets and push
      the boundaries of what's possible.
    </TextExpander>*/}
  </React.StrictMode>
);
