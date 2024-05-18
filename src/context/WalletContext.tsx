import React, { useEffect, useState } from "react";
import { WalletDataProps } from "../pages/Wallet";
import { useFetch } from "../utilitis/utils";

export interface FormValuesProps {
  addAssetCoin: WalletDataProps | undefined;
  // card: CardProps;
  amount: number;
  price: number;
  datetime: string;
  total: string;
}

export type CardProps = FormValuesProps & {
  grow: boolean;
  growPercentage: number;
  totalAmount: number;
  totalProfit: number;
};
interface AddAssetWalletProps {
  formValues: FormValuesProps[];
  setFormValues: React.Dispatch<React.SetStateAction<FormValuesProps[]>>;
  addCardsPortfolio: (values: FormValuesProps) => void;
  card: CardProps[];
  setCard: React.Dispatch<React.SetStateAction<CardProps[]>>;
  handleDeleteCard: (e: React.MouseEvent, index: number) => void;
}

export const WalletContext = React.createContext<AddAssetWalletProps>({
  formValues: [],
  setFormValues: () => {},
  addCardsPortfolio: () => {},
  card: [],
  setCard: () => {},
  handleDeleteCard: () => {},
});

export function ContextWallet({ children }: { children: React.ReactNode }) {
  const [formValues, setFormValues] = useState<FormValuesProps[]>([]);

  const [card, setCard] = useState<CardProps[]>(() => {
    const cardValues = localStorage.getItem("cardValues");
    return cardValues ? JSON.parse(cardValues) : [];
  });

  const calculateCardProps = (asset: FormValuesProps): CardProps => {
    const coinAdded = walletData.find(
      (c) => c.name === asset.addAssetCoin?.name
    );
    const priceDifference = asset.price - (coinAdded?.price || 0);
    const totalAmount = (coinAdded?.price || 0) * asset.amount;
    const totalProfit = parseFloat((asset.amount * priceDifference).toFixed(2));

    return {
      ...asset,
      grow: coinAdded ? priceDifference > 0 : false,
      growPercentage: coinAdded
        ? percentDifference(asset.price, coinAdded.price)
        : 0,
      totalAmount,
      totalProfit,
    };
  };

  const addCardsPortfolio = (values: FormValuesProps) => {
    const newCard = calculateCardProps(values);
    setFormValues((prevValues) => [...prevValues, values]);
    // Retrieve the existing cards from localStorage
    const existingCards = JSON.parse(
      localStorage.getItem("cardValues") || "[]"
    );

    // Add the new card to the existing cards
    const updatedCards = [...existingCards, newCard];
    localStorage.setItem("cardValues", JSON.stringify(updatedCards));
  };

  useEffect(() => {
    if (formValues.length > 0) {
      setCard(formValues.map(calculateCardProps));
    }
  }, [formValues]);

  useEffect(() => {
    localStorage.setItem("cardValues", JSON.stringify(card));
  }, [card]);

  const percentDifference = (a: number, b: number) => {
    //if small differnce between too values then i return 0 to avoid -0.00 and NaN
    const epsilon = 0.01;
    if (Math.abs(a - b) < epsilon) {
      return 0;
    }
    return Number((100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2));
  };

  const [walletData, setWalletData] = useState<WalletDataProps[]>([]);
  const { data } = useFetch<WalletDataProps[]>(
    "https://openapiv1.coinstats.app/coins",
    { accept: "application/json", "X-API-KEY": import.meta.env.VITE_API_KEY }
  );
  useEffect(() => {
    if (data) setWalletData(data);
  }, [data]);

  //delete card
  const handleDeleteCard = (e: React.MouseEvent, index: number) => {
    e.preventDefault();

    setCard((prevValues) =>
      prevValues.filter((_, cardIndex) => cardIndex !== index)
    );

    // Retrieve the existing cards from localStorage
    const existingCards = JSON.parse(
      localStorage.getItem("cardValues") || "[]"
    );

    // Delete the card from the existing cards
    const updatedCards = existingCards.filter(
      (_: number, cardIndex: number) => cardIndex !== index
    );

    // Store the updated cards back into localStorage
    localStorage.setItem("cardValues", JSON.stringify(updatedCards));
  };
  return (
    <WalletContext.Provider
      value={{
        formValues,
        addCardsPortfolio,
        setFormValues,
        card,
        setCard,
        handleDeleteCard,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
