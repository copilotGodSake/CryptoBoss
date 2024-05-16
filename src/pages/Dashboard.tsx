import { Feed } from "../components/Feed";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="flex md:flex xs:block">
        <Sidebar />
        <Feed />
      </div>
      <Footer />
    </div>
  );
}
