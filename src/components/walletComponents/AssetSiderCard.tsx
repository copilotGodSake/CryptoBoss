import { Button, Card, List, Statistic, Tag, Typography } from "antd";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { CardProps, WalletContext } from "../../context/WalletContext";
import { useContext, useEffect, useState } from "react";

export function AssetSiderCard() {
  const { card, setCard, handleDeleteCard } = useContext(WalletContext);

  return (
    <>
      {card.map((item, index) => {
        const date = new Date(item.datetime).toLocaleString();

        return (
          <>
            <Card
              key={item.addAssetCoin?.id}
              title={
                <span style={{ fontSize: "22px" }}>
                  {item.addAssetCoin?.name}
                </span>
              }
              bordered={false}
              style={{ width: 300, marginTop: "20px" }}
            >
              <Statistic
                value={item.totalAmount}
                precision={2}
                valueStyle={{ color: item.grow ? "#3f8600" : "#cf1322" }}
                prefix={item.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                suffix="$"
              />
              <List
                dataSource={[
                  {
                    title: "Total profit:",
                    value: item.totalProfit,
                    withTag: true,
                  },
                  { title: "Asset Amount:", value: item.amount, isPlain: true },
                  { title: "Time:", value: item.datetime, isPlain: true },
                ]}
                renderItem={(asset) => (
                  <List.Item key={asset.title}>
                    <span>{asset.title}</span>
                    <span>
                      {asset.withTag && (
                        <Tag
                          color={item.grow ? "green" : "red"}
                          style={{ marginRight: "20px" }}
                        >
                          {item.growPercentage}%
                        </Tag>
                      )}
                      {asset.isPlain && <span>{asset.value}</span>}
                      {!asset.isPlain && (
                        <Typography.Text
                          type={item.grow ? "success" : "danger"}
                        >
                          {typeof asset.value === "number"
                            ? asset.value.toFixed(2)
                            : asset.value}
                          $
                        </Typography.Text>
                      )}
                    </span>
                  </List.Item>
                )}
              ></List>
              <div className="w-full flex items-center justify-end">
                <button
                  onClick={(e) => handleDeleteCard(e, index)}
                  className="mt-[15px] bg-gray-400 hover:bg-gray-600 active:bg-gray-500 text-white font-bold py-[5px] px-[15px] rounded-[10px]"
                >
                  Delete
                </button>
              </div>
            </Card>
          </>
        );
      })}
    </>
  );
}
