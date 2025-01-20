import React, { useState , useEffect } from 'react';
import './TodoList.css';
import Icon from './assets/image.webp';

function TodoList(){

    const storageList = localStorage.getItem('List');

    const [list, setList] = useState(storageList ? JSON.parse(storageList) : []);
    const [newItem, setNewItem] = useState("");

    useEffect( ()=> {
        localStorage.setItem('List', JSON.stringify(list));
    }, [list])

    function addItem(form) {
        form.preventDefault();
        if(!newItem){
            return;
        }setList([...list, {text: newItem, isCompleted: false}])
        setNewItem("");
        document.getElementById('enter-input').focus();
    }

    function clicou(index){
        const listAux = [...list];
        listAux[index].isCompleted = !listAux[index].isCompleted
        setList(listAux);
    }

    function delet(index){
        const listAux = [...list];
        listAux.splice(index,1);
        setList(listAux);
    }

    function deletAll(){
        setList([]);
    }

    return(
        <div>
            <h1>Work List!</h1>
            <form onSubmit={addItem}>
                <input id='enter-input' type="text" value={newItem} onChange={(e)=>{setNewItem(e.target.value)}} placeholder='Write your activity'/>
                <button className='add' type="submit">Add</button>
            </form>
            <div className='workList'>
                <div style={{textAlign:'center' }} >
                {
                    list.length < 1 ? <img className='central-icon' src={Icon} /> 
                    : 
                    list.map((item, index)=> (
                    <div key={index} className={item.isCompleted ? 'item completo' : 'item'}>
                        <span onClick={()=>{clicou(index)}}>{item.text}</span>
                        <button onClick={()=>{delet(index)}} className='del'>Delet</button>
                    </div>
                    ))
                    
                } 
                {
                    list.length > 0 && 
                    <button onClick={()=>{deletAll()}} className='delAll'>Delet All</button>
                }
                
            </div>
            </div>
        </div>
        
    )
}

export default TodoList