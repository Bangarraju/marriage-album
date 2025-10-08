import React from 'react';


function TodoItem({item, deleteItem}){
    return(
        <>
            <div>{item.description}</div>
            <button onClick={() => {deleteItem(item.id)}}>delete</button>
        </>
    )
}

export default TodoItem;