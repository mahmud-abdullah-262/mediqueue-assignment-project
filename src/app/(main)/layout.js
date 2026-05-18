import Navbar from "@/components/Navbar";

export default function layout({children}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
    </>
  );
}