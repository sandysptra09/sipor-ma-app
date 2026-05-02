import AuthBanner from '@/components/customs/auth/banners/auth-banner';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    console.log('Ini layouth untuk halaman auth');

    return (
        <div className='flex h-screen w-full overflow-hidden bg-white'>

            <div className='relative hidden h-full w-full flex-col p-12 lg:flex lg:w-1/2'>

                <AuthBanner />

            </div>

            <div className='flex h-full w-full flex-col overflow-y-auto bg-background lg:w-1/2'>

                <div className='flex min-h-full w-full flex-col px-6 lg:px-12'>

                    <div className='mx-auto my-auto w-full max-w-110 py-12'>
                        {children}
                    </div>

                </div>

            </div>

        </div>
    );
}