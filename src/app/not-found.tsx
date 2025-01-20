import { default as ErrorSection } from "views/sections/Error";

const NotFound = () => <ErrorSection code={404} title="Resources not found!" />;

export default NotFound;
