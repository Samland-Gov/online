import { IndigoClient } from "@/api/legislation/api";
import ExpressionPage from "@/layouts/expression/expression";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const client = new IndigoClient("https://legislation.minersonline.uk/api/v3/akn/zl/.json", (process.env.PRIVATE_INDIGO_API_KEY as unknown as string), "en");

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const slug = decodeURIComponent("/"+((await params).slug).join("/"));
  const exp = await client.pull_expression(slug);

  if (!exp) {
    return {
      title: "Not Found - Samland Government",
      description: "Expression not found.",
    };
  }

  return {
    title: `${exp.title} - Samland Government`,
    description: "All of the Legislation for Samland.",
  };
}

export default async function Expression({
  params,
}: {
  params: { slug: string[] }
}) {
  const slug = decodeURIComponent("/"+((await params).slug).join("/"));
  const exp = await client.pull_expression(slug);

  if (!exp) {
    notFound();
  }

  const points = await client.points_in_time(exp.work);

  return (
    <>
      <ExpressionPage expression={exp} points_in_time={points}/>   
    </>
  );
}
