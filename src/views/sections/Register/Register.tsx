import { default as RegisterForm } from "views/forms/Register";

type Props = { title: string };

const Register = ({ title = "" }: Props) => (
	<section className="py-4">
		<div className="container">
			<div className="row gy-5 mt-0 justify-content-center">
				<div className="col-12 col-xl-8 col-xxl-7 col-3xl-6 mt-0">
					<h1 className="text-capitalize text-center">
						<strong>{title}</strong>
					</h1>
				</div>
				<div className="col-12 m-0"></div>
				<div className="col-12 col-md-10 col-lg-9 col-xl-8 col-xxl-7 col-3xl-6">
					<RegisterForm />
				</div>
			</div>
		</div>
	</section>
);

export default Register;
