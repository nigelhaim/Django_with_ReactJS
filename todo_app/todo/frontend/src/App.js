import React from 'react';
import './App.css';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      todoList:[],
      activeItem:{
        id:null,
        title:'',
        completed:false,
      },
      editing:false,
    } 
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.startEdit = this.startEdit.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.taskStriker = this.taskStriker.bind(this)
  };

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log("Fetching tasks......");
    fetch('http://127.0.0.1:8000/todo/task_list')
    .then(response => response.json())
    .then(data => this.setState({
      todoList:data
    }))
  }

  handleChange(e){
    var name = e.target.name;
    var value = e.target.value;
    console.log('Name:', name)
    console.log('Value:', value)

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value,        
      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('ITEM', this.state.activeItem)
    const csrftoken = this.getCookie('csrftoken');
    var url = 'http://127.0.0.1:8000/todo/task_create/' 

    var aI = this.state.activeItem.id
    if(this.state.editing == true){
      url= 'http://127.0.0.1:8000/todo/task_update/'+ aI + '/'
      this.setState({
        editing:false
      })
    }

    fetch(url, {
      method: 'POST',
      headers:{
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body:JSON.stringify(this.state.activeItem)
    }).then((response)=>{
      this.fetchTasks()
      this.setState({

      activeItem:{
        id:null,
        title:'',
        completed:false,
      },
      })
    }).catch(function(error){
      console.log("ERROR:", error)
    })
  }

  startEdit(task){
    this.setState({
      activeItem:task,
      editing:true,

    })
  }

  deleteItem(task){
    var csrftoken = this.getCookie('csrftoken')    
    var del = task.id
    var url = 'http://127.0.0.1:8000/todo/task_delete/' + del + '/'
    fetch(url, {
      method: 'DELETE',
      headers:{
        'content-type': 'applications/json',
        'X-CSRFToken': csrftoken
      }
    }).then((response) => {
      this.fetchTasks()
    })
  }

    taskStriker(task){
      task.completed = !task.completed
      console.log("TASK:", task.completed)

      var up = task.id
      var csrftoken = this.getCookie('csrftoken')
    var url = 'http://127.0.0.1:8000/todo/task_update/' + up + '/'
    fetch(url, {
      method: 'POST',
      headers:{
        'content-type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body:JSON.stringify({'completed':task.completed, 'title':task.title})
    }).then((response) => {
      this.fetchTasks()
    })
    }
  
  render(){
      var tasks = this.state.todoList;
      var self = this;
    return(
      <div className='container'>
        <center>
        <div id="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit} id="form">
              <div className='flex-wrapper'>
                <div style={{flex:6}}>
                  <input onChange={this.handleChange} className='form-control' value={this.state.activeItem.title} id='title' type='text' placeholder='Input Task'></input>                    
                </div>
                <div style={{flex:1}}>
                  <input className='submit' id='submit-btn' type='submit' name='Add'></input>                    
                </div>
              </div>
            </form>
            </div>
            <div id="list-warpper">
              {tasks.map(function(task,index){
                return(
                 <div key={index} className='task-wrapper flex-wrapper'>
                  <div onClick={() => self.taskStriker(task)}  style={{flex:7}}>
                    {task.completed == false ? (
                      <span>{task.title}</span>
                    ) : (
                      <strike>{task.title}</strike>
                    )}
                    </div>
                  <div style={{flex:1}}>
                  <button onClick={() => self.startEdit(task)}>Edit</button>                    
                </div>
                  <div style={{flex:1}}>
                  <button onClick={() => self.deleteItem(task)}>Delete</button>                    
                </div>
                    </div>
                )
              })}
              </div>
        </div>
        </center>
      </div>
    )
  }
}

export default App;
