import Breadcrumb from "../../components/breadcrumb"
import Navbar from "../../components/navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-[#f4f5f9] min-h-screen w-full p-8">
          <Navbar />
          <div className="my-4">
            <Breadcrumb />
          </div>
          {children}
        </main>
    )
}