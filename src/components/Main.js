import React, { useState } from 'react'
import {  Checkbox,  Input, Tabs,Space,Button, } from 'antd';
import styled from 'styled-components'
import 'antd/dist/antd.css';
import shortid from 'shortid'
import Active from './Active'
import Complete from './Complete';
import {
    DeleteOutlined
  } from '@ant-design/icons';
const Main = () => {
    const { TabPane } = Tabs;
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState('')
    const [activetasks, setActiveTasks] = useState([])
    const [completes,setCompletes] = useState()
    



    const addTask = (e) => {
        e.preventDefault()
        if (!task.trim()) {
            return
        }
        setTasks([...tasks, { task: task,check:false, id: shortid.generate() }])
        setTask('')
        console.log(tasks)
    }

    const onChange = (e,task,indice) => {
    
        let activos = [...tasks]
        let index = activos.findIndex(item => item.id === task.id)
        activos[index].check=!activos[index].check
        
        setActiveTasks([...activos])

    }
    
    const deleteOne = (id) =>{
        const arrayFiltrado = tasks.filter(item => item.id !== id)
        setTasks(arrayFiltrado)
    }
      

    return (
        <Wrapper>
            <div className="container">

            <h2 className="title">#TODO</h2>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="All" key="1">
                    <form onSubmit={addTask} >
                        <Input className="input" name="tarea"  value={task} placeholder="Add task" onChange={(e) => setTask(e.target.value)} />
                        <button type="submit" className="btn btn-primary button" title="Add">Add</button>
                    </form>
                    {
                        tasks.map((item,index) => (
                            <li className="list-group-item" key={item.id}>      
                            
                            <Space>
                            <Checkbox name={item.id}  onChange={(e) =>onChange(e,item,index)} />
                    <span className="lead" style={{marginLeft:20}}><b style={{textDecorationLine: item.check === true ? 'line-through':'none'}}>{item.task}</b></span><Button onClick={() => deleteOne(item.id)}><DeleteOutlined /></Button>
                    </Space>
                            </li>
                        ))
                    }
                </TabPane>
                <TabPane tab="Active" key="2">
                  <Active actives={activetasks} tasks={tasks} completos={setCompletes} />
            </TabPane>
                <TabPane tab="Complete" key="3">
                 <Complete completes={completes} desactivos={activetasks} />
            </TabPane>
            </Tabs>
            </div>
        </Wrapper>
    )
}

export default Main

const Wrapper = styled.div`


display: flex;
flex-wrap: wrap ;
justify-content:center;


.container{
    margin-top:5em;
}
.title{
    display:flex;
    justify-content:center
}

.input{
  width: auto;
  width: 476px;
  height: 56px;
  border: 1px solid #BDBDBD;
  box-sizing: border-box;
  border-radius: 12px;
}

.button{
  width: auto;
  width: 109px;
  height: 56px;
  background: #2F80ED;
  box-shadow: 0px 2px 6px rgba(127, 177, 243, 0.4);
  border-radius: 12px;
}
`