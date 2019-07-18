import IRow from '../../interfaces/IRow';

interface IProps {
    existingPaths: Array<string>;
    confirm(rows: Array<IRow>): void;
}

export default IProps;