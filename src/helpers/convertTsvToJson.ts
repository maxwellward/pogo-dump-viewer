/**
 * Converts a TSV (Tab-Separated Values) file to a JSON array.
 *
 * @param {File} file - The TSV file to be converted.
 * @returns {Promise<object[]>} A promise that resolves to an array of objects representing the TSV data.
 *
 * @example
 * const file = new File(["header1\theader2\nvalue1\tvalue2"], "example.tsv");
 * convertTsvToJson(file).then(jsonData => {
 *   console.log(jsonData);
 *   // Output: [{ header1: "value1", header2: "value2" }]
 * });
 */
export const convertTsvToJson = async (file: File) => {
	const rawText = await file.text();
	const rows = rawText.trim().split('\n');
	const headers = rows[0].split('\t');

	// Parse rows
	const jsonData = rows.slice(1).map((row) => {
		const values = row.split('\t');
		const data: { [key: string]: any } = {};

		// Map headers to values
		headers.forEach((header, i) => {
			data[header] = values[i] || null; // Handle missing values with null
		});

		return data;
	});

	return jsonData;
};
