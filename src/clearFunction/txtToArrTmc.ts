export default function txtToArrTmc(txt: string) {
    return txt
        .match(/(.+)(?=NNNN)/gi)
        .map((item: string) =>
            item
                .replaceAll("\t", "")
                .split("HHHH")
                .filter((str: string) => str !== "")
        )
        .map((item: string[]) => ({
            inventoryNumber: Number(item[0].replace(/[^\d]+/gi, "")),
            name: item[1],
            unit: item[2].replace("H", ""),
            quantity: parseFloat(item[4].replace(",", ".")),
            price: parseFloat(item[3].replace(" ", "").replace(",", ".")),
            location: item[6],
            comment: item[7],
        }));
}
