import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import UseAxiosSecure from "./UseAxiosSecure";


const useAdmin = () => {
    const { user } = useAuth()
    const axiosSecure = UseAxiosSecure()
    const { data: isAdmin, refetch, isLoading } = useQuery({
        queryKey: ['admin', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            console.log(res.data);
            return res.data?.admin
        },
        enabled: !!user?.email,

    })

    return [isAdmin, isLoading]
};

export default useAdmin;
