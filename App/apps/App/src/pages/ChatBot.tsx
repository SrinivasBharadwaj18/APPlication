import "../chatbot.css";
import {SetStateAction, useEffect, useRef, useState} from "react";
import { useAppSelector } from "../hooks";
import APIService from "../services/api.service";


const BASE_API_URL = import.meta.env.VITE_BASE_URL
function ChatBot() {
  const [messageArr,setMessageArr] = useState<string[]>([])
  const [inputText,setInputText]= useState<string>("")
  const id = useAppSelector((state)=>state.user.userid)
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const apiService = new APIService()
  const indexTime = new Date().getMilliseconds().toLocaleString()

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
        setMessageArr((prev:any) => [...prev, { type: 'user', message: inputText , time: userTime}]);
        apiService.post(`${BASE_API_URL}utils/bot`,{source:'user', message:inputText, timestamp: userTime, id: id})
        .then((res)=>{
            const output = res.data
            setMessageArr((prev:any) => [...prev, {type:'bot',message:output, time: botTime}]);
          })
          const botTime = new Date().toLocaleString();
          setInputText("")
    }
  }




  return (
    <div className="App">
      <div className="wrapper">
        <div className="content">
            <div className="main_content">
              <div ref={chatContainerRef}  className="messages" >
                <div className="bot-message bot-item" id="message1">hey</div>
                {messageArr.map((message:any,index:any) =>{
                        return(
                          <>
                          <div key={index}
                          className= { message.type === 'user'? 'human-time' : 'bot-time'}
                          >{ message.time}</div>
                          <div
                          key={message.type}
                          className= { message.type === 'user'? 'human-message user-item' : 'bot-message bot-item'}
                          id="message2"
                          >{message.message}</div>
                          </>
                        )
                    }
                )}
              </div>
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