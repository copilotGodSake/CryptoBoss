export interface NewsBase {
  id: string;
  title: string;
  sourceLink: string;
  imgUrl: string;
  source: string;
  feedDate: string;
}

export interface NewsSortedTypes {
  id: number;
  feedDate: number;
  source: string;
  title: string;
  imgUrl: string;
  description: string;
  sourceLink: string;
}

export interface Coin {
  id: string;
  icon: string;
  name: string;
  price: number;
  priceChange1d: number;
  priceChange1h: number;
  marketCap: number;
  symbol: string;
  websiteUrl: string;
  rank: number;
}
