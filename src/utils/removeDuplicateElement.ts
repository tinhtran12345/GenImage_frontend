interface Identifiable {
    _id: number | string;
}

export const removeDuplicatedById = <T extends Identifiable>(arr: T[]): T[] => {
    return Object.values(
        arr.reduce((acc, current) => {
            acc[current._id] = current;
            return acc;
        }, {} as Record<string | number, T>)
    );
};
