type Props = { children: React.ReactNode };

const AuthLayout = async ({ children }: Props) => (
	<>
		<p>Auth layout</p>
		{children}
	</>
);

export default AuthLayout;
