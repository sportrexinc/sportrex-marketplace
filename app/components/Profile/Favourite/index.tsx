import React, { useState } from "react";
import ProfileSelect from "../../Select/ProfileSelect";
import Collections from "./Collections";
import NftAsset from "./NftAsset";

const Favourite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(1);
  const data = [
    {
      value: "Collections",
      label: "Collections",
      id: 1,
    },
    {
      value: "NftAsset by me",
      label: "NftAsset by me",
      id: 2,
    },

  ];
  return (
    <div className="bg-blue-body w-full h-full">
      <div className="mt-3 w-64">
        <ProfileSelect
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setActive={setActive}
          active={active}
          data={data}
          name="Collections"
        />
      </div>
      <div className="mt-6">
        {active === 1 && <Collections /> }
        {active === 2 && <NftAsset />}
      
      </div>
    </div>
  );
};

export default Favourite;
