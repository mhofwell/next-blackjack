import Navigation from '../../components/Navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <section>
                <Navigation />
                {children}
            </section>
        </>
    );
}
