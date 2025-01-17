import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HomeStastices from "./HomeStastices/HomeStastices";
import { useState } from "react";
const Home = () => {
    const [searchTerm, setSearchTerm] = useState("")

    const { data: posts = [] } = useQuery({
        queryKey: ['posts', searchTerm],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/posts`, { params: { sherchprams: searchTerm } }, { withCredentials: true })
            console.log(data);
            return data

        }
    })
 
    const { UserEmail,userName,authorEmail,authorName,downVote,image, postDescription, postTitle,tag,upVote, _id } = posts
    return (
        <div>
            <div className="bg-[url('./assets/banner1.webp')] h-[300px] w-full">
                <div className="flex justify-center items-center h-full">
                    <input
                        type="text"
                        placeholder="Search tag..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className=" px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100"
                    />
                </div>
            </div>
            <div className="flex gap-3 justify-center items-center my-5">
                <p>science</p>
                <p>science</p>
                <p>science</p>
                <p>science</p>
                <p>science</p>
            </div>
            {
                posts.map(post => <HomeStastices key={post._id} post={post}></HomeStastices>)
            }
        </div>
    );
};

export default Home;

