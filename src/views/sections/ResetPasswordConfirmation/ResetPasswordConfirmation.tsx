import NextLink from "views/components/NextLink";

type Props = { title: string };

const ResetPasswordConfirmation = ({ title = "" }: Props) => (
	<section className="py-7">
		<div className="container">
			<div className="row gy-5 mt-0 justify-content-center">
				<div className="col-auto mt-0">
					<svg className="bi w-100px h-100px text-primary" width="100" height="100">
						<use href="#icon-envelop-check" />
					</svg>
				</div>
				<div className="col-12 m-0"></div>
				<div className="col-12 col-xl-8 col-xxl-5 mt-3">
					<h1 className="text-capitalize text-center">
						<strong>{title}</strong>
					</h1>
					<p className="text-center op-50 w-90 mx-auto mb-0">
						If this email found in our records, you should have received an email with
						reset password link. Please wait for few minuets & consider checking the
						spam folder as well.
					</p>
				</div>
				<div className="col-12 m-0"></div>
				<div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4 col-3xl-3">
					<NextLink
						href="/auth/login"
						className="btn btn-outline-primary border-primary-dark w-100 text-capitalize justify-content-center icon-link icon-link-hover icon-link-hover-reversed">
						<svg className="bi w-22px h-22px" width="22" height="22">
							<use href="#icon-chevron-left" />
						</svg>
						<strong>back to login</strong>
					</NextLink>
				</div>
			</div>
		</div>
	</section>
);

export default ResetPasswordConfirmation;
