import React, { useEffect, useState } from 'react'
import axios from '../config/axios.config';
import Header from './Header'
import Chapter from './Chapter'
import {Redirect} from "react-router";


function Curriculum(props: any) {
  const [xhapters, setChapters] = useState([[]]);

  const id: number = props.match.params.id;
  let completed:Number
  let token: string = localStorage.getItem("Token") || '';
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchDetails = async () => {
    if( token != ''){
      const res = await axios.get(`/api/curriculums/${id}/chapter`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const { data } = res;
      let allSubTasks = data.data.map((item: any) => {
        const task = {
          id: item.id,
          text: item.name,
          slug: item.slug,
        }
        return task;
      });
      setChapters(allSubTasks);
    }

  };
  useEffect(() => {
    fetchDetails()
  }, []);

  const fetchProgress=async ()=>{
    const response = await(axios.get(`//please add the api here`, {
      headers: {
        'Authorization': `Bearer ${token}`
        }
    }))
    completed={response.progress}//please get the completed data
  }
  useEffect(()=>{fetchProgress()},[])
  if(token == ''){
    return <Redirect to={"/login"}/>;
  }
  return (
    <>
      <Header />
      {xhapters.map((task: any) => {
        return (
          <>
            <Chapter
              task={task}
              completed = {completed}
              updateAllTasks={ () => fetchDetails()}
            />
          </>
        )
      })}

    </>
  );

}

export default Curriculum;
