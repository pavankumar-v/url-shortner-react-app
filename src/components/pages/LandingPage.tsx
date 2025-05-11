import Text from "@/components/ui/text";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";


const LandingPage = () => {
    return (
        <div className="h-full w-full flex flex-col items-center">
            <Text type="h1" className="text-center text-4xl font-extrabold mt-20">
                Short Links. Big Impact.
            </Text>

            <Text type="p" className="text-center text-lg mt-4 max-w-2xl text-muted-foreground">
                Create, manage, and track short links that drive better marketing results. Powerful URL shortening with enterprise-grade analytics.
            </Text>


            <Input className="mt-10 !text-accent-foreground max-w-3xl rounded-xl !text-[1.2rem] !py-[1.8rem] !px-[1rem] border-border border-2" placeholder="https://example.com/long-url" />
            <Button variant="secondary" size="lg" className="text-xl p-6  w-full max-w-3xl mt-3 rounded-lg">
                Generate Short Link
            </Button>
        </div>
    );
}

export default LandingPage;