import { useContext } from "react";
import { Dashboard } from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContextTable, ThemeContext } from "./context/ThemeContext";
import { News } from "./pages/News";
import { ScrollToTopButton } from "./utilitis/utils";
import { Nfts } from "./pages/Nfts";
import { NftTableFull } from "./components/nftsComponents/NftTableFull";
import { Wallet } from "./pages/Wallet";
import { ContextWallet } from "./context/WalletContext";

// import { ChildComponentProps } from "./components/nftsComponents/NftTablePart";
function App() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <>
      <div className={`${darkMode ? "dark" : ""}`}>
        <Router>
          <Routes>
            <Route
              path="/wallet"
              element={
                <ContextWallet>
                  <Wallet />
                </ContextWallet>
              }
            ></Route>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/news" element={<News />}></Route>
            <Route path="/nft/*" element={<Nfts />}>
              <Route
                path="collections"
                element={
                  <ContextTable>
                    <NftTableFull />
                  </ContextTable>
                }
              >
                {/* <Route path="collections" element={<NftTableFull />} /> */}
              </Route>
            </Route>
          </Routes>
          <ScrollToTopButton />
        </Router>
      </div>
    </>
  );
}

export default App;
