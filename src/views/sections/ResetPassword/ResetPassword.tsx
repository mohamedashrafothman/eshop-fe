import { default as ResetPasswordForm } from "views/forms/ResetPassword";

type Props = { title: string };

const ResetPassword = ({ title = "" }: Props) => (
	<section className="py-4">
		<div className="container">
			<div className="row gy-5 mt-0 justify-content-center">
				<div className="col-12 col-xl-6 col-xxl-5 col-3xl-4 mt-0">
					<h1 className="text-capitalize text-center">
						<strong>{title}</strong>
					</h1>
				</div>
				<div className="col-12 m-0"></div>
				<div className="col-12 col-md-10 col-lg-8 col-xl-6 col-xxl-5 col-3xl-4">
					<ResetPasswordForm />
				</div>
			</div>
		</div>
	</section>
);

export default ResetPassword;
