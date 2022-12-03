<template>
  <div class="todoList">
    <h1>Welcome To My TodoList</h1>
    <template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>

      <b-col lg="4" class="my-1">
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

      <b-col lg="4" class="my-1">
        <b-form-group
          v-model="sortDirection"
          label="Filter On"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          
        >
          <b-form-checkbox-group
            v-model="filterOn"
            class="mt-1"
          >
            <b-form-checkbox value="description">Description</b-form-checkbox>
            <b-form-checkbox value="title">Title</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <b-col lg="4" class="my-1">
        <b-button size="sm" @click="createRow">
           Create Todo
        </b-button>
      </b-col>
    </b-row>

    <b-table
      :items="items"
      :fields="fields"
      :filter="filter"
      :filter-included-fields="filterOn"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(description)="row">
        {{ row.item.description}} 
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="infoRow(row.item, row.index, $event.target)" class="mr-1">
          View/Update
        </b-button>
        <b-button size="sm" @click="deleteRow(row.item, row.index, $event.target)">
           Delete
        </b-button>
      </template>
    </b-table>

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
        fields: [
          { key: 'description', label: 'Description', sortable: false, sortDirection: 'desc' },
          { key: 'title', label: 'title', sortable: false, class: 'text-center' },
          { key: 'actions', label: 'Actions' }
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

            

          },
    methods: {
      getData(){
        this.axios.get('http://3.232.244.22/api/items',{headers: {"Content-type": "application/json","Authorization": `Bearer ${this.tokenAvailable}`}}).then((response) => {
                //   this.resetForm();
                console.log(response.data);
                let tableData=response.data.items.data;
                this.items=tableData;  
              })
      },
      infoRow(item, index, button) {
        this.$router.push('/updatetodo');

        // this.infoModal.title = `Row index: ${index}`
        // this.infoModal.content = JSON.stringify(item, null, 2)
        // this.$root.$emit('bv::show::modal', this.infoModal.id, button)

      },
      deleteRow(item, index, button) {
        console.log("dataIS",item)
        this.axios.delete(`http://3.232.244.22/api/item/${item.id}`,{headers: {"Content-type": "application/json","Authorization": `Bearer ${this.tokenAvailable}`}}).then((response) => {
        console.log(response.data);
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
