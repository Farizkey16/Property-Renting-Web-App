import { Button } from "@/components/ui/button";

interface ReserveButtonProps {
  onClick: () => void;
  isDisabled?: boolean;
}

export const ReserveButton: React.FC<ReserveButtonProps> = ({
  onClick,
  isDisabled,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      className="w-full bg-green-500 hover:bg-green-600 text-white mt-2 disabled:opacity-50">
      Reserve now
    </Button>
  );
};

