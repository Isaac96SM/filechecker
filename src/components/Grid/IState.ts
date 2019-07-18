import IColumn from '../../interfaces/IColumn';
import IRow from '../../interfaces/IRow';

interface IState {
    columnDefs: Array<IColumn>;
    rowData: Array<IRow>;
    ready: boolean;
}

export default IState;