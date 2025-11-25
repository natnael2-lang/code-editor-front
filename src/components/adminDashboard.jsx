import Tabs from "./tabs";
import Register from "./register" 
import CreateQuestion from "./createQuestion"
import { useState } from "react";


const AdminDashboard=()=>{
  
   const[active,setActive]=useState("register")
   const handleActive=(val)=>{
        setActive(val)
   }
     return(
         <div className="h-screen flex flex-col ">
            <Tabs handleActive={handleActive} active={active} />
            {active==="register"?<Register/>:null}
            {active==="createQuestion"?<CreateQuestion/>:null}
         </div>
     )

}

export default AdminDashboard;