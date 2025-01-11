"use client";

import { isFunction } from "utils/helpers";
import NextLink from "views/components/NextLink";

type Props = {
	code?: number | undefined;
	title?: string | undefined;
	message?: string | undefined;
	reset?: () => void;
};

const Error = ({ code = 500, title = "Internal Server Error", message, reset }: Props) => (
	<section className="vh-100">
		<div className="container h-100">
			<div className="row justify-content-center align-items-center h-100">
				<div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5">
					<div className="card border-0 text-center rounded-4">
						<div className="card-body border-0 p-5">
							<div className="row gy-4 justify-content-center">
								<div className="col-auto">
									<svg
										width="112"
										height="112"
										className="text-primary-dark w-112px h-112px">
										<use href="#icon-cone-striped" />
									</svg>
								</div>
								<div className="col-12">
									<h1 className="text-uppercase fw-normal mb-0">
										<strong className="d-block text-primary display-1 fw-bolder">
											{code}
										</strong>
										<span className="d-block fs-5 fw-normal mt-n2">
											{title}
										</span>
									</h1>
								</div>
								{message && (
									<div className="col-12">
										<p className="mb-0">
											<small>{message}</small>
										</p>
									</div>
								)}
								<div className="col-12 col-md-10 col-xl-8">
									{isFunction(reset) ? (
										<button
											type="button"
											className="btn btn-outline-primary border-primary-dark w-100 text-capitalize"
											onClick={() => reset()}>
											Try again
										</button>
									) : (
										<NextLink
											href="/"
											className="btn btn-outline-primary border-primary-dark w-100 text-capitalize"
											exact>
											<strong>Back to home!</strong>
										</NextLink>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default Error;
