import Header from "@/components/header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jamie | Personal Portfolio",
  description: "Jamie White is a recent BSc Computer Science graduate, currently looking for software engineering based roles in the UK.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"${inter.className}  bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90"}>
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[-11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[90.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

        <Header />
        {children}
      </body>
    </html>
  );
}
