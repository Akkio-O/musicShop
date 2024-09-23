import { Link } from "react-router-dom"

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

export default function Login({ inputData }: InputProps): JSX.Element {
	return (
		<form className="logForm">
			<h2>Авторизация</h2>
			<div className="logForm__wrapper">
				{inputData.map((data: InputData, index: number) => {
					return (
						<input
							key={index}
							type={data.type}
							name={data.name}
							placeholder={data.placeholder}
						/>
					)
				})}
				<div>
					<input type="submit" value='Авторизация' />
					<Link to="/register"><input type="button" value='Регистрация' /></Link>
				</div>
			</div>
		</form>
	);
}