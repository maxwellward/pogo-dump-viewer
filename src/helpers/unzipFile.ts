import { BlobReader, BlobWriter, ZipReader } from '@zip.js/zip.js';

/**
 * Unzips a given ZIP file and returns an array of extracted files.
 *
 * @param {File} file - The ZIP file to be unzipped.
 * @param {string} [password] - Optional password for encrypted ZIP files.
 * @returns {Promise<File[]>} - A promise that resolves to an array of extracted files.
 *
 * @throws {Error} If there is an error reading the ZIP file.
 */
export const unzipFile = async (file: File, password?: string): Promise<File[]> => {
	const zipReader = new ZipReader(new BlobReader(file), { password });

	let files: File[] = [];

	try {
		const entries = await zipReader.getEntries();
		for (const entry of entries) {
			if (entry.getData && !entry.directory) {
				const writer = new BlobWriter();
				const blob = await entry.getData(writer, { password });
				const file = new File([blob], entry.filename, { type: blob.type });
				files.push(file);
			}
		}

		await zipReader.close();
	} catch (error) {
		console.error('Error reading the ZIP file: ', error);
	}

	return files;
};
