import React from 'react'
import { Checkbox, Button, Space } from 'antd';
import styled from 'styled-components'
import 'antd/dist/antd.css';
import {DeleteOutlined,CheckOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { DELETETODO, COMPLETETODO, COMPLETEALL, CLEARCOMPLETED } from '../redux/todoDucks'

export const Complete = () => {

     
  const dispatch = useDispatch()

  const todos = useSelector(store => store.todos)


    const deleteAll = () => {
        dispatch(CLEARCOMPLETED())

    }

    const onChange = (id) => {
        dispatch(COMPLETETODO(id))

    }
    const deleteOne = (id) => {
        dispatch(DELETETODO(id))

    }
    

  const allComplete = () => {
    dispatch(COMPLETEALL())
    console.log(todos)
  }


    return (
        <Wrapper>
            <Button onClick={allComplete}><CheckOutlined />All Complete</Button>

            {
                todos.filter(item => item.completed === true ).map((item, index) => (
                    <li className="list-group-item" key={index}>
                       <br/>
                        <Space>
                            <Checkbox name={item.id} checked={item.completed} defaultChecked={item.completed}  onChange={() => onChange(item.id)} />
                            <span className="lead" style={{ marginLeft: 20 }}><b style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }} >{item.text}</b></span><Button onClick={() => deleteOne(item.id)}><DeleteOutlined /></Button>
                        </Space>
                    </li>

                ))

            }
            <div className="boton">
                <Button className="btn" onClick={() => deleteAll()}><DeleteOutlined style={{ width: 8 }} />Delete All</Button>
            </div>
        </Wrapper>
    )
}

export default Complete

const Wrapper = styled.div`

.btn{
    width: auto;
height: auto;
float: right;
margin-top:4em;
background: #EB5757;
border-radius: 4px;
}
`