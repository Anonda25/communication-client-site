import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HomeStastices from "./HomeStastices/HomeStastices";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Home = () => {
    const { TotalPost } = useLoaderData();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByPopularity, setSortByPopularity] = useState(true);
    const [itemsParPage, setItemsparpage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const numberOfPage = Math.ceil(TotalPost / itemsParPage);

    const page = [...Array(numberOfPage).keys()];

    const { data: { posts = [], totalPosts = 0 } = {} } = useQuery({
        queryKey: ['posts', searchTerm, sortByPopularity, currentPage, itemsParPage],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API}/posts/popularity`, {
                params: {
                    page: currentPage,
                    size: itemsParPage,
                    search: searchTerm,
                    sortByPopularity,
                },
                withCredentials: true,
            });
            return data;
        },
    });

    const handleparpage = (e) => {
        const num = parseInt(e.target.value);
        setItemsparpage(num);
        setCurrentPage(0);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < page.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <div className="bg-[url('./assets/banner1.webp')] h-[300px] w-full">
                <div className="flex justify-center items-center h-full">
                    <input
                        type="text"
                        placeholder="Search tag..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100"
                    />
                </div>
            </div>
            <div className="flex gap-3 justify-center items-center ">
                <div>
                    <button
                        onClick={() => setSortByPopularity(!sortByPopularity)}
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Sort by {sortByPopularity ? "Time" : "Popularity"}
                    </button>
                </div>
            </div>
            {posts.map(post => (
                <HomeStastices key={post._id} post={post} />
            ))}
            <div className="text-center pagination">
                <p>Current Page: {currentPage + 1}</p>
                <button onClick={handlePrevPage} className="btn">Prev</button>
                {page.map(item => (
                    <button
                        onClick={() => setCurrentPage(item)}
                        key={item}
                        className={`btn m-2 p-4 gap-3 ${currentPage === item ? 'bg-[#3B82F6]' : ''}`}
                    >
                        {item + 1}
                    </button>
                ))}
                <button onClick={handleNextPage} className="btn">Next</button>
                <select value={itemsParPage} onChange={handleparpage}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </div>
        </div>
    );
};

export default Home;
