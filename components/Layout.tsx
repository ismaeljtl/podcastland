import Footer from "./Footer";

function Layout({ children }: any) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default Layout;