import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function App() {


  const [frndsList, setFrndList] = useState(
    [
        {
            userId: 1,
            name: "Clark",
            url: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
            money: 0
        },
        {
            userId: 2,
            name: "Sarah",
            url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80",
            money: 0
        },
        {
            userId: 3,
            name: "Anthony",
            url: "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
            money: 0
        }
    ]
  )
  
  //true    
  const [splitState, setSplitState] = useState(false)
  
  const [user, setUser] = useState({})
  const [addFriendBtn,setaddFriendBtn]=useState(true)
  const [addFriendBox, setAddFriendBox] = useState(false)
   
 
  /// ADD FRIEND IN AN ARRAY
  function addFriendHandler(name, imgUrl) {
    const jugariList = [...frndsList]
    jugariList.push({
        name,
        url: imgUrl,
        money: 0
    })
    setFrndList(jugariList)
  
  
  
  }
  

  

  
  return (
    <>
        <div className='container' >
         <div className='wrapper' > 

            <div className='divRight' >
  
                <div className='divRightAllUser' >
                    {
                        frndsList?.map((frnd, i) => (
                            <div key={i} style={{   display: 'flex', justifyContent: 'space-around', alignItems: 'center',width:"350px" }}>
                                <div style={{ height: '60px', width: '60px', borderRadius: "50%", overflow: 'hidden' , alignItems:"center" }}>
                                    <img src={frnd.url} alt="image of user" style={{ width: "100%", height: '100%', }} />
                                </div>
                                <div className='userName' >
                                    <p className='name' >{frnd.name}</p>
                                    {
                                        frnd.money > 0 ? <p className='owesYou' >
                                             {frnd.name} owes you {frnd.money} 
                                        </p> : frnd.money < 0 ? <p className='youOwes' >
                                            You owe {frnd.name}  {Math.abs(frnd.money)} 
                                        </p> : <p className='even' >
                                           You and {frnd.name} are even
                                        </p>
                                    }
  
                                </div>
  
                                {
                                    frnd?.userId === user?.userId ? (
                                        <button className='selectButton' onClick={() => {
                                            setSplitState(false)
                                            setUser({})
                                        }}>Close</button>
                                    ) : (
                                        <button className='selectButton' onClick={() => {
                                            setSplitState(true)
                                            setUser(frnd)
                                        }}>Select</button>
                                    )
                                }
                            </div>
                        ))
                    }
                           
                           <button className='addFriendBtn'  onClick={() => {
                              setAddFriendBox(true)
                           }}>Add Friend</button>
                      </div>
                <div   >
                {
                    addFriendBox && <AddFriendBox setAddFriendBox={setAddFriendBox} addFriendHandler={addFriendHandler} />
                }
                </div>
            </div>
            
        
            {
              
                splitState && <EatSplitArea frnd={user} frndsList={frndsList} setFrndList={setFrndList} />
            }
             
    
        </div>
        </div>
  
    </>
  )
  }
  
  
  // ADD FRIEND BOX
  function AddFriendBox({ setAddFriendBox, addFriendHandler }) {
  
  
  
  
  console.log(setAddFriendBox, "==>>setAddFriendBox")
  const [name, setName] = useState("")
  const [imgUrl, setImageUrl] = useState("")
  return (
    <> 
    <div className='divRightAddFriend'  >


      <div className='addBoxInput' > <p className='addFrndPara' >Friend Name</p>   <input  className='inputValue' placeholder="name" onChange={(e) => setName(e.target.value)} value={name} /></div> 
      <div className='addBoxInput'>  <p className='addFrndPara' >Image URL</p>  <input className='inputValue'  placeholder="url" onChange={(e) => setImageUrl(e.target.value)} value={imgUrl} /></div> 
      <div>  <button className='addFriend' onClick={() => {
            addFriendHandler(name, imgUrl)
            setName("")
            setImageUrl("")
        }}>Add</button>
     </div> 
        
    </div>
     <button className='closeBtn' onClick={() => setAddFriendBox(false)}>Close</button>
     </>
  )
  }
  
  // PAYMENT AREA
  function EatSplitArea({ frnd ,frndsList,setFrndList }) {
    const [billPayPerson,setBillPayPerson]=useState("You")
    const [billPayValue,setBillPayValue]=useState("")
    const [billPayYou,setBillPayYou]=useState("")
    const [billPayOther,setBillPayOther]=useState("")
  
     
  
  function addBillHandler(billPayPerson,frndsList,setFrndList,billPayOther,billPayValue,billPayYou,frnd ){
    
    
    const allPersons=[...frndsList]
    console.log(allPersons)
    // console.log(billPayPerson)
    
  if( billPayPerson==="You"){
    let remainingValue = billPayValue - billPayYou
    //  console.log(remainingValue)
    allPersons.map((person,index)=>{
        if  (person.name===frnd.name){
        
          allPersons[index].money=remainingValue
          setFrndList(allPersons)
           
          // console.log("complete you wala======>task");
        } 
    })
  }  else if( billPayPerson===frnd.name ){
    let remainBill=billPayValue-billPayOther
    
    allPersons.map((person,index)=>{
      if  (person.name===frnd.name){
        allPersons[index].money=-remainBill
        setFrndList(allPersons)
        // console.log("complete other wala ======>task");
      }
    })
 }


}
    
  return (
    <div className='splitArea' > 
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 className='splitHeading' >
            Split a bill with {frnd.name}
        </h1>
       <div style={{display:"flex",justifyContent:"space-around"}} >  <p style={{marginLeft:"2px",fontSize:"14px",width:"140px"}} > Bill Value </p>          <input    style={{width:"120px",height:"21px",marginTop:"14px" }} onChange={(e) => setBillPayValue(e.target.value)}   placeholder="" /></div>
       <div style={{display:"flex",justifyContent:"space-around"}} >  <p style={{marginLeft:"2px",fontSize:"14px",width:"140px"}} > Your expense</p>          <input  style={{width:"120px",height:"21px",marginTop:"14px" }}  onChange={(e) => setBillPayYou(e.target.value)} placeholder="" /></div>
       <div style={{display:"flex",justifyContent:"space-around"}} >  <p style={{marginLeft:"2px",fontSize:"14px",width:"140px"}} > {frnd.name} expense </p>  <input  style={{width:"120px",height:"21px",marginTop:"14px" }}   onChange={(e) => setBillPayOther(e.target.value)}    placeholder="" /></div>
       <div style={{display:"flex",justifyContent:"space-around"}} >  <p style={{marginLeft:"2px",fontSize:"14px",width:"140px",marginRight:"34px"}} > Who is Paying the Bill</p><select style={{width:"90px",height:"23px",marginTop:"15px" }}   onChange={(e) => setBillPayPerson(e.target.value)} value={billPayPerson} >
  
            <option>You</option>
            <option>{frnd.name}</option>
        </select></div>
        <button  className='splitBillBtn' onClick={()=>{ addBillHandler(billPayPerson,frndsList,setFrndList,billPayOther,billPayValue,billPayYou,frnd)}} >Add Bill</button>
    </div>
    </div>
  )
   
{

}


}

 














  
 

export default App;
