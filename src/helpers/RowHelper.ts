import IRow from '../interfaces/IRow';

class RowHelper {
    static equals(IRowCollection1: IRow, IRowCollection2: IRow): boolean {
        if (IRowCollection1.fileName !== IRowCollection2.fileName) return false;

        if (IRowCollection1.path !== IRowCollection2.path) return false;

        return true;
    }

    static intersection(IRowCollection1: Array<IRow>, IRowCollection2: Array<IRow>): Array<IRow> {
        return IRowCollection1.filter(row => IRowCollection2.includes(row));
    }

    static difference(IRowCollection1: Array<IRow>, IRowCollection2: Array<IRow>): Array<IRow> {
        return IRowCollection1.filter(row => !IRowCollection2.includes(row));
    }

    static symetricdifference(IRowCollection1: Array<IRow>, IRowCollection2: Array<IRow>): Array<IRow> {
        return IRowCollection1
            .filter(row => !IRowCollection2.includes(row))
            .concat(IRowCollection2.filter(row => !IRowCollection1.includes(row)));
    }

    static concatenate(IRowCollection1: Array<IRow>, IRowCollection2: Array<IRow>): Array<IRow> {
        return IRowCollection1.concat(IRowCollection2);
    }

    static isPathInCollection(path: string, IRowCollection: Array<IRow>): boolean {
        return IRowCollection.map(row => row.path).includes(path);
    }
}

export default RowHelper;