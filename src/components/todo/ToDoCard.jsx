import { useState, useEffect } from "react";
import ToDo from './ToDo'
function ToDoCard() {
    const [proList, setProList] = useState([]);

    async function getData() {
        try {
            let res = await fetch('http://localhost:4000/product-api/products');
            let data = await res.json();
          
            setProList(data.payload);
          
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5">
            {
                proList.map((product) => (
                    product && (
                        <div className="col" key={product.id}>
                            <ToDo product={product} />
                        </div>
                    )
                ))
            }
        </div>
    );
}



export default ToDoCard