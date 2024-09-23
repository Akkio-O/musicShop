import { Link } from'react-router-dom';
import React, {useState} from "react";

//type
type InputData = {
	type: string;
	name: string;
	placeholder: string;
}

// props
type InputProps = {
	inputData: InputData[]
}


export default function Register({inputData}: InputProps): JSX.Element {
	const [formInputs] = useState([
		...inputData,
		{ type: "email", name: "email", placeholder: "Email" },
	  ]);
	return (
		<form className="regForm">
			<h2>Регистрация</h2>
			<div className="regForm__wrapper">
				{formInputs.map((data: InputData, index: number) => (
					
					<input
						key={index}
						type={data.type}
						name={data.name}
						placeholder={data.placeholder}
					/>
				))}
				<div>
					<input type="submit" value='Регистрация' />
					<Link to="/login"><input type="button" value='Авторизация' /></Link>
				</div>
			</div>
		</form>
	)
};