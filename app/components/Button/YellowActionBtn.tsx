import { ActionType } from "./ActionBtn";

const YellowBtn = ({ action, name }: ActionType) => {
  return (
    <div

      className="flex rounded-[10px] items-center justify-center text-[12px] px-2 h-[38px] md:h-auto md:text-base regular border-yellow border-[1px] w-full md:px-4 py-4 semibold font-semibold semibold text-yellow hover:text-blue-body hover:bg-yellow cursor-pointer"

      onClick={action}
    >
      <p>{name}</p>
    </div>
  );
};

export default YellowBtn;
