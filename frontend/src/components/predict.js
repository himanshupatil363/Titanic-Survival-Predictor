import React, { useState } from 'react'
import { send } from '../helper'
const Predict = () => {
    const [result,setResult]=useState({data:"",success:false})
    const [gender,setGender]=useState()
    const [loader,setLoader]=useState(false)
    const [values,setValues] = useState({
        pId:"",
        pClass:"",
        sexMale:"",
        sexFemale:"",
        age:"",
        sibSp:"",
        parch:"",
        fare:"",
        embarkedS:"",
        embarkedC:"",
        embarkedQ:""
      })
      const {pId,pClass,sexMale,sexFemale,age,sibSp,parch,fare,embarkedS,embarkedC,embarkedQ} = values
      const handleChange = name => event => {
        setValues({...values,[name] : event.target.value})
      }
      const onSubmit = event => {
        event.preventDefault()
        setLoader(true)
        setResult({...values,success:false})
        if(parseInt(sexMale)===1){
          setGender("he")
        }
        else if(parseInt(sexFemale)===1){
          setGender("she") 
        }
        send({pId,pClass,sexMale,sexFemale,age,sibSp,parch,fare,embarkedS,embarkedC,embarkedQ})
        .then(data=>{setResult(data)
          setLoader(false)
        })
        .then(setValues({...values , pId:"",pClass:"",sexMale:"",sexFemale:"",age:"",sibSp:"",parch:"",fare:"",embarkedS:"",embarkedC:"",embarkedQ:""}))
        .catch(err=>console.log(err))
      }
      const predictionResult = () =>{
        if(parseInt(result.data)===1){
          return(<div className="font-semibold text-3xl text-green-500">{gender} survived</div>);
        }
        else{
          return(
            <div className="font-semibold text-3xl text-red-500">Sorry {gender} was not able to make it</div>
          );
        }
      }
      const loading = () =>{
        return(
          <div className="text-3xl text-gray-400 font-semibold">
            Calculating...
          </div>
        )
      }
    return (
        <div>
        <form className='flex flex-col items-center mt-10'>
            <div className="flex justify-center flex-wrap">
                <input className="rounded-md focus:outline-none m-4 px-3 py-2" type="number" placeholder="pId" value={pId} onChange={handleChange("pId")}/>
                <input className="rounded-md focus:outline-none m-4 px-3 py-2" type="number" placeholder="pClass" value={pClass} onChange={handleChange("pClass")}/>
                <input className="rounded-md focus:outline-none m-4 px-3 py-2" type="number" placeholder="sexMale" value={sexMale} onChange={handleChange("sexMale")}/>
                <input className="rounded-md focus:outline-none m-4 px-3 py-2" type="number" placeholder="sexFemale" value={sexFemale} onChange={handleChange("sexFemale")}/>
                <input className="rounded-md focus:outline-none m-4 px-3 py-2" type="number" placeholder="age" value={age} onChange={handleChange("age")}/>
                <input className="rounded-md focus:outline-none m-4 px-3 py-2" type="number" placeholder="sibSp" value={sibSp} onChange={handleChange("sibSp")}/>
                <input className="rounded-md focus:outline-none m-4 px-3 py-2" type="number" placeholder="parch" value={parch} onChange={handleChange("parch")}/>
                <input className="rounded-md focus:outline-none m-4 px-3 py-2" type="number" placeholder="fare" value={fare} onChange={handleChange("fare")}/>
                <input className="rounded-md focus:outline-none m-4 px-3 py-2" type="number" placeholder="embarkedS" value={embarkedS} onChange={handleChange("embarkedS")}/>
                <input className="rounded-md focus:outline-none m-4 px-3 py-2" type="number" placeholder="embarkedC" value={embarkedC} onChange={handleChange("embarkedC")}/>
                <input className="rounded-md focus:outline-none m-4 px-3 py-2" type="number" placeholder="embarkedQ" value={embarkedQ} onChange={handleChange("embarkedQ")}/>
            </div>
            <button onClick={onSubmit} className="my-20 px-8 py-2 text-xl rounded-md text-white bg-blue-900 focus:outline-none hover:bg-gray-100 hover:text-blue-900 duration-1000">Predict</button>
            </form>

            <div className="text-center">
              {result.success && predictionResult()}
              {loader && loading()}
            </div>
        </div>
    )
}

export default Predict
