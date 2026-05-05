import SmoothScroll from "@/components/providers/smooth-scroll-provider";
import MainNavbar from "@/components/layout/user/main-navbar";
import MainFooter from "@/components/layout/user/main-footer";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    console.log('Ini layouth untuk halaman user');

    return (
        <main>
            <SmoothScroll>
                <MainNavbar />
                {children}
                <MainFooter />
            </SmoothScroll>
        </main>
    );
}