import HomePage from "@/layouts/home";
import { Metadata } from "next";
import fs from 'fs'
import path from 'path'
import { markdownToHtml } from '@/api/markdownToHtml'

export const metadata: Metadata = {
  title: "Home - Samland Government",
  description: "The official home of the Samland Government",
};

export default async function Home() {
  // Read the Markdown file from the file system
  const filePath = path.join(process.cwd(), 'content', 'index.md')
  const fileContent = fs.readFileSync(filePath, 'utf-8')

  // Convert Markdown to HTML
  const content = await markdownToHtml(fileContent)

  return (
    <HomePage content={content}/>
  );
}

