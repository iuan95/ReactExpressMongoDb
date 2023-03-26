import {Route, Routes} from "react-router-dom";
import {useParams} from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import axios from "axios";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import CreatePost from "./components/CreatePost";
import Editpost from "./components/Editpost";

function App() {
  return (
    <div className={'container'}>

        <Routes> //Маршруттарым барыта
            <Route path={'/'} element={<Layout/>}>
                <Route index element={<Home/>} /> // конкретнай маршруттар path- адреhа, element - страница
                <Route path="about" element={<About/>} />
                <Route path="contacts" element={<Contacts/>} />
                <Route path="posts" element={<Posts/>}/>
                <Route path="users" element={<Users/>}/>
                <Route path="posts/:id" element={<Allposts/>}/>
                <Route path="posts/:id/edit" element={<Editpost/>}/>
                <Route path="posts/new" element={<CreatePost/>}/>
                <Route path="*" element={<Error/>} />
            </Route>
        </Routes>
    </div>

  );
}
const Users = ()=>{
    const [us, setUs] = useState([])
    useEffect(()=>{
        axios.get('posts')
            .then(function (result){
                setUs([result])
                console.log(result)
            })
            .catch((erorr)=>{
                console.log(erorr)
            })
    }, [])


    return(
        <>
            <h1>Users</h1>
            {}
        </>
    )
}
const Home = ()=>{
  return(
        <>
            <h1>Страница Home</h1>
            <p>Это страница Home</p>
        </>
  )
}
const About = ()=>{
  return(
      <>
          <h1>Страница About</h1>
          <p>Это страница About</p>
      </>
  )
}
const Contacts = ()=>{
  return(
      <>
          <h1>Страница Contacts</h1>
          <p>Это страница Contacts</p>
      </>
  )
}
const Error = ()=>{
    return(
        <>
            <h1>404</h1>
            <p>Страница не найдена</p>
        </>
    )
}
const Posts = ()=>{
    const json =  "https://jsonplaceholder.typicode.com/posts"
    const [dataa, setData] = useState([])
    useEffect(()=>{
        axios.get(json)
            .then(function (response){
                setData([response.data])
                console.log(dataa)
            })
            .catch(function (err){
                setData("Ошибка загрузки")
            })
    }, [])
    return(
        <div className={"div-posts"}>
            {dataa === ""? <h1>Загрузка...</h1>:

                dataa.map(item=>{
                    return(
                        item.map(i=>{
                            return(
                                <Link key={i.id} to={`/posts/${i.id}`} className={"ul-ul"}>
                                    <li>{i.id}</li>
                                    <li>{i.title}</li>
                                    <li>{i.body}</li>
                                </Link>
                            )
                        })
                    )

                })}
        </div>
    )
    // return(
    //     <div className={"div-posts"}>
    //         {dataa === ""? <h1>Загрузка...</h1>:
    //
    //             dataa.map(item=>{
    //             return(
    //                 item.map(i=>{
    //                     return(
    //                         <ul key={i.id} className={"ul-ul"}>
    //                             <li>{i.id}</li>
    //                             <li>{i.title}</li>
    //                             <li>{i.body}</li>
    //                         </ul>
    //                     )
    //                 })
    //             )
    //
    //         })}
    //     </div>
    // )
}

const Allposts = ()=>{


    const {id} = useParams()
    const [post, setPost] = useState(null)
    const json =  `https://jsonplaceholder.typicode.com/posts/${id}`
    useEffect(()=>{
            fetch(json)
                .then(res=>res.json())
                .then(data=>setPost(data))
    }, [id])
    return(
        <>
            {
                post && (
                    <>
                        <h1>{post.title}</h1>
                        <h1>{post.body}</h1>
                        <Link to={`/posts/${id}/edit`}>Edit this post</Link>
                    </>
                )
            }


        </>
    )
}


export default App;
