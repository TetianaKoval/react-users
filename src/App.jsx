import React from "react";
import './App.scss';
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";


export function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}
