import { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Flex,
  Layout,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { useFetch } from "../utilitis/utils";
import { ModalWallet } from "../modals/ModalWallet";
import { ThemeContext } from "../context/ThemeContext";
import { AddAssetWallet } from "../components/walletComponents/AddAssetWallet";
import { AssetSiderCard } from "../components/walletComponents/AssetSiderCard";

import { CardProps, WalletContext } from "../context/WalletContext";
import { WalletPortfolioChart } from "../components/walletComponents/WalletPortfolioChart";
import { Footer } from "../components/Footer";

export interface WalletDataProps {
  id: string;
  name: string;
  price: number;
  icon: string;
  value: number;
  symbol: string;
  volume: number;
  marketCap: number;
  totalSupply: number;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
  redditUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  contractAddress: string;
}

export function Wallet() {
  const { card } = useContext(WalletContext);
  const { darkMode } = useContext(ThemeContext);
  const [walletData, setWalletData] = useState<WalletDataProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");

  const { data } = useFetch<WalletDataProps[]>(
    "https://openapiv1.coinstats.app/coins",
    { accept: "application/json", "X-API-KEY": import.meta.env.VITE_API_KEY }
  );

  useEffect(() => {
    if (data) setWalletData(data);
  }, [data]);

  const [selected, setSelected] = useState<string>("press / to open ");
  const [select, setSelect] = useState(false);
  //selected coin for modal select
  const [coin, setCoin] = useState<WalletDataProps>();
  const [addAssetCoin, setAddAssetCoin] = useState<
    WalletDataProps | undefined
  >();
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  // open select with
  function handleSelect(value: string) {
    setIsModalOpen(true);
    setSelected(value);
    if (walletData) {
      setCoin(walletData.find((c) => c.id === value));
    }
  }
  useEffect(() => {
    const keypress = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  const showDrawer = () => {
    setOpen(true);
    setShowForm(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  //total value of all assets
  const totalValue = card.reduce(
    (acc: number, item: CardProps) => acc + item.totalAmount,
    0
  );
  return (
    <>
      <div
        className={`xs:block md:block flex justify-between items-baseline  w-full h-auto min-h-screen ${darkMode ? "bg-custom-bgc" : "bg-custom-tablelight"} `}
      >
        <Navbar />

        <Layout
          className={`p-[20px] ${darkMode ? "bg-custom-bgc" : "bg-custom-tablelight"}`}
        >
          <div className="xs:block md:flex lg:flex w-[100%] lg:justify-between">
            <Row style={{ marginBottom: "20px" }}>
              <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }}>
                <Layout.Content style={{ paddingRight: "30px" }}>
                  <Flex
                    style={{
                      paddingLeft: "20px",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography.Title
                      level={3}
                      style={{ margin: "0", color: "grey" }}
                    >
                      Your portfolio: {totalValue.toFixed(2)}$
                    </Typography.Title>
                    <Space>
                      <Radio.Group
                        value={placement}
                        onChange={onChange}
                      ></Radio.Group>
                      <Button
                        className="bg-black "
                        type="primary"
                        onClick={showDrawer}
                      >
                        Add Asset
                      </Button>
                    </Space>

                    <Drawer
                      title="Add asset"
                      placement={placement}
                      width={600}
                      onClose={() => {
                        setOpen((prev) => !prev);
                      }}
                      open={open}
                      destroyOnClose
                    >
                      <AddAssetWallet
                        onClose={() => setOpen(false)}
                        addAssetCoin={addAssetCoin}
                        setAddAssetCoin={setAddAssetCoin}
                        walletData={walletData}
                        showForm={showForm}
                        setShowForm={setShowForm}
                      />
                    </Drawer>
                  </Flex>
                  <WalletPortfolioChart />
                </Layout.Content>
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 24 }} md={{ span: 8 }}>
                <Layout.Sider
                  width="100%"
                  style={{ backgroundColor: "transparent" }}
                  className={`${darkMode ? "bg-custom-bgc" : "bg-custom-tablelight"}`}
                >
                  <Select
                    value={selected}
                    className={` text-center rounded-[10px] w-[250px] ${darkMode ? "bg-custom-bgc text-white" : "bg-custom-tc text-black"}`}
                    open={select}
                    onSelect={handleSelect}
                    onClick={() => setSelect((prev) => !prev)}
                    options={
                      walletData
                        ? walletData.map((item) => ({
                            label: item.name,
                            value: item.id,
                            icon: item.icon,
                          }))
                        : []
                    }
                    optionRender={(option) => (
                      <Space>
                        <img
                          src={option.data.icon}
                          alt={option.data.label}
                          style={{ width: "20px" }}
                        />
                        <span>{option.data.label}</span>
                      </Space>
                    )}
                  />

                  <AssetSiderCard />
                </Layout.Sider>
              </Col>
            </Row>
          </div>
        </Layout>
      </div>
      <Footer />

      <ModalWallet
        walletData={walletData}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        coin={coin}
      />
    </>
  );
}
