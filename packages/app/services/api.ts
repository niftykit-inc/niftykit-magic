import axios, { AxiosResponse } from 'axios';
import { ethers } from 'ethers';
import { ApiResponse } from '../types';

export function mintTo(
  recipient: string,
  quantity: number,
  amount: number
): Promise<AxiosResponse<ApiResponse<ethers.ContractTransaction>>> {
  return axios.post<ApiResponse<ethers.ContractTransaction>>(
    `${process.env.NEXT_PUBLIC_NIFTYKIT_API}/relay/mintTo`,
    { recipient, quantity, amount },
    {
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_APP_NIFTYKIT_API_KEY,
      },
    }
  );
}
