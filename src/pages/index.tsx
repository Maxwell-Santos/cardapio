import Head from "next/head";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { Navigation } from "../components/Navigation";

export default function Home() {

  // useEffect(() => {localStorage.clear()},[])
  return (
    <>
      <Head>
        <title>Cardápio</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <div className="w-screen flex justify-center">
        <div className="w-full max-w-[900px]">
          <Header />
          <main className="mb-20">
            <Navigation />
          </main>
        </div>
      </div>
    </>

  )
}
