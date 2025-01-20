import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet-async";
import DynamicTitle from "../../../../Components/DynamicTitle";


const Reported = () => {
const axiosSecure=UseAxiosSecure()

    const {data:report=[]}=useQuery({
        queryKey: ['reported'],
        queryFn: async()=>{
            const { data } = await axiosSecure.get('/reported')
            console.log(data);
            return data
        }
    })
    console.log(report);
    return (
        <div>
            <Helmet>
                <title> Cm || Reported Activities</title>
            </Helmet>
            <div>
                <DynamicTitle heading="Reported" subTitle="Admin Activities">

                </DynamicTitle>
            </div>

            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Reported Activities</h2>
                <div className="overflow-x-scroll">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Commenter Email</th>
                                <th>Post Title</th>
                                <th>Feedback</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                report.map((rep,ind) => <tr key={rep._id}>
                                    <th>{ind+ 1}</th>
                                    <th>{rep?.commenter}</th>
                                    <td>{rep.PostTitle}</td>
                                    <td>{rep?.feedback}</td>
                                    <td>{rep?.status}</td>
                                    <td>
                                        <button>Delete</button>
                                    </td>
                                </tr>)
                            }
                           
                        </tbody>
                    </table>
                </div>

               
            </div>
        </div>
    );
};

export default Reported;


