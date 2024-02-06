type Props = {
  label: string;
  value: number;
};
const BriefCard = ({ label, value }: Props) => {
  return (
    <div className="w-full flex flex-col justify-center gap-y-3 bg-white rounded-2xl p-6 shadow-lg">
      <p className="text-gray-500">{label}</p>
      <p className="text-gray-800 text-3xl font-bold">{value}</p>
    </div>
  );
};
export default BriefCard;
