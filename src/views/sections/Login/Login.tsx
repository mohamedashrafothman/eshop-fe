import { default as LoginForm } from "views/forms/Login";

type Props = { title: string };

const Login = ({ title = "" }: Props) => (
	<section className="py-4">
		<div className="container">
			<div className="row gy-5 mt-0 justify-content-center">
				<div className="col-12 col-xl-6 col-xxl-5 col-3xl-4 mt-0">
					<h1 className="text-capitalize text-center">
						<strong>{title}</strong>
					</h1>
				</div>
				<div className="col-12 m-0"></div>
				<div className="col-12 col-xl-6 col-xxl-5 col-3xl-4">
					<LoginForm />
				</div>
			</div>
		</div>
	</section>
);

export default Login;
