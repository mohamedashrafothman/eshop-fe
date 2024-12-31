import { default as ForgotPasswordForm } from "views/forms/ForgotPassword";

type Props = { title: string };

const ForgotPassword = ({ title = "" }: Props) => (
	<section className="py-4">
		<div className="container">
			<div className="row gy-5 mt-0 justify-content-center">
				<div className="col-12 col-xl-6 col-xxl-5 col-3xl-4 mt-0">
					<h1 className="text-capitalize text-center">
						<strong>{title}</strong>
					</h1>
					<p className="mb-0 text-center">
						Please enter the email address associated with your account and We will
						email you a link to reset your password.
					</p>
				</div>
				<div className="col-12 m-0"></div>
				<div className="col-12 col-xl-6 col-xxl-5 col-3xl-4">
					<ForgotPasswordForm />
				</div>
			</div>
		</div>
	</section>
);

export default ForgotPassword;
