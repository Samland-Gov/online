import { Metadata } from "next";
import fs from 'fs'
import path from 'path'

import AlertsPage from "@/layouts/alerts";
import { markdownToHtml } from '@/api/markdownToHtml'

export const metadata: Metadata = {
  title: "Alerts - Samland Government",
  description: "Emergency alerts in Samland",
};

export default async function Home() {
  // Read the Markdown file from the file system
  const filePath = path.join(process.cwd(), 'content', 'alerts.md')
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  // Convert Markdown to HTML
  const content = await markdownToHtml(fileContent)

  return (
    <AlertsPage content={content}/>
  );
}

