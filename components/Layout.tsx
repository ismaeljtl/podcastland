import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }: any) {
  const router = useRouter();
  const [showSearchbar, setShowSearchbar] = useState(true);

  useEffect(() => {
    router.pathname === "/" ? setShowSearchbar(false) : setShowSearchbar(true);
  }, [router]);

  return (
    <>
      <Header showHeader={showSearchbar} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
