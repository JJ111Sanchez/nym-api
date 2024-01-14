'use client'
import React, { useState, useEffect } from "react";
import Hero from "./hero/page";
import DataViewComponent from "./visualizer/page";

const App = () => {

  return (

    <main>
      <Hero />
      <DataViewComponent />
    </main>
  );
}

export default App;