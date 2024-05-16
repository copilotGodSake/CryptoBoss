import {
  Button,
  Divider,
  Flex,
  Select,
  Space,
  Typography,
  Form,
  InputNumber,
  DatePicker,
  Result,
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { WalletDataProps } from "../../pages/Wallet";
import {
  FormValuesProps,
  WalletContext,
  CardProps,
} from "../../context/WalletContext";

export interface AddAssetProps {
  addAssetCoin: WalletDataProps | undefined;
  setAddAssetCoin: React.Dispatch<
    React.SetStateAction<WalletDataProps | undefined>
  >;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  walletData: WalletDataProps[];

  onClose: () => void;
}
type FieldType = {
  amount: number;
  price: number;
  datetime: string;
  total: string;
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export function AddAssetWallet({
  addAssetCoin,
  setAddAssetCoin,
  walletData,
  showForm,
  setShowForm,
  onClose,
}: AddAssetProps) {
  const [select, setSelect] = useState(false);
  const { addCardsPortfolio } = useContext(WalletContext);
  //form used to manage +/- amount and price
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const [newCardWrap, setNewCardWrap] = useState<any>();

  const onFinish = () => {
    const amountField = form.getFieldValue("amount");
    const priceField = form.getFieldValue("price");
    const datetimeField = form.getFieldValue("datetime");
    const date = new Date(datetimeField);
    const toLocalTime = date.toLocaleString();

    const newCard: FormValuesProps = {
      addAssetCoin,
      amount: amountField,
      price: priceField,
      datetime: toLocalTime,
      total: (amountField * priceField).toFixed(2),
    };

    setNewCardWrap(addCardsPortfolio(newCard));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Result
        status="success"
        title={`Asset successfully added`}
        // title={`Successfully added ${newCardWrap.amount} of ${newCardWrap.addAssetCoin?.name} by price ${newCardWrap?.price}$ to your wallet!`}
        // subTitle={`${newCardWrap.datetime}`}
        extra={[
          <Button
            onClick={onClose}
            style={{ backgroundColor: "black", color: "white" }}
            type="primary"
            key="console"
          >
            Close
          </Button>,
        ]}
      />
    );
  }

  function handleAmountChange(value: number | null) {
    const price = form.getFieldValue("price");
    if (value !== null)
      form.setFieldsValue({ total: (value * price).toFixed(2) });
  }

  function handlePriceChange(value: number | null) {
    const amount = form.getFieldValue("amount");
    if (value !== null)
      form.setFieldsValue({ total: (amount * value).toFixed(2) });
  }

  return (
    <>
      {showForm ? (
        <>
          <Select
            style={{ width: "100%" }}
            placeholder="Select a coin"
            className={` text-center w-[250px]`}
            onSelect={(value) => {
              {
                setAddAssetCoin(walletData.find((c) => c.id === value));
                setShowForm(false);
              }
            }}
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
        </>
      ) : (
        <>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            style={{ maxWidth: "500px" }}
            initialValues={{ price: addAssetCoin?.price.toFixed(2) }}
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <div>
              <Flex className="items-center">
                <img
                  className="w-[40px] pr-[10px] object-contain"
                  src={addAssetCoin && addAssetCoin.icon}
                  alt={addAssetCoin && addAssetCoin.name}
                ></img>
                <Typography.Title style={{ margin: 0 }} level={3}>
                  {addAssetCoin && addAssetCoin.name}
                </Typography.Title>
              </Flex>
            </div>

            <Divider />
            <div>
              <Form.Item<FieldType>
                label="Amount"
                name="amount"
                rules={[
                  {
                    required: true,
                    type: "number",
                    min: 0,
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  onChange={handleAmountChange}
                />
              </Form.Item>

              <Form.Item<FieldType> label="Price" name="price">
                <InputNumber
                  onChange={handlePriceChange}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item<FieldType>
                label="Date & Time"
                name="datetime"
                rules={[
                  {
                    required: true,
                    message: "Please select date and time!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>

              <Form.Item<FieldType> label="Total" name="total">
                <InputNumber disabled style={{ width: "100%" }}></InputNumber>
              </Form.Item>

              <Form.Item>
                <Button className="bg-black" type="primary" htmlType="submit">
                  Add Asset
                </Button>
              </Form.Item>
            </div>
          </Form>
        </>
      )}
    </>
  );
}
