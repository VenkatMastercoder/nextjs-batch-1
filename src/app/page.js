"use client"
import "./style.css"
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <h1 className="heading">Hello World</h1>
 
     <p className="bg-green-500 p-5 text-white">Paragraph Tags</p>
    
      <button onClick={()=> router.push("/about") }>Go to About Page</button>
    </div> 
  );
}


