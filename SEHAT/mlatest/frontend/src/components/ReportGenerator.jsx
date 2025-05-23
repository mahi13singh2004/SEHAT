import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { useAuthStore } from '../store/auth.store';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement
);

const styles = StyleSheet.create({
    page: {
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#92000b',
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333333',
        fontWeight: 'bold',
        borderBottom: '1px solid #92000b',
        paddingBottom: 5,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
        color: '#333333',
    },
    metricValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#92000b',
        marginBottom: 3,
    },
    table: {
        display: 'table',
        width: 'auto',
        marginBottom: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#92000b',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#92000b',
    },
    tableHeader: {
        backgroundColor: '#92000b',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    tableCell: {
        padding: 5,
        fontSize: 10,
        borderRightWidth: 1,
        borderRightColor: '#92000b',
        color: '#333333',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        color: '#666666',
        fontSize: 10,
    },
});

const PDFReport = ({ locations, metrics, timeData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>VOICE OF SAAHAS - Safety Report</Text>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Executive Summary</Text>
                <Text style={styles.text}>Report Generated: {format(new Date(), 'PPpp')}</Text>
                <Text style={styles.metricValue}>Total Unsafe Areas: {metrics.totalUnsafeAreas}</Text>
                <Text style={styles.metricValue}>Reports in Last 24 Hours: {metrics.last24Hours}</Text>
                <Text style={styles.metricValue}>Recent Reports (10 mins): {metrics.recentMarks}</Text>
                <Text style={styles.metricValue}>Peak Reporting Hour: {metrics.peakHour}</Text>
                <Text style={styles.metricValue}>Average Reports per Day: {metrics.averageReportsPerDay}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Recent Unsafe Locations</Text>
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={[styles.tableCell, { width: '30%' }]}>Time</Text>
                        <Text style={[styles.tableCell, { width: '35%' }]}>Latitude</Text>
                        <Text style={[styles.tableCell, { width: '35%' }]}>Longitude</Text>
                    </View>
                    {locations.slice(-5).map((loc, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={[styles.tableCell, { width: '30%' }]}>
                                {format(new Date(loc.createdAt), 'PPp')}
                            </Text>
                            <Text style={[styles.tableCell, { width: '35%' }]}>
                                {loc.lat.toFixed(4)}
                            </Text>
                            <Text style={[styles.tableCell, { width: '35%' }]}>
                                {loc.lng.toFixed(4)}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.subHeader}>Hourly Distribution</Text>
                {Object.entries(timeData)
                    .filter(([, count]) => count > 0)
                    .map(([time, count], index) => (
                        <Text key={index} style={styles.text}>
                            {time}: {count} reports
                        </Text>
                    ))}
            </View>

            <Text style={styles.footer}>
                Generated by VOICE OF SAAHAS - Safety Monitoring System
            </Text>
        </Page>
    </Document>
);

const ReportGenerator = () => {
    const { unsafeLocations, fetchUnsafeLocations } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchUnsafeLocations();
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching unsafe locations:', error);
                setIsLoading(false);
            }
        };
        loadData();
    }, [fetchUnsafeLocations]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Calculate metrics from locations data
    const metrics = {
        totalUnsafeAreas: unsafeLocations.length,
        last24Hours: unsafeLocations.filter(loc => {
            const created = new Date(loc.createdAt);
            const now = new Date();
            return (now - created) <= 24 * 60 * 60 * 1000;
        }).length,
        increasedAreas: unsafeLocations.filter(loc => {
            const created = new Date(loc.createdAt);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return created > yesterday;
        }).length,
        recentMarks: unsafeLocations.filter(loc => {
            const created = new Date(loc.createdAt);
            const tenMinutesAgo = new Date();
            tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
            return created > tenMinutesAgo;
        }).length,
        peakHour: (() => {
            const hourlyData = Array(24).fill(0);
            unsafeLocations.forEach(loc => {
                const hour = new Date(loc.createdAt).getHours();
                hourlyData[hour]++;
            });
            const maxIndex = hourlyData.indexOf(Math.max(...hourlyData));
            return `${maxIndex}:00 - ${maxIndex + 1}:00`;
        })(),
        averageReportsPerDay: (() => {
            const days = new Set(unsafeLocations.map(loc =>
                new Date(loc.createdAt).toDateString()
            )).size;
            return days > 0 ? (unsafeLocations.length / days).toFixed(1) : 0;
        })(),
    };

    // Process data for line chart (10-minute intervals)
    const getTimeIntervals = () => {
        const intervals = {};
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));

        for (let i = 0; i < 144; i++) {
            const time = new Date(startOfDay.getTime() + i * 10 * 60000);
            intervals[time.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })] = 0;
        }
        return intervals;
    };

    const timeData = unsafeLocations.reduce((acc, loc) => {
        const created = new Date(loc.createdAt);
        if (created.toDateString() === new Date().toDateString()) {
            const timeKey = created.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            acc[timeKey] = (acc[timeKey] || 0) + 1;
        }
        return acc;
    }, getTimeIntervals());

    // Process data for hourly heat map
    const hourlyData = Array(24).fill(0);
    unsafeLocations.forEach(loc => {
        const hour = new Date(loc.createdAt).getHours();
        hourlyData[hour]++;
    });

    const heatMapData = {
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
            {
                label: 'Reports by Hour',
                data: hourlyData,
                backgroundColor: hourlyData.map(count =>
                    `rgba(255, ${255 - Math.min(count * 20, 255)}, ${255 - Math.min(count * 20, 255)}, 0.8)`
                ),
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Process data for pie chart (past hour)
    const pastHourData = unsafeLocations.filter(loc => {
        const created = new Date(loc.createdAt);
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);
        return created > oneHourAgo;
    });

    const pieChartData = {
        labels: ['Last 10 Minutes', '10-30 Minutes', '30-60 Minutes'],
        datasets: [
            {
                data: [
                    pastHourData.filter(loc => {
                        const created = new Date(loc.createdAt);
                        const tenMinutesAgo = new Date();
                        tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
                        return created > tenMinutesAgo;
                    }).length,
                    pastHourData.filter(loc => {
                        const created = new Date(loc.createdAt);
                        const thirtyMinutesAgo = new Date();
                        thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);
                        return created > thirtyMinutesAgo;
                    }).length,
                    pastHourData.filter(loc => {
                        const created = new Date(loc.createdAt);
                        const oneHourAgo = new Date();
                        oneHourAgo.setHours(oneHourAgo.getHours() - 1);
                        return created > oneHourAgo;
                    }).length,
                ],
                backgroundColor: [
                    'rgba(255, 0, 0, 0.8)',
                    'rgba(255, 51, 51, 0.8)',
                    'rgba(255, 102, 102, 0.8)',
                ],
                borderColor: [
                    'rgba(255, 0, 0, 1)',
                    'rgba(255, 51, 51, 1)',
                    'rgba(255, 102, 102, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const lineChartData = {
        labels: Object.keys(timeData),
        datasets: [
            {
                label: 'Reports in Last 24 Hours',
                data: Object.values(timeData),
                borderColor: '#ff0000',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                tension: 0.4,
                fill: true,
                pointStyle: 'circle',
                pointRadius: 3,
                pointHoverRadius: 6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#ffffff',
                },
            },
            title: {
                display: true,
                color: '#ffffff',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                    stepSize: 1,
                    color: '#ffffff',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
            x: {
                ticks: {
                    color: '#ffffff',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
            },
        },
    };

    const openGoogleMaps = (lat, lng) => {
        const url = `https://www.google.com/maps?q=${lat},${lng}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-black p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Safety Dashboard</h1>
                <div className="flex items-center gap-4">
                    <PDFDownloadLink
                        document={
                            <PDFReport
                                locations={unsafeLocations}
                                metrics={metrics}
                                timeData={timeData}
                            />
                        }
                        fileName={`safety-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                        {({ loading, error }) => (
                            <div className="flex items-center gap-2">
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Generating PDF...</span>
                                    </>
                                ) : error ? (
                                    <span className="text-red-300">Error generating PDF</span>
                                ) : (
                                    <>
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                        <span>Download Report</span>
                                    </>
                                )}
                            </div>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-6 text-white">VOICE OF SAAHAS</h1>

            {/* Metrics Cards */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[
                    { key: 'totalUnsafeAreas', label: 'Total Unsafe Areas Marked', timeframe: 'All Time' },
                    { key: 'last24Hours', label: 'Unsafe Areas Marked', timeframe: 'Last 24 Hours' },
                    { key: 'increasedAreas', label: 'Increase in Unsafe Areas', timeframe: 'Since Yesterday' },
                    { key: 'recentMarks', label: 'Recent Unsafe Marks', timeframe: 'Last 10 Minutes' },
                ].map((item) => (
                    <div key={item.key} className="bg-gray-900 p-4 rounded-lg shadow border border-red-600">
                        <h3 className="text-gray-300">{item.label}</h3>
                        <div className="text-2xl font-bold text-red-500">{metrics[item.key]}</div>
                        <div className="text-sm text-gray-400">{item.timeframe}</div>
                    </div>
                ))}
            </section>

            {/* Additional Metrics */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900 p-4 rounded-lg shadow border border-red-600">
                    <h3 className="text-gray-300">Peak Reporting Hour</h3>
                    <div className="text-2xl font-bold text-red-500">{metrics.peakHour}</div>
                    <div className="text-sm text-gray-400">Most Active Time Period</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg shadow border border-red-600">
                    <h3 className="text-gray-300">Average Reports per Day</h3>
                    <div className="text-2xl font-bold text-red-500">{metrics.averageReportsPerDay}</div>
                    <div className="text-sm text-gray-400">Historical Average</div>
                </div>
            </section>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <section className="bg-gray-900 p-6 rounded-lg shadow border border-red-600">
                    <h2 className="text-xl font-bold mb-4 text-white">Reports Over Time</h2>
                    <div className="h-[400px]">
                        <Line data={lineChartData} options={chartOptions} />
                    </div>
                </section>

                <section className="bg-gray-900 p-6 rounded-lg shadow border border-red-600">
                    <h2 className="text-xl font-bold mb-4 text-white">Past Hour Distribution</h2>
                    <div className="h-[400px]">
                        <Pie data={pieChartData} options={chartOptions} />
                    </div>
                </section>
            </div>

            {/* Heat Map */}
            <section className="bg-gray-900 p-6 rounded-lg shadow border border-red-600 mb-6">
                <h2 className="text-xl font-bold mb-4 text-white">Hourly Distribution Heat Map</h2>
                <div className="h-[400px]">
                    <Bar
                        data={heatMapData}
                        options={{
                            ...chartOptions,
                            plugins: {
                                ...chartOptions.plugins,
                                title: {
                                    ...chartOptions.plugins.title,
                                    text: 'Reports by Hour of Day',
                                },
                            },
                        }}
                    />
                </div>
            </section>

            {/* Recent Reports */}
            <section className="bg-gray-900 p-6 rounded-lg shadow border border-red-600">
                <h2 className="text-xl font-bold mb-4 text-white">Recent Reports</h2>
                <div className="space-y-4">
                    {unsafeLocations
                        .slice(-5)
                        .reverse()
                        .map((location) => (
                            <div
                                key={location._id}
                                className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg border border-red-600"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-red-500">📍</span>
                                    <div>
                                        <p className="font-medium text-white">
                                            Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {new Date(location.createdAt).toLocaleString()}
                                        </p>
                                        <button
                                            onClick={() => openGoogleMaps(location.lat, location.lng)}
                                            className="text-red-400 hover:text-red-300 text-sm mt-1 flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                                            </svg>
                                            View on Map
                                        </button>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-sm bg-red-900 text-red-300">
                                    Unsafe
                                </span>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default ReportGenerator; 