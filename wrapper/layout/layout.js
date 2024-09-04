import MainHeader from "../header/main-header";

export default function RootLayout({ children }) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}
