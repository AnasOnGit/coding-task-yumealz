import BarCart from "@/components/BarChart"
import Orders from "@/components/Orders"
// import BarCart from "@/components/BarCart";
import Link from "next/link"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* <Orders/> */}
      <Link href="/order">Orders</Link>
      
    </main>
  )
}
