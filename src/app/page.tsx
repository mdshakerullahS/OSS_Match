import Footer from "@/components/footer";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Issues = dynamic(() => import("@/components/issues"));

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-106px)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Sidebar />
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <p className="text-sm font-medium animate-pulse">
                Scanning GitHub for opportunities...
              </p>
            </div>
          }
        >
          <Issues />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
