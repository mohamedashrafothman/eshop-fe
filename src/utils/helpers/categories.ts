import ICategory from "interfaces/Category.interface";

export const getCategoryHierarchy = (iCategory: ICategory): ICategory[] => {
	const chain: ICategory[] = [];

	const walk = (node: ICategory) => {
		if (!node.parent || node.parent.length === 0) {
			chain.push(node);
			return;
		}

		const parent = node.parent[0];
		walk(parent as ICategory);
		chain.push(node);
	};

	walk(iCategory);
	return chain;
};
