import React, { useState, useEffect } from 'react'
import {  Checkbox, Space,Button } from 'antd';
import styled from 'styled-components'
import 'antd/dist/antd.css';
import {
    DeleteOutlined
  } from '@ant-design/icons';
const Active = (props) => {

    const {actives,tasks,completos} = props

    const [activos, setActivos] = useState([])
    const [done, setDone] = useState([])

    const  verTasks = () => {
        let tareas = tasks.filter(el => el.check);
    
       const  newArray = tareas.map(item => {
        if(item.check === true){
         return {...item,check:false}
        }else{
          return item
        }
      });

      console.log(newArray)
      setActivos([...newArray])  
      }
      useEffect(() => {
        verTasks()
      }, [actives])

      const onChange = (e,task,index) => {
       let completes = [...activos]
       let indice = completes.findIndex(el => el.id === task.id )
       completes[indice].check=!completes[indice].check
       setDone([...completes])
     
       completos(done)
      }
      
    const deleteOne = (id) =>{
      const arrayFiltrado = activos.filter(item => item.id !== id)
      setActivos(arrayFiltrado)
  }
    



    return (
          <Wrapper>
           {
                       activos.map((item,index) => (
                            <li className="list-group-item" key={item.id}>      
                           
                            <Space>
                            <Checkbox name={item.id}  onChange={(e) =>onChange(e,item,index)} />
                    <span className="lead" style={{marginLeft:20}}><b style={{textDecorationLine: item.check === true ? 'line-through':'none'}}>{item.task}</b></span ><Button onClick={() => deleteOne(item.id)}><DeleteOutlined /></Button>
                    </Space>
                            </li>
                        ))
                    }
          </Wrapper>
    )
}

export default Active

const Wrapper = styled.div`

`
