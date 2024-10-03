export interface NftResult {
  token_address: string;
  token_id: string;
  amount: string;
  owner_of: string;
  token_hash: string;
  block_number_minted: string;
  block_number: string;
  possible_spam: boolean;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri: string;
  metadata: string;
  last_token_uri_sync: string;
  last_metadata_sync: string;
  minter_address: string;
  verified_collection: boolean;
}

export interface MoralisNftResponse {
  page: number;
  page_size: number;
  cursor?: string;
  result: NftResult[];
}

export interface CollectionResult {
  token_address: string;
  possible_spam: boolean;
  contract_type: string;
  name: string;
  symbol: string;
  verified_collection: boolean;
}

export interface MoralisCollectionResponse {
  page: number;
  page_size: number;
  cursor?: string;
  result: CollectionResult[];
}

interface ImageProps {
  url: string;
  public_id: string;
}

export interface CreateCollectionProps {
  name: string;
  desc: string;
  ercType: string;
  external_link?: string;
  category?: string;
  blockChain?: string;
  feature?: any;
  banner?: any;
  logo: any;
  symbol: string;
  featureImage?: ImageProps;
  bannerImage?: ImageProps;
  logoImage?: ImageProps;
  creator?: string;
  contractAddress?: string;
  contractType: string;
}

export interface CreateSingleNFTProps {
  name: string;
  desc: string;
  external_link?: string;
  supply?: string;
  category?: string;
  blockChain?: string;
  feature?: any;
  banner?: any;
  logo: any;
  symbol: string;
  featureImage?: ImageProps;
  bannerImage?: ImageProps;
  logoImage?: ImageProps;
  creator?: string;
  contractAddress?: string;
  tokenURI: string;
  collectionName: string;
}
