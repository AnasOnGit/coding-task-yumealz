
import Container from "@/components/ui/Container"
// import BarCart from "@/components/BarCart";
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// icons
import {GoPeople} from "react-icons/go"
import {CiDeliveryTruck} from "react-icons/ci"
import {FcSalesPerformance} from "react-icons/fc"
import {HiOutlineDocumentReport} from "react-icons/hi"
import {AiOutlineGithub} from "react-icons/ai"
import * as Icon from "react-icons"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Container>
        <div className="md:mt-2 md:w-[70%] m-auto ">
        <p className="text-2xl font-bold">Yumealz Admin Panel</p>
        <span className="text-md">Select Action</span>
        </div>
        <div className="flex gap-2 flex-wrap md:w-[50%] m-auto mb-5 justify-center">
          <LinkCard title="View Orders"  href="/order" icon={"CiDeliveryTruck"}  /> 
          <LinkCard title="View Captains"  href="/captain" icon={"GoPeople"}  /> 
          <LinkCard title="Captain Comparison"  href="/captain/compare" icon={"FcSalesPerformance"}  /> 
          <LinkCard title="Documentation"  href="https://github.com/AnasOnGit/coding-task-yumeal" icon={"HiOutlineDocumentReport"}  /> 
          <LinkCard title="Github"  href="https://github.com/AnasOnGit/coding-task-yumeal" icon={"AiOutlineGithub"}  /> 
        </div>
      
      </Container>
      
    </main>
  )
}


const LinkCard = ({href,icon,title}:{
  href:string,icon:any,title:string
}) => {
  let Icon;
  switch (icon) {
    case "GoPeople":
      Icon = GoPeople;
      break;
    case "CiDeliveryTruck":
      Icon = CiDeliveryTruck;
      break;
    case "FcSalesPerformance":
      Icon = FcSalesPerformance;
      break;
    case "HiOutlineDocumentReport":
      Icon = HiOutlineDocumentReport
      break;
    case "AiOutlineGithub":
      Icon = AiOutlineGithub;
      break;
    default:
      Icon = GoPeople;
      break;
  }


  

  return(
    <Link href={href} className="border rounded w-[150px] h-[150px] flex flex-col justify-center items-center hover:shadow-lg hover:dark:bg-neutral-900 hover:bg-stone-50">
          <Icon size={34} />
          {title}
        </Link>
  );
}