import React, { useState } from 'react'
import { Checkbox, Input, Tabs, Space, Button, DatePicker } from 'antd';
import styled from 'styled-components'
import 'antd/dist/antd.css';
import Active from './Active'
import Complete from './Complete';
import { useDispatch, useSelector } from 'react-redux'
import { ADDTODO, DELETETODO, COMPLETETODO, COMPLETEALL, EDITTODO, CLEARCOMPLETED } from '../redux/todoDucks'
import { FILTERSTART } from '../redux/filterStart'
import { FILTEREND } from '../redux/filterEnd'

import { DeleteOutlined, EditOutlined, CheckOutlined, ClearOutlined } from '@ant-design/icons';
const Main = () => {
    const { TabPane } = Tabs;
    const { RangePicker } = DatePicker;

    const [task, setTask] = useState('')
    const [id, setId] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)


    const dispatch = useDispatch()

    const todos = useSelector(store => store.todos)
    const start = useSelector(store => store.start.created)
    const end = useSelector(store => store.end.modified)



    const addTask = (e) => {
        e.preventDefault()
        if (!task.trim()) {
            return
        }
        dispatch(ADDTODO(task))
        setTask('')
    }
    /* 
            let activos = [...tasks]
            let index = activos.findIndex(item => item.id === task.id)
            activos[index].check = !activos[index].check
     */
    const onChange = (id) => {

        dispatch(COMPLETETODO(id))
    }

    const deleteOne = (id) => {
        dispatch(DELETETODO(id))
    }


    const allComplete = () => {
        dispatch(COMPLETEALL())
    }
    const clearFull = () => {
        dispatch(CLEARCOMPLETED())

    }
    const update = (item) => {
        setTask(item.text)
        setId(item.id)


        setModoEdicion(true)
    }
    const updateTask = (e) => {
        e.preventDefault()
        const data = {
            id: id,
            text: task
        }
        dispatch(EDITTODO(data))
        setTask('')
        setId('')
        setModoEdicion(false)
    }

    console.log(start)
    console.log(end)




    const handledSelect = (ranges) => {
        console.log(ranges)
        let start
        let end

        if (ranges === null) {
            start = new Date(2021,7,1).getTime()
            end = new Date(2021,12,30).getTime()
            dispatch(FILTERSTART(start))
            dispatch(FILTEREND(end))
           
        } else {

            start = ranges[0]._d
            end = ranges[1]._d
            dispatch(FILTERSTART(start.getTime()))
            dispatch(FILTEREND(end.getTime()))
        }

    }
    return (
        <Wrapper>
            <div className="container">

                <h2 className="title">#TODO</h2>
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="All" key="1">
                        <form onSubmit={modoEdicion ? updateTask : addTask} >
                            <Input className="input" name="tarea" value={task} placeholder="Add task" onChange={(e) => setTask(e.target.value)} />

                            {
                                modoEdicion ? (
                                    <button type="submit" className="btn btn-primary button" title="Add">Edit</button>

                                ) : (
                                    <button type="submit" className="btn btn-primary button" title="Add">Add</button>

                                )
                            }
                        </form>
                        <br />
                        <Space direction="vertical" size={12}>
                            <Button onClick={allComplete}><CheckOutlined />All Complete</Button>
                            <Button onClick={clearFull}><ClearOutlined />Clear Complete</Button>

                            <RangePicker onChange={(ranges) => handledSelect(ranges)} />
                        </Space>

                        {
                            todos.filter(todo => start < todo.created || end > todo.modified).map((item) => (
                                <li className="list-group-item" key={item.id}>
                                    <br />
                                    <Space>
                                        <Checkbox name={item.id} checked={item.completed} defaultChecked={item.completed} onChange={() => onChange(item.id)} key={item.id} />
                                        <span className="lead" style={{ marginLeft: 20 }}><b style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.text}</b></span>
                                        <Button onClick={() => deleteOne(item.id)}><DeleteOutlined /></Button>
                                        <Button onClick={() => update(item)}><EditOutlined /></Button>
                                    </Space>
                                </li>
                            ))
                        }
                    </TabPane>
                    <TabPane tab="Active" key="2">
                        <Active />
                    </TabPane>
                    <TabPane tab="Complete" key="3">
                        <Complete />
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