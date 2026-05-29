import {
    Document, Page, Text, View, Image, StyleSheet
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 32,
        fontSize: 10,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
        color: '#0f172a',
    },
    header: {
        marginBottom: 16,
        borderBottom: '2px solid #0d9488',
        paddingBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0d9488',
        marginBottom: 4,
    },
    badge: {
        fontSize: 9,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
        backgroundColor: '#ccfbf1',
        color: '#0d9488',
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    row: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    card: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
    },
    cardHeader: {
        backgroundColor: '#0d9488',
        padding: 8,
    },
    cardHeaderText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 9,
    },
    cardBody: {
        padding: 10,
        gap: 4,
    },
    image: {
        width: '100%',
        height: 140,
        objectFit: 'cover',
    },
    imagePlaceholder: {
        width: '100%',
        height: 140,
        backgroundColor: '#f4f4f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 8,
        color: '#64748b',
        marginBottom: 2,
    },
    value: {
        fontSize: 10,
        color: '#0f172a',
        marginBottom: 6,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0d9488',
        marginBottom: 10,
        marginTop: 16,
    },
    infoBox: {
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    infoLabel: {
        width: 100,
        fontSize: 9,
        color: '#64748b',
    },
    infoValue: {
        flex: 1,
        fontSize: 9,
        color: '#0f172a',
    },
    auditItem: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    auditDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#0d9488',
        marginTop: 2,
    },
    auditDotInactive: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e2e8f0',
        marginTop: 2,
    },
    auditContent: {
        flex: 1,
    },
    auditTitle: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    auditDesc: {
        fontSize: 8,
        color: '#64748b',
        marginTop: 2,
    },
    auditTime: {
        fontSize: 8,
        color: '#94a3b8',
        marginTop: 2,
    },
    footer: {
        marginTop: 24,
        borderTop: '1px solid #e2e8f0',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 8,
        color: '#94a3b8',
    },
});

const statusLabel: Record<string, string> = {
    PENDING: 'PENDING',
    VERIFIED: 'SEDANG DIPROSES',
    IN_PROGRESS: 'SEDANG DIPROSES',
    RESOLVED: 'SELESAI',
    REJECTED: 'DITOLAK',
};

interface ReportPDFProps {
    report: any;
    formatDateTime: (date: string) => string;
}

export default function ReportPDF({ report, formatDateTime }: ReportPDFProps) {
    const masterTimeline = [
        { statusKey: 'PENDING', title: 'Laporan Terkirim', defaultDesc: 'Sistem menerima laporan dan memberikan nomor antrean otomatis.' },
        { statusKey: 'VERIFIED', title: 'Verifikasi Admin', defaultDesc: 'Laporan dinyatakan valid oleh tim Sarpras.' },
        { statusKey: 'IN_PROGRESS', title: 'Proses Perbaikan', defaultDesc: 'Tim teknisi sedang melakukan penanganan fisik di lokasi.' },
        { statusKey: 'RESOLVED', title: 'Selesai', defaultDesc: 'Masalah teratasi sepenuhnya dan dokumentasi diunggah.' },
    ];

    const dbLogs = report?.logs || [];
    const isRejected = report?.status === 'REJECTED';
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Detail Dokumentasi Perbaikan</Text>
                    <Text style={styles.badge}>
                        {statusLabel[report?.status] ?? report?.status}
                    </Text>
                </View>

                {/* Info laporan */}
                <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Nomor Laporan</Text>
                        <Text style={styles.infoValue}>{report?.reportNumber ?? '-'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Lokasi</Text>
                        <Text style={styles.infoValue}>{report?.location ?? '-'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Kategori</Text>
                        <Text style={styles.infoValue}>{report?.category ?? '-'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Prioritas</Text>
                        <Text style={styles.infoValue}>{report?.priority ?? '-'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Pelapor</Text>
                        <Text style={styles.infoValue}>{report?.user?.name ?? 'Mahasiswa'}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Tanggal Laporan</Text>
                        <Text style={styles.infoValue}>{formatDateTime(report?.createdAt)}</Text>
                    </View>
                </View>

                {/* Before / After image */}
                <View style={styles.row}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardHeaderText}>SEBELUM</Text>
                        </View>
                        {report?.imageBefore ? (
                            <Image style={styles.image} src={report.imageBefore} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Text style={{ color: '#94a3b8', fontSize: 9 }}>Tidak ada gambar</Text>
                            </View>
                        )}
                        <View style={styles.cardBody}>
                            <Text style={styles.label}>Deskripsi</Text>
                            <Text style={styles.value}>{report?.description ?? '-'}</Text>
                            <Text style={styles.label}>Pelapor</Text>
                            <Text style={styles.value}>{report?.user?.name ?? 'Mahasiswa'}</Text>
                            <Text style={styles.label}>Waktu</Text>
                            <Text style={styles.value}>{formatDateTime(report?.createdAt)}</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardHeaderText}>SESUDAH</Text>
                        </View>
                        {report?.status === 'RESOLVED' && report?.imageAfter ? (
                            <Image style={styles.image} src={report.imageAfter} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Text style={{ color: '#94a3b8', fontSize: 9 }}>Belum Ada Dokumentasi</Text>
                            </View>
                        )}
                        <View style={styles.cardBody}>
                            <Text style={styles.label}>Keterangan</Text>
                            <Text style={styles.value}>
                                {report?.status === 'RESOLVED'
                                    ? 'Semua komponen sepenuhnya diganti dan kembali berfungsi.'
                                    : report?.status === 'REJECTED'
                                        ? 'Laporan ditolak oleh sistem/admin.'
                                        : 'Menunggu tindak lanjut dari tim Sarpras.'}
                            </Text>
                            <Text style={styles.label}>Admin</Text>
                            <Text style={styles.value}>
                                {report?.status === 'RESOLVED' || report?.status === 'REJECTED'
                                    ? (report?.admin?.name ?? 'Admin Sarpras')
                                    : 'Menunggu Admin'}
                            </Text>
                            <Text style={styles.label}>Waktu</Text>
                            <Text style={styles.value}>
                                {report?.status === 'RESOLVED'
                                    ? formatDateTime(report?.updatedAt)
                                    : 'Menunggu Proses'}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Audit trail */}
                <Text style={styles.sectionTitle}>Audit Trail Laporan</Text>

                {isRejected ? (
                    <>
                        <View style={styles.auditItem}>
                            <View style={styles.auditDot} />
                            <View style={styles.auditContent}>
                                <Text style={styles.auditTitle}>Laporan Terkirim</Text>
                                <Text style={styles.auditDesc}>Sistem menerima laporan dari mahasiswa.</Text>
                                <Text style={styles.auditTime}>
                                    {formatDateTime(dbLogs.find((l: any) => l.status === 'PENDING')?.createdAt ?? report?.createdAt)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.auditItem}>
                            <View style={styles.auditDot} />
                            <View style={styles.auditContent}>
                                <Text style={styles.auditTitle}>Laporan Ditolak</Text>
                                <Text style={styles.auditDesc}>
                                    {dbLogs.find((l: any) => l.status === 'REJECTED')?.note ?? 'Laporan ditolak oleh sistem/admin.'}
                                </Text>
                                <Text style={styles.auditTime}>
                                    {formatDateTime(dbLogs.find((l: any) => l.status === 'REJECTED')?.createdAt ?? report?.updatedAt)}
                                </Text>
                            </View>
                        </View>
                    </>
                ) : (
                    masterTimeline.map((step) => {
                        const logData = dbLogs.find((l: any) => l.status === step.statusKey);
                        const isDone = Boolean(logData);
                        return (
                            <View key={step.statusKey} style={styles.auditItem}>
                                <View style={isDone ? styles.auditDot : styles.auditDotInactive} />
                                <View style={styles.auditContent}>
                                    <Text style={styles.auditTitle}>{step.title}</Text>
                                    <Text style={styles.auditDesc}>
                                        {logData?.note ?? step.defaultDesc}
                                    </Text>
                                    {logData && (
                                        <Text style={styles.auditTime}>{formatDateTime(logData.createdAt)}</Text>
                                    )}
                                </View>
                            </View>
                        );
                    })
                )}

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Dicetak pada: {new Date().toLocaleString('id-ID')}
                    </Text>
                    <Text style={styles.footerText}>
                        {report?.reportNumber}
                    </Text>
                </View>

            </Page>
        </Document>
    );
}