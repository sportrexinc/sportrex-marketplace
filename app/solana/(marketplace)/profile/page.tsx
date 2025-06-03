"use client";
import React, { useEffect, useState } from "react";

import NonControlledLayout from "@/app/layouts/NonControlledLayout";
import NormalLayout from "@/app/layouts/NormalLayout";
import {
  ProfileTab,
  ProfileHero,
  MyActivities,
  Collections,
  MyOffer,
  Favourite,
  MyNfts,
} from "../../components";
import { useAddress } from "@thirdweb-dev/react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/store";
import { getUserProfile } from "../../redux/features/auth/AuthSlice";
import { useActiveAccount } from "thirdweb/react";
const Profile = (): any => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("translation");
  const [activeTab, setActiveTab] = useState(1);
  const wallet = useActiveAccount();
  const address = wallet?.address;

  useEffect(() => {
    if (address) {
      dispatch(getUserProfile({ address }));
    }
  }, [address]);

  return (
    <NonControlledLayout current={1}>
      {address ? (
        <>
          <div className="mt-10">
            <ProfileHero />
          </div>
          <div className="mt-8">
            <ProfileTab activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="w-full h-auto mt-2 ">
            <NormalLayout>
              {activeTab === 1 && <MyNfts />}
              {activeTab === 2 && <Collections />}
              {activeTab === 3 && <Favourite />}
              {activeTab === 4 && <MyOffer />}
              {activeTab === 5 && <MyActivities />}
            </NormalLayout>
          </div>
        </>
      ) : (
        <div className="h-[30vh] grid place-items-center semi-bold">
          Connect Your Wallet
        </div>
      )}
    </NonControlledLayout>
  );
};

export default Profile;
