import './App.css';
import ToDo from './components/todoo/ToDo';
import { useState, useEffect } from 'react';
import { addToDo, getAllToDo, updateToDo,deleteToDo } from './utils/HandleApi';

function App() {
    const [toDo, setToDo] = useState([]);
    const [text, setText] = useState('');
    const [isUpdate, setIsUpdating] = useState(false);
    const [toDoId, setToDoId] = useState('');

    useEffect(() => {
        getAllToDo(setToDo);
    }, []);

    const updateMode = (_id, text) => {
        setIsUpdating(true);
        setText(text);
        setToDoId(_id);
    };

    return (
        <div className="container">
            <h1>ToDo Website</h1>
            <div className="head">
                <div className="top">
                    <input
                        type="text"
                        placeholder="Add Task"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div
                    className="add"
                    onClick={
                        isUpdate
                            ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                            : () => addToDo(text, setText, setToDo)
                    }
                >
                    {isUpdate ? 'Update' : 'Add'}
                </div>
            </div>
            <div className="list">
                {Array.isArray(toDo) && toDo.length > 0 ? (
                    toDo.map((item) => (
                        <ToDo
                            key={item._id}
                            text={item.text}
                            updateMode={() => updateMode(item._id, item.text)}
                            deleteToDo={()=>deleteToDo(item._id,setToDo)}
                        />
                    ))
                ) : (
                    <p>No ToDo items found. Add your first task!</p>
                )}
            </div>
        </div>
    );
}

export default App;
