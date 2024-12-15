import HomePage from "@/pages/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Samland Government",
  description: "The official home of the Samland Government",
};

export default function Home() {
  return (
    <HomePage/>
  );
}
