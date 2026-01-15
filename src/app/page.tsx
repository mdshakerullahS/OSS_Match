import Header from "@/components/header";
import Issues from "@/components/issues";
import Sidebar from "@/components/sidebar";

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-106px)] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Sidebar />
        <Issues />
      </div>
    </>
  );
}
