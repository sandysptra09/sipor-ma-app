import MainNavbar from "@/components/layout/user/main-navbar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    console.log('Ini layouth untuk halaman user');

    return (
        <main>
            <MainNavbar />
            {children}
        </main>
    );
}