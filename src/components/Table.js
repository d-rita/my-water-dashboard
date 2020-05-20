import React, { Component } from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import { processDataFeeds } from '../utils/processing';

class Table extends Component{
    constructor(props){
        super(props);
        this.state = {
            tableData: [],
            error: null
        }
    }

    fetchData()
    {
        const url = "https://api.thingspeak.com/channels/945591/feeds.json?results=10";
        axios(url)
        .then((resp)=> {
            let tableData = processDataFeeds(resp.data.feeds);
            console.log(resp.data.feeds);
            this.setState({ 
                tableData,
                error: null
             })
        })
        .catch((err)=> {
            console.log(err);
            this.setState({ error: err})
        })
    }

    componentDidMount()
    // update state every minute
    { 
        this.timerID = setInterval(
            () => this.fetchData(), 5000
        );
    }

    componentWillUnmount()
    {
        clearInterval(this.timerID);
    }

    render() {
        const { tableData } = this.state;

        const options = {
            page: 1,  // page default
            sizePerPageList: [ {
              text: '5', value: 5
            }, {
              text: '10', value: 10
            }, {
              text: 'All', value: tableData.length
            } ],
            sizePerPage: 5,
            pageStartIndex: 1,
            paginationSize: 3, 
            prePage: 'Previous',
            nextPage: 'Next', // Next page button text
            firstPage: 'First', 
            lastPage: 'Last',
            prePageTitle: 'Go to previous', // Previous page button title
            nextPageTitle: 'Go to next', // Next page button title
            firstPageTitle: 'Go to first', // First page button title
            lastPageTitle: 'Go to Last', // Last page button title
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'top',  // default is bottom, top and both is all available
            hideSizePerPage: true, //> You can hide the dropdown for sizePerPage
            alwaysShowAllBtns: true // Always show next and previous button
        }
        return (
            <div className="table-section">
                <BootstrapTable data={tableData} pagination options={options}>
                    <TableHeaderColumn dataField="date" dataAlign='center' headerAlign="center" width="20%" dataSort>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="time" dataAlign='center' headerAlign="center" width="20%" dataSort>Time</TableHeaderColumn>
                    <TableHeaderColumn dataField="entry_id" isKey dataAlign='center' headerAlign="center" width="20%" hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="turbidity" dataAlign='center' headerAlign="center" width="20%">Turbidity (NTUs)</TableHeaderColumn>
                    <TableHeaderColumn dataField="pH" dataAlign='center' headerAlign="center" width="20%">pH</TableHeaderColumn>
                    <TableHeaderColumn dataField="temperature" dataAlign='center' headerAlign="center" width="20%">Temperature (Celsius)</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default Table;
