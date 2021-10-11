import React from 'react'
import { Checkbox, Button } from 'antd';
import styled from 'styled-components'
import 'antd/dist/antd.css';
import {DeleteOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { DELETETODO, COMPLETETODO, CLEARCOMPLETED } from '../redux/todoDucks'

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
    

    return (
        <Wrapper>

            {
                todos.filter(item => item.completed === true ).map((item, index) => (
                    <li className="list-group-item" key={index}>
                       <br/>
                        <span className="actions">
                            <Checkbox name={item.id} checked={item.completed} defaultChecked={item.completed}  onChange={() => onChange(item.id)} />
                            <span className="lead"><b style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }} >{item.text}</b></span><Button onClick={() => deleteOne(item.id)}><DeleteOutlined /></Button>
                        </span>
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
.actions{
    display: flex;
    justify-content: space-between;
}
`