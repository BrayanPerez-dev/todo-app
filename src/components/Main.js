import React, { useState, useEffect } from 'react'
import { Checkbox, Input, Tabs, Space, Button, DatePicker } from 'antd';
import styled from 'styled-components'
import 'antd/dist/antd.css';
import Active from './Active'
import Complete from './Complete';
import { useDispatch, useSelector } from 'react-redux'
import { ADDTODO, DELETETODO, COMPLETETODO, EDITTODO, CLEARCOMPLETED } from '../redux/todoDucks'
import { FILTERSTART } from '../redux/filterStart'
import { FILTEREND } from '../redux/filterEnd'

import { DeleteOutlined, EditOutlined, ClearOutlined } from '@ant-design/icons';
const Main = () => {
    const { TabPane } = Tabs;
    const { RangePicker } = DatePicker;

    const [task, setTask] = useState('')
    const [id, setId] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)


    const dispatch = useDispatch()

    const todos = useSelector(store => store.todos)
    const [notes, setNotes] = useState(todos)

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






    const handledSelect = (ranges) => {
        if(ranges !== null){
        let start = new Date(ranges[0]._d).getTime()
        let end = new Date(ranges[1]._d).getTime()
        dispatch(FILTERSTART(start))
        dispatch(FILTEREND(end))
        }else{
        dispatch(FILTERSTART(null))
        dispatch(FILTEREND(null))
        return ranges
        }
    }

    useEffect(() => {
        dispatch(FILTERSTART(null))
        dispatch(FILTEREND(null))
    }, [dispatch])



   

    useEffect(() => {
        if (start !== null && end !== null) {
        const filtro = todos.filter((obj) =>  start <= obj.date &&  end >= obj.date)     
        setNotes(filtro) 
        }else{
        setNotes(todos)
        }
    }, [todos,start,end])

    console.log(notes)

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
                            <Button onClick={clearFull}><ClearOutlined />Clear Complete</Button>
                            <RangePicker onChange={(ranges) => handledSelect(ranges)} />
                        </Space>

                        {
                            notes.map((item) => (
                                <li className="list-group-item" key={item.id}>
                                    <br />
                                    <span className="actions">
                                        <Checkbox name={item.id} checked={item.completed} defaultChecked={item.completed} onChange={() => onChange(item.id)} key={item.id} />
                                        <span className="lead" ><b style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.text}</b></span>
                                        <Button onClick={() => deleteOne(item.id)}><DeleteOutlined /></Button>
                                        <Button onClick={() => update(item)}><EditOutlined /></Button>
                                    </span>

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

display: grid;
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
  width: 60%;
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
.actions{
    display: flex;
    justify-content: space-between;
}
`