import { IndigoClient } from "@/api/legislation/api";
import type { Expression } from "@/api/legislation/models";
import AllExpressionsPage from "@/pages/expression/all_expressions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legislation - Samland Government",
  description: "All of the Legislation for Samland.",
};

const client = new IndigoClient("https://legislation.minersonline.uk/api/v3/akn/zl/.json", (process.env.PRIVATE_INDIGO_API_KEY as unknown as string), "en");

export default async function Expression() {
  let expressions = [] as Expression[];
  let error = null as string | null;
  try {
    expressions = await client.pull_expressions();
  } catch (err) {
    error = "Failed to fetch expressions";
  }
  return (
    <AllExpressionsPage expressions={expressions} error={error || ""}/>
  );
}
