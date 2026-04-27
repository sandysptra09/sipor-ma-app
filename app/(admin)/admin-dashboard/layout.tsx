export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    console.log('Ini layouth untuk halaman admin');


    return (
        <main>
            {children}
        </main>
    );
}