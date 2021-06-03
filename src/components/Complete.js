import React, { useState, useEffect } from 'react'
import {  Checkbox,Button,Space } from 'antd';
import styled from 'styled-components'
import 'antd/dist/antd.css';
import {
    DeleteOutlined
  } from '@ant-design/icons';
export const Complete = (props) => {

    const {completes,desactivos} = props

    const [completos,setCompletos] = useState([])
   
    const [isChecked,setIsChecked] = useState(false)

    const [eliminar,setEliminar] = useState(false)

     


    const deleteAll = () =>{
        setEliminar(!eliminar)
        setIsChecked(!isChecked)
        setTimeout(() => {
        const arrayFiltrado = completos.splice(0,-1)
        setCompletos(arrayFiltrado) 
        }, 3000);
    
    }

   const onChange = (e) => {
    console.log('checked = ', e.target.checked);
    setIsChecked(e.target.checked)
   }
    const deleteOne = (id) =>{
        const arrayFiltrado = completos.filter(item => item.id !== id)
        setCompletos(arrayFiltrado)
    }
    const verCompletes = () =>{
        let tareas = completes && completes?.filter(el => el.check);
        setCompletos(tareas)
    } 
    useEffect(() => {
        verCompletes()
      }, [completes])
     
   
    return (
        <Wrapper>
            
           {
               completos &&  completos.map((item,index) => (
                    <li className="list-group-item" key={index}>      
                    <Space>
                    <Checkbox name={item.id} checked={isChecked}  />
                    <span className="lead" style={{marginLeft:20}}><b style={{textDecorationLine: eliminar !== false ? 'line-through':'none'}} >{item.task}</b></span><Button onClick={() => deleteOne(item.id)}><DeleteOutlined /></Button>
                    </Space>
                    </li>
                    
                ))
                
           }
           <div className="boton">
           <Button className="btn" onClick={() => deleteAll()}><DeleteOutlined style={{width:8}}/>Delete All</Button>
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