import { ArrowDownward } from '@mui/icons-material';
import DataTable, { createTheme } from 'react-data-table-component';

interface myTable{
    columns: object[]
    data: object[]
}
// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
  
    background: {
      default: '#002b30',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

  const customStyles = {
    table: {
		style: {
            marginTop: '30px',
            borderRadius: '10px',
            overflow: 'hidden'
		},
	},
    tableWrapper: {
        style: {
            borderRadius: '10px',
            
		},
	},
    
	rows: {
        style: {
            minHeight: '45px', // override the row height
		},
	},
	headCells: {
		style: {
			paddingLeft: '8px', // override the cell padding for head cells
			paddingRight: '8px',
		},
	},
	cells: {
        style: {
           
			paddingLeft: '8px', // override the cell padding for data cells
			paddingRight: '8px',
		},
	},
};
// A super simple expandable component.
const ExpandedComponent = (a : { data: any }) =>{
    const data = a.data;
 return <pre>{JSON.stringify(data, null, 2)}</pre>;
}


export const MyDataTable : React.FC<myTable> = ( {data, columns}) => {
    const sortIcon = <ArrowDownward />;

	return (
		<DataTable
			columns={columns}
			data={data}
			expandableRows
			expandableRowsComponent={ExpandedComponent}
            sortIcon={sortIcon}
            customStyles={customStyles}
            theme="solarized"
            

		/>
	);
};