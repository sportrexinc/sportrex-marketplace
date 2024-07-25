import React, { useState } from "react";
import ProfileSelect from "../../Select/ProfileSelect";

import OwnedByMe from "./OwnedByMe";

const CollectionsComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(1);
  const data = [
    {
      value: "Owned by me",
      label: "Owned by me",
      id: 1,
    },
    {
      value: "Listed by me",
      label: "Listed by me",
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
          name="Owned by me"
        />
      </div>
      <div className="mt-6">
        <OwnedByMe />
      </div>
    </div>
  );
};

export default CollectionsComponent;
