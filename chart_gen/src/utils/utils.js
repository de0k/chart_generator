import * as XLSX from 'xlsx';

export const rgbaToHex = (rgba) => {
    const parts = rgba.match(/\d+/g);
    const r = parseInt(parts[0]).toString(16).padStart(2, '0');
    const g = parseInt(parts[1]).toString(16).padStart(2, '0');
    const b = parseInt(parts[2]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
};

export const hexToRgba = (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export async function parseFileData(file, fileExtension) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                if (fileExtension === 'json') {
                    const data = JSON.parse(event.target.result);
                    resolve(formatJsonData(data));
                } else if (fileExtension === 'xlsx') {
                    const workbook = XLSX.read(event.target.result, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    resolve(formatXlsxData(data));
                }
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };

        if (fileExtension === 'json') {
            reader.readAsText(file);
        } else if (fileExtension === 'xlsx') {
            reader.readAsBinaryString(file);
        }
    });
}

function formatJsonData(data) {
    const labels = data.labels || [];
    const datasets = data.datasets.map((dataset) => ({
        label: dataset.label,
        data: dataset.data,
    }));

    return { labels, datasets };
}

function formatXlsxData(data) {
    // First column is labels, first row contains dataset labels
    const labels = data.slice(1).map(row => row[0]); // Exclude header and use first column as labels
    const datasets = data[0].slice(1).map((datasetLabel, colIndex) => ({
        label: datasetLabel || `데이터셋 ${colIndex + 1}`,
        data: data.slice(1).map(row => row[colIndex + 1] || 0), // Skip header row
    }));

    return { labels, datasets };
}

// export function getDefaultChartOptions(chartType, datasetCount = 1, labelCount = 1) {
//     switch (chartType) {
//         case 'Bar':
//             return {
//                 backgroundColors: Array(datasetCount).fill().map(() => 'rgba(255, 99, 132, 0.6)'),
//                 borderColors: Array(datasetCount).fill().map(() => 'rgba(54, 162, 235, 1)'),
//                 borderWidth: Array(datasetCount).fill(1),
//             };
//         case 'Line':
//             return {
//                 backgroundColors: Array(datasetCount).fill().map(() => 'rgba(255, 99, 132, 0.6)'),
//                 borderColors: Array(datasetCount).fill().map(() => 'rgba(54, 162, 235, 1)'),
//                 borderWidth: Array(datasetCount).fill(1),
//                 fill: Array(datasetCount).fill(false),
//             };
//         case 'Pie':
//         case 'Doughnut':
//             return {
//                 backgroundColors: Array(datasetCount).fill().map(() =>
//                     Array(labelCount).fill().map(() =>
//                         `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
//                     )
//                 ),
//             };
//         default:
//             return {
//                 backgroundColors: [],
//                 borderColors: [],
//                 borderWidth: [],
//             };
//     }
// }

// export function updateChartOptionsForLabels(chartType, labels, existingOptions) {
//     if (chartType === 'Pie' || chartType === 'Doughnut') {
//         const updatedBackgroundColors = labels.map((_, index) =>
//             existingOptions.backgroundColors[index] || `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`
//         );
//         return {
//             ...existingOptions,
//             backgroundColors: updatedBackgroundColors,
//         };
//     }
//     return existingOptions;
// }