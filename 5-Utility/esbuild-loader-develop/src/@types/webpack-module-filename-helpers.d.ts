declare module 'webpack/lib/ModuleFilenameHelpers.js' {
	type Filter = string | RegExp;
	type FilterObject = {
		test?: Filter | Filter[];
		include?: Filter | Filter[];
		exclude?: Filter | Filter[];
	};

	export const matchObject: (filterObject: FilterObject, stringToCheck: string) => boolean;
}
