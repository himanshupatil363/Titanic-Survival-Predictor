import React, { useState } from "react";
import { sendData } from "../helper/fetchrequest";
const Predict = () => {
	//for output of the data
	const [result, setResult] = useState({ data: "", success: false });

	//for checking whether the survivor is male or female
	const [gender, setGender] = useState();

	//for validating the form input
	const [validation, setValidation] = useState({
		isEmpty: false,
		genderConflict: false,
		embarkedConflict: false,
		isNegative: false,
	});

	//for showing loader until we get response back
	const [loader, setLoader] = useState(false);

	//for storing input form data
	const [values, setValues] = useState({
		pId: "",
		pClass: "",
		sexMale: "",
		sexFemale: "",
		age: "",
		sibSp: "",
		parch: "",
		fare: "",
		embarkedS: "",
		embarkedC: "",
		embarkedQ: "",
	});

	//destructured for the purpose of validation
	const {
		pId,
		pClass,
		sexMale,
		sexFemale,
		age,
		sibSp,
		parch,
		fare,
		embarkedS,
		embarkedC,
		embarkedQ,
	} = values;

	//this is a dynamic function which will update the states when data is entered or updated in the input fields
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	//this will be called on submitting the form
	const onSubmit = (event) => {
		event.preventDefault();

		//to check whether user has filled all fields or not
		if (
			pId === "" ||
			pClass === "" ||
			sexMale === "" ||
			sexFemale === "" ||
			age === "" ||
			sibSp === "" ||
			parch === "" ||
			fare === "" ||
			embarkedS === "" ||
			embarkedC === "" ||
			embarkedQ === ""
		) {
			setValidation({ ...values, isEmpty: true });
			setResult({ ...values, success: false });
		}

		//to check whether user has entered positive values
		else if (
			parseInt(pId) < 0 ||
			parseInt(pClass) < 0 ||
			parseInt(sexMale) < 0 ||
			parseInt(sexFemale) < 0 ||
			parseInt(age) < 0 ||
			parseInt(sibSp) < 0 ||
			parseInt(parch) < 0 ||
			parseInt(fare) < 0 ||
			parseInt(embarkedS) < 0 ||
			parseInt(embarkedC) < 0 ||
			parseInt(embarkedQ) < 0
		) {
			setValidation({ ...values, isNegative: true });
			setResult({ ...values, success: false });
		}

		//to check whether user has selected atleast and only one gender
		else if (
      		(parseInt(sexMale) === 1 && parseInt(sexFemale) === 1)
      		||
      		(parseInt(sexMale) === 0 && parseInt(sexFemale) === 0)
      	) {
			setValidation({ ...values, genderConflict: true });
			setResult({ ...values, success: false });
		}

		//to check whether user has selected atleast and only one embarked
		else if (
			(parseInt(embarkedS) + parseInt(embarkedC) + parseInt(embarkedQ) !== 1)
		) {
			setValidation({ ...values, embarkedConflict: true });
			setResult({ ...values, success: false });
		}

		//if data passes above validate do this
		else {
      		//starting the loader
			setLoader(true);

      		//cleaning previous errors if any
			setValidation({
				...values,
				isEmpty: false,
				genderConflict: false,
				embarkedConflict: false,
			});

      		//cleaning previous results if any
			setResult({ ...values, success: false });

      		//checking gender
			if (parseInt(sexMale) === 1) {
				setGender("he");
			} else if (parseInt(sexFemale) === 1) {
				setGender("she");
			}

      		//sending data to helper for fetch request
			sendData({ ...values })

        		//stoping the loader and updating the results
				.then((data) => {
					setResult(data);
					setLoader(false);
				})

        		//cleaning input field values
				.then(
					setValues({
						...values,
						pId: "",
						pClass: "",
						sexMale: "",
						sexFemale: "",
						age: "",
						sibSp: "",
						parch: "",
						fare: "",
						embarkedS: "",
						embarkedC: "",
						embarkedQ: "",
					})
				)

				.catch((err) => {
					setResult(err);
					setLoader(false);
				});
		}
	};
	const predictionResult = () => {
    //toggling resutlts according to the data we got from backend
		if (parseInt(result.data) === 1) {
			return (
				<div className="font-semibold text-3xl text-green-500">
					{gender} survived
				</div>
			);
		} else if(parseInt(result.data)===0) {
			return (
				<div className="font-semibold text-3xl text-red-500">
					Sorry {gender} was not able to make it
				</div>
			);
		}
    	else{
			return(
    	  		<div className="font-semibold text-3xl text-red-500">
					Error : {result.data}
				</div>
			)
    	}
	};
  	//code for loader
	const loading = () => {
		return (
			<div className="text-3xl text-gray-400 font-semibold">Calculating...</div>
		);
	};
	return (
		<div>
      		{/* input form */}
			<form className="flex flex-col items-center mt-10">
				<div className="flex justify-center flex-wrap">
					<input
						className="rounded-md focus:outline-none m-4 px-3 py-2"
						type="number"
						placeholder="pId"
						value={pId}
						onChange={handleChange("pId")}
					/>  
					<input
						className="rounded-md focus:outline-none m-4 px-3 py-2"
						type="number"
						placeholder="pClass"
						value={pClass}
						onChange={handleChange("pClass")}
					/>
					<input
						className="rounded-md focus:outline-none m-4 px-3 py-2"
						type="number"
						placeholder="sexMale"
						value={sexMale}
						onChange={handleChange("sexMale")}
					/>
					<input
						className="rounded-md focus:outline-none m-4 px-3 py-2"
						type="number"
						placeholder="sexFemale"
						value={sexFemale}
						onChange={handleChange("sexFemale")}
					/>
					<input
						className="rounded-md focus:outline-none m-4 px-3 py-2"
						type="number"
						placeholder="age"
						value={age}
						onChange={handleChange("age")}
					/>
					<input
						className="rounded-md focus:outline-none m-4 px-3 py-2"
						type="number"
						placeholder="sibSp"
						value={sibSp}
						onChange={handleChange("sibSp")}
					/>
					<input
						className="rounded-md focus:outline-none m-4 px-3 py-2"
						type="number"
						placeholder="parch"
						value={parch}
						onChange={handleChange("parch")}
					/>
					<input
						className="rounded-md focus:outline-none m-4 px-3 py-2"
						type="number"
						placeholder="fare"
						value={fare}
						onChange={handleChange("fare")}
					/>
					<input
						className="rounded-md focus:outline-none m-4 px-3 py-2"
						type="number"
						placeholder="embarkedS"
						value={embarkedS}
						max="1"
						onChange={handleChange("embarkedS")}
					/>
					<input
						className="rounded-md focus:outline-none m-4 px-3 py-2"
						type="number"
						placeholder="embarkedC"
						value={embarkedC}
						max="1"
						onChange={handleChange("embarkedC")}
					/>
					<input
						className="rounded-md focus:outline-none m-4 px-3 py-2"
						type="number"
						placeholder="embarkedQ"
						value={embarkedQ}
						max="1"
						onChange={handleChange("embarkedQ")}
					/>
				</div>
				<button
					onClick={onSubmit}
					className="my-20 px-8 py-2 text-xl rounded-md text-white bg-blue-900 focus:outline-none hover:bg-gray-100 hover:text-blue-900 duration-1000"
				>
					Predict
				</button>
			</form>

      		{/* displaying result/error  */}
			<div className="text-center">
				{result.success && predictionResult()}
				{
          			(validation.isEmpty && (
						<p className="text-xl text-red-500">Please enter all values</p>
				  	)) ||
					(validation.genderConflict && (
						<p className="text-xl text-red-500">Select atleast and only one gender</p>
					)) ||
					(validation.embarkedConflict && (
						<p className="text-xl text-red-500">Select atleast and only one embarked</p>
					)) ||
					(validation.isNegative && (
						<p className="text-xl text-red-500">Values cant be negative</p>
					))
        		}

        		{/* running loader if loading is true */}
				{loader && loading()}
			</div>
		</div>
	);
};
export default Predict;
