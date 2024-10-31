import React from 'react';
export interface ActionType {
  action?: (e?: any) => void 
  name: string;
  loading?: boolean;
  disabled?: boolean;
}
const ActionBtn = ({ action, name, loading, disabled } :ActionType) => {
  return (
    <button

      className={`flex items-center rounded-[10px] justify-center  sm:text-[16px] light bg-blue-btn text-white px-4 py-2  w-full md:py-4 h-[40px] md:h-auto cursor-pointer semibold text-[10px] min-w-max  `}

      onClick={action}
      disabled={disabled}
    >
      { loading ? 
      <span className="animate-spin h-5 w-5 rounded-full text-white border-t-[2px] border-white inline-block" /> :
      name 
      }
    </button>
  );
};

export default ActionBtn;
