import {getRemotionEnvironment} from './get-remotion-environment';
import type {StaticFile} from './get-static-files';

type WatcherCallback = (newData: StaticFile | null) => void;

export const WATCH_REMOTION_STATIC_FILES = 'remotion_staticFilesChanged';

export type WatchRemotionStaticFilesPayload = {
	files: StaticFile[];
};

/**
 * @description Watch for changes in a specific static file.
 * @param {string} fileName - The name of the static file to watch for changes.
 * @param {WatcherCallback} callback - A callback function to be called when the file changes.
 * @returns {{cancel: () => void}} A function that can be used to cancel the event listener.
 * @see [Documentation](https://www.remotion.dev/docs/watchstaticfile)
 */
export const watchStaticFile = (
	fileName: string,
	callback: WatcherCallback,
): {cancel: () => void} => {
	// Check if function is called in Remotion Studio
	if (!getRemotionEnvironment().isStudio) {
		// eslint-disable-next-line no-console
		console.warn('The API is only available while using the Remotion Studio.');
		return {cancel: () => undefined};
	}

	let prevFileData = window.remotion_staticFiles.find(
		(file: StaticFile) => file.name === fileName,
	);

	// Check if the specified static file has updated or deleted
	const checkFile = (event: Event) => {
		const staticFiles: StaticFile[] = (
			(event as CustomEvent).detail as WatchRemotionStaticFilesPayload
		).files;

		// Check for user specified file
		const newFileData = staticFiles.find(
			(file: StaticFile) => file.name === fileName,
		);

		if (!newFileData) {
			// File is deleted
			if (prevFileData !== undefined) {
				callback(null);
			}

			prevFileData = undefined;
			return;
		}

		if (
			prevFileData === undefined ||
			prevFileData.lastModified !== newFileData.lastModified
		) {
			callback(newFileData); // File is added or modified
			prevFileData = newFileData;
		}
	};

	window.addEventListener(WATCH_REMOTION_STATIC_FILES, checkFile);

	const cancel = () => {
		return window.removeEventListener(WATCH_REMOTION_STATIC_FILES, checkFile);
	};

	return {cancel};
};
