import { ActionType } from "./ActionBtn";

const YellowBtn = ({ action, name }: ActionType) => {
  return (
    <div
      className="flex rounded-[10px] items-center justify-center text-[12px] px-2 h-[38px] md:h-auto md:text-base border-yellow border-[1px] w-full md:px-4 py-4 font-semibold text-yellow hover:text-[#020733] hover:bg-yellow cursor-pointer semibold"
      onClick={action}
    >
      <p className="mx-auto text-center">{name}</p>
    </div>
  );
};

export default YellowBtn;
