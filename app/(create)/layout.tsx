"use client"
import { useAddress } from '@thirdweb-dev/react';
import {FC, ReactNode, useEffect} from 'react'
import APIService from '../utils/APIServices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { setCreatedCollections } from '../redux/features/auth/MyNftSlice';

const layout:FC<{children: ReactNode}> = ({
    children,
}) => {

  const address = useAddress();
  const dispatch = useDispatch<AppDispatch>()
  const { created_collections } = useSelector((state: RootState) => state.userNft)

    const getAllUserCollections = async () => {
        try {
          const res = await APIService.get(`/user/${address}/collection`);
          console.log(res.data, "response");
          dispatch(setCreatedCollections(res.data.data))
        } catch (error: any) {
          console.log(error.message);
        }
      };

      useEffect(() => {
        if(created_collections.length == 0)  getAllUserCollections();
      }, [address, created_collections]);

  return (
    <div>
      { children }
    </div>
  )
}

export default layout
