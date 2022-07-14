import {Grid} from 'ag-grid-community';
import 'ag-grid-enterprise';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const gridOptions = {

    rowModelType: 'serverSide',

    columnDefs: [
        {field: 'athlete'},
        {field: 'country', rowGroup: true, hide: true},
        {field: 'sport', rowGroup: true, hide: true},
        {field: 'year', filter: 'number', filterParams: {newRowsAction: 'keep'}},
        {field: 'gold', aggFunc: 'sum'},
        {field: 'silver', aggFunc: 'sum'},
        {field: 'bronze', aggFunc: 'sum'},
    ],

    defaultColDef: {
        sortable: true
    }

    // debug: true,
    // cacheBlockSize: 20,
    // maxBlocksInCache: 3,
    // purgeClosedRowNodes: true,
    // maxConcurrentDatasourceRequests: 2,
    // blockLoadDebounceMillis: 1000
};

const gridDiv = document.querySelector('#myGrid');
new Grid(gridDiv, gridOptions);

const datasource = {
    getRows(params) {
         console.log(JSON.stringify(params.request, null, 1));

         var axios = require('axios');
         var config = {
                     method: 'post',
                     url: './olympicWinners/',
                     headers: {"Content-Type": "application/json; charset=utf-8"},
                     data : JSON.stringify(params.request)
             };
         axios(config)
             .then(function (response) {
                let data  = response.data;
                let rows = data.rows.rows;
                let lastRow = data.lastRow;
                params.successCallback(rows, lastRow);
         })
         .catch(function (error) {
             console.log(error);
             params.failCallback();
         });
    }
};

gridOptions.api.setServerSideDatasource(datasource);