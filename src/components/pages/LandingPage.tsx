import Text from "@/components/ui/text";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import UrlShortenForm from "../shorten-form/UrlShortenForm";


const LandingPage = () => {
    return (
        <div className="h-full w-full flex flex-col items-center">
            <Text type="h1" className="text-center text-4xl font-extrabold mt-20">
                Short Links. Big Impact.
            </Text>

            <Text type="p" className="text-center text-lg mt-4 max-w-2xl text-muted-foreground">
                Create, manage, and track short links that drive better marketing results. Powerful URL shortening with enterprise-grade analytics.
            </Text>


            <UrlShortenForm />
        </div>
    );
}

export default LandingPage;