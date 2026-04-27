export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    console.log('Ini layouth untuk halaman user');


    return (
        <main>
            {children}
        </main>
    );
}