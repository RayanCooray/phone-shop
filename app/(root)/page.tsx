import About from "@/components/About";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <div className=" min-h-screen text-white">
      <Header />
       <Hero />
      <div className="">
        <ProductList />
      </div> 
      <About />
      <Contact />
    </div>
  );
}
