import { Header } from "../components/Header";
import { Navigation } from "../components/Navigation";

export default function Home() {
  return (
      <div className="w-screen flex justify-center">
        <div className="w-full max-w-[900px]">
          <Header />
          <main>
            <Navigation />
          </main>
        </div>
      </div>
  )
}
