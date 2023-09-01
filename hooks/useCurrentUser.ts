import fetcher from "@/lib/fetcher";
import useSwr from "swr";

const useCurrentUser = () => {
	const { data, error, isLoading } = useSwr("/api/current", fetcher);
	console.log("Masuk hooks");
	console.log(data, error, isLoading);
	return { data, error, isLoading };
};

export default useCurrentUser;
