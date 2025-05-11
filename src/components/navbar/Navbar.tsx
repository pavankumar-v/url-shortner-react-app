import { Button } from '@/components/ui/button';
import Text from '@/components/ui/text';

const Navbar = () => {
    return (
        <nav className='bg-primary border-b h-20'>
            <div className='mx-6 h-full flex items-center justify-between'>
                <Text type='h2' className='text-white leading-none p-0 tracking-normal pb-0'>
                    ⚡️ ShortUrl
                </Text>
                <div className='flex items-center gap-4'>
                    <Button variant="default" className='font-medium'>Top 100</Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;