import { auth } from "@/auth";
import StoreInitializer from "@/components/providers/store-initializer";

import SmoothScroll from "@/components/providers/smooth-scroll-provider";
import MainNavbar from "@/components/layout/user/main-navbar";
import MainFooter from "@/components/layout/user/main-footer";

import MobileFAB from "@/components/layout/user/mobile-fab";

export default async function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    console.log('Ini layouth untuk halaman user');

    const session = await auth();

    return (
        <main>
            <StoreInitializer user={session?.user || null} />
            <SmoothScroll>
                <MainNavbar />
                {children}
                <MainFooter />
            </SmoothScroll>

            {session?.user && <MobileFAB />}
        </main>
    );
}