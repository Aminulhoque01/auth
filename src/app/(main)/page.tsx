"use client"

 
 
 
import Dashboard from "@/components/Pages/Home/Dashboard";
import LoginPage from "@/components/Pages/Home/Login";
import React from "react";


const Home = () => {
  return (
    <section className="">
      
      <LoginPage  />
      <Dashboard token=""/>
    </section>
  );
};

export default Home;


