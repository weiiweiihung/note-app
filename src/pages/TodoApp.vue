<template>
  <div class="container">
    <h2 class="text-center mt-5">My Vue Todo App</h2>
   
    <!-- input-->
    <div class="d-flex">
      <input v-model="inTest" type="text" placeholder="enter task" class="form-control">
      <button @click="submitTask" class="btn btn-warning rounded-0">SUBMIT</button>
    </div>

    <!--Tack table-->
    <table class="table table-bordered mt-5">
  <thead>
    <tr>
      <th scope="col">Task</th>
      <th scope="col">Status</th>
      <th scope="col" class="text-center">#</th>
      <th scope="col" class="text-center">#</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(task,index) in task" :key="index">
      <td>
        <span :class="{'finished': task.status==='finished'}">
          {{task.name}}</span>
      </td>
      <td style="width:120px">
        <span @click="changeStatus(index)" class="pointer"
          :class="{'text-danger':task.status ==='to-do',
          'text-warning':task.status ==='in-progress',
          'text-success':task.status ==='finished'
        }"
        >
          {{firstCharUpper(task.status)}}
        </span>
      </td>
      <td>
        <div class="text-center" @click="editTask(index)">
          <span class="fa fa-pen"></span>
        </div>
      </td>
      <td>
        <div class="text-center" @click="deleteTask(index)">
          <span class="fa fa-trash"></span>
        </div>
      </td>
    </tr>
   
  </tbody>
</table>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  data(){
    return {
      inTest:'',
      inEditTask:null,
      availbleStatuses:['to-do','in-progress','finished'],
      task:[
        {
          name: 'Steal banana from the store. ',
          status: 'in-progress'
        },
        {
          name: 'feed pet. ',
          status: 'to-do'
        }
      ]
    }
  },
  methods:{
    submitTask(){
      if(this.inTest.length ===0) return;

      if(this.inEditTask === null){
          this.task.push({
          name: this.inTest,
          status:'to-do'
        });
      } else {
        this.task[this.inEditTask].name = this.inTest;
        this.inEditTask = null;
      }
     
      this.inTest='';
    },
    deleteTask(index){
      this.task.splice(index,1);
    },
    editTask(index){
      this.inTest = this.task[index].name;
      this.inEditTask = index;
    },
    changeStatus(index){
      let newIndex = this.availbleStatuses.indexOf(this.task[index].status);
      if(++newIndex >2) newIndex=0;
      this.task[index].status = this.availbleStatuses[newIndex];
    },
    firstCharUpper(str){
      return str.charAt(0).toUpperCase()+str.slice(1) ;
    }
  }
};
</script>


<style scoped>
  .pointer{
    cursor: pointer;  
  }
  .finished {
    text-decoration: line-through;
  }
</style>
