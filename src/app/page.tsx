'use client'
import React, { useState, useEffect } from "react";
import Hero from "./hero/page";
import Card from "./cards/page";
import Comments from "./coments/page";
import Suscribete from "./suscribete/page";

const App = () => {

 return (

  <main>
    <Hero />
    <Card />
    <Comments />
   <Suscribete  />

   
    </main>
 );
 }

export default App;