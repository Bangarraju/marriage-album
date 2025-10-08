import React, { useState } from 'react';
import TodoItem from './TodoItem';


function TodoList(){

    const [items, setItems] = useState([{
        id: 1,
        description: "some random text"
    }]);
    const [inputValue, setInputValue] = useState('');

    const addItem = () => {
       
        const newItem = {
            id: Date.now(),
            description: inputValue
        };
        setItems([...items, newItem]);
        setInputValue('');
    }

    const deleteItem = (id) => {
        console.log(id)
        setItems(items.filter(item => item.id !== id));
    }

    

    return(
        <>
            <div>
                inside List
            </div>
            <input value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}/>
            <button onClick={addItem}>Submit</button>
            {
                items.map(
                    item => {
                        return <TodoItem key={item.id} item = {item} deleteItem={deleteItem}></TodoItem>
                    })
            }
        </>

    
    );
}

export default TodoList;