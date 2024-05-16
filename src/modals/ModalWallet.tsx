import { Button, Modal, Flex, Tag, Typography, Divider } from "antd";
import { formatNumber } from "../utilitis/utils";
import { WalletDataProps } from "../pages/Wallet";
import redditSvg from "../assets/iconmonstr-reddit-4.svg";
import twitterSvg from "../assets/iconmonstr-twitter-1.svg";
import webSvg from "../assets/iconmonstr-globe-thin.svg";
import { Link } from "react-router-dom";
import { ApexChart } from "../components/walletComponents/ApexChartWallet";
interface WalletData {
  walletData: WalletDataProps[] | undefined | null;
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  coin: WalletDataProps | undefined;
}

export function ModalWallet({
  walletData,
  setIsModalOpen,
  isModalOpen,
  coin,
}: WalletData) {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal footer={null} open={isModalOpen} onCancel={handleCancel}>
        <>
          <Flex align="center">
            <img
              className="pr-[10px] w-[40px]  object-contain"
              src={coin?.icon}
              alt=""
            />
            <Typography.Title level={3} style={{ margin: "0" }}>
              <span className="pr-[5px]">({coin?.symbol})</span>
              {coin?.name}
            </Typography.Title>
          </Flex>
        </>
        <Divider />
        <Typography.Paragraph>
          <Typography.Title level={4}>Price change: </Typography.Title>
          <Typography.Text strong>1 hour: </Typography.Text>
          <Tag color={`${coin?.priceChange1h > 0 ? "green" : "red"}`}>
            {coin?.priceChange1h}%
          </Tag>{" "}
          <Typography.Text strong>1 day: </Typography.Text>
          <Tag color={`${coin?.priceChange1d > 0 ? "green" : "red"}`}>
            {coin?.priceChange1d}%
          </Tag>
          <Typography.Text strong>1 week: </Typography.Text>
          <Tag color={`${coin?.priceChange1w > 0 ? "green" : "red"}`}>
            {coin?.priceChange1w}%
          </Tag>{" "}
        </Typography.Paragraph>

        <ApexChart coin={coin} />
        <Divider />
        <div className="w-full flex">
          <div className="w-[60%]">
            <Typography.Paragraph style={{ margin: "0" }}>
              <Typography.Text strong>Price:</Typography.Text>
              <span className="pl-[5px] font-bold">
                {" "}
                {coin?.price.toFixed(2)}$
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph style={{ margin: "0" }}>
              <Typography.Text strong>Market Cap:</Typography.Text>
              <span className="pl-[5px] font-bold">
                {coin?.marketCap ? formatNumber(coin.marketCap) : "N/A"}
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph style={{ margin: "0" }}>
              <Typography.Text strong>Total Supply:</Typography.Text>
              <span className="pl-[5px] font-bold">
                {coin?.totalSupply ? formatNumber(coin.totalSupply) : "N/A"}
              </span>
            </Typography.Paragraph>
            <Typography.Paragraph style={{ margin: "0" }}>
              <Typography.Text strong>Volume:</Typography.Text>
              <span className="pl-[5px] font-bold">
                {coin?.volume ? formatNumber(coin.volume) : "N/A"}
              </span>
            </Typography.Paragraph>
          </div>
          <div className="w-[40%]  justify-between flex items-center">
            <Typography.Title level={5} style={{ margin: "0" }}>
              Socials:
            </Typography.Title>
            <Link target="_blank" to={coin?.redditUrl || "#"}>
              <img className="w-[20px] object-contain" src={redditSvg} alt="" />
            </Link>
            <Link target="_blank" to={coin?.twitterUrl || "#"}>
              <img
                className="w-[20px] object-contain"
                src={twitterSvg}
                alt=""
              />
            </Link>
            <Link target="_blank" to={coin?.websiteUrl || "#"}>
              <img className="w-[20px] object-contain" src={webSvg} alt="" />
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
