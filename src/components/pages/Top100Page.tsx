import React from "react";
import Text from "@/components/ui/text";
import UrlsDataTable from "@/components/top100_urls/UrlsDataTable";

const Top100Page: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Text type="h1" className="text-center text-3xl font-bold mb-8">
        Top 100 Most Visited URLs
      </Text>

      <UrlsDataTable />
    </div>
  );
};

export default Top100Page;
