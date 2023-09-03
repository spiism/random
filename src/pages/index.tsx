import Image from "next/image";
import { Inter } from "next/font/google";
import CalculateTime from "@/components/CalculateTime";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <CalculateTime />;
}
