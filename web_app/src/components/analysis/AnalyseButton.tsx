import { Button } from "@/components/ui/Button";

interface AnalyseButtonProps {
  onClick: () => void;
  isAnalysing: boolean;
  disabled: boolean;
}

export function AnalyseButton({ onClick, isAnalysing, disabled }: AnalyseButtonProps) {
  return (
    <Button
      onClick={onClick}
      isLoading={isAnalysing}
      disabled={disabled}
      size="lg"
      className="w-full h-14 text-lg font-semibold"
    >
      {isAnalysing ? "Analysing Image..." : "Analyse Image"}
    </Button>
  );
}
