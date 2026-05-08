import ReportingContent from "@/components/customs/scan-to-report/reporting-content";

export default async function ReportingPage({
    params
}: {
    params: Promise<{ roomCode: string }>
}) {
    const resolvedParams = await params;

    return (
        <div className='min-h-screen w-full bg-background py-10 md:py-12'>
            <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>

                <ReportingContent roomCode={resolvedParams.roomCode} />

            </div>
        </div>
    )
}
