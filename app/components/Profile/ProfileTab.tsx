
import React from 'react'
import NormalLayout from '../../layouts/NormalLayout';
import { useTranslation } from 'react-i18next';
const styles = {
    container:"w-auto flex space-y-1 flex-col",
    active:"text-white regular text border-b-[3px] text-xl semibold border-[#fff] cursor-pointer py-2",
    inActive:"text-white regular text  text-xl semibold  cursor-pointer "
}
const tabs = [
  {
    name: "MyNFTS",
    id: 1,
  },
  {
    name: "Collections",
    id: 2,
  },
  {
    name: "Favourite",
    id: 3,
  },
  {
    name: "My Offer",
    id: 4,
  },
  {
    name: "My Activities",
    id: 5,
  },

];
const ProfileTab = ({ activeTab, setActiveTab }: any) => {
  const { t } = useTranslation("translation");
  return (
    <div className='w-full bg-blue-dropHeader'>
      <NormalLayout>
    <div className='flex justify-between h-16   items-center bg-blue-dropHeader'>

      {
        tabs.map((item, index) => {
          return (
            <p
              className={item.id === activeTab ? styles.active : styles.inActive}
              key={index} onClick={()=> setActiveTab(item.id)}
            >
              {t(`proTab${index}`)}
            </p>
          )
        })
          }
          </div>
        </NormalLayout>
    </div>
  )
}

export default ProfileTab
