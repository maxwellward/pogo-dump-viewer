/**
 * Converts a CSV string into a JSON array of objects.
 *
 * @param content - The CSV content as a string.
 * @returns A promise that resolves to an array of objects, where each object represents a row in the CSV.
 *
 * @example
 * ```typescript
 * const csvContent = "name,age\nAlice,30\nBob,25";
 * const jsonArray = await convertCsvToJson(csvContent);
 * console.log(jsonArray);
 * // Output: [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }]
 * ```
 */
export const convertCsvToJson = async (content: string) => {
	const rows = content.trim().split('\n');
	const headers = rows[0].split(',');

	// Parse rows
	const jsonData = rows.slice(1).map((row) => {
		const values = row.split(',');
		const data: { [key: string]: any } = {};

		// Map headers to values
		headers.forEach((header, i) => {
			data[header] = values[i] || null; // Handle missing values with null
		});

		return data;
	});

	return jsonData;
};
