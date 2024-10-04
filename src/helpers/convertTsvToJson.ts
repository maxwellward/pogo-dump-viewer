/**
 * Converts TSV (Tab-Separated Values) content to a JSON array.
 *
 * @param content - The TSV content as a string.
 * @returns A promise that resolves to an array of objects, where each object represents a row in the TSV.
 *          The keys of the objects are derived from the headers in the first row of the TSV.
 *
 * @example
 * ```typescript
 * const tsvContent = "name\tage\tcity\nJohn\t30\tNew York\nJane\t25\tLos Angeles";
 * const jsonArray = await convertTsvToJson(tsvContent);
 * console.log(jsonArray);
 * // Output:
 * // [
 * //   { name: "John", age: "30", city: "New York" },
 * //   { name: "Jane", age: "25", city: "Los Angeles" }
 * // ]
 * ```
 */
export const convertTsvToJson = async (content: string) => {
	const rows = content.trim().split('\n');
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
