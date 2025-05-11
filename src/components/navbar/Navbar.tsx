import { Button } from '@/components/ui/button';
import Text from '@/components/ui/text';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className='bg-primary border-b h-20'>
            <div className='mx-6 h-full flex items-center justify-between'>
                <Link to="/">
                    <Text type='h2' className='text-white leading-none p-0 tracking-normal pb-0 cursor-pointer'>
                        ⚡️ ShortUrl
                    </Text>
                </Link>
                <div className='flex items-center gap-4'>
                    <Link to="/top100">
                        <Button variant="default" className='font-medium'>Top 100</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;