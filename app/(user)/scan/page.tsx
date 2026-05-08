import ScanToReportContent from "@/components/customs/scan-to-report/scan-to-report-content";

export default function ScanPage() {
    return (
        <div className='w-full bg-background py-10 md:py-14 min-h-[70vh] flex flex-col justify-center'>
            <div className='mx-auto w-full max-w-6xl px-6 lg:px-8'>

                <ScanToReportContent />

            </div>
        </div>
    )
}
