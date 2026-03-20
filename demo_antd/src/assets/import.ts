import type { VegaDataset, VegaSignal } from 'gui4vega'

export const datasets: VegaDataset[] = [
    {
        name: "initialDataset1",
        values: [
            { category: "A", value: 10 },
            { category: "B", value: 20 }
        ]
    },
    {
        name: "initialDataset2",
        values: [
            { category: "X", value: 90 },
            { category: "Y", value: 80 }
        ]
    }
];

export const signals: VegaSignal[] = [
    { name: "initialSignal1", value: 5 },
    { name: "initialSignal2", value: 6 },
];