import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const Editpost = ()=>{
    const {id} = useParams()
    const [posta, setPosta] = useState(null)
    const json =  `https://jsonplaceholder.typicode.com/posts/${id}`
    useEffect(()=>{
        fetch(json)
            .then(res=>res.json())
            .then(data=>setPosta(data))
    }, [id])
    console.log(posta)
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    function Post(){

            axios.patch(json, {
                title: title,
                body: body
            }
            ).then(function (response){
                setPosta(response)
            })

    }
    return(
        <>
            <h1>Редактирование </h1>
            {posta === null?
                <h1>Ошибка загрузки данных</h1>
                :
                <>
                    <h1><textarea style={{width: "500px", fontSize: "1.3rem"}} defaultValue={posta.title} onChange={e=>setTitle(e.target.value)}/></h1>
                    <p><textarea style={{width: "500px", fontSize: "1.3rem"}} defaultValue={posta.body}  onChange={e=>setBody(e.target.value)}/></p>
                    <button onClick={Post}></button>
                    <Link  to={`/posts`} style={{width: "120px", height: "50px", display: "grid", placeItems: "center", backgroundColor: "black", color: "white", fontWeight: "500", fontSize: "1.1rem"}}>Назад</Link>
                </>

            }
            {/*<input value={posta.title}/>*/}
            {/*<input value={posta.body}/>*/}
        </>
    )
}
export default Editpost;