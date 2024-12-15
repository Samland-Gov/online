import { IndigoClient } from "@/api/legislation/api";
import ExpressionPage from "@/pages/expression/expression";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Legislation - Samland Government",
  description: "All of the Legislation for Samland.",
  
};

const client = new IndigoClient("https://legislation.minersonline.uk/api/v3/akn/zl/.json", (process.env.PRIVATE_INDIGO_API_KEY as unknown as string), "en");

export default async function Expression({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const slug = decodeURIComponent("/"+((await params).slug).join("/"));
  const exp = await client.pull_expression(slug);

  if (exp == undefined) {
    notFound();
  }

  return (
    <>
      <ExpressionPage expression={exp}/>   
    </>
  );
}
