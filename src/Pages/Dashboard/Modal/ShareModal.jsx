import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterIcon, TwitterShareButton, LinkedinShareButton, LinkedinIcon } from "react-share";

const ShareModal = ({ onClose, shareUrl }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4">Share this Post</h3>
                <div className="space-x-8 ">
                    <FacebookShareButton 
                        url={shareUrl}>
                        <FacebookIcon size={40} round></FacebookIcon>
                    </FacebookShareButton>

                    <WhatsappShareButton url={shareUrl}>
                        <WhatsappIcon size={40} round></WhatsappIcon>
                    </WhatsappShareButton>
                    <TwitterShareButton url={shareUrl}>
                        <TwitterIcon size={40} round></TwitterIcon>
                    </TwitterShareButton>
                    <LinkedinShareButton url={shareUrl}>
                        <LinkedinIcon size={40} round></LinkedinIcon>
                    </LinkedinShareButton>

                </div>
                <button
                    onClick={onClose}
                    className="btn mt-4 w-full"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ShareModal;
