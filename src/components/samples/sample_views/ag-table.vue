<template>
  <div class="ag-theme-alpine custom-grid" style="height: 500px; width: 100%;">
    <ag-grid-vue
      :rowData="rowData.data"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      :paginationPageSize="10"
      @grid-ready="onGridReady">
    </ag-grid-vue>
  </div>
</template>
<script>
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default {
  components: {
    AgGridVue
  },
  data() {
    return {
      rowData:{
        "data": [
            {
                "memory_used_min": 5,
                "delay_mx": 84.0,
                "memory_used_avg": 5,
                "cpu_max": 93,
                "disk_used_min": 0,
                "disk_used_avg": 0,
                "diff_blk_count": "0",
                "sr_stat": "PFD-A,PFD-B,0,0,0",
                "count_high": 0,
                "delay_check_mx": 1,
                "diff_thr_count": "0",
                "count_error": 0,
                "db_mx": "SYSTEMDB",
                "blocked_transaction_count": 0,
                "mts_chk": 0,
                "backup_stat_mx": 0,
                "count_medium": 0,
                "memory_used_max": 5,
                "count_low": 0,
                "dbname": "SYSTEMDB",
                "sno": 168,
                "sname": "PDF",
                "connection_count": 22,
                "sys_end_time_mx": "2024-09-15 23:01:49",
                "disk_used_max": 0,
                "diff_conn_count": "0",
                "total_thread_count": 184,
                "cpu_avg": 78,
                "cpu_min": 52,
                "status": 0
            },
            {
                "memory_used_min": 5,
                "delay_mx": 84.0,
                "memory_used_avg": 5,
                "cpu_max": 93,
                "disk_used_min": 0,
                "disk_used_avg": 1,
                "diff_blk_count": "0",
                "sr_stat": "PFD-A,PFD-B,0,0,0",
                "count_high": 0,
                "delay_check_mx": 1,
                "diff_thr_count": "+1",
                "count_error": 0,
                "db_mx": "PFD",
                "blocked_transaction_count": 0,
                "mts_chk": 0,
                "backup_stat_mx": 0,
                "count_medium": 3,
                "memory_used_max": 5,
                "count_low": 0,
                "dbname": "PFD",
                "sno": 168,
                "sname": "PDF",
                "connection_count": 22,
                "sys_end_time_mx": "2024-09-15 23:12:23",
                "disk_used_max": 2,
                "diff_conn_count": "0",
                "total_thread_count": 178,
                "cpu_avg": 78,
                "cpu_min": 52,
                "status": 3
            },
            {
                "count_low": 0,
                "dbname": "SYSTEMDB",
                "sno": 199,
                "count_high": 0,
                "sname": "STE",
                "mts_chk": -1,
                "count_error": 0,
                "count_medium": 0,
                "status": -1
            },
            {
                "count_low": 0,
                "dbname": "STE",
                "sno": 199,
                "count_high": 0,
                "sname": "STE",
                "mts_chk": -1,
                "count_error": 0,
                "count_medium": 0,
                "status": -1
            }
        ],
        "error_code": "000"
      },
      columnDefs: [
        { field: 'sname', headerName: 'SNAME', sortable: true, filter: true },
        { field: 'dbname', headerName: 'DB', sortable: true, filter: true },
        { field: 'status', headerName: 'OPERATION STATUS', sortable: true, filter: true },
        { field: 'cpu_max', headerName: 'CPU AVG MAX', sortable: true, filter: true },
        { field: 'memory_used_min', headerName: 'MEMORY', sortable: true, filter: true },
        { field: 'disk_used_avg', headerName: 'DISK', sortable: true, filter: true },
        { field: 'diff_blk_count', headerName: 'ALERT', sortable: true, filter: true },
        { field: 'backup_stat_mx', headerName: 'DATA BACKUP', sortable: true, filter: true },
        { field: 'sr_stat', headerName: 'REPLICATION', sortable: true, filter: true },
        { field: 'connection_count', headerName: 'SESSIONS', sortable: true, filter: true },
        { field: 'total_thread_count', headerName: 'THREADS', sortable: true, filter: true },
        { field: 'blocked_transaction_count', headerName: 'BLOCKED TRANS', sortable: true, filter: true },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        sortable: true,
        resizable: true
      }
    }
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }
  }
}
</script>
<style>
.ag-root-wrapper-body.ag-layout-normal {height: fit-content;}
.custom-grid {
  --ag-header-background-color: #2d3748;
  --ag-header-foreground-color: #f7fafc;
  --ag-header-border-color: #4a5568;
  --ag-background-color: #edf2f7;
  --ag-odd-row-background-color: #e2e8f0;
  --ag-foreground-color: #2d3748;
  --ag-row-hover-color: #e2e8f0;
  --ag-border-color: #4a5568;
  --ag-header-cell-font-weight: bold;
}

.custom-grid .ag-header {
  font-size: 1.2em;
}

.custom-grid .ag-cell {
  font-size: 1em;
  padding: 10px;
}

.custom-grid .ag-row:hover {
  background-color: #cbd5e0 !important;
}
</style>