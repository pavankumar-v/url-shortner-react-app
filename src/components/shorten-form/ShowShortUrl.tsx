import React from "react";
import { getShortUrl } from "@/lib/utils";
import CopyButton from "../ui/copy-button";

type ShortUrlProps = {
  shortCode: string;
};

const ShowShortUrl: React.FC<ShortUrlProps> = ({ shortCode }: ShortUrlProps) => {
  const shortUrl = getShortUrl(shortCode);

  return (
    <div className="flex justify-between items-center bg-accent p-4 rounded-xl text-accent-foreground w-full mt-4">
      <div>
        <p className="text-muted-foreground">Your short link:</p>
        <p className="text-primary text-lg">{shortUrl}</p>
      </div>

      <CopyButton text={shortUrl} />
    </div>
  );
};

export default React.memo(ShowShortUrl);
