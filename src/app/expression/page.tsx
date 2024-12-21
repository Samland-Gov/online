import { IndigoClient } from "@/api/legislation/api";
import type { Expression } from "@/api/legislation/models";
import AllExpressionsPage, { ExpressionWithTime } from "@/layouts/expression/all_expressions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legislation - Samland Government",
  description: "All of the Legislation for Samland.",
};

const client = new IndigoClient("https://legislation.minersonline.uk/api/v3/akn/zl/.json", (process.env.PRIVATE_INDIGO_API_KEY as unknown as string), "en");

async function addTimeToExpressions(expressions: Expression[]): Promise<ExpressionWithTime[]> {
  const expressions_with_time = [] as ExpressionWithTime[];
  for (const expression of expressions) {
    const points_in_time = await client.points_in_time(expression.work);
    expressions_with_time.push({
      ...expression,
      points_in_time: points_in_time
    });
  }
  return expressions_with_time;
}

export default async function Expression() {
  let expressions = [] as ExpressionWithTime[];
  let error = null as string | null;
  try {
    expressions = await addTimeToExpressions(await client.pull_expressions());
  } catch (err) {
    error = "Failed to fetch expressions";
    console.error(err);
  }
  return (
    <AllExpressionsPage expressions={expressions} error={error || ""}/>
  );
}
