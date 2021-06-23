/* eslint-disable camelcase */
import axios from 'axios';
import { useCallback } from 'react';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { QUERY } from '../../../constants/query';

export interface GoogleMapLocation {
  address: string;
  placeId: string;
}

interface FnResponse {
  formatted_address: string;
  place_id: string;
}

type FnData = { results: FnResponse[] };
type Data = GoogleMapLocation[];
type UseFetchConcerts = (
  inputAddress: string,
  options?: UseQueryOptions<FnData, unknown, Data, [string, string]>,
) => UseQueryResult<Data, unknown>;

// NOTE:「〒000-0000」の文字数
const POSTAL_CODE_STRING_COUNT = 9;
const API_KEY = process.env.REACT_APP_API_KEY ?? '';

export const useSearchAccess: UseFetchConcerts = (inputAddress, options) => {
  const queryFn = async () => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json`;
    const parameters = {
      params: {
        address: inputAddress,
        key: API_KEY,
        language: 'ja',
      },
    };
    const response = await axios.get<FnData>(url, parameters);

    console.log(response);

    return response.data;
  };
  const selectFn = useCallback(
    (res: FnData) =>
      res?.results.map((result) => {
        // NOTE: 日本、郵便番号 住所の形でレスポンスが返ってくる(アルファベットを入力すると「,」区切りになる)
        // 郵便番号はないときもある
        const postalCodeAndAddress =
          result?.formatted_address.split('、')[1] ??
          result?.formatted_address.split(',')[1];
        const address = postalCodeAndAddress.includes('〒')
          ? postalCodeAndAddress.slice(POSTAL_CODE_STRING_COUNT)
          : postalCodeAndAddress;

        return {
          address: address.trim(),
          placeId: result.place_id,
        };
      }),
    [],
  );

  return useQuery([QUERY.access, inputAddress], queryFn, {
    select: selectFn,
    enabled: Boolean(inputAddress),
    notifyOnChangeProps: undefined,
    ...options,
  });
};
