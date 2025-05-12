import type React from "react";
import { Button } from "./button";
import { useClipboard } from "@/hooks";


type CopyButton = {
  text: string;
}

const CopyButton: React.FC<CopyButton> = ({ text }) => {
  const { copy, isCopied } = useClipboard()

  return (
    <Button
      variant={isCopied ? "default" : "outline"}
      onClick={() => copy(text)}
      className="min-w-[80px] transition-all"
    >
      {isCopied ? "Copied!" : "Copy"}
    </Button>
  )
}

export default CopyButton;
