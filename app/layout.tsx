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
      <body className={"${inter.className} bg-gray-50 text-gray-950 relative"}>
        <div className="bg-[#fbe2e3] absolute top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blurr-[10rem] sm:w-[68.75rem]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] left-[-35rem] h-[31.25rem] w-[50rem] -z-10 rounded-full blurr-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left:-[-28rem] xl:left:-[-15rem] 2xl:left:-[-5rem]"></div>

        {children}
      </body>
    </html>
  );
}
