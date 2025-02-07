import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet-async";
import DynamicTitle from "../../../../Components/DynamicTitle";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "motion/react"

const Reported = () => {
const axiosSecure=UseAxiosSecure()
    
    const {data:report=[], refetch}=useQuery({
        queryKey: ['reported'],
        queryFn: async()=>{
            const { data } = await axiosSecure.get('/reported')
           
            return data
        }
    })
    
 const handleReportDelete=async(id)=>{
    
    const {data}= await axiosSecure.delete(`/reported/${id}`);
    toast.success(' reported deleted')
    refetch()
   
 }
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
                <div className="overflow-x-scroll rounded-lg">
                    <table className="table w-full ">
                        <thead className=" bg-blue-100 ">
                            <tr>
                                <th>#</th>
                                <th>Commenter Email</th>
                                <th>Post Title</th>
                                <th>Feedback</th>
                                
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody >

                            {
                                report.map((rep,ind) => <motion.tr
                                    initial={{ x: -100, opacity: 0 }}
                                    whileInView={
                                        { x: 0, opacity: 1 }}
                                    transition={{
                                        delay: 1,
                                        x: { type: "spring", stiffness: 60 },
                                        opacity: { duration: 2 },
                                        ease: "easeIn",
                                        duration: 2
                                    }} 
                                
                                key={rep._id}>
                                    <th>{ind+ 1}</th>
                                    <th>{rep?.commenter}</th>
                                    <td>{rep.PostTitle}</td>
                                    <td>{rep?.feedback}</td>
                                    
                                    <td>
                                        <button onClick={() => handleReportDelete(rep._id)}>Delete</button>
                                    </td>
                                </motion.tr>)
                            }
                           
                        </tbody>
                    </table>
                </div>

               
            </div>
        </div>
    );
};

export default Reported;


