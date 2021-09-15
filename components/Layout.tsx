import AudioPlayer from "./AudioPlayer";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }: any) {
  return (
    <>
      <Header />
      {children}
      <AudioPlayer />
      <Footer />
    </>
  );
}

export default Layout;