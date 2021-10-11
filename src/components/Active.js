import React from 'react'
import { Checkbox, Button } from 'antd';
import styled from 'styled-components'
import 'antd/dist/antd.css';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { DELETETODO, COMPLETETODO, COMPLETEALL } from '../redux/todoDucks'

const Active = () => {

  /* 
    const verTasks = () => {
      let tareas = tasks.filter(el => el.check);
  
      const newArray = tareas.map(item => {
        if (item.check === true) {
          return { ...item, check: false }
        } else {
          return item
        }
      });
  
    } */

  const dispatch = useDispatch()

  const todos = useSelector(store => store.todos)
  const notes = todos.some(item => item.completed === false)

  const deleteOne = (id) => {
    dispatch(DELETETODO(id))
  }

  const onChange = (id) => {

    dispatch(COMPLETETODO(id))
  }


  const allComplete = () => {
    dispatch(COMPLETEALL())
  }




  return (
    <Wrapper>

      {notes &&
        <Button onClick={allComplete}>
          <CheckOutlined />
          All Complete
        </Button>
      }
      {
        todos.filter(item => item.completed === false).map((item) => (
          <li className="list-group-item" key={item.id}>
            <br />
            <span className="actions">
              <Checkbox name={item.id} checked={item.completed} defaultChecked={item.completed} onChange={() => onChange(item.id)} key={item.id} />
              <span className="lead" ><b style={{ textDecorationLine: item.completed === true ? 'line-through' : 'none' }}>{item.text}</b></span ><Button onClick={() => deleteOne(item.id)}><DeleteOutlined /></Button>
            </span>
          </li>
        ))
      }
    </Wrapper>
  )
}

export default Active

const Wrapper = styled.div`

.actions{
    display: flex;
    justify-content: space-between;
}
`
