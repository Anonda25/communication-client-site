

const Annusments = ({ annus }) => {
    // console.log(annus);
    const { authorImage, authorName, description, title }=annus;
    return (
        <div>
            <div className="hero ">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={authorImage}
                        className="w-[300px] rounded-lg shadow-2xl" />
                    <div className='space-y-1 w-3/4 mx-auto'>
                        <h1 className="text-5xl font-bold">{title}</h1>
                        <h1 className="text-xl font-semibold">{authorName}</h1>
                        <p>
                            {description}
                        </p>
                        
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Annusments;