import "../chatbot.css";
import {SetStateAction, useEffect, useRef, useState} from "react";
import { useAppSelector } from "../hooks";
import APIService from "../services/api.service";
import { AxiosResponse } from "axios";
import React from "react";
import { ChatType } from "../helpers/types";



function ChatBot() {
  const [messageArr,setMessageArr] = useState<ChatType[]>([])
  const [inputText,setInputText]= useState<string>("")
  const id = useAppSelector((state)=>state.user.userid)
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const apiService = new APIService()

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messageArr]);
      
  function handleChange(event: { target: { value: SetStateAction<string>; }; }){
    setInputText(event.target.value)
  }
  function handleSend(){
    if (inputText !== ""){
        const userTime = new Date().toLocaleString();
        setMessageArr((prev:ChatType[]) => [...prev, { type: 'user', message: inputText , time: userTime}]);
        apiService.post(`utils/bot`,{source:'user', message:inputText, timestamp: userTime, id: id})
        .then((res:AxiosResponse)=>{
            const output = res.data
            setMessageArr((prev:ChatType[]) => [...prev, {type:'bot',message:output, time: botTime}]);
          })
          const botTime = new Date().toLocaleString();
          setInputText("")
    }
  }


  return (

    <div className="App">
      <div className="wrapper">
        <div>
              <div ref={chatContainerRef}  className="messages" >
                <div className="bot-message bot-item" id="message1">hey</div>
                {messageArr.map((message:ChatType,index:number) =>{
                        return(
                          <React.Fragment key={index}>
                          <div 
                          className= { message.type === 'user'? 'human-time' : 'bot-time'}
                          >{ message.time}</div>
                          <div
                          className= { message.type === 'user'? 'human-message user-item' : 'bot-message bot-item'}
                          id="message2"
                          >{message.message}</div>
                          </React.Fragment>
                        )
                    }
                )}
              </div>
            
          </div>
            <div className="bottom">
              <div className="input">
                <input
                  type="text"
                  id="input"
                  placeholder="Enter your message"
                  value={inputText}
                  onChange={handleChange}
                />
              </div>
              <div className="btn">
                <button onClick={handleSend}>
                  <i className="fas fa-paper-plane"></i>Send
                </button>
              </div>
            </div>
          </div>
        </div>
  );
}

export default ChatBot;