<template>
  <div class="todoList">
    <div class="headTitle" >
      <h1 >Welcome To My TodoList</h1>
    </div>
    <template>
  <b-container fluid >
    <!-- User Interface controls -->
    <b-row>

      <b-col lg="4" class="my-1 ">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="4" class="my-1 ">
        <b-form-group
          v-model="sortDirection"
          label="Filter On"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          
        >
          <b-form-checkbox-group
            v-model="filterOn"
            class="mt-1"
          >
            <b-form-checkbox value="description" ><span class="txt-check">Description</span></b-form-checkbox>
            <b-form-checkbox value="title"><span class="txt-check">Title</span></b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <b-col lg="4" class="my-1 itemCl">
        <b-button size="sm" @click="createRow" class="clearbtn">
           Create Todo
        </b-button>
      </b-col>
    </b-row>
<div style="height: 640px; 
overflow-y: scroll !important; background-color: white;"  v-on:scroll.capture="onScroll">
    <b-table
      :items="items"
      :fields="fields"
      :filter="filter"
      :filter-included-fields="filterOn"
      show-empty
      small
      hover
      @filtered="onFiltered"
    >
      <template #cell(description)="row">
        {{ row.item.description}}
      </template>

      <template #cell(actions)="row" >
       <div class="btnTable">
        <b-button size="sm" @click="infoRow(row.item, row.index, $event.target)" class="mr-1 tableBtn tableBtn1">
          View/Update
        </b-button>
        <b-button size="sm" @click="deleteRow(row.item, row.index, $event.target)" class="tableBtn tableBtn2">
           Delete
        </b-button>
       </div>
      </template>
    </b-table>
  </div>
    <!-- Info modal -->
    <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal> -->
  </b-container>
</template>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  
  name: 'TodoList',
  data(){
    return {
        items: [],
        tableSize:0,
        page:1,
        lastPage:null,
        fields: [
          { key: 'description', label: 'Description', sortable: false, sortDirection: 'desc' },
          { key: 'title', label: 'Title', sortable: false, class: 'text-center' },
          { key: 'actions', label: 'Actions' },
          
        ],
        totalRows: 1,


        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
},
computed: {
    },
    mounted(){
            let tokenAvailable=window.localStorage.getItem('accessToken');
            this.tokenAvailable = tokenAvailable;
            this.totalRows = this.items.length;
            this.getData();
            window.addEventListener("scroll",   this.onScroll );
            
          },
          destroyed() {
    window.removeEventListener("scroll",   this.onScroll );
  },
    methods: {
      onScroll (el) {

			if ((el.target.offsetHeight + el.target.scrollTop) >= el.target.scrollHeight) {
        
        this.getMoreData();
                
            
}
    },
    getMoreData(){
      this.page+=1;
      if(this.page<=this.lastPage){
        this.getData(); 
      }
       
      },
      getData(){
        
        this.axios.get(`http://3.232.244.22/api/items?page=${this.page}`,{headers: {"Content-type": "application/json","Authorization": `Bearer ${this.tokenAvailable}`}}).then((response) => {
                console.log(response.data);
                let tableData=response.data.items.data;
                this.lastPage=response.data.items.last_page;
                this.tableSize=tableData.length-1;
                if(tableData.length){
                for(this.tableSize;this.tableSize>=0 ;this.tableSize--){
                  this.items.push(tableData[this.tableSize]);
                }
                } 
              })
      },
      infoRow(item, index, button) {
        
        console.log("dataIS",item)
        this.$router.push('/updatetodo/'+ item.id );

        // this.infoModal.title = `Row index: ${index}`
        // this.infoModal.content = JSON.stringify(item, null, 2)
        // this.$root.$emit('bv::show::modal', this.infoModal.id, button)

      },
      deleteRow(item, index, button) {
        console.log("dataIS",item)
        this.axios.delete(`http://3.232.244.22/api/item/${item.id}`,{headers: {"Content-type": "application/json","Authorization": `Bearer ${this.tokenAvailable}`}}).then((response) => {
        console.log(response.data);
        this.items=[];
        this.page=1;
        this.getData();        
        })

      // this.infoModal.title = `Row index: ${index}`
      // this.infoModal.content = JSON.stringify(item, null, 2)
      // this.$root.$emit('bv::show::modal', this.infoModal.id, button)

      },
      // resetInfoModal() {
      //   this.infoModal.title = ''
      //   this.infoModal.content = ''
      // },
      createRow() {
        this.$router.push('/createtodo');
      },
      onFiltered(filteredItems) {
        this.totalRows = filteredItems.length
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
