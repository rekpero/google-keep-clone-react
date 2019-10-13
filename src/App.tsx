import React from "react";
import "./App.css";
import Header from "./components/Header";

const App: React.FC<any> = (props: any) => {
  return (
    <div className="App">
      <Header />
      {props.children}
    </div>
  );
};

export default App;
