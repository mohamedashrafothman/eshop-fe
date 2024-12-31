import Footer from "views/components/Footer";
import Header from "views/components/Header";
import Main from "views/components/Main";

type Props = { children: React.ReactNode };

const PublicLayout = async ({ children }: Props) => (
	<>
		<Header />
		<Main>{children}</Main>
		<Footer />
	</>
);

export default PublicLayout;
